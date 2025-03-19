"use client";

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NavLinkLogin from "./NavLinkLogin";
import { useStoreApp } from "@/store/application.store";
import { useState } from "react";

import { deleteItem } from "@/utils/localStorage.util";

function Navbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { logged, user, restoreUser } = useStoreApp();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>Fortex Design</Typography>
        {matches ? (
          <>
            <IconButton
              aria-controls={open ? "menu-options" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {logged ? (
                <Typography color="white">
                  ¡Hi {user ? user.name : ""}!
                </Typography>
              ) : (
                <MenuIcon />
              )}
            </IconButton>
            <Menu
              id="menu-options"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  if (logged) {
                    restoreUser();
                    deleteItem("token");
                  }
                  handleClose();
                }}
              >
                {logged ? (
                  <Typography>Cerrar Session</Typography>
                ) : (
                  <NavLinkLogin />
                )}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <NavLinkLogin />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
