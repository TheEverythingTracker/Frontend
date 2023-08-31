import {Footer} from "./modules/Footer";
import {RightToolbar} from "./modules/RightToolbar";

import useWebSocket from 'react-use-websocket';
import React, {useCallback, useRef, useState} from "react";
import "./App.css"
import {VideoPlayer} from "./modules/VideoPlayer";
import {VideoPlayerContext, VideoPlayerContextData} from "./models/VideoPlayerContext";
import {WebsocketContext, WebsocketContextData} from "./models/WebsocketContext";
import {EventType, UpdateTrackingEvent} from "./models/Event";
import {BoundingBox} from "./models/BoundingBox";
import {BoundingBoxData} from "./models/BoundingBoxData";
import {v4 as uuidv4} from 'uuid';


function App() {


    const boundingBoxesQueue = useRef(Array()); // Contains bounding boxes received from the backend
    const handleIsStarted = useRef(false);      // Flag indicates if initHandleBoundingBoxes was run
    const websocketUrl = useRef("")
    const frameCounter = useRef(0)
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

    async function delayPlaybackFrame() {
        video.pause()
        await new Promise(r => setTimeout(r, 80));
        video.play()
    }

    const handleNewFrame = async (now: DOMHighResTimeStamp, metadata: VideoFrameCallbackMetadata) => {
        let next = boundingBoxesQueue.current[0]

        if (next == undefined) {
            await delayPlaybackFrame();
            frameCounter.current++;
        } else {
            let currFrame = frameCounter.current++;

            const allowedFrameOffset = 5;
            let minAcceptedFrame = currFrame - allowedFrameOffset
            let maxAcceptedFrame = currFrame + allowedFrameOffset

            // Discard boxes that are too old
            let nextBoxes = boundingBoxesQueue.current[0]
            let bestMatchingBoxes = nextBoxes;

            while (nextBoxes !== undefined && nextBoxes.frame_number <= currFrame) {
                bestMatchingBoxes = boundingBoxesQueue.current.shift();
                nextBoxes = boundingBoxesQueue.current[0]
            }

            if (bestMatchingBoxes !== undefined
                && bestMatchingBoxes.frame_number >= minAcceptedFrame
                && bestMatchingBoxes.frame_number <= maxAcceptedFrame) {
                videoPlayerContextData.setBoundingBoxes(bestMatchingBoxes.boundingBoxes);
            }
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

    const {sendMessage} = useWebSocket(getUrl, {
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
