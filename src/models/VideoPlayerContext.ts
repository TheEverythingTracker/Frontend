import {BoundingBox} from "./BoundingBox";

export class VideoPlayerContext {
    isPlaying: boolean;
    setIsPlaying: Function;
    boundingBoxes: BoundingBox[];
    setBoundingBoxes: Function;


    constructor(isPlaying: boolean, setIsPlaying: Function, boundingBoxes: BoundingBox[], setBoundingBoxes: Function) {
        this.isPlaying = isPlaying;
        this.setIsPlaying = setIsPlaying;
        this.boundingBoxes = boundingBoxes;
        this.setBoundingBoxes = setBoundingBoxes;
    }
}
