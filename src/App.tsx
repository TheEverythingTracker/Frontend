import {Footer} from "./modules/Footer";
import {RightToolbar} from "./modules/RightToolbar";

import useWebSocket from 'react-use-websocket';
import React, {createContext, useRef, useState} from "react";
import "./App.css"
import {VideoPlayer} from "./modules/VideoPlayer";
import {VideoPlayerContextData, VideoPlayerContext} from "./models/VideoPlayerContext";
import {WebsocketContextData, WebsocketContext} from "./models/WebsocketContext";
import {EventType, UpdateTrackingEvent} from "./models/Event";
import {BoundingBox} from "./models/BoundingBox";
import {BoundingBoxData} from "./models/BoundingBoxData";
import {json} from "stream/consumers";


function App() {

    const boundingBoxesQueue = useRef(Array());

    const handleIsStarted = useRef(false);

    const videoPlayerContextData: VideoPlayerContextData = new VideoPlayerContextData(...useState<boolean>(false), ...useState<BoundingBox[]>([]));

    const WS_URL = 'ws://localhost:8000/websocket/b81f11ae-22e0-49b2-81c2-5aa8d490c589';

    function initHandleBoundingBoxes() {
        if (!handleIsStarted.current && boundingBoxesQueue.current.length > 0) {

            handleIsStarted.current = true;
            console.log("rein in if abfrage");
            if (!videoPlayerContextData.isPlaying) {
                let video = document.getElementById("video") as HTMLVideoElement;
                video.addEventListener("playing", () => { // "playing" event is quicker, but does not work in firefox (workaround: "timeupdate")
                    console.log("add setInterval")
                    setInterval(() => {

                        let boundingBoxData: BoundingBoxData | undefined = boundingBoxesQueue.current.shift();

                        if (boundingBoxData !== undefined) {
                            videoPlayerContextData.setBoundingBoxes(boundingBoxData.boundingBoxes);
                        }

                    }, 40); // Delay Abhängig von den FPS!
                }, {once: true});
                videoPlayerContextData.setIsPlaying(true);
                video.play();
            }

            //return () => clearInterval(intervalBoundingBox.current);
        }
    }

    const {sendMessage} = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("Hallo")
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
