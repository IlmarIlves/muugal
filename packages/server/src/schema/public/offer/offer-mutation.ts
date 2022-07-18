import { idArg, intArg, mutationField, stringArg } from "@nexus/schema";
import { JSONSchema4, validate } from "json-schema";
import { verify } from "jsonwebtoken";
import { OffersEntity } from "../../../entities/OffersEntity";
import { UserEntity } from "../../../entities/UserEntity";

const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
    userId: {
      title: "User id",
      type: "string",
      format: "existing-user",
    },
    priceInCents: {
      title: "Price in cents",
      type: "string",
    },
    finishedInDays: {
      title: "Finished in days",
      type: "string",
    },
  },
};


export default mutationField("addOffer", {
  type: "Offer",
  description: "Adds offer to order",
  args: {
    userId: idArg({ description: "User id" }),
    priceInCents: intArg({ description: "Price in cents" }),
    finishedInDays: stringArg({ description: "Finished in days" }),
  },
  resolve: async (_parent, args, context) => {
    await validate(args, schema);

    const token = context.req.cookies.jid;

    if(!token) {
      return null;
    }

    let payload: any = null ;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch (error) {
      console.log(error);
      return null;
    }

    const user = await UserEntity.findOne({id: payload.userId})

    if(!user) {
      throw new Error("User not found, this should not happen");
      
    }

    const offer = new OffersEntity();
    
    offer.userId = user.id;
    offer.priceInCents = args.priceInCents;
    offer.finishedInDays = args.finishedInDays;

    await offer.save();

    return offer;
  },
});
