import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../constants/TanstackQueryKeys";
import { deletePersonQuery } from "../API/Api";

export const useDeletePerson = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deletePersonQuery,
        onSettled: () =>queryClient.invalidateQueries({ queryKey: [QueryKeys.useGetPersons.mainKey] }),
    });
};


