import { Button, Grid2, Typography } from "@mui/material";

function ViewConfirmationAction() {
  return (
    <Grid2>
      <Grid2>
        <Typography>Seguro desea eliminar este Elemento</Typography>
      </Grid2>
      <Grid2>
        <Button>Confirmar</Button>
        <Button>Cancelar</Button>
      </Grid2>
    </Grid2>
  );
}

export default ViewConfirmationAction;
