import React, { FC } from "react";

export interface NoWebcamPreviewType {
  src: string;
  participant_name: string;
}

export const NoWebcamPreview: FC<NoWebcamPreviewType> = React.memo(() => {
  return (
    <section className="flex bg-primary items-center justify-center flex-col text-highlight w-full h-full">
      <img
        src="https://robohash.org/logo"
        alt="No webcam preview"
        className="rounded-full bg-secondryBack w-20 h-20"
      />
      <h2 className="text-base mt-3 font-semibold"> Darshan Ponikar </h2>
    </section>
  );
});

NoWebcamPreview.displayName = "NoWebcamPreview";
