import {BoundingBox} from "./BoundingBox";
import {UpdateTrackingEvent} from "./Event";

export class BoundingBoxData {

    frame_number: Number;
    boundingBoxes: BoundingBox[];

    constructor(frame: number, boundingBoxes: BoundingBox[]){
        this.boundingBoxes = boundingBoxes;
        this.frame_number = frame;
    }
}
