import { useContext, useEffect } from "react";
import { useMeetingAreaContext } from "../components/meeting/meeting-area/meeting-area.context";
import { DataChannels } from "../constants/channels.constants";
import { ConnectionType, Peer } from "../types/connection.types";
import { iterateObjects } from "../utils/common.util";

export const useMeetingControl = (connections: ConnectionType) => {
  const { video, audio } = useMeetingAreaContext();

  useEffect(() => {
    iterateObjects<Peer>(connections, ([, { dataChannels }]) => {
      if (dataChannels) {
        const channel = dataChannels[DataChannels.STREAMING_CONTROLS];
        if (channel && channel.readyState === "open") {
          console.log("SENDING CONTROLS");
          channel.send(JSON.stringify({ video, audio }));
        }
      }
    });
  }, [connections, video, audio]);
  return [];
};
