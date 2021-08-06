import React, { FC, memo, useState } from "react";

import frontHero from "../../../assets/imgs/front_hero.svg";
import secondHero from "../../../assets/imgs/second_hero.svg";

export const MeetingCreationRightHero: FC = memo(() => {
  const [currentSrc, setCurrentSrc] = useState(frontHero);
  return (
    <section>
      <img src={currentSrc} className="mx-auto w-9/12" />
    </section>
  );
});
