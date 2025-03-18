import { useStoreApp } from "@/store/application.store";
import { Button, Grid2, Typography } from "@mui/material";

function ViewConfirmationAction() {
  const { closeView, callConfirmMethod } = useStoreApp((state) => state);

  return (
    <Grid2>
      <Grid2>
        <Typography>Seguro desea eliminar este Elemento</Typography>
      </Grid2>
      <Grid2>
        <Button
          onClick={() => {
            callConfirmMethod().then(() => {
              closeView();
            });
          }}
        >
          Confirmar
        </Button>
        <Button onClick={closeView}>Cancelar</Button>
      </Grid2>
    </Grid2>
  );
}

export default ViewConfirmationAction;
