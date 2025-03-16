import { TableCell, TableCellProps } from "@mui/material";

function CustomTableCell({ children, ...all }: TableCellProps) {
  return <TableCell {...all}>{children}</TableCell>;
}

export default CustomTableCell;
