import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { Header } from "../../components/Header/Header";
import { useLoginMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
    }
  }
`;

gql`
  mutation Logout {
    logout
  }
`;

export const LoginView: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<LoginFormValues>();

  const [login, loginResult] = useLoginMutation({
    // refetchQueries: ["Viewer"],
    // awaitRefetchQueries: true,
  });

  // login user on submit
  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    const response = await login({
      variables: { email, password },
    });

    if (response.data) {
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input type={"email"} {...register("email")} />
        {/* {errors.email && <p>{errors.email.message}</p>} */}
        <label>Password</label>
        <input type={"password"} {...register("password")} />
        {/* {errors.password && <p>{errors.password.message}</p>} */}
        {/* <button
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
        </button> */}
        <input type="submit" />
      </form>
    </>
  );
};
