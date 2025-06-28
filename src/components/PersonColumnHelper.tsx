import { createMRTColumnHelper } from "material-react-table";
import type { PersonResponse } from "../models/DTO";

const columnHelper = createMRTColumnHelper<PersonResponse>();




export const PersonColumnHelper = () => {
  const result = [


    columnHelper.accessor((row) => row.personId?.toString(), {
      header: "ID",
      size: 150,

     
    }),

    columnHelper.accessor("name", {
      header: "Name",
      size: 160,

     
    }),
  columnHelper.accessor((row) => row.age?.toString(), {
      header: "Age",
      size: 80,

      
    }),

    columnHelper.accessor((row) => row.personTypeId?.toString(), {
      header: "personTypeId",
      size: 150,

     
    }),


    columnHelper.accessor("personType.typeName", {
      header: "Person Type",
      size: 150,

    }),

    
  ];

  return result;
};
