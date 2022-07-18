import { gql } from "@apollo/client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import { useLogoutMutation, useUpdateUserInformationMutation, useViewerQuery } from "../../generated/graphql";
import { getFieldErrors } from "../../services/getFieldErrors";
import "./clientView.scss";

gql`
  mutation UpdateUserInformation(
    $userId: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $telephone: String!
    $packageMachineLocation: String!
  ) {
    updateUserInformation(
      userId: $userId
      firstName: $firstName
      lastName: $lastName
      email: $email
      telephone: $telephone
      packageMachineLocation: $packageMachineLocation
    ) {
      id
      email
      firstName
      lastName
      telephone
      packageMachineLocation
    }
  }
`;

gql`
  mutation DeleteUser {
    delete
  }
`;

interface UpdateUserInfoFormValues {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  packageMachineLocation: string;
}

export const ClientView: React.FC = () => {
  const navigate = useNavigate();

  const [updateUserInformation, updateUserInformationResult] = useUpdateUserInformationMutation({
    refetchQueries: ["Viewer"],
    awaitRefetchQueries: true,
  });

  const { data, loading, error } = useViewerQuery();

  const [logout, logoutResult] = useLogoutMutation();

  const [isUserUpdating, setIsUserUpdating] = useState(false);

  const viewer = data?.viewer;

  if (viewer === null) {
    navigate("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInfoFormValues>();

  const fieldErrors = getFieldErrors(updateUserInformationResult.error, errors);

  // login user on submit
  const onSubmit: SubmitHandler<UpdateUserInfoFormValues> = async ({
    email,
    firstName,
    lastName,
    telephone,
    packageMachineLocation,
  }) => {
    const response = await updateUserInformation({
      variables: {
        userId: viewer!.id,
        email,
        firstName,
        lastName,
        telephone,
        packageMachineLocation,
      },
    });
  };

  return (
    <>
      <Header isImageShown={false} />
      <ProfileHeader />
      <div className="clientinfo-background">
        <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
          <div className="userinfo">
            <h2 className="userinfo-header">Kasutajateave</h2>

            <div>
              <button className="userinfo-btn-style" onClick={() => logout()}>
                Logi välja
              </button>
            </div>

            <div>
              <ul className="userinfo-list">
                <li>
                  <p>Eesnimi</p>
                </li>
                <li>
                  {isUserUpdating ? (
                    <>
                      <input
                        className={"input"}
                        type={"text"}
                        defaultValue={viewer?.firstName}
                        {...register("firstName", { required: true })}
                      />
                      {fieldErrors.firstName && <p>{fieldErrors.firstName.message}</p>}
                    </>
                  ) : (
                    <p className="userinfo-info">{viewer?.firstName}</p>
                  )}
                </li>
                <li className="userinfo-btn">
                  <button className="userinfo-btn-style" onClick={() => setIsUserUpdating(!isUserUpdating)}>
                    {isUserUpdating ? "Kinnita" : "Muuda"}
                  </button>
                  {isUserUpdating ? (
                    <button
                      className="userinfo-btn-style"
                      type="submit"
                      value="Register"
                      onClick={() => setIsUserUpdating(false)}
                    >
                      {isUserUpdating ? "Tühista" : "Muuda"}
                    </button>
                  ) : null}
                </li>
              </ul>
            </div>

            <div>
              <ul className="userinfo-list">
                <li>
                  <p>Perenimi</p>
                </li>
                <li>
                  {isUserUpdating ? (
                    <>
                      <input
                        className={"input"}
                        type={"text"}
                        defaultValue={viewer?.lastName}
                        {...register("lastName", { required: true })}
                      />
                      {fieldErrors.lastName && <p>{fieldErrors.lastName.message}</p>}
                    </>
                  ) : (
                    <p className="userinfo-info">{viewer?.lastName}</p>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <ul className="userinfo-list">
                <li>
                  <p>Email</p>
                </li>
                <li>
                  {isUserUpdating ? (
                    <>
                      <input
                        className={"input"}
                        type={"text"}
                        defaultValue={viewer?.email}
                        {...register("email", { required: true })}
                      />
                      {fieldErrors.email && <p>{fieldErrors.email.message}</p>}
                    </>
                  ) : (
                    <p className="userinfo-info">{viewer?.email}</p>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <ul className="userinfo-list">
                <li>
                  <p>Telefon</p>
                </li>
                <li>
                  {isUserUpdating ? (
                    <>
                      <input
                        className={"input"}
                        type={"text"}
                        defaultValue={viewer?.telephone}
                        {...register("telephone", { required: true })}
                      />
                      {fieldErrors.telephone && <p>{fieldErrors.telephone.message}</p>}
                    </>
                  ) : (
                    <p className="userinfo-info">{viewer?.telephone}</p>
                  )}
                </li>
              </ul>
            </div>

            <div>
              <ul className="userinfo-list">
                <li>
                  <p>Itella pakiautomaat</p>
                </li>
                <li>
                  {isUserUpdating ? (
                    <>
                      <input
                        className={"input"}
                        type={"text"}
                        defaultValue={viewer?.packageMachineLocation}
                        {...register("packageMachineLocation", { required: true })}
                      />
                      {fieldErrors.packageMachineLocation && <p>{fieldErrors.packageMachineLocation.message}</p>}
                    </>
                  ) : (
                    <p className="userinfo-info">{viewer?.packageMachineLocation}</p>
                  )}
                </li>
              </ul>
            </div>

            {/* <div>
              <ul className="userinfo-list">
                <li>
                  <p>Salasõna</p>
                </li>
                <li>
                  <button className="userinfo-btn-style" onClick={() => navigate("/change-password")}>
                    Muuda parool
                  </button>
                </li>
              </ul>
            </div> */}
            {/* <div>
              <button className="userinfo-btn-style">Kustuta konto</button>
            </div> */}
          </div>
        </form>
      </div>
    </>
  );
};
