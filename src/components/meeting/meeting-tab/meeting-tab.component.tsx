import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { MessageType } from "../../../types/chat.types";
import { iterateObjects } from "../../../utils/common.util";
import { removeDataChannelListener } from "../../../utils/connection.util";
import { ChatArea } from "../../chat/chat-area/chat-area.component";
import { MeetingAreaContext } from "../meeting-area/meeting-area.component";
import { MeetingMembersList } from "../meeting-members-list/meeting-members-list.componet";
import { MeetingTabHeader } from "./meeting-tab-header.component";

export const MeetingTab: FC = () => {
  const [isChatTabActive, setIsChatTabActive] = useState(false);
  const { chatChannels } = useContext(MeetingAreaContext);

  const [messages, setMessage] = useState<MessageType[]>([]);

  const setMessageProps = useCallback(
    (message: MessageType) => setMessage([...messages, message]),
    [messages, setMessage]
  );

  useEffect(() => {
    if (chatChannels) {
      iterateObjects<RTCDataChannel>(chatChannels, (peer) => {
        if (peer[1])
          peer[1].onmessage = (e) => {
            setMessageProps(JSON.parse(e.data));
          };
      });
    }

    return () => {
      iterateObjects<RTCDataChannel>(chatChannels, ([index, channel]) => {
        removeDataChannelListener(channel);
      });
    };
  }, [chatChannels, messages]);

  return (
    <section className="col-span-3 flex flex-col text-highlight border-secondryBack border">
      <MeetingTabHeader {...{ isChatTabActive, setIsChatTabActive }} />
      {isChatTabActive ? (
        <ChatArea {...{ messages, setMessageProps }} />
      ) : (
        <MeetingMembersList />
      )}
    </section>
  );
};
