import { Stripe } from "stripe";
require('dotenv').config({ path: './.env' })

export const stripe = new Stripe(process.env.privateKey!, { apiVersion: "2020-08-27" });
