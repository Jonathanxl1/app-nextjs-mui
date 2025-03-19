"use client";

import FormType from "@/components/Forms/FormTypes";
import { Box } from "@mui/material";

function ViewFormType() {
  return (
    <Box
      sx={{
        display: "grid",
        height: "80%",
        flexDirection: "row",
        justifyItems: "center",
        alignItems: "center",
        backgroundColor: "primary",
      }}
    >
      <FormType></FormType>
    </Box>
  );
}

export default ViewFormType;
