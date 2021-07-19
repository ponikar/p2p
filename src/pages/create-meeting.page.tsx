import React, { FC, memo, useState } from "react";
import { sendMessageToMeeting } from "../utils/communication.util";
import { acceptOffer, connectRemoteToLocal, createMeetingOffer } from "../utils/connection.util";




export const CreateMeeting:FC = memo(() => {
    const [ans, setAns] = useState<string>("");
    const [res, setRes] = useState<string>("");
    const [msg, setMessage] = useState<string>("");
    return <div>
        step 1:
        <button onClick={createMeetingOffer}> CreateMeeting </button>
        <br />

        <input value={ans} placeholder="paste answer" onChange={e => setAns(e.target.value)} />
        <button onClick={_ => acceptOffer(JSON.parse(ans))}> Answer </button>
        step 2:
        <br /> 
        <input value={res} placeholder="paste RESPONSE" onChange={e => setRes(e.target.value)} />
        <button onClick={_ => connectRemoteToLocal(JSON.parse(res))}> connect </button>
        
        <section className="border">
            <input placeholder="MSG" type="text" value={msg} onChange={e => setMessage(e.target.value)} />
            <button onClick={_ => sendMessageToMeeting(msg)}>Send </button>
        </section>
    </div> 
})
