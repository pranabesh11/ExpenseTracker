import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client = null;

export function connectWebSocket(onMessage) {
  client = new Client({
    webSocketFactory: () => {
      return new SockJS("http://localhost:8080/ws");
    },

    onConnect: () => {
      console.log("Connected");

      client.subscribe("/topic/chat/10", (message) => {
        const data = JSON.parse(message.body);

        onMessage(data);
      });
    },
  });

  client.activate();
}
