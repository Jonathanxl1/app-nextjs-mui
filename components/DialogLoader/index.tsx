"use client";
import { useStoreApp } from "@/store/application.store";
import { Backdrop, CircularProgress } from "@mui/material";

function DialogLoader() {
  const { lodging } = useStoreApp((state) => state);

  return (
    <Backdrop open={lodging}>
      <CircularProgress size="50px" color="inherit"></CircularProgress>
    </Backdrop>
  );
}

export default DialogLoader;
