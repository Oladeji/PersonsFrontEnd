import React, { useState } from "react";
import { DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";
import type { MRT_Row, MRT_TableInstance } from "material-react-table";
import type { PersonResponse, PersonTypeResponse } from "../models/DTO";
import { useCreatePerson } from "../hooks/useCreatePerson";

interface CreatePersonDialogProps {
  table: MRT_TableInstance<PersonResponse>;
  row: MRT_Row<PersonResponse>;
  personTypes?: PersonTypeResponse[];
}

const CreatePersonDialog: React.FC<CreatePersonDialogProps> = ({ table, row, personTypes }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [personTypeId, setPersonTypeId] = useState("");
  const [errors, setErrors] = useState<{ name?: string; age?: string; personTypeId?: string }>({});
  const createPerson = useCreatePerson();

  React.useEffect(() => {
    row._valuesCache.name = name;
    row._valuesCache.age = age;
    row._valuesCache.personTypeId = personTypeId;
  }, [name, age, personTypeId, row]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!age || isNaN(Number(age)) || Number(age) <= 0) newErrors.age = "Valid age is required";
    if (!personTypeId) newErrors.personTypeId = "Person Type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    await createPerson.mutateAsync({
      name,
      age: Number(age),
      personTypeId: personTypeId ? Number(personTypeId) : undefined,
    });
   // table.setCreatingRow(null);
  };

  return (
    <>
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.6rem",
          color: "#1976d2",
          textAlign: "center",
          mb: 2,
          letterSpacing: "0.02em",
        }}
      >
        ➕ Create New Person
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
         // minWidth: 400,
          background: "linear-gradient(135deg, #f8fafc 0%, #e9ecef 100%)",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          variant="outlined"
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          type="number"
          variant="outlined"
          fullWidth
          required
          error={!!errors.age}
          helperText={errors.age}
        />
        {personTypes && (
          <TextField
            select
            label="Person Type"
            value={personTypeId}
            onChange={e => setPersonTypeId(e.target.value)}
            variant="outlined"
            fullWidth
            required
            error={!!errors.personTypeId}
            helperText={errors.personTypeId}
          >
            {personTypes.map((type) => (
              <MenuItem key={type.personTypeId} value={type.personTypeId}>
                {type.typeName}
              </MenuItem>
            ))}
          </TextField>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
           onClick={() => table.setCreatingRow(null)}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default CreatePersonDialog;