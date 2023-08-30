import { Footer } from "./modules/Footer";
import { RightToolbar } from "./modules/RightToolbar";

import useWebSocket from 'react-use-websocket';
import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import "./App.css"
import { VideoPlayer } from "./modules/VideoPlayer";
import { VideoPlayerContextData, VideoPlayerContext } from "./models/VideoPlayerContext";
import { WebsocketContextData, WebsocketContext } from "./models/WebsocketContext";
import { EventType, UpdateTrackingEvent } from "./models/Event";
import { BoundingBox } from "./models/BoundingBox";
import { BoundingBoxData } from "./models/BoundingBoxData";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from 'uuid';


function App() {

    
    const boundingBoxesQueue = useRef(Array()); // Contains bounding boxes received from the backend
    const handleIsStarted = useRef(false);      // Flag indicates if initHandleBoundingBoxes was run
    const websocketUrl = useRef("")
    const frameCounter  = useRef(0)
    const video = document.getElementById("video") as HTMLVideoElement;


    const videoPlayerContextData: VideoPlayerContextData = new VideoPlayerContextData(...useState<boolean>(false), ...useState<BoundingBox[]>([]));

    const getUrl = useCallback(() => {
        if (websocketUrl.current === "") {
            let sessionId = uuidv4();
            websocketUrl.current = `ws://localhost:8000/websocket/${sessionId}`;
        }
        console.log(websocketUrl.current)
        return websocketUrl.current;
    }, [])

    const handleNewFrame = (now: DOMHighResTimeStamp, metadata: VideoFrameCallbackMetadata) => {
        let currFrame = frameCounter.current++;
        console.log(frameCounter.current);

        const allowedFrameOffset = 4;
        let minAcceptedFrame = currFrame - allowedFrameOffset 
        let  maxAcceptedFrame = currFrame + allowedFrameOffset

         // Discard boxes that are too old 
        let nextBoxes = boundingBoxesQueue.current[0]
        let bestMatchingBoxes = nextBoxes;

        while( nextBoxes !== undefined && nextBoxes.frame_number <= currFrame) {
            bestMatchingBoxes =  boundingBoxesQueue.current.shift();
            nextBoxes = boundingBoxesQueue.current[0]
        }
        
        if (bestMatchingBoxes !== undefined 
            && bestMatchingBoxes .frame_number >= minAcceptedFrame 
            && bestMatchingBoxes.frame_number  <= maxAcceptedFrame) {
                    videoPlayerContextData.setBoundingBoxes(bestMatchingBoxes.boundingBoxes);
                    console.log("Selected result fro Frame " + bestMatchingBoxes.frame_number + "current Frame is " + currFrame);
        }
        
        // Re-register Callback for next Frame
        video.requestVideoFrameCallback(handleNewFrame); 

    }
    /**
     * Setup required timer(=regulary run job)  to handle received boundingBoxes
     */
    function initHandleBoundingBoxes() {
        if (!handleIsStarted.current && boundingBoxesQueue.current.length > 0) {

            handleIsStarted.current = true;
            console.log("rein in if abfrage");
            if (!videoPlayerContextData.isPlaying) {
                video.requestVideoFrameCallback(handleNewFrame)
                
                videoPlayerContextData.setIsPlaying(true);
                video.play();
            }
            //return () => clearInterval(intervalBoundingBox.current);
        }
    }

    const { sendMessage } = useWebSocket(getUrl, {
        onOpen: () => {
            console.log("Connected to websocket ");
        },
        onMessage: event => {
            // parse json 2 times because event is stringified "too much"
            let jsonEvent = JSON.parse(JSON.parse(event.data))
            console.log(jsonEvent.event_type)
            if (jsonEvent.event_type === EventType.UPDATE_TRACKING) {
                let updateEvent = jsonEvent as UpdateTrackingEvent;
                boundingBoxesQueue.current.push(new BoundingBoxData(updateEvent.frame_number, updateEvent.bounding_boxes));
                initHandleBoundingBoxes();
            }
        }
    });


    return (
        <WebsocketContext.Provider value={new WebsocketContextData(sendMessage)}>
            <VideoPlayerContext.Provider value={videoPlayerContextData}>
                <div className="App">
                    <RightToolbar></RightToolbar>
                    <VideoPlayer></VideoPlayer>
                    <Footer></Footer>
                </div>
            </VideoPlayerContext.Provider>
        </WebsocketContext.Provider>
    );
}

export default App;
