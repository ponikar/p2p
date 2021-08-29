import { createContext } from "react";
import { MessageType } from "../../../types/chat.types";

interface ChatContextType {
  setMessageProps: (props: MessageType) => void;
  messages: MessageType[];
}

const CHAT_INITIAL_STATE: ChatContextType = {
  setMessageProps: () => {},
  messages: [],
};

export const ChatContext = createContext<ChatContextType>(CHAT_INITIAL_STATE);
