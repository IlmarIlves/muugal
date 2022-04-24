import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { Header } from "../../components/Header/Header";
import { FileContainer } from "../../components/ItemContainer.tsx/ItemContainer";

import { useOrderMutation, User, useViewerQuery, ViewerQuery } from "../../generated/graphql";

import "./orderView.scss";

gql`
  mutation Order($file: Upload!) {
    order(file: $file) {
      userId
    }
  }
`;

export const OrderView: React.FC = ({}) => {
  const { data } = useViewerQuery();

  const [order, orderResult] = useOrderMutation();

  const [file, setFile] = useState<File>();

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedFiles = event.target.files[0];

    if (!selectedFiles) {
      return;
    }

    const file = selectedFiles;

    setFile(file);

    await order({
      variables: {
        file,
      },
    });
  };

  return (
    <>
      <Header />

      <div className={"order-information"}>
        <div className="image">
          {/* <FileContainer name={"Order 1"} /> */}

          <input type="file" name="file" ref={fileInputRef} onChange={handleFileUpload} />
        </div>

        <div className={"form"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Telefon</label>
            <input {...register("username")} />
            {errors.username && <p>{errors.username.message}</p>}
            <label>Email</label>
            <input {...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <label>Printeri info(printeri suurus)</label>
            <input {...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <label>Värvid</label>
            <input {...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <label>Kogus</label>
            <input {...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <label>Lisainfo</label>
            <input {...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <input type="submit" />
          </form>
        </div>

        <div>Send</div>
      </div>
    </>
  );
};
