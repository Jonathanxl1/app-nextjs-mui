"use client";

import { ChangeEvent, useState } from "react";
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

interface PropertyType {
  id: number;
  name: string;
}
interface FormType {
  name: string;
  description: string;
  properties: PropertyType["id"][];
}

type PropsFormsTypes = {
  submitFunction?: () => void;
};

function FormType({ submitFunction = () => {} }: PropsFormsTypes) {
  const { data: dataProperties } = usePropertiesStore((state) => state);
  const { action } = useStoreApp((state) => state);

  const [form, setForm] = useState<FormType>({
    name: "",
    description: "",
    properties: [],
  });

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
    const inputValue: string | number[] = value.target.value;

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
            onChange={(e) => setInput("name", e)}
          />
          <FormGroup>
            <InputLabel>Description </InputLabel>
            <TextareaAutosize onChange={(e) => setInput("description", e)} />
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
                  <Checkbox checked={form.properties.includes(id)} />
                  <ListItemText primary={name} />
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

export default FormType;
