import { TableBody, TableContainer, TableHead, Table } from "@mui/material";

import CustomTableRow from "./CustomTableRow";
import CustomTableCellActions from "./CustomTableCellActions";
import CustomTableCell from "./CustomTableCell";
import { EntityOptions } from "@/interfaces/entity.interface";
import { TypeElement } from "@/interfaces/types.interface";
import { PropertiesElement } from "@/interfaces/properties.interface";

interface PropsExtends {
  headers: Array<string>;
  origin: EntityOptions;
  items?: Array<TypeElement | PropertiesElement>;
  showCellAction?: boolean;
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
            {
              Array.isArray(items)
                ? items.map(({ id, ...data }, idx) => (
                    <CustomTableRow
                      key={idx}
                      data-id={id}
                      cellItems={Object.values(data)}
                    >
                      {showCellAction ? (
                        <CustomTableCellActions
                          origin={origin}
                          id={id}
                          updateAction
                          deleteAction
                        />
                      ) : null}
                    </CustomTableRow>
                  ))
                : null
              // <CustomTableRow cellItems={"Empty Data"} />
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableRaw;
