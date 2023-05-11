import React, {useContext, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircleIcon from '@mui/icons-material/Circle';
import {IconButton, InputBase} from "@mui/material";
import {MyWebsocketContext, PlayerContext} from "../App";
import {VideoPlayerContext} from "../models/VideoPlayerContext";

export function Footer() {

    const videoPlayerContext: VideoPlayerContext = useContext(PlayerContext);
    const WebsocketContext = useContext(MyWebsocketContext)

    const [alignment, setAlignment] = useState('left');
    const [videoSource, setVideoSource] = useState('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4');
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
            width: "100%",
            bottom: "0",
            backgroundColor: "white"
        }}>

            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Search Stream-URL"
                inputProps={{'aria-label': 'search Stream-URL'}}
                value={videoSource}
                onChange={e => {
                    setVideoSource(e.target.value);
                }}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={() => {
                let video = document.getElementById("video");
                if (video !== null) {
                    let message = {
                        "event_type": "start-control-loop",
                        "request_id": "be94ef2e-24cc-4ed9-80a8-201b160dac76",
                        "video_source": videoSource
                    }
                    WebsocketContext.sendMessage(JSON.stringify(message));
                    videoPlayerContext.setIsPlaying(false);
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
