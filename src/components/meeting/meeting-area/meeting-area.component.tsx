import React, { FC, useCallback, useEffect, useState } from "react"
import { DataChannels } from "../../../constants/channels.constants"
import { useConnections } from "../../../hooks/use-connections.hook"
import { DataChannelType } from "../../../types/connection.types"
import { MemberType } from "../../../types/members.types"
import { ChatArea } from "../../chat/chat-area/chat-area.component"
import { MeetingMembers } from "../meeting-members/meeting-members.component"

export const MeetingArea: FC = () => {
	const [connections] = useConnections()
	const [members, setMembers] = useState<MemberType>({})
	const [chatChannels, setChatChannels] = useState<DataChannelType>({})
	useEffect(() => {
		Object.keys(connections).forEach((key) => {
			const { connection, user } = connections[key]
			console.log("SETTING UP TRACK LISTENERS", connection)
			connection.ontrack = (e) => {
				console.log("I AM GETTING SOME TRACKS")
				setMembers((members) => ({
					...members,
					[user.uid]: { stream: e.streams[0], user },
				}))
			}
		})
	}, [connections, members])

	useEffect(() => {
		getPeers().forEach((peer) => {
			const { dataChannels, user } = peer[1]
			if (dataChannels)
				setChatChannels((c) => ({
					...c,
					[user.uid]: dataChannels[DataChannels.CHAT],
				}))
		})
	}, [connections])

	const getPeers = useCallback(() => {
		return Object.entries(connections)
	}, [connections])

	return (
		<main className="w-full relative grid grid-cols-12">
			<MeetingMembers members={members} />
			<ChatArea chatChannels={chatChannels} />
		</main>
	)
}
