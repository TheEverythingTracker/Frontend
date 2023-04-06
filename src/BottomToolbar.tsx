import React, {useState} from 'react';

import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircleIcon from '@mui/icons-material/Circle';
import {IconButton, InputBase} from "@mui/material";

export function BottomToolbar() {

    const [alignment, setAlignment] = useState('left');
    const [videoSource, setVideoSource] = useState('');
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return (
        <div style={{display:"flex", flexFlow:"row", position:"fixed", width:"100%", bottom:"0", backgroundColor:"white"}}>

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Stream-URL"
                inputProps={{ 'aria-label': 'search Stream-URL' }}
                value={videoSource}
                onChange={ e => {
                    setVideoSource(e.target.value);
                }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
                let video =  document.getElementById("video");
                // @ts-ignore
                video.setAttribute("src", videoSource);
            }}>
                <PlayArrowIcon />
            </IconButton>

            <IconButton>
                <EditIcon></EditIcon>
            </IconButton>

            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment">
            <ToggleButton value="left" aria-label="left aligned">
                <CircleIcon style={{color:"blue"}}/>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
                <CircleIcon style={{color:"red"}}/>
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
                <CircleIcon style={{color:"yellow"}}/>
            </ToggleButton>
        </ToggleButtonGroup>

        </div>
    );
}
