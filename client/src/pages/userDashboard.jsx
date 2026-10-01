import { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiShoppingCart, FiStar, FiUser } from "react-icons/fi";

export default function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const defaultImage =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800";

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses")
      .then((res) => {
        setCourses(res.data.courses || []);
      })
      .catch((e) => console.error("Fetch failed", e));
  }, []);

  const handlePurchase = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    try {
      const res = await axios.post(
        `http://localhost:3000/courses/purchase/${courseId}`,
        {},
        {
          headers: { token },
        }
      );
      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "Purchase failed");
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            All Courses Offered
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Upgrade your skills today
          </p>
        </div>
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-violet-500 text-slate-900 dark:text-white transition-all shadow-sm"
            placeholder="Search courses..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="group bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-4xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
              <img
                src={course.imageUrl?.trim() ? course.imageUrl : defaultImage}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={course.title}
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-violet-600 dark:text-violet-400">
                <FiUser size={14} />
                <span className="text-xs font-black uppercase tracking-wider">
                  {course.creatorId?.username || "Lead Instructor"}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 line-clamp-1">
                {course.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 line-clamp-2 leading-relaxed grow">
                {course.description}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ${course.price}
                </span>
                <button
                  onClick={() => handlePurchase(course._id)}
                  className="bg-violet-600 hover:bg-violet-700 text-white p-3 px-5 rounded-xl transition-all active:scale-90 shadow-lg flex items-center gap-2 font-bold uppercase text-[10px]"
                >
                  <FiShoppingCart size={16} /> Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
