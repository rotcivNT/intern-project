import { Route, Routes } from "react-router-dom";
import SignIn from "./_auth/SignIn";
import AuthLayout from "./_auth/AuthLayout";

function App() {
  return (
    <main>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
