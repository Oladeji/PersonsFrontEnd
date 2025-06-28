import {
  MaterialReactTable,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PersonColumnHelper } from './PersonColumnHelper';
import type { PersonResponse } from '../models/DTO';
import { useDeletePerson } from '../hooks/useDeletePerson';
import { useUpdatePerson } from '../hooks/useUpdatePerson';
import { useCreatePerson } from '../hooks/useCreatePerson';
import { useGetPersons } from '../hooks/useGetPersons';
import { useGetPersonsTypes } from '../hooks/useGetPersonsTypes';
import EditPersonDialog from './EditPersonDialog';
import CreatePersonDialog from './CreatePersonDialog';

const Person = () => {

  const columns = PersonColumnHelper();
  const { mutateAsync: createPerson, isPending: isCreatingPerson } = useCreatePerson();
   
 
  const {
    data: fetchedPersons = [],
    isError: isLoadingPersonsError,
    isFetching: isFetchingPersons,
    isLoading: isLoadingPersons,
  } = useGetPersons();


  const {
    data: fetchedPersonsTypes = [],
    //isError: isLoadingPersonsTypesError,
   // isFetching: isFetchingPersonsTypes,
   // isLoading: isLoadingPersonsTypes,
  } = useGetPersonsTypes();

  const { mutateAsync: updatePerson, isPending: isUpdatingPerson } =  useUpdatePerson();
  const { mutateAsync: deletePerson, isPending: isDeletingPerson } = useDeletePerson();
   


  const handleCreatePerson: MRT_TableOptions<PersonResponse>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
  await createPerson(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSavePerson: MRT_TableOptions<PersonResponse>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    await updatePerson(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<PersonResponse>) => {
    if (window.confirm('Are you sure you want to delete this Person?')) {
      deletePerson(row.original.personId!);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedPersons,
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal',
    enableEditing: true,

    initialState: {
           pagination: { pageIndex: 0, pageSize: 10 },
      columnVisibility: {
        personTypeId: false, 
        'mrt-row-expand': false, 
      },
      
    },
    getRowId: (row) => row.personId?.toString() || '', 
    muiToolbarAlertBannerProps: isLoadingPersonsError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
  //  onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreatePerson,
  //  onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavePerson,




renderCreateRowDialogContent: ({ table, row }) => (
  <CreatePersonDialog table={table} row={row} personTypes={fetchedPersonsTypes} />
),
    
renderEditRowDialogContent: ({ table, row }) => (
  <EditPersonDialog table={table} row={row} personTypes={fetchedPersonsTypes} />
),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); 
        }}
      >
        Create New Person
      </Button>
    ),
    state: {
      isLoading: isLoadingPersons,
      isSaving: isCreatingPerson || isUpdatingPerson || isDeletingPerson,
      showAlertBanner: isLoadingPersonsError,
      showProgressBars: isFetchingPersons,
    },
  });

  return <MaterialReactTable table={table} />;
};


export default Person;


