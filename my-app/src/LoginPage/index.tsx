import React from "react";
import Input from "@mui/material/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";

interface Form {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { control, handleSubmit } = useForm<Form>();

  const login: SubmitHandler<Form> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Controller
        name="username"
        defaultValue={""}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="password"
        defaultValue={""}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <Button variant="contained" onClick={handleSubmit(login)}>
        Log in
      </Button>
    </div>
  );
};

export default LoginPage;
