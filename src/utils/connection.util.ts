const servers: RTCConfiguration = {
	iceServers: [
		{
			urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
		},
	],
}

export const createConnection = async () => {
	const con = new RTCPeerConnection(servers)
	return con
}

export const addTracks = (
	con: RTCPeerConnection,
	stream: MediaStream,
	video: boolean
) => {
	const newStream = new MediaStream()
	stream.getTracks().forEach((s) => {
		s.enabled = video
		con.addTrack(s, newStream)
	})
}

export const removeTracks = (con: RTCPeerConnection) => {
	con.getSenders().forEach((sender) => con.removeTrack(sender))
}
