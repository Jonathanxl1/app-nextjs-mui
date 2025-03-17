import { login } from "@/services/authentication.service";
import { useStoreApp } from "@/store/application.store";
import { registerItem } from "@/utils/localStorage.util";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface Login {
  email: "";
  password: "";
}

function FormLogin() {
  const [form, setForm] = useState<Login>({
    email: "",
    password: "",
  });

  const { closeView, setUser } = useStoreApp();

  function inputForm(
    key: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = e.target.value;

    setForm((state) => ({ ...state, [key]: value }));
  }

  function submitForm() {
    login(form).then((data) => {
      if (data) {
        const { accessToken, user } = data;
        registerItem("token", accessToken);
        setUser(user);
        closeView();
      }
    });
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Email"
          type="text"
          onChange={(e) => inputForm("email", e)}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => inputForm("password", e)}
        />
        <Button onClick={submitForm}>Login</Button>
      </form>
    </>
  );
}

export default FormLogin;
