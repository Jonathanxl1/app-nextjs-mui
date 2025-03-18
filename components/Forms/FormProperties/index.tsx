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

import { PropertiesElement } from "@/interfaces/properties.interface";
import { useStoreApp } from "@/store/application.store";
import { usePropertiesStore } from "@/store/properties.store";

type FormProperties = Partial<PropertiesElement>;

function FormProperties() {
  const { action } = useStoreApp((state) => state);
  const {
    defaultPropertiesInput,
    selectedProperty,
    createProperty,
    updateProperty,
  } = usePropertiesStore((state) => state);

  const [form, setForm] = useState<FormProperties>({
    name: "",
    type: "text",
  });

  useEffect(() => {
    if (action == "update") {
      if (selectedProperty) {
        setForm({
          id: selectedProperty.id,
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

  function submitForm() {
    if (action == "create") {
      createProperty(form);
    } else {
      if (selectedProperty) updateProperty(selectedProperty.id, form);
    }
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
          <Button variant="contained" onClick={submitForm}>
            {action == "create" ? "Crear" : "Actualizar"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default FormProperties;
