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
            
            <input type="number" className="input" placeholder="Telefon" {...register("username")} />
            {errors.username && <p>{errors.username.message}</p>}
            
            <input type="Text" className="input" placeholder="Email"{...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            
            <input type="Text" className="input" placeholder="Maximum dimensions when printing:"  disabled {...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            
            <div className="color">
             <select {...register("lastName")}  className="color-select">
              <option className="lang-dd" value="">Värvid</option>
              <option className="lang-dd" value="">Mingi värv</option>
             </select>
             <span className="color-custom-arrow"></span>
             {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            
            <input type="number" className="input" placeholder="Kogus"{...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            
            <input type="Text" className="input" placeholder="Lisainfo"{...register("lastName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            
            <button className="second-order-btn">GET A PRICE OFFER</button>
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
         <p>• If price offer is appropriate, the 3D model will be printed. Printing usually takes 30 minutes to 2-3 days, depending on the complexity and finishing of the model. It is usually several hours.</p>
       </div>
      </div>
      </div>
    </>
  );
};
