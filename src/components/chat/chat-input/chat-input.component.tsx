import React, { FC } from "react";
import { Send, Smile } from "react-feather";

export const ChatInput: FC = () => {
  return (
    <section className="w-11/12 items-center flex rounded-3xl py-2 px-3 my-2  border">
      <Smile className="text-gray-400 cursor-pointer" size={28} />
      <input className="w-full mx-1 text-sm p-1" placeholder="Type a message!" />
      <SendButton />
    </section>
  );
};

const SendButton = () => {
  return (
    <button className="center text-sm p-1 rounded-full">
    Send
    </button>
  );
};
