import React from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header/Header";
import { FileContainer } from "../../components/ItemContainer.tsx/ItemContainer";
import { ViewerQuery } from "../../generated/graphql";
import "./orderView.scss";

interface OrderViewProps {
  viewer: ViewerQuery | undefined;
}

export const OrderView: React.FC<OrderViewProps> = ({ viewer }) => {
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
      <Header viewer={viewer} />

      <div className={"order-information"}>
        <div className="image">
          <FileContainer name={"Order 1"} />
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
