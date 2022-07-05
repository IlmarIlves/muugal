import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { Header } from "../../components/Header/Header";
import { useLoginMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
import "./registerView.scss";
import { validateSamePassword } from "../../validators/validateSamePassword";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
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

export const RegisterView: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, watch } = useForm<RegisterFormValues>();

  const [login, loginResult] = useLoginMutation({
    // refetchQueries: ["Viewer"],
    // awaitRefetchQueries: true,
  });

  // login user on submit
  const onSubmit: SubmitHandler<RegisterFormValues> = async ({ email, password }) => {
    const response = await login({
      variables: { email, password },
    });

    if (response.data) {
      navigate("/");
    }
  };

  const otherPassword = watch("password");

  return (
    <>
      <Header />
      <div className={"form-container"}>
        <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
          <label>Email</label>
          <input className={"input"} type={"email"} {...register("email")} />
          {/* {errors.password && <p>{errors.password.message}</p>} */}
          <label>First Name</label>
          <input className={"input"} type={"firstName"} {...register("firstName")} />
          {/* {errors.email && <p>{errors.email.message}</p>} */}
          <label>Last Name</label>
          <input className={"input"} type={"lastName"} {...register("lastName")} />
          {/* {errors.password && <p>{errors.password.message}</p>} */}
          <label>Password</label>
          <input className={"input"} type={"password"} {...register("password")} />
          {/* {errors.password && <p>{errors.password.message}</p>} */}
          <label>Confirm password</label>
          <input
            className={"input"}
            type={"password"}
            {...register("passwordConfirm", { validate: validateSamePassword(otherPassword) })}
          />
          {/* {errors.password && <p>{errors.password.message}</p>} */}
          <input className={"submit"} type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};
