"use client";

import HeaderTable from "@/components/HeaderTable";
import SearchBar from "@/components/SearchBar";
import TableRaw from "@/components/Table";
import { useStoreApp } from "@/store/application.store";
import { usePropertiesStore } from "@/store/properties.store";
import { useTypeStore } from "@/store/types.store";
import { Box, Grid2, Typography } from "@mui/material";
import { useEffect } from "react";

const headersTypes = [
  "Nombre",
  "Description",
  "Propiedades",
  "Fecha de Creacion",
];

const headersProperties = ["Nombre", "Tipo de Propiedad", "Fecha de Creacion"];

export default function Home() {
  const { hasPermission, isSearching } = useStoreApp();
  const {
    data: dataTypes,
    retriveTypes,
    dataFiltered: filteredTypes,
  } = useTypeStore((state) => state);
  const {
    data: dataProperties,
    retrieveProperties,
    dataFiltered: filteredProperties,
  } = usePropertiesStore((state) => state);

  useEffect(() => {
    retriveTypes();
    retrieveProperties();
    return () => {};
  }, []);

  return (
    <>
      {hasPermission("read") ? (
        <>
          <SearchBar />
          <Box sx={{ m: 4 }}>
            <HeaderTable
              origin="types"
              title="Tipos"
              variant="h4"
              createAction={hasPermission("create")}
            />
            <TableRaw
              headers={headersTypes}
              items={isSearching ? filteredTypes : dataTypes}
              origin="types"
              updateAction={hasPermission("update")}
              deleteAction={hasPermission("delete")}
            />
          </Box>

          <Box sx={{ m: 4 }}>
            <HeaderTable
              createAction={hasPermission("create")}
              origin="properties"
              title="Propiedades"
              variant="h4"
            />
            <TableRaw
              headers={headersProperties}
              items={isSearching ? filteredProperties : dataProperties}
              origin="properties"
              updateAction={hasPermission("update")}
              deleteAction={hasPermission("delete")}
            />
          </Box>
        </>
      ) : (
        <Grid2
          alignItems="center"
          justifyContent="center"
          sx={{ minWidth: "100vw", height: "100svh", mx: "auto", my: 0 }}
        >
          <Typography variant="h1">Hola Bienvenidos Fortex Design</Typography>
          <Typography variant="caption">
            Para ver lo tipos y propiedades disponible Inicia Sesion
          </Typography>
        </Grid2>
      )}
    </>
  );
}
