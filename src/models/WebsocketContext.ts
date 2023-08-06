import {SendMessage} from "react-use-websocket/dist/lib/types";
import {createContext} from "react";

export class WebsocketContextData {
    private sendMessage: SendMessage;

    sendEvent: Function = (message: Event) => {
        this.sendMessage(JSON.stringify(message))
    }

    constructor(sendMessage: SendMessage) {
        this.sendMessage = sendMessage;
    }
}


export const WebsocketContext = createContext<WebsocketContextData>({} as WebsocketContextData)
