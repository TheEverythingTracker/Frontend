import {BoundingBox} from "./BoundingBox";
import {createContext, useRef} from "react";

export class VideoPlayerContextData {
    isPlaying: boolean;
    setIsPlaying: Function;
    boundingBoxes: BoundingBox[];
    setBoundingBoxes: Function;
    boundingBoxListCleared: React.MutableRefObject<boolean>
    frameCounter: React.MutableRefObject<number> | null;

/**
 * 
 * @param isPlaying: flag, true if video is currently played
 * @param setIsPlaying: setter for isPlaying-flag 
 * @param boundingBoxes: list of bounding boxes
 * @param setBoundingBoxes: setter for List of bounding boxes
 * @param boundingBoxListCleared: ref_variable indicating that the list of BoundingBoxes is empty because the user purposly deleted them

 */
    constructor(isPlaying: boolean, setIsPlaying: Function, boundingBoxes: BoundingBox[], setBoundingBoxes: Function, frameCounter: React.MutableRefObject<number> | null, boundingBoxListCleared:React.MutableRefObject<boolean>) {
        
        this.isPlaying = isPlaying;
        this.setIsPlaying = setIsPlaying;
        this.boundingBoxes = boundingBoxes;
        this.setBoundingBoxes = setBoundingBoxes;
        this.frameCounter = frameCounter;
        this.boundingBoxListCleared = boundingBoxListCleared;
    }
}

// pass empty object as default data because we can't create meaningful defaults anyway
// (e.g. state and ref variables can't be created here because they can only be created
// inside  a function component or a custom React Hook function)
export const VideoPlayerContext = createContext<VideoPlayerContextData>({} as VideoPlayerContextData);


