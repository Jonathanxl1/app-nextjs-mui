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
  typeAction?: string;
  submitFunction?: () => void;
};

function FormType({
  typeAction = "crear",
  submitFunction = () => {},
}: PropsFormsTypes) {
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
        <Typography variant="h5">Editar / Actualizar Form Type</Typography>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField variant="outlined" label="Nombre" />
          <FormGroup>
            <InputLabel>Description </InputLabel>
            <TextareaAutosize />
          </FormGroup>
          <Select label="Selecciona el tipo"></Select>
          <Button variant="contained" onClick={submitFunction}>
            {typeAction == "crear" ? "Crear" : "Actualizar"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default FormType;
