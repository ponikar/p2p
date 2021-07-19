import { DataChannel } from "./connection.util";



export const sendMessageToMeeting = (message: string) => {
    if(DataChannel) {
        DataChannel.send(message);
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