import { useStoreApp } from "@/store/application.store";
import { deleteItem } from "@/utils/localStorage.util";
import { Button, Grid2, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function NavLinkLogin() {
  const { logged, user, setView, restoreUser } = useStoreApp();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid2>
      {logged ? (
        <Grid2>
          <Button
            color="inherit"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            ¡Hi {user ? user.name : ""}!
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              handleClose();
            }}
          >
            <MenuItem
              onClick={() => {
                restoreUser();
                deleteItem("token");
                handleClose();
              }}
            >
              Cerrar Sesion
            </MenuItem>
          </Menu>
        </Grid2>
      ) : (
        <Button color="inherit" onClick={() => setView("viewFormLogin")}>
          Login
        </Button>
      )}
    </Grid2>
  );
}

export default NavLinkLogin;
