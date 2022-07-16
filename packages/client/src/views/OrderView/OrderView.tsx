import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { Header } from "../../components/Header/Header";

import { OrderColorsEnum, useOrderMutation, useViewerQuery } from "../../generated/graphql";

import "./orderView.scss";
import { useNavigate } from "react-router-dom";

gql`
  mutation Order(
    $file: Upload!
    $email: String!
    $colors: OrderColorsEnum!
    $amount: Int!
    $additionalInfo: String!
    $telephone: String!
  ) {
    order(
      file: $file
      email: $email
      colors: $colors
      amount: $amount
      additionalInfo: $additionalInfo
      telephone: $telephone
    ) {
      userId
    }
  }
`;

interface OrderFormValues {
  telephone: string;
  email: string;
  colors: OrderColorsEnum;
  amount: string;
  additionalInfo: string;
}

export const OrderView: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormValues>();

  const [file, setFile] = useState<File>();

  const { data } = useViewerQuery();
  const [order, orderResult] = useOrderMutation();

  if (data?.viewer === null) {
    navigate("/");
  }

  const onSubmit: SubmitHandler<OrderFormValues> = async ({ email, colors, amount, telephone, additionalInfo }) => {
    const response = await order({
      variables: {
        file,
        additionalInfo,
        colors,
        amount: parseInt(amount),
        email,
        telephone,
      },
    });

    if (response.data?.order) {
      navigate("/");
    }
  };
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
  };

  return (
    <>
      <Header />
      <div className={"ümbris"}>
        <div className={"order-information"}>
          <div className="three-columns">
            <h3 className="three-columns-header">Your 3D model</h3>
            <div className="image">
              {/* <FileContainer name={"Order 1"} /> */}

              <input type="file" name="file" ref={fileInputRef} onChange={handleFileUpload} />
            </div>
          </div>

          <div className="three-columns">
            <h3 className="three-columns-header">Submit your 3D model</h3>
            <div className={"form"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className="input" placeholder="Telefon" {...register("telephone")} />
                {errors.telephone && <p>{errors.telephone.message}</p>}

                <input type="text" className="input" placeholder="Email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
                {/* 
                <input
                  type="Text"
                  className="input"
                  placeholder="Maximum dimensions when printing:"
                  disabled
                  {...register("dimensions")}
                />
                {errors.dimension && <p>{errors.dimension.message}</p>} */}

                <div className="color">
                  <select {...register("colors")} className="color-select">
                    <option className="lang-dd" value="">
                      Värvid
                    </option>
                    <option className="lang-dd" value={OrderColorsEnum.Black}>
                      {OrderColorsEnum.Black}
                    </option>
                    <option className="lang-dd" value={OrderColorsEnum.White}>
                      {OrderColorsEnum.White}
                    </option>
                  </select>
                  <span className="color-custom-arrow"></span>
                  {errors.colors && <p>{errors.colors.message}</p>}
                </div>

                <input type="number" className="input" placeholder="Kogus" min={1} {...register("amount")} />
                {errors.amount && <p>{errors.amount.message}</p>}

                <input type="Text" className="input" placeholder="Lisainfo" {...register("additionalInfo")} />
                {errors.additionalInfo && <p>{errors.additionalInfo.message}</p>}

                <button type="submit" value="Register" className="second-order-btn">
                  GET A PRICE OFFER
                </button>
              </form>
            </div>
          </div>

          <div className="three-columns">
            <h3 className="three-columns-header">We get you a price offer</h3>

            <p className="price-offer-text">Each 3D printing price offer counts</p>
            <p>• 3D model itself, if its not free</p>
            <p>• Model preparation for 3D printing</p>
            <p>• 3D printing and post-processing</p>
            <p>• Material consumption</p>
            <p>• Printing time</p>
            <p>• Shipping cost</p>
            <p className="price-offer-text">Price offer confirmation and 3D printing</p>
            <p>• Price offer will be sent to your e-mail address in 1 hours</p>
            <p>
              • If price offer is appropriate, the 3D model will be printed. Printing usually takes 30 minutes to 2-3
              days, depending on the complexity and finishing of the model. It is usually several hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
