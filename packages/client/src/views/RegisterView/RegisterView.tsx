import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { Header } from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./registerView.scss";
import { validateSamePassword } from "../../validators/validateSamePassword";
import { getFieldErrors } from "../../services/getFieldErrors";
import { useRegisterUserMutation, UserRoleEnum } from "../../generated/graphql";

gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $telephone: String!
    $packageMachineLocation: String!
    $userRole: UserRoleEnum!
    $isUserBuyer: Boolean!
    $isUserOfferer: Boolean!
  ) {
    registerUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      telephone: $telephone
      packageMachineLocation: $packageMachineLocation
      userRole: $userRole
      isUserBuyer: $isUserBuyer
      isUserOfferer: $isUserOfferer
    ) {
      id
      email
      firstName
      lastName
    }
  }
`;

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  packageMachineLocation: string;
  password: string;
  userRole: UserRoleEnum;
  passwordConfirm: string;
  termsAndConditions: string;
}

export const RegisterView: React.FC = () => {
  const navigate = useNavigate();

  const [isUserBuyer, setIsUserRoleBuyer] = useState(false);
  const [isUserOfferer, setisUserRoleOfferer] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>();

  const [registerUser, registerUserResult] = useRegisterUserMutation({
    refetchQueries: ["Viewer"],
    awaitRefetchQueries: true,
  });

  // login user on submit
  const onSubmit: SubmitHandler<RegisterFormValues> = async ({
    email,
    firstName,
    lastName,
    telephone,
    packageMachineLocation,
    password,
  }) => {
    const response = await registerUser({
      variables: {
        email,
        firstName,
        lastName,
        telephone,
        packageMachineLocation,
        userRole: UserRoleEnum.User,
        password,
        isUserOfferer: isUserOfferer,
        isUserBuyer: isUserBuyer,
      },
    });

    if (response.data?.registerUser) {
      navigate("/");
    }
  };

  const fieldErrors = getFieldErrors(registerUserResult.error, errors);

  const otherPassword = watch("passwordConfirm");

  return (
    <>
      <Header />

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
          <div className="login-checkbox">
            <div>
              <input
                type="checkbox"
                {...register("userRole", { required: true })}
                onChange={() => setIsUserRoleBuyer(!isUserBuyer)}
              />
              <label>Klient</label>
            </div>
            <div>
              <input type="checkbox" {...register("userRole")} onChange={() => setisUserRoleOfferer(!isUserOfferer)} />
              <label>Teenusepakkuja</label>
            </div>
          </div>
          {fieldErrors.userRole && <p>{fieldErrors.userRole.message}</p>}

          <label>Email</label>
          <input className={"input"} type={"email"} {...register("email")} />
          {fieldErrors.email && <p>{fieldErrors.email.message}</p>}

          <label>First Name</label>
          <input className={"input"} type={"text"} {...register("firstName")} />
          {fieldErrors.firstName && <p>{fieldErrors.firstName.message}</p>}

          <label>Last Name</label>
          <input className={"input"} type={"text"} {...register("lastName")} />
          {fieldErrors.lastName && <p>{fieldErrors.lastName.message}</p>}

          <label>Phone</label>
          <input className={"input"} type={"text"} {...register("telephone")} />
          {fieldErrors.telephone && <p>{fieldErrors.telephone.message}</p>}

          <label>Parcel Machine</label>
          <input className={"input"} type={"text"} {...register("packageMachineLocation")} />
          {fieldErrors.packageMachineLocation && <p>{fieldErrors.packageMachineLocation.message}</p>}

          <p>
            Lisa Itella pakiautomaat.
            <br /> Endale sobiva leiad <a href="https://itella.ee/eraklient/pakiautomaatide-asukohad/">siit</a>.
          </p>

          <label>Password</label>
          <input className={"input"} type={"password"} {...register("password")} />
          {fieldErrors.password && <p>{fieldErrors.password.message}</p>}

          <label>Confirm password</label>
          <input
            className={"input"}
            type={"password"}
            {...register("passwordConfirm", { validate: validateSamePassword(otherPassword) })}
          />
          {fieldErrors.passwordConfirm && <p>{fieldErrors.passwordConfirm.message}</p>}

          <input type="checkbox" {...register("termsAndConditions", { required: true })} />
          <label>
            I accept <a href="/terms-and-conditions"> terms and conditions</a>
          </label>
          {fieldErrors.termsAndConditions && <p>{fieldErrors.termsAndConditions.message}</p>}

          <input className="submit" type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};
