import { UserType } from "./user.type"

export interface MessageType {
	text: string
	id: string
	user: UserType

	createdAt: string | null
	updatedAt: string | null
}
