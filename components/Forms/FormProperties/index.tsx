"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { PropertiesElement } from "@/interfaces/properties.interface";
import { useStoreApp } from "@/store/application.store";
import { usePropertiesStore } from "@/store/properties.store";

const schema = yup.object({
  id: yup.number(),
  name: yup.string().required(),
  type: yup.string(),
});

type FormProperties = Partial<PropertiesElement>;

function FormProperties() {
  const { action, closeView } = useStoreApp((state) => state);
  const {
    defaultPropertiesInput,
    selectedProperty,
    createProperty,
    updateProperty,
  } = usePropertiesStore((state) => state);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action == "update") {
      if (selectedProperty) {
        setValue("id", selectedProperty.id);
        setValue("name", selectedProperty.name, { shouldValidate: true });
        setValue("type", selectedProperty.type);
      }
    }
  }, [action]);

  function submitForm(e) {
    if (action == "create") {
      setLoading(true);
      createProperty(e)
        .then(() => {
          closeView();
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (action == "update") {
      if (selectedProperty) {
        console.log(e);
        setLoading(true);

        updateProperty(selectedProperty.id, e)
          .then(() => {
            closeView();
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          padding: "12px",
        }}
      >
        <Typography variant="h5">
          {action == "create"
            ? "Crear Nueva Propiedad"
            : "Actualizar Propiedad"}
        </Typography>

        <form
          onSubmit={handleSubmit(submitForm)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Nombre"
                error={fieldState.invalid}
                helperText={fieldState.invalid ? "Se require un nombre" : null}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="default-property-select">
                  Tipo de Propiedad
                </InputLabel>
                <Select
                  labelId="default-property-select"
                  label="Tipo de Propiedad"
                  onChange={field.onChange}
                  value={field.value}
                >
                  {defaultPropertiesInput.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Button
            loading={loading}
            disabled={!isValid}
            type="submit"
            variant="contained"
          >
            {action == "create" ? "Crear" : "Actualizar"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default FormProperties;
