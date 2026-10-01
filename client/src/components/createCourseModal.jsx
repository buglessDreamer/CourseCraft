import { useState, useEffect } from "react";
import axios from "axios";
import { FiX, FiType, FiDollarSign, FiImage, FiAlignLeft, FiCheck } from "react-icons/fi";

export default function CreateCourseModal({ onClose, onSuccess, initialData }) {
  // If initialData exists, we are in EDIT mode
  const [data, setData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    imageUrl: initialData?.imageUrl || ""
  });

  const isEditing = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Determine URL and Method based on mode
    const url = isEditing 
      ? `http://localhost:3000/admin/courses/${initialData._id}` 
      : "http://localhost:3000/admin/courses";
    
    try {
      if (isEditing) {
        // Using your specific PUT route
        await axios.put(url, data, {
          headers: { token: localStorage.getItem("token") }
        });
      } else {
        await axios.post(url, data, {
          headers: { token: localStorage.getItem("token") }
        });
      }
      
      onSuccess();
      onClose();   
    } catch (err) {
      alert(isEditing ? "Update failed" : "Creation failed");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {isEditing ? "Edit Course" : "New Course"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
            <FiX size={24}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiType className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input 
              required 
              value={data.title}
              className="w-full p-4 pl-12 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all" 
              placeholder="Course Title" 
              onChange={e => setData({...data, title: e.target.value})} 
            />
          </div>
          
          <div className="relative">
            <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input 
              required 
              value={data.price}
              className="w-full p-4 pl-12 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all" 
              placeholder="Price" 
              type="number" 
              onChange={e => setData({...data, price: e.target.value})} 
            />
          </div>

          <div className="relative">
            <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input 
              value={data.imageUrl}
              className="w-full p-4 pl-12 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all" 
              placeholder="Image URL" 
              onChange={e => setData({...data, imageUrl: e.target.value})} 
            />
          </div>

          <div className="relative">
            <FiAlignLeft className="absolute left-4 top-6 text-slate-400"/>
            <textarea 
              value={data.description}
              className="w-full p-4 pl-12 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all h-32 resize-none" 
              placeholder="Course Description" 
              onChange={e => setData({...data, description: e.target.value})} 
            />
          </div>

          <button className={`w-full ${isEditing ? 'bg-blue-500' : 'bg-emerald-500'} text-white py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-4`}>
            <FiCheck size={20}/> {isEditing ? "Save Changes" : "Publish Course"}
          </button>
        </form>
      </div>
    </div>
  );
}