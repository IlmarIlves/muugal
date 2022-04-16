import { Stripe } from "stripe";
import { config } from "../config";

export const stripe = new Stripe(process.env.privateKey, { apiVersion: "2020-08-27" });
