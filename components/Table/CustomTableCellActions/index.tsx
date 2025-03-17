"use client";
import { Grid2, IconButton, TableCell } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  RolePermissions,
  useStoreApp,
  ViewOptions,
} from "@/store/application.store";
import { EntityOptions } from "@/interfaces/entity.interface";

interface PropsTableCellAction {
  updateAction: boolean;
  deleteAction: boolean;
  origin: EntityOptions;
}

type ObjectEntity = {
  types: ViewOptions;
  properties: ViewOptions;
};

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
