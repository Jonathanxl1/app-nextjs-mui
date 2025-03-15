import { Box, Button, Select, TextField, Typography } from "@mui/material";

type PropsFormsProperties = {
  typeAction: string;
  submitFunction: () => void;
};

function FormProperties({
  typeAction = "crear",
  submitFunction = () => {},
}: Partial<PropsFormsProperties>) {
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
          Editar / Actualizar Form Properties
        </Typography>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField variant="outlined" label="Nombre" />
          <Select label="Selecciona el tipo de propiedad"></Select>
          <Button variant="contained" onClick={submitFunction}>
            {typeAction == "crear" ? "Crear" : "Actualizar"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default FormProperties;
