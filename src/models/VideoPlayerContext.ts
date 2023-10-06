import {BoundingBox} from "./BoundingBox";
import {createContext, useRef} from "react";

export class VideoPlayerContextData {
    isPlaying: boolean;
    setIsPlaying: Function;
    boundingBoxes: BoundingBox[];
    setBoundingBoxes: Function;
    deletedBoundingBoxIds: number[];
    setDeletedBoundingBoxIds: Function;
    boundingBoxListCleared: React.MutableRefObject<boolean>
    frameCounter: React.MutableRefObject<number> | null;
    receivedFirstBox: React.MutableRefObject<boolean>;

    /**
     * @param isPlaying {flag, true if video is currently played}
     * @param setIsPlaying {setter for isPlaying-flag}
     * @param boundingBoxes {list of bounding boxes}
     * @param setBoundingBoxes {setter for List of bounding boxes}
     * @param deletedBoundingBoxIds {blacklist for deleted bounding boxes, which should not be displayed anymore}
     * @param setDeletedBoundingBoxIds {set blacklist}
     * @param frameCounter {Counts the current frame number}
     * @param boundingBoxListCleared {ref_variable indicating that the list of BoundingBoxes is empty because the user purposely deleted them}
     * @param receivedFirstBox {indicates, that boundingbox-data has been received}
     */
    constructor(isPlaying: boolean, setIsPlaying: Function, boundingBoxes: BoundingBox[], setBoundingBoxes: Function, deletedBoundingBoxIds: number[], setDeletedBoundingBoxIds: Function,
                frameCounter: React.MutableRefObject<number> | null, boundingBoxListCleared: React.MutableRefObject<boolean>, receivedFirstBox: React.MutableRefObject<boolean>) {

        this.isPlaying = isPlaying;
        this.setIsPlaying = setIsPlaying;
        this.boundingBoxes = boundingBoxes;
        this.setBoundingBoxes = setBoundingBoxes;
        this.deletedBoundingBoxIds = deletedBoundingBoxIds;
        this.setDeletedBoundingBoxIds = setDeletedBoundingBoxIds;
        this.frameCounter = frameCounter;
        this.boundingBoxListCleared = boundingBoxListCleared;
        this.receivedFirstBox = receivedFirstBox;
    }
}

// pass empty object as default data because we can't create meaningful defaults anyway
// (e.g. state and ref variables can't be created here because they can only be created
// inside  a function component or a custom React Hook function)
export const VideoPlayerContext = createContext<VideoPlayerContextData>({} as VideoPlayerContextData);


