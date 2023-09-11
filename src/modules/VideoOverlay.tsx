import React, {useContext, useEffect, useRef, useState} from "react";
import {BoundingBox} from "../models/BoundingBox";
import {VideoPlayerContext} from "../models/VideoPlayerContext";
import {WebsocketContext} from "../models/WebsocketContext";
import {AddBoundingBoxEvent, EventType} from "../models/Event";
import {v4 as uuidv4} from "uuid";

const styles = {
    canvas: {
        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✍️</text></svg>") 5 25,auto`
    }
};

const pixelsX = 1280;
const pixelsY = 720;

export function VideoOverlay() {
    const [isDrawing, setIsDrawing] = useState(false);
    const currentlyDrawingBox = useRef({
        left: Number.MAX_SAFE_INTEGER,
        right: 0,
        top: Number.MAX_SAFE_INTEGER,
        bottom: 0
    })
    const videoPlayerContext = useContext(VideoPlayerContext);
    const websocketContext = useContext(WebsocketContext);
    // todo: Das braucht man, wenn die Größe des Canvas veränderlich sein soll
    // const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(
        // todo: Das braucht man, wenn die Größe des Canvas veränderlich sein soll
        () => {
            // define the resize function for the canvas
            // const resize = () => {
            //     const canvas = canvasRef.current;
            //     if (canvas) {
            //         canvas.width = window.innerWidth;
            //         canvas.height = window.innerHeight;
            //     }
            // };

            // resize();

            // window.addEventListener("resize", resize);

            // remove listeners on unmount.
            return () => {
                // window.removeEventListener("resize", resize);
            };
        },
        []
    );

    function constrainValue(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }

    function setBoundingBoxCorners(x: number, y: number) {
        x = constrainValue(x, 0, pixelsX);
        y = constrainValue(y, 0, pixelsY);
        currentlyDrawingBox.current.left = Math.min(currentlyDrawingBox.current.left, x);
        currentlyDrawingBox.current.right = Math.max(currentlyDrawingBox.current.right, x);
        currentlyDrawingBox.current.top = Math.min(currentlyDrawingBox.current.top, y);
        currentlyDrawingBox.current.bottom = Math.max(currentlyDrawingBox.current.bottom, y);
    }

    function resetBoundingBoxCorners() {
        currentlyDrawingBox.current = {
            left: Number.MAX_SAFE_INTEGER,
            right: 0,
            top: Number.MAX_SAFE_INTEGER,
            bottom: 0
        };
    }

    function getBoundingBox() {
        let x = currentlyDrawingBox.current.left;
        let y = currentlyDrawingBox.current.top;
        let width = Math.abs(currentlyDrawingBox.current.right - currentlyDrawingBox.current.left);
        let height = Math.abs(currentlyDrawingBox.current.bottom - currentlyDrawingBox.current.top);
        let frameNr: number | undefined = videoPlayerContext.frameCounter?.current;
        return new BoundingBox(x, y, width, height, frameNr);
    }

    return (
        <div>
            <svg id="svgBoundingBoxesView" className="svgView" width="1280" height="720">
                {videoPlayerContext.boundingBoxes.map((element, index) => {
                    // Render all bounding boxes to be displayed
                    return (
                        <rect key={element.id} stroke="#d90429" strokeWidth="4" fill="none" x={element.x.toString()}
                              y={element.y.toString()} height={element.height.toString()}
                              width={element.width.toString()}/>
                    );
                })}
            </svg>
            <canvas id="canvas" width="1280" height="720"
                    style={styles.canvas}
                // todo: Das braucht man, wenn die Größe des Canvas veränderlich sein soll
                // ref={canvasRef}
                    onMouseDown={(e) => {
                        // know that we are drawing, for future mouse movements.
                        setIsDrawing(true);
                        let video = document.getElementById("video") as HTMLVideoElement;
                        video.pause();
                        // todo set videoPlayerContext.setIsPlaying(false); (currently setting this stops the boundingBoxes from being rendered)

                        const context = e.currentTarget.getContext("2d");
                        // begin path.
                        if (context) {
                            context.beginPath();
                            context.lineWidth = 6;
                            context.strokeStyle = "#d90429";
                            context.lineWidth = 5;
                            context.lineCap = "round";
                            context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                            setBoundingBoxCorners(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                        }
                    }}
                    onMouseMove={(e) => {
                        // only handle mouse moves when the mouse is already down.
                        if (isDrawing) {
                            const context = e.currentTarget.getContext("2d");
                            if (context) {
                                context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                                context.stroke();
                                setBoundingBoxCorners(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                            }
                        }
                    }}
                    onMouseUp={(e) => {
                        // end drawing.
                        setIsDrawing(false);
                        const context = e.currentTarget.getContext("2d");
                        const video = document.getElementById("video") as HTMLVideoElement;
                        video.play()
                        // todo set videoPlayerContext.setIsPlaying(true); (currently setting this stops the boundingBoxes from being rendered)
                        if (context) {
                            let box = getBoundingBox()
                            resetBoundingBoxCorners();
                            context.clearRect(0, 0, e.currentTarget.width, e.currentTarget.height);
                            if(video.getAttribute("src")) {
                                videoPlayerContext.setBoundingBoxes([...videoPlayerContext.boundingBoxes, box]);
                                let event: AddBoundingBoxEvent = new AddBoundingBoxEvent(EventType.ADD_BOUNDING_BOX, uuidv4(), 0, box);
                                websocketContext.sendEvent(event);
                                console.log("AddBoundingBoxEvent sent for Object with ID " + event.bounding_box.id + " and frame number " + event.frame_number)
                            }
                        }
                    }}
            />
        </div>
    );
}
