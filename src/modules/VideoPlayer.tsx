import React, {useContext} from "react";
import {IconButton} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import {VideoPlayerContext} from "../models/VideoPlayerContext";
import {VideoOverlay} from "./VideoOverlay";

export function VideoPlayer() {


    const videoPlayerContext = useContext(VideoPlayerContext);

    async function handleOnClickPlayPause() {
        let video = document.getElementById("video") as HTMLVideoElement;

        if (!videoPlayerContext.isPlaying) {
            videoPlayerContext.setIsPlaying(true);
            await video.play();
        } else {
            // needed because of slowdown function
            while(!video.paused) {
                video.pause();
            }
            videoPlayerContext.setIsPlaying(false);
        }
    }

    function handleOnClickStop() {
        let video = document.getElementById("video") as HTMLVideoElement;
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        video.setAttribute("src", "");
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        videoPlayerContext.setIsPlaying(false);
        videoPlayerContext.setBoundingBoxes([]);
        let fpsParagraph = document.getElementById("fps") as HTMLParagraphElement;
        if (fpsParagraph !== undefined) {
            fpsParagraph.innerText = "";
        }
    }

    return (
        <div className="video-player">
            <video id="video" width="1280" height="720">
                <source type="video/mp4"/>
            </video>
            <VideoOverlay/>
            <div id="fpsDiv">
                <p id="fps"></p>
            </div>
            <div id="controls">
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
