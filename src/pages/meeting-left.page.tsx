import React from "react";
import { CreateMeetingHeader } from "../components/create-meeting/create-meeting-header/create-meeting-header.component";
import bye from "../assets/imgs/bye.svg";
import { PrimaryButton } from "../components/common/button.component";
import { useHistory } from "react-router-dom";
export const MeetingLeft = () => {
  const { replace } = useHistory();
  return (
    <>
      <CreateMeetingHeader />
      <section className="flex flex-col center h-screen">
        <h2 className="text-highlight w-5/12 mx-auto text-center mb-10 text-4xl">
          We hope that you have enjoyed the meeting. Have a great day!{" "}
        </h2>
        <img alt="P2P have a great day" className="w-3/12" src={bye} />
        <PrimaryButton onClick={(_) => replace("/")}>
          Back to Home
        </PrimaryButton>
      </section>
    </>
  );
};
