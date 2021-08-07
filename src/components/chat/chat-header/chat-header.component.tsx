import React, { FC, useEffect, useState } from "react"
import { Users } from "react-feather"
import { getCurrentTime } from "../../../utils/time.utills"

export const ChatHeader: FC = () => {
	const [currentTime, setCurrentTime] = useState(getCurrentTime())

	useEffect(() => {
		setInterval(() => {
			setCurrentTime(getCurrentTime())
		}, 60000)
	}, [])

	return (
		<header className="w-full px-4 p-3 flex items-center justify-between">
			<div className="flex  items-center">
				<Users size={18} />
				<span className="ml-1"> 45 </span>
			</div>

			<div className="text-xl">{currentTime}</div>
		</header>
	)
}
