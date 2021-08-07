import React, { FC, RefObject, useCallback, useContext, useEffect, useRef } from "react"
import "./webcam-streaming.style.css"
import { VideoArea } from "../video-area/video-area.component"
import { ControlButtonArea } from "./control-button-area.component"
import { motion } from "framer-motion"
import { BaseContext } from "../base/base.context"
import { getMedia } from "../../utils/media.utils"

interface WebCamStreamingProps {
	contstrainRef: RefObject<Element>
}
export const WebCamStreaming: FC<WebCamStreamingProps> = ({ contstrainRef }) => {
	const { video, audio } = useContext(BaseContext)
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		getUserMedia()
	}, [video])

	const getUserMedia = useCallback(async () => {
		const stream = await getMedia({ video: true, audio: true })
		if (!video) {
			stream.getTracks().forEach((e) => (e.enabled = false))
		}
		if (stream && videoRef.current) {
			videoRef.current.srcObject = stream
			videoRef.current.play()
		}
	}, [video, audio, videoRef.current])

	console.log(videoRef)

	return (
		<motion.div className="streaming-area" drag dragConstraints={contstrainRef}>
			<VideoArea
				{...{ video, videoRef }}
				src="src"
				muted
				className="streaming-video"
				participant_name="Darshan Ponikar"
			/>
			<div className="streaming-control">
				<ControlButtonArea />
			</div>
		</motion.div>
	)
}
