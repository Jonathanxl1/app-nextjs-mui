"use client";

import { TableRow, TableRowProps } from "@mui/material";
import CustomTableCell from "../CustomTableCell";

interface PropsCustomTableRow {
  cellItems: string[];
}

function CustomTableRow({
  cellItems = [],
  children,
  ...props
}: TableRowProps & PropsCustomTableRow) {
  return (
    <TableRow {...props}>
      {cellItems.map((item, idx) => (
        <CustomTableCell align="center" key={idx}>
          {item}
        </CustomTableCell>
      ))}
      {children}
    </TableRow>
  );
}

export default CustomTableRow;
