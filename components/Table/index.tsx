import { TableBody, TableContainer, TableHead, Table } from "@mui/material";
import CustomTableRow from "./CustomTableRow";
import CustomTableCellActions from "./CustomTableCellActions";
import CustomTableCell from "./CustomTableCell";
import { EntityOptions } from "@/interfaces/entity.interface";

interface PropsExtends {
  headers: Array<string>;
  items?: Array<{
    name: string;
    description: string;
    properties: string[];
    createdAt: string;
  }>;
  showCellAction: boolean;
  origin: EntityOptions;
  typeAction: string[];
}

function TableRaw({
  headers,
  items,
  showCellAction = true,
  origin,
}: PropsExtends) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <CustomTableRow cellItems={headers}>
              {showCellAction && <CustomTableCell>Actions</CustomTableCell>}
            </CustomTableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(items) ? (
              items.map((item) => (
                <CustomTableRow key={item.name} cellItems={Object.values(item)}>
                  {showCellAction ? (
                    <CustomTableCellActions
                      origin={origin}
                      updateAction
                      deleteAction
                    />
                  ) : null}
                </CustomTableRow>
              ))
            ) : (
              <CustomTableRow cellItems={"Empty Data"} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableRaw;
