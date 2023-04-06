import {BottomToolbar} from "./BottomToolbar";
import {RightToolbar} from "./RightToolbar";

import useWebSocket from 'react-use-websocket';

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


            <p>Test Video</p>
            <video id="video" controls autoPlay height="800">
                <source type="video/mp4"/>
            </video>

            <RightToolbar></RightToolbar>

            <BottomToolbar></BottomToolbar>
        </div>
    );
}

export default App;
