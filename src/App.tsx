import {Footer} from "./modules/Footer";
import {RightToolbar} from "./modules/RightToolbar";

import useWebSocket from 'react-use-websocket';
import React from "react";
import "./App.css"
import {VideoPlayer} from "./modules/VideoPlayer";

function App() {

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
        <div className="App">

            <RightToolbar></RightToolbar>

            <VideoPlayer></VideoPlayer>

            <Footer></Footer>
        </div>
    );
}

export default App;
