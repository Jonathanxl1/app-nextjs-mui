import { Drawer } from "@mui/material";
import { PropsWithChildren } from "react";

function DrawerLeft({ children }: PropsWithChildren) {
  return <Drawer anchor="right">{children}</Drawer>;
}

export default DrawerLeft;
