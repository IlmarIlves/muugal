import React, { useMemo } from "react";
import { Navigate, Routes, Route, useParams } from "react-router-dom";
import { MainMenu, MainMenuItemInfo } from "../../components/MainMenu/MainMenu";
import { AdminViewParams, ADMIN_VIEW_PATH, AdminViewMenu, ViewerInfo } from "../../routes";
import { buildUrl } from "../../services/buildUrl";
import { OrdersDetailsView } from "../OrdersDetailsView/OrdersDetailsView";
import { OrdersListView } from "../OrdersListView/OrdersListView";
import { PaymentDetailsView } from "../PaymentDetailsView/PaymentDetailsView";
import { PaymentListView } from "../PaymentListView/PaymentListView";
import { UserDetailsView } from "../UserDetailsView/UserDetailsView";
import { UserListView } from "../UserListView/UserListView";

interface AdminMainMenuItem extends MainMenuItemInfo {
  name: AdminViewMenu;
  content: (info: AdminViewProps) => React.ReactNode;
}

export interface AdminViewProps {
  viewer: ViewerInfo;
}

export const AdminView: React.FC<AdminViewProps> = (props) => {
  const params = useParams<AdminViewParams>();

  // list of main menu items
  const menus: AdminMainMenuItem[] = useMemo(
    () => [
      {
        name: "users",
        title: "Users",
        url: buildUrl<AdminViewParams>(ADMIN_VIEW_PATH, { menu: "users" }),
        // authorizedScopes: [UserScopeEnum.SUPERADMIN, UserScopeEnum.ADMIN_USERS, UserScopeEnum.ADMIN_USERS_LIST],
        content: ({ viewer }) => (
          <Routes>
            <Route index element={<UserListView viewer={viewer} />} />
            <Route path="user/:id/*" element={<UserDetailsView viewer={viewer} />} />
          </Routes>
        ),
      },
      {
        name: "payments",
        title: "Payments",
        url: buildUrl<AdminViewParams>(ADMIN_VIEW_PATH, { menu: "payments" }),
        // authorizedScopes: [UserScopeEnum.SUPERADMIN, UserScopeEnum.ADMIN_PAYMENTS, UserScopeEnum.ADMIN_PAYMENTS_LIST],
        content: ({ viewer }) => (
          <Routes>
            <Route index element={<PaymentListView viewer={viewer} />} />
            <Route path="payment/:id/*" element={<PaymentDetailsView viewer={viewer} />} />
          </Routes>
        ),
      },
      {
        name: "orders",
        title: "Orders",
        // authorizedScopes: [
        // UserScopeEnum.SUPERADMIN,
        // UserScopeEnum.ADMIN_SUBSCRIPTIONS,
        // UserScopeEnum.ADMIN_SUBSCRIPTIONS_LIST,
        // ],
        url: buildUrl<AdminViewParams>(ADMIN_VIEW_PATH, { menu: "orders" }),
        content: ({ viewer }) => (
          <Routes>
            <Route index element={<OrdersListView viewer={viewer} />} />
            <Route path="order/:id/*" element={<OrdersDetailsView viewer={viewer} />} />
          </Routes>
        ),
      },
    ],
    [],
  );
  const defaultMenu = menus[0];
  const activeMenuInfo = getMenuByName(menus, params.menu);

  // redirect to default menu if none could by found by name
  if (!activeMenuInfo) {
    return <Navigate to={defaultMenu.name} />;
  }

  const activeItemIndex = menus.indexOf(activeMenuInfo);

  // get logged in user
  const { viewer } = props;

  if (!viewer) {
    return <div>loading</div>;
  }

  return (
    <>
      <div>Muugal admin</div>
      <div>
        <MainMenu items={menus} activeItemIndex={activeItemIndex} /* viewerScopes={viewer.scopes} */ />
        <div className={"info"}>{activeMenuInfo.content(props)}</div>
      </div>
    </>
  );
};

function getMenuByName(menus: AdminMainMenuItem[], name?: string) {
  return menus.find((menu) => menu.name === name);
}
