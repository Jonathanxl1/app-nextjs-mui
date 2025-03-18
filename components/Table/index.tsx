"use client";

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
  updateAction: boolean;
  deleteAction: boolean;
}

function TableRaw({
  headers,
  items,
  origin,
  updateAction = false,
  deleteAction = false,
}: PropsExtends) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <CustomTableRow cellItems={headers}>
              {(updateAction || deleteAction) && (
                <CustomTableCell>Actions</CustomTableCell>
              )}
            </CustomTableRow>
          </TableHead>
          <TableBody>
            {
              Array.isArray(items)
                ? items.map(({ id, ...data }, idx) => (
                    <CustomTableRow
                      key={idx}
                      data-id={id}
                      cellItems={Object.values(data).map(String)}
                    >
                      {updateAction || deleteAction ? (
                        <CustomTableCellActions
                          origin={origin}
                          id={id}
                          updateAction={updateAction}
                          deleteAction={deleteAction}
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
