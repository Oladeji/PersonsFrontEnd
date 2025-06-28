import React, { useState } from "react";
import { DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";
import type { MRT_Row, MRT_TableInstance } from "material-react-table";
import type { PersonResponse, PersonTypeResponse } from "../models/DTO";
import { useUpdatePerson } from "../hooks/useUpdatePerson";

interface EditPersonDialogProps {
  table: MRT_TableInstance<PersonResponse>;
  row: MRT_Row<PersonResponse>;
  personTypes?: PersonTypeResponse[];
}

const EditPersonDialog: React.FC<EditPersonDialogProps> = ({ table, row, personTypes }) => {
  const [name, setName] = useState(row.original.name ?? "");
  const [age, setAge] = useState(row.original.age ?? "");
  const [personTypeId, setPersonTypeId] = useState(row.original.personTypeId);
  const [errors, setErrors] = useState<{ name?: string; age?: string; personTypeId?: string }>({});

  const updatePerson = useUpdatePerson();

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
  personTypeId&&  await updatePerson.mutateAsync({
      ...row.original,
      name,
      age,
      personTypeId,
    });
    table.setEditingRow(null);
  };

  React.useEffect(() => {
    row._valuesCache.name = name;
    row._valuesCache.age = age;
    row._valuesCache.personTypeId = personTypeId;
  }, [name, age, personTypeId, row]);

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
        ✏️ Edit Person
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background: "linear-gradient(135deg, #f8fafc 0%, #e9ecef 100%)",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
        }}
      >
        <TextField
          sx={{ mt: 2 }}
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
          onChange={e => setAge(Number(e.target.value))}
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
            value={personTypeId ?? ""}
            onChange={e => setPersonTypeId(Number(e.target.value))}
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
                  variant="outlined"
                  color="secondary"
                   onClick={() => table.setEditingRow(null)}
                >
                  Cancel
                </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </>
  );
};
export default EditPersonDialog;