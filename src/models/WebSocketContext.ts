import {SendMessage} from "react-use-websocket/dist/lib/types";

export class WebsocketContext {
    sendMessage: SendMessage;

    constructor(sendMessage: SendMessage) {
        this.sendMessage = sendMessage;
    }
}
