import {Footer} from "./modules/Footer";


import useWebSocket from 'react-use-websocket';
import React, {useCallback, useContext, useRef, useState} from "react";
import "./App.css"
import {VideoPlayer} from "./modules/VideoPlayer";
import {VideoPlayerContext, VideoPlayerContextData} from "./models/VideoPlayerContext";
import {WebsocketContext, WebsocketContextData} from "./models/WebsocketContext";
import {EventType, UpdateTrackingEvent} from "./models/Event";
import {BoundingBox} from "./models/BoundingBox";
import {BoundingBoxFrameData} from "./models/BoundingBoxFrameData";
import {v4 as uuidv4} from 'uuid';
import Header from "./modules/Header";
import {Aside} from "./modules/Aside";


function App() {


    const boundingBoxesQueue = useRef(Array()); // Contains bounding boxes received from the backend
    const websocketUrl = useRef("")

    const initialTimestamp = useRef(0)
    const video = document.getElementById("video") as HTMLVideoElement;


    const videoPlayerContextData: VideoPlayerContextData = new VideoPlayerContextData(...useState<boolean>(false), 
    ...useState<BoundingBox[]>([]), ...useState<number[]>([]),useRef(0), useRef(true), useRef(false));

    const videoPlayerContext = useContext(VideoPlayerContext);

    const getUrl = useCallback(() => {
        if (websocketUrl.current === "") {
            let sessionId = uuidv4();
            websocketUrl.current = `ws://localhost:8000/websocket/${sessionId}`;
        }
        console.log(websocketUrl.current)
        return websocketUrl.current;
    }, [])

    async function delayPlayback() {
        video.pause()
        videoPlayerContextData.setIsPlaying(false)
        await new Promise(r => setTimeout(r, 120));
        await video.play().then(_ => videoPlayerContextData.setIsPlaying(true))
    }

    function drawFPS(timestamp: DOMHighResTimeStamp) {

        let currentTimeInMs = timestamp - initialTimestamp.current;
        if(videoPlayerContextData.frameCounter !== null) {
            let fps = Math.round(videoPlayerContextData.frameCounter.current / (currentTimeInMs / 1000));
            let fpsParagraph = document.getElementById("fps") as HTMLParagraphElement;
            if (fpsParagraph !== undefined) {
                fpsParagraph.innerText = "FPS: " + fps.toString();
                console.log("FPS should be set")
            }
            else {
                console.log("fpsParagraph is undefined")
            }
        }
        else {
            console.log("frameCounter is null")
        }
        
    }

    const handleNewFrame = async (now: DOMHighResTimeStamp, _: VideoFrameCallbackMetadata) => {

        console.log(videoPlayerContextData.frameCounter);
        if (videoPlayerContextData.frameCounter?.current === 0) {
            initialTimestamp.current = now;
        }
        drawFPS(now);
        let next = boundingBoxesQueue.current[0]
        if (next === undefined) {
            if(!videoPlayerContextData.boundingBoxListCleared.current) {
                await delayPlayback();
            }
            if(videoPlayerContextData.frameCounter?.current != null) {
                videoPlayerContextData.frameCounter!.current++
            }
        } else {
            let currFrame = videoPlayerContextData.frameCounter!.current++;

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
        if (!videoPlayerContextData.receivedFirstBox.current && boundingBoxesQueue.current.length > 0) {

            videoPlayerContextData.receivedFirstBox.current = true;
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
                boundingBoxesQueue.current.push(new BoundingBoxFrameData(updateEvent.frame_number, updateEvent.bounding_boxes));
                initHandleBoundingBoxes();
            }
        }
    });


    return (
        <WebsocketContext.Provider value={new WebsocketContextData(sendMessage)}>
            <VideoPlayerContext.Provider value={videoPlayerContextData}>
                <div className="App">
                    <Header></Header>
                    <VideoPlayer></VideoPlayer>
                    <Aside></Aside>
                    <Footer></Footer>
                </div>
            </VideoPlayerContext.Provider>
        </WebsocketContext.Provider>
    );
}

export default App;
