import React, {useState} from 'react';

import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircleIcon from '@mui/icons-material/Circle';
import {IconButton, InputBase} from "@mui/material";

export function BottomToolbar() {

    const [alignment, setAlignment] = useState('left');
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
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
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
