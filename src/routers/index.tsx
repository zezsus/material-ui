/** @format */

import AddUserComponent from "../components/AddUserComponent";
import EditUserComponent from "../components/EditUserComponent";
import HomePage from "../views/HomePage";
import UserDetail from "../views/UserDetail";

export const routers = [
  {
    path: "/",
    page: HomePage,
    isShowNav: true,
  },
  {
    path: "/user-detail/:id",
    page: UserDetail,
    isShowNav: true,
  },
  {
    path: "/add-user",
    page: AddUserComponent,
  },
  {
    path: "/edit-user",
    page: EditUserComponent,
  },
];
