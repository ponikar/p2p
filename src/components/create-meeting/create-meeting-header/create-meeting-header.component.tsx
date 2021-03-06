import React, { FC } from "react";
import { HelpCircle, Video } from "react-feather";
import { getDateTime } from "../../../utils/time.utills";
import { Signin } from "./signin.component";
import logo from "../../../assets/imgs/logo.svg";
import { useTime } from "../../../hooks/use-time.hook";
export const CreateMeetingHeader: FC = () => {
  const currentTime = useTime();
  return (
    <header className="w-10/12 text-highlight flex justify-between items-center mx-auto">
      <section className="py-5">
        <img src={logo} className="w-10 h-10" />
      </section>
      <section className="text-sm my-2 items-center flex">
        <p className="sm:mx-5 mx-0">
          {currentTime} &bull; {getDateTime()}
        </p>
        {/* <HelpCircle className="text-sm cursor-pointer mx-3 text-primary" />
        <Video className="text-sm cursor-pointer mx-3 text-primary" /> */}
        <Signin />
      </section>
    </header>
  );
};
