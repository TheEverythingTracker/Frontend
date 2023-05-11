import {Footer} from "./modules/Footer";
import {RightToolbar} from "./modules/RightToolbar";

import useWebSocket from 'react-use-websocket';
import React, {createContext, useState} from "react";
import "./App.css"
import {VideoPlayer} from "./modules/VideoPlayer";

export const PlayerContext = createContext([false, Function.prototype]);

function App() {

    const [isPlaying, setIsPlaying] = useState(false);

    const WS_URL = 'ws://localhost:8765'

    useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("Hallo")
        },
        onMessage: event => {
            console.log(event.data)
        }
    })

    return (

        <PlayerContext.Provider value={[isPlaying, setIsPlaying]}>
            <div className="App">

                <RightToolbar></RightToolbar>

                <VideoPlayer></VideoPlayer>

                <Footer></Footer>
            </div>
        </PlayerContext.Provider>
    );
}

export default App;
