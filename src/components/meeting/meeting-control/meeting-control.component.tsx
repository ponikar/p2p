import React from "react"
import { ControlButtonArea } from "../../webcam-streaming/control-button-area.component"


export const MeetingControl = () => {
    return <section className="absolute center bottom-0 w-full left-0 py-3 bg-white border-t">
       <ControlButtonArea buttonClassName="p-3 border mx-1" buttonSize={18} {...{video:false, audio:false, setControls: () => {}}} />
    </section>
}