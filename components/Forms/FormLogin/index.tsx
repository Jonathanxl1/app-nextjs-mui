import { Button, TextField } from "@mui/material";

function FormLogin() {
  return (
    <>
      <form>
        <TextField label="Email" type="text" />
        <TextField label="Password" type="password" />
        <Button>Login</Button>
      </form>
    </>
  );
}

export default FormLogin;
