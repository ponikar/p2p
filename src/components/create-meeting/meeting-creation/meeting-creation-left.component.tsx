import React, { FC } from "react";
import { PrimaryButton } from "../../common/button.component";

export const MeetingCreationLeft: FC = () => {
  return (
    <div className="flex-1">
      <header className="xl:text-4xl text-3xl">
        <h2> Hangout with your Friends,</h2>
        <h2> Feel like Home! </h2>
      </header>

      <div className="flex">
        <PrimaryButton className="my-5">New Meeting</PrimaryButton>
      </div>
    </div>
  );
};
