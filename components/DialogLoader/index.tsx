"use client";
import { useStoreApp } from "@/store/application.store";
import { Backdrop, CircularProgress } from "@mui/material";

function DialogLoader() {
  const { loading } = useStoreApp((state) => state);

  return (
    <Backdrop open={loading}>
      <CircularProgress size="50px" color="inherit"></CircularProgress>
    </Backdrop>
  );
}

export default DialogLoader;
