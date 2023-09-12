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

        websocketContext.sendEvent(new DeleteBoundingBoxesEvent(EventType.DELETE_BOUNDING_BOX, uuidv4(), [id]))
        const updatedBoundingBoxesList = videoPlayerContext.boundingBoxes.filter((box: BoundingBox) => box.id !== id);
        videoPlayerContext.boundingBoxes = updatedBoundingBoxesList;
        videoPlayerContext.setBoundingBoxes(videoPlayerContext.boundingBoxes)
        videoPlayerContext.boundingBoxListCleared.current = updatedBoundingBoxesList.length === 0

    };

    const handleDeleteAll = () => {
        let allIds: number[] = [];

        videoPlayerContext.boundingBoxes.forEach((element) => allIds.push(element.id));
        websocketContext.sendEvent(new DeleteBoundingBoxesEvent(EventType.DELETE_BOUNDING_BOX, uuidv4(), allIds));
        videoPlayerContext.boundingBoxes = [];
        videoPlayerContext.setBoundingBoxes(videoPlayerContext.boundingBoxes)
        videoPlayerContext.boundingBoxListCleared.current = true;
    };

    return (
        <div>
            <List style={{display: "flex", flexFlow: "column"}}>
                {videoPlayerContext.boundingBoxes.map((element, _) => {
                    return (
                        <TrackedObjectListItem name={`Object ${element.id + 1}`}
                                               deleteHandler={() => handleDelete(element.id)}
                                               key={element.id}/>
                    );
                })}
            </List>
            <Divider/>
            <Button
                style={{
                    display: "flex",
                    color: "#d90429",
                    border: "solid",
                    width: "96%",
                    marginLeft: "2%",
                    marginTop: "5px"
                }}
                onClick={handleDeleteAll}>
                <DeleteForever/>
                <ListItemText primary={"Delete"}/>
            </Button>
        </div>
    );
};
