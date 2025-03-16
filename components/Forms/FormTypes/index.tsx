"use client";

import { useStoreApp } from "@/store/application.store";
import {
  Box,
  Button,
  FormGroup,
  InputLabel,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

type PropsFormsTypes = {
  submitFunction?: () => void;
};

function FormType({ submitFunction = () => {} }: PropsFormsTypes) {
  const { action } = useStoreApp((state) => state);

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
          <TextField variant="outlined" label="Nombre" />
          <FormGroup>
            <InputLabel>Description </InputLabel>
            <TextareaAutosize />
          </FormGroup>
          <Select label="Selecciona el tipo"></Select>
          <Button variant="contained" onClick={submitFunction}>
            {action == "create" ? "Crear" : "Actualizar"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default FormType;
