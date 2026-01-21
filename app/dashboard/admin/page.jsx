// "use client";

// import { useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Briefcase, Users, PlusCircle, TrendingUp, Edit2, Trash2, Search,
//   Building2, Calendar, Layers, CheckCircle, MapPin, Check,
//   X, Eye, Sparkles, Tag, Star
// } from "lucide-react";

// export default function Dashboard() {
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
//   const [selectedJob, setSelectedJob] = useState(null);

//   // Form States
//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [experience, setExperience] = useState("");
//   const [statusField, setStatusField] = useState("Open");
//   const [jobType, setJobType] = useState("Remote");
//   const [skills, setSkills] = useState([]);
//   const [skillInput, setSkillInput] = useState("");
//   const [featured, setFeatured] = useState(false);

//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => setJobs(data));
//   }, []);

//   const addSkill = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const val = skillInput.trim();
//       if (val && !skills.includes(val)) {
//         setSkills([...skills, val]);
//         setSkillInput("");
//       }
//     }
//   };

//   const removeSkill = (index) => {
//     setSkills(skills.filter((_, i) => i !== index));
//   };

//   const handleAddJob = async () => {
//     if (!title || !company || !location) {
//       alert("Please fill in required fields: Title, Company, Location");
//       return;
//     }

//     const res = await fetch("/api/jobs", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         company,
//         location,
//         salary: salary || null,
//         description: description || null,
//         startDate: startDate || null,
//         endDate: endDate || null,
//         experience: experience ? Number(experience) : null,
//         status: statusField,
//         type: jobType,
//         skills,
//         featured,
//       }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       setJobs((prev) => [data, ...prev]);
//       resetForm();
//       setSuccessMsg("Job added successfully!");
//       setTimeout(() => setSuccessMsg(""), 5000);
//     }
//   };

//   const resetForm = () => {
//     setTitle(""); setCompany(""); setLocation(""); setSalary(""); setDescription("");
//     setStartDate(""); setEndDate(""); setExperience(""); setStatusField("Open");
//     setJobType("Remote"); setSkills([]); setSkillInput(""); setFeatured(false);
//   };

//   const handleDeleteJob = async (id) => {
//     if (!confirm("Are you sure you want to delete this job?")) return;
//     const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
//     if (res.ok) {
//       setJobs((prev) => prev.filter((j) => j._id !== id));
//       setSelectedJob(null);
//     }
//   };

//   const filteredJobs = jobs.filter((job) =>
//     `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
//         <div className="flex flex-col items-center gap-8">
//           <div className="w-24 h-24 border-8 border-t-indigo-600 border-r-purple-600 border-b-pink-600 border-l-transparent rounded-full animate-spin"></div>
//           <p className="text-indigo-700 text-2xl font-semibold">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!session || session.user.role === "user") return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

//         {/* Success Toast */}
//         {successMsg && (
//           <div className="fixed top-8 right-4 sm:right-8 z-50 animate-in slide-in-from-top-4 duration-500">
//             <div className="flex items-center gap-4 bg-white border-2 border-green-500 px-6 py-4 rounded-2xl shadow-2xl">
//               <Check size={32} className="text-green-600" />
//               <span className="text-gray-900 font-bold text-lg">{successMsg}</span>
//               <button onClick={() => setSuccessMsg("")} className="ml-4 text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="mb-12 text-center sm:text-left">
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-600 mt-3 text-lg lg:text-xl">Manage job opportunities with precision and style</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           <StatCard title="Total Jobs" value={jobs.length} icon={<Briefcase size={28} />} color="from-indigo-500 to-blue-600" />
//           <StatCard title="Active Jobs" value={jobs.filter(j => j.status === "Open").length} icon={<TrendingUp size={28} />} color="from-emerald-500 to-teal-600" />
//           <StatCard title="Remote Positions" value={jobs.filter(j => j.type === "Remote").length} icon={<Users size={28} />} color="from-purple-500 to-pink-600" />
//           <StatCard title="Featured" value={jobs.filter(j => j.featured).length} icon={<Star size={28} />} color="from-yellow-500 to-orange-600" />
//         </div>

//         {/* Create Job Form */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12 mb-12">
//           <div className="flex items-center gap-5 mb-10">
//             <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
//               <PlusCircle size={36} className="text-white" />
//             </div>
//             <h2 className="text-4xl font-bold text-gray-900">Create New Job</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <Input label="Job Title *" value={title} onChange={setTitle} icon={<Briefcase size={22} />} />
//             <Input label="Company *" value={company} onChange={setCompany} icon={<Building2 size={22} />} />
//             <Input label="Location *" value={location} onChange={setLocation} icon={<MapPin size={22} />} />
//             <Input label="Salary Range" value={salary} onChange={setSalary} placeholder="e.g. $120k – $180k" />
//             <Input label="Experience (years)" value={experience} onChange={setExperience} type="number" icon={<Layers size={22} />} />
//             <Input type="date" label="Start Date" value={startDate} onChange={setStartDate} icon={<Calendar size={22} />} />
//             <Input type="date" label="Application Deadline" value={endDate} onChange={setEndDate} icon={<Calendar size={22} />} />

//             <Select label="Status" value={statusField} onChange={setStatusField} icon={<CheckCircle size={22} />}>
//               <option>Open</option>
//               <option>Closed</option>
//               <option>Draft</option>
//             </Select>

//             <Select label="Job Type" value={jobType} onChange={setJobType}>
//               <option>Remote</option>
//               <option>Hybrid</option>
//               <option>Onsite</option>
//             </Select>

//             {/* Skills */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Required Skills</label>
//               <div className="relative">
//                 <Tag className="absolute left-5 top-5 text-gray-500" size={22} />
//                 <input
//                   type="text"
//                   value={skillInput}
//                   onChange={(e) => setSkillInput(e.target.value)}
//                   onKeyDown={addSkill}
//                   placeholder="Type a skill and press Enter..."
//                   className="w-full pl-14 pr-6 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all"
//                 />
//               </div>
//               <div className="flex flex-wrap gap-3 mt-4">
//                 {skills.map((skill, i) => (
//                   <span key={i} className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-full text-sm font-medium shadow-lg">
//                     {skill}
//                     <button onClick={() => removeSkill(i)} className="hover:bg-white/20 rounded-full p-1 transition">
//                       <X size={16} />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Featured Toggle */}
//             <div className="md:col-span-2 flex items-center gap-6">
//               <label className="text-gray-700 font-semibold text-lg">Mark as Featured</label>
//               <button
//                 onClick={() => setFeatured(!featured)}
//                 className={`relative w-16 h-9 rounded-full transition-all ${featured ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-300"} shadow-inner`}
//               >
//                 <span className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md transition-transform ${featured ? "translate-x-7" : ""}`} />
//               </button>
//               {featured && <Sparkles className="text-yellow-500 animate-pulse" size={28} />}
//             </div>

//             {/* Description */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Job Description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={8}
//                 placeholder="Provide a detailed description of the role, responsibilities, qualifications..."
//                 className="w-full p-6 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none resize-none transition-all"
//               />
//             </div>
//           </div>

//           <div className="mt-10 text-center">
//             <button
//               onClick={handleAddJob}
//               className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
//             >
//               Launch Job Listing 🚀
//             </button>
//           </div>
//         </div>

//         {/* Jobs Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
//           <div className="p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-gray-100">
//             <h3 className="text-3xl font-bold text-gray-900">Job Listings</h3>
//             <div className="relative w-full lg:w-96">
//               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
//               <input
//                 placeholder="Search by title, company, location, or skills..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-14 pr-6 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50/70">
//                 <tr className="text-left text-gray-600 text-sm font-bold uppercase tracking-wider">
//                   <Th>Job Title</Th>
//                   <Th>Company</Th>
//                   <Th>Type</Th>
//                   <Th>Status</Th>
//                   <Th>Featured</Th>
//                   <Th className="text-center">Actions</Th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredJobs.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="py-24 text-center">
//                       <div className="flex flex-col items-center gap-6">
//                         <div className="w-24 h-24 rounded-3xl bg-gray-100 flex items-center justify-center">
//                           <Briefcase className="text-gray-400" size={48} />
//                         </div>
//                         <p className="text-gray-500 text-xl font-medium">No jobs found matching your search</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredJobs.map((job) => (
//                     <tr key={job._id} className="hover:bg-gray-50/50 transition-all duration-200">
//                       <Td><span className="font-semibold text-gray-900 text-lg">{job.title}</span></Td>
//                       <Td className="text-gray-700">{job.company}</Td>
//                       <Td><Badge text={job.type} type={job.type} /></Td>
//                       <Td><Badge text={job.status} type={job.status} /></Td>
//                       <Td className="text-center">{job.featured ? <Star className="text-yellow-500 fill-yellow-500 inline" size={24} /> : "—"}</Td>
//                       <Td>
//                         <div className="flex justify-center gap-4">
//                           <ActionBtn icon={<Eye size={20} />} onClick={() => setSelectedJob(job)} />
//                           <ActionBtn icon={<Edit2 size={20} />} onClick={() => router.push(`/dashboard/jobs/${job._id}/edit`)} />
//                           <ActionBtn icon={<Trash2 size={20} />} danger onClick={() => handleDeleteJob(job._id)} />
//                         </div>
//                       </Td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Job Detail Modal */}
//         {selectedJob && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md" onClick={() => setSelectedJob(null)}>
//             <div className="bg-white rounded-3xl shadow-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden border border-gray-100" onClick={(e) => e.stopPropagation()}>
//               <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 flex justify-between items-start text-white">
//                 <div className="flex items-center gap-6">
//                   <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl font-bold shadow-xl">
//                     {selectedJob.company.charAt(0)}
//                   </div>
//                   <div>
//                     <h2 className="text-4xl font-bold">{selectedJob.title}</h2>
//                     <p className="text-indigo-100 text-xl mt-1">{selectedJob.company} • {selectedJob.location}</p>
//                   </div>
//                 </div>
//                 <button onClick={() => setSelectedJob(null)} className="p-3 hover:bg-white/20 rounded-2xl transition">
//                   <X size={32} />
//                 </button>
//               </div>

//               <div className="p-8 lg:p-12 space-y-10 overflow-y-auto max-h-[calc(92vh-160px)]">
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {selectedJob.salary && <Detail label="Salary" value={selectedJob.salary} color="text-emerald-600" />}
//                   <Detail label="Type" value={selectedJob.type} color="text-indigo-600" />
//                   <Detail label="Status" value={selectedJob.status} color={selectedJob.status === "Open" ? "text-emerald-600" : "text-red-600"} />
//                   {selectedJob.experience && <Detail label="Experience" value={`${selectedJob.experience} years`} color="text-purple-600" />}
//                   {selectedJob.startDate && <Detail label="Start Date" value={new Date(selectedJob.startDate).toLocaleDateString()} color="text-pink-600" />}
//                   {selectedJob.endDate && <Detail label="Deadline" value={new Date(selectedJob.endDate).toLocaleDateString()} color="text-orange-600" />}
//                 </div>

//                 {selectedJob.skills?.length > 0 && (
//                   <div>
//                     <h3 className="text-2xl font-bold mb-5 flex items-center gap-3 text-gray-800">
//                       <Tag size={28} className="text-indigo-600" /> Required Skills
//                     </h3>
//                     <div className="flex flex-wrap gap-4">
//                       {selectedJob.skills.map((skill, i) => (
//                         <span key={i} className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full border border-indigo-300 font-medium">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {selectedJob.description && (
//                   <div className="bg-gray-50/70 rounded-3xl p-8 border border-gray-200">
//                     <h3 className="text-2xl font-bold mb-5 text-gray-800">Job Description</h3>
//                     <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{selectedJob.description}</p>
//                   </div>
//                 )}

//                 <div className="flex flex-col sm:flex-row gap-6 pt-8">
//                   <button
//                     onClick={() => { router.push(`/dashboard/jobs/${selectedJob._id}/edit`); setSelectedJob(null); }}
//                     className="flex-1 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl"
//                   >
//                     Edit Job Listing
//                   </button>
//                   <button
//                     onClick={() => { handleDeleteJob(selectedJob._id); setSelectedJob(null); }}
//                     className="flex-1 py-5 bg-red-50 border-2 border-red-500 text-red-600 text-lg font-bold rounded-2xl hover:bg-red-100 transition-all"
//                   >
//                     Delete Job
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* Reusable Components - Enhanced */

// function StatCard({ title, value, icon, color }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
//       <div className="flex justify-between items-start mb-6">
//         <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
//           {icon}
//         </div>
//         <Sparkles className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
//       </div>
//       <p className="text-gray-600 text-base">{title}</p>
//       <p className="text-5xl font-extrabold text-gray-900 mt-2">{value}</p>
//     </div>
//   );
// }

// function Input({ label, value, onChange, icon, type = "text", placeholder }) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
//       <div className="relative">
//         {icon && <div className="absolute left-5 top-5 text-gray-500">{icon}</div>}
//         <input
//           type={type}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder={placeholder || label}
//           className={`w-full ${icon ? 'pl-14' : 'pl-6'} pr-6 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all`}
//         />
//       </div>
//     </div>
//   );
// }

// function Select({ label, value, onChange, children, icon }) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
//       <div className="relative">
//         {icon && <div className="absolute left-5 top-5 text-gray-500 z-10">{icon}</div>}
//         <select
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className={`w-full ${icon ? 'pl-14' : 'pl-6'} pr-14 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer`}
//         >
//           {children}
//         </select>
//         <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
//           <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 1L8 11L15 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Badge({ text, type }) {
//   const styles = {
//     Remote: "bg-emerald-100 text-emerald-700 border-emerald-300",
//     Hybrid: "bg-blue-100 text-blue-700 border-blue-300",
//     Onsite: "bg-orange-100 text-orange-700 border-orange-300",
//     Open: "bg-emerald-100 text-emerald-700 border-emerald-300",
//     Closed: "bg-red-100 text-red-700 border-red-300",
//     Draft: "bg-gray-100 text-gray-700 border-gray-300",
//   };
//   return <span className={`px-5 py-2.5 rounded-full text-sm font-bold border ${styles[type] || styles.Draft}`}>{text}</span>;
// }

// function Th({ children }) {
//   return <th className="px-8 py-6 text-left first:pl-12">{children}</th>;
// }

// function Td({ children }) {
//   return <td className="px-8 py-7 text-gray-700 first:pl-12">{children}</td>;
// }

// function ActionBtn({ icon, danger, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`p-4 rounded-2xl transition-all hover:scale-110 shadow-md ${danger ? "bg-red-100 hover:bg-red-200 text-red-600" : "bg-indigo-100 hover:bg-indigo-200 text-indigo-600"}`}
//     >
//       {icon}
//     </button>
//   );
// }

// function Detail({ label, value, color }) {
//   return (
//     <div className="bg-gray-50/70 rounded-2xl p-6 border border-gray-200">
//       <p className="text-gray-600 text-sm font-medium">{label}</p>
//       <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
//     </div>
//   );
// }



"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase, Users, PlusCircle, TrendingUp, Edit2, Trash2, Search,
  Building2, Calendar, Layers, CheckCircle, MapPin, Check,
  X, Eye, Sparkles, Tag, Star, AlertCircle
} from "lucide-react";

export default function Dashboard() {
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
  const [selectedJob, setSelectedJob] = useState(null);

  // Form States
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [experience, setExperience] = useState("");
  const [statusField, setStatusField] = useState("Open");
  const [jobType, setJobType] = useState("Remote");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [featured, setFeatured] = useState(false);

  // Validation Errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);


 const addSkill = (e) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    const val = skillInput.trim();
    if (val && !skills.includes(val)) {
      setSkills([...skills, val]);
      setSkillInput("");
      // This clears the red error message visually
      setErrors((prev) => ({ ...prev, skills: undefined }));
    }
  }
};

  // const removeSkill = (index) => {
  //   setSkills(skills.filter((_, i) => i !== index));
  // };
  const removeSkill = (index) => {
  const newSkills = skills.filter((_, i) => i !== index);
  setSkills(newSkills);

  // If no skills left → show error immediately
  // if (newSkills.length === 0) {
  //   setErrors((prev) => ({ ...prev, skills: "At least one skill is required" }));
  // } else {
  //   // If skills exist → clear error
  //   setErrors((prev) => ({ ...prev, skills: undefined }));
  // }
};

  // Validation Function
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Job title is required";
    if (!company.trim()) newErrors.company = "Company name is required";
    if (!location.trim()) newErrors.location = "Location is required";

    if (salary && !/^(\$\d+[kK]?|\d+)( ?[-–] ?(\$\d+[kK]?|\d+))?$/.test(salary.trim())) {
      newErrors.salary = "Invalid salary format (e.g., $120k – $180k or 120000-180000)";
    }

    if (experience && (isNaN(experience) || Number(experience) < 0)) {
      newErrors.experience = "Experience must be a positive number";
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.dates = "Start date cannot be after application deadline";
    }

    // if (skills.length === 0) {
    //   newErrors.skills = "At least one skill is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleAddJob = async () => {
  //   if (!validateForm()) return;

  //   const res = await fetch("/api/jobs", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       title: title.trim(),
  //       company: company.trim(),
  //       location: location.trim(),
  //       salary: salary.trim() || null,
  //       description: description.trim() || null,
  //       startDate: startDate || null,
  //       endDate: endDate || null,
  //       experience: experience ? Number(experience) : null,
  //       status: statusField,
  //       type: jobType,
  //       skills,
  //       featured,
  //     }),
  //   });

  //   if (res.ok) {
  //     const data = await res.json();
  //     setJobs((prev) => [data, ...prev]);
  //     resetForm();
  //     setErrors({});
  //     setSuccessMsg("Job added successfully!");
  //     setTimeout(() => setSuccessMsg(""), 5000);
  //   } else {
  //     const error = await res.json();
  //     alert(error.message || "Failed to add job");
  //   }
  // };
  const handleAddJob = async () => {
  // Create a current snapshot of skills (including any pending additions)
  const currentSkills = skills;

  // Run validation with the latest skills
  const newErrors = {};

  if (!title.trim()) newErrors.title = "Job title is required";
  if (!company.trim()) newErrors.company = "Company name is required";
  if (!location.trim()) newErrors.location = "Location is required";

  if (salary && !/^(\$\d+[kK]?|\d+)( ?[-–] ?(\$\d+[kK]?|\d+))?$/.test(salary.trim())) {
    newErrors.salary = "Invalid salary format (e.g., $120k – $180k or 120000-180000)";
  }

  if (experience && (isNaN(experience) || Number(experience) < 0)) {
    newErrors.experience = "Experience must be a positive number";
  }

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    newErrors.dates = "Start date cannot be after application deadline";
  }

  // if (currentSkills.length === 0) {
  //   newErrors.skills = "At least one skill is required";
  // }

  setErrors(newErrors);

  // If there are errors, stop here
  if (Object.keys(newErrors).length > 0) {
    return;
  }

  // Only proceed if validation passed
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      salary: salary.trim() || null,
      description: description.trim() || null,
      startDate: startDate || null,
      endDate: endDate || null,
      experience: experience ? Number(experience) : null,
      status: statusField,
      type: jobType,
      skills: currentSkills,  // Use currentSkills here too
      featured,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    setJobs((prev) => [data, ...prev]);
    resetForm();
    setSuccessMsg("Job added successfully!");
    setTimeout(() => setSuccessMsg(""), 5000);
  } else {
    const error = await res.json();
    alert(error.message || "Failed to add job");
  }
};

  const resetForm = () => {
    setTitle(""); setCompany(""); setLocation(""); setSalary(""); setDescription("");
    setStartDate(""); setEndDate(""); setExperience(""); setStatusField("Open");
    setJobType("Remote"); setSkills([]); setSkillInput(""); setFeatured(false);
    setErrors({});
  };

  const handleDeleteJob = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j._id !== id));
      setSelectedJob(null);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-8">
          <div className="w-24 h-24 border-8 border-t-indigo-600 border-r-purple-600 border-b-pink-600 border-l-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-700 text-2xl font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role === "user") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Success Toast */}
        {successMsg && (
          <div className="fixed top-8 right-4 sm:right-8 z-50 animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-4 bg-white border-2 border-green-500 px-6 py-4 rounded-2xl shadow-2xl">
              <Check size={32} className="text-green-600" />
              <span className="text-gray-900 font-bold text-lg">{successMsg}</span>
              <button onClick={() => setSuccessMsg("")} className="ml-4 text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-3 text-lg lg:text-xl">Manage job opportunities with precision and style</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Jobs" value={jobs.length} icon={<Briefcase size={28} />} color="from-indigo-500 to-blue-600" />
          <StatCard title="Active Jobs" value={jobs.filter(j => j.status === "Open").length} icon={<TrendingUp size={28} />} color="from-emerald-500 to-teal-600" />
          <StatCard title="Remote Positions" value={jobs.filter(j => j.type === "Remote").length} icon={<Users size={28} />} color="from-purple-500 to-pink-600" />
          <StatCard title="Featured" value={jobs.filter(j => j.featured).length} icon={<Star size={28} />} color="from-yellow-500 to-orange-600" />
        </div>

        {/* Create Job Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12 mb-12">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
              <PlusCircle size={36} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Create New Job</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Input label="Job Title *" value={title} onChange={setTitle} icon={<Briefcase size={22} />} />
              {errors.title && <ErrorMessage message={errors.title} />}
            </div>

            <div>
              <Input label="Company *" value={company} onChange={setCompany} icon={<Building2 size={22} />} />
              {errors.company && <ErrorMessage message={errors.company} />}
            </div>

            <div>
              <Input label="Location *" value={location} onChange={setLocation} icon={<MapPin size={22} />} />
              {errors.location && <ErrorMessage message={errors.location} />}
            </div>

            <div>
              <Input label="Salary Range" value={salary} onChange={setSalary} placeholder="e.g. 120k – 180k" />
              {errors.salary && <ErrorMessage message={errors.salary} />}
            </div>

            <div>
              <Input label="Experience (years)" value={experience} onChange={setExperience} type="number" icon={<Layers size={22} />} />
              {errors.experience && <ErrorMessage message={errors.experience} />}
            </div>

            <Input type="date" label="Start Date" value={startDate} onChange={setStartDate} icon={<Calendar size={22} />} />
            <Input type="date" label="Application Deadline" value={endDate} onChange={setEndDate} icon={<Calendar size={22} />} />

            {errors.dates && <div className="md:col-span-2"><ErrorMessage message={errors.dates} /></div>}

            <Select label="Status" value={statusField} onChange={setStatusField} icon={<CheckCircle size={22} />}>
              <option>Open</option>
              <option>Closed</option>
              <option>Draft</option>
            </Select>

            <Select label="Job Type" value={jobType} onChange={setJobType}>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Onsite</option>
            </Select>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Required Skills *</label>
              <div className="relative">
                <Tag className="absolute left-5 top-5 text-gray-500" size={22} />
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="Type a skill and press Enter..."
                  className={`w-full pl-14 pr-6 py-5 bg-gray-50/70 border ${errors.skills ? 'border-red-400' : 'border-gray-200'} rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all`}
                />
              </div>
              {errors.skills && <ErrorMessage message={errors.skills} />}
              <div className="flex flex-wrap gap-3 mt-4">
                {skills.map((skill, i) => (
                  <span key={i} className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-full text-sm font-medium shadow-lg">
                    {skill}
                    <button onClick={() => removeSkill(i)} className="hover:bg-white/20 rounded-full p-1 transition">
                      <X size={16} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="md:col-span-2 flex items-center gap-6">
              <label className="text-gray-700 font-semibold text-lg">Mark as Featured</label>
              <button
                onClick={() => setFeatured(!featured)}
                className={`relative w-16 h-9 rounded-full transition-all ${featured ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-300"} shadow-inner`}
              >
                <span className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md transition-transform ${featured ? "translate-x-7" : ""}`} />
              </button>
              {featured && <Sparkles className="text-yellow-500 animate-pulse" size={28} />}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Job Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                placeholder="Provide a detailed description of the role, responsibilities, qualifications..."
                className="w-full p-6 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none resize-none transition-all"
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={handleAddJob}
              className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              Launch Job Listing 🚀
            </button>
          </div>
        </div>

        {/* Rest of the component (Jobs Table, Modal, etc.) remains unchanged */}
        {/* ... [Previous Jobs Table and Modal code unchanged] ... */}

        {/* Jobs Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900">Job Listings</h3>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
              <input
                placeholder="Search by title, company, location, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/70">
                <tr className="text-left text-gray-600 text-sm font-bold uppercase tracking-wider">
                  <Th>Job Title</Th>
                  <Th>Company</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Featured</Th>
                  <Th className="text-center">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-24 h-24 rounded-3xl bg-gray-100 flex items-center justify-center">
                          <Briefcase className="text-gray-400" size={48} />
                        </div>
                        <p className="text-gray-500 text-xl font-medium">No jobs found matching your search</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50/50 transition-all duration-200">
                      <Td><span className="font-semibold text-gray-900 text-lg">{job.title}</span></Td>
                      <Td className="text-gray-700">{job.company}</Td>
                      <Td><Badge text={job.type} type={job.type} /></Td>
                      <Td><Badge text={job.status} type={job.status} /></Td>
                      <Td className="text-center">{job.featured ? <Star className="text-yellow-500 fill-yellow-500 inline" size={24} /> : "—"}</Td>
                      <Td>
                        <div className="flex justify-center gap-4">
                          <ActionBtn icon={<Eye size={20} />} onClick={() => setSelectedJob(job)} />
                          <ActionBtn icon={<Edit2 size={20} />} onClick={() => router.push(`/dashboard/jobs/${job._id}/edit`)} />
                          <ActionBtn icon={<Trash2 size={20} />} danger onClick={() => handleDeleteJob(job._id)} />
                        </div>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md" onClick={() => setSelectedJob(null)}>
            <div className="bg-white rounded-3xl shadow-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden border border-gray-100" onClick={(e) => e.stopPropagation()}>
              {/* Modal content unchanged */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 flex justify-between items-start text-white">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl font-bold shadow-xl">
                    {selectedJob.company.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold">{selectedJob.title}</h2>
                    <p className="text-indigo-100 text-xl mt-1">{selectedJob.company} • {selectedJob.location}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedJob(null)} className="p-3 hover:bg-white/20 rounded-2xl transition">
                  <X size={32} />
                </button>
              </div>

              <div className="p-8 lg:p-12 space-y-10 overflow-y-auto max-h-[calc(92vh-160px)]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {selectedJob.salary && <Detail label="Salary" value={selectedJob.salary} color="text-emerald-600" />}
                  <Detail label="Type" value={selectedJob.type} color="text-indigo-600" />
                  <Detail label="Status" value={selectedJob.status} color={selectedJob.status === "Open" ? "text-emerald-600" : "text-red-600"} />
                  {selectedJob.experience && <Detail label="Experience" value={`${selectedJob.experience} years`} color="text-purple-600" />}
                  {selectedJob.startDate && <Detail label="Start Date" value={new Date(selectedJob.startDate).toLocaleDateString()} color="text-pink-600" />}
                  {selectedJob.endDate && <Detail label="Deadline" value={new Date(selectedJob.endDate).toLocaleDateString()} color="text-orange-600" />}
                </div>

                {selectedJob.skills?.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-5 flex items-center gap-3 text-gray-800">
                      <Tag size={28} className="text-indigo-600" /> Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {selectedJob.skills.map((skill, i) => (
                        <span key={i} className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full border border-indigo-300 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedJob.description && (
                  <div className="bg-gray-50/70 rounded-3xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold mb-5 text-gray-800">Job Description</h3>
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{selectedJob.description}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-6 pt-8">
                  <button
                    onClick={() => { router.push(`/dashboard/jobs/${selectedJob._id}/edit`); setSelectedJob(null); }}
                    className="flex-1 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl"
                  >
                    Edit Job Listing
                  </button>
                  <button
                    onClick={() => { handleDeleteJob(selectedJob._id); setSelectedJob(null); }}
                    className="flex-1 py-5 bg-red-50 border-2 border-red-500 text-red-600 text-lg font-bold rounded-2xl hover:bg-red-100 transition-all"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Components - Enhanced */

function ErrorMessage({ message }) {
  return (
    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
      <AlertCircle size={16} />
      <span>{message}</span>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <Sparkles className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
      </div>
      <p className="text-gray-600 text-base">{title}</p>
      <p className="text-5xl font-extrabold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

function Input({ label, value, onChange, icon, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-5 top-5 text-gray-500">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || label}
          className={`w-full ${icon ? 'pl-14' : 'pl-6'} pr-6 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all`}
        />
      </div>
    </div>
  );
}

function Select({ label, value, onChange, children, icon }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-5 top-5 text-gray-500 z-10">{icon}</div>}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? 'pl-14' : 'pl-6'} pr-14 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl text-gray-900 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer`}
        >
          {children}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 1L8 11L15 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function Badge({ text, type }) {
  const styles = {
    Remote: "bg-emerald-100 text-emerald-700 border-emerald-300",
    Hybrid: "bg-blue-100 text-blue-700 border-blue-300",
    Onsite: "bg-orange-100 text-orange-700 border-orange-300",
    Open: "bg-emerald-100 text-emerald-700 border-emerald-300",
    Closed: "bg-red-100 text-red-700 border-red-300",
    Draft: "bg-gray-100 text-gray-700 border-gray-300",
  };
  return <span className={`px-5 py-2.5 rounded-full text-sm font-bold border ${styles[type] || styles.Draft}`}>{text}</span>;
}

function Th({ children }) {
  return <th className="px-8 py-6 text-left first:pl-12">{children}</th>;
}

function Td({ children }) {
  return <td className="px-8 py-7 text-gray-700 first:pl-12">{children}</td>;
}

function ActionBtn({ icon, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl transition-all hover:scale-110 shadow-md ${danger ? "bg-red-100 hover:bg-red-200 text-red-600" : "bg-indigo-100 hover:bg-indigo-200 text-indigo-600"}`}
    >
      {icon}
    </button>
  );
}

function Detail({ label, value, color }) {
  return (
    <div className="bg-gray-50/70 rounded-2xl p-6 border border-gray-200">
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}