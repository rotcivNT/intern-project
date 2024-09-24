import { useGetMeQuery } from "@/features/auth/api";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
export default function RequireAuth() {
  const isLogged = Cookies.get("token");

  useGetMeQuery();
  return isLogged ? <Outlet /> : <Navigate to="/sign-in" replace={true} />;
}
