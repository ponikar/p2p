import { UserType } from "./user.type"

export interface MemberProps {
	stream: MediaStream
	user: UserType
}

export interface MemberType {
	[key: string]: MemberProps
}
