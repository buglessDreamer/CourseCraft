import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { RiAdminLine, RiUserLine } from 'react-icons/ri';
import axios from "axios";

export default function Signup() {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const endpoint = role === "admin" ? "admin/signup" : "users/signup";
      await axios.post(`http://localhost:3000/${endpoint}`, formData);
      alert("Account created successfully!");
      navigate("/login");
    } catch (e) {
      alert(e.response?.data?.msg || "Registration failed. Check your data.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-transparent transition-colors duration-500">
      
      {/* Background Animated Blobs */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-[120px] animate-blob"></div>
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-2xl transition-all">
          
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-violet-600 rounded-2xl shadow-lg shadow-violet-500/40">
              <FiBookOpen className="text-white text-3xl" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-8 tracking-tight">Create Account</h2>
          
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-950/50 rounded-2xl mb-8 border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setRole("user")} 
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${role === "user" ? "bg-white dark:bg-violet-600 text-violet-600 dark:text-white shadow-sm" : "text-slate-400"}`}
            >
              <RiUserLine size={16}/> Student
            </button>
            <button 
              onClick={() => setRole("admin")} 
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${role === "admin" ? "bg-white dark:bg-violet-600 text-violet-600 dark:text-white shadow-sm" : "text-slate-400"}`}
            >
              <RiAdminLine size={16}/> Instructor
            </button>
          </div>

          <div className="space-y-4 mb-8">
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              <input 
                className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-violet-500 text-slate-900 dark:text-white transition-all text-sm" 
                placeholder="Username" 
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              <input 
                className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-violet-500 text-slate-900 dark:text-white transition-all text-sm" 
                placeholder="Email Address" 
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              <input 
                className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-violet-500 text-slate-900 dark:text-white transition-all text-sm" 
                type="password" 
                placeholder="Password" 
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            onClick={handleSignup} 
            className="w-full bg-violet-600 hover:bg-violet-800 text-white py-4 rounded-2xl font-black shadow-lg shadow-violet-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            Get Started <FiArrowRight />
          </button>

          <p className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm font-semibold">
            Already have an account? <Link to="/login" className="text-violet-600 dark:text-violet-400 font-bold hover:underline ml-1">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}