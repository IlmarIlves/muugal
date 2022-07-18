import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Header } from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { validateSamePassword } from "../../validators/validateSamePassword";
import { getFieldErrors } from "../../services/getFieldErrors";
import { useChangePasswordMutation, useRegisterUserMutation } from "../../generated/graphql";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import "./changePasswordView.scss";
import { gql } from "@apollo/client";

gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      accessToken
    }
  }
`;

interface ChangePasswordValues {
  password: string;
  newPassword: string;
  passwordConfrim: string;
}

export const ChangePasswordView: React.FC = () => {
  const navigate = useNavigate();

  const [changePassword, changePasswordResult] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordValues>();

  // login user on submit
  const onSubmit: SubmitHandler<ChangePasswordValues> = async ({ password, newPassword }) => {
    const response = await changePassword({
      variables: { currentPassword: password, newPassword },
    });

    if (response.data) {
      navigate("/client");
    }
  };

  const fieldErrors = getFieldErrors(changePasswordResult.error, errors);

  const otherPassword = watch("newPassword");

  return (
    <>
      <Header isImageShown={false} />
      <ProfileHeader />

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
          <label>Password</label>
          <input className={"input"} type={"password"} {...register("password")} />
          {fieldErrors.password && <p>{fieldErrors.password.message}</p>}

          <label>New Password</label>
          <input className={"input"} type={"password"} {...register("newPassword")} />
          {fieldErrors.newPassword && <p>{fieldErrors.newPassword.message}</p>}

          <label>Confirm password</label>
          <input
            className={"input"}
            type={"password"}
            {...register("passwordConfrim", { validate: validateSamePassword(otherPassword) })}
          />
          {fieldErrors.passwordConfrim && <p>{fieldErrors.passwordConfrim.message}</p>}

          <input className="submit" type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};
