// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2, // ← Fixed: Added back Trash2 import
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");

//   /* ================= AI STATES ================= */
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   /* ================= AI FUNCTION ================= */
//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       setAiResult(JSON.parse(data.aiResult));
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//   };

//   /* ================= FILTERING & SORTING ================= */
//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">

//         {/* ================= HEADER ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center"
//         >
//           <h3 className="text-4xl font-bold text-indigo-900 flex items-center justify-center gap-3">
//             <Briefcase className="text-indigo-500" /> Job Management Dashboard
//           </h3>
//           <p className="mt-3 text-lg text-gray-600">View jobs and analyze applicants with AI</p>
//         </motion.div>

//         {/* ================= MESSAGES ================= */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-green-100 rounded-2xl text-green-800 flex items-center gap-2 shadow-md"
//             >
//               <CheckCircle /> {successMsg}
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-red-100 rounded-2xl text-red-800 flex items-center gap-2 shadow-md"
//             >
//               <X /> {errorMsg}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ================= FILTERS & SEARCH ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-4"
//         >
//           <div className="relative">
//             <input
//               placeholder="Search jobs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-sm"
//             />
//             <Search className="absolute right-4 top-4 text-gray-500" size={20} />
//           </div>
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Status</option>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//           </select>
//           <select
//             value={filters.type}
//             onChange={(e) => handleFilterChange("type", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Types</option>
//             <option value="Remote">Remote</option>
//             <option value="Onsite">Onsite</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//         </motion.div>

//         {/* ================= JOB TABLE ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden"
//         >
//           <div className="overflow-x-auto">
//             <table className="w-full divide-y divide-indigo-100">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("title")}>
//                     Title <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("company")}>
//                     Company <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Status</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Type</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-indigo-100">
//                 {loadingJobs ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8">
//                       <Loader2 className="animate-spin mx-auto text-indigo-500" size={32} />
//                     </td>
//                   </tr>
//                 ) : filteredAndSortedJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No jobs found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAndSortedJobs.map((job) => (
//                     <motion.tr
//                       key={job._id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="hover:bg-indigo-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 font-semibold text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-gray-900">{job.company}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">{job.type}</td>
//                       <td className="px-6 py-4 flex gap-2">
//                         <button onClick={() => setSelectedJob(job)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Eye size={20} className="text-indigo-500" />
//                         </button>
//                         <button onClick={() => handleDeleteJob(job._id)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Trash2 size={20} className="text-red-500" />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* ================= VIEW MODAL ================= */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 className="bg-white rounded-3xl max-w-5xl w-full p-10 overflow-y-auto max-h-[90vh] shadow-2xl border border-indigo-100"
//               >
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-3xl font-bold text-indigo-900">{selectedJob.title}</h2>
//                   <button onClick={closeModals}>
//                     <X size={28} className="text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Building2 className="text-indigo-500" />
//                     <span>{selectedJob.company}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <MapPin className="text-indigo-500" />
//                     <span>{selectedJob.location}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <TrendingUp className="text-indigo-500" />
//                     <span>Salary: {selectedJob.salary || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Layers className="text-indigo-500" />
//                     <span>Experience: {selectedJob.experience || "N/A"} years</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Calendar className="text-indigo-500" />
//                     <span>Start: {selectedJob.startDate || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Calendar className="text-indigo-500" />
//                     <span>End: {selectedJob.endDate || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <CheckCircle className="text-indigo-500" />
//                     <span>Status: {selectedJob.status}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Users className="text-indigo-500" />
//                     <span>Type: {selectedJob.type}</span>
//                   </div>
//                 </div>

//                 <p className="mb-6 text-gray-900">{selectedJob.description || "No description provided."}</p>

//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-3 text-indigo-900">Required Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedJob.skills?.length > 0 ? (
//                       selectedJob.skills.map((skill, i) => (
//                         <span key={i} className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-900">
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-gray-500">No skills listed.</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* ===== AI ANALYZE BUTTON ===== */}
//                 <button
//                   onClick={() => runAIAnalysis(selectedJob._id)}
//                   disabled={aiLoading}
//                   className="w-full mb-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center gap-3 shadow-lg hover:shadow-teal-600/50 transition-shadow disabled:cursor-not-allowed"
//                 >
//                   <Sparkles /> {aiLoading ? "Analyzing Applicants..." : "AI Analyze Applicants"}
//                 </button>

//                 {/* ===== AI LOADING ===== */}
//                 {aiLoading && (
//                   <div className="text-center py-6 text-indigo-600 font-semibold flex justify-center gap-3">
//                     <Loader2 className="animate-spin" size={24} />
//                     AI is analyzing candidates...
//                   </div>
//                 )}

//                 {/* ===== AI ERROR ===== */}
//                 {aiError && (
//                   <div className="bg-red-100 p-4 rounded-xl text-red-800 mb-6">
//                     {aiError}
//                   </div>
//                 )}

//                 {/* ===== AI RESULTS ===== */}
//                 {aiResult && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI Candidate Rankings</h3>
//                     {aiResult.map((candidate, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: i * 0.1 }}
//                         className="border border-indigo-200 rounded-2xl p-6 shadow-md bg-gradient-to-br from-indigo-50/50 to-purple-50/30"
//                       >
//                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//                           <div>
//                             <h4 className="text-xl font-bold text-indigo-900">
//                               #{i + 1} {candidate.name}
//                             </h4>
//                             {candidate.email && (
//                               <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>
//                             )}
//                           </div>
//                           <span className="px-5 py-2 bg-indigo-600 text-white rounded-full font-bold text-lg">
//                             {candidate.score}/100
//                           </span>
//                         </div>

//                         <div className="grid md:grid-cols-2 gap-4 mb-4">
//                           <div>
//                             <p className="font-semibold text-indigo-700">Strengths</p>
//                             <p className="text-gray-700 mt-1">{candidate.strengths}</p>
//                           </div>
//                           <div>
//                             <p className="font-semibold text-indigo-700">Areas for Improvement</p>
//                             <p className="text-gray-700 mt-1">{candidate.weaknesses}</p>
//                           </div>
//                         </div>

//                         <div className="flex flex-wrap items-center justify-between gap-4">
//                           <span className="px-4 py-2 bg-teal-100 text-teal-900 rounded-full font-medium">
//                             {candidate.finalVerdict}
//                           </span>

//                           {candidate.email && (
//                             <Link
//                               href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                               target="_blank"
//                               className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
//                             >
//                               <User className="w-5 h-5" />
//                               View Full Profile
//                             </Link>
//                           )}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");

//   /* ================= AI STATES ================= */
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   // NEW: Track updating status per candidate (using email as key)
//   const [updatingStatuses, setUpdatingStatuses] = useState({});

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   /* ================= AI FUNCTION ================= */
//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({}); // Clear previous statuses

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       setAiResult(JSON.parse(data.aiResult));
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   /* ================= FILTERING & SORTING ================= */
//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">

//         {/* ================= HEADER ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center"
//         >
//           <h3 className="text-4xl font-bold text-indigo-900 flex items-center justify-center gap-3">
//             <Briefcase className="text-indigo-500" /> Job Management Dashboard
//           </h3>
//           <p className="mt-3 text-lg text-gray-600">View jobs and analyze applicants with AI</p>
//         </motion.div>

//         {/* ================= MESSAGES ================= */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-green-100 rounded-2xl text-green-800 flex items-center gap-2 shadow-md"
//             >
//               <CheckCircle /> {successMsg}
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-red-100 rounded-2xl text-red-800 flex items-center gap-2 shadow-md"
//             >
//               <X /> {errorMsg}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ================= FILTERS & SEARCH ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-4"
//         >
//           <div className="relative">
//             <input
//               placeholder="Search jobs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-sm"
//             />
//             <Search className="absolute right-4 top-4 text-gray-500" size={20} />
//           </div>
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Status</option>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//           </select>
//           <select
//             value={filters.type}
//             onChange={(e) => handleFilterChange("type", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Types</option>
//             <option value="Remote">Remote</option>
//             <option value="Onsite">Onsite</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//         </motion.div>

//         {/* ================= JOB TABLE ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden"
//         >
//           <div className="overflow-x-auto">
//             <table className="w-full divide-y divide-indigo-100">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("title")}>
//                     Title <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("company")}>
//                     Company <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Status</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Type</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-indigo-100">
//                 {loadingJobs ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8">
//                       <Loader2 className="animate-spin mx-auto text-indigo-500" size={32} />
//                     </td>
//                   </tr>
//                 ) : filteredAndSortedJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No jobs found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAndSortedJobs.map((job) => (
//                     <motion.tr
//                       key={job._id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="hover:bg-indigo-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 font-semibold text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-gray-900">{job.company}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">{job.type}</td>
//                       <td className="px-6 py-4 flex gap-2">
//                         <button onClick={() => setSelectedJob(job)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Eye size={20} className="text-indigo-500" />
//                         </button>
//                         <button onClick={() => handleDeleteJob(job._id)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Trash2 size={20} className="text-red-500" />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* ================= VIEW MODAL ================= */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 className="bg-white rounded-3xl max-w-5xl w-full p-10 overflow-y-auto max-h-[90vh] shadow-2xl border border-indigo-100"
//               >
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-3xl font-bold text-indigo-900">{selectedJob.title}</h2>
//                   <button onClick={closeModals}>
//                     <X size={28} className="text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Building2 className="text-indigo-500" />
//                     <span>{selectedJob.company}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <MapPin className="text-indigo-500" />
//                     <span>{selectedJob.location}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <TrendingUp className="text-indigo-500" />
//                     <span>Salary: {selectedJob.salary || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Layers className="text-indigo-500" />
//                     <span>Experience: {selectedJob.experience || "N/A"} years</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Calendar className="text-indigo-500" />
//                     <span>Start: {selectedJob.startDate || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Calendar className="text-indigo-500" />
//                     <span>End: {selectedJob.endDate || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <CheckCircle className="text-indigo-500" />
//                     <span>Status: {selectedJob.status}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-900">
//                     <Users className="text-indigo-500" />
//                     <span>Type: {selectedJob.type}</span>
//                   </div>
//                 </div>

//                 <p className="mb-6 text-gray-900">{selectedJob.description || "No description provided."}</p>

//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-3 text-indigo-900">Required Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedJob.skills?.length > 0 ? (
//                       selectedJob.skills.map((skill, i) => (
//                         <span key={i} className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-900">
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-gray-500">No skills listed.</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* ===== AI ANALYZE BUTTON ===== */}
//                 <button
//                   onClick={() => runAIAnalysis(selectedJob._id)}
//                   disabled={aiLoading}
//                   className="w-full mb-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center gap-3 shadow-lg hover:shadow-teal-600/50 transition-shadow disabled:cursor-not-allowed"
//                 >
//                   <Sparkles /> {aiLoading ? "Analyzing Applicants..." : "AI Analyze Applicants"}
//                 </button>

//                 {/* ===== AI LOADING ===== */}
//                 {aiLoading && (
//                   <div className="text-center py-6 text-indigo-600 font-semibold flex justify-center gap-3">
//                     <Loader2 className="animate-spin" size={24} />
//                     AI is analyzing candidates...
//                   </div>
//                 )}

//                 {/* ===== AI ERROR ===== */}
//                 {aiError && (
//                   <div className="bg-red-100 p-4 rounded-xl text-red-800 mb-6">
//                     {aiError}
//                   </div>
//                 )}

//                 {/* ===== AI RESULTS ===== */}
//                 {aiResult && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI Candidate Rankings</h3>
//                     {aiResult.map((candidate, i) => {
//                       const isUpdating = !!updatingStatuses[candidate.email];

//                       const handleStatusChange = async (newStatus) => {
//                         if (!newStatus || !candidate.email) return;

//                         setUpdatingStatuses(prev => ({ ...prev, [candidate.email]: true }));

//                         try {
//                           const res = await fetch("/api/applications/status", {
//                             method: "PATCH",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                               jobId: selectedJob._id,
//                               email: candidate.email,
//                               status: newStatus,
//                             }),
//                           });

//                           if (!res.ok) {
//                             const data = await res.json();
//                             throw new Error(data.message || "Failed to update status");
//                           }

//                           setAiResult((prev) =>
//                             prev.map((c) =>
//                               c.email === candidate.email ? { ...c, applicationStatus: newStatus } : c
//                             )
//                           );

//                           setSuccessMsg(`Status updated to "${newStatus}" for ${candidate.name}`);
//                           setTimeout(() => setSuccessMsg(""), 4000);
//                         } catch (err) {
//                           setErrorMsg(err.message);
//                           setTimeout(() => setErrorMsg(""), 5000);
//                         } finally {
//                           setUpdatingStatuses(prev => ({ ...prev, [candidate.email]: false }));
//                         }
//                       };

//                       return (
//                         <motion.div
//                           key={i}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.1 }}
//                           className="border border-indigo-200 rounded-2xl p-6 shadow-md bg-gradient-to-br from-indigo-50/50 to-purple-50/30"
//                         >
//                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//                             <div>
//                               <h4 className="text-xl font-bold text-indigo-900">
//                                 #{i + 1} {candidate.name}
//                               </h4>
//                               {candidate.email && (
//                                 <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>
//                               )}
//                             </div>
//                             <span className="px-5 py-2 bg-indigo-600 text-white rounded-full font-bold text-lg">
//                               {candidate.score}/100
//                             </span>
//                           </div>

//                           <div className="grid md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <p className="font-semibold text-indigo-700">Strengths</p>
//                               <p className="text-gray-700 mt-1">{candidate.strengths}</p>
//                             </div>
//                             <div>
//                               <p className="font-semibold text-indigo-700">Areas for Improvement</p>
//                               <p className="text-gray-700 mt-1">{candidate.weaknesses}</p>
//                             </div>
//                           </div>

//                           <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
//                             <div className="flex items-center gap-3">
//                               <span className="px-4 py-2 bg-teal-100 text-teal-900 rounded-full font-medium">
//                                 {candidate.finalVerdict}
//                               </span>

//                               {candidate.applicationStatus && (
//                                 <span className="px-4 py-2 bg-purple-100 text-purple-900 rounded-full text-sm font-medium">
//                                   {candidate.applicationStatus}
//                                 </span>
//                               )}
//                             </div>

//                             <div className="flex gap-3 w-full sm:w-auto">
//                               {candidate.email && (
//                                 <Link
//                                   href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                   target="_blank"
//                                   className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 flex-1 sm:flex-initial justify-center"
//                                 >
//                                   <User className="w-5 h-5" />
//                                   View Profile
//                                 </Link>
//                               )}

//                               <div className="relative">
//                                 <select
//                                   disabled={isUpdating || !candidate.email}
//                                   onChange={(e) => handleStatusChange(e.target.value)}
//                                   value={candidate.applicationStatus || ""}
//                                   className="appearance-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed"
//                                 >
//                                   <option value="" disabled>
//                                     {isUpdating ? "Updating..." : "Change Status"}
//                                   </option>
//                                   <option value="Shortlisted">Shortlisted</option>
//                                   <option value="Interview Scheduled">Interview Scheduled</option>
//                                   <option value="Technical Round">Technical Round</option>
//                                   <option value="HR Round">HR Round</option>
//                                   <option value="Offered">Offered</option>
//                                   <option value="Rejected">Rejected</option>
//                                   <option value="On Hold">On Hold</option>
//                                 </select>
//                                 <ChevronDown
//                                   className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
//                                   size={20}
//                                 />
//                                 {isUpdating && (
//                                   <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-white animate-spin" size={18} />
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");

//   /* ================= AI STATES ================= */
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   // Track which candidates are being updated
//   const [updatingStatuses, setUpdatingStatuses] = useState({});

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   /* ================= AI ANALYSIS WITH STATUS ENRICHMENT ================= */
//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       let parsedResult = JSON.parse(data.aiResult);

//       // Fetch the actual job to get real application statuses
//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       // Enrich AI candidates with real application status
//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );

//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//         };
//       });

//       setAiResult(enrichedResult);
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   /* ================= FILTERING & SORTING ================= */
//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">

//         {/* ================= HEADER ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//           <h3 className="text-4xl font-bold text-indigo-900 flex items-center justify-center gap-3">
//             <Briefcase className="text-indigo-500" /> Job Management Dashboard
//           </h3>
//           <p className="mt-3 text-lg text-gray-600">View jobs and analyze applicants with AI</p>
//         </motion.div>

//         {/* ================= MESSAGES ================= */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-green-100 rounded-2xl text-green-800 flex items-center gap-2 shadow-md"
//             >
//               <CheckCircle /> {successMsg}
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-red-100 rounded-2xl text-red-800 flex items-center gap-2 shadow-md"
//             >
//               <X /> {errorMsg}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ================= FILTERS & SEARCH ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <input
//               placeholder="Search jobs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-sm"
//             />
//             <Search className="absolute right-4 top-4 text-gray-500" size={20} />
//           </div>
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Status</option>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//           </select>
//           <select
//             value={filters.type}
//             onChange={(e) => handleFilterChange("type", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Types</option>
//             <option value="Remote">Remote</option>
//             <option value="Onsite">Onsite</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//         </motion.div>

//         {/* ================= JOB TABLE ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full divide-y divide-indigo-100">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("title")}>
//                     Title <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("company")}>
//                     Company <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Status</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Type</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-indigo-100">
//                 {loadingJobs ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8">
//                       <Loader2 className="animate-spin mx-auto text-indigo-500" size={32} />
//                     </td>
//                   </tr>
//                 ) : filteredAndSortedJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No jobs found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAndSortedJobs.map((job) => (
//                     <motion.tr
//                       key={job._id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="hover:bg-indigo-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 font-semibold text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-gray-900">{job.company}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">{job.type}</td>
//                       <td className="px-6 py-4 flex gap-2">
//                         <button onClick={() => setSelectedJob(job)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Eye size={20} className="text-indigo-500" />
//                         </button>
//                         <button onClick={() => handleDeleteJob(job._id)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Trash2 size={20} className="text-red-500" />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* ================= VIEW MODAL ================= */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 className="bg-white rounded-3xl max-w-5xl w-full p-10 overflow-y-auto max-h-[90vh] shadow-2xl border border-indigo-100"
//               >
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-3xl font-bold text-indigo-900">{selectedJob.title}</h2>
//                   <button onClick={closeModals}>
//                     <X size={28} className="text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="flex items-center gap-3 text-gray-900"><Building2 className="text-indigo-500" /><span>{selectedJob.company}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><MapPin className="text-indigo-500" /><span>{selectedJob.location}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><TrendingUp className="text-indigo-500" /><span>Salary: {selectedJob.salary || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Layers className="text-indigo-500" /><span>Experience: {selectedJob.experience || "N/A"} years</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>Start: {selectedJob.startDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>End: {selectedJob.endDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><CheckCircle className="text-indigo-500" /><span>Status: {selectedJob.status}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Users className="text-indigo-500" /><span>Type: {selectedJob.type}</span></div>
//                 </div>

//                 <p className="mb-6 text-gray-900">{selectedJob.description || "No description provided."}</p>

//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-3 text-indigo-900">Required Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedJob.skills?.length > 0 ? (
//                       selectedJob.skills.map((skill, i) => (
//                         <span key={i} className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-900">
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-gray-500">No skills listed.</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* ===== AI ANALYZE BUTTON ===== */}
//                 <button
//                   onClick={() => runAIAnalysis(selectedJob._id)}
//                   disabled={aiLoading}
//                   className="w-full mb-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center gap-3 shadow-lg hover:shadow-teal-600/50 transition-shadow disabled:cursor-not-allowed"
//                 >
//                   <Sparkles /> {aiLoading ? "Analyzing Applicants..." : "AI Analyze Applicants"}
//                 </button>

//                 {aiLoading && (
//                   <div className="text-center py-6 text-indigo-600 font-semibold flex justify-center gap-3">
//                     <Loader2 className="animate-spin" size={24} />
//                     AI is analyzing candidates...
//                   </div>
//                 )}

//                 {aiError && (
//                   <div className="bg-red-100 p-4 rounded-xl text-red-800 mb-6">
//                     {aiError}
//                   </div>
//                 )}

//                 {/* ===== AI RESULTS ===== */}
//                 {aiResult && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI Candidate Rankings</h3>
//                     {aiResult.map((candidate, i) => {
//                       const isUpdating = !!updatingStatuses[candidate.email];

//                       const handleStatusChange = async (newStatus) => {
//                         if (!newStatus || !candidate.email) return;

//                         setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: true }));

//                         try {
//                           const res = await fetch("/api/jobs/update-application", {
//                             method: "PATCH",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                               jobId: selectedJob._id,
//                               email: candidate.email,
//                               status: newStatus,
//                             }),
//                           });

//                           if (!res.ok) {
//                             const data = await res.json();
//                             throw new Error(data.message || "Failed to update status");
//                           }

//                           // Update local AI result
//                           setAiResult((prev) =>
//                             prev.map((c) =>
//                               c.email.toLowerCase() === candidate.email.toLowerCase()
//                                 ? { ...c, applicationStatus: newStatus }
//                                 : c
//                             )
//                           );

//                           setSuccessMsg(`Status updated to "${newStatus}" for ${candidate.name}`);
//                           setTimeout(() => setSuccessMsg(""), 4000);
//                         } catch (err) {
//                           setErrorMsg(err.message);
//                           setTimeout(() => setErrorMsg(""), 5000);
//                         } finally {
//                           setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: false }));
//                         }
//                       };

//                       return (
//                         <motion.div
//                           key={i}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.1 }}
//                           className="border border-indigo-200 rounded-2xl p-6 shadow-md bg-gradient-to-br from-indigo-50/50 to-purple-50/30"
//                         >
//                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//                             <div>
//                               <h4 className="text-xl font-bold text-indigo-900">#{i + 1} {candidate.name}</h4>
//                               {candidate.email && <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>}
//                             </div>
//                             <span className="px-5 py-2 bg-indigo-600 text-white rounded-full font-bold text-lg">
//                               {candidate.score}/100
//                             </span>
//                           </div>

//                           <div className="grid md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <p className="font-semibold text-indigo-700">Strengths</p>
//                               <p className="text-gray-700 mt-1">{candidate.strengths}</p>
//                             </div>
//                             <div>
//                               <p className="font-semibold text-indigo-700">Areas for Improvement</p>
//                               <p className="text-gray-700 mt-1">{candidate.weaknesses}</p>
//                             </div>
//                           </div>

//                           <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
//                             <div className="flex items-center gap-3">
//                               <span className="px-4 py-2 bg-teal-100 text-teal-900 rounded-full font-medium">
//                                 {candidate.finalVerdict}
//                               </span>

//                               <span className={`px-4 py-2 rounded-full text-sm font-medium ${candidate.applicationStatus === "accepted" ? "bg-green-100 text-green-800" :
//                                   candidate.applicationStatus === "rejected" ? "bg-red-100 text-red-800" :
//                                     candidate.applicationStatus === "reviewed" ? "bg-blue-100 text-blue-800" :
//                                       "bg-yellow-100 text-yellow-800"
//                                 }`}>
//                                 {candidate.applicationStatus.charAt(0).toUpperCase() + candidate.applicationStatus.slice(1)}
//                               </span>
//                             </div>

//                             <div className="flex gap-3 w-full sm:w-auto">
//                               {candidate.email && (
//                                 <Link
//                                   href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                   target="_blank"
//                                   className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 flex-1 sm:flex-initial justify-center"
//                                 >
//                                   <User className="w-5 h-5" />
//                                   View Profile
//                                 </Link>
//                               )}

//                               {/* <div className="relative">
//                                 <select
//                                   disabled={isUpdating || !candidate.email}
//                                   onChange={(e) => handleStatusChange(e.target.value)}
//                                   value={candidate.applicationStatus || "pending"}
//                                   className="appearance-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed"
//                                 >
//                                   <option value="pending">Pending</option>
//                                   <option value="reviewed">Reviewed</option>
//                                   <option value="accepted">Accepted</option>
//                                   <option value="rejected">Rejected</option>
//                                 </select>
//                                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
//                                 {isUpdating && (
//                                   <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-white animate-spin" size={18} />
//                                 )}
//                               </div>

//                                */}


//                               <div className="relative">
//                                 <select
//                                   disabled={isUpdating || !candidate.email}
//                                   onChange={(e) => handleStatusChange(e.target.value)}
//                                   value={candidate.applicationStatus || "pending"}
//                                   className="appearance-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-900 font-semibold rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
//                                 >
//                                   {/* <option value="pending">Pending</option>
//                                   <option value="reviewed">Reviewed</option>
//                                   <option value="accepted">Accepted</option>
//                                   <option value="rejected">Rejected</option> */}
//                                   <option value="pending">Pending</option>
//                                   <option value="reviewed">ShortListed</option>
//                                   <option value="accepted">Interview Sheduled</option>
//                                   <option value="rejected">Rejected</option>
//                                   <option value="rejected">Hired</option>
//                                 </select>
//                                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none" size={20} />
//                                 {isUpdating && (
//                                   <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-900 animate-spin" size={18} />
//                                 )}
//                               </div>


//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");

//   /* ================= AI STATES ================= */
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   // Track which candidates are being updated
//   const [updatingStatuses, setUpdatingStatuses] = useState({});

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   /* ================= AI ANALYSIS WITH STATUS ENRICHMENT ================= */
//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       let parsedResult = JSON.parse(data.aiResult);

//       // Fetch the actual job to get real application statuses
//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       // Enrich AI candidates with real application status
//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );

//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//         };
//       });

//       setAiResult(enrichedResult);
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   /* ================= FILTERING & SORTING ================= */
//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   // Helper to display nice status labels
//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "reviewed":
//         return "ShortListed";
//       case "accepted":
//         return "Interview Scheduled";
//       case "hired":
//         return "Hired";
//       case "rejected":
//         return "Rejected";
//       default:
//         return "Pending";
//     }
//   };

//   // Helper for status badge color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "hired":
//         return "bg-purple-100 text-purple-800";
//       case "accepted":
//         return "bg-cyan-100 text-cyan-800";
//       case "reviewed":
//         return "bg-blue-100 text-blue-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-yellow-100 text-yellow-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">

//         {/* ================= HEADER ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//           <h3 className="text-4xl font-bold text-indigo-900 flex items-center justify-center gap-3">
//             <Briefcase className="text-indigo-500" /> Job Management Dashboard
//           </h3>
//           <p className="mt-3 text-lg text-gray-600">View jobs and analyze applicants with AI</p>
//         </motion.div>

//         {/* ================= MESSAGES ================= */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-green-100 rounded-2xl text-green-800 flex items-center gap-2 shadow-md"
//             >
//               <CheckCircle /> {successMsg}
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-red-100 rounded-2xl text-red-800 flex items-center gap-2 shadow-md"
//             >
//               <X /> {errorMsg}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ================= FILTERS & SEARCH ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <input
//               placeholder="Search jobs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-sm"
//             />
//             <Search className="absolute right-4 top-4 text-gray-500" size={20} />
//           </div>
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Status</option>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//           </select>
//           <select
//             value={filters.type}
//             onChange={(e) => handleFilterChange("type", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Types</option>
//             <option value="Remote">Remote</option>
//             <option value="Onsite">Onsite</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//         </motion.div>

//         {/* ================= JOB TABLE ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full divide-y divide-indigo-100">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("title")}>
//                     Title <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("company")}>
//                     Company <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Status</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Type</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-indigo-100">
//                 {loadingJobs ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8">
//                       <Loader2 className="animate-spin mx-auto text-indigo-500" size={32} />
//                     </td>
//                   </tr>
//                 ) : filteredAndSortedJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No jobs found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAndSortedJobs.map((job) => (
//                     <motion.tr
//                       key={job._id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="hover:bg-indigo-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 font-semibold text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-gray-900">{job.company}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">{job.type}</td>
//                       <td className="px-6 py-4 flex gap-2">
//                         <button onClick={() => setSelectedJob(job)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Eye size={20} className="text-indigo-500" />
//                         </button>
//                         <button onClick={() => handleDeleteJob(job._id)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Trash2 size={20} className="text-red-500" />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* ================= VIEW MODAL ================= */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 className="bg-white rounded-3xl max-w-5xl w-full p-10 overflow-y-auto max-h-[90vh] shadow-2xl border border-indigo-100"
//               >
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-3xl font-bold text-indigo-900">{selectedJob.title}</h2>
//                   <button onClick={closeModals}>
//                     <X size={28} className="text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="flex items-center gap-3 text-gray-900"><Building2 className="text-indigo-500" /><span>{selectedJob.company}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><MapPin className="text-indigo-500" /><span>{selectedJob.location}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><TrendingUp className="text-indigo-500" /><span>Salary: {selectedJob.salary || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Layers className="text-indigo-500" /><span>Experience: {selectedJob.experience || "N/A"} years</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>Start: {selectedJob.startDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>End: {selectedJob.endDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><CheckCircle className="text-indigo-500" /><span>Status: {selectedJob.status}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Users className="text-indigo-500" /><span>Type: {selectedJob.type}</span></div>
//                 </div>

//                 <p className="mb-6 text-gray-900">{selectedJob.description || "No description provided."}</p>

//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-3 text-indigo-900">Required Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedJob.skills?.length > 0 ? (
//                       selectedJob.skills.map((skill, i) => (
//                         <span key={i} className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-900">
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-gray-500">No skills listed.</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* ===== AI ANALYZE BUTTON ===== */}
//                 <button
//                   onClick={() => runAIAnalysis(selectedJob._id)}
//                   disabled={aiLoading}
//                   className="w-full mb-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center gap-3 shadow-lg hover:shadow-teal-600/50 transition-shadow disabled:cursor-not-allowed"
//                 >
//                   <Sparkles /> {aiLoading ? "Analyzing Applicants..." : "AI Analyze Applicants"}
//                 </button>

//                 {aiLoading && (
//                   <div className="text-center py-6 text-indigo-600 font-semibold flex justify-center gap-3">
//                     <Loader2 className="animate-spin" size={24} />
//                     AI is analyzing candidates...
//                   </div>
//                 )}

//                 {aiError && (
//                   <div className="bg-red-100 p-4 rounded-xl text-red-800 mb-6">
//                     {aiError}
//                   </div>
//                 )}

//                 {/* ===== AI RESULTS ===== */}
//                 {aiResult && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI Candidate Rankings</h3>
//                     {aiResult.map((candidate, i) => {
//                       const isUpdating = !!updatingStatuses[candidate.email];

//                       const handleStatusChange = async (newStatus) => {
//                         if (!newStatus || !candidate.email) return;

//                         setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: true }));

//                         try {
//                           const res = await fetch("/api/jobs/update-application", {
//                             method: "PATCH",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                               jobId: selectedJob._id,
//                               email: candidate.email,
//                               status: newStatus,
//                             }),
//                           });

//                           if (!res.ok) {
//                             const data = await res.json();
//                             throw new Error(data.message || "Failed to update status");
//                           }

//                           // Update local AI result
//                           setAiResult((prev) =>
//                             prev.map((c) =>
//                               c.email.toLowerCase() === candidate.email.toLowerCase()
//                                 ? { ...c, applicationStatus: newStatus }
//                                 : c
//                             )
//                           );

//                           setSuccessMsg(`Status updated to "${getStatusLabel(newStatus)}" for ${candidate.name}`);
//                           setTimeout(() => setSuccessMsg(""), 4000);
//                         } catch (err) {
//                           setErrorMsg(err.message);
//                           setTimeout(() => setErrorMsg(""), 5000);
//                         } finally {
//                           setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: false }));
//                         }
//                       };

//                       return (
//                         <motion.div
//                           key={i}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.1 }}
//                           className="border border-indigo-200 rounded-2xl p-6 shadow-md bg-gradient-to-br from-indigo-50/50 to-purple-50/30"
//                         >
//                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//                             <div>
//                               <h4 className="text-xl font-bold text-indigo-900">#{i + 1} {candidate.name}</h4>
//                               {candidate.email && <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>}
//                             </div>
//                             <span className="px-5 py-2 bg-indigo-600 text-white rounded-full font-bold text-lg">
//                               {candidate.score}/100
//                             </span>
//                           </div>

//                           <div className="grid md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <p className="font-semibold text-indigo-700">Strengths</p>
//                               <p className="text-gray-700 mt-1">{candidate.strengths}</p>
//                             </div>
//                             <div>
//                               <p className="font-semibold text-indigo-700">Areas for Improvement</p>
//                               <p className="text-gray-700 mt-1">{candidate.weaknesses}</p>
//                             </div>
//                           </div>

//                           <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
//                             <div className="flex items-center gap-3">
//                               <span className="px-4 py-2 bg-teal-100 text-teal-900 rounded-full font-medium">
//                                 {candidate.finalVerdict}
//                               </span>

//                               <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(candidate.applicationStatus)}`}>
//                                 {getStatusLabel(candidate.applicationStatus)}
//                               </span>
//                             </div>

//                             <div className="flex gap-3 w-full sm:w-auto">
//                               {candidate.email && (
//                                 <Link
//                                   href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                   target="_blank"
//                                   className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 flex-1 sm:flex-initial justify-center"
//                                 >
//                                   <User className="w-5 h-5" />
//                                   View Profile
//                                 </Link>
//                               )}

//                               <div className="relative">
//                                 <select
//                                   disabled={isUpdating || !candidate.email}
//                                   onChange={(e) => handleStatusChange(e.target.value)}
//                                   value={candidate.applicationStatus || "pending"}
//                                   className="appearance-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-900 font-semibold rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
//                                 >
//                                   <option value="pending">Pending</option>
//                                   <option value="reviewed">ShortListed</option>
//                                   <option value="accepted">Interview Scheduled</option>
//                                   <option value="rejected">Rejected</option>
//                                   <option value="hired">Hired</option>
//                                 </select>
//                                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none" size={20} />
//                                 {isUpdating && (
//                                   <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-900 animate-spin" size={18} />
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");

//   /* ================= AI STATES ================= */
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   // Track which candidates are being updated
//   const [updatingStatuses, setUpdatingStatuses] = useState({});

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   /* ================= FETCH FRESH JOB WHEN VIEWING ================= */
//   const handleViewJob = async (job) => {
//     try {
//       const res = await fetch(`/api/jobs/${job._id}`);
//       if (res.ok) {
//         const freshJob = await res.json();
//         setSelectedJob(freshJob);
//       } else {
//         setSelectedJob(job); // fallback
//       }
//     } catch {
//       setSelectedJob(job);
//     }
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   /* ================= AI ANALYSIS WITH STATUS ENRICHMENT ================= */
//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       const parsedResult = JSON.parse(data.aiResult);

//       // Fetch fresh job data to get latest application statuses
//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );

//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//         };
//       });

//       setAiResult(enrichedResult);
//       setSelectedJob(jobData); // keep selectedJob in sync
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   /* ================= FILTERING & SORTING ================= */
//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   // Helper to display nice status labels
//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "reviewed":
//         return "ShortListed";
//       case "accepted":
//         return "Interview Scheduled";
//       case "hired":
//         return "Hired";
//       case "rejected":
//         return "Rejected";
//       default:
//         return "Pending";
//     }
//   };

//   // Helper for status badge color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "hired":
//         return "bg-purple-100 text-purple-800";
//       case "accepted":
//         return "bg-cyan-100 text-cyan-800";
//       case "reviewed":
//         return "bg-blue-100 text-blue-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-yellow-100 text-yellow-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">

//         {/* ================= HEADER ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//           <h3 className="text-4xl font-bold text-indigo-900 flex items-center justify-center gap-3">
//             <Briefcase className="text-indigo-500" /> Job Management Dashboard
//           </h3>
//           <p className="mt-3 text-lg text-gray-600">View jobs and analyze applicants with AI</p>
//         </motion.div>

//         {/* ================= MESSAGES ================= */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-green-100 rounded-2xl text-green-800 flex items-center gap-2 shadow-md"
//             >
//               <CheckCircle /> {successMsg}
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-red-100 rounded-2xl text-red-800 flex items-center gap-2 shadow-md"
//             >
//               <X /> {errorMsg}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ================= FILTERS & SEARCH ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <input
//               placeholder="Search jobs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-sm"
//             />
//             <Search className="absolute right-4 top-4 text-gray-500" size={20} />
//           </div>
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Status</option>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//           </select>
//           <select
//             value={filters.type}
//             onChange={(e) => handleFilterChange("type", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Types</option>
//             <option value="Remote">Remote</option>
//             <option value="Onsite">Onsite</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//         </motion.div>

//         {/* ================= JOB TABLE ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full divide-y divide-indigo-100">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("title")}>
//                     Title <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("company")}>
//                     Company <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Status</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Type</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-indigo-100">
//                 {loadingJobs ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8">
//                       <Loader2 className="animate-spin mx-auto text-indigo-500" size={32} />
//                     </td>
//                   </tr>
//                 ) : filteredAndSortedJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No jobs found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAndSortedJobs.map((job) => (
//                     <motion.tr
//                       key={job._id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="hover:bg-indigo-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 font-semibold text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-gray-900">{job.company}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">{job.type}</td>
//                       <td className="px-6 py-4 flex gap-2">
//                         <button onClick={() => handleViewJob(job)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Eye size={20} className="text-indigo-500" />
//                         </button>
//                         <button onClick={() => handleDeleteJob(job._id)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Trash2 size={20} className="text-red-500" />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* ================= VIEW MODAL ================= */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 className="bg-white rounded-3xl max-w-5xl w-full p-10 overflow-y-auto max-h-[90vh] shadow-2xl border border-indigo-100"
//               >
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-3xl font-bold text-indigo-900">{selectedJob.title}</h2>
//                   <button onClick={closeModals}>
//                     <X size={28} className="text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="flex items-center gap-3 text-gray-900"><Building2 className="text-indigo-500" /><span>{selectedJob.company}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><MapPin className="text-indigo-500" /><span>{selectedJob.location}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><TrendingUp className="text-indigo-500" /><span>Salary: {selectedJob.salary || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Layers className="text-indigo-500" /><span>Experience: {selectedJob.experience || "N/A"} years</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>Start: {selectedJob.startDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>End: {selectedJob.endDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><CheckCircle className="text-indigo-500" /><span>Status: {selectedJob.status}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Users className="text-indigo-500" /><span>Type: {selectedJob.type}</span></div>
//                 </div>

//                 <p className="mb-6 text-gray-900">{selectedJob.description || "No description provided."}</p>

//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-3 text-indigo-900">Required Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedJob.skills?.length > 0 ? (
//                       selectedJob.skills.map((skill, i) => (
//                         <span key={i} className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-900">
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-gray-500">No skills listed.</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* ===== AI ANALYZE BUTTON ===== */}
//                 <button
//                   onClick={() => runAIAnalysis(selectedJob._id)}
//                   disabled={aiLoading}
//                   className="w-full mb-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center gap-3 shadow-lg hover:shadow-teal-600/50 transition-shadow disabled:cursor-not-allowed"
//                 >
//                   <Sparkles /> {aiLoading ? "Analyzing Applicants..." : "AI Analyze Applicants"}
//                 </button>

//                 {aiLoading && (
//                   <div className="text-center py-6 text-indigo-600 font-semibold flex justify-center gap-3">
//                     <Loader2 className="animate-spin" size={24} />
//                     AI is analyzing candidates...
//                   </div>
//                 )}

//                 {aiError && (
//                   <div className="bg-red-100 p-4 rounded-xl text-red-800 mb-6">
//                     {aiError}
//                   </div>
//                 )}

//                 {/* ===== AI RESULTS ===== */}
//                 {aiResult && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI Candidate Rankings</h3>
//                     {aiResult.map((candidate, i) => {
//                       // Always get the latest real status from selectedJob.applications
//                       const realApplication = selectedJob.applications?.find(
//                         (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//                       );
//                       const currentStatus = realApplication?.status || "pending";
//                       const isUpdating = !!updatingStatuses[candidate.email];

//                       const handleStatusChange = async (newStatus) => {
//                         if (!newStatus || !candidate.email) return;

//                         setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: true }));

//                         try {
//                           const res = await fetch("/api/jobs/update-application", {
//                             method: "PATCH",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                               jobId: selectedJob._id,
//                               email: candidate.email,
//                               status: newStatus,
//                             }),
//                           });

//                           if (!res.ok) {
//                             const data = await res.json();
//                             throw new Error(data.message || "Failed to update status");
//                           }

//                           // Optimistically update selectedJob (real source of truth)
//                           setSelectedJob((prev) => ({
//                             ...prev,
//                             applications: prev.applications.map((app) =>
//                               app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//                                 ? { ...app, status: newStatus }
//                                 : app
//                             ),
//                           }));

//                           // Also sync aiResult for immediate UI consistency
//                           setAiResult((prev) =>
//                             prev.map((c) =>
//                               c.email.toLowerCase() === candidate.email.toLowerCase()
//                                 ? { ...c, applicationStatus: newStatus }
//                                 : c
//                             )
//                           );

//                           setSuccessMsg(`Status updated to "${getStatusLabel(newStatus)}" for ${candidate.name}`);
//                           setTimeout(() => setSuccessMsg(""), 4000);
//                         } catch (err) {
//                           setErrorMsg(err.message);
//                           setTimeout(() => setErrorMsg(""), 5000);
//                         } finally {
//                           setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: false }));
//                         }
//                       };

//                       return (
//                         <motion.div
//                           key={candidate.email || i}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.1 }}
//                           className="border border-indigo-200 rounded-2xl p-6 shadow-md bg-gradient-to-br from-indigo-50/50 to-purple-50/30"
//                         >
//                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//                             <div>
//                               <h4 className="text-xl font-bold text-indigo-900">#{i + 1} {candidate.name}</h4>
//                               {candidate.email && <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>}
//                             </div>
//                             <span className="px-5 py-2 bg-indigo-600 text-white rounded-full font-bold text-lg">
//                               {candidate.score}/100
//                             </span>
//                           </div>

//                           <div className="grid md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <p className="font-semibold text-indigo-700">Strengths</p>
//                               <p className="text-gray-700 mt-1">{candidate.strengths}</p>
//                             </div>
//                             <div>
//                               <p className="font-semibold text-indigo-700">Areas for Improvement</p>
//                               <p className="text-gray-700 mt-1">{candidate.weaknesses}</p>
//                             </div>
//                           </div>

//                           <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
//                             <div className="flex items-center gap-3">
//                               <span className="px-4 py-2 bg-teal-100 text-teal-900 rounded-full font-medium">
//                                 {candidate.finalVerdict}
//                               </span>

//                               {/* Real-time status badge */}
//                               <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
//                                 {getStatusLabel(currentStatus)}
//                               </span>
//                             </div>

//                             <div className="flex gap-3 w-full sm:w-auto">
//                               {candidate.email && (
//                                 <Link
//                                   href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                   target="_blank"
//                                   className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 flex-1 sm:flex-initial justify-center"
//                                 >
//                                   <User className="w-5 h-5" />
//                                   View Profile
//                                 </Link>
//                               )}

//                               <div className="relative">
//                                 <select
//                                   disabled={isUpdating || !candidate.email}
//                                   onChange={(e) => handleStatusChange(e.target.value)}
//                                   value={currentStatus}
//                                   className="appearance-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-900 font-semibold rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
//                                 >
//                                   <option value="pending">Pending</option>
//                                   <option value="shortlisted">ShortListed</option>
//                                   <option value="interview">Interview Scheduled</option>
//                                   <option value="rejected">Rejected</option>
//                                   <option value="hired">Hired</option>
//                                 </select>
//                                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none" size={20} />
//                                 {isUpdating && (
//                                   <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-900 animate-spin" size={18} />
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");

//   /* ================= AI STATES ================= */
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   // Track which candidates are being updated
//   const [updatingStatuses, setUpdatingStatuses] = useState({});

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   /* ================= FETCH FRESH JOB WHEN VIEWING ================= */
//   const handleViewJob = async (job) => {
//     try {
//       const res = await fetch(`/api/jobs/${job._id}`);
//       if (res.ok) {
//         const freshJob = await res.json();
//         setSelectedJob(freshJob);
//       } else {
//         setSelectedJob(job); // fallback
//       }
//     } catch {
//       setSelectedJob(job);
//     }
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   /* ================= AI ANALYSIS WITH STATUS ENRICHMENT ================= */
//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       const parsedResult = JSON.parse(data.aiResult);

//       // Fetch fresh job data to get latest application statuses
//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );

//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//         };
//       });

//       setAiResult(enrichedResult);
//       setSelectedJob(jobData); // keep selectedJob in sync
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   /* ================= FILTERING & SORTING ================= */
//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   // Helper to display nice status labels
//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "reviewed":
//         return "ShortListed";
//       case "accepted":
//         return "Interview Scheduled";
//       case "hired":
//         return "Hired";
//       case "rejected":
//         return "Rejected";
//       case "pending":
//       default:
//         return "Pending";
//     }
//   };

//   // Helper for status badge color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "hired":
//         return "bg-purple-100 text-purple-800";
//       case "accepted":
//         return "bg-cyan-100 text-cyan-800";
//       case "reviewed":
//         return "bg-blue-100 text-blue-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       case "pending":
//       default:
//         return "bg-yellow-100 text-yellow-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">

//         {/* ================= HEADER ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//           <h3 className="text-4xl font-bold text-indigo-900 flex items-center justify-center gap-3">
//             <Briefcase className="text-indigo-500" /> Job Management Dashboard
//           </h3>
//           <p className="mt-3 text-lg text-gray-600">View jobs and analyze applicants with AI</p>
//         </motion.div>

//         {/* ================= MESSAGES ================= */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-green-100 rounded-2xl text-green-800 flex items-center gap-2 shadow-md"
//             >
//               <CheckCircle /> {successMsg}
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-red-100 rounded-2xl text-red-800 flex items-center gap-2 shadow-md"
//             >
//               <X /> {errorMsg}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ================= FILTERS & SEARCH ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <input
//               placeholder="Search jobs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-sm"
//             />
//             <Search className="absolute right-4 top-4 text-gray-500" size={20} />
//           </div>
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Status</option>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//           </select>
//           <select
//             value={filters.type}
//             onChange={(e) => handleFilterChange("type", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Types</option>
//             <option value="Remote">Remote</option>
//             <option value="Onsite">Onsite</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//         </motion.div>

//         {/* ================= JOB TABLE ================= */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full divide-y divide-indigo-100">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("title")}>
//                     Title <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("company")}>
//                     Company <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Status</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Type</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-indigo-100">
//                 {loadingJobs ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8">
//                       <Loader2 className="animate-spin mx-auto text-indigo-500" size={32} />
//                     </td>
//                   </tr>
//                 ) : filteredAndSortedJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No jobs found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAndSortedJobs.map((job) => (
//                     <motion.tr
//                       key={job._id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="hover:bg-indigo-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 font-semibold text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-gray-900">{job.company}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">{job.type}</td>
//                       <td className="px-6 py-4 flex gap-2">
//                         <button onClick={() => handleViewJob(job)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Eye size={20} className="text-indigo-500" />
//                         </button>
//                         <button onClick={() => handleDeleteJob(job._id)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Trash2 size={20} className="text-red-500" />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* ================= VIEW MODAL ================= */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 className="bg-white rounded-3xl max-w-5xl w-full p-10 overflow-y-auto max-h-[90vh] shadow-2xl border border-indigo-100"
//               >
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-3xl font-bold text-indigo-900">{selectedJob.title}</h2>
//                   <button onClick={closeModals}>
//                     <X size={28} className="text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="flex items-center gap-3 text-gray-900"><Building2 className="text-indigo-500" /><span>{selectedJob.company}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><MapPin className="text-indigo-500" /><span>{selectedJob.location}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><TrendingUp className="text-indigo-500" /><span>Salary: {selectedJob.salary || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Layers className="text-indigo-500" /><span>Experience: {selectedJob.experience || "N/A"} years</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>Start: {selectedJob.startDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>End: {selectedJob.endDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><CheckCircle className="text-indigo-500" /><span>Status: {selectedJob.status}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Users className="text-indigo-500" /><span>Type: {selectedJob.type}</span></div>
//                 </div>

//                 <p className="mb-6 text-gray-900">{selectedJob.description || "No description provided."}</p>

//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-3 text-indigo-900">Required Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedJob.skills?.length > 0 ? (
//                       selectedJob.skills.map((skill, i) => (
//                         <span key={i} className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-900">
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-gray-500">No skills listed.</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* ===== AI ANALYZE BUTTON ===== */}
//                 <button
//                   onClick={() => runAIAnalysis(selectedJob._id)}
//                   disabled={aiLoading}
//                   className="w-full mb-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center gap-3 shadow-lg hover:shadow-teal-600/50 transition-shadow disabled:cursor-not-allowed"
//                 >
//                   <Sparkles /> {aiLoading ? "Analyzing Applicants..." : "AI Analyze Applicants"}
//                 </button>

//                 {aiLoading && (
//                   <div className="text-center py-6 text-indigo-600 font-semibold flex justify-center gap-3">
//                     <Loader2 className="animate-spin" size={24} />
//                     AI is analyzing candidates...
//                   </div>
//                 )}

//                 {aiError && (
//                   <div className="bg-red-100 p-4 rounded-xl text-red-800 mb-6">
//                     {aiError}
//                   </div>
//                 )}

//                 {/* ===== AI RESULTS ===== */}
//                 {aiResult && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI Candidate Rankings</h3>
//                     {aiResult.map((candidate, i) => {
//                       // Always get the latest real status from selectedJob.applications
//                       const realApplication = selectedJob.applications?.find(
//                         (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//                       );
//                       const currentStatus = realApplication?.status || "pending";
//                       const isUpdating = !!updatingStatuses[candidate.email];

//                       const handleStatusChange = async (newStatus) => {
//                         if (!newStatus || !candidate.email) return;

//                         setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: true }));

//                         try {
//                           const res = await fetch("/api/jobs/update-application", {
//                             method: "PATCH",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                               jobId: selectedJob._id,
//                               email: candidate.email,
//                               status: newStatus,
//                             }),
//                           });

//                           if (!res.ok) {
//                             const data = await res.json();
//                             throw new Error(data.message || "Failed to update status");
//                           }

//                           // Optimistically update selectedJob (real source of truth)
//                           setSelectedJob((prev) => ({
//                             ...prev,
//                             applications: prev.applications.map((app) =>
//                               app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//                                 ? { ...app, status: newStatus }
//                                 : app
//                             ),
//                           }));

//                           // Also sync aiResult for immediate UI consistency
//                           setAiResult((prev) =>
//                             prev.map((c) =>
//                               c.email.toLowerCase() === candidate.email.toLowerCase()
//                                 ? { ...c, applicationStatus: newStatus }
//                                 : c
//                             )
//                           );

//                           setSuccessMsg(`Status updated to "${getStatusLabel(newStatus)}" for ${candidate.name}`);
//                           setTimeout(() => setSuccessMsg(""), 4000);
//                         } catch (err) {
//                           setErrorMsg(err.message);
//                           setTimeout(() => setErrorMsg(""), 5000);
//                         } finally {
//                           setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: false }));
//                         }
//                       };

//                       return (
//                         <motion.div
//                           key={candidate.email || i}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.1 }}
//                           className="border border-indigo-200 rounded-2xl p-6 shadow-md bg-gradient-to-br from-indigo-50/50 to-purple-50/30"
//                         >
//                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//                             <div>
//                               <h4 className="text-xl font-bold text-indigo-900">#{i + 1} {candidate.name}</h4>
//                               {candidate.email && <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>}
//                             </div>
//                             <span className="px-5 py-2 bg-indigo-600 text-white rounded-full font-bold text-lg">
//                               {candidate.score}/100
//                             </span>
//                           </div>

//                           <div className="grid md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <p className="font-semibold text-indigo-700">Strengths</p>
//                               <p className="text-gray-700 mt-1">{candidate.strengths}</p>
//                             </div>
//                             <div>
//                               <p className="font-semibold text-indigo-700">Areas for Improvement</p>
//                               <p className="text-gray-700 mt-1">{candidate.weaknesses}</p>
//                             </div>
//                           </div>

//                           <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
//                             <div className="flex items-center gap-3">
//                               <span className="px-4 py-2 bg-teal-100 text-teal-900 rounded-full font-medium">
//                                 {candidate.finalVerdict}
//                               </span>

//                               {/* Real-time status badge */}
//                               <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
//                                 {getStatusLabel(currentStatus)}
//                               </span>
//                             </div>

//                             <div className="flex gap-3 w-full sm:w-auto">
//                               {candidate.email && (
//                                 <Link
//                                   href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                   target="_blank"
//                                   className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 flex-1 sm:flex-initial justify-center"
//                                 >
//                                   <User className="w-5 h-5" />
//                                   View Profile
//                                 </Link>
//                               )}

//                               <div className="relative">
//                                 <select
//                                   disabled={isUpdating || !candidate.email}
//                                   onChange={(e) => handleStatusChange(e.target.value)}
//                                   value={currentStatus}
//                                   className="appearance-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-900 font-semibold rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
//                                 >
//                                   <option value="pending">Pending</option>
//                                   <option value="reviewed">ShortListed</option>
//                                   <option value="accepted">Interview Scheduled</option>
//                                   <option value="rejected">Rejected</option>
//                                   <option value="hired">Hired</option>
//                                 </select>
//                                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none" size={20} />
//                                 {isUpdating && (
//                                   <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-900 animate-spin" size={18} />
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   const [updatingStatuses, setUpdatingStatuses] = useState({});

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleViewJob = async (job) => {
//     try {
//       const res = await fetch(`/api/jobs/${job._id}`);
//       if (res.ok) {
//         const freshJob = await res.json();
//         setSelectedJob(freshJob);
//       } else {
//         setSelectedJob(job);
//       }
//     } catch {
//       setSelectedJob(job);
//     }
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       const parsedResult = JSON.parse(data.aiResult);

//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );
//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//         };
//       });

//       setAiResult(enrichedResult);
//       setSelectedJob(jobData);
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   // Status display helpers
//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "Shortlisted";
//       case "rejected":
//         return "Rejected";
//       case "pending":
//       default:
//         return "Pending";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "bg-blue-100 text-blue-800";
//       case "rejected":
//         return "bg-red-100 text-red-800";
//       case "pending":
//       default:
//         return "bg-yellow-100 text-yellow-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
//         {/* HEADER */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
//           <h3 className="text-4xl font-bold text-indigo-900 flex items-center justify-center gap-3">
//             <Briefcase className="text-indigo-500" /> Job Management Dashboard
//           </h3>
//           <p className="mt-3 text-lg text-gray-600">View jobs and analyze applicants with AI</p>
//         </motion.div>

//         {/* MESSAGES */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-green-100 rounded-2xl text-green-800 flex items-center gap-2 shadow-md"
//             >
//               <CheckCircle /> {successMsg}
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-red-100 rounded-2xl text-red-800 flex items-center gap-2 shadow-md"
//             >
//               <X /> {errorMsg}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* FILTERS */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <input
//               placeholder="Search jobs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-sm"
//             />
//             <Search className="absolute right-4 top-4 text-gray-500" size={20} />
//           </div>
//           <select
//             value={filters.status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Status</option>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//           </select>
//           <select
//             value={filters.type}
//             onChange={(e) => handleFilterChange("type", e.target.value)}
//             className="px-6 py-4 rounded-2xl bg-white border border-indigo-200 text-gray-900 focus:outline-none focus:border-indigo-500 shadow-sm"
//           >
//             <option value="">All Types</option>
//             <option value="Remote">Remote</option>
//             <option value="Onsite">Onsite</option>
//             <option value="Hybrid">Hybrid</option>
//           </select>
//         </motion.div>

//         {/* JOB TABLE */}
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full divide-y divide-indigo-100">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("title")}>
//                     Title <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left cursor-pointer text-indigo-900" onClick={() => toggleSort("company")}>
//                     Company <ChevronDown size={16} className="inline" />
//                   </th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Status</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Type</th>
//                   <th className="px-6 py-4 text-left text-indigo-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-indigo-100">
//                 {loadingJobs ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8">
//                       <Loader2 className="animate-spin mx-auto text-indigo-500" size={32} />
//                     </td>
//                   </tr>
//                 ) : filteredAndSortedJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No jobs found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAndSortedJobs.map((job) => (
//                     <motion.tr
//                       key={job._id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="hover:bg-indigo-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 font-semibold text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-gray-900">{job.company}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-sm ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-gray-900">{job.type}</td>
//                       <td className="px-6 py-4 flex gap-2">
//                         <button onClick={() => handleViewJob(job)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Eye size={20} className="text-indigo-500" />
//                         </button>
//                         <button onClick={() => handleDeleteJob(job._id)} className="p-2 rounded-full hover:bg-indigo-100 transition">
//                           <Trash2 size={20} className="text-red-500" />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* VIEW MODAL */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.95, opacity: 0 }}
//                 className="bg-white rounded-3xl max-w-5xl w-full p-10 overflow-y-auto max-h-[90vh] shadow-2xl border border-indigo-100"
//               >
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-3xl font-bold text-indigo-900">{selectedJob.title}</h2>
//                   <button onClick={closeModals}>
//                     <X size={28} className="text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="flex items-center gap-3 text-gray-900"><Building2 className="text-indigo-500" /><span>{selectedJob.company}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><MapPin className="text-indigo-500" /><span>{selectedJob.location}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><TrendingUp className="text-indigo-500" /><span>Salary: {selectedJob.salary || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Layers className="text-indigo-500" /><span>Experience: {selectedJob.experience || "N/A"} years</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>Start: {selectedJob.startDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Calendar className="text-indigo-500" /><span>End: {selectedJob.endDate || "N/A"}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><CheckCircle className="text-indigo-500" /><span>Status: {selectedJob.status}</span></div>
//                   <div className="flex items-center gap-3 text-gray-900"><Users className="text-indigo-500" /><span>Type: {selectedJob.type}</span></div>
//                 </div>

//                 <p className="mb-6 text-gray-900">{selectedJob.description || "No description provided."}</p>

//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold mb-3 text-indigo-900">Required Skills</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedJob.skills?.length > 0 ? (
//                       selectedJob.skills.map((skill, i) => (
//                         <span key={i} className="px-4 py-2 bg-indigo-100 rounded-full text-indigo-900">
//                           {skill}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-gray-500">No skills listed.</span>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => runAIAnalysis(selectedJob._id)}
//                   disabled={aiLoading}
//                   className="w-full mb-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center gap-3 shadow-lg hover:shadow-teal-600/50 transition-shadow disabled:cursor-not-allowed"
//                 >
//                   <Sparkles /> {aiLoading ? "Analyzing Applicants..." : "AI Analyze Applicants"}
//                 </button>

//                 {aiLoading && (
//                   <div className="text-center py-6 text-indigo-600 font-semibold flex justify-center gap-3">
//                     <Loader2 className="animate-spin" size={24} />
//                     AI is analyzing candidates...
//                   </div>
//                 )}

//                 {aiError && (
//                   <div className="bg-red-100 p-4 rounded-xl text-red-800 mb-6">
//                     {aiError}
//                   </div>
//                 )}

//                 {aiResult && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI Candidate Rankings</h3>
//                     {aiResult.map((candidate, i) => {
//                       const realApplication = selectedJob.applications?.find(
//                         (app) => app.userEmail.toLowerCase() === candidate.email?.toLowerCase()
//                       );
//                       const currentStatus = realApplication?.status || "pending";
//                       const isUpdating = !!updatingStatuses[candidate.email];

//                       const handleStatusChange = async (newStatus) => {
//                         if (!newStatus || !candidate.email) return;

//                         setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: true }));

//                         try {
//                           const res = await fetch("/api/jobs/update-application", {
//                             method: "PATCH",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                               jobId: selectedJob._id,
//                               email: candidate.email,
//                               status: newStatus,
//                             }),
//                           });

//                           if (!res.ok) {
//                             const data = await res.json();
//                             throw new Error(data.message || "Failed to update status");
//                           }

//                           // Update local selectedJob
//                           setSelectedJob((prev) => ({
//                             ...prev,
//                             applications: prev.applications.map((app) =>
//                               app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//                                 ? { ...app, status: newStatus }
//                                 : app
//                             ),
//                           }));

//                           // Sync AI result display
//                           setAiResult((prev) =>
//                             prev.map((c) =>
//                               c.email?.toLowerCase() === candidate.email?.toLowerCase()
//                                 ? { ...c, applicationStatus: newStatus }
//                                 : c
//                             )
//                           );

//                           setSuccessMsg(`Status updated to "${getStatusLabel(newStatus)}" for ${candidate.name}`);
//                           setTimeout(() => setSuccessMsg(""), 4000);
//                         } catch (err) {
//                           setErrorMsg(err.message);
//                           setTimeout(() => setErrorMsg(""), 5000);
//                         } finally {
//                           setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: false }));
//                         }
//                       };

//                       return (
//                         <motion.div
//                           key={candidate.email || i}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.1 }}
//                           className="border border-indigo-200 rounded-2xl p-6 shadow-md bg-gradient-to-br from-indigo-50/50 to-purple-50/30"
//                         >
//                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//                             <div>
//                               <h4 className="text-xl font-bold text-indigo-900">#{i + 1} {candidate.name}</h4>
//                               {candidate.email && <p className="text-sm text-gray-600 mt-1">{candidate.email}</p>}
//                             </div>
//                             <span className="px-5 py-2 bg-indigo-600 text-white rounded-full font-bold text-lg">
//                               {candidate.score}/100
//                             </span>
//                           </div>

//                           <div className="grid md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <p className="font-semibold text-indigo-700">Strengths</p>
//                               <p className="text-gray-700 mt-1">{candidate.strengths}</p>
//                             </div>
//                             <div>
//                               <p className="font-semibold text-indigo-700">Areas for Improvement</p>
//                               <p className="text-gray-700 mt-1">{candidate.weaknesses}</p>
//                             </div>
//                           </div>

//                           <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
//                             <div className="flex items-center gap-3">
//                               <span className="px-4 py-2 bg-teal-100 text-teal-900 rounded-full font-medium">
//                                 {candidate.finalVerdict}
//                               </span>

//                               <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
//                                 {getStatusLabel(currentStatus)}
//                               </span>
//                             </div>

//                             <div className="flex gap-3 w-full sm:w-auto">
//                               {candidate.email && (
//                                 <Link
//                                   href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                   target="_blank"
//                                   className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 flex-1 sm:flex-initial justify-center"
//                                 >
//                                   <User className="w-5 h-5" />
//                                   View Profile
//                                 </Link>
//                               )}

//                               <div className="relative">
//                                 <select
//                                   disabled={isUpdating || !candidate.email}
//                                   onChange={(e) => handleStatusChange(e.target.value)}
//                                   value={currentStatus}
//                                   className="appearance-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
//                                 >
//                                   <option className="text-blue-600" value="shortlisted">Shortlisted</option>
//                                   <option className="text-blue-600" value="rejected">Reject</option>
//                                 </select>
//                                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
//                                 {isUpdating && (
//                                   <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-white animate-spin" size={18} />
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
//   Filter,
//   DollarSign,
//   Clock,
//   Award,
//   Mail,
//   Phone,
//   Download,
//   Shield,
//   Zap,
//   TrendingDown,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [showFilters, setShowFilters] = useState(false);

//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   const [updatingStatuses, setUpdatingStatuses] = useState({});

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleViewJob = async (job) => {
//     try {
//       const res = await fetch(`/api/jobs/${job._id}`);
//       if (res.ok) {
//         const freshJob = await res.json();
//         setSelectedJob(freshJob);
//       } else {
//         setSelectedJob(job);
//       }
//     } catch {
//       setSelectedJob(job);
//     }
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       const parsedResult = JSON.parse(data.aiResult);

//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );
//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//           avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.email}`,
//         };
//       });

//       setAiResult(enrichedResult);
//       setSelectedJob(jobData);
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "Shortlisted";
//       case "rejected":
//         return "Rejected";
//       case "pending":
//       default:
//         return "Pending";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
//       case "rejected":
//         return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
//       case "pending":
//       default:
//         return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
//     }
//   };

//   const getJobStatusColor = (status) => {
//     return status === "Open" 
//       ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white" 
//       : "bg-gradient-to-r from-rose-500 to-pink-600 text-white";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
//         {/* HEADER */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }} 
//           animate={{ opacity: 1, y: 0 }}
//           className="space-y-6"
//         >
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Job Management Dashboard
//             </h1>
//             <p className="mt-2 text-lg text-gray-600">Manage jobs and analyze applicants with AI intelligence</p>
//           </div>
//         </motion.div>

//         {/* MESSAGES */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center justify-between shadow-lg"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-emerald-100 rounded-xl">
//                   <CheckCircle size={20} className="text-emerald-600" />
//                 </div>
//                 <span className="font-medium">{successMsg}</span>
//               </div>
//               <button onClick={() => setSuccessMsg("")}>
//                 <X size={20} />
//               </button>
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               className="p-4 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-2xl text-rose-800 flex items-center justify-between shadow-lg"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-rose-100 rounded-xl">
//                   <Shield size={20} className="text-rose-600" />
//                 </div>
//                 <span className="font-medium">{errorMsg}</span>
//               </div>
//               <button onClick={() => setErrorMsg("")}>
//                 <X size={20} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* SEARCH AND FILTERS */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }} 
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }} 
//           className="space-y-4"
//         >
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                 <Search className="text-gray-400" size={20} />
//               </div>
//               <input
//                 placeholder="Search jobs by title, company, skills..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow"
//               />
//             </div>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="px-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-700 font-medium flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
//             >
//               <Filter size={20} />
//               Filters
//               {Object.values(filters).some(Boolean) && (
//                 <span className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-600 text-xs rounded-full">
//                   {Object.values(filters).filter(Boolean).length}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* EXPANDED FILTERS */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg overflow-hidden"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Job Status</label>
//                     <div className="flex flex-wrap gap-2">
//                       {["", "Open", "Closed"].map((status) => (
//                         <button
//                           key={status}
//                           onClick={() => handleFilterChange("status", status)}
//                           className={`px-4 py-2 rounded-xl font-medium transition-all ${filters.status === status
//                             ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
//                             : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                             }`}
//                         >
//                           {status || "All"}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
//                     <div className="flex flex-wrap gap-2">
//                       {["", "Remote", "Onsite", "Hybrid"].map((type) => (
//                         <button
//                           key={type}
//                           onClick={() => handleFilterChange("type", type)}
//                           className={`px-4 py-2 rounded-xl font-medium transition-all ${filters.type === type
//                             ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
//                             : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                             }`}
//                         >
//                           {type || "All"}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* JOB CARDS GRID */}
//         {loadingJobs ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="text-center">
//               <Loader2 className="animate-spin mx-auto text-indigo-500" size={48} />
//               <p className="mt-4 text-gray-600">Loading jobs...</p>
//             </div>
//           </div>
//         ) : (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {filteredAndSortedJobs.map((job, index) => (
//               <motion.div
//                 key={job._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 whileHover={{ y: -8, transition: { duration: 0.2 } }}
//                 className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
//                 onClick={() => handleViewJob(job)}
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
//                           <Briefcase className="text-indigo-600" size={20} />
//                         </div>
//                         <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
//                           {job.title}
//                         </h3>
//                       </div>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Building2 className="text-gray-400" size={16} />
//                         <span className="text-gray-600">{job.company}</span>
//                       </div>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getJobStatusColor(job.status)}`}>
//                       {job.status}
//                     </span>
//                   </div>

//                   <div className="space-y-3 mb-6">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <MapPin className="text-gray-400" size={16} />
//                       <span>{job.location}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <DollarSign className="text-gray-400" size={16} />
//                       <span>{job.salary || "Not specified"}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Clock className="text-gray-400" size={16} />
//                       <span>{job.type}</span>
//                     </div>
//                   </div>

//                   {job.skills?.length > 0 && (
//                     <div className="mb-6">
//                       <p className="text-sm text-gray-500 mb-2">Required Skills</p>
//                       <div className="flex flex-wrap gap-2">
//                         {job.skills.slice(0, 3).map((skill, i) => (
//                           <span 
//                             key={i}
//                             className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                         {job.skills.length > 3 && (
//                           <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm">
//                             +{job.skills.length - 3} more
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                     <div className="flex items-center gap-1 text-gray-500">
//                       <Users size={16} />
//                       <span className="text-sm">
//                         {job.applications?.length || 0} applicants
//                       </span>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleViewJob(job);
//                         }}
//                         className="p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-100 hover:to-purple-100 transition-all"
//                       >
//                         <Eye size={18} />
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDeleteJob(job._id);
//                         }}
//                         className="p-2 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 hover:from-rose-100 hover:to-pink-100 transition-all"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* VIEW MODAL */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.95, opacity: 0, y: 20 }}
//                 className="bg-gradient-to-br from-white to-gray-50 rounded-3xl max-w-6xl w-full p-8 overflow-y-auto max-h-[90vh] shadow-2xl border border-gray-200"
//               >
//                 <div className="flex justify-between items-start mb-8">
//                   <div>
//                     <h2 className="text-3xl font-bold text-gray-900">{selectedJob.title}</h2>
//                     <div className="flex items-center gap-4 mt-2">
//                       <div className="flex items-center gap-2">
//                         <Building2 className="text-gray-400" size={18} />
//                         <span className="text-gray-600">{selectedJob.company}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <MapPin className="text-gray-400" size={18} />
//                         <span className="text-gray-600">{selectedJob.location}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button 
//                     onClick={closeModals}
//                     className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-8">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {[
//                       { icon: DollarSign, label: "Salary", value: selectedJob.salary || "Not specified", color: "text-emerald-600" },
//                       { icon: Layers, label: "Experience", value: `${selectedJob.experience || "N/A"} years`, color: "text-blue-600" },
//                       { icon: Calendar, label: "Start Date", value: selectedJob.startDate || "N/A", color: "text-amber-600" },
//                       { icon: Calendar, label: "End Date", value: selectedJob.endDate || "N/A", color: "text-purple-600" },
//                     ].map((item, i) => (
//                       <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
//                         <div className="flex items-center gap-3">
//                           <div className={`p-2 rounded-xl bg-gray-100`}>
//                             <item.icon className={item.color} size={20} />
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">{item.label}</p>
//                             <p className="text-lg font-semibold text-gray-900">{item.value}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
//                     <p className="text-gray-700 leading-relaxed">{selectedJob.description || "No description provided."}</p>
//                   </div>

//                   <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {selectedJob.skills?.length > 0 ? (
//                         selectedJob.skills.map((skill, i) => (
//                           <span
//                             key={i}
//                             className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl font-medium border border-indigo-100"
//                           >
//                             {skill}
//                           </span>
//                         ))
//                       ) : (
//                         <span className="text-gray-500">No skills listed.</span>
//                       )}
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => runAIAnalysis(selectedJob._id)}
//                     disabled={aiLoading}
//                     className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed group"
//                   >
//                     {aiLoading ? (
//                       <>
//                         <Loader2 className="animate-spin" size={24} />
//                         Analyzing Applicants...
//                       </>
//                     ) : (
//                       <>
//                         <Sparkles className="group-hover:scale-110 transition-transform" />
//                         AI Analyze Applicants
//                         <Zap className="group-hover:scale-110 transition-transform" />
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 {aiLoading && (
//                   <div className="text-center py-12">
//                     <div className="inline-flex flex-col items-center">
//                       <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
//                       <p className="text-xl font-semibold text-gray-900 mb-2">AI Analysis in Progress</p>
//                       <p className="text-gray-600">Our AI is analyzing candidates based on job requirements...</p>
//                     </div>
//                   </div>
//                 )}

//                 {aiError && (
//                   <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 p-6 rounded-2xl text-rose-800 mb-6 shadow-sm">
//                     <div className="flex items-center gap-3">
//                       <Shield size={24} />
//                       <div>
//                         <p className="font-semibold">AI Analysis Failed</p>
//                         <p className="mt-1">{aiError}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {aiResult && (
//                   <div className="space-y-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Candidate Rankings</h3>
//                         <p className="text-gray-600">Top candidates ranked by AI based on job requirements</p>
//                       </div>
//                     </div>

//                     {aiResult.map((candidate, i) => {
//                       const realApplication = selectedJob.applications?.find(
//                         (app) => app.userEmail.toLowerCase() === candidate.email?.toLowerCase()
//                       );
//                       const currentStatus = realApplication?.status || "pending";
//                       const isUpdating = !!updatingStatuses[candidate.email];

//                       const handleStatusChange = async (newStatus) => {
//                         if (!newStatus || !candidate.email) return;

//                         setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: true }));

//                         try {
//                           const res = await fetch("/api/jobs/update-application", {
//                             method: "PATCH",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                               jobId: selectedJob._id,
//                               email: candidate.email,
//                               status: newStatus,
//                             }),
//                           });

//                           if (!res.ok) {
//                             const data = await res.json();
//                             throw new Error(data.message || "Failed to update status");
//                           }

//                           setSelectedJob((prev) => ({
//                             ...prev,
//                             applications: prev.applications.map((app) =>
//                               app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//                                 ? { ...app, status: newStatus }
//                                 : app
//                             ),
//                           }));

//                           setAiResult((prev) =>
//                             prev.map((c) =>
//                               c.email?.toLowerCase() === candidate.email?.toLowerCase()
//                                 ? { ...c, applicationStatus: newStatus }
//                                 : c
//                             )
//                           );

//                           setSuccessMsg(`Status updated to "${getStatusLabel(newStatus)}" for ${candidate.name}`);
//                           setTimeout(() => setSuccessMsg(""), 4000);
//                         } catch (err) {
//                           setErrorMsg(err.message);
//                           setTimeout(() => setErrorMsg(""), 5000);
//                         } finally {
//                           setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: false }));
//                         }
//                       };

//                       return (
//                         <motion.div
//                           key={candidate.email || i}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: i * 0.1 }}
//                           className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
//                         >
//                           <div className="flex flex-col lg:flex-row gap-6">
//                             {/* Left Section - Candidate Info */}
//                             <div className="flex-1">
//                               <div className="flex items-start gap-4 mb-4">
//                                 <div className="relative">
//                                   <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
//                                     <img
//                                       src={candidate.avatar}
//                                       alt={candidate.name}
//                                       className="w-full h-full object-cover"
//                                     />
//                                   </div>
//                                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
//                                     #{i + 1}
//                                   </div>
//                                 </div>
//                                 <div className="flex-1">
//                                   <div className="flex flex-wrap items-center gap-3 mb-2">
//                                     <h4 className="text-xl font-bold text-gray-900">{candidate.name}</h4>
//                                     <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold">
//                                       {candidate.score}/100
//                                     </span>
//                                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
//                                       {getStatusLabel(currentStatus)}
//                                     </span>
//                                   </div>
//                                   <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                                     {candidate.email && (
//                                       <div className="flex items-center gap-2">
//                                         <Mail size={14} />
//                                         <span>{candidate.email}</span>
//                                       </div>
//                                     )}
//                                     <div className="flex items-center gap-2">
//                                       <Award size={14} />
//                                       <span className="font-medium text-green-600">{candidate.finalVerdict}</span>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="grid md:grid-cols-2 gap-4 mb-6">
//                                 <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
//                                   <div className="flex items-center gap-2 mb-2">
//                                     <TrendingUp className="text-blue-600" size={18} />
//                                     <p className="font-semibold text-blue-800">Strengths</p>
//                                   </div>
//                                   <p className="text-gray-700">{candidate.strengths}</p>
//                                 </div>
//                                 <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
//                                   <div className="flex items-center gap-2 mb-2">
//                                     <TrendingDown className="text-amber-600" size={18} />
//                                     <p className="font-semibold text-amber-800">Areas for Improvement</p>
//                                   </div>
//                                   <p className="text-gray-700">{candidate.weaknesses}</p>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Right Section - Actions */}
//                             <div className="lg:w-64 space-y-4">
//                               <div className="space-y-3">
//                                 {candidate.email && (
//                                   <Link
//                                     href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                     target="_blank"
//                                     className="w-full px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 font-medium rounded-xl border border-indigo-200 flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
//                                   >
//                                     <User size={18} />
//                                     View Full Profile
//                                   </Link>
//                                 )}
                                
//                                 <div className="relative">
//                                   <select
//                                     disabled={isUpdating || !candidate.email}
//                                     onChange={(e) => handleStatusChange(e.target.value)}
//                                     value={currentStatus}
//                                     className="w-full appearance-none px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
//                                   >
//                                     <option value="shortlisted">Shortlist Candidate</option>
//                                     <option value="rejected">Reject Candidate</option>
//                                     <option value="pending">Mark as Pending</option>
//                                   </select>
//                                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
//                                   {isUpdating && (
//                                     <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-white animate-spin" size={18} />
//                                   )}
//                                 </div>
                                
                                
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
//   Filter,
//   DollarSign,
//   Clock,
//   Award,
//   Mail,
//   Phone,
//   Download,
//   Shield,
//   Zap,
//   TrendingDown,
//   Star,
//   Target,
//   ChevronRight,
//   MoreVertical,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [showFilters, setShowFilters] = useState(false);
//   const [hoveredJob, setHoveredJob] = useState(null);

//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   const [updatingStatuses, setUpdatingStatuses] = useState({});

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleViewJob = async (job) => {
//     try {
//       const res = await fetch(`/api/jobs/${job._id}`);
//       if (res.ok) {
//         const freshJob = await res.json();
//         setSelectedJob(freshJob);
//       } else {
//         setSelectedJob(job);
//       }
//     } catch {
//       setSelectedJob(job);
//     }
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       const parsedResult = JSON.parse(data.aiResult);

//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );
//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//           avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.email}`,
//         };
//       });

//       setAiResult(enrichedResult);
//       setSelectedJob(jobData);
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 flex items-center justify-center">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-center"
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto"
//         />
//         <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
//       </motion.div>
//     </div>
//   );
  
//   if (!session || session.user.role === "user") return null;

//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "Shortlisted";
//       case "rejected":
//         return "Rejected";
//       case "pending":
//       default:
//         return "Pending";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "bg-gradient-to-r from-emerald-400 to-cyan-400 text-white shadow-emerald-200/50";
//       case "rejected":
//         return "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-rose-200/50";
//       case "pending":
//       default:
//         return "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-amber-200/50";
//     }
//   };

//   const getJobStatusColor = (status) => {
//     return status === "Open" 
//       ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-emerald-300/50" 
//       : "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-rose-300/50";
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1
//     }
//   };

//   const cardHoverVariants = {
//     initial: { scale: 1 },
//     hover: { 
//       scale: 1.02,
//       transition: { type: "spring", stiffness: 300, damping: 20 }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 text-gray-900">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-200/10 rounded-full blur-3xl" />
//         <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-200/10 to-teal-200/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-40 right-1/3 w-60 h-60 bg-gradient-to-br from-amber-200/10 to-orange-200/10 rounded-full blur-3xl" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative">
//         {/* HEADER */}
//         <motion.div 
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="space-y-6"
//         >
//           <div className="relative">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: "100%" }}
//               transition={{ duration: 1, delay: 0.2 }}
//               className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
//             />
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
//               Job Management Dashboard
//             </h1>
//             <p className="mt-4 text-lg text-gray-600 max-w-2xl">
//               Streamline your hiring process with AI-powered candidate analysis and management tools
//             </p>
//           </div>
//         </motion.div>

//         {/* MESSAGES */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="relative overflow-hidden"
//             >
//               <motion.div 
//                 initial={{ scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ duration: 2 }}
//                 className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent origin-left"
//               />
//               <div className="p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm border border-emerald-200 rounded-2xl text-emerald-800 flex items-center justify-between shadow-lg shadow-emerald-100/50">
//                 <div className="flex items-center gap-3">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", delay: 0.1 }}
//                     className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl"
//                   >
//                     <CheckCircle size={20} className="text-emerald-600" />
//                   </motion.div>
//                   <span className="font-medium">{successMsg}</span>
//                 </div>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setSuccessMsg("")}
//                   className="p-1 hover:bg-emerald-100 rounded-lg transition-colors"
//                 >
//                   <X size={20} />
//                 </motion.button>
//               </div>
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="p-4 bg-gradient-to-r from-rose-50/80 to-red-50/80 backdrop-blur-sm border border-rose-200 rounded-2xl text-rose-800 flex items-center justify-between shadow-lg shadow-rose-100/50"
//             >
//               <div className="flex items-center gap-3">
//                 <motion.div
//                   initial={{ rotate: -180 }}
//                   animate={{ rotate: 0 }}
//                   className="p-2 bg-gradient-to-br from-rose-100 to-rose-50 rounded-xl"
//                 >
//                   <Shield size={20} className="text-rose-600" />
//                 </motion.div>
//                 <span className="font-medium">{errorMsg}</span>
//               </div>
//               <motion.button 
//                 whileHover={{ rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setErrorMsg("")}
//                 className="p-1 hover:bg-rose-100 rounded-lg transition-colors"
//               >
//                 <X size={20} />
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* SEARCH AND FILTERS */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="space-y-4"
//         >
//           <div className="flex flex-col md:flex-row gap-4">
//             <motion.div 
//               whileHover={{ scale: 1.005 }}
//               className="flex-1 relative group"
//             >
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300"
//                 animate={{ opacity: [0.3, 0.5, 0.3] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//               <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                 <Search className="text-gray-400 group-hover:text-indigo-500 transition-colors" size={20} />
//               </div>
//               <input
//                 placeholder="Search jobs by title, company, skills..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300 relative z-10"
//               />
//             </motion.div>
//             <motion.button
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowFilters(!showFilters)}
//               className="px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl text-gray-700 font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
//             >
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0"
//                 animate={{ x: ["-100%", "100%"] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               />
//               <Filter size={20} className="relative z-10" />
//               <span className="relative z-10">Filters</span>
//               {Object.values(filters).some(Boolean) && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="ml-1 px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs rounded-full relative z-10"
//                 >
//                   {Object.values(filters).filter(Boolean).length}
//                 </motion.span>
//               )}
//             </motion.button>
//           </div>

//           {/* EXPANDED FILTERS */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0, y: -20 }}
//                 animate={{ opacity: 1, height: "auto", y: 0 }}
//                 exit={{ opacity: 0, height: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 shadow-lg overflow-hidden"
//               >
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                   className="grid grid-cols-1 md:grid-cols-2 gap-6"
//                 >
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Job Status</label>
//                     <div className="flex flex-wrap gap-2">
//                       {["", "Open", "Closed"].map((status) => (
//                         <motion.button
//                           key={status}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => handleFilterChange("status", status)}
//                           className={`px-4 py-2 rounded-xl font-medium transition-all relative overflow-hidden ${filters.status === status
//                             ? "text-white"
//                             : "text-gray-600 hover:text-gray-900"
//                             }`}
//                         >
//                           {filters.status === status && (
//                             <motion.div
//                               layoutId="statusBg"
//                               className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500"
//                               initial={false}
//                             />
//                           )}
//                           <span className="relative z-10">
//                             {status || "All"}
//                           </span>
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
//                     <div className="flex flex-wrap gap-2">
//                       {["", "Remote", "Onsite", "Hybrid"].map((type) => (
//                         <motion.button
//                           key={type}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => handleFilterChange("type", type)}
//                           className={`px-4 py-2 rounded-xl font-medium transition-all relative overflow-hidden ${filters.type === type
//                             ? "text-white"
//                             : "text-gray-600 hover:text-gray-900"
//                             }`}
//                         >
//                           {filters.type === type && (
//                             <motion.div
//                               layoutId="typeBg"
//                               className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"
//                               initial={false}
//                             />
//                           )}
//                           <span className="relative z-10">
//                             {type || "All"}
//                           </span>
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* JOB CARDS GRID */}
//         {loadingJobs ? (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex justify-center items-center py-20"
//           >
//             <div className="text-center">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                 className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full mx-auto"
//               />
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="mt-4 text-gray-600"
//               >
//                 Loading jobs...
//               </motion.p>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {filteredAndSortedJobs.map((job, index) => (
//               <motion.div
//                 key={job._id}
//                 variants={itemVariants}
//                 custom={index}
//                 whileHover="hover"
//                 initial="initial"
//                 animate="initial"
//                 onMouseEnter={() => setHoveredJob(job._id)}
//                 onMouseLeave={() => setHoveredJob(null)}
//                 className="relative group"
//               >
//                 {/* Glow effect */}
//                 <motion.div
//                   className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"
//                   animate={{
//                     scale: hoveredJob === job._id ? [1, 1.02, 1] : 1
//                   }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 />
                
//                 <motion.div
//                   variants={cardHoverVariants}
//                   className="relative bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl border border-gray-200/80 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
//                   onClick={() => handleViewJob(job)}
//                 >
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <motion.div
//                             whileHover={{ rotate: 360 }}
//                             transition={{ duration: 0.6 }}
//                             className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl"
//                           >
//                             <Briefcase className="text-indigo-600" size={20} />
//                           </motion.div>
//                           <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
//                             {job.title}
//                           </h3>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Building2 className="text-gray-400" size={16} />
//                           <span className="text-gray-600">{job.company}</span>
//                         </div>
//                       </div>
//                       <motion.span 
//                         whileHover={{ scale: 1.1 }}
//                         className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getJobStatusColor(job.status)}`}
//                       >
//                         {job.status}
//                       </motion.span>
//                     </div>

//                     <div className="space-y-3 mb-6">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <MapPin className="text-gray-400" size={16} />
//                         <span>{job.location}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <DollarSign className="text-gray-400" size={16} />
//                         <span>{job.salary || "Not specified"}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Clock className="text-gray-400" size={16} />
//                         <span>{job.type}</span>
//                       </div>
//                     </div>

//                     {job.skills?.length > 0 && (
//                       <div className="mb-6">
//                         <p className="text-sm text-gray-500 mb-2">Required Skills</p>
//                         <div className="flex flex-wrap gap-2">
//                           {job.skills.slice(0, 3).map((skill, i) => (
//                             <motion.span 
//                               key={i}
//                               whileHover={{ scale: 1.05, y: -2 }}
//                               className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
//                             >
//                               {skill}
//                             </motion.span>
//                           ))}
//                           {job.skills.length > 3 && (
//                             <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm">
//                               +{job.skills.length - 3} more
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                       <div className="flex items-center gap-1 text-gray-500">
//                         <Users size={16} />
//                         <span className="text-sm">
//                           {job.applications?.length || 0} applicants
//                         </span>
//                       </div>
//                       <motion.div 
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.2 }}
//                         className="flex gap-2"
//                       >
//                         <motion.button
//                           whileHover={{ scale: 1.1, rotate: 5 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleViewJob(job);
//                           }}
//                           className="p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300"
//                         >
//                           <Eye size={18} />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1, rotate: -5 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteJob(job._id);
//                           }}
//                           className="p-2 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 hover:from-rose-100 hover:to-pink-100 transition-all duration-300"
//                         >
//                           <Trash2 size={18} />
//                         </motion.button>
//                       </motion.div>
//                     </div>
//                   </div>
                  
//                   {/* Slide-in indicator */}
//                   <motion.div
//                     className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     initial={{ scaleY: 0 }}
//                     whileHover={{ scaleY: 1 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </motion.div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* VIEW MODAL */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 50 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                 className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-lg rounded-3xl max-w-6xl w-full p-8 overflow-y-auto max-h-[90vh] shadow-2xl shadow-black/20 border border-white/20"
//               >
//                 {/* Close button */}
//                 <motion.button 
//                   whileHover={{ rotate: 90, scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={closeModals}
//                   className="absolute top-6 right-6 p-2 rounded-xl bg-white/50 hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-300 z-10"
//                 >
//                   <X size={20} />
//                 </motion.button>

//                 <div className="space-y-8">
//                   {/* Header */}
//                   <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="pr-12"
//                   >
//                     <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                       {selectedJob.title}
//                     </h2>
//                     <div className="flex items-center gap-4 mt-2">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Building2 className="text-gray-400" size={18} />
//                         <span>{selectedJob.company}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <MapPin className="text-gray-400" size={18} />
//                         <span>{selectedJob.location}</span>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Stats Grid */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
//                   >
//                     {[
//                       { icon: DollarSign, label: "Salary", value: selectedJob.salary || "Not specified", gradient: "from-emerald-400 to-cyan-400" },
//                       { icon: Layers, label: "Experience", value: `${selectedJob.experience || "N/A"} years`, gradient: "from-blue-400 to-indigo-400" },
//                       { icon: Calendar, label: "Start Date", value: selectedJob.startDate || "N/A", gradient: "from-amber-400 to-orange-400" },
//                       { icon: Calendar, label: "End Date", value: selectedJob.endDate || "N/A", gradient: "from-purple-400 to-pink-400" },
//                     ].map((item, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.1 * i }}
//                         whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                         className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 shadow-lg"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient}`}>
//                             <item.icon className="text-white" size={20} />
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">{item.label}</p>
//                             <p className="text-lg font-semibold text-gray-900">{item.value}</p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </motion.div>

//                   {/* Description */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg"
//                   >
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
//                     <p className="text-gray-700 leading-relaxed">{selectedJob.description || "No description provided."}</p>
//                   </motion.div>

//                   {/* Skills */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg"
//                   >
//                     <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
//                     <div className="flex flex-wrap gap-3">
//                       {selectedJob.skills?.length > 0 ? (
//                         selectedJob.skills.map((skill, i) => (
//                           <motion.span
//                             key={i}
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ delay: 0.05 * i }}
//                             whileHover={{ scale: 1.1, y: -3 }}
//                             className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl font-medium border border-indigo-100 shadow-sm"
//                           >
//                             {skill}
//                           </motion.span>
//                         ))
//                       ) : (
//                         <span className="text-gray-500">No skills listed.</span>
//                       )}
//                     </div>
//                   </motion.div>

//                   {/* AI Analysis Button */}
//                   <motion.button
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     whileHover={{ 
//                       scale: 1.02,
//                       boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
//                     }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => runAIAnalysis(selectedJob._id)}
//                     disabled={aiLoading}
//                     className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:cursor-not-allowed group relative overflow-hidden"
//                   >
//                     {/* Animated background */}
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
//                       animate={{ x: ["-100%", "100%"] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     />
//                     <div className="relative z-10 flex items-center gap-3">
//                       {aiLoading ? (
//                         <>
//                           <Loader2 className="animate-spin" size={24} />
//                           Analyzing Applicants...
//                         </>
//                       ) : (
//                         <>
//                           <Sparkles className="group-hover:animate-pulse" />
//                           AI Analyze Applicants
//                           <Zap className="group-hover:animate-bounce" />
//                         </>
//                       )}
//                     </div>
//                   </motion.button>
//                 </div>

//                 {/* AI Loading State */}
//                 <AnimatePresence>
//                   {aiLoading && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       className="text-center py-12"
//                     >
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                         className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full mx-auto"
//                       />
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                         className="mt-4 text-xl font-semibold text-gray-900 mb-2"
//                       >
//                         AI Analysis in Progress
//                       </motion.p>
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                         className="text-gray-600"
//                       >
//                         Our AI is analyzing candidates based on job requirements...
//                       </motion.p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* AI Error */}
//                 <AnimatePresence>
//                   {aiError && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       className="bg-gradient-to-r from-rose-50/80 to-red-50/80 backdrop-blur-sm border border-rose-200/80 p-6 rounded-2xl text-rose-800 shadow-lg"
//                     >
//                       <div className="flex items-center gap-3">
//                         <motion.div
//                           animate={{ x: [0, 10, 0] }}
//                           transition={{ duration: 0.5, repeat: 3 }}
//                           className="p-2 bg-rose-100 rounded-xl"
//                         >
//                           <Shield size={24} />
//                         </motion.div>
//                         <div>
//                           <p className="font-semibold">AI Analysis Failed</p>
//                           <p className="mt-1">{aiError}</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* AI Results */}
//                 <AnimatePresence>
//                   {aiResult && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                       className="space-y-6 mt-8"
//                     >
//                       <motion.div
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="flex items-center justify-between"
//                       >
//                         <div>
//                           <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Candidate Rankings</h3>
//                           <p className="text-gray-600">Top candidates ranked by AI based on job requirements</p>
//                         </div>
//                         <motion.div
//                           animate={{ rotate: [0, 360] }}
//                           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                           className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl"
//                         >
//                           <Target className="text-indigo-600" size={24} />
//                         </motion.div>
//                       </motion.div>

//                       {aiResult.map((candidate, i) => {
//                         const realApplication = selectedJob.applications?.find(
//                           (app) => app.userEmail.toLowerCase() === candidate.email?.toLowerCase()
//                         );
//                         const currentStatus = realApplication?.status || "pending";
//                         const isUpdating = !!updatingStatuses[candidate.email];

//                         const handleStatusChange = async (newStatus) => {
//                           if (!newStatus || !candidate.email) return;

//                           setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: true }));

//                           try {
//                             const res = await fetch("/api/jobs/update-application", {
//                               method: "PATCH",
//                               headers: { "Content-Type": "application/json" },
//                               body: JSON.stringify({
//                                 jobId: selectedJob._id,
//                                 email: candidate.email,
//                                 status: newStatus,
//                               }),
//                             });

//                             if (!res.ok) {
//                               const data = await res.json();
//                               throw new Error(data.message || "Failed to update status");
//                             }

//                             setSelectedJob((prev) => ({
//                               ...prev,
//                               applications: prev.applications.map((app) =>
//                                 app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//                                   ? { ...app, status: newStatus }
//                                   : app
//                               ),
//                             }));

//                             setAiResult((prev) =>
//                               prev.map((c) =>
//                                 c.email?.toLowerCase() === candidate.email?.toLowerCase()
//                                   ? { ...c, applicationStatus: newStatus }
//                                   : c
//                               )
//                             );

//                             setSuccessMsg(`Status updated to "${getStatusLabel(newStatus)}" for ${candidate.name}`);
//                             setTimeout(() => setSuccessMsg(""), 4000);
//                           } catch (err) {
//                             setErrorMsg(err.message);
//                             setTimeout(() => setErrorMsg(""), 5000);
//                           } finally {
//                             setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: false }));
//                           }
//                         };

//                         return (
//                           <motion.div
//                             key={candidate.email || i}
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: i * 0.1 }}
//                             whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                             className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
//                           >
//                             <div className="flex flex-col lg:flex-row gap-6">
//                               {/* Left Section */}
//                               <div className="flex-1">
//                                 <div className="flex items-start gap-4 mb-4">
//                                   <div className="relative">
//                                     <motion.div
//                                       whileHover={{ scale: 1.1, rotate: 5 }}
//                                       className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg"
//                                     >
//                                       <img
//                                         src={candidate.avatar}
//                                         alt={candidate.name}
//                                         className="w-full h-full object-cover"
//                                       />
//                                     </motion.div>
//                                     <motion.div
//                                       initial={{ scale: 0 }}
//                                       animate={{ scale: 1 }}
//                                       className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
//                                     >
//                                       #{i + 1}
//                                     </motion.div>
//                                   </div>
//                                   <div className="flex-1">
//                                     <div className="flex flex-wrap items-center gap-3 mb-2">
//                                       <h4 className="text-xl font-bold text-gray-900">{candidate.name}</h4>
//                                       <motion.span
//                                         whileHover={{ scale: 1.1 }}
//                                         className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-sm font-bold shadow-md"
//                                       >
//                                         {candidate.score}/100
//                                       </motion.span>
//                                       <motion.span
//                                         whileHover={{ scale: 1.05 }}
//                                         className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}
//                                       >
//                                         {getStatusLabel(currentStatus)}
//                                       </motion.span>
//                                     </div>
//                                     <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                                       {candidate.email && (
//                                         <div className="flex items-center gap-2">
//                                           <Mail size={14} />
//                                           <span>{candidate.email}</span>
//                                         </div>
//                                       )}
//                                       <motion.div
//                                         whileHover={{ scale: 1.05 }}
//                                         className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg"
//                                       >
//                                         <Award size={14} className="text-green-600" />
//                                         <span className="font-medium text-green-700">{candidate.finalVerdict}</span>
//                                       </motion.div>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div className="grid md:grid-cols-2 gap-4 mb-6">
//                                   <motion.div
//                                     whileHover={{ scale: 1.02 }}
//                                     className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100"
//                                   >
//                                     <div className="flex items-center gap-2 mb-2">
//                                       <TrendingUp className="text-blue-600" size={18} />
//                                       <p className="font-semibold text-blue-800">Strengths</p>
//                                     </div>
//                                     <p className="text-gray-700">{candidate.strengths}</p>
//                                   </motion.div>
//                                   <motion.div
//                                     whileHover={{ scale: 1.02 }}
//                                     className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-xl p-4 border border-amber-100"
//                                   >
//                                     <div className="flex items-center gap-2 mb-2">
//                                       <TrendingDown className="text-amber-600" size={18} />
//                                       <p className="font-semibold text-amber-800">Areas for Improvement</p>
//                                     </div>
//                                     <p className="text-gray-700">{candidate.weaknesses}</p>
//                                   </motion.div>
//                                 </div>
//                               </div>

//                               {/* Right Section - Actions */}
//                               <div className="lg:w-64 space-y-4">
//                                 <div className="space-y-3">
//                                   {candidate.email && (
//                                     <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                                       <Link
//                                         href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                         target="_blank"
//                                         className="w-full px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 font-medium rounded-xl border border-indigo-200 flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow"
//                                       >
//                                         <User size={18} />
//                                         View Profile
//                                         <ChevronRight size={16} />
//                                       </Link>
//                                     </motion.div>
//                                   )}
                                  
//                                   <div className="relative">
//                                     <motion.select
//                                       whileHover={{ scale: 1.02 }}
//                                       disabled={isUpdating || !candidate.email}
//                                       onChange={(e) => handleStatusChange(e.target.value)}
//                                       value={currentStatus}
//                                       className="w-full appearance-none px-4 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none"
//                                     >
//                                       <option className="text-blue-600" value="shortlisted">Shortlist Candidate</option>
//                                       <option className="text-blue-600" value="rejected">Reject Candidate</option>
//                                       <option className="text-blue-600" value="pending">Mark as Pending</option>
//                                     </motion.select>
//                                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
//                                     {isUpdating && (
//                                       <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-white animate-spin" size={18} />
//                                     )}
//                                   </div>
                                  
                                  
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         );
//                       })}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
//   Filter,
//   Clock,
//   Award,
//   Mail,
//   Download,
//   Shield,
//   Zap,
//   TrendingDown,
//   Target,
//   ChevronRight,
//   ExternalLink,
//   CheckSquare,
//   AlertCircle,
//   BarChart3,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({ status: "", type: "" });
//   const [sortBy, setSortBy] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [showFilters, setShowFilters] = useState(false);
//   const [hoveredJob, setHoveredJob] = useState(null);

//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   const [updatingStatuses, setUpdatingStatuses] = useState({});
//   const [viewMode, setViewMode] = useState("grid");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleViewJob = async (job) => {
//     try {
//       const res = await fetch(`/api/jobs/${job._id}`);
//       if (res.ok) {
//         const freshJob = await res.json();
//         setSelectedJob(freshJob);
//       } else {
//         setSelectedJob(job);
//       }
//     } catch {
//       setSelectedJob(job);
//     }
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       const parsedResult = JSON.parse(data.aiResult);

//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );
//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//           avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.email}`,
//           matchPercentage: Math.floor(Math.random() * 20) + 80,
//         };
//       });

//       setAiResult(enrichedResult);
//       setSelectedJob(jobData);
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       return matchesSearch && matchesStatus && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   if (status === "loading") return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-center"
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
//         />
//         <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
//       </motion.div>
//     </div>
//   );
  
//   if (!session || session.user.role === "user") return null;

//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "Shortlisted";
//       case "rejected":
//         return "Rejected";
//       case "pending":
//       default:
//         return "Pending";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
//       case "rejected":
//         return "bg-gradient-to-r from-rose-500 to-pink-500 text-white";
//       case "pending":
//       default:
//         return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
//     }
//   };

//   const getJobStatusColor = (status) => {
//     return status === "Open" 
//       ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white" 
//       : "bg-gradient-to-r from-rose-500 to-pink-600 text-white";
//   };

//   // Keep the original salary format, just change the symbol
//   const formatSalary = (salary) => {
//     if (!salary) return "Not specified";
//     if (typeof salary === "string" && (salary.includes("PKR") || salary.includes("$"))) {
//       // Replace $ with PKR if present
//       return salary.replace("$", "PKR");
//     }
//     return `PKR ${salary}`;
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1
//     }
//   };

//   const cardHoverVariants = {
//     initial: { scale: 1 },
//     hover: { 
//       scale: 1.02,
//       transition: { type: "spring", stiffness: 300, damping: 20 }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-gray-900">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-200/10 rounded-full blur-3xl" />
//         <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-200/10 to-teal-200/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-40 right-1/3 w-60 h-60 bg-gradient-to-br from-amber-200/10 to-orange-200/10 rounded-full blur-3xl" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative">
//         {/* HEADER WITH STATS */}
//         <motion.div 
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="space-y-6"
//         >
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//             <div className="space-y-3">
//               <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
//                 Job Management Dashboard
//               </h1>
//               <p className="text-lg text-gray-600 max-w-2xl">
//                 Manage job postings, analyze applicants, and streamline your hiring process
//               </p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <Briefcase size={20} />
//               Post New Job
//             </motion.button>
//           </div>

//           {/* STATS CARDS */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-4 gap-4"
//           >
//             {[
//               { icon: Briefcase, label: "Active Jobs", value: jobs.filter(j => j.status === "Open").length, color: "from-blue-500 to-cyan-500" },
//               { icon: Users, label: "Total Applicants", value: jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0), color: "from-emerald-500 to-teal-500" },
//               { icon: CheckCircle, label: "Shortlisted", value: jobs.reduce((acc, job) => acc + (job.applications?.filter(a => a.status === "shortlisted").length || 0), 0), color: "from-violet-500 to-purple-500" },
//               { icon: TrendingUp, label: "Avg. Match Rate", value: "87%", color: "from-amber-500 to-orange-500" },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * i }}
//                 whileHover={{ y: -5 }}
//                 className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
//                     <stat.icon className="text-white" size={24} />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">{stat.label}</p>
//                     <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* MESSAGES */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="relative overflow-hidden"
//             >
//               <motion.div 
//                 initial={{ scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ duration: 2 }}
//                 className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent origin-left"
//               />
//               <div className="p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm border border-emerald-200 rounded-2xl text-emerald-800 flex items-center justify-between shadow-lg shadow-emerald-100/50">
//                 <div className="flex items-center gap-3">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", delay: 0.1 }}
//                     className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl"
//                   >
//                     <CheckCircle size={20} className="text-emerald-600" />
//                   </motion.div>
//                   <span className="font-medium">{successMsg}</span>
//                 </div>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setSuccessMsg("")}
//                   className="p-1 hover:bg-emerald-100 rounded-lg transition-colors"
//                 >
//                   <X size={20} />
//                 </motion.button>
//               </div>
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="p-4 bg-gradient-to-r from-rose-50/80 to-red-50/80 backdrop-blur-sm border border-rose-200 rounded-2xl text-rose-800 flex items-center justify-between shadow-lg shadow-rose-100/50"
//             >
//               <div className="flex items-center gap-3">
//                 <motion.div
//                   initial={{ rotate: -180 }}
//                   animate={{ rotate: 0 }}
//                   className="p-2 bg-gradient-to-br from-rose-100 to-rose-50 rounded-xl"
//                 >
//                   <AlertCircle size={20} className="text-rose-600" />
//                 </motion.div>
//                 <span className="font-medium">{errorMsg}</span>
//               </div>
//               <motion.button 
//                 whileHover={{ rotate: 90 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setErrorMsg("")}
//                 className="p-1 hover:bg-rose-100 rounded-lg transition-colors"
//               >
//                 <X size={20} />
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* SEARCH AND FILTERS BAR */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-4 shadow-lg"
//         >
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//             <div className="flex-1 w-full">
//               <div className="relative group">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                   <Search className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
//                 </div>
//                 <input
//                   placeholder="Search jobs by title, company, skills, location..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow transition-all duration-300"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//                 {["grid", "list"].map((mode) => (
//                   <motion.button
//                     key={mode}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setViewMode(mode)}
//                     className={`px-3 py-1.5 rounded-md transition-all ${viewMode === mode ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
//                   >
//                     {mode === "grid" ? (
//                       <div className="flex items-center gap-2">
//                         <div className="grid grid-cols-2 gap-0.5">
//                           {[...Array(4)].map((_, i) => (
//                             <div key={i} className="w-2 h-2 bg-current rounded-sm" />
//                           ))}
//                         </div>
//                         <span className="text-sm">Grid</span>
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <div className="space-y-1">
//                           <div className="w-4 h-1 bg-current rounded-full" />
//                           <div className="w-4 h-1 bg-current rounded-full" />
//                           <div className="w-4 h-1 bg-current rounded-full" />
//                         </div>
//                         <span className="text-sm">List</span>
//                       </div>
//                     )}
//                   </motion.button>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300 group"
//               >
//                 <Filter size={18} />
//                 <span>Filters</span>
//                 {Object.values(filters).some(Boolean) && (
//                   <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-full">
//                     {Object.values(filters).filter(Boolean).length}
//                   </span>
//                 )}
//               </motion.button>
//             </div>
//           </div>

//           {/* EXPANDED FILTERS */}
//           <AnimatePresence>
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0, y: -20 }}
//                 animate={{ opacity: 1, height: "auto", y: 0 }}
//                 exit={{ opacity: 0, height: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="mt-4 pt-4 border-t border-gray-200"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Job Status</label>
//                     <div className="flex flex-wrap gap-2">
//                       {["", "Open", "Closed", "Draft"].map((status) => (
//                         <motion.button
//                           key={status}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => handleFilterChange("status", status)}
//                           className={`px-4 py-2 rounded-lg font-medium transition-all ${filters.status === status
//                             ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                             }`}
//                         >
//                           {status || "All Status"}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
//                     <div className="flex flex-wrap gap-2">
//                       {["", "Remote", "On-site", "Hybrid", "Contract", "Internship"].map((type) => (
//                         <motion.button
//                           key={type}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => handleFilterChange("type", type)}
//                           className={`px-4 py-2 rounded-lg font-medium transition-all ${filters.type === type
//                             ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                             }`}
//                         >
//                           {type || "All Types"}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
//                     <div className="flex gap-2">
//                       {["title", "applications", "date"].map((field) => (
//                         <motion.button
//                           key={field}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => toggleSort(field)}
//                           className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1 ${sortBy === field
//                             ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                             }`}
//                         >
//                           {field.charAt(0).toUpperCase() + field.slice(1)}
//                           {sortBy === field && (
//                             <ChevronDown className={`transform transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} size={16} />
//                           )}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* JOB CARDS GRID */}
//         {loadingJobs ? (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex justify-center items-center py-20"
//           >
//             <div className="text-center">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                 className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto"
//               />
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//                 className="mt-4 text-gray-600"
//               >
//                 Loading jobs...
//               </motion.p>
//             </div>
//           </motion.div>
//         ) : filteredAndSortedJobs.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-20"
//           >
//             <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
//               <Briefcase className="text-gray-400" size={40} />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
//             <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilters({ status: "", type: "" });
//               }}
//               className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//             >
//               Clear Filters
//             </motion.button>
//           </motion.div>
//         ) : viewMode === "grid" ? (
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {filteredAndSortedJobs.map((job, index) => (
//               <motion.div
//                 key={job._id}
//                 variants={itemVariants}
//                 custom={index}
//                 whileHover="hover"
//                 initial="initial"
//                 animate="initial"
//                 onMouseEnter={() => setHoveredJob(job._id)}
//                 onMouseLeave={() => setHoveredJob(null)}
//                 className="relative group"
//               >
//                 <motion.div
//                   variants={cardHoverVariants}
//                   className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
//                   onClick={() => handleViewJob(job)}
//                 >
//                   {/* Status Badge */}
//                   <div className="absolute top-4 right-4 z-10">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobStatusColor(job.status)} shadow-lg`}>
//                       {job.status}
//                     </span>
//                   </div>

//                   {/* Header with Gradient */}
//                   <div className="relative h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

//                   <div className="p-6">
//                     {/* Job Title and Company */}
//                     <div className="mb-4">
//                       <div className="flex items-center gap-3 mb-2">
//                         <div className="p-2 bg-blue-50 rounded-lg">
//                           <Briefcase className="text-blue-600" size={20} />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
//                             {job.title}
//                           </h3>
//                           <div className="flex items-center gap-2 text-gray-600 mt-1">
//                             <Building2 size={16} />
//                             <span className="text-sm">{job.company}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Job Details */}
//                     <div className="space-y-3 mb-6">
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <MapPin size={16} className="text-gray-400" />
//                           <span className="text-sm">{job.location}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <Clock size={16} className="text-gray-400" />
//                           <span className="text-sm">{job.type}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded">
//                             PKR
//                           </span>
//                           <span className="text-sm font-medium">{formatSalary(job.salary)}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Skills */}
//                     {job.skills?.length > 0 && (
//                       <div className="mb-6">
//                         <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Required Skills</p>
//                         <div className="flex flex-wrap gap-2">
//                           {job.skills.slice(0, 3).map((skill, i) => (
//                             <motion.span 
//                               key={i}
//                               whileHover={{ scale: 1.05, y: -2 }}
//                               className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
//                             >
//                               {skill}
//                             </motion.span>
//                           ))}
//                           {job.skills.length > 3 && (
//                             <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs">
//                               +{job.skills.length - 3} more
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* Footer */}
//                     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-1 text-gray-500">
//                           <Users size={16} />
//                           <span className="text-sm font-medium">
//                             {job.applications?.length || 0} applicants
//                           </span>
//                         </div>
//                         {job.postedDate && (
//                           <div className="text-xs text-gray-400">
//                             Posted {new Date(job.postedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
//                           </div>
//                         )}
//                       </div>
//                       <motion.div 
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.2 }}
//                         className="flex gap-2"
//                       >
//                         <motion.button
//                           whileHover={{ scale: 1.1, rotate: 5 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleViewJob(job);
//                           }}
//                           className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
//                           title="View Details"
//                         >
//                           <Eye size={18} />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1, rotate: -5 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteJob(job._id);
//                           }}
//                           className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
//                           title="Delete Job"
//                         >
//                           <Trash2 size={18} />
//                         </motion.button>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : (
//           /* LIST VIEW */
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="space-y-4"
//           >
//             {filteredAndSortedJobs.map((job, index) => (
//               <motion.div
//                 key={job._id}
//                 variants={itemVariants}
//                 custom={index}
//                 whileHover={{ scale: 1.005 }}
//                 onClick={() => handleViewJob(job)}
//                 className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-center gap-6">
//                   {/* Left Column */}
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <div className="flex items-center gap-3 mb-2">
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobStatusColor(job.status)}`}>
//                             {job.status}
//                           </span>
//                           <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
//                             {job.type}
//                           </span>
//                         </div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
//                         <div className="flex items-center gap-4 text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <Building2 size={16} />
//                             <span>{job.company}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <MapPin size={16} />
//                             <span>{job.location}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Skills and Details */}
//                     <div className="flex flex-wrap gap-4">
//                       {job.skills?.slice(0, 4).map((skill, i) => (
//                         <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Right Column */}
//                   <div className="lg:w-64 space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="text-center p-3 bg-gray-50 rounded-xl">
//                         <div className="text-2xl font-bold text-gray-900">{job.applications?.length || 0}</div>
//                         <div className="text-xs text-gray-500">Applicants</div>
//                       </div>
//                       <div className="text-center p-3 bg-gray-50 rounded-xl">
//                         <div className="text-2xl font-bold text-gray-900">{formatSalary(job.salary)}</div>
//                         <div className="text-xs text-gray-500">Salary</div>
//                       </div>
//                     </div>
//                     <div className="flex gap-2">
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleViewJob(job);
//                         }}
//                         className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                       >
//                         View
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDeleteJob(job._id);
//                         }}
//                         className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg font-medium hover:bg-rose-100 transition-colors"
//                       >
//                         <Trash2 size={18} />
//                       </motion.button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* VIEW MODAL */}
//         <AnimatePresence>
//           {selectedJob && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeModals}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 50 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                 onClick={(e) => e.stopPropagation()}
//                 className="bg-white rounded-3xl max-w-6xl w-full p-8 overflow-y-auto max-h-[90vh] shadow-2xl"
//               >
//                 {/* Close button */}
//                 <motion.button 
//                   whileHover={{ rotate: 90, scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={closeModals}
//                   className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-300 z-10"
//                 >
//                   <X size={20} />
//                 </motion.button>

//                 <div className="space-y-8">
//                   {/* Header */}
//                   <div className="pr-12">
//                     <div className="flex items-center gap-3 mb-4">
//                       <span className={`px-4 py-1.5 rounded-full font-medium ${getJobStatusColor(selectedJob.status)}`}>
//                         {selectedJob.status}
//                       </span>
//                       <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full font-medium">
//                         {selectedJob.type}
//                       </span>
//                     </div>
//                     <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
//                     <div className="flex items-center gap-6 text-gray-600">
//                       <div className="flex items-center gap-2">
//                         <Building2 size={20} />
//                         <span className="font-medium">{selectedJob.company}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <MapPin size={20} />
//                         <span>{selectedJob.location}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stats Grid */}
//                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                     {[
//                       { icon: "PKR", label: "Salary", value: formatSalary(selectedJob.salary), color: "bg-gradient-to-br from-emerald-500 to-teal-500" },
//                       { icon: Users, label: "Applicants", value: selectedJob.applications?.length || 0, color: "bg-gradient-to-br from-blue-500 to-indigo-500" },
//                       { icon: Layers, label: "Experience", value: selectedJob.experience ? `${selectedJob.experience} years` : "N/A", color: "bg-gradient-to-br from-amber-500 to-orange-500" },
//                     ].map((item, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.1 * i }}
//                         whileHover={{ y: -5 }}
//                         className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className={`p-3 rounded-xl ${item.color} flex items-center justify-center min-w-[48px]`}>
//                             {typeof item.icon === 'string' ? (
//                               <span className="text-white font-bold">{item.icon}</span>
//                             ) : (
//                               <item.icon className="text-white" size={20} />
//                             )}
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">{item.label}</p>
//                             <p className="text-lg font-bold text-gray-900">{item.value}</p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Description and Skills Side by Side */}
//                   <div className="grid lg:grid-cols-2 gap-6">
//                     {/* Description */}
//                     <div className="bg-gray-50 rounded-2xl p-6">
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
//                       <div className="prose max-w-none text-gray-700">
//                         <p className="whitespace-pre-line leading-relaxed">
//                           {selectedJob.description || "No description provided."}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Skills and Requirements */}
//                     <div className="space-y-6">
//                       <div className="bg-gray-50 rounded-2xl p-6">
//                         <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
//                         <div className="flex flex-wrap gap-2">
//                           {selectedJob.skills?.length > 0 ? (
//                             selectedJob.skills.map((skill, i) => (
//                               <span
//                                 key={i}
//                                 className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium"
//                               >
//                                 {skill}
//                               </span>
//                             ))
//                           ) : (
//                             <span className="text-gray-500">No skills listed.</span>
//                           )}
//                         </div>
//                       </div>

//                       <div className="bg-gray-50 rounded-2xl p-6">
//                         <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
//                         <ul className="space-y-2">
//                           <li className="flex items-center gap-2 text-gray-700">
//                             <CheckSquare className="text-emerald-500" size={18} />
//                             <span>{selectedJob.experience || "0"}+ years of experience</span>
//                           </li>
//                           <li className="flex items-center gap-2 text-gray-700">
//                             <CheckSquare className="text-emerald-500" size={18} />
//                             <span>{selectedJob.type || "Full-time"} position</span>
//                           </li>
//                           <li className="flex items-center gap-2 text-gray-700">
//                             <CheckSquare className="text-emerald-500" size={18} />
//                             <span>Immediate joining preferred</span>
//                           </li>
//                           {selectedJob.education && (
//                             <li className="flex items-center gap-2 text-gray-700">
//                               <CheckSquare className="text-emerald-500" size={18} />
//                               <span>{selectedJob.education}</span>
//                             </li>
//                           )}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>

//                   {/* AI Analysis Button */}
//                   <motion.button
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     whileHover={{ 
//                       scale: 1.02,
//                       boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
//                     }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => runAIAnalysis(selectedJob._id)}
//                     disabled={aiLoading}
//                     className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:cursor-not-allowed group"
//                   >
//                     {aiLoading ? (
//                       <>
//                         <Loader2 className="animate-spin" size={24} />
//                         Analyzing Applicants...
//                       </>
//                     ) : (
//                       <>
//                         <Sparkles />
//                         AI Analyze Applicants
//                         <Zap />
//                       </>
//                     )}
//                   </motion.button>
//                 </div>

//                 {/* AI Loading State */}
//                 <AnimatePresence>
//                   {aiLoading && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       className="text-center py-12"
//                     >
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                         className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto"
//                       />
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                         className="mt-4 text-xl font-semibold text-gray-900 mb-2"
//                       >
//                         AI Analysis in Progress
//                       </motion.p>
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                         className="text-gray-600"
//                       >
//                         Analyzing {selectedJob.applications?.length || 0} candidates...
//                       </motion.p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* AI Error */}
//                 <AnimatePresence>
//                   {aiError && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       className="bg-red-50 border border-red-200 p-6 rounded-2xl text-red-800 mt-6"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-red-100 rounded-xl">
//                           <AlertCircle size={24} />
//                         </div>
//                         <div>
//                           <p className="font-semibold">AI Analysis Failed</p>
//                           <p className="mt-1">{aiError}</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* AI Results */}
//                 <AnimatePresence>
//                   {aiResult && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                       className="space-y-6 mt-8"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Candidate Analysis</h3>
//                           <p className="text-gray-600">Top candidates ranked by AI match score</p>
//                         </div>
//                         <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl">
//                           <BarChart3 size={20} />
//                           <span className="font-medium">{aiResult.length} candidates analyzed</span>
//                         </div>
//                       </div>

//                       {aiResult.map((candidate, i) => {
//                         const realApplication = selectedJob.applications?.find(
//                           (app) => app.userEmail.toLowerCase() === candidate.email?.toLowerCase()
//                         );
//                         const currentStatus = realApplication?.status || "pending";
//                         const isUpdating = !!updatingStatuses[candidate.email];

//                         const handleStatusChange = async (newStatus) => {
//                           if (!newStatus || !candidate.email) return;

//                           setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: true }));

//                           try {
//                             const res = await fetch("/api/jobs/update-application", {
//                               method: "PATCH",
//                               headers: { "Content-Type": "application/json" },
//                               body: JSON.stringify({
//                                 jobId: selectedJob._id,
//                                 email: candidate.email,
//                                 status: newStatus,
//                               }),
//                             });

//                             if (!res.ok) {
//                               const data = await res.json();
//                               throw new Error(data.message || "Failed to update status");
//                             }

//                             setSelectedJob((prev) => ({
//                               ...prev,
//                               applications: prev.applications.map((app) =>
//                                 app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//                                   ? { ...app, status: newStatus }
//                                   : app
//                               ),
//                             }));

//                             setAiResult((prev) =>
//                               prev.map((c) =>
//                                 c.email?.toLowerCase() === candidate.email?.toLowerCase()
//                                   ? { ...c, applicationStatus: newStatus }
//                                   : c
//                               )
//                             );

//                             setSuccessMsg(`Status updated to "${getStatusLabel(newStatus)}" for ${candidate.name}`);
//                             setTimeout(() => setSuccessMsg(""), 4000);
//                           } catch (err) {
//                             setErrorMsg(err.message);
//                             setTimeout(() => setErrorMsg(""), 5000);
//                           } finally {
//                             setUpdatingStatuses((prev) => ({ ...prev, [candidate.email]: false }));
//                           }
//                         };

//                         return (
//                           <motion.div
//                             key={candidate.email || i}
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: i * 0.1 }}
//                             whileHover={{ y: -3 }}
//                             className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
//                           >
//                             <div className="flex flex-col lg:flex-row gap-6">
//                               {/* Left Section */}
//                               <div className="flex-1">
//                                 <div className="flex items-start gap-4 mb-4">
//                                   <div className="relative">
//                                     <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md">
//                                       <img
//                                         src={candidate.avatar}
//                                         alt={candidate.name}
//                                         className="w-full h-full object-cover"
//                                       />
//                                     </div>
//                                     <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
//                                       #{i + 1}
//                                     </div>
//                                   </div>
//                                   <div className="flex-1">
//                                     <div className="flex flex-wrap items-center gap-3 mb-2">
//                                       <h4 className="text-xl font-bold text-gray-900">{candidate.name}</h4>
//                                       <div className="flex items-center gap-2">
//                                         <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-bold">
//                                           {candidate.matchPercentage || candidate.score}% Match
//                                         </span>
//                                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
//                                           {getStatusLabel(currentStatus)}
//                                         </span>
//                                       </div>
//                                     </div>
//                                     <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                                       {candidate.email && (
//                                         <div className="flex items-center gap-2">
//                                           <Mail size={14} />
//                                           <span>{candidate.email}</span>
//                                         </div>
//                                       )}
//                                       <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
//                                         <Award size={14} />
//                                         <span>{candidate.finalVerdict}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div className="grid md:grid-cols-2 gap-4 mb-6">
//                                   <div className="bg-blue-50/80 rounded-xl p-4 border border-blue-100">
//                                     <div className="flex items-center gap-2 mb-2">
//                                       <TrendingUp className="text-blue-600" size={18} />
//                                       <p className="font-semibold text-blue-800">Strengths</p>
//                                     </div>
//                                     <p className="text-gray-700 text-sm">{candidate.strengths}</p>
//                                   </div>
//                                   <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100">
//                                     <div className="flex items-center gap-2 mb-2">
//                                       <TrendingDown className="text-amber-600" size={18} />
//                                       <p className="font-semibold text-amber-800">Areas for Improvement</p>
//                                     </div>
//                                     <p className="text-gray-700 text-sm">{candidate.weaknesses}</p>
//                                   </div>
//                                 </div>
//                               </div>

//                               {/* Right Section - Actions */}
//                               <div className="lg:w-64 space-y-4">
//                                 <div className="space-y-3">
//                                   {candidate.email && (
//                                     <Link
//                                       href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                       target="_blank"
//                                       className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
//                                     >
//                                       <User size={18} />
//                                       View Profile
//                                       <ExternalLink size={16} />
//                                     </Link>
//                                   )}
                                  
//                                   <div className="relative">
//                                     <select
//                                       disabled={isUpdating || !candidate.email}
//                                       onChange={(e) => handleStatusChange(e.target.value)}
//                                       value={currentStatus}
//                                       className="w-full appearance-none px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed"
//                                     >
//                                       <option value="shortlisted">Shortlist Candidate</option>
//                                       <option value="rejected">Reject Candidate</option>
//                                       <option value="pending">Mark as Pending</option>
//                                     </select>
//                                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
//                                     {isUpdating && (
//                                       <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-white animate-spin" size={18} />
//                                     )}
//                                   </div>
                                  
//                                   {/* <button className="w-full px-4 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
//                                     <Download size={18} />
//                                     Download Resume
//                                   </button> */}
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         );
//                       })}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Search,
  Building2,
  Calendar,
  Layers,
  CheckCircle,
  MapPin,
  Users,
  TrendingUp,
  X,
  Eye,
  Sparkles,
  ChevronDown,
  Loader2,
  User,
  Trash2,
  Filter,
  Clock,
  Award,
  Mail,
  Download,
  Shield,
  Zap,
  TrendingDown,
  Target,
  ChevronRight,
  ExternalLink,
  CheckSquare,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (session?.user.role === "user") {
      router.push("/user/dashboard");
    }
  }, [session, status, router]);

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [filters, setFilters] = useState({ status: "", type: "" });
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredJob, setHoveredJob] = useState(null);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState("");

  const [updatingStatuses, setUpdatingStatuses] = useState({});
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoadingJobs(true);
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  const handleViewJob = async (job) => {
    try {
      const res = await fetch(`/api/jobs/${job._id}`);
      if (res.ok) {
        const freshJob = await res.json();
        setSelectedJob(freshJob);
      } else {
        setSelectedJob(job);
      }
    } catch {
      setSelectedJob(job);
    }
    setAiResult(null);
    setAiError("");
    setUpdatingStatuses({});
  };

  const runAIAnalysis = async (jobId) => {
    setAiLoading(true);
    setAiResult(null);
    setAiError("");
    setUpdatingStatuses({});

    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "AI analysis failed");

      const parsedResult = JSON.parse(data.aiResult);

      const jobRes = await fetch(`/api/jobs/${jobId}`);
      if (!jobRes.ok) throw new Error("Failed to fetch job details");
      const jobData = await jobRes.json();

      const enrichedResult = parsedResult.map((candidate) => {
        // Match by name instead of email
        const application = jobData.applications.find(
          (app) => app.userName?.toLowerCase() === candidate.name?.toLowerCase()
        );
        
        return {
          ...candidate,
          applicationStatus: application?.status || "pending",
          // Generate avatar from name instead of email
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.name || candidate.email}`,
          matchPercentage: Math.floor(Math.random() * 20) + 80,
          // Ensure we have email from the application if needed
          email: application?.userEmail || candidate.email,
        };
      });

      setAiResult(enrichedResult);
      setSelectedJob(jobData);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((j) => j._id !== id));
      setSelectedJob(null);
      setSuccessMsg("Job deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const closeModals = () => {
    setSelectedJob(null);
    setAiResult(null);
    setAiError("");
    setUpdatingStatuses({});
  };

  const applyFiltersAndSort = (jobsList) => {
    let filtered = jobsList.filter((job) => {
      const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status ? job.status === filters.status : true;
      const matchesType = filters.type ? job.type === filters.type : true;
      return matchesSearch && matchesStatus && matchesType;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const filteredAndSortedJobs = applyFiltersAndSort(jobs);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  if (status === "loading") return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
        />
        <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
      </motion.div>
    </div>
  );
  
  if (!session || session.user.role === "user") return null;

  const getStatusLabel = (status) => {
    switch (status) {
      case "shortlisted":
        return "Shortlisted";
      case "rejected":
        return "Rejected";
      case "pending":
      default:
        return "Pending";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "shortlisted":
        return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
      case "rejected":
        return "bg-gradient-to-r from-rose-500 to-pink-500 text-white";
      case "pending":
      default:
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
    }
  };

  const getJobStatusColor = (status) => {
    return status === "Open" 
      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white" 
      : "bg-gradient-to-r from-rose-500 to-pink-600 text-white";
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    if (typeof salary === "string" && (salary.includes("PKR") || salary.includes("$"))) {
      return salary.replace("$", "PKR");
    }
    return `PKR ${salary}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const cardHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const handleStatusChange = async (newStatus, candidate) => {
    if (!newStatus || !candidate.name) return;

    setUpdatingStatuses((prev) => ({ ...prev, [candidate.name]: true }));

    try {
      const res = await fetch("/api/jobs/update-application", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob._id,
          name: candidate.name,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update status");
      }

      setSelectedJob((prev) => ({
        ...prev,
        applications: prev.applications.map((app) =>
          app.userName?.toLowerCase() === candidate.name?.toLowerCase()
            ? { ...app, status: newStatus }
            : app
        ),
      }));

      setAiResult((prev) =>
        prev.map((c) =>
          c.name?.toLowerCase() === candidate.name?.toLowerCase()
            ? { ...c, applicationStatus: newStatus }
            : c
        )
      );

      setSuccessMsg(`Status updated to "${getStatusLabel(newStatus)}" for ${candidate.name}`);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.message);
      setTimeout(() => setErrorMsg(""), 5000);
    } finally {
      setUpdatingStatuses((prev) => ({ ...prev, [candidate.name]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-gray-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-200/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-200/10 to-teal-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-60 h-60 bg-gradient-to-br from-amber-200/10 to-orange-200/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative">
        {/* HEADER WITH STATS */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Job Management Dashboard
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Manage job postings, analyze applicants, and streamline your hiring process
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Briefcase size={20} />
              Post New Job
            </motion.button>
          </div>

          {/* STATS CARDS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Briefcase, label: "Active Jobs", value: jobs.filter(j => j.status === "Open").length, color: "from-blue-500 to-cyan-500" },
              { icon: Users, label: "Total Applicants", value: jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0), color: "from-emerald-500 to-teal-500" },
              { icon: CheckCircle, label: "Shortlisted", value: jobs.reduce((acc, job) => acc + (job.applications?.filter(a => a.status === "shortlisted").length || 0), 0), color: "from-violet-500 to-purple-500" },
              { icon: TrendingUp, label: "Avg. Match Rate", value: "87%", color: "from-amber-500 to-orange-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* MESSAGES */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative overflow-hidden"
            >
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent origin-left"
              />
              <div className="p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm border border-emerald-200 rounded-2xl text-emerald-800 flex items-center justify-between shadow-lg shadow-emerald-100/50">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl"
                  >
                    <CheckCircle size={20} className="text-emerald-600" />
                  </motion.div>
                  <span className="font-medium">{successMsg}</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSuccessMsg("")}
                  className="p-1 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-4 bg-gradient-to-r from-rose-50/80 to-red-50/80 backdrop-blur-sm border border-rose-200 rounded-2xl text-rose-800 flex items-center justify-between shadow-lg shadow-rose-100/50"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 0 }}
                  className="p-2 bg-gradient-to-br from-rose-100 to-rose-50 rounded-xl"
                >
                  <AlertCircle size={20} className="text-rose-600" />
                </motion.div>
                <span className="font-medium">{errorMsg}</span>
              </div>
              <motion.button 
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setErrorMsg("")}
                className="p-1 hover:bg-rose-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SEARCH AND FILTERS BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-4 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
                </div>
                <input
                  placeholder="Search jobs by title, company, skills, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                {["grid", "list"].map((mode) => (
                  <motion.button
                    key={mode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1.5 rounded-md transition-all ${viewMode === mode ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {mode === "grid" ? (
                      <div className="flex items-center gap-2">
                        <div className="grid grid-cols-2 gap-0.5">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-current rounded-sm" />
                          ))}
                        </div>
                        <span className="text-sm">Grid</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="space-y-1">
                          <div className="w-4 h-1 bg-current rounded-full" />
                          <div className="w-4 h-1 bg-current rounded-full" />
                          <div className="w-4 h-1 bg-current rounded-full" />
                        </div>
                        <span className="text-sm">List</span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300 group"
              >
                <Filter size={18} />
                <span>Filters</span>
                {Object.values(filters).some(Boolean) && (
                  <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-full">
                    {Object.values(filters).filter(Boolean).length}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* EXPANDED FILTERS */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Status</label>
                    <div className="flex flex-wrap gap-2">
                      {["", "Open", "Closed", "Draft"].map((status) => (
                        <motion.button
                          key={status}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange("status", status)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${filters.status === status
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {status || "All Status"}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["", "Remote", "On-site", "Hybrid", "Contract", "Internship"].map((type) => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange("type", type)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${filters.type === type
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {type || "All Types"}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <div className="flex gap-2">
                      {["title", "applications", "date"].map((field) => (
                        <motion.button
                          key={field}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSort(field)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1 ${sortBy === field
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                          {sortBy === field && (
                            <ChevronDown className={`transform transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} size={16} />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* JOB CARDS GRID */}
        {loadingJobs ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-gray-600"
              >
                Loading jobs...
              </motion.p>
            </div>
          </motion.div>
        ) : filteredAndSortedJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Briefcase className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm("");
                setFilters({ status: "", type: "" });
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedJobs.map((job, index) => (
              <motion.div
                key={job._id}
                variants={itemVariants}
                custom={index}
                whileHover="hover"
                initial="initial"
                animate="initial"
                onMouseEnter={() => setHoveredJob(job._id)}
                onMouseLeave={() => setHoveredJob(null)}
                className="relative group"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleViewJob(job)}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobStatusColor(job.status)} shadow-lg`}>
                      {job.status}
                    </span>
                  </div>

                  {/* Header with Gradient */}
                  <div className="relative h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                  <div className="p-6">
                    {/* Job Title and Company */}
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Briefcase className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <Building2 size={16} />
                            <span className="text-sm">{job.company}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded">
                            PKR
                          </span>
                          <span className="text-sm font-medium">{formatSalary(job.salary)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    {job.skills?.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Required Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 3).map((skill, i) => (
                            <motion.span 
                              key={i}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
                            >
                              {skill}
                            </motion.span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Users size={16} />
                          <span className="text-sm font-medium">
                            {job.applications?.length || 0} applicants
                          </span>
                        </div>
                        {job.postedDate && (
                          <div className="text-xs text-gray-400">
                            Posted {new Date(job.postedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                          </div>
                        )}
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-2"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewJob(job);
                          }}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteJob(job._id);
                          }}
                          className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
                          title="Delete Job"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* LIST VIEW */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredAndSortedJobs.map((job, index) => (
              <motion.div
                key={job._id}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.005 }}
                onClick={() => handleViewJob(job)}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Left Column */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                            {job.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Building2 size={16} />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills and Details */}
                    <div className="flex flex-wrap gap-4">
                      {job.skills?.slice(0, 4).map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:w-64 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-2xl font-bold text-gray-900">{job.applications?.length || 0}</div>
                        <div className="text-xs text-gray-500">Applicants</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-2xl font-bold text-gray-900">{formatSalary(job.salary)}</div>
                        <div className="text-xs text-gray-500">Salary</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewJob(job);
                        }}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        View
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteJob(job._id);
                        }}
                        className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg font-medium hover:bg-rose-100 transition-colors"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* VIEW MODAL */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModals}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-6xl w-full p-8 overflow-y-auto max-h-[90vh] shadow-2xl"
              >
                {/* Close button */}
                <motion.button 
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModals}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-300 z-10"
                >
                  <X size={20} />
                </motion.button>

                <div className="space-y-8">
                  {/* Header */}
                  <div className="pr-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-4 py-1.5 rounded-full font-medium ${getJobStatusColor(selectedJob.status)}`}>
                        {selectedJob.status}
                      </span>
                      <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                        {selectedJob.type}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building2 size={20} />
                        <span className="font-medium">{selectedJob.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={20} />
                        <span>{selectedJob.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: "PKR", label: "Salary", value: formatSalary(selectedJob.salary), color: "bg-gradient-to-br from-emerald-500 to-teal-500" },
                      { icon: Users, label: "Applicants", value: selectedJob.applications?.length || 0, color: "bg-gradient-to-br from-blue-500 to-indigo-500" },
                      { icon: Layers, label: "Experience", value: selectedJob.experience ? `${selectedJob.experience} years` : "N/A", color: "bg-gradient-to-br from-amber-500 to-orange-500" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${item.color} flex items-center justify-center min-w-[48px]`}>
                            {typeof item.icon === 'string' ? (
                              <span className="text-white font-bold">{item.icon}</span>
                            ) : (
                              <item.icon className="text-white" size={20} />
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-lg font-bold text-gray-900">{item.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Description and Skills Side by Side */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Description */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                      <div className="prose max-w-none text-gray-700">
                        <p className="whitespace-pre-line leading-relaxed">
                          {selectedJob.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    {/* Skills and Requirements */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.skills?.length > 0 ? (
                            selectedJob.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">No skills listed.</span>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-700">
                            <CheckSquare className="text-emerald-500" size={18} />
                            <span>{selectedJob.experience || "0"}+ years of experience</span>
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <CheckSquare className="text-emerald-500" size={18} />
                            <span>{selectedJob.type || "Full-time"} position</span>
                          </li>
                          <li className="flex items-center gap-2 text-gray-700">
                            <CheckSquare className="text-emerald-500" size={18} />
                            <span>Immediate joining preferred</span>
                          </li>
                          {selectedJob.education && (
                            <li className="flex items-center gap-2 text-gray-700">
                              <CheckSquare className="text-emerald-500" size={18} />
                              <span>{selectedJob.education}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => runAIAnalysis(selectedJob._id)}
                    disabled={aiLoading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg flex justify-center items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:cursor-not-allowed group"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        Analyzing Applicants...
                      </>
                    ) : (
                      <>
                        <Sparkles />
                        AI Analyze Applicants
                        <Zap />
                      </>
                    )}
                  </motion.button>
                </div>

                {/* AI Loading State */}
                <AnimatePresence>
                  {aiLoading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto"
                      />
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-xl font-semibold text-gray-900 mb-2"
                      >
                        AI Analysis in Progress
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-600"
                      >
                        Analyzing {selectedJob.applications?.length || 0} candidates...
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Error */}
                <AnimatePresence>
                  {aiError && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-red-50 border border-red-200 p-6 rounded-2xl text-red-800 mt-6"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-xl">
                          <AlertCircle size={24} />
                        </div>
                        <div>
                          <p className="font-semibold">AI Analysis Failed</p>
                          <p className="mt-1">{aiError}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Results */}
                <AnimatePresence>
                  {aiResult && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6 mt-8"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Candidate Analysis</h3>
                          <p className="text-gray-600">Top candidates ranked by AI match score</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl">
                          <BarChart3 size={20} />
                          <span className="font-medium">{aiResult.length} candidates analyzed</span>
                        </div>
                      </div>

                      {aiResult.map((candidate, i) => {
                        const realApplication = selectedJob.applications?.find(
                          (app) => app.userName?.toLowerCase() === candidate.name?.toLowerCase()
                        );
                        const currentStatus = realApplication?.status || "pending";
                        const isUpdating = !!updatingStatuses[candidate.name];

                        return (
                          <motion.div
                            key={candidate.email || i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -3 }}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex flex-col lg:flex-row gap-6">
                              {/* Left Section */}
                              <div className="flex-1">
                                <div className="flex items-start gap-4 mb-4">
                                  <div className="relative">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md">
                                      <img
                                        src={candidate.avatar}
                                        alt={candidate.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                      #{i + 1}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                      <h4 className="text-xl font-bold text-gray-900">{candidate.name}</h4>
                                      <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-bold">
                                          {candidate.matchPercentage || candidate.score}% Match
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
                                          {getStatusLabel(currentStatus)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                      {candidate.email && (
                                        <div className="flex items-center gap-2">
                                          <Mail size={14} />
                                          <span>{candidate.email}</span>
                                        </div>
                                      )}
                                      {/* <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                                        <Award size={14} />
                                        <span>{candidate.finalVerdict}</span>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                  <div className="bg-blue-50/80 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center gap-2 mb-2">
                                      <TrendingUp className="text-blue-600" size={18} />
                                      <p className="font-semibold text-blue-800">Strengths</p>
                                    </div>
                                    <p className="text-gray-700 text-sm">{candidate.strengths}</p>
                                  </div>
                                  <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100">
                                    <div className="flex items-center gap-2 mb-2">
                                      <TrendingDown className="text-amber-600" size={18} />
                                      <p className="font-semibold text-amber-800">Areas for Improvement</p>
                                    </div>
                                    <p className="text-gray-700 text-sm">{candidate.weaknesses}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Right Section - Actions */}
                              <div className="lg:w-64 space-y-4">
                                <div className="space-y-3">
                                  {candidate.name && (
                                    <Link
                                      href={`/profile?name=${encodeURIComponent(candidate.name)}`}
                                      target="_blank"
                                      className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                                    >
                                      <User size={18} />
                                      View Profile
                                      <ExternalLink size={16} />
                                    </Link>
                                  )}
                                  
                                  <div className="relative">
                                    <select
                                      disabled={isUpdating || !candidate.name}
                                      onChange={(e) => handleStatusChange(e.target.value, candidate)}
                                      value={currentStatus}
                                      className="w-full appearance-none px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition cursor-pointer pr-10 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                      <option value="shortlisted">Shortlist Candidate</option>
                                      <option value="rejected">Reject Candidate</option>
                                      <option value="pending">Mark as Pending</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
                                    {isUpdating && (
                                      <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 text-white animate-spin" size={18} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Search,
//   Building2,
//   Calendar,
//   Layers,
//   CheckCircle,
//   MapPin,
//   Users,
//   TrendingUp,
//   X,
//   Eye,
//   Sparkles,
//   ChevronDown,
//   Loader2,
//   User,
//   Trash2,
//   Edit2,
//   Filter,
//   BarChart3,
//   Download,
//   Share2,
//   Bell,
//   Clock,
//   DollarSign,
//   Tag,
//   Award,
//   TrendingDown,
//   MoreVertical,
//   PieChart,
//   UsersRound,
//   CheckSquare,
//   Mail,
//   Phone,
//   Globe,
//   Linkedin,
//   Star,
//   StarHalf,
//   FileText,
//   MessageSquare,
//   ExternalLink,
//   RefreshCw,
//   Lock,
//   Unlock,
//   Zap,
//   Target,
//   Shield,
//   CalendarDays,
//   BellRing,
//   ChartNoAxesCombined,
//   Hash,
//   BarChartHorizontal,
//   Bookmark,
//   BookmarkCheck,
//   Rocket,
//   BadgeCheck,
//   GraduationCap,
//   Lightbulb,
//   Brain,
//   Cpu,
//   Network,
//   GitCompare,
//   GitBranch,
//   GitPullRequest,
//   Workflow,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import { format } from "date-fns";

// // Import chart components from recharts with unique names
// import {
//   BarChart as ReBarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart as RePieChart,
//   Pie,
//   Cell,
//   Legend,
//   LineChart as ReLineChart,
//   Line,
// } from "recharts";

// export default function Page() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/signin");
//     } else if (session?.user.role === "user") {
//       router.push("/user/dashboard");
//     }
//   }, [session, status, router]);

//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [filters, setFilters] = useState({
//     status: "",
//     type: "",
//     experience: "",
//     salaryRange: "",
//     datePosted: "",
//   });
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
//   const [selectedJobs, setSelectedJobs] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [stats, setStats] = useState({
//     totalJobs: 0,
//     activeJobs: 0,
//     totalApplicants: 0,
//     avgApplicants: 0,
//   });

//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [aiError, setAiError] = useState("");

//   const [updatingStatuses, setUpdatingStatuses] = useState({});
//   const [bulkActions, setBulkActions] = useState(false);
//   const [showExportMenu, setShowExportMenu] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [timeRange, setTimeRange] = useState("30d");

//   // Mock data for charts
//   const applicationTrends = [
//     { day: "Mon", applications: 45, shortlisted: 12 },
//     { day: "Tue", applications: 52, shortlisted: 18 },
//     { day: "Wed", applications: 48, shortlisted: 15 },
//     { day: "Thu", applications: 65, shortlisted: 22 },
//     { day: "Fri", applications: 58, shortlisted: 20 },
//     { day: "Sat", applications: 32, shortlisted: 10 },
//     { day: "Sun", applications: 28, shortlisted: 8 },
//   ];

//   const jobTypeDistribution = [
//     { name: "Remote", value: 35, color: "#4F46E5" },
//     { name: "Hybrid", value: 45, color: "#7C3AED" },
//     { name: "Onsite", value: 20, color: "#EC4899" },
//   ];

//   const skillDemand = [
//     { skill: "React", demand: 95, jobs: 42 },
//     { skill: "Node.js", demand: 88, jobs: 38 },
//     { skill: "Python", demand: 92, jobs: 45 },
//     { skill: "AWS", demand: 85, jobs: 32 },
//     { skill: "UI/UX", demand: 78, jobs: 28 },
//   ];

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoadingJobs(true);
//       try {
//         const res = await fetch("/api/jobs");
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         const data = await res.json();
//         setJobs(data);
        
//         // Calculate stats
//         const active = data.filter(job => job.status === "Open").length;
//         const totalApplicants = data.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
//         setStats({
//           totalJobs: data.length,
//           activeJobs: active,
//           totalApplicants,
//           avgApplicants: data.length > 0 ? Math.round(totalApplicants / data.length) : 0,
//         });
//       } catch (err) {
//         setErrorMsg(err.message);
//       } finally {
//         setLoadingJobs(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleViewJob = async (job) => {
//     try {
//       const res = await fetch(`/api/jobs/${job._id}`);
//       if (res.ok) {
//         const freshJob = await res.json();
//         setSelectedJob(freshJob);
//         setActiveTab("details");
//       } else {
//         setSelectedJob(job);
//       }
//     } catch {
//       setSelectedJob(job);
//     }
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//   };

//   const runAIAnalysis = async (jobId) => {
//     setAiLoading(true);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});

//     try {
//       const res = await fetch("/api/ai/recommend", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "AI analysis failed");

//       const parsedResult = JSON.parse(data.aiResult);

//       const jobRes = await fetch(`/api/jobs/${jobId}`);
//       if (!jobRes.ok) throw new Error("Failed to fetch job details");
//       const jobData = await jobRes.json();

//       const enrichedResult = parsedResult.map((candidate) => {
//         const application = jobData.applications.find(
//           (app) => app.userEmail.toLowerCase() === candidate.email.toLowerCase()
//         );
//         return {
//           ...candidate,
//           applicationStatus: application?.status || "pending",
//           appliedDate: application?.appliedAt || new Date().toISOString(),
//           matchScore: Math.floor(Math.random() * 30) + 70, // Enhanced match score
//         };
//       });

//       setAiResult(enrichedResult);
//       setSelectedJob(jobData);
//       setActiveTab("ai-analysis");
//     } catch (err) {
//       setAiError(err.message);
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     try {
//       const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete job");
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//       setSuccessMsg("Job deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const handleToggleSelectJob = (jobId) => {
//     setSelectedJobs(prev =>
//       prev.includes(jobId)
//         ? prev.filter(id => id !== jobId)
//         : [...prev, jobId]
//     );
//   };

//   const handleBulkAction = async (action) => {
//     if (selectedJobs.length === 0) return;

//     try {
//       if (action === "close") {
//         const res = await fetch("/api/jobs/bulk-update", {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ids: selectedJobs,
//             status: "Closed"
//           }),
//         });
//         if (res.ok) {
//           setJobs(prev => prev.map(job =>
//             selectedJobs.includes(job._id) ? { ...job, status: "Closed" } : job
//           ));
//           setSuccessMsg(`Closed ${selectedJobs.length} job(s) successfully!`);
//           setSelectedJobs([]);
//         }
//       } else if (action === "archive") {
//         // Archive jobs
//         setSuccessMsg(`Archived ${selectedJobs.length} job(s) successfully!`);
//         setSelectedJobs([]);
//       }
//     } catch (err) {
//       setErrorMsg(err.message);
//     }
//   };

//   const closeModals = () => {
//     setSelectedJob(null);
//     setAiResult(null);
//     setAiError("");
//     setUpdatingStatuses({});
//     setActiveTab("overview");
//   };

//   const applyFiltersAndSort = (jobsList) => {
//     let filtered = jobsList.filter((job) => {
//       const matchesSearch = `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesStatus = filters.status ? job.status === filters.status : true;
//       const matchesType = filters.type ? job.type === filters.type : true;
//       const matchesExperience = filters.experience ? job.experience <= parseInt(filters.experience) : true;
//       return matchesSearch && matchesStatus && matchesType && matchesExperience;
//     });

//     filtered.sort((a, b) => {
//       let aVal = a[sortBy];
//       let bVal = b[sortBy];
      
//       if (sortBy === "createdAt") {
//         aVal = new Date(aVal);
//         bVal = new Date(bVal);
//       }
      
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
      
//       if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return filtered;
//   };

//   const filteredAndSortedJobs = applyFiltersAndSort(jobs);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       status: "",
//       type: "",
//       experience: "",
//       salaryRange: "",
//       datePosted: "",
//     });
//     setSearchTerm("");
//   };

//   const toggleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortOrder("asc");
//     }
//   };

//   const exportData = (format) => {
//     const data = selectedJob ? selectedJob.applications : filteredAndSortedJobs;
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `jobs-export-${new Date().toISOString()}.${format}`;
//     a.click();
//     setShowExportMenu(false);
//   };

//   if (status === "loading") return null;
//   if (!session || session.user.role === "user") return null;

//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "Shortlisted";
//       case "rejected":
//         return "Rejected";
//       case "pending":
//       default:
//         return "Pending";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
//       case "rejected":
//         return "bg-gradient-to-r from-red-500 to-pink-600 text-white";
//       case "pending":
//       default:
//         return "bg-gradient-to-r from-amber-500 to-orange-600 text-white";
//     }
//   };

//   const getJobStatusColor = (status) => {
//     switch (status) {
//       case "Open":
//         return "bg-gradient-to-r from-emerald-500 to-teal-600";
//       case "Closed":
//         return "bg-gradient-to-r from-gray-500 to-gray-700";
//       case "Draft":
//         return "bg-gradient-to-r from-amber-500 to-orange-600";
//       default:
//         return "bg-gradient-to-r from-indigo-500 to-purple-600";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
//         {/* HEADER */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }} 
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
//         >
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
//                 <Briefcase className="text-white" size={28} />
//               </div>
//               <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
//                 Job Management Dashboard
//               </h1>
//             </div>
//             <p className="text-gray-600">Manage jobs and analyze applicants with AI-powered insights</p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <button className="px-6 py-3 bg-white border border-indigo-200 rounded-xl text-indigo-700 font-semibold hover:bg-indigo-50 transition-all shadow-sm flex items-center gap-2">
//               <Rocket size={18} />
//               Post New Job
//             </button>
//             <button className="p-3 bg-white border border-indigo-200 rounded-xl text-indigo-700 hover:bg-indigo-50 transition-all shadow-sm">
//               <Bell size={20} />
//             </button>
//             <div className="relative">
//               <button 
//                 onClick={() => setShowExportMenu(!showExportMenu)}
//                 className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2"
//               >
//                 <Download size={20} />
//                 Export
//               </button>
//               {showExportMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
//                   <button onClick={() => exportData('json')} className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-2">
//                     <FileText size={16} /> JSON Format
//                   </button>
//                   <button onClick={() => exportData('csv')} className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-2">
//                     <FileText size={16} /> CSV Format
//                   </button>
//                   <button onClick={() => exportData('pdf')} className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-2">
//                     <FileText size={16} /> PDF Report
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* STATS CARDS */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Total Jobs</p>
//                 <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.totalJobs}</h3>
//                 <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
//                   <TrendingUp size={14} /> +12% from last month
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Briefcase className="text-blue-600" size={24} />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-lg border border-emerald-100">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Active Jobs</p>
//                 <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.activeJobs}</h3>
//                 <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
//                   <Target size={14} /> {Math.round((stats.activeJobs / stats.totalJobs) * 100)}% active rate
//                 </p>
//               </div>
//               <div className="p-3 bg-emerald-100 rounded-xl">
//                 <Rocket className="text-emerald-600" size={24} />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg border border-purple-100">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Total Applicants</p>
//                 <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.totalApplicants}</h3>
//                 <p className="text-sm text-purple-600 mt-2 flex items-center gap-1">
//                   <UsersRound size={14} /> Avg. {stats.avgApplicants} per job
//                 </p>
//               </div>
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <UsersRound className="text-purple-600" size={24} />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-lg border border-amber-100">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">AI Insights</p>
//                 <h3 className="text-3xl font-bold text-gray-900 mt-2">24</h3>
//                 <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
//                   <Brain size={14} /> 8 pending analysis
//                 </p>
//               </div>
//               <div className="p-3 bg-amber-100 rounded-xl">
//                 <Sparkles className="text-amber-600" size={24} />
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* MESSAGES */}
//         <AnimatePresence>
//           {successMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center justify-between shadow-md"
//             >
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="text-emerald-600" /> {successMsg}
//               </div>
//               <button onClick={() => setSuccessMsg("")}>
//                 <X size={20} />
//               </button>
//             </motion.div>
//           )}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl text-red-800 flex items-center justify-between shadow-md"
//             >
//               <div className="flex items-center gap-2">
//                 <X className="text-red-600" /> {errorMsg}
//               </div>
//               <button onClick={() => setErrorMsg("")}>
//                 <X size={20} />
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* BULK ACTIONS */}
//         {selectedJobs.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
//           >
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="flex items-center gap-3">
//                 <CheckSquare size={24} />
//                 <span className="font-semibold">{selectedJobs.length} job(s) selected</span>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => handleBulkAction("close")}
//                   className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
//                 >
//                   Close Jobs
//                 </button>
//                 <button
//                   onClick={() => handleBulkAction("archive")}
//                   className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
//                 >
//                   Archive
//                 </button>
//                 <button
//                   onClick={() => setSelectedJobs([])}
//                   className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* MAIN CONTENT */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* LEFT SIDE - FILTERS AND CHARTS */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* SEARCH AND FILTERS */}
//             <motion.div 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
//             >
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                 <div className="relative flex-1">
//                   <input
//                     placeholder="Search jobs by title, company, skills..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full px-6 py-3.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
//                   />
//                   <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
//                 </div>
                
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => setShowFilters(!showFilters)}
//                     className="px-5 py-3 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2"
//                   >
//                     <Filter size={18} />
//                     Filters
//                   </button>
//                   <div className="flex bg-gray-100 rounded-xl p-1">
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`px-4 py-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-600"}`}
//                     >
//                       Grid
//                     </button>
//                     <button
//                       onClick={() => setViewMode("list")}
//                       className={`px-4 py-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-600"}`}
//                     >
//                       List
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {showFilters && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
//                     <select
//                       value={filters.status}
//                       onChange={(e) => handleFilterChange("status", e.target.value)}
//                       className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-500"
//                     >
//                       <option value="">All Status</option>
//                       <option value="Open">Open</option>
//                       <option value="Closed">Closed</option>
//                       <option value="Draft">Draft</option>
//                     </select>
                    
//                     <select
//                       value={filters.type}
//                       onChange={(e) => handleFilterChange("type", e.target.value)}
//                       className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-500"
//                     >
//                       <option value="">All Types</option>
//                       <option value="Remote">Remote</option>
//                       <option value="Onsite">Onsite</option>
//                       <option value="Hybrid">Hybrid</option>
//                     </select>
                    
//                     <select
//                       value={filters.experience}
//                       onChange={(e) => handleFilterChange("experience", e.target.value)}
//                       className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-500"
//                     >
//                       <option value="">Experience</option>
//                       <option value="1">0-1 years</option>
//                       <option value="3">1-3 years</option>
//                       <option value="5">3-5 years</option>
//                       <option value="10">5+ years</option>
//                     </select>
                    
//                     <select
//                       value={filters.datePosted}
//                       onChange={(e) => handleFilterChange("datePosted", e.target.value)}
//                       className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-500"
//                     >
//                       <option value="">Date Posted</option>
//                       <option value="1">Last 24 hours</option>
//                       <option value="7">Last week</option>
//                       <option value="30">Last month</option>
//                     </select>
//                   </div>
                  
//                   <div className="flex justify-end gap-3 mt-4">
//                     <button
//                       onClick={clearFilters}
//                       className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
//                     >
//                       Clear all
//                     </button>
//                     <button
//                       onClick={() => setShowFilters(false)}
//                       className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                     >
//                       Apply Filters
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </motion.div>

//             {/* JOBS SECTION */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-6"
//             >
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <span>{filteredAndSortedJobs.length} jobs found</span>
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="bg-transparent border-none focus:outline-none"
//                   >
//                     <option value="createdAt">Newest</option>
//                     <option value="title">Title</option>
//                     <option value="applications">Most Applicants</option>
//                   </select>
//                 </div>
//               </div>

//               {viewMode === "grid" ? (
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {loadingJobs ? (
//                     Array.from({ length: 4 }).map((_, i) => (
//                       <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
//                         <div className="h-6 bg-gray-300 rounded mb-4"></div>
//                         <div className="h-4 bg-gray-300 rounded mb-2"></div>
//                         <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//                       </div>
//                     ))
//                   ) : filteredAndSortedJobs.length === 0 ? (
//                     <div className="col-span-2 text-center py-12">
//                       <div className="text-gray-400 mb-4">No jobs found</div>
//                       <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
//                         Create Your First Job
//                       </button>
//                     </div>
//                   ) : (
//                     filteredAndSortedJobs.map((job) => (
//                       <motion.div
//                         key={job._id}
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         whileHover={{ y: -4, transition: { duration: 0.2 } }}
//                         className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer ${
//                           selectedJobs.includes(job._id) ? "ring-2 ring-indigo-500" : ""
//                         }`}
//                         onClick={() => handleViewJob(job)}
//                       >
//                         <div className="flex justify-between items-start mb-4">
//                           <div>
//                             <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
//                             <div className="flex items-center gap-2 text-gray-600">
//                               <Building2 size={16} />
//                               <span>{job.company}</span>
//                             </div>
//                           </div>
//                           <input
//                             type="checkbox"
//                             checked={selectedJobs.includes(job._id)}
//                             onChange={(e) => {
//                               e.stopPropagation();
//                               handleToggleSelectJob(job._id);
//                             }}
//                             className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                           />
//                         </div>
                        
//                         <div className="flex flex-wrap gap-2 mb-4">
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobStatusColor(job.status)} text-white`}>
//                             {job.status}
//                           </span>
//                           <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//                             {job.type}
//                           </span>
//                           <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
//                             <UsersRound size={12} />
//                             {job.applications?.length || 0} applicants
//                           </span>
//                         </div>
                        
//                         <div className="space-y-3 mb-6">
//                           <div className="flex items-center gap-2 text-gray-600">
//                             <MapPin size={16} />
//                             <span>{job.location}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-gray-600">
//                             <DollarSign size={16} />
//                             <span>{job.salary || "Salary not specified"}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-gray-600">
//                             <Clock size={16} />
//                             <span>Posted {format(new Date(job.createdAt), "MMM d")}</span>
//                           </div>
//                         </div>
                        
//                         <div className="flex justify-between items-center">
//                           <div className="flex gap-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleViewJob(job);
//                               }}
//                               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                               title="View Details"
//                             >
//                               <Eye size={18} className="text-gray-600" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 runAIAnalysis(job._id);
//                               }}
//                               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                               title="AI Analysis"
//                             >
//                               <Sparkles size={18} className="text-purple-600" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleDeleteJob(job._id);
//                               }}
//                               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                               title="Delete"
//                             >
//                               <Trash2 size={18} className="text-red-600" />
//                             </button>
//                           </div>
//                           <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
//                             View Details →
//                           </button>
//                         </div>
//                       </motion.div>
//                     ))
//                   )}
//                 </div>
//               ) : (
//                 /* LIST VIEW */
//                 <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="py-4 px-6 text-left">
//                           <input
//                             type="checkbox"
//                             checked={selectedJobs.length === filteredAndSortedJobs.length}
//                             onChange={(e) => {
//                               if (e.target.checked) {
//                                 setSelectedJobs(filteredAndSortedJobs.map(job => job._id));
//                               } else {
//                                 setSelectedJobs([]);
//                               }
//                             }}
//                             className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                           />
//                         </th>
//                         <th className="py-4 px-6 text-left text-gray-600 font-semibold">Position</th>
//                         <th className="py-4 px-6 text-left text-gray-600 font-semibold">Type</th>
//                         <th className="py-4 px-6 text-left text-gray-600 font-semibold">Applicants</th>
//                         <th className="py-4 px-6 text-left text-gray-600 font-semibold">Status</th>
//                         <th className="py-4 px-6 text-left text-gray-600 font-semibold">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredAndSortedJobs.map((job) => (
//                         <tr key={job._id} className="border-t border-gray-100 hover:bg-gray-50">
//                           <td className="py-4 px-6">
//                             <input
//                               type="checkbox"
//                               checked={selectedJobs.includes(job._id)}
//                               onChange={(e) => handleToggleSelectJob(job._id)}
//                               className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                             />
//                           </td>
//                           <td className="py-4 px-6">
//                             <div>
//                               <div className="font-semibold text-gray-900">{job.title}</div>
//                               <div className="text-sm text-gray-500">{job.company}</div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6">
//                             <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
//                               {job.type}
//                             </span>
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="flex items-center gap-2">
//                               <UsersRound size={16} className="text-gray-400" />
//                               <span className="font-medium">{job.applications?.length || 0}</span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6">
//                             <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobStatusColor(job.status)} text-white`}>
//                               {job.status}
//                             </span>
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleViewJob(job)}
//                                 className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
//                                 title="View"
//                               >
//                                 <Eye size={18} className="text-indigo-600" />
//                               </button>
//                               <button
//                                 onClick={() => runAIAnalysis(job._id)}
//                                 className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
//                                 title="AI Analysis"
//                               >
//                                 <Sparkles size={18} className="text-purple-600" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* RIGHT SIDE - ANALYTICS */}
//           <div className="space-y-8">
//             {/* QUICK ACTIONS */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
//             >
//               <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors flex items-center justify-between">
//                   <span>Create New Job</span>
//                   <Briefcase size={18} />
//                 </button>
//                 <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors flex items-center justify-between">
//                   <span>AI Batch Analysis</span>
//                   <Brain size={18} />
//                 </button>
//                 <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors flex items-center justify-between">
//                   <span>Generate Report</span>
//                   <BarChart3 size={18} />
//                 </button>
//                 <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors flex items-center justify-between">
//                   <span>Schedule Interviews</span>
//                   <CalendarDays size={18} />
//                 </button>
//               </div>
//             </motion.div>

//             {/* APPLICATION TRENDS */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="font-bold text-gray-900">Application Trends</h3>
//                 <select
//                   value={timeRange}
//                   onChange={(e) => setTimeRange(e.target.value)}
//                   className="text-sm border-none bg-gray-50 rounded-lg px-3 py-1"
//                 >
//                   <option value="7d">7 days</option>
//                   <option value="30d">30 days</option>
//                   <option value="90d">90 days</option>
//                 </select>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <ReLineChart data={applicationTrends}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                     <XAxis dataKey="day" />
//                     <YAxis />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="applications" stroke="#4F46E5" strokeWidth={2} />
//                     <Line type="monotone" dataKey="shortlisted" stroke="#10B981" strokeWidth={2} />
//                   </ReLineChart>
//                 </ResponsiveContainer>
//               </div>
//             </motion.div>

//             {/* TOP SKILLS DEMAND */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
//             >
//               <h3 className="font-bold text-gray-900 mb-6">Top Skills Demand</h3>
//               <div className="space-y-4">
//                 {skillDemand.map((skill, i) => (
//                   <div key={i}>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span className="font-medium text-gray-900">{skill.skill}</span>
//                       <span className="text-gray-600">{skill.demand}% demand</span>
//                     </div>
//                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
//                         style={{ width: `${skill.demand}%` }}
//                       />
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">{skill.jobs} jobs requiring this skill</div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* JOB DETAIL MODAL */}
//       <AnimatePresence>
//         {selectedJob && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//             onClick={closeModals}
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-3xl max-w-6xl w-full p-0 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* MODAL HEADER */}
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-3xl font-bold mb-2">{selectedJob.title}</h2>
//                     <div className="flex items-center gap-4 flex-wrap">
//                       <div className="flex items-center gap-2">
//                         <Building2 size={20} />
//                         <span>{selectedJob.company}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <MapPin size={20} />
//                         <span>{selectedJob.location}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <DollarSign size={20} />
//                         <span>{selectedJob.salary || "Salary not specified"}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={closeModals}
//                     className="p-2 hover:bg-white/20 rounded-xl transition-colors"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>
                
//                 {/* TABS */}
//                 <div className="flex gap-1 mt-8">
//                   {["details", "applicants", "ai-analysis", "analytics"].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`px-6 py-3 rounded-t-xl font-medium capitalize transition-colors ${
//                         activeTab === tab
//                           ? "bg-white text-indigo-700"
//                           : "text-white/80 hover:text-white hover:bg-white/10"
//                       }`}
//                     >
//                       {tab.replace("-", " ")}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* MODAL CONTENT */}
//               <div className="flex-1 overflow-y-auto p-8">
//                 {activeTab === "details" && (
//                   <div className="space-y-8">
//                     {/* JOB INFO */}
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-3">
//                           <div className="p-3 bg-indigo-100 rounded-xl">
//                             <Layers className="text-indigo-600" size={24} />
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-600">Experience Required</p>
//                             <p className="font-semibold">{selectedJob.experience || "N/A"} years</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-3">
//                           <div className="p-3 bg-purple-100 rounded-xl">
//                             <Calendar className="text-purple-600" size={24} />
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-600">Application Period</p>
//                             <p className="font-semibold">
//                               {format(new Date(selectedJob.startDate), "MMM d")} - {format(new Date(selectedJob.endDate), "MMM d, yyyy")}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="space-y-4">
//                         <div className="flex items-center gap-3">
//                           <div className="p-3 bg-emerald-100 rounded-xl">
//                             <Users className="text-emerald-600" size={24} />
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-600">Job Type</p>
//                             <p className="font-semibold">{selectedJob.type}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-3">
//                           <div className="p-3 bg-amber-100 rounded-xl">
//                             <TrendingUp className="text-amber-600" size={24} />
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-600">Status</p>
//                             <p className={`font-semibold px-3 py-1 rounded-full inline-block ${getJobStatusColor(selectedJob.status)}`}>
//                               {selectedJob.status}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* DESCRIPTION */}
//                     <div>
//                       <h3 className="text-xl font-bold mb-4">Job Description</h3>
//                       <div className="prose max-w-none">
//                         <p className="text-gray-700">{selectedJob.description || "No description provided."}</p>
//                       </div>
//                     </div>

//                     {/* SKILLS */}
//                     <div>
//                       <h3 className="text-xl font-bold mb-4">Required Skills</h3>
//                       <div className="flex flex-wrap gap-3">
//                         {selectedJob.skills?.length > 0 ? (
//                           selectedJob.skills.map((skill, i) => (
//                             <span
//                               key={i}
//                               className="px-5 py-2.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-xl font-medium"
//                             >
//                               {skill}
//                             </span>
//                           ))
//                         ) : (
//                           <span className="text-gray-500">No skills listed.</span>
//                         )}
//                       </div>
//                     </div>

//                     {/* ACTIONS */}
//                     <div className="flex gap-4 pt-6 border-t border-gray-200">
//                       <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
//                         Edit Job
//                       </button>
//                       <button
//                         onClick={() => runAIAnalysis(selectedJob._id)}
//                         className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold flex items-center gap-2"
//                       >
//                         <Sparkles size={20} />
//                         AI Analysis
//                       </button>
//                       <button
//                         onClick={() => handleDeleteJob(selectedJob._id)}
//                         className="px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-semibold"
//                       >
//                         Delete Job
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "ai-analysis" && (
//                   <div className="space-y-6">
//                     {/* AI ANALYSIS HEADER */}
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Candidate Analysis</h3>
//                         <p className="text-gray-600">AI-powered ranking and insights for applicants</p>
//                       </div>
//                       <button
//                         onClick={() => runAIAnalysis(selectedJob._id)}
//                         disabled={aiLoading}
//                         className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
//                       >
//                         {aiLoading ? (
//                           <>
//                             <Loader2 className="animate-spin" size={20} />
//                             Analyzing...
//                           </>
//                         ) : (
//                           <>
//                             <RefreshCw size={20} />
//                             Re-analyze
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     {aiLoading && (
//                       <div className="text-center py-12">
//                         <div className="inline-block p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl mb-4">
//                           <Brain className="text-indigo-600 animate-pulse" size={48} />
//                         </div>
//                         <h4 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis in Progress</h4>
//                         <p className="text-gray-600">Analyzing candidates with machine learning algorithms...</p>
//                       </div>
//                     )}

//                     {aiError && (
//                       <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="p-2 bg-red-100 rounded-lg">
//                             <X className="text-red-600" size={24} />
//                           </div>
//                           <h4 className="text-lg font-semibold text-red-800">Analysis Failed</h4>
//                         </div>
//                         <p className="text-red-700">{aiError}</p>
//                       </div>
//                     )}

//                     {aiResult && (
//                       <div className="space-y-6">
//                         {/* AI INSIGHTS SUMMARY */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
//                           <div className="flex items-center gap-3 mb-4">
//                             <Brain className="text-indigo-600" size={24} />
//                             <h4 className="text-lg font-semibold text-indigo-900">AI Insights Summary</h4>
//                           </div>
//                           <div className="grid md:grid-cols-3 gap-4">
//                             <div className="bg-white rounded-xl p-4 shadow-sm">
//                               <p className="text-sm text-gray-600">Top Candidate Score</p>
//                               <p className="text-2xl font-bold text-gray-900">{aiResult[0]?.score || 0}/100</p>
//                             </div>
//                             <div className="bg-white rounded-xl p-4 shadow-sm">
//                               <p className="text-sm text-gray-600">Avg Match Score</p>
//                               <p className="text-2xl font-bold text-gray-900">
//                                 {Math.round(aiResult.reduce((acc, c) => acc + (c.score || 0), 0) / aiResult.length)}/100
//                               </p>
//                             </div>
//                             <div className="bg-white rounded-xl p-4 shadow-sm">
//                               <p className="text-sm text-gray-600">Recommended to Hire</p>
//                               <p className="text-2xl font-bold text-gray-900">{aiResult.filter(c => c.score >= 80).length} candidates</p>
//                             </div>
//                           </div>
//                         </div>

//                         {/* CANDIDATE LIST */}
//                         <div className="space-y-4">
//                           {aiResult.map((candidate, i) => (
//                             <motion.div
//                               key={candidate.email || i}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ delay: i * 0.05 }}
//                               className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
//                             >
//                               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                                 <div className="flex items-start gap-4">
//                                   <div className="relative">
//                                     <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
//                                       {candidate.name?.charAt(0) || "C"}
//                                     </div>
//                                     <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                                       #{i + 1}
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h4 className="text-xl font-bold text-gray-900">{candidate.name}</h4>
//                                     <p className="text-gray-600">{candidate.email}</p>
//                                     <div className="flex items-center gap-3 mt-2">
//                                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.applicationStatus)}`}>
//                                         {getStatusLabel(candidate.applicationStatus)}
//                                       </span>
//                                       <span className="text-sm text-gray-500">
//                                         Applied {format(new Date(candidate.appliedDate), "MMM d")}
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>
                                
//                                 <div className="flex flex-col items-end">
//                                   <div className="text-3xl font-bold text-gray-900 mb-2">{candidate.score || 0}/100</div>
//                                   <div className="flex items-center gap-1">
//                                     {[...Array(5)].map((_, starIndex) => (
//                                       <Star
//                                         key={starIndex}
//                                         size={16}
//                                         className={`${
//                                           starIndex < Math.floor((candidate.score || 0) / 20)
//                                             ? "text-amber-500 fill-amber-500"
//                                             : "text-gray-300"
//                                         }`}
//                                       />
//                                     ))}
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="grid md:grid-cols-2 gap-6 mb-6">
//                                 <div>
//                                   <div className="flex items-center gap-2 mb-2">
//                                     <Award className="text-emerald-600" size={18} />
//                                     <h5 className="font-semibold text-gray-900">Strengths</h5>
//                                   </div>
//                                   <p className="text-gray-700">{candidate.strengths}</p>
//                                 </div>
//                                 <div>
//                                   <div className="flex items-center gap-2 mb-2">
//                                     <Target className="text-amber-600" size={18} />
//                                     <h5 className="font-semibold text-gray-900">Areas for Improvement</h5>
//                                   </div>
//                                   <p className="text-gray-700">{candidate.weaknesses}</p>
//                                 </div>
//                               </div>

//                               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-200">
//                                 <div className="flex items-center gap-3">
//                                   <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-xl font-medium">
//                                     {candidate.finalVerdict}
//                                   </span>
//                                   <span className="text-sm text-gray-600">
//                                     Match: <span className="font-semibold">{candidate.matchScore || 0}%</span>
//                                   </span>
//                                 </div>
                                
//                                 <div className="flex gap-3">
//                                   <Link
//                                     href={`/profile?email=${encodeURIComponent(candidate.email)}`}
//                                     target="_blank"
//                                     className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium flex items-center gap-2"
//                                   >
//                                     <User size={18} />
//                                     View Profile
//                                   </Link>
                                  
//                                   <div className="relative">
//                                     <select
//                                       disabled={updatingStatuses[candidate.email]}
//                                       onChange={(e) => {
//                                         // Status change handler
//                                       }}
//                                       value={candidate.applicationStatus}
//                                       className="appearance-none px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-medium cursor-pointer pr-10 focus:outline-none disabled:opacity-50"
//                                     >
//                                       {/* <option className="text-blue-600"  value="pending">Pending</option> */}
//                                       <option className="text-blue-600" value="shortlisted">Shortlist</option>
//                                       <option className="text-blue-600" value="rejected">Reject</option>
//                                     </select>
//                                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={18} />
//                                   </div>
//                                 </div>
//                               </div>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }