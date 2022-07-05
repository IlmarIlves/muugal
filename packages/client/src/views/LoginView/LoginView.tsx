import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { Header } from "../../components/Header/Header";
import { useLoginMutation, useViewerQuery } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import "./loginView.scss";
import { getFieldErrors } from "../../services/getFieldErrors";
import { isSystemError } from "../../services/isSystemError";
import { ErrorView } from "../ErrorView/ErrorView";

interface LoginFormValues {
  email: string;
  password: string;
}

gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [login, loginResult] = useLoginMutation({
    // refetchQueries: ["Viewer"],
    // awaitRefetchQueries: true,
  });

  const fieldErrors = getFieldErrors(loginResult.error, errors);

  console.log(fieldErrors);

  // login user on submit
  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    const response = await login({
      variables: { email, password },
    });

    if (response.data?.login) {
      navigate("/");
    }
  };

  // handle system error
  if (isSystemError(loginResult.error)) {
    return <ErrorView title="Login failed" error={loginResult.error} />;
  }

  return (
    <>
      <Header />
      <div className={"form-container"}>
        <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
          <label>Add Username</label>
          <input className={"input"} type={"email"} {...register("email")} />
          {fieldErrors.email && <div>{fieldErrors.email && fieldErrors.email.message}</div>}
          <label>Password</label>
          <input className={"input"} type={"password"} {...register("password")} />
          {fieldErrors.password && <div>{fieldErrors.password && fieldErrors.password.message}</div>}
          <input className={"submit"} type="submit" value="Log in" />
          <div className={"register"}>
            <span onClick={() => navigate("/register")}>Sign up now</span>
          </div>
        </form>
      </div>
    </>
  );
};
