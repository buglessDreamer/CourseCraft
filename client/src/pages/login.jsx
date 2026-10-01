import { useRecoilState,useRecoilValue } from "recoil";
import { authAtom } from "../atoms/authAtom";
import { themeAtom } from "../atoms/themeAtom";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { RiAdminLine, RiUserLine } from 'react-icons/ri';
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const theme = useRecoilValue(themeAtom);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const endpoint = auth.role === "admin" ? "admin/signin" : "users/signin";
      const response = await axios.post(`http://localhost:3000/${endpoint}`, formData);
      const { token } = response.data;
      
      setAuth({ token, role: auth.role, isAuthenticated: true });
      localStorage.setItem("token", token);
      localStorage.setItem("role", auth.role);
      
      navigate(auth.role === "admin" ? "/adminDashboard" : "/userDashboard");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  }

  return (
    <div className="h-[calc(100vh-73px)] w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-transparent transition-colors duration-500">
      
      <div className="absolute top-0 -left-20 w-96 h-96 bg-violet-500/20 dark:bg-violet-600/20 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-2xl shadow-slate-200 dark:shadow-none transition-all">
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your details to sign in</p>
          </div>

          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-950/50 rounded-2xl mb-8 border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setAuth(p => ({ ...p, role: "user" }))}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${auth.role === "user" ? "bg-white dark:bg-violet-600 text-violet-600 dark:text-white shadow-sm" : "text-slate-400"}`}
            >
              <RiUserLine size={16} /> Student
            </button>
            <button 
              onClick={() => setAuth(p => ({ ...p, role: "admin" }))}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${auth.role === "admin" ? "bg-white dark:bg-violet-600 text-violet-600 dark:text-white shadow-sm" : "text-slate-400"}`}
            >
              <RiAdminLine size={16} /> Instructor
            </button>
          </div>

          <div className="space-y-4 mb-10">
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-violet-500 focus:ring-4 ring-violet-500/10 text-slate-900 dark:text-white transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-violet-500 focus:ring-4 ring-violet-500/10 text-slate-900 dark:text-white transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button 
              onClick={handleLogin} 
              className="w-full bg-violet-600 hover:bg-violet-800 text-white py-4 rounded-2xl font-black shadow-xl shadow-violet-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In <FiArrowRight />
            </button>
          </div>

          <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-semibold">
            New to CourseCraft? <Link to="/signup" className="text-violet-600 dark:text-violet-400 hover:underline ml-1">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}