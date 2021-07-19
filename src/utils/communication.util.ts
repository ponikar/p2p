import { Connection } from "./connection.util"



export const sendMessageToMeeting = (message: string) => {
    if(Connection.channel) {
        Connection.channel?.send(message);
    } else {
        console.log("NO CHANNEL");
    }
}

// export const sendVideoStreamToPeer = () => {
//     Connection.addTrack()
// }

// export const getPeersVideoStream = () => {
//     Connection.ontrack = e => {
//         e.streams
//     }
// }