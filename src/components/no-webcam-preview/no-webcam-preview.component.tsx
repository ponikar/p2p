import React, { FC } from "react";
import { UserType } from "../../types/user.type";
import { getRandomColor } from "../../utils/member.util";

export const NoWebcamPreview: FC<UserType> = React.memo(
  ({ displayName = "Monkey Mind" }) => {
    const avatar = `https://robohash.org/${Math.floor(Math.random() * 99)}`;
    return (
      <section
        style={{ backgroundColor: getRandomColor() }}
        className="flex items-center justify-center flex-col text-highlight w-full h-full"
      >
        <img
          src={avatar}
          alt="No webcam preview"
          className="rounded-full bg-secondryBack w-20 h-20"
        />
        <h2 className="text-base mt-3 font-semibold"> {displayName} </h2>
      </section>
    );
  }
);
