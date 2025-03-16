import { Grid2, IconButton, TableCell } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface PropsTableCellAction {
  updateAction: boolean;
  deleteAction: boolean;
}

function CustomTableCellActions({
  updateAction,
  deleteAction,
}: Partial<PropsTableCellAction>) {
  return (
    <TableCell>
      <Grid2 container>
        {updateAction && (
          <IconButton>
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
