import { Route, Routes } from "react-router-dom";
import SignIn from "./_auth/SignIn";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </main>
  );
}

export default App;
