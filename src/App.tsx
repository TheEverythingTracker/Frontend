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

    const videoPlayerContext: VideoPlayerContext = new VideoPlayerContext(...useState<boolean>(false), ...useState<BoundingBox[]>([]));

    const WS_URL = 'ws://localhost:8765';

    React.useEffect(() => {
        const intervalBoundingBox = setInterval(() => {
            let boundingBoxData: BoundingBoxData | undefined = boundingBoxesQueue.current.shift();
            console.log(Date.now() )
            console.log(boundingBoxData)

            if (boundingBoxData !== undefined) {
                videoPlayerContext.setBoundingBoxes(boundingBoxData.boundingBoxes);
                if (!videoPlayerContext.isPlaying) {
                    let video = document.getElementById("video") as HTMLVideoElement;
                    videoPlayerContext.setIsPlaying(true);
                    video.play();
                }
            }
          }  , 100/3);
          return () => clearInterval(intervalBoundingBox);
    },[ ]);

    
    
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
