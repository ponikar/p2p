import { MessageType } from "../../types/chat.types";
import { UserType } from "../../types/user.type";


type makeNewMessageProps = { text: string, user: UserType }
export const makeNewMessage = ({ text, user }: makeNewMessageProps) :MessageType =>({
  text,
  id: String(Date.now()),
  createdAt: new Date().toUTCString(),
  updatedAt: null,
  user
});
