import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import AuthLayout from "./pages/Auth/AuthLayout";
import HomePage from "./pages/Home/HomePage";
import RequireAuth from "./components/RequireAuth";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </main>
  );
}

export default App;
