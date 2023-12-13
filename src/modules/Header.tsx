import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CellTowerIcon from '@mui/icons-material/CellTower';
import NoCellIcon from '@mui/icons-material/NoCell';

interface Header {
    websocketConnected: boolean;
}

export default function Header({websocketConnected}: Header) {
    return (
        <div className="header"
             style={{
                 display: "flex",
                 flexFlow: "column",
                 position: "fixed",
                 width: "100%",
                 zIndex: "999"
             }}>
            <Box>
                <AppBar position="static"
                        style={{
                            background: "#8d99ae"
                        }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            The Everything Tracker
                        </Typography>
                        {websocketConnected ? <CellTowerIcon/> : <NoCellIcon/>}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
