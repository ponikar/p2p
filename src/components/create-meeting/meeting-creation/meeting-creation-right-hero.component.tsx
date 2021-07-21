import React, { FC, useEffect, useState } from "react";

import frontHero from "../../../assets/imgs/front_hero.svg"
import secondHero from "../../../assets/imgs/second_hero.svg"



export const MeetingCreationRightHero:FC = () => {
    const [currentSrc, setCurrentSrc] = useState(frontHero);
    // useEffect(() => {
    //     setInterval(() => setCurrentSrc(currentSrc === frontHero ? secondHero : frontHero) , 5000);
    // }, []);
    return <section>
        <img src={currentSrc} className="mx-auto w-9/12" />
    </section>
}
