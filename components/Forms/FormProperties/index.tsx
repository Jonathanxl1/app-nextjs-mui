"use client";

import { useStoreApp } from "@/store/application.store";
import { Box, Button, Select, TextField, Typography } from "@mui/material";

type PropsFormsProperties = {
  submitFunction: () => void;
};

function FormProperties({
  submitFunction = () => {},
}: Partial<PropsFormsProperties>) {
  const { action } = useStoreApp((state) => state);

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
          <TextField variant="outlined" label="Nombre" />
          <Select label="Selecciona el tipo de propiedad"></Select>
          <Button variant="contained" onClick={submitFunction}>
            {action == "create" ? "Crear" : "Actualizar"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default FormProperties;
