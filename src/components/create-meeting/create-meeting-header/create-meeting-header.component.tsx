import React, { FC } from "react";
import { HelpCircle, Video } from "react-feather";
import { getCurrentTime, getDateTime } from "../../../utils/time.utills";

export const CreateMeetingHeader: FC = () => {
  return (
    <header className="w-10/12 text-highlight flex justify-between items-center mx-auto">
    <h1> P2P </h1>

    <section className="text-xl my-2 items-center flex">
        <p> {getCurrentTime()} &bull; {getDateTime()} </p>
        <HelpCircle className="text-sm cursor-pointer mx-3 text-primary" />
        <Video className="text-sm cursor-pointer mx-3 text-primary" />
        <img src="https://robohash.org/logo" className="w-12 h-12 ml-2 rounded-full" />
    </section>
    </header>
  );
};
