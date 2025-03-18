"use client";
import { Grid2, IconButton, TableCell } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStoreApp } from "@/store/application.store";

import {
  EntityOptions,
  ObjectEntity,
  ViewOptions,
} from "@/interfaces/entity.interface";

import { RolePermissions } from "@/interfaces/application.interface";
import { PropertiesElement } from "@/interfaces/properties.interface";
import { usePropertiesStore } from "@/store/properties.store";
import { useTypeStore } from "@/store/types.store";
import { TypeElement } from "@/interfaces/types.interface";

interface PropsTableCellAction {
  updateAction: boolean;
  deleteAction: boolean;
  origin: EntityOptions;
  id: PropertiesElement["id"] | TypeElement["id"];
}

const objectEntity: ObjectEntity = {
  types: "viewFormType",
  properties: "viewFormProperties",
  confirmation: "viewConfirmation",
};

function CustomTableCellActions({
  updateAction,
  deleteAction,
  origin = "types",
  id = 0,
}: Partial<PropsTableCellAction>) {
  const { setView, setAction, setConfirmMethod } = useStoreApp(
    (state) => state
  );
  const { setSelectedProperty, deleteProperty } = usePropertiesStore();
  const { setSelectedType, deleteType } = useTypeStore();

  function openView(value: ViewOptions, action: RolePermissions) {
    setView(value);
    setAction(action);
    if (origin == "types") {
      setSelectedType(id);
      setConfirmMethod(() => {
        deleteType(id);
      });
    } else {
      setSelectedProperty(id);
      setConfirmMethod(() => {
        deleteProperty(id);
      });
    }
  }

  return (
    <TableCell>
      <Grid2 container>
        {updateAction && (
          <IconButton onClick={() => openView(objectEntity[origin], "update")}>
            <EditIcon />
          </IconButton>
        )}
        {deleteAction && (
          <IconButton onClick={() => openView("viewConfirmation", "delete")}>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid2>
    </TableCell>
  );
}

export default CustomTableCellActions;
