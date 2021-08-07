import axios from "axios"
import { useMutation } from "react-query"

interface useApiType {
	endpoint: string
}

export const useMutationApi = ({ endpoint }: useApiType) => {
	return useMutation((data) => {
		return axios.post(endpoint, data, {
			headers: {
				"Content-Type": "application/json",
			},
		})
	})
}
