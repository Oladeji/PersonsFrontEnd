import { useQuery } from "@tanstack/react-query";
import type { PersonResponse } from "../models/DTO";
import { QueryKeys } from "../constants/TanstackQueryKeys";
import axios from "axios";
import { Personendpoints } from "../constants/Personendpoints";


const getPersonQuery = async (): Promise<PersonResponse[]> => {
    const response = await axios.get<PersonResponse[]>(Personendpoints);
    return response.data;
};
export const useGetPersons = () => {
    return useQuery<PersonResponse[] | undefined, Error>({
        queryKey: [QueryKeys.useGetPersons.mainKey],
        queryFn: () => getPersonQuery(),
    });
};

