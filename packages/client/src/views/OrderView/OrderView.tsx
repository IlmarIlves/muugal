import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header/Header";
import { FileContainer } from "../../components/ItemContainer.tsx/ItemContainer";
import { User, useViewerQuery, ViewerQuery } from "../../generated/graphql";
import "./orderView.scss";

export const OrderView: React.FC = ({}) => {
  const { data } = useViewerQuery();

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

    // await updateAvatar({
    //   variables: {
    //     avatar,
    //   },
    // });
  };

  const style = {
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
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
