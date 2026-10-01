import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlay, FiBook, FiClock, FiExternalLink, FiCheckCircle } from "react-icons/fi";

export default function MyCourses() {
  const [purchases, setPurchases] = useState([]);
  const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800";

  useEffect(() => {
    axios.get("http://localhost:3000/users/purchasedCourses", {
      headers: { token: localStorage.getItem("token") }
    })
    .then(res => setPurchases(res.data.purchases || []))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">My Learnings</h1>
        <p className="text-slate-500">Continue where you left off</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {purchases.map((item) => {
          const course = item.courseId;
          if (!course) return null;

          return (
            <div key={item._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-sm">
              <div className="aspect-video bg-slate-100 dark:bg-slate-800">
                <img 
                  src={course.imageUrl?.trim() ? course.imageUrl : defaultImage} 
                  className="w-full h-full object-cover" 
                  alt={course.title} 
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-violet-500 text-[10px] font-bold uppercase tracking-widest">
                  <FiCheckCircle /> Enrolled
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 line-clamp-1">{course.title}</h3>
                
                <div className="mt-auto">
                  <p className="text-[11px] font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                    <FiBook /> Curriculum ({course.content?.length || 0} Lessons)
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {course.content?.length > 0 ? (
                      course.content.slice(0, 3).map((lesson, i) => (
                        <a 
                          key={i} 
                          href={lesson.videoUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-violet-500 hover:text-white transition-all text-xs group"
                        >
                          <span className="flex items-center gap-2">
                            <FiPlay className="text-violet-500 group-hover:text-white" /> {lesson.title}
                          </span>
                          <FiExternalLink size={12} className="opacity-0 group-hover:opacity-100" />
                        </a>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Lessons coming soon...</p>
                    )}
                    {course.content?.length > 3 && (
                      <p className="text-[10px] text-center text-slate-400 font-bold">+ {course.content.length - 3} more lessons</p>
                    )}
                  </div>

                  <button className="w-full bg-slate-900 dark:bg-white dark:text-black text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                    Go to Course
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {purchases.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
          <p className="text-slate-500 font-medium">You haven't purchased any courses yet.</p>
        </div>
      )}
    </div>
  );
}