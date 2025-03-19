"use client";

import {
  TableBody,
  TableContainer,
  TableHead,
  Table,
  TableCell,
  Grid2,
} from "@mui/material";

import CustomTableRow from "./CustomTableRow";
import CustomTableCellActions from "./CustomTableCellActions";
import CustomTableCell from "./CustomTableCell";
import { EntityOptions } from "@/interfaces/entity.interface";
import { TypeElementNormalizedProperties } from "@/interfaces/types.interface";
import { PropertiesElement } from "@/interfaces/properties.interface";

interface PropsExtends {
  headers: Array<string>;
  origin: EntityOptions;
  items?: Array<TypeElementNormalizedProperties | PropertiesElement>;
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
    <Grid2
      sx={{
        display: "flex",
        mx: "auto",
        my: 0,
      }}
      size={{
        xs: 12,
        md: 8,
      }}
    >
      <TableContainer
        sx={{
          maxHeight: "70vh",
          overflow: "auto",
          maxWidth: "80vw",
          mx: "auto",
        }}
      >
        <Table>
          <TableHead>
            <CustomTableRow cellItems={headers}>
              {(updateAction || deleteAction) && (
                <CustomTableCell>Actions</CustomTableCell>
              )}
            </CustomTableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(items) && items.length ? (
              items.map(({ id, ...data }, idx) => (
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
            ) : (
              <CustomTableRow cellItems={[]}>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  No Data
                </TableCell>
              </CustomTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid2>
  );
}

export default TableRaw;
