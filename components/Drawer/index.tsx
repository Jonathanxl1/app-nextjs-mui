"use client";

import { Drawer } from "@mui/material";
import ViewFormProperties from "@/views/ViewFormProperties";
import ViewFormType from "@/views/ViewFormType";
import { useStoreApp, ViewOptions } from "@/store/application.store";

function DrawerRight() {
  const { showDrawer, closeView, view } = useStoreApp((state) => state);

  function DynamicComponent(type: ViewOptions) {
    switch (type) {
      case "viewFormProperties":
        return <ViewFormProperties />;
      case "viewFormType":
        return <ViewFormType />;
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
