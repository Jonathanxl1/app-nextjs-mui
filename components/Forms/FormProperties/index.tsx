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

import { useStoreApp } from "@/store/application.store";
import { usePropertiesStore } from "@/store/properties.store";
import { typePropertyInput } from "@/interfaces/properties.interface";

const schema = yup.object({
  name: yup.string().required(),
  type: yup
    .mixed<typePropertyInput>()
    .oneOf<typePropertyInput>(["check", "date", "number", "text"])
    .defined(),
});

type FormProperties = yup.InferType<typeof schema>;

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
      type: "text" as typePropertyInput,
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action == "update") {
      if (selectedProperty) {
        setValue("name", selectedProperty.name, { shouldValidate: true });
        setValue("type", selectedProperty.type);
      }
    }
  }, [action]);

  function submitForm(form: FormProperties) {
    if (action == "create") {
      setLoading(true);
      createProperty(form)
        .then(() => {
          closeView();
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (action == "update") {
      if (selectedProperty) {
        setLoading(true);
        const { id } = selectedProperty;
        const formWithId = { ...form, id };

        updateProperty(selectedProperty.id, formWithId)
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
          justifyContent: "center",
          gap: "5em",
          padding: "36px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "30px", sm: "32rem", md: "2rem" },
            textAlign: "center",
          }}
        >
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
                  {...field}
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
