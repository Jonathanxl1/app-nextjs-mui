import { useStoreApp } from "@/store/application.store";
import {
  Button,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function ViewConfirmationAction() {
  const { closeView, callConfirmMethod } = useStoreApp((state) => state);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid2
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        justifyContent: "center",
        width: sm ? "70vw" : "30vw",
        gap: "5em",
      }}
    >
      <Grid2>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "30px", sm: "32rem", md: "2rem" },
            textAlign: "center",
          }}
        >
          Seguro desea eliminar este Elemento
        </Typography>
      </Grid2>
      <Grid2
        container
        spacing={2}
        sx={{
          justifyContent: "center",
        }}
      >
        <Grid2>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              callConfirmMethod().then(() => {
                closeView();
              });
            }}
          >
            Confirmar
          </Button>
        </Grid2>
        <Grid2>
          <Button color="error" variant="contained" onClick={closeView}>
            Cancelar
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default ViewConfirmationAction;
