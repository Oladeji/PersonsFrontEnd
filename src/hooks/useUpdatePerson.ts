import { useMutation, useQueryClient } from "@tanstack/react-query";

import type {  UpdatePersonRequest } from "../models/DTO";
import { QueryKeys } from "../constants/TanstackQueryKeys";
import { updatePersonQuery } from "../API/Api";

export const useUpdatePerson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (person: UpdatePersonRequest) =>  updatePersonQuery( person),
        onSettled: () => queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetPersons.mainKey] }),
    });
};


