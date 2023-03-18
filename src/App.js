import { HomePage, LoginPage, RegisterPage } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
