import {BoundingBox} from "./BoundingBox";
import {createContext, useRef} from "react";

export class VideoPlayerContextData {
    isPlaying: boolean;
    setIsPlaying: Function;
    boundingBoxes: BoundingBox[];
    setBoundingBoxes: Function;
    frameCounter: React.MutableRefObject<number> | null;

   

/**
 * 
 * @param isPlaying: flag, true if video is currently played
 * @param setIsPlaying: setter for isPlaying-flag 
 * @param boundingBoxes: list of bounding boxes
 * @param setBoundingBoxes: setter for List of bounding boxes
 */
    constructor(isPlaying: boolean, setIsPlaying: Function, boundingBoxes: BoundingBox[], setBoundingBoxes: Function, frameCounter: React.MutableRefObject<number> | null) {
        
        this.isPlaying = isPlaying;
        this.setIsPlaying = setIsPlaying;
        this.boundingBoxes = boundingBoxes;
        this.setBoundingBoxes = setBoundingBoxes;
        this.frameCounter = frameCounter;
    }
}
export const VideoPlayerContext = createContext<VideoPlayerContextData>(new VideoPlayerContextData(false, () => {
}, [], () => {}, null));

