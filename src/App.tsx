import {Footer} from "./modules/Footer";
import {RightToolbar} from "./modules/RightToolbar";

import useWebSocket from 'react-use-websocket';
import React, {createContext, useRef, useState} from "react";
import "./App.css"
import {VideoPlayer} from "./modules/VideoPlayer";
import {VideoPlayerContext} from "./models/VideoPlayerContext";
import {WebsocketContext} from "./models/WebSocketContext";
import {EventType, UpdateTrackingEvent} from "./models/Event";
import {BoundingBox} from "./models/BoundingBox";
import {BoundingBoxData} from "./models/BoundingBoxData";

export const PlayerContext = createContext<VideoPlayerContext>(new VideoPlayerContext(false, () => {
}, [], () => {
}));


export const MyWebsocketContext = createContext<WebsocketContext>({} as WebsocketContext)

function App() {

    const boundingBoxesQueue = useRef(new Array());

    //const intervalBoundingBox!: React.MutableRefObject<undefined>= useRef(undefined);

    const handleIsStarted = useRef(false);

    const videoPlayerContext: VideoPlayerContext = new VideoPlayerContext(...useState<boolean>(false), ...useState<BoundingBox[]>([]));

    const WS_URL = 'ws://localhost:8765';
/*
    React.useEffect(() => {
        console.log("rein in useeffekt");
        console.log(boundingBoxesQueue.current.length);
        if (boundingBoxesQueue.current.length > 0) {

            handleIsStarted.current = true;
            console.log("rein in if abfrage");
            if (!videoPlayerContext.isPlaying) {
                let video = document.getElementById("video") as HTMLVideoElement;
                videoPlayerContext.setIsPlaying(true);
                video.play().then(result => setInterval(() => {

                    let boundingBoxData: BoundingBoxData | undefined = boundingBoxesQueue.current.shift();

                    if (boundingBoxData !== undefined) {
                        videoPlayerContext.setBoundingBoxes(boundingBoxData.boundingBoxes);
                    }

                }, 100 / 3));
            }

            //return () => clearInterval(intervalBoundingBox.current);
        }
    },[boundingBoxesQueue.current]);
*/
    function test() {
        if (boundingBoxesQueue.current.length > 0 && !handleIsStarted.current) {

            handleIsStarted.current = true;
            console.log("rein in if abfrage");
            if (!videoPlayerContext.isPlaying) {
                let video = document.getElementById("video") as HTMLVideoElement;
                videoPlayerContext.setIsPlaying(true);
                video.play().then(result => setInterval(() => {

                    let boundingBoxData: BoundingBoxData | undefined = boundingBoxesQueue.current.shift();

                    if (boundingBoxData !== undefined) {
                        videoPlayerContext.setBoundingBoxes(boundingBoxData.boundingBoxes);
                    }

                }, 100/3));
            }

            //return () => clearInterval(intervalBoundingBox.current);
        }
    }
    
    const {sendMessage} = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("Hallo")
        },
        onMessage: event => {
            let jsonEvent = JSON.parse(event.data)
            console.log(jsonEvent.event_type)
            if (jsonEvent.event_type === EventType.UPDATE_TRACKING) {
                let updateEvent = jsonEvent as UpdateTrackingEvent;
                boundingBoxesQueue.current.push(new BoundingBoxData(updateEvent.frame, updateEvent.bounding_boxes));
                test();
            }
        }
    });


    return (
        <MyWebsocketContext.Provider value={new WebsocketContext(sendMessage)}>
            <PlayerContext.Provider value={videoPlayerContext}>
                <div className="App">

                    <RightToolbar></RightToolbar>

                    <VideoPlayer></VideoPlayer>

                    <Footer></Footer>
                </div>
            </PlayerContext.Provider>
        </MyWebsocketContext.Provider>
    );
}

export default App;
