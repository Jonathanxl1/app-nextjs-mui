import { useStoreApp } from "@/store/application.store";
import { Button, Grid2, Typography } from "@mui/material";

function NavLinkLogin() {
  const {
    logged = true,
    userLogged = { name: "Jonathan" },
    setView,
  } = useStoreApp();
  return (
    <Grid2>
      {logged ? (
        <Button color="inherit" onClick={() => setView("viewFormLogin")}>
          Login
        </Button>
      ) : (
        <Typography>Hi!, {userLogged.name}</Typography>
      )}
    </Grid2>
  );
}

export default NavLinkLogin;
