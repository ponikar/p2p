import React from "react";




export interface StreamingControlTypes {
    video: boolean;
    audio: boolean;
    
    videoRef: React.Ref<HTMLVideoElement>;
}