import { useQuery } from "@tanstack/react-query";
import type { PersonResponse } from "../models/DTO";
import { QueryKeys } from "../constants/TanstackQueryKeys";
import { getPersonQuery } from "../API/Api";

export const useGetPersons = () => {
    return useQuery<PersonResponse[] | undefined, Error>({
        queryKey: [QueryKeys.useGetPersons.mainKey],
        queryFn: () => getPersonQuery(),
    });
};


