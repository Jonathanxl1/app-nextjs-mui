"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { typePropertyInput } from "@/interfaces/properties.interface";
import { useStoreApp } from "@/store/application.store";
import { usePropertiesStore } from "@/store/properties.store";

type PropsFormsProperties = {
  submitFunction: () => void;
};

interface FormProperties {
  name: string;
  type: typePropertyInput | null;
}

function FormProperties({
  submitFunction = () => {},
}: Partial<PropsFormsProperties>) {
  const { action } = useStoreApp((state) => state);
  const { defaultPropertiesInput, selectedProperty } = usePropertiesStore(
    (state) => state
  );

  const [form, setForm] = useState<FormProperties>({
    name: "",
    type: null,
  });

  useEffect(() => {
    if (action == "update") {
      if (selectedProperty) {
        setForm({
          name: selectedProperty?.name,
          type: selectedProperty?.type,
        });
      }
    }
  }, [action]);

  function setInput(
    key: string,
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<typeof form.type>
  ) {
    const { value } = e.target;

    setForm((state) => ({ ...state, [key]: value }));
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          padding: "12px",
        }}
      >
        <Typography variant="h5">
          {action == "create"
            ? "Crear Nueva Propiedad"
            : "Actualizar Propiedad"}
        </Typography>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField
            variant="outlined"
            label="Nombre"
            value={form.name}
            onChange={(e) => setInput("name", e)}
          />

          <FormControl>
            <InputLabel id="default-property-select">
              Tipo de Propiedad
            </InputLabel>
            <Select
              labelId="default-property-select"
              label="Tipo de Propiedad"
              onChange={(e) => setInput("type", e)}
              value={form.type}
            >
              {defaultPropertiesInput.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={submitFunction}>
            {action == "create" ? "Crear" : "Actualizar"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default FormProperties;
