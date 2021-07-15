import React, { FC } from "react";


export interface NoWebcamPreviewType {
    src: string;
    participant_name: string;
}

export const NoWebcamPreview: FC<NoWebcamPreviewType> = React.memo(({ src, participant_name }) => {
  return <section className="bg-black flex items-center justify-center flex-col text-white w-full h-full">
      <img src="https://robohash.org/logo" alt="No webcam preview" className="rounded-full w-20 h-20" />
      <h2 className="text-base mt-3 font-semibold"> Darshan Ponikar </h2>
  </section>;
});
