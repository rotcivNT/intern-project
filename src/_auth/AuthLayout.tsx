import { Navigate, Outlet } from "react-router-dom";
import AuthCarousel from "../components/auth/auth-carousel/AuthCarousel";

export default function AuthLayout() {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="flex bg-[#1c2636] h-screen">
      <div className="basis-full lg:basis-5/12 flex justify-center items-center mx-auto">
        <Outlet />
      </div>
      <div className="hidden lg:flex basis-7/12 overflow-hidden text-white bg-[#216CE3] rounded-tl-[120px] rounded-bl-[120px] justify-center items-center">
        <AuthCarousel />
      </div>
    </div>
  );
}
