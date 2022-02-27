import React from "react";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { Header } from "../../components/Header/Header";

gql`
  mutation Logout {
    logout
  }
`;

export const LoginView: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const { onChange, ...rest } = register("username");

  return (
    <>
      <Header name={"ilmar"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
        <label>Password</label>
        <input {...register("lastName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <button
          type="button"
          onClick={() => {
            [
              {
                type: "manual",
                name: "username",
                message: "Double Check This",
              },
              {
                type: "manual",
                name: "firstName",
                message: "Triple Check This",
              },
            ].forEach(({ name, type, message }) => setError(name, { type, message }));
          }}
        >
          Trigger Name Errors
        </button>
        <input type="submit" />
      </form>
    </>
  );
};
