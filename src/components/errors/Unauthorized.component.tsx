import React, { FC } from "react";
import unauth from "../../assets/imgs/401.svg";
import { CreateMeetingHeader } from "../create-meeting/create-meeting-header/create-meeting-header.component";
export const Unauthorized: FC = () => {
  return (
    <>
      <CreateMeetingHeader />
      <section className="h-screen flex-col center">
        <h2 className="text-3xl text-highlight mb-20">
          Opps! Please login and try again.
        </h2>
        <img src={unauth} className="w-3/12" />
      </section>
    </>
  );
};
