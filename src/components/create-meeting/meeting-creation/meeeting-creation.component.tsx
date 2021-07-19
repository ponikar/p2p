import React, { FC } from "react";
import { MeetingCreationLeft } from "./meeting-creation-left.component";
import { MeetingCreationRight } from "./meeting-creation-right.component";
import "./meeting-creation.style.css"
export const MeetingCreation:FC = () => {
 
  return <section className="p-5 w-10/12 mx-auto flex items-center border-black">
      <MeetingCreationLeft />
      <MeetingCreationRight />
  </section>;
};
