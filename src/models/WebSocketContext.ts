import {SendMessage} from "react-use-websocket/dist/lib/types";

export class WebsocketContext {
    private sendMessage: SendMessage;

    sendEvent: Function = (message: Event) => {
        this.sendMessage(JSON.stringify(message))
    }

    constructor(sendMessage: SendMessage) {
        this.sendMessage = sendMessage;
    }
}
