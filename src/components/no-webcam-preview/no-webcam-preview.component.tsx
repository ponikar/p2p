import React, { FC } from "react";
import { MicOff } from "react-feather";
import { UserType } from "../../types/user.type";
import { getRandomColor } from "../../utils/member.util";

interface NoWebcamPreview extends UserType {
  muted: boolean | undefined;
}

export const NoWebcamPreview: FC<NoWebcamPreview> = React.memo(
  ({ displayName, muted, avatar }) => {
    const color = getRandomColor();

    return (
      <section
        style={{ backgroundColor: color }}
        className="flex items-center relative justify-center flex-col text-highlight w-full h-full"
      >
        {muted && (
          <div className="absolute rounded-full top-2 p-2 bg-secondryBack left-2">
            <MicOff stroke={color} strokeWidth={2} size={12} />
          </div>
        )}
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
