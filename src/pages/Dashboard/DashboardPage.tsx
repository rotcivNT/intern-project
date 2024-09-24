import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hook";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const navigation = useNavigate();
  const onLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    navigation("/sign-in");
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="text-[40px] font-semibold">
        Hello {`${user?.firstName} ${user?.lastName}`}
      </p>
      <Button className="min-w-[150px] py-2" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
