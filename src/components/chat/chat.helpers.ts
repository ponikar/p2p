import { MessageType } from "../../types/chat.types";
import { UserType } from "../../types/user.type";


type makeNewMessageProps = { text: string, user: UserType | null }
export const makeNewMessage = ({ text, user = null }: makeNewMessageProps) :MessageType =>({
  text,
  id: String(Date.now()),
  createdAt: new Date().toUTCString(),
  updatedAt: null,

  user
});
