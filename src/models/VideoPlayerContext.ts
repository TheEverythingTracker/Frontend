export class VideoPlayerContext {
    isPlaying: boolean;
    setIsPlaying: Function;


    constructor(isPlaying: boolean, setIsPlaying: Function) {
        this.isPlaying = isPlaying;
        this.setIsPlaying = setIsPlaying;
    }
}
