import {Button, Divider, List, ListItemText} from "@mui/material";
import React, {useContext} from "react";
import {TrackedObjectListItem} from "./TrackedObjectListItem";
import {DeleteForever} from "@mui/icons-material";
import {VideoPlayerContext} from "../models/VideoPlayerContext";
import {WebsocketContext} from "../models/WebsocketContext";
import {DeleteBoundingBoxesEvent, EventType} from "../models/Event";
import {v4 as uuidv4} from 'uuid';

export const TrackedObjectList = () => {

    const videoPlayerContext = useContext(VideoPlayerContext);
    const websocketContext = useContext(WebsocketContext);

    const handleDelete = (id: number) => {
        websocketContext.sendEvent(new DeleteBoundingBoxesEvent(EventType.DELETE_BOUNDING_BOX, uuidv4(), [id]))
        const removedBoundingBox = videoPlayerContext.boundingBoxes.splice(id, 1);
        console.log(`Removed Bounding Box: ${removedBoundingBox[0]}`);
        console.log(`Remaining BoundingBoxes: ${videoPlayerContext.boundingBoxes}`);
    };

    function handleDeleteAll() {
        let allIds: number[] = [];
        videoPlayerContext.boundingBoxes.forEach((element) => allIds.push(element.id));
        websocketContext.sendEvent(new DeleteBoundingBoxesEvent(EventType.DELETE_BOUNDING_BOX, uuidv4(), allIds));
        videoPlayerContext.boundingBoxes = [];
        console.log("Removed all Bounding Boxes");
        console.log(`Remaining BoundingBoxes: ${videoPlayerContext.boundingBoxes}`);
    }

    return (
        <div>
            <List style={{display: "flex", flexFlow: "column"}}>
                {videoPlayerContext.boundingBoxes.map((element, index) => {
                    return (
                        <TrackedObjectListItem name={`Object ${element.id + 1}`} deleteHandler={() => handleDelete(element.id)}/>
                    );
                })}
            </List>
            <Divider/>
            <Button
                style={{display: "flex", color: "red", border: "solid", width: "96%", marginLeft: "2%", marginTop: "5px"}}
                onClick={handleDeleteAll}>
                <DeleteForever/>
                <ListItemText primary={"Delete"}/>
            </Button>
        </div>
    );
};
