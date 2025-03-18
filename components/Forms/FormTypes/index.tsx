"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

import { useStoreApp } from "@/store/application.store";
import { usePropertiesStore } from "@/store/properties.store";
import { useTypeStore } from "@/store/types.store";
import { TypeElement } from "@/interfaces/types.interface";

interface PropertyType {
  id: number;
  name: string;
}
type FormType = Partial<TypeElement>;

function FormType() {
  const { data: dataProperties } = usePropertiesStore((state) => state);
  const { action } = useStoreApp((state) => state);
  const { selectedType, createType, updateType } = useTypeStore(
    (state) => state
  );

  const [form, setForm] = useState<FormType>({
    name: "",
    description: "",
    properties: [],
  });

  useEffect(() => {
    if (action == "update") {
      if (selectedType) {
        setForm({
          id: selectedType.id,
          name: selectedType.name,
          description: selectedType.description,
          properties: selectedType?.properties || [],
        });
      }
    }
  }, [action]);

  function stringPropertiesSelected(selected: number[], data: PropertyType[]) {
    return data
      .filter(({ id }) => selected.includes(id))
      .map(({ name }) => name)
      .join(", ");
  }

  function setInput(
    key: string,
    value:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<typeof form.properties>
  ) {
    const inputValue: string | number[] | undefined = value.target.value;

    if (!inputValue) return;

    if (typeof inputValue !== "string") {
      setForm((state) => ({
        ...state,
        [key]: inputValue,
      }));
    } else {
      setForm((state) => ({
        ...state,
        [key]: inputValue,
      }));
    }
  }

  function submitForm() {
    if (action == "create") {
      createType(form);
    }
    if (action == "update") {
      if (selectedType?.id) {
        updateType(selectedType?.id, form);
      }
    }
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "12px",
        }}
      >
        <Typography variant="h5">
          {action == "create" ? "Crear Nuevo Tipos" : "Actualizar Tipo"}
        </Typography>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField
            variant="outlined"
            label="Nombre"
            value={form.name}
            onChange={(e) => setInput("name", e)}
          />
          <FormGroup>
            <InputLabel>Description </InputLabel>
            <TextareaAutosize
              value={form.description}
              onChange={(e) => setInput("description", e)}
            />
          </FormGroup>
          <FormControl>
            <InputLabel id="property-label">Properties</InputLabel>
            <Select
              label="Properties"
              labelId="property-label"
              multiple
              onChange={(e) => setInput("properties", e)}
              value={form.properties}
              renderValue={(selected) =>
                stringPropertiesSelected(selected, dataProperties)
              }
            >
              {dataProperties.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  <Checkbox
                    checked={
                      form?.properties ? form.properties.includes(id) : false
                    }
                  />
                  <ListItemText primary={name} />
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

export default FormType;
