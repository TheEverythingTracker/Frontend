import React, {useContext} from "react";
import {IconButton} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import {VideoPlayerContext} from "../models/VideoPlayerContext";
import {VideoOverlay} from "./VideoOverlay";

export function VideoPlayer() {


    const videoPlayerContext = useContext(VideoPlayerContext);


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
            <VideoOverlay/>

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
