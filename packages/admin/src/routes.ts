import { ViewerQuery } from "./generated/graphql";

export const LOGIN_VIEW_PATH = "/login";


export const ADMIN_VIEW_PATH = "/main/:menu?/:page?/:id?/:modifier?";

export type AdminViewMenu =
| "users"
| "payments"
| "orders";

export type AdminViewParams = {
    menu?: AdminViewMenu;
    page?: string;
    id?: string;
    modifier?: string;
  };
  
export type ViewerInfo = NonNullable<ViewerQuery["viewer"]>;
