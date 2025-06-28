import { useQuery } from "@tanstack/react-query";
import { getPersonTypeQuery } from "../API/Api";
import { QueryKeys } from "../constants/TanstackQueryKeys";
import type { PersonTypeResponse } from "../models/DTO";

export const useGetPersonsTypes = () => {
    return useQuery<PersonTypeResponse[] | undefined, Error>({
        queryKey: [QueryKeys.useGetPersonTypes.mainKey],
        queryFn: () => getPersonTypeQuery(),
    });
};
