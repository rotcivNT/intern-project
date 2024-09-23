import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        onClick={handleRedirect}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Sign In
      </Button>
    </div>
  );
}
