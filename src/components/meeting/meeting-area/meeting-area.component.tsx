import React, { useCallback, useEffect, useState } from "react";
import { DataChannels } from "../../../constants/channels.constants";
import { makeContext } from "../../../hooks/context/use-make-context.hook";
import { useConnections } from "../../../hooks/use-connections.hook";
import { useMeetingControl } from "../../../hooks/use-meeting-control.hook";
import { DataChannelType, Peer } from "../../../types/connection.types";
import { MemberType } from "../../../types/members.types";
import { iterateObjects } from "../../../utils/common.util";
import { MeetingMembers } from "../meeting-members/meeting-members.component";
import { MeetingTab } from "../meeting-tab/meeting-tab.component";

export const MeetingAreaContext = makeContext<{
  members: MemberType;
  chatChannels: DataChannelType;
}>({ members: {}, chatChannels: {} });

export const MeetingArea = () => {
  const [connections] = useConnections();
  const [members, setMembers] = useState<MemberType>({});
  const [chatChannels, setChatChannels] = useState<DataChannelType>({});
  useMeetingControl(connections);

  useEffect(() => {
    if (Object.keys(connections).length === 0) return resetEverything();
    getPeers((con) => {
      const { connection, user } = con[1];

      // adding peer to screen
      setMembers((members) => ({
        ...members,
        [user.uid]: { stream: null, user },
      }));
      console.log("UPDATING MEMBERS");
      connection.ontrack = (e) => {
        console.log("I AM GETTING SOME TRACKS");

        // when stream, updating stream
        setMembers((members) => ({
          ...members,
          [user.uid]: { ...members[user.uid], stream: e.streams[0] },
        }));
      };
    });
  }, [connections]);

  useEffect(() => {
    getPeers((peer) => {
      const { dataChannels, user } = peer[1];
      if (dataChannels) {
        setChatChannels((c) => ({
          ...c,
          [user.uid]: dataChannels[DataChannels.CHAT],
        }));
        const controlChannel = dataChannels[DataChannels.STREAMING_CONTROLS];

        if (controlChannel) {
          const member = members[peer[0]];
          setMembers((m) => ({
            ...m,
            [peer[0]]: {
              ...member,
              controlChannel,
            },
          }));
        }
      }
    });
  }, [connections]);

  const resetEverything = () => {
    setMembers({});
    setChatChannels({});
  };

  const getPeers = useCallback(
    (callback: (peer: [string, Peer]) => void) => {
      iterateObjects<Peer>(connections, callback);
    },
    [connections]
  );

  return (
    <main className="w-full relative grid grid-cols-12">
      <MeetingMembers members={members} />
      <MeetingAreaContext.Provider value={{ members, chatChannels }}>
        <MeetingTab />
      </MeetingAreaContext.Provider>
    </main>
  );
};
