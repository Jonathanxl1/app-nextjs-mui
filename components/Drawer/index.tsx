"use client";

import { Drawer } from "@mui/material";

import ViewFormProperties from "@/views/ViewFormProperties";
import ViewFormType from "@/views/ViewFormType";
import { useStoreApp } from "@/store/application.store";
import { ViewOptions } from "@/interfaces/entity.interface";
import ViewConfirmationAction from "@/views/ViewConfirmationAction";
import ViewFormLogin from "@/views/ViewFormLogin";

function DrawerRight() {
  const { showDrawer, closeView, view } = useStoreApp((state) => state);

  function DynamicComponent(type: ViewOptions) {
    switch (type) {
      case "viewFormProperties":
        return <ViewFormProperties />;
      case "viewFormType":
        return <ViewFormType />;
      case "viewConfirmation":
        return <ViewConfirmationAction />;
      case "viewFormLogin":
        return <ViewFormLogin />;
      default:
        return null;
    }
  }

  return (
    <Drawer open={showDrawer} anchor="right" onClose={closeView}>
      {DynamicComponent(view)}
    </Drawer>
  );
}

export default DrawerRight;
