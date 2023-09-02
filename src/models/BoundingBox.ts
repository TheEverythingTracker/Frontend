export class BoundingBox {
    x: number;
    y: number;
    height: number;
    width: number;
    id: number;
    frame_number: number | null;
    static counter: number = 0;

    constructor(x: number, y: number, width: number, height: number, frame_number: number | null) {
        this.frame_number = frame_number;
        this.id = BoundingBox.counter++;
        this.x = x
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
