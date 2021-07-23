import React, { RefObject } from "react";




export interface StreamingControlTypes {
    video: boolean;
    audio: boolean;
    
    videoRef: RefObject<HTMLVideoElement> | null;
}