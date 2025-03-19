"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { useStoreApp } from "@/store/application.store";
import { usePropertiesStore } from "@/store/properties.store";
import { useTypeStore } from "@/store/types.store";
import { yupResolver } from "@hookform/resolvers/yup";

interface PropertyType {
  id: number;
  name: string;
}

const schema = yup.object({
  name: yup.string().required("Required Name"),
  description: yup.string().default(""),
  properties: yup.array().of(yup.number().required()).defined(),
});

type FormType = yup.InferType<typeof schema>;

function FormType() {
  const { data: dataProperties } = usePropertiesStore((state) => state);
  const { action, closeView } = useStoreApp((state) => state);
  const { selectedType, createType, updateType } = useTypeStore(
    (state) => state
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      properties: [],
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action == "update") {
      if (selectedType) {
        setValue("name", selectedType.name, { shouldValidate: true });
        setValue("description", selectedType.description);
        setValue("properties", selectedType.properties);
      }
    }
  }, [action]);

  function stringPropertiesSelected(selected: number[], data: PropertyType[]) {
    return data
      .filter(({ id }) => selected.includes(id))
      .map(({ name }) => name)
      .join(", ");
  }

  function submitForm(form: FormType) {
    if (action == "create") {
      setLoading(true);
      createType(form)
        .then(() => {
          closeView();
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (action == "update") {
      if (selectedType?.id) {
        setLoading(true);
        updateType(selectedType?.id, form)
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
          padding: "12px",
        }}
      >
        <Typography variant="h5">
          {action == "create" ? "Crear Nuevo Tipos" : "Actualizar Tipo"}
        </Typography>
        <form
          onSubmit={handleSubmit(submitForm)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
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
            name="description"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <InputLabel>Description </InputLabel>
                <TextareaAutosize
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormGroup>
            )}
          />

          <Controller
            name="properties"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="property-label">Properties</InputLabel>
                <Select
                  {...field}
                  label="Properties"
                  labelId="property-label"
                  multiple
                  onChange={field.onChange}
                  value={field.value}
                  renderValue={(selected) =>
                    !!selected &&
                    stringPropertiesSelected(selected, dataProperties)
                  }
                >
                  {dataProperties.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      <Checkbox
                        checked={field.value ? field.value.includes(id) : false}
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Button
            loading={loading}
            variant="contained"
            type="submit"
            disabled={!isValid}
          >
            {action == "create" ? "Crear" : "Actualizar"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default FormType;
