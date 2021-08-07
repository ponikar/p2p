import { useContext, useEffect } from "react";
import { BaseContext } from "../components/base/base.context";
import { DataChannels } from "../constants/channels.constants";
import { ConnectionType, Peer } from "../types/connection.types";
import { iterateObjects } from "../utils/common.util";

export const useMeetingControl = (connections: ConnectionType) => {
  const { video, audio } = useContext(BaseContext);

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
