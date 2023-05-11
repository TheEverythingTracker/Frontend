import {Footer} from "./modules/Footer";
import {RightToolbar} from "./modules/RightToolbar";

import useWebSocket from 'react-use-websocket';
import React, {createContext, useState} from "react";
import "./App.css"
import {VideoPlayer} from "./modules/VideoPlayer";
import {VideoPlayerContext} from "./models/VideoPlayerContext";
import {WebsocketContext} from "./models/WebSocketContext";
import {EventType, UpdateTrackingEvent} from "./models/Event";
import {BoundingBox} from "./models/BoundingBox";

export const PlayerContext = createContext<VideoPlayerContext>(new VideoPlayerContext(false, () => {
}, [], () => {
}));


export const MyWebsocketContext = createContext<WebsocketContext>({} as WebsocketContext)

function App() {

    const videoPlayerContext: VideoPlayerContext = new VideoPlayerContext(...useState<boolean>(false), ...useState<BoundingBox[]>([]));

    const WS_URL = 'ws://localhost:8765';

    const {sendMessage} = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("Hallo")
        },
        onMessage: event => {
            let jsonEvent = JSON.parse(event.data)
            console.log(jsonEvent.event_type)
            if (jsonEvent.event_type === EventType.UPDATE_TRACKING) {
                let updateEvent = jsonEvent as UpdateTrackingEvent;
                console.log(updateEvent)
                videoPlayerContext.setBoundingBoxes(updateEvent.bounding_boxes)
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
