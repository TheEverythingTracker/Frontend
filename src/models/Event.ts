import {BoundingBox} from "./BoundingBox";

export enum EventType {
    START_CONTROL_LOOP = "start-control-loop",
    ADD_BOUNDING_BOX = "add-bounding-box",
    DELETE_BOUNDING_BOX = "delete-bounding-boxes",
    UPDATE_TRACKING = "update-tracking",
    STOP_CONTROL_LOOP = "stop-control-loop",
    SUCCESS = "success",
    FAILURE = "failure",
    TRACKING_ERROR = "tracking-error"
}


export abstract class Event {
    event_type: EventType;

    protected constructor(event_type: EventType) {
        this.event_type = event_type;
    }
}

export class TrackingErrorEvent extends Event {
    message: String;
    boundingBoxId: number;
    constructor(event_type: EventType, message: String, boundingBoxId: number) {
        super(event_type);
        this.message = message;
        this.boundingBoxId = boundingBoxId;
    }
}

export abstract class IdEvent extends Event {
    request_id: String;

    protected constructor(event_type: EventType, request_id: String) {
        super(event_type);
        this.request_id = request_id;
    }

}

export class StartControlLoopEvent extends IdEvent {
    video_source: String;

    constructor(event_type: EventType, request_id: String, video_source: String) {
        super(event_type, request_id);
        this.video_source = video_source;
    }
}

export class AddBoundingBoxEvent extends IdEvent {
    frame_number: number;
    bounding_box: BoundingBox;


    constructor(event_type: EventType, request_id: String, frame: number, bounding_box: BoundingBox) {
        super(event_type, request_id);
        this.frame_number = frame;
        this.bounding_box = bounding_box;
    }
}


export class DeleteBoundingBoxesEvent extends IdEvent {
    ids: number[];

    constructor(event_type: EventType, request_id: String, ids: number[]) {
        super(event_type, request_id);
        this.ids = ids;
    }
}

export class UpdateTrackingEvent extends Event {
    frame_number: number;
    bounding_boxes: BoundingBox[];

    constructor(event_type: EventType, frame: number, bounding_boxes: BoundingBox[]) {
        super(event_type);
        this.frame_number = frame;
        this.bounding_boxes = bounding_boxes;
    }
}


export class StopControlLoopEvent extends IdEvent {

    constructor(event_type: EventType, request_id: String) {
        super(event_type, request_id);
    }
}

export abstract class AnswerEvent extends IdEvent {
    message: String;

    protected constructor(event_type: EventType, request_id: String, message: String) {
        super(event_type, request_id);
        this.message = message;
    }
}

export class SuccessEvent extends AnswerEvent {

    constructor(event_type: EventType, request_id: String, message: String) {
        super(event_type, request_id, message);
    }
}


export class FailureEvent extends AnswerEvent {

    constructor(event_type: EventType, request_id: String, message: String) {
        super(event_type, request_id, message);
    }
}
