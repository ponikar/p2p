import React, { FC, memo, VideoHTMLAttributes } from "react";
import {
  NoWebcamPreview,
  NoWebcamPreviewType,
} from "../no-webcam-preview/no-webcam-preview.component";
import "./video-area.style.css";

interface VideoAreaProps extends NoWebcamPreviewType {
  video: boolean;
  videoRef: React.Ref<HTMLVideoElement>;
  className?: string;
}

export const VideoArea: FC<
  VideoAreaProps & VideoHTMLAttributes<HTMLVideoElement>
> = memo(
  ({ video, videoRef, src, participant_name, className = "", ...rest }) => {
    return (
      <div className={`${className} video-container`}>
        {video ? (
          <video {...rest} className="video-area" ref={videoRef} />
        ) : (
          <NoWebcamPreview {...{ src, participant_name }} />
        )}
      </div>
    );
  }
);
