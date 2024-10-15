import {Stomp, Client} from "@stomp/stompjs";
import SockJS from 'sockjs-client'
import {freeze} from "@reduxjs/toolkit";

export const connectClient = (client, accessToken, onConnect)=>{
    client.current = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
          "X-ACCESS-TOKEN": accessToken
        },
        debug: (str)=>{
            console.log(`debug: ${str}`)
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: onConnect,
        onStompError: (frame)=>{
            console.error(`stomp error: ${frame}`)
        },
        onWebSocketError: evt => {
            console.error(`websocket error: ${evt}`)
        }
    });
    client.current.activate();
}

export const disconnectClient = (client)=>{
    client.current.deactivate();
}