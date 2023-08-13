export class BoundingBox {
    x: Number;
    y: Number;
    height: Number;
    width: Number;
    id: Number;
    frame_number: Number | null;
    static counter: number = 0;

    constructor(clickX: number, clickY: number, releaseX: number, releaseY: number, frame_number: number | null) {
        this.frame_number = frame_number;
        this.id = BoundingBox.counter++;
        this.x = clickX < releaseX ? clickX : releaseX;
        this.y = clickY < releaseY ? clickY : releaseY;

        this.width = Math.abs(releaseX - clickX);
        this.height = Math.abs(releaseY - clickY);
    }
}
