import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { themeAtom } from "./atoms/themeAtom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import MyCourses from "./pages/MyCourses";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  const theme = useRecoilValue(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<ProtectedRoute role="user" />}>
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/my-courses" element={<MyCourses />} />
          </Route>

          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}