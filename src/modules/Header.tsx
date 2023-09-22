import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
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
                    background:"#8d99ae"
                }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            The Everything Tracker
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}