import {BottomToolbar} from "./BottomToolbar";
import {RightToolbar} from "./RightToolbar";

import useWebSocket from 'react-use-websocket';
import React from "react";

function App() {

    const WS_URL = 'ws://localhost:8765'
    const onClickCoords: [x: number, y: number] = [0, 0]
    const onReleaseCoords: [x: number, y: number] = [0, 0]


    useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("Hallo")
        },
        onMessage: event => {
            console.log(event.data)
        }
    })


    function handleOnMouseDownOnCanvas(e: React.MouseEvent<HTMLCanvasElement>) {
        onClickCoords[0] = e.pageX;
        onClickCoords[1] = e.pageY;
    }

    function handleOnMouseMoveOnCanvas(e: React.MouseEvent<HTMLCanvasElement>) {
        onReleaseCoords[0] = e.pageX;
        onReleaseCoords[1] = e.pageY;
    }

    function handleOnMouseUpOnCanvas() {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D;

        if (canvas !== null) {
            ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            if (ctx !== null) {
                ctx.lineWidth = 4;
                ctx.strokeRect(onClickCoords[0], onClickCoords[1], onReleaseCoords[0] - onClickCoords[0], onReleaseCoords[1] - onClickCoords[1])
            }
        }
    }

    return (
        <div className="App">

            <canvas style={{position: "absolute", top: 0, left: 0, zIndex: 10}}
                    id="canvas" width="1280" height="720" onMouseDown={handleOnMouseDownOnCanvas}
                    onMouseMove={handleOnMouseMoveOnCanvas}
                    onMouseUp={handleOnMouseUpOnCanvas}>
            </canvas>

            <video style={{position: "absolute", top: 0, left: 0}}
                   id="video" controls width="1280" height="720">
                <source type="video/mp4"/>
            </video>

            <RightToolbar></RightToolbar>

            <BottomToolbar></BottomToolbar>
        </div>
    );
}

export default App;
