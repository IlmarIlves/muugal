import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { useLoginMutation, useViewerQuery } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import "./loginView.scss";

interface LoginFormValues {
  email: string;
  password: string;
}

// fetch logged in user info (null if not logged in)
gql`
  query Viewer {
    viewer {
      id
      email
      firstName
      lastName
    }
  }
`;

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

  const { register, handleSubmit, formState } = useForm<LoginFormValues>();

  const { data, loading, error } = useViewerQuery();

  const [login, loginResult] = useLoginMutation({
    // refetchQueries: ["Viewer"],
    // awaitRefetchQueries: true,
  });

  // login user on submit
  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    const response = await login({
      variables: { email, password },
    });

    if (response.data?.login) {
      console.log("login viewer query after mutation", data?.viewer.id);
      console.log("login response user id after mutation", response.data.login.accessToken);
      navigate("/");
    }
  };

  return (
    <>
      <div className={"form-container"}>
        <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
          <label>Username</label>
          <input className={"input"} type={"email"} {...register("email")} />
          {/* {errors.email && <p>{errors.email.message}</p>} */}
          <label>Password</label>
          <input className={"input"} type={"password"} {...register("password")} />
          {/* {errors.password && <p>{errors.password.message}</p>} */}
          <input className={"submit"} type="submit" value="Log in" />
          <div className={"register"}>
            <span onClick={() => navigate("/register")}>Sign up now</span>
          </div>
        </form>
      </div>
    </>
  );
};
