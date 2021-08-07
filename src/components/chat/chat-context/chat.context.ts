import { createContext } from "react";
import { MessageType } from "../../../types/chat.types";

interface DataChannelType {
  [key: string]: RTCDataChannel;
}

interface ChatContextType {
  setMessageProps: (props: MessageType) => void;
  messages: MessageType[];
  chatChannels: DataChannelType;
}

const CHAT_INITIAL_STATE: ChatContextType = {
  setMessageProps: () => null,
  messages: [],
  chatChannels: {},
};

export const ChatContext = createContext<ChatContextType>(CHAT_INITIAL_STATE);
