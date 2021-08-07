import React, { FC, memo } from "react"
import { MemberType } from "../../../types/members.types"
import { MeetingControl } from "../meeting-control/meeting-control.component"
import { MeetingMember } from "../meeting-member/meeting-member.component"

interface MeetingMembersProps {
	members: MemberType
}

export const MeetingMembers: FC<MeetingMembersProps> = memo(({ members }) => {
	return (
		<section
			className={`container relative col-span-9 ${
				Object.keys(members).length <= 4 && "items-center"
			} flex justify-center flex-wrap max-h-screen overflow-y-auto h-screen`}>
			{Object.entries(members).map((m) => (
				<MeetingMember {...m[1]} membersLength={Object.keys(members).length} key={m[0]} />
			))}
			<MeetingControl />
		</section>
	)
})

MeetingMembers.displayName = "MeetingMembers"
