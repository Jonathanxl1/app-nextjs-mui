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

interface PropsTableCellAction {
  updateAction: boolean;
  deleteAction: boolean;
  origin: EntityOptions;
}

const objectEntity: ObjectEntity = {
  types: "viewFormType",
  properties: "viewFormProperties",
};

function CustomTableCellActions({
  updateAction,
  deleteAction,
  origin = "types",
}: Partial<PropsTableCellAction>) {
  const { setView, setAction } = useStoreApp((state) => state);

  function openView(value: ViewOptions, action: RolePermissions) {
    setView(value);
    setAction(action);
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
          <IconButton>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid2>
    </TableCell>
  );
}

export default CustomTableCellActions;
