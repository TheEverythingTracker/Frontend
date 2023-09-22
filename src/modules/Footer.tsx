import React, {useContext, useState} from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import {IconButton, TextField} from "@mui/material";
import {VideoPlayerContext, VideoPlayerContextData} from "../models/VideoPlayerContext";
import {EventType, StartControlLoopEvent} from "../models/Event";
import {v4 as uuidv4} from 'uuid';
import {WebsocketContext} from "../models/WebsocketContext";


export function Footer() {

    const videoPlayerContextData: VideoPlayerContextData = useContext(VideoPlayerContext);
    const websocketContextData = useContext(WebsocketContext)

    const [alignment, setAlignment] = useState('left');
    const [videoSource, setVideoSource] = useState('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_30mb.mp4');
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return (
        <div className="footer"
             style={{
                 display: "flex",
                 flexFlow: "row",
                 position: "fixed",
                 maxWidth: "calc(100% - 260px)",
                 bottom: "3px",
                 left: "3px",
                 right: "3px",
                 zIndex: "999"
             }}>

            <TextField id="stream-url" label="Stream-URL" variant="outlined" value={videoSource}
                       onChange={e => setVideoSource(e.target.value)} style={{width: "100%"}}/>

            <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={() => {
                let video = document.getElementById("video");
                if (video !== null) {
                    let event = new StartControlLoopEvent(EventType.START_CONTROL_LOOP, uuidv4(), videoSource);
                    websocketContextData.sendEvent(event);
                    videoPlayerContextData.setIsPlaying(false);
                    video.setAttribute("src", videoSource);
                } else {
                    console.error("Video element not available");
                }
            }}>
                <PublishIcon/>
            </IconButton>
        </div>
    );
}
