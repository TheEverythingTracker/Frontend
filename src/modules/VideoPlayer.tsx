import React, {useContext} from "react";
import {IconButton} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import {BoundingBox} from "../models/BoundingBox";
import {AddBoundingBoxEvent, EventType} from "../models/Event";
import {v4 as uuidv4} from 'uuid';
import {VideoPlayerContext} from "../models/VideoPlayerContext";
import {WebsocketContext} from "../models/WebsocketContext";

export function VideoPlayer() {

    const onClickCoords = {x: 0, y: 0}

    const onReleaseCoords = {x: 0, y: 0}

    const videoPlayerContext = useContext(VideoPlayerContext);
    const websocketContext = useContext(WebsocketContext)


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
                let box: BoundingBox = new BoundingBox(onClickCoords.x, onClickCoords.y, onReleaseCoords.x, onReleaseCoords.y, null);
                videoPlayerContext.setBoundingBoxes([...videoPlayerContext.boundingBoxes, box]);
                let event: AddBoundingBoxEvent = new AddBoundingBoxEvent(EventType.ADD_BOUNDING_BOX, uuidv4(), 0, box);
                websocketContext.sendEvent(event);
            }
        }
    }

    function handleOnClickPlayPause() {
        let video = document.getElementById("video") as HTMLVideoElement;

        if (!videoPlayerContext.isPlaying) {
            videoPlayerContext.setIsPlaying(true);
            video.play();
        } else {
            videoPlayerContext.setIsPlaying(false);
            video.pause();
        }
    }

    function handleOnClickStop() {
        let video = document.getElementById("video") as HTMLVideoElement;
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        video.setAttribute("src", "");
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        videoPlayerContext.setIsPlaying(false);
        videoPlayerContext.setBoundingBoxes([]);
    }

    return (
        <div id="video-container">

            <video id="video" width="1280" height="720">
                <source type="video/mp4"/>
            </video>
            <svg id="svgViewBox" width="1280" height="720">
                {videoPlayerContext.boundingBoxes.map((element, index) => {
                    // Render all bounding boxes to be displayed
                    return (
                        <rect stroke="black" strokeWidth="4" fill="none" x={element.x.toString()}
                              y={element.y.toString()} height={element.height.toString()}
                              width={element.width.toString()}/>
                    );
                })}
            </svg>
            <canvas id="canvas" width="1280" height="720" onMouseDown={handleOnMouseDownOnCanvas}
                    onMouseMove={handleOnMouseMoveOnCanvas}
                    onMouseUp={handleOnMouseUpOnCanvas}>
            </canvas>

            <div id="controls">
                <div>

                </div>
                <div className="buttons">
                    <IconButton id="playPause" onClick={handleOnClickPlayPause}>
                        {!videoPlayerContext.isPlaying && <PlayCircleOutlineIcon/>}
                        {videoPlayerContext.isPlaying && <PauseCircleOutlineIcon/>}
                    </IconButton>
                    <IconButton onClick={handleOnClickStop}>
                        <StopCircleIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
