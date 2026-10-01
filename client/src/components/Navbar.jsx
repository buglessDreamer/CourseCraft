import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { themeAtom } from "../atoms/themeAtom";
import { authAtom } from "../atoms/authAtom";
import { FiSun, FiMoon, FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && !auth.isAuthenticated) {
      setAuth({
        token: token,
        role: role || "user",
        isAuthenticated: true
      });
    }
  }, [auth.isAuthenticated, setAuth]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth({ token: null, role: "user", isAuthenticated: false });
    navigate("/login");
  };

  const getHomeLink = () => {
    if (!auth.isAuthenticated) return "/";
    return auth.role === "admin" ? "/adminDashboard" : "/userDashboard";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md">
      <div className="flex items-center gap-8">
        {/* DYNAMIC LOGO LINK */}
        <Link 
          to={getHomeLink()} 
          className="text-xl font-black text-slate-900 dark:text-white tracking-tighter hover:opacity-80 transition-opacity"
        >
          CourseCraft
        </Link>
        
        {auth.isAuthenticated && (
          <div className="hidden md:flex gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            {auth.role === 'user' ? (
              <>
                <Link to="/userDashboard" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Explore</Link>
                <Link to="/my-courses" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Enrolled Courses</Link>
              </>
            ) : (
              <Link to="/adminDashboard" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Instructor Panel</Link>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {/* User Badge (Optional visual indicator) */}
        {auth.isAuthenticated && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            <FiUser size={12} className={auth.role === 'admin' ? 'text-emerald-500' : 'text-violet-500'} />
            {auth.role}
          </div>
        )}

        <button 
          onClick={toggleTheme} 
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all border border-transparent dark:border-slate-700"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {auth.isAuthenticated && (
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <FiLogOut size={16} /> 
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}