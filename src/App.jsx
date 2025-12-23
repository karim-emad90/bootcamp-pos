import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import LoginPage from "./LoginPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import Menu from "./Menu";
import CategoryFood from "./CategoryFood";

export default function App() {
  return (
    <div className="w-full h-dvh overflow-hidden bg-creamy text-blue-700">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<CategoryFood />} />
            <Route path="dashboard" element={<h1>Dashboard Page</h1>} />
            <Route path="invoices" element={<h1>Invoices Page</h1>} />
            <Route path="order" element={<h1>Order Page</h1>} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<h1>Error404 | Error Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
