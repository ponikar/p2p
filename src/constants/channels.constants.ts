export const WebRTCChannels = {
	CHAT_CHANNEL: "CHAT_CHANNEL",
	getUserStreamingControl: (id: string): string => `STREAMING_CONTROL_${id}`,
}

export const SocketChannel = {
	onUser: "user-joined",
	onRoom: (id: string): string => `room-${id}`,
}

export const SocketEvents = {
	NEW: "NEW",
	OFFER: "OFFER",
	ANSWER: "ANSWER",
	ADD_ICE: "ADD_ICE",
}

export const DataChannels = {
	CHAT: "CHAT_CHANNEL",
}
