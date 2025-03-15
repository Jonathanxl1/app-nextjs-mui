import {
  TableBody,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";

enum ACTIONS {
  READ,
  CREATE,
  EDIT,
  DELETE,
}

interface PropsExtends {
  headers: Array<string>;
  items?: Array<{ name: string }>;
  actions?: boolean;
  typeActions?: Array<ACTIONS>;
}

function TableRaw({
  headers,
  items,
  actions = false,
  typeActions = [],
}: PropsExtends) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
              {actions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(items) &&
              items.length &&
              items.map((value) => (
                <TableRow key={value.name}>
                  <TableCell>{value.name}</TableCell>

                  {/* ACTIONS */}
                  {actions && (
                    <TableCell>
                      {typeActions.map((action) => (
                        <p key={action}>{action}</p>
                      ))}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableRaw;
