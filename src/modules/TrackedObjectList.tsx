import {Button, Divider, List, ListItemText} from "@mui/material";
import React, {useContext} from "react";
import {TrackedObjectListItem} from "./TrackedObjectListItem";
import {DeleteForever} from "@mui/icons-material";
import {VideoPlayerContext} from "../models/VideoPlayerContext";
import {WebsocketContext} from "../models/WebsocketContext";
import {DeleteBoundingBoxesEvent, EventType} from "../models/Event";
import {v4 as uuidv4} from 'uuid';
import {BoundingBox} from "../models/BoundingBox";

export const TrackedObjectList = () => {

    const videoPlayerContext = useContext(VideoPlayerContext);
    const websocketContext = useContext(WebsocketContext);

    const handleDelete = (id: number) => {
        websocketContext.sendEvent(new DeleteBoundingBoxesEvent(EventType.DELETE_BOUNDING_BOX, uuidv4(), [id]));

        // first option:
        // Doesnt work because box is sometimes instanceOf Object and not BoundingBox
        // const removedBoundingBox = videoPlayerContext.boundingBoxes.splice(id, 1);
        // console.log(`Removed Bounding Box: ${removedBoundingBox.toString()}`);
        // console.log(`Removed Bounding Box:   ID: ${removedBoundingBox[0].id} Frame: ${removedBoundingBox[0].frame_number}`);

        // second option:
        const filtered = videoPlayerContext.boundingBoxes.filter((box) => box.id !== id);
        videoPlayerContext.setBoundingBoxes(filtered);

        // todo: solution for -> videoplayercontext.boundingboxes doesnt get immediate update with setBoundingBoxes(filtered)
        console.log("Remaining BoundingBoxes:");
        setTimeout(() => videoPlayerContext.boundingBoxes.forEach((box) => console.log(`ID: ${box.id} Frame: ${box.frame_number}`)), 5000);
        videoPlayerContext.boundingBoxes.forEach((box) => console.log(`ID: ${box.id} Frame: ${box.frame_number}`));
    };

    function handleDeleteAll() {
        let allIds: number[] = [];
        videoPlayerContext.boundingBoxes.forEach((element) => allIds.push(element.id));
        websocketContext.sendEvent(new DeleteBoundingBoxesEvent(EventType.DELETE_BOUNDING_BOX, uuidv4(), allIds));
        videoPlayerContext.setBoundingBoxes([]);

        console.log("Removed all Bounding Boxes");
        console.log("Remaining BoundingBoxes:");
        videoPlayerContext.boundingBoxes.forEach((box) => console.log(`ID: ${box.id} Frame: ${box.frame_number}`));

        // Doesnt work because box is sometimes instanceOf Object and not BoundingBox
        // videoPlayerContext.boundingBoxes.forEach((box) => console.log(box.toString()));
    }

    return (
        <div>
            <List style={{display: "flex", flexFlow: "column"}}>
                {videoPlayerContext.boundingBoxes.map((element, index) => {
                    return (
                        <TrackedObjectListItem key={element.id} name={`Object ${element.id + 1}`} deleteHandler={() => handleDelete(element.id)}/>
                    );
                })}
            </List>
            <Divider/>
            <Button
                style={{display: "flex", color: "red", border: "solid", width: "96%", marginLeft: "2%", marginTop: "5px"}}
                onClick={handleDeleteAll}>
                <DeleteForever/>
                <ListItemText primary={"Delete All"}/>
            </Button>
        </div>
    );
};
