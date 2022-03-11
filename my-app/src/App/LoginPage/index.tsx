import React from "react";
import Input from "@mui/material/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import { login } from "../UserStore";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface Form {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { control, handleSubmit } = useForm<Form>();
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.userStore);
  const submit: SubmitHandler<Form> = (data) => {
    dispatch(login(data));
    //console.log(data);
  };
  console.log(store);
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
      <Button variant="contained" onClick={handleSubmit(submit)}>
        Log in
      </Button>
    </div>
  );
};

export default LoginPage;
