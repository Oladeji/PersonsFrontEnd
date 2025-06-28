import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PersonResponse } from "../models/DTO";
import { QueryKeys } from "../constants/TanstackQueryKeys";
import { createPersonQuery } from "../API/Api";

export const useCreatePerson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newPerson: Omit<PersonResponse, "personId">) =>
        createPersonQuery(newPerson),
        onSettled: () =>queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetPersons.mainKey] }),
    });
};

