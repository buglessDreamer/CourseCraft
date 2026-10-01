import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FiPlus, FiLayers, FiDollarSign, FiEdit2, 
  FiTrash2, FiSearch, FiBookOpen, FiPlay, FiCheckCircle 
} from 'react-icons/fi';
import CreateCourseModal from "../components/createCourseModal";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCourse, setExpandedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/courses", {
        headers: { token: localStorage.getItem("token") }
      });
      setCourses(res.data.courses || []);
    } catch (e) {
      console.error("Failed to fetch courses:", e);
    }
  };

  const handleAddContent = async (courseId, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      title: formData.get("lessonTitle"),
      videoUrl: formData.get("videoUrl"),
      type: "video"
    };

    try {
      await axios.post(`http://localhost:3000/admin/courses/${courseId}/content`, payload, {
        headers: { token: localStorage.getItem("token") }
      });
      e.target.reset();
      fetchCourses(); 
    } catch (err) {
      alert("Failed to add lesson");
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`http://localhost:3000/admin/courses/${courseId}`, {
        headers: { token: localStorage.getItem("token") }
      });
      setCourses(courses.filter(c => c._id !== courseId));
    } catch (e) {
      alert("Error deleting course");
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent p-6 md:p-10">
      {showModal && (
        <CreateCourseModal 
          onClose={() => { setShowModal(false); setEditingCourse(null); }} 
          onSuccess={fetchCourses} 
          initialData={editingCourse} 
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <FiLayers className="text-emerald-500" /> Instructor Panel
            </h1>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2">
            <FiPlus size={22} /> Create Course
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-950/50 text-slate-400 text-[11px] uppercase font-black tracking-widest border-b border-slate-200 dark:border-slate-800">
                <th className="px-8 py-6">Course</th>
                <th className="px-8 py-6">Price</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredCourses.map((course) => (
                <>
                  <tr key={course._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={course.imageUrl || 'https://via.placeholder.com/150'} className="w-12 h-8 rounded object-cover" />
                        <span className="font-bold text-slate-900 dark:text-white">{course.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-emerald-600 font-black">${course.price}</span>
                    </td>
                    <td className="px-8 py-6 flex justify-end gap-2">
                      <button onClick={() => setExpandedCourse(expandedCourse === course._id ? null : course._id)} className="p-2 bg-amber-500/10 text-amber-600 rounded-lg" title="Curriculum">
                        <FiBookOpen size={18} />
                      </button>
                      <button onClick={() => { setEditingCourse(course); setShowModal(true); }} className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                        <FiEdit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(course._id)} className="p-2 bg-red-500/10 text-red-600 rounded-lg">
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                  
                  {expandedCourse === course._id && (
                    <tr className="bg-slate-50/80 dark:bg-slate-800/40">
                      <td colSpan="3" className="px-8 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-black text-sm uppercase mb-4 text-slate-500">Add New Lesson</h4>
                            <form onSubmit={(e) => handleAddContent(course._id, e)} className="space-y-3">
                              <input name="lessonTitle" placeholder="Lesson Title" className="w-full p-3 rounded-xl border dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm" required />
                              <input name="videoUrl" placeholder="Video URL (YouTube/Vimeo)" className="w-full p-3 rounded-xl border dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm" required />
                              <button className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm">Add to Course</button>
                            </form>
                          </div>
                          <div>
                            <h4 className="font-black text-sm uppercase mb-4 text-slate-500">Current Lessons ({course.content?.length || 0})</h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                              {course.content?.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                  <span className="text-sm font-medium">{i+1}. {item.title}</span>
                                  <FiPlay className="text-slate-300" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}