import {Footer} from "./modules/Footer";
import {RightToolbar} from "./modules/RightToolbar";

import useWebSocket from 'react-use-websocket';
import React, {createContext, useState} from "react";
import "./App.css"
import {VideoPlayer} from "./modules/VideoPlayer";
import {VideoPlayerContext} from "./models/VideoPlayerContext";
import {WebsocketContext} from "./models/WebSocketContext";

export const PlayerContext = createContext<VideoPlayerContext>(new VideoPlayerContext(false, () => {
}));

export const MyWebsocketContext = createContext<WebsocketContext>({} as WebsocketContext)

function App() {
    const videoPlayerContext: VideoPlayerContext = new VideoPlayerContext(...useState(false));

    const WS_URL = 'ws://localhost:8765';
    const {sendMessage, lastMessage, readyState} = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("Hallo")
        },
        onMessage: event => {
            console.log(event.data)
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
