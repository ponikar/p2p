import React, { FC, memo } from "react";
import heroUrl from "../../../assets/imgs/hero.svg";
export const MeetingCreationRight: FC = memo(() => {
  return (
    <img className="col-span-8" src={heroUrl} alt="Video Meeting App Hero" />
  );
});
