import { useRecoilValue } from "recoil";
import { Navigate, Outlet } from "react-router-dom";
import { authAtom } from "../atoms/authAtom";

export default function ProtectedRoute({ role }) {
  const auth = useRecoilValue(authAtom);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.role !== role) {
    const fallbackPath = auth.role === "admin" ? "/adminDashboard" : "/userDashboard";
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
}