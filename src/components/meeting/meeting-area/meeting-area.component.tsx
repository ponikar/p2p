import React, { useEffect, useState } from "react";
import { useConnections } from "../../../hooks/use-connections.hook";
import ChatArea from "../../chat/chat-area/chat-area.component";
import {
  MeetingMembers,
  MemberType,
} from "../meeting-members/meeting-members.component";

export const MeetingArea = () => {
  const [connections] = useConnections();
  const [members, setMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    Object.keys(connections).forEach((key) => {
      const { connection, user } = connections[key];
      console.log("SETTING UP TRACK LISTENERS", connection);
      connection.ontrack = (e) => {
        console.log("I AM GETTING SOME TRACKS");
        setMembers((members) => [...members, { stream: e.streams[0], user }]);
      };
    });
  }, [connections, members]);

  return (
    <main className="w-full relative grid grid-cols-12">
      <MeetingMembers members={members} />
      <ChatArea />
    </main>
  );
};
