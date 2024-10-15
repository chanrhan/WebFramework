import React from "react";
import {Outlet} from "react-router-dom";

export function ChatBotButton(){
    return (
        <>
            <Outlet/>
            <button type="button" className="chatbot_btn">챗봇</button>
        </>
    )
}