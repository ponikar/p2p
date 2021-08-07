import React, { FC } from "react"
import { ControlButtonArea } from "../../webcam-streaming/control-button-area.component"

export const MeetingControl: FC = () => {
	return (
		<section className="absolute center bottom-0 w-full left-0 py-3 bg-secondryBack">
			<ControlButtonArea buttonClassName="p-3 mx-1" buttonSize={18} />
		</section>
	)
}
