import {BoundingBox} from "./BoundingBox";
import {createContext} from "react";

export class VideoPlayerContextData {
    isPlaying: boolean;
    setIsPlaying: Function;
    boundingBoxes: BoundingBox[];
    setBoundingBoxes: Function;
/**
 * 
 * @param isPlaying: flag, true if video is currently played
 * @param setIsPlaying: setter for isPlaying-flag 
 * @param boundingBoxes: list of bounding boxes
 * @param setBoundingBoxes: setter for List of bounding boxes
 */
    constructor(isPlaying: boolean, setIsPlaying: Function, boundingBoxes: BoundingBox[], setBoundingBoxes: Function) {
        
        this.isPlaying = isPlaying;
        this.setIsPlaying = setIsPlaying;
        this.boundingBoxes = boundingBoxes;
        this.setBoundingBoxes = setBoundingBoxes;
    }
}

export const VideoPlayerContext = createContext<VideoPlayerContextData>(new VideoPlayerContextData(false, () => {
}, [], () => {
}));
