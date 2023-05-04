import React, {useState} from "react";
import {IconButton} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";


export function VideoPlayer() {

    const onClickCoords = {x: 0, y: 0}

    const onReleaseCoords = {x: 0, y: 0}

    const [isPlaying, setIsPlaying] = useState(false)

    function handleOnMouseDownOnCanvas(e: React.MouseEvent<HTMLCanvasElement>) {
        onClickCoords.x = e.pageX;
        onClickCoords.y = e.pageY;
    }

    function handleOnMouseMoveOnCanvas(e: React.MouseEvent<HTMLCanvasElement>) {
        onReleaseCoords.x = e.pageX;
        onReleaseCoords.y = e.pageY;
    }

    function handleOnMouseUpOnCanvas() {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D;

        if (canvas !== null) {
            ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            if (ctx !== null) {
                ctx.lineWidth = 4;
                ctx.strokeRect(onClickCoords.x, onClickCoords.y, onReleaseCoords.x - onClickCoords.x, onReleaseCoords.y - onClickCoords.y)
            }
        }
    }

    function handleOnClickPlayPause() {
        let video = document.getElementById("video") as HTMLVideoElement;

        if (!isPlaying) {
            setIsPlaying(true)
            console.log(isPlaying)
            video.play();
        } else {
            setIsPlaying(false)
            console.log(isPlaying)
            video.pause();
        }
    }

    function handleOnClickStop() {
        let video = document.getElementById("video") as HTMLVideoElement;
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        video.setAttribute("src", "");
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        setIsPlaying(false);
    }

    return(
        <div id="container">

            <video id="video" width="1280" height="720">
                <source type="video/mp4"/>
            </video>

            <canvas id="canvas" width="1280" height="720" onMouseDown={handleOnMouseDownOnCanvas}
                    onMouseMove={handleOnMouseMoveOnCanvas}
                    onMouseUp={handleOnMouseUpOnCanvas}>
            </canvas>

            <div id="controls">
                <div>

                </div>
                <div className="buttons">
                    <IconButton id="playPause" onClick={handleOnClickPlayPause}>
                        {!isPlaying && <PlayCircleOutlineIcon/>}
                        {isPlaying && <PauseCircleOutlineIcon/>}
                    </IconButton>
                    <IconButton onClick={handleOnClickStop}>
                        <StopCircleIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}