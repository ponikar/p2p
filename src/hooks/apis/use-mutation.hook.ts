import axios from "axios";
import { useMutation } from "react-query";

interface useApiType {
  endpoint: string;
}

export const useMutationApi = <DataType, Error = {}, ParamType = void>({
  endpoint,
}: useApiType) => {
  return useMutation<DataType, Error, ParamType>((data) => {
    return axios.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};
