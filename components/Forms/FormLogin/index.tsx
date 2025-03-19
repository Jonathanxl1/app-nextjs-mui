import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { login } from "@/services/authentication.service";
import { useStoreApp } from "@/store/application.store";
import { registerItem } from "@/utils/localStorage.util";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

type FormLogin = yup.InferType<typeof schema>;

function FormLogin() {
  const [loading, setLoadingButton] = useState(false);

  const { closeView, setUser, setLoading } = useStoreApp();

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function submitForm(form: FormLogin) {
    setLoading(true);
    setLoadingButton(true);
    login(form)
      .then((data) => {
        if (data) {
          const { accessToken, user } = data;
          registerItem("token", accessToken);
          setUser(user);
          closeView();
        }
      })
      .finally(() => {
        setLoading(false);
        setLoadingButton(false);
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              type="text"
              error={fieldState.invalid}
              helperText={
                fieldState.invalid ? "Introduzca un correo valido" : null
              }
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label="Password"
              type="password"
              error={fieldState.invalid}
              helperText={
                fieldState.invalid
                  ? "Introduzca una contraseña, minimo 8 caracteres"
                  : null
              }
              onChange={field.onChange}
            />
          )}
        />

        <Button
          loading={loading}
          disabled={!isValid}
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </form>
    </>
  );
}

export default FormLogin;
