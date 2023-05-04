export class BoundingBox {
     x : Number;
     y: Number;
     height: Number;
     width: Number;
     id!: Number;
     constructor(clickX : number, clickY : number, releaseX : number, releaseY : number) {
        this.x =  clickX < releaseX ? clickX : releaseX;
        this.y = clickY < releaseY ? clickY : releaseY;
        
        this.width  = Math.abs(releaseX - clickX) ;
        this.height  = Math.abs(releaseY - clickY) ;

     }
}