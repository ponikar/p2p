import React, { FC, memo, VideoHTMLAttributes } from "react";
import { UserType } from "../../types/user.type";
import { NoWebcamPreview } from "../no-webcam-preview/no-webcam-preview.component";
import "./video-area.style.css";

interface VideoAreaProps extends UserType {
  video: boolean;
  videoRef: React.Ref<HTMLVideoElement>;
  className?: string;
}

export const VideoArea: FC<
  VideoAreaProps & VideoHTMLAttributes<HTMLVideoElement>
> = memo(
  ({
    video,
    videoRef,
    src,
    displayName,
    uid,
    email,
    className = "",
    muted,
    ...rest
  }) => {
    return (
      <div className={`${className} video-container`}>
        {video ? (
          <video muted {...rest} className="video-area" ref={videoRef} />
        ) : (
          <NoWebcamPreview {...{ displayName, uid, email, muted }} />
        )}
      </div>
    );
  }
);
