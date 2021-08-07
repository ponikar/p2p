import React, { FC, memo } from "react";

import frontHero from "../../../assets/imgs/front_hero.svg";

export const MeetingCreationRightHero: FC = memo(() => {
  return (
    <section>
      <img src={frontHero} className="mx-auto w-9/12" />
    </section>
  );
});

MeetingCreationRightHero.displayName = "MeetingCreationRightHero";
