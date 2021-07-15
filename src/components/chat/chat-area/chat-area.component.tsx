import React from "react";
import { ChatInput } from "../chat-input/chat-input.component";
import { ChatMessageArea } from "../chat-message-area/chat-message-area.component";


const ChatArea = () => {
    return <section className="col-span-3 flex flex-col justify-end items-center  border">
    <ChatMessageArea />
    <ChatInput />
    </section>
}


export default ChatArea;