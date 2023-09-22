import {BoundingBox} from "./BoundingBox";

export class BoundingBoxFrameData {

    frame_number: number;
    boundingBoxes: BoundingBox[];

    constructor(frame_number: number, boundingBoxes: BoundingBox[]){
        this.boundingBoxes = boundingBoxes;
        this.frame_number = frame_number;
    }
}
