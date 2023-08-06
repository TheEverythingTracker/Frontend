import {Avatar, Button, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {TrackedObjectListItem} from "./TrackedObjectListItem";
import {DeleteForever} from "@mui/icons-material";

export const TrackedObjectList = () => {

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <div>
            <List style={{display: "flex", flexFlow: "column"}}>
                <TrackedObjectListItem name="Object 1" deleteHandler={handleDelete}/>
                <TrackedObjectListItem name="Object 2" deleteHandler={handleDelete}/>
                <TrackedObjectListItem name="Object 3" deleteHandler={handleDelete}/>
                <TrackedObjectListItem name="Object 4" deleteHandler={handleDelete}/>
                <TrackedObjectListItem name="Object 5" deleteHandler={handleDelete}/>
            </List>
            <Divider/>
            <Button
                style={{display: "flex", color: "red", border: "solid", width: "96%", marginLeft: "2%", marginTop: "5px"}}>
                <DeleteForever/>
                <ListItemText primary={"Delete"}/>
            </Button>
        </div>
    );
};
