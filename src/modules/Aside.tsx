import React from 'react';
import {Drawer, Typography} from "@mui/material";
import {TrackedObjectList} from "./TrackedObjectList";

export function Aside() {
    return (
        <div className="drawer">
            <Drawer
                PaperProps={{
                    sx: {
                        display: "flex",
                        top: "65px",
                        height: "100%",
                        width: "240px",
                        zIndex: "998"
                    }
                }}
                variant="permanent"
                anchor="right">
                <div id="drawer-header">
                    <Typography variant="h6" component="div" textAlign="center" paddingTop="15px">
                        Objects
                    </Typography>
                </div>
                <TrackedObjectList/>
            </Drawer>
        </div>
    );
}