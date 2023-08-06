import React, {useContext, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircleIcon from '@mui/icons-material/Circle';
import {IconButton, InputBase, TextField} from "@mui/material";
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
        <div style={{
            display: "flex",
            flexFlow: "row",
            position: "fixed",
            width: "calc(100%-6px)",
            bottom: "3px",
            left: "3px",
            right: "3px",
        }}>

            {/*<InputBase*/}
            {/*    sx={{ml: 1, flex: 1}}*/}
            {/*    placeholder="Search Stream-URL"*/}
            {/*    inputProps={{'aria-label': 'search Stream-URL'}}*/}
            {/*    value={videoSource}*/}
            {/*    onChange={e => {*/}
            {/*        setVideoSource(e.target.value);*/}
            {/*    }}*/}
            {/*/>*/}
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

            <IconButton onClick={() => {

            }}>
                <EditIcon></EditIcon>
            </IconButton>

            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment">
                <ToggleButton value="left" aria-label="left aligned">
                    <CircleIcon style={{color: "blue"}}/>
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered">
                    <CircleIcon style={{color: "red"}}/>
                </ToggleButton>
                <ToggleButton value="right" aria-label="right aligned">
                    <CircleIcon style={{color: "yellow"}}/>
                </ToggleButton>
            </ToggleButtonGroup>

        </div>
    );
}
