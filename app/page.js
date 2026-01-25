// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Sparkles,
//   Eye,
// } from "lucide-react";
// import HeroSlider from "./components/HeroSlider";

// export default function HomePage() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch jobs from API
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data.slice(0, 6)); // Show first 6 jobs
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching jobs:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Handle search functionality
//   const handleSearch = () => {
//     let filtered = jobs;

//     // Filter by search term (job title or company)
//     if (search.trim()) {
//       filtered = filtered.filter(
//         (job) =>
//           job.title.toLowerCase().includes(search.toLowerCase()) ||
//           job.company.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Filter by location
//     if (location.trim()) {
//       filtered = filtered.filter((job) =>
//         job.location.toLowerCase().includes(location.toLowerCase())
//       );
//     }

//     setFilteredJobs(filtered);
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // Navigate to job details
//   const handleJobClick = (jobId) => {
//     router.push(`/jobs/${jobId}`);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">

//       <HeroSlider/>
//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         {/* Enhanced gradient background with animated shapes */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50" />
//         <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

//         <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-28 text-center">
//           <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-gradient-to-r from-indigo-100 to-sky-100 text-indigo-700 px-6 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-sm border border-indigo-200/50 hover:shadow-md transition-shadow">
//             <Sparkles size={16} />
//             Modern job search platform
//           </span>

//           <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
//             Find a job that{" "}
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-sky-500 bg-clip-text text-transparent animate-gradient">
//               fits your future
//             </span>
//           </h1>

//           <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-14 leading-relaxed">
//             Explore thousands of verified jobs from top companies. Simple,
//             fast, and built for professionals.
//           </p>

//           {/* SEARCH */}
//           <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 hover:shadow-indigo-100/50 transition-all duration-300">
//             <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
//               <Input
//                 icon={<Search size={20} />}
//                 placeholder="Job title or company"
//                 value={search}
//                 onChange={setSearch}
//                 onKeyPress={handleKeyPress}
//               />
//               <Input
//                 icon={<MapPin size={20} />}
//                 placeholder="Location"
//                 value={location}
//                 onChange={setLocation}
//                 onKeyPress={handleKeyPress}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white px-8 sm:px-10 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group whitespace-nowrap">
//                 Search jobs
//                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>

//           <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
//             <span className="flex items-center gap-1.5">
//               <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
//               Remote positions
//             </span>
//             <span className="flex items-center gap-1.5">
//               <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
//               Full-time & Part-time
//             </span>
//             <span className="flex items-center gap-1.5">
//               <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
//               Top companies
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="py-16 sm:py-24">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 px-6">
//           <Stat icon={<Briefcase size={28} />} value="10k+" label="Jobs" />
//           <Stat icon={<Building2 size={28} />} value="500+" label="Companies" />
//           <Stat icon={<Users size={28} />} value="50k+" label="Candidates" />
//           <Stat icon={<TrendingUp size={28} />} value="95%" label="Success Rate" />
//         </div>
//       </section>

//       {/* CATEGORIES */}
//       <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent" />
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-100/20 rounded-full blur-3xl" />

//         <div className="relative max-w-7xl mx-auto px-6">
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               Popular Categories
//             </h2>
//             <p className="text-slate-600 text-base sm:text-lg">Discover opportunities across different industries</p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//             {[
//               "Technology",
//               "Design",
//               "Marketing",
//               "Business",
//               "Healthcare",
//               "Education",
//               "Science",
//               "Legal",
//             ].map((item) => (
//               <Category key={item} title={item} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURED JOBS SECTION */}
//       <section className="py-16 sm:py-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50/30" />
//         <div className="relative max-w-7xl mx-auto px-6">
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               Featured Opportunities
//             </h2>
//             <p className="text-slate-600 text-base sm:text-lg">Hand-picked jobs from leading companies</p>
//           </div>

//           {loading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-14 h-14 rounded-2xl bg-slate-200" />
//                     <div className="w-20 h-6 bg-slate-200 rounded-full" />
//                   </div>
//                   <div className="h-6 bg-slate-200 rounded mb-2 w-3/4" />
//                   <div className="h-5 bg-slate-200 rounded mb-4 w-1/2" />
//                   <div className="h-4 bg-slate-200 rounded w-1/3" />
//                 </div>
//               ))}
//             </div>
//           ) : filteredJobs.length > 0 ? (
//             <>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredJobs.map((job) => (
//                   <JobCard
//                     key={job._id}
//                     id={job._id}
//                     company={job.company}
//                     title={job.title}
//                     location={job.location}
//                     salary={job.salary}
//                     description={job.description}
//                     onClick={() => handleJobClick(job._id)}
//                   />
//                 ))}
//               </div>

//               <div className="text-center mt-12">
//                 <button
//                   onClick={() => router.push('/jobs')}
//                   className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group">
//                   View all jobs
//                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-16">
//               <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
//                 <Briefcase className="text-slate-400" size={32} />
//               </div>
//               <p className="text-slate-600 text-lg font-medium">No jobs found matching your criteria</p>
//               <p className="text-slate-500 text-sm mt-2">Try adjusting your search filters</p>
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setLocation("");
//                   setFilteredJobs(jobs.slice(0, 6));
//                 }}
//                 className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
//                 Clear filters
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 sm:py-32">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 p-12 sm:p-16 text-white shadow-2xl overflow-hidden group">
//             <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

//             <div className="relative">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
//                 Ready to take the next step?
//               </h2>
//               <p className="text-white/90 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
//                 Join thousands of professionals who found their dream job.
//               </p>
//               <button
//                 onClick={() => router.push('/jobs')}
//                 className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group">
//                 Browse Jobs <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ---------- COMPONENTS ---------- */

// function Input({ icon, placeholder, value, onChange, onKeyPress }) {
//   return (
//     <div className="relative flex-1 group">
//       <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
//         {icon}
//       </div>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onKeyPress={onKeyPress}
//         placeholder={placeholder}
//         className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 placeholder:text-slate-400 font-medium text-sm sm:text-base"
//       />
//     </div>
//   );
// }

// function Stat({ icon, value, label }) {
//   return (
//     <div className="relative group bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 text-center border border-slate-200/50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="relative flex justify-center text-indigo-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
//         {icon}
//       </div>
//       <p className="relative text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{value}</p>
//       <p className="relative text-slate-500 text-xs sm:text-sm font-medium mt-1">{label}</p>
//     </div>
//   );
// }

// function Category({ title }) {
//   return (
//     <div className="group relative bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-6 sm:p-8 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="relative">
//         <h3 className="font-bold text-lg sm:text-xl mb-2 group-hover:text-indigo-600 transition-colors duration-300">
//           {title}
//         </h3>
//         <p className="text-slate-500 text-xs sm:text-sm">Explore opportunities</p>
//         <ArrowRight className="mt-3 sm:mt-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all duration-300" size={20} />
//       </div>
//     </div>
//   );
// }

// function JobCard({ id, company, title, location, salary, description, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="group relative bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//       <div className="relative">
//         <div className="flex items-start justify-between mb-4">
//           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
//             {company.charAt(0)}
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
//               Featured
//             </span>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onClick();
//               }}
//               className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-100 transition-all duration-300 group/btn"
//               title="View details">
//               <Eye size={18} className="text-slate-600 group-hover/btn:text-indigo-600" />
//             </button>
//           </div>
//         </div>

//         <h3 className="font-bold text-xl mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">
//           {title}
//         </h3>
//         <p className="text-slate-600 font-medium mb-4">{company}</p>

//         <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
//           <span className="flex items-center gap-1.5">
//             <MapPin size={16} />
//             {location}
//           </span>
//         </div>

//         {description && (
//           <p className="text-sm text-slate-500 mb-4 line-clamp-2">
//             {description}
//           </p>
//         )}

//         <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//           <span className="font-bold text-indigo-600">PKR {salary || "Competitive"}</span>
//           <ArrowRight className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={20} />
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Sparkles,
//   Eye,
//   Zap,
//   Clock,
//   Home,
// } from "lucide-react";
// import HeroSlider from "./components/HeroSlider";
// import { motion, useInView } from "framer-motion";

// export default function HomePage() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const statsRef = useRef(null);
//   const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data.slice(0, 6));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching jobs:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Real-time filtering
//   useEffect(() => {
//     let filtered = jobs;

//     if (search.trim()) {
//       filtered = filtered.filter(
//         (job) =>
//           job.title.toLowerCase().includes(search.toLowerCase()) ||
//           job.company.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (location.trim()) {
//       filtered = filtered.filter((job) =>
//         job.location.toLowerCase().includes(location.toLowerCase())
//       );
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter((job) =>
//         job.category?.toLowerCase().includes(selectedCategory.toLowerCase())
//       );
//     }

//     setFilteredJobs(filtered.slice(0, 12)); // Show more on homepage
//   }, [search, location, selectedCategory, jobs]);

//   const handleJobClick = (jobId) => {
//     router.push(`/jobs/${jobId}`);
//   };

//   const categories = [
//     "Technology",
//     "Design",
//     "Marketing",
//     "Business",
//     "Healthcare",
//     "Education",
//     "Engineering",
//     "Finance",
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden">
//       <HeroSlider />

//       {/* HERO SEARCH SECTION */}
//       <section className="relative -mt-32 pt-32 pb-24">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent" />
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative max-w-7xl mx-auto px-6 text-center"
//         >
//           <motion.div
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/80 backdrop-blur-lg px-6 py-3 text-indigo-700 text-sm font-bold shadow-xl border border-white/50"
//           >
//             <Sparkles className="animate-pulse" size={18} />
//             Next-Gen Job Platform
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
//           >
//             Find Your{" "}
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 bg-clip-text text-transparent animate-gradient-x">
//               Dream Career
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-12"
//           >
//             Connect with top companies and land roles that match your skills and ambitions.
//           </motion.p>

//           {/* SEARCH BAR */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="max-w-5xl mx-auto"
//           >
//             <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <Input
//                   icon={<Search size={22} />}
//                   placeholder="Job title, skills or company"
//                   value={search}
//                   onChange={setSearch}
//                 />
//                 <Input
//                   icon={<MapPin size={22} />}
//                   placeholder="City, state or remote"
//                   value={location}
//                   onChange={setLocation}
//                 />
//                 <button
//                   onClick={() => router.push(`/jobs?search=${search}&location=${location}`)}
//                   className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
//                 >
//                   Find Jobs
//                   <Zap size={22} className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>

//             <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
//               <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> 2,500+ Active Jobs</span>
//               <span className="flex items-center gap-2"><Home size={16} /> Remote Friendly</span>
//               <span className="flex items-center gap-2"><Clock size={16} /> Instant Apply</span>
//             </div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* STATS WITH COUNTER ANIMATION */}
//       <section ref={statsRef} className="py-20 bg-white/70 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
//           <CounterStat icon={<Briefcase />} end={12000} label="Jobs Posted" suffix="+" inView={isStatsInView} />
//           <CounterStat icon={<Building2 />} end={850} label="Companies" suffix="+" inView={isStatsInView} />
//           <CounterStat icon={<Users />} end={75000} label="Professionals" suffix="+" inView={isStatsInView} />
//           <CounterStat icon={<TrendingUp />} end={98} label="Success Rate" suffix="%" inView={isStatsInView} />
//         </div>
//       </section>

//       {/* POPULAR CATEGORIES */}
//       <section className="py-20 relative">
//         <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/20 to-transparent" />
//         <div className="relative max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
//               Explore by Category
//             </h2>
//             <p className="text-slate-600 mt-4 text-lg">Find your perfect role in trending industries</p>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {categories.map((cat, i) => (
//               <motion.div
//                 key={cat}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
//                 className={`group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 transition-all duration-500 cursor-pointer hover:scale-105 ${
//                   selectedCategory === cat
//                     ? "border-indigo-500 shadow-2xl ring-4 ring-indigo-200/50"
//                     : "border-transparent shadow-xl hover:border-indigo-300"
//                 }`}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative text-center">
//                   <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//                     {cat[0]}
//                   </div>
//                   <h3 className="font-bold text-lg group-hover:text-indigo-700 transition-colors">{cat}</h3>
//                   <p className="text-slate-500 text-sm mt-1">View jobs →</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {selectedCategory && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center mt-8"
//             >
//               <button
//                 onClick={() => setSelectedCategory("")}
//                 className="text-indigo-600 font-medium hover:underline"
//               >
//                 Clear category filter
//               </button>
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* FEATURED JOBS */}
//       <section className="py-20 bg-gradient-to-b from-transparent to-indigo-50/30">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
//               Featured Opportunities
//             </h2>
//             <p className="text-slate-600 mt-4 text-lg">Curated just for you</p>
//           </motion.div>

//           {loading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[...Array(6)].map((_, i) => (
//                 <ShimmerCard key={i} />
//               ))}
//             </div>
//           ) : filteredJobs.length > 0 ? (
//             <>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredJobs.map((job, i) => (
//                   <motion.div
//                     key={job._id}
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     <JobCard
//                       job={job}
//                       onClick={() => handleJobClick(job._id)}
//                     />
//                   </motion.div>
//                 ))}
//               </div>

//               <div className="text-center mt-16">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => router.push('/jobs')}
//                   className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
//                 >
//                   Explore All Jobs
//                   <ArrowRight size={22} />
//                 </motion.button>
//               </div>
//             </>
//           ) : (
//             <EmptyState onClear={() => {
//               setSearch("");
//               setLocation("");
//               setSelectedCategory("");
//             }} />
//           )}
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section className="py-28 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600" />
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-6xl font-extrabold mb-8"
//           >
//             Start Your Journey Today
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
//           >
//             Join thousands who’ve found meaningful careers through our platform.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <button
//               onClick={() => router.push('/jobs')}
//               className="bg-white text-indigo-700 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-indigo-300 hover:scale-110 transition-all duration-500"
//             >
//               Browse Opportunities →
//             </button>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* REUSABLE COMPONENTS */

// function Input({ icon, placeholder, value, onChange }) {
//   return (
//     <div className="relative group">
//       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-600 transition-colors">
//         {icon}
//       </div>
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/70 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 text-base font-medium placeholder:text-slate-400"
//       />
//     </div>
//   );
// }

// function CounterStat({ icon, end, label, suffix = "", inView }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (inView) {
//       let start = 0;
//       const duration = 2000;
//       const increment = end / (duration / 16);

//       const timer = setInterval(() => {
//         start += increment;
//         if (start > end) {
//           setCount(end);
//           clearInterval(timer);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 16);

//       return () => clearInterval(timer);
//     }
//   }, [inView, end]);

//   return (
//     <div className="text-center group">
//       <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white shadow-xl group-hover:scale-110 transition-transform">
//         {icon}
//       </div>
//       <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
//         {count.toLocaleString()}{suffix}
//       </p>
//       <p className="text-slate-600 font-medium mt-2">{label}</p>
//     </div>
//   );
// }

// function JobCard({ job, onClick }) {
//   return (
//     <motion.div
//       whileHover={{ y: -10 }}
//       onClick={onClick}
//       className="group relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-400 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity" />
//       <div className="relative p-8">
//         <div className="flex items-center justify-between mb-6">
//           <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//             {job.company[0]}
//           </div>
//           <div className="flex gap-2">
//             {job.remote && <Tag text="Remote" color="emerald" />}
//             {job.type === "Full-time" && <Tag text="Full-time" color="blue" />}
//             <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-bold rounded-full">
//               Featured
//             </span>
//           </div>
//         </div>

//         <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2">
//           {job.title}
//         </h3>
//         <p className="text-slate-600 font-semibold mb-4">{job.company}</p>

//         <div className="flex items-center gap-4 text-slate-500 mb-4">
//           <span className="flex items-center gap-2">
//             <MapPin size={18} />
//             {job.location}
//           </span>
//         </div>

//         <p className="text-slate-600 text-sm line-clamp-2 mb-6">{job.description}</p>

//         <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//           <span className="text-xl font-bold text-indigo-600">
//             PKR {job.salary || "Competitive"}
//           </span>
//           <ArrowRight className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" size={24} />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function Tag({ text, color = "indigo" }) {
//   const colors = {
//     emerald: "bg-emerald-100 text-emerald-700",
//     blue: "bg-blue-100 text-blue-700",
//     purple: "bg-purple-100 text-purple-700",
//   };
//   return (
//     <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${colors[color]}`}>
//       {text}
//     </span>
//   );
// }

// function ShimmerCard() {
//   return (
//     <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200 animate-pulse">
//       <div className="flex items-center justify-between mb-6">
//         <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
//         <div className="w-20 h-8 bg-slate-200 rounded-full" />
//       </div>
//       <div className="h-7 bg-slate-200 rounded mb-3 w-4/5" />
//       <div className="h-5 bg-slate-200 rounded mb-4 w-1/2" />
//       <div className="space-y-2">
//         <div className="h-4 bg-slate-200 rounded w-full" />
//         <div className="h-4 bg-slate-200 rounded w-3/4" />
//       </div>
//     </div>
//   );
// }

// function EmptyState({ onClear }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="text-center py-20"
//     >
//       <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
//         <Briefcase size={48} className="text-indigo-600" />
//       </div>
//       <h3 className="text-2xl font-bold text-slate-800 mb-4">No jobs found</h3>
//       <p className="text-slate-600 mb-8 max-w-md mx-auto">
//         Try adjusting your search or category filters to see more opportunities.
//       </p>
//       <button
//         onClick={onClear}
//         className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:scale-105 shadow-xl"
//       >
//         Clear All Filters
//       </button>
//     </motion.div>
//   );
// }

// /* Add to your global CSS or tailwind.config for gradient animation */
// <style jsx global>{`
//   @keyframes gradient-x {
//     0%, 100% { background-position: 0% 50%; }
//     50% { background-position: 100% 50%; }
//   }
//   .animate-gradient-x {
//     background-size: 200% 200%;
//     animation: gradient-x 8s ease infinite;
//   }
// `}</style>



// "use client";

// import { useState, useEffect, useRef, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Clock,
//   Home,
// } from "lucide-react";
// import { motion, useInView } from "framer-motion";
// import HeroSlider from "./components/HeroSlider";

// /* ======================= */
// /* REUSABLE INPUT */
// /* ======================= */
// function Input({ icon, placeholder, value, onChange }) {
//   return (
//     <div className="relative">
//       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
//         {icon}
//       </div>
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-slate-200
//         focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
//       />
//     </div>
//   );
// }

// /* ======================= */
// /* COUNTER */
// /* ======================= */
// function CounterStat({ icon, end, label, suffix = "", inView }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;

//     let start = 0;
//     const duration = 1500;
//     const step = end / (duration / 16);

//     const timer = setInterval(() => {
//       start += step;
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [inView, end]);

//   return (
//     <div className="text-center">
//       <div className="w-16 h-16 mx-auto mb-4 bg-indigo-600 rounded-2xl text-white flex items-center justify-center">
//         {icon}
//       </div>
//       <p className="text-4xl font-extrabold text-indigo-700">
//         {count.toLocaleString()}{suffix}
//       </p>
//       <p className="text-slate-600 font-medium">{label}</p>
//     </div>
//   );
// }

// /* ======================= */
// /* JOB CARD */
// /* ======================= */
// function JobCard({ job, onClick }) {
//   return (
//     <motion.div
//       whileHover={{ y: -8 }}
//       onClick={onClick}
//       className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl cursor-pointer hover:border-indigo-400"
//     >
//       <div className="flex items-center justify-between mb-4">
//         <div className="w-14 h-14 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
//           {job.company?.[0]}
//         </div>
//         {job.remote && (
//           <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full font-bold">
//             Remote
//           </span>
//         )}
//       </div>

//       <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
//       <p className="text-slate-600 font-medium">{job.company}</p>

//       <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
//         <MapPin size={16} />
//         {job.location}
//       </div>

//       <p className="text-sm text-slate-600 mt-3 line-clamp-2">
//         {job.description}
//       </p>

//       <div className="flex justify-between items-center mt-4 pt-4 border-t">
//         <span className="font-bold text-indigo-600">
//           PKR {job.salary || "Competitive"}
//         </span>
//         <ArrowRight className="text-slate-400" />
//       </div>
//     </motion.div>
//   );
// }

// /* ======================= */
// /* HOME PAGE */
// /* ======================= */
// export default function HomePage() {
//   const router = useRouter();

//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(true);

//   const statsRef = useRef(null);
//   const inView = useInView(statsRef, { once: true });

//   /* FETCH JOBS */
//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data.slice(0, 6));
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   /* FILTER */
//   useEffect(() => {
//     let data = [...jobs];

//     if (search)
//       data = data.filter(
//         (j) =>
//           j.title.toLowerCase().includes(search.toLowerCase()) ||
//           j.company.toLowerCase().includes(search.toLowerCase())
//       );

//     if (location)
//       data = data.filter((j) =>
//         j.location.toLowerCase().includes(location.toLowerCase())
//       );

//     if (selectedCategory)
//       data = data.filter((j) => j.category === selectedCategory);

//     setFilteredJobs(data.slice(0, 12));
//   }, [search, location, selectedCategory, jobs]);

//   /* DERIVED DATA */
//   const categories = useMemo(
//     () => [...new Set(jobs.map((j) => j.category).filter(Boolean))],
//     [jobs]
//   );

//   const stats = useMemo(
//     () => ({
//       jobs: jobs.length,
//       companies: new Set(jobs.map((j) => j.company)).size,
//       users: jobs.length * 5,
//       success: 98,
//     }),
//     [jobs]
//   );

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <HeroSlider />

//       {/* HERO */}
//       <section className="py-24 text-center">
//         <h1 className="text-6xl font-extrabold mb-6">
//           Find Your <span className="text-indigo-600">Dream Job</span>
//         </h1>
//         <p className="text-slate-600 mb-10">
//           {jobs.length}+ verified opportunities available
//         </p>

//         <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
//           <Input icon={<Search />} value={search} onChange={setSearch} placeholder="Job title or company" />
//           <Input icon={<MapPin />} value={location} onChange={setLocation} placeholder="Location" />
//           <button
//             onClick={() => router.push(`/jobs?search=${search}&location=${location}`)}
//             className="bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
//           >
//             Find Jobs <Zap />
//           </button>
//         </div>

//         <div className="flex justify-center gap-6 mt-6 text-sm text-slate-600">
//           <span className="flex items-center gap-2"><Home size={14} /> Remote Friendly</span>
//           <span className="flex items-center gap-2"><Clock size={14} /> Instant Apply</span>
//         </div>
//       </section>

//       {/* STATS */}
//       <section ref={statsRef} className="py-20 bg-white">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
//           <CounterStat icon={<Briefcase />} end={stats.jobs} label="Jobs" inView={inView} />
//           <CounterStat icon={<Building2 />} end={stats.companies} label="Companies" inView={inView} />
//           <CounterStat icon={<Users />} end={stats.users} label="Users" inView={inView} />
//           <CounterStat icon={<TrendingUp />} end={stats.success} suffix="%" label="Success" inView={inView} />
//         </div>
//       </section>

//       {/* CATEGORIES */}
//       <section className="py-20">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
//           {categories.map((cat) => (
//             <div
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`cursor-pointer p-6 rounded-2xl text-center font-bold shadow
//                 ${selectedCategory === cat ? "bg-indigo-600 text-white" : "bg-white"}`}
//             >
//               {cat}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* JOBS */}
//       <section className="py-20 bg-indigo-50">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
//           {loading
//             ? Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="h-64 bg-white rounded-3xl animate-pulse" />
//               ))
//             : filteredJobs.map((job) => (
//                 <JobCard key={job._id} job={job} onClick={() => router.push(`/jobs/${job._id}`)} />
//               ))}
//         </div>
//       </section>
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Clock,
//   Star,
//   Filter,
//   Sparkles,
// } from "lucide-react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import HeroSlider from "./components/HeroSlider";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
// };

// const staggerContainer = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1 } },
// };

// /* ======================= */
// /* REUSABLE SEARCH INPUT   */
// /* ======================= */
// function FancyInput({ icon, placeholder, value, onChange, className = "" }) {
//   return (
//     <div className={`relative group ${className}`}>
//       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
//         {icon}
//       </div>
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/70
//           focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 outline-none shadow-sm
//           transition-all duration-300 hover:shadow-md"
//       />
//     </div>
//   );
// }

// /* ======================= */
// /* ANIMATED COUNTER        */
// /* ======================= */
// function CounterStat({ icon, end, label, suffix = "", inView }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const duration = 1800;
//     const step = end / (duration / 16);
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);
//     return () => clearInterval(timer);
//   }, [inView, end]);

//   return (
//     <motion.div
//       variants={fadeInUp}
//       className="text-center group"
//     >
//       <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
//         {icon}
//       </div>
//       <p className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//         {count.toLocaleString()}{suffix}
//       </p>
//       <p className="text-slate-600 font-medium mt-2 group-hover:text-indigo-700 transition-colors">
//         {label}
//       </p>
//     </motion.div>
//   );
// }

// /* ======================= */
// /* MODERN JOB CARD         */
// /* ======================= */
// function JobCard({ job, onClick }) {
//   return (
//     <motion.div
//       whileHover={{ y: -12, scale: 1.02 }}
//       transition={{ type: "spring", stiffness: 400, damping: 17 }}
//       onClick={onClick}
//       className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl hover:border-indigo-200/70 overflow-hidden relative"
//     >
//       {/* Gradient accent line */}
//       <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity" />

//       <div className="flex items-start justify-between mb-5">
//         <div className="flex items-center gap-4">
//           <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md">
//             {job.company?.[0] || "?"}
//           </div>
//           <div>
//             <h3 className="font-bold text-xl text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-1">
//               {job.title}
//             </h3>
//             <p className="text-slate-600 font-medium">{job.company}</p>
//           </div>
//         </div>

//         {job.remote && (
//           <span className="px-4 py-1.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
//             Remote
//           </span>
//         )}
//       </div>

//       <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
//         <MapPin size={18} className="text-indigo-500" />
//         <span>{job.location}</span>
//       </div>

//       <p className="text-slate-600 text-sm line-clamp-2 mb-6 leading-relaxed">
//         {job.description}
//       </p>

//       <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//         <div className="flex items-center gap-2">
//           <span className="font-bold text-xl text-indigo-700">
//             {job.salary ? `PKR ${job.salary.toLocaleString()}` : "Competitive"}
//           </span>
//           {job.salary && <span className="text-sm text-slate-500">/mo</span>}
//         </div>
//         <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
//           View <ArrowRight size={18} />
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// /* ======================= */
// /* MAIN HOMEPAGE           */
// /* ======================= */
// export default function HomePage() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(true);
//   const statsRef = useRef(null);
//   const inView = useInView(statsRef, { once: true, margin: "-100px" });

//   // Fetch jobs
//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data.slice(0, 8));
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   // Filtering logic
//   useEffect(() => {
//     let data = [...jobs];
//     if (search) {
//       const term = search.toLowerCase();
//       data = data.filter(
//         (j) =>
//           j.title.toLowerCase().includes(term) ||
//           j.company.toLowerCase().includes(term) ||
//           (j.skills && j.skills.some(s => s.toLowerCase().includes(term)))
//       );
//     }
//     if (location) {
//       data = data.filter((j) =>
//         j.location.toLowerCase().includes(location.toLowerCase())
//       );
//     }
//     if (selectedCategory) {
//       data = data.filter((j) => j.category === selectedCategory);
//     }
//     setFilteredJobs(data.slice(0, 12));
//   }, [search, location, selectedCategory, jobs]);

//   const categories = useMemo(
//     () => [...new Set(jobs.map((j) => j.category).filter(Boolean))],
//     [jobs]
//   );

//   const stats = useMemo(
//     () => ({
//       jobs: jobs.length,
//       companies: new Set(jobs.map((j) => j.company)).size,
//       users: Math.round(jobs.length * 4.7),
//       success: 98,
//     }),
//     [jobs]
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       <HeroSlider />

//       {/* HERO + SEARCH */}
//       <section className="pt-16 pb-24 px-6">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={staggerContainer}
//           className="text-center max-w-4xl mx-auto"
//         >
//           <motion.h1
//             variants={fadeInUp}
//             className="text-5xl md:text-7xl font-black mb-6 leading-tight"
//           >
//             Discover Your <br />
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Next Opportunity
//             </span>
//           </motion.h1>

//           <motion.p
//             variants={fadeInUp}
//             className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto"
//           >
//             {jobs.length}+ hand-verified jobs waiting for talented people like you
//           </motion.p>

//           <motion.div
//             variants={fadeInUp}
//             className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-white/30"
//           >
//             <FancyInput
//               icon={<Search size={22} />}
//               placeholder="Job title, skill or company"
//               value={search}
//               onChange={setSearch}
//             />
//             <FancyInput
//               icon={<MapPin size={22} />}
//               placeholder="City or Remote"
//               value={location}
//               onChange={setLocation}
//             />
//             <motion.button
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => router.push(`/jobs?search=${search}&location=${location}`)}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
//             >
//               Search Jobs <Zap size={22} />
//             </motion.button>
//           </motion.div>

//           <motion.div
//             variants={fadeInUp}
//             className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-slate-600"
//           >
//             <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-sm">
//               <Sparkles size={16} className="text-yellow-500" /> Featured Jobs Daily
//             </span>
//             <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-sm">
//               <Clock size={16} className="text-indigo-500" /> Instant Apply
//             </span>
//             <span className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-sm">
//               <Star size={16} className="text-amber-500" /> Verified Companies
//             </span>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* STATS SECTION */}
//       <section ref={statsRef} className="py-20 bg-gradient-to-b from-white to-slate-50">
//         <motion.div
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={staggerContainer}
//           className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6"
//         >
//           <CounterStat icon={<Briefcase size={32} />} end={stats.jobs} label="Live Jobs" inView={inView} />
//           <CounterStat icon={<Building2 size={32} />} end={stats.companies} label="Companies" inView={inView} />
//           <CounterStat icon={<Users size={32} />} end={stats.users} label="Active Users" inView={inView} />
//           <CounterStat icon={<TrendingUp size={32} />} end={stats.success} suffix="%" label="Success Rate" inView={inView} />
//         </motion.div>
//       </section>

//       {/* CATEGORIES - PILL STYLE */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//             Popular Categories
//           </h2>

//           <div className="flex flex-wrap justify-center gap-4">
//             <AnimatePresence mode="wait">
//               {categories.slice(0, 12).map((cat) => (
//                 <motion.button
//                   key={cat}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   whileHover={{ scale: 1.08 }}
//                   whileTap={{ scale: 0.96 }}
//                   onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
//                   className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 shadow-sm
//                     ${selectedCategory === cat
//                       ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200"
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
//                 >
//                   {cat}
//                 </motion.button>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       {/* FEATURED JOBS */}
//       <section className="py-24 bg-gradient-to-b from-indigo-50/50 to-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center mb-16">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
//                 Featured Opportunities
//               </h2>
//               <p className="text-slate-600 mt-3">Best matches for you right now</p>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={() => router.push("/jobs")}
//               className="mt-6 md:mt-0 flex items-center gap-2 bg-white border-2 border-indigo-600 text-indigo-700 px-8 py-4 rounded-2xl font-bold shadow-md hover:bg-indigo-50 transition-colors"
//             >
//               View All Jobs <ArrowRight />
//             </motion.button>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {loading
//               ? Array(8).fill(0).map((_, i) => (
//                   <div key={i} className="h-80 bg-slate-100 rounded-3xl animate-pulse" />
//                 ))
//               : filteredJobs.map((job) => (
//                   <JobCard
//                     key={job._id}
//                     job={job}
//                     onClick={() => router.push(`/jobs/${job._id}`)}
//                   />
//                 ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


// "use client";
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Star,
//   Filter,
// } from "lucide-react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import HeroSlider from "./components/HeroSlider";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
// };

// const stagger = {
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// /* ======================= */
// /* MODERN SEARCH BAR       */
// /* ======================= */
// function SearchBar({ search, setSearch, location, setLocation }) {
//   const router = useRouter();

//   return (
//     <motion.div
//       variants={fadeInUp}
//       className="relative max-w-5xl mx-auto"
//     >
//       <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-3xl" />

//       <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-6 md:p-8 grid md:grid-cols-3 gap-5">
//         <div className="relative">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Job title, skills, or company"
//             className="w-full pl-14 pr-6 py-5 bg-transparent border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-lg"
//           />
//         </div>

//         <div className="relative">
//           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="City, remote, or anywhere"
//             className="w-full pl-14 pr-6 py-5 bg-transparent border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-lg"
//           />
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => router.push(`/jobs?search=${search}&location=${location}`)}
//           className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl"
//         >
//           Search Jobs <Zap size={24} />
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

// /* ======================= */
// /* ANIMATED COUNTER        */
// /* ======================= */
// function CounterStat({ icon, end, label, suffix = "", inView }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const duration = 2000;
//     const increment = end / (duration / 16);
//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);
//     return () => clearInterval(timer);
//   }, [inView, end]);

//   return (
//     <motion.div variants={fadeInUp} className="text-center">
//       <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl text-white flex items-center justify-center shadow-2xl">
//         {icon}
//       </div>
//       <p className="text-5xl font-black bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
//         {count.toLocaleString()}{suffix}
//       </p>
//       <p className="text-slate-600 font-semibold mt-3">{label}</p>
//     </motion.div>
//   );
// }

// /* ======================= */
// /* PREMIUM JOB CARD        */
// /* ======================= */
// function JobCard({ job, onClick }) {
//   return (
//     <motion.div
//       whileHover={{ y: -12, scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       onClick={onClick}
//       className="group bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden relative"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

//       <div className="flex items-start justify-between mb-6">
//         <div className="flex items-center gap-5">
//           <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">
//             {job.company?.[0] || "C"}
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
//               {job.title}
//             </h3>
//             <p className="text-slate-600 font-medium">{job.company}</p>
//           </div>
//         </div>

//         {job.remote && (
//           <span className="px-4 py-2 text-sm font-bold bg-emerald-100 text-emerald-700 rounded-full">
//             Remote
//           </span>
//         )}
//       </div>

//       <div className="flex items-center gap-3 text-slate-500 mb-4">
//         <MapPin size={20} className="text-indigo-600" />
//         <span className="font-medium">{job.location}</span>
//       </div>

//       <p className="text-slate-600 line-clamp-2 mb-8 leading-relaxed">
//         {job.description}
//       </p>

//       <div className="flex items-center justify-between pt-6 border-t border-slate-100">
//         <span className="text-2xl font-bold text-indigo-700">
//           {job.salary ? `PKR ${job.salary.toLocaleString()}` : "Competitive"}
//         </span>
//         <motion.button
//           whileHover={{ x: 8 }}
//           className="flex items-center gap-3 text-indigo-700 font-bold"
//         >
//           View Details <ArrowRight size={24} />
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

// /* ======================= */
// /* MAIN HOMEPAGE           */
// /* ======================= */
// export default function HomePage() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(true);

//   const statsRef = useRef(null);
//   const statsInView = useInView(statsRef, { once: true, margin: "-150px" });

//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data.slice(0, 12));
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     let data = [...jobs];
//     if (search) {
//       const term = search.toLowerCase();
//       data = data.filter(
//         (j) =>
//           j.title.toLowerCase().includes(term) ||
//           j.company.toLowerCase().includes(term)
//       );
//     }
//     if (location) {
//       data = data.filter((j) => j.location.toLowerCase().includes(location.toLowerCase()));
//     }
//     if (selectedCategory) {
//       data = data.filter((j) => j.category === selectedCategory);
//     }
//     setFilteredJobs(data.slice(0, 12));
//   }, [search, location, selectedCategory, jobs]);

//   const categories = useMemo(
//     () => [...new Set(jobs.map((j) => j.category).filter(Boolean))],
//     [jobs]
//   );

//   const stats = useMemo(
//     () => ({
//       jobs: jobs.length,
//       companies: new Set(jobs.map((j) => j.company)).size,
//       users: Math.round(jobs.length * 5.2),
//       success: 98,
//     }),
//     [jobs]
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
//       <HeroSlider />

//       {/* HERO SECTION */}
//       <section className="pt-20 pb-32 px-6">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={stagger}
//           className="text-center max-w-5xl mx-auto"
//         >
//           <motion.h1
//             variants={fadeInUp}
//             className="text-5xl md:text-7xl font-black mb-8 leading-tight"
//           >
//             Find Your <br />
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Dream Career
//             </span>
//           </motion.h1>

//           <motion.p
//             variants={fadeInUp}
//             className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto"
//           >
//             {jobs.length}+ verified jobs from top companies in Pakistan and worldwide
//           </motion.p>

//           <SearchBar search={search} setSearch={setSearch} location={location} setLocation={setLocation} />

//           <motion.div
//             variants={fadeInUp}
//             className="flex flex-wrap justify-center gap-6 mt-12"
//           >
//             <span className="flex items-center gap-3 bg-white/70 px-6 py-3 rounded-full shadow-md">
//               <Sparkles className="text-amber-500" /> Daily Fresh Jobs
//             </span>
//             <span className="flex items-center gap-3 bg-white/70 px-6 py-3 rounded-full shadow-md">
//               <Star className="text-indigo-600" /> Verified Employers
//             </span>
//             <span className="flex items-center gap-3 bg-white/70 px-6 py-3 rounded-full shadow-md">
//               <Zap className="text-emerald-600" /> Instant Apply
//             </span>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* STATS */}
//       <section ref={statsRef} className="py-24 bg-white/70 backdrop-blur-md">
//         <motion.div
//           initial="hidden"
//           animate={statsInView ? "visible" : "hidden"}
//           variants={stagger}
//           className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-6"
//         >
//           <CounterStat icon={<Briefcase size={36} />} end={stats.jobs} label="Active Jobs" inView={statsInView} />
//           <CounterStat icon={<Building2 size={36} />} end={stats.companies} label="Companies" inView={statsInView} />
//           <CounterStat icon={<Users size={36} />} end={stats.users} label="Happy Users" inView={statsInView} />
//           <CounterStat icon={<TrendingUp size={36} />} end={stats.success} suffix="%" label="Placement Rate" inView={statsInView} />
//         </motion.div>
//       </section>

//       {/* CATEGORIES */}
//       {!selectedCategory && categories.length > 0 && (
//         <section className="py-20">
//           <div className="max-w-7xl mx-auto px-6">
//             <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
//               Browse by Category
//             </h2>
//             <div className="flex flex-wrap justify-center gap-5">
//               {categories.slice(0, 10).map((cat) => (
//                 <motion.button
//                   key={cat}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setSelectedCategory(cat)}
//                   className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
//                 >
//                   {cat}
//                 </motion.button>
//               ))}
//               {selectedCategory && (
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => setSelectedCategory("")}
//                   className="px-8 py-4 bg-slate-200 text-slate-700 rounded-full font-semibold"
//                 >
//                   Clear Filter
//                 </motion.button>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* FEATURED JOBS */}
//       <section className="py-28 bg-gradient-to-b from-transparent to-slate-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
//             <div>
//               <h2 className="text-5xl font-black bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
//                 {selectedCategory ? `${selectedCategory} Jobs` : "Featured Jobs"}
//               </h2>
//               <p className="text-xl text-slate-600">Handpicked opportunities just for you</p>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={() => router.push("/jobs")}
//               className="mt-8 md:mt-0 px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-700 rounded-2xl font-bold shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-3"
//             >
//               View All Jobs <ArrowRight size={24} />
//             </motion.button>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
//             {loading
//               ? Array(8).fill(0).map((_, i) => (
//                 <div key={i} className="h-96 bg-slate-100/70 rounded-3xl animate-pulse" />
//               ))
//               : filteredJobs.map((job) => (
//                 <JobCard key={job._id} job={job} onClick={() => router.push(`/jobs/${job._id}`)} />
//               ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Star,
//   Filter,
//   ChevronRight,
//   Globe,
//   Award,
//   CheckCircle,
//   Clock,
//   DollarSign,
// } from "lucide-react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import HeroSlider from "./components/HeroSlider";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
// };

// const stagger = {
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "backOut" } },
// };

// /* ======================= */
// /* GLASS SEARCH BAR        */
// /* ======================= */
// function SearchBar({ search, setSearch, location, setLocation }) {
//   const router = useRouter();

//   return (
//     <motion.div
//       variants={fadeInUp}
//       className="relative max-w-6xl mx-auto"
//     >
//       {/* Background glow effects */}
//       <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full" />
//       <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full" />

//       {/* Glass morphism container */}
//       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-indigo-500/10 rounded-3xl p-2">
//         <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 grid md:grid-cols-12 gap-4">
//           <div className="md:col-span-5 relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl group-hover:opacity-100 opacity-0 transition-opacity" />
//             <div className="relative flex items-center">
//               <div className="absolute left-5 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
//                 <Search size={22} />
//               </div>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Job title, skills, or company"
//                 className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-100 rounded-2xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all text-lg placeholder:text-slate-400"
//               />
//             </div>
//           </div>

//           <div className="md:col-span-5 relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl group-hover:opacity-100 opacity-0 transition-opacity" />
//             <div className="relative flex items-center">
//               <div className="absolute left-5 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg">
//                 <MapPin size={22} />
//               </div>
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="City, remote, or anywhere"
//                 className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-100 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all text-lg placeholder:text-slate-400"
//               />
//             </div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => router.push(`/jobs?search=${search}&location=${location}`)}
//             className="md:col-span-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-purple-500/30 relative overflow-hidden group"
//           >
//             <span className="relative z-10">Search</span>
//             <Zap size={22} className="relative z-10" />
//             <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//           </motion.button>
//         </div>
//       </div>


//     </motion.div>
//   );
// }

// /* ======================= */
// /* ANIMATED COUNTER        */
// /* ======================= */
// function CounterStat({ icon, end, label, suffix = "", inView, delay = 0 }) {
//   const [count, setCount] = useState(0);
//   const iconRef = useRef(null);

//   useEffect(() => {
//     if (!inView) return;

//     const timer = setTimeout(() => {
//       let start = 0;
//       const duration = 1800;
//       const increment = end / (duration / 16);

//       const counter = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           setCount(end);
//           clearInterval(counter);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 16);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [inView, end, delay]);

//   return (
//     <motion.div variants={scaleIn} className="relative">
//       <div className="relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group">
//         {/* Hover effect background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-3xl transition-all duration-500" />

//         {/* Icon container */}
//         <motion.div
//           ref={iconRef}
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.8 }}
//           className="relative w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-indigo-500/40 transition-shadow"
//         >
//           {icon}
//         </motion.div>

//         {/* Counter */}
//         <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent text-center">
//           {count.toLocaleString()}{suffix}
//           <span className="text-3xl text-indigo-500">+</span>
//         </p>

//         {/* Label */}
//         <p className="text-slate-600 font-semibold text-center mt-4 text-lg">{label}</p>

//         {/* Animated underline */}
//         <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       </div>
//     </motion.div>
//   );
// }

// /* ======================= */
// /* PREMIUM JOB CARD        */
// /* ======================= */
// function JobCard({ job, onClick }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -8, scale: 1.02 }}
//       transition={{ type: "spring", stiffness: 300, damping: 25 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onClick}
//       className="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl shadow-slate-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer overflow-hidden"
//     >
//       {/* Gradient overlay on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/3 group-hover:via-purple-500/3 group-hover:to-pink-500/3 transition-all duration-500" />

//       {/* Animated border effect */}
//       <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700">
//         <div className="absolute inset-0 rounded-3xl bg-white" />
//       </div>

//       <div className="relative z-10">
//         {/* Header with company and badge */}
//         <div className="flex items-start justify-between mb-6">
//           <div className="flex items-center gap-5">
//             <div className="relative">
//               <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">
//                 {job.company?.[0] || "C"}
//               </div>
//               {job.featured && (
//                 <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
//                   <Star size={14} className="text-white" fill="white" />
//                 </div>
//               )}
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
//                 {job.title}
//               </h3>
//               <p className="text-slate-600 font-medium flex items-center gap-2">
//                 {job.company}
//                 <Award size={16} className="text-amber-500" />
//               </p>
//             </div>
//           </div>

//           {job.remote && (
//             <motion.div
//               animate={{ scale: isHovered ? 1.1 : 1 }}
//               className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20"
//             >
//               <Globe size={14} className="inline mr-2" />
//               Remote
//             </motion.div>
//           )}
//         </div>

//         {/* Job details */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="flex items-center gap-3 text-slate-600">
//             <MapPin size={18} className="text-indigo-500" />
//             <span className="font-medium">{job.location}</span>
//           </div>
//           <div className="flex items-center gap-3 text-slate-600">
//             <Clock size={18} className="text-blue-500" />
//             <span className="font-medium">{job.type || "Full-time"}</span>
//           </div>
//           <div className="flex items-center gap-3 text-slate-600">
//             <Briefcase size={18} className="text-purple-500" />
//             <span className="font-medium">{job.experience || "2-5 years"}</span>
//           </div>
//           <div className="flex items-center gap-3 text-slate-600">
//             <DollarSign size={18} className="text-emerald-500" />
//             <span className="font-medium">PKR {job.salary?.toLocaleString() || "Competitive"}</span>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-slate-600 line-clamp-2 mb-8 leading-relaxed">
//           {job.description}
//         </p>

//         {/* Skills tags */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           {job.skills?.slice(0, 3).map((skill, index) => (
//             <span
//               key={index}
//               className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-full text-sm text-slate-700 font-medium"
//             >
//               {skill}
//             </span>
//           ))}
//           {job.skills?.length > 3 && (
//             <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-full text-sm text-indigo-700 font-medium">
//               +{job.skills.length - 3} more
//             </span>
//           )}
//         </div>

//         {/* Footer with CTA */}
//         <div className="flex items-center justify-between pt-6 border-t border-slate-100">
//           <div className="flex items-center gap-2">
//             <CheckCircle size={18} className="text-emerald-500" />
//             <span className="text-sm text-slate-500">Verified employer</span>
//           </div>
//           <motion.button
//             whileHover={{ x: 5 }}
//             className="flex items-center gap-3 text-indigo-700 font-bold group/btn"
//           >
//             <span>View Details</span>
//             <motion.div
//               animate={{ x: isHovered ? 5 : 0 }}
//               className="flex items-center"
//             >
//               <ChevronRight size={20} />
//             </motion.div>
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ======================= */
// /* MAIN HOMEPAGE           */
// /* ======================= */
// export default function HomePage() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(true);

//   const statsRef = useRef(null);
//   const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data.slice(0, 12));
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     let data = [...jobs];
//     if (search) {
//       const term = search.toLowerCase();
//       data = data.filter(
//         (j) =>
//           j.title.toLowerCase().includes(term) ||
//           j.company.toLowerCase().includes(term)
//       );
//     }
//     if (location) {
//       data = data.filter((j) => j.location.toLowerCase().includes(location.toLowerCase()));
//     }
//     if (selectedCategory) {
//       data = data.filter((j) => j.category === selectedCategory);
//     }
//     setFilteredJobs(data.slice(0, 12));
//   }, [search, location, selectedCategory, jobs]);

//   const categories = useMemo(
//     () => [...new Set(jobs.map((j) => j.category).filter(Boolean))],
//     [jobs]
//   );

//   const stats = useMemo(
//     () => ({
//       jobs: jobs.length,
//       companies: new Set(jobs.map((j) => j.company)).size,
//       users: Math.round(jobs.length * 5.2),
//       success: 98,
//     }),
//     [jobs]
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
//       <HeroSlider />

//       {/* HERO SECTION */}
//       <section className="pt-24 pb-40 px-6 relative overflow-hidden">
//         {/* Background elements */}
//         <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 blur-3xl rounded-full" />
//         <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 blur-3xl rounded-full" />

//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={stagger}
//           className="text-center max-w-6xl mx-auto relative"
//         >
//           <motion.div variants={fadeInUp} className="inline-block mb-8">
//             <span className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full font-bold text-sm flex items-center gap-2 mx-auto w-fit">
//               <Sparkles size={16} className="text-amber-500" />
//               Over 10,000 successful placements in 2024
//             </span>
//           </motion.div>

//           <motion.h1
//             variants={fadeInUp}
//             className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight"
//           >
//             Find Your <br />
//             <span className="relative">
//               <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Dream Career
//               </span>
//               <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
//             </span>
//           </motion.h1>

//           <motion.p
//             variants={fadeInUp}
//             className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
//           >
//             Join <span className="font-bold text-indigo-600">{jobs.length}+</span> professionals who found their perfect role through our platform
//           </motion.p>

//           <SearchBar search={search} setSearch={setSearch} location={location} setLocation={setLocation} />

//           <motion.div
//             variants={fadeInUp}
//             className="flex flex-wrap justify-center gap-4 mt-16"
//           >
//             {[
//               { icon: <Sparkles className="text-amber-500" />, text: "AI Matching" },
//               { icon: <Zap className="text-emerald-500" />, text: "Instant Apply" },
//               { icon: <CheckCircle className="text-blue-500" />, text: "Verified Companies" },
//               { icon: <Clock className="text-purple-500" />, text: "Fast Response" },
//             ].map((item, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 + index * 0.1 }}
//                 className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-white/30"
//               >
//                 {item.icon}
//                 <span className="font-medium text-slate-700">{item.text}</span>
//               </motion.span>
//             ))}
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* STATS SECTION */}
//       <section ref={statsRef} className="py-32 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent" />
//         <motion.div
//           initial="hidden"
//           animate={statsInView ? "visible" : "hidden"}
//           variants={stagger}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 relative"
//         >
//           <CounterStat
//             icon={<Briefcase size={32} />}
//             end={stats.jobs}
//             label="Active Jobs"
//             inView={statsInView}
//             delay={0}
//           />
//           <CounterStat
//             icon={<Building2 size={32} />}
//             end={stats.companies}
//             label="Top Companies"
//             inView={statsInView}
//             delay={200}
//           />
//           <CounterStat
//             icon={<Users size={32} />}
//             end={stats.users}
//             label="Happy Users"
//             inView={statsInView}
//             delay={400}
//           />
//           <CounterStat
//             icon={<TrendingUp size={32} />}
//             end={stats.success}
//             suffix="%"
//             label="Placement Rate"
//             inView={statsInView}
//             delay={600}
//           />
//         </motion.div>
//       </section>

//       {/* CATEGORIES SECTION */}
//       <section className="py-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50" />
//         <div className="max-w-7xl mx-auto px-6 relative">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6"
//             >
//               Explore by Category
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-xl text-slate-600 max-w-2xl mx-auto"
//             >
//               Discover opportunities in the most in-demand fields
//             </motion.p>
//           </div>

//           <div className="flex flex-wrap justify-center gap-3 mb-12">
//             {categories.slice(0, 8).map((cat, index) => (
//               <motion.button
//                 key={cat}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.05 }}
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow: "0 10px 30px rgba(99, 102, 241, 0.2)"
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${selectedCategory === cat
//                     ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-purple-500/30"
//                     : "bg-white text-slate-700 border-2 border-slate-100 hover:border-indigo-200 hover:shadow-lg"
//                   }`}
//               >
//                 {cat}
//               </motion.button>
//             ))}
//           </div>

//           {selectedCategory && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               className="text-center"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setSelectedCategory("")}
//                 className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
//               >
//                 Clear Filter
//                 <span className="text-lg">×</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* FEATURED JOBS SECTION */}
//       <section className="pb-40 pt-20 relative">
//         {/* Background decorative elements */}
//         <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 to-transparent" />

//         <div className="max-w-7xl mx-auto px-6 relative">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20">
//             <div className="mb-10 md:mb-0">
//               <motion.h2
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="text-5xl md:text-6xl font-black mb-6"
//               >
//                 <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
//                   {selectedCategory ? `${selectedCategory} Jobs` : "Featured Jobs"}
//                 </span>
//               </motion.h2>
//               <motion.p
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.1 }}
//                 className="text-xl text-slate-600"
//               >
//                 Handpicked opportunities matching your preferences
//               </motion.p>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => router.push("/jobs")}
//               className="group relative px-8 py-5 bg-gradient-to-r from-white to-white/90 backdrop-blur-sm border-2 border-indigo-200 text-indigo-700 rounded-2xl font-bold shadow-xl hover:border-indigo-300 transition-all flex items-center gap-3 min-w-[200px]"
//             >
//               <span>View All Jobs</span>
//               <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-500" />
//             </motion.button>
//           </div>

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={stagger}
//             className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//           >
//             {loading
//               ? Array(8).fill(0).map((_, i) => (
//                 <motion.div
//                   key={i}
//                   variants={scaleIn}
//                   className="h-[420px] bg-gradient-to-br from-slate-100/50 to-slate-100/30 rounded-3xl animate-pulse"
//                 />
//               ))
//               : filteredJobs.map((job) => (
//                 <JobCard key={job._id} job={job} onClick={() => router.push(`/jobs/${job._id}`)} />
//               ))}
//           </motion.div>

//           {!loading && filteredJobs.length === 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-20"
//             >
//               <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center">
//                 <Search size={40} className="text-slate-400" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-700 mb-4">No jobs found</h3>
//               <p className="text-slate-600 max-w-md mx-auto">
//                 Try adjusting your search criteria or browse all available positions
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Star,
//   Globe,
//   Award,
//   CheckCircle,
//   Clock,
//   DollarSign,
//   ChevronRight,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useInView } from "framer-motion"; // if you're using react-intersection-observer version
// import HeroSlider from "./components/HeroSlider"; // uncomment when you have it


// "use client";

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Globe,
//   Award,
//   CheckCircle,
//   Clock,
//   DollarSign,
//   ChevronRight,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
// };

// const stagger = {
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "backOut" } },
// };

// // Glass Search Bar Component
// function SearchBar({ search, setSearch, location, setLocation }) {
//   const router = useRouter();

//   const handleSearch = () => {
//     if (!search.trim() && !location.trim()) return;
//     router.push(`/jobs?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`);
//   };

//   return (
//     <motion.div variants={fadeInUp} className="relative max-w-6xl mx-auto px-4">
//       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-indigo-500/10 rounded-3xl p-2">
//         <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 grid md:grid-cols-12 gap-4">
//           <div className="md:col-span-5">
//             <div className="relative flex items-center">
//               <div className="absolute left-5 z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
//                 <Search size={22} />
//               </div>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Job title, skills, or company"
//                 className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all text-lg placeholder:text-slate-400"
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               />
//             </div>
//           </div>

//           <div className="md:col-span-5">
//             <div className="relative flex items-center">
//               <div className="absolute left-5 z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg">
//                 <MapPin size={22} />
//               </div>
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="City, remote, or anywhere"
//                 className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all text-lg placeholder:text-slate-400"
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               />
//             </div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={handleSearch}
//             className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 transition-all"
//           >
//             Search
//             <Zap size={22} />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // Animated Counter Component
// function CounterStat({ icon, end, label, suffix = "", inView, delay = 0 }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;

//     const timer = setTimeout(() => {
//       let start = 0;
//       const duration = 1800;
//       const increment = end / (duration / 16);

//       const counter = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           setCount(end);
//           clearInterval(counter);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 16);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [inView, end, delay]);

//   return (
//     <motion.div variants={scaleIn} className="relative">
//       <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
//         <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white flex items-center justify-center shadow-lg">
//           {icon}
//         </div>
//         <p className="text-5xl font-black text-slate-900 text-center">
//           {count.toLocaleString()}
//           {suffix}
//         </p>
//         <p className="text-slate-600 font-medium text-center mt-3">{label}</p>
//       </div>
//     </motion.div>
//   );
// }

// // Job Card Component (improved accessibility)
// function JobCard({ job }) {
//   const router = useRouter();

//   return (
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -6, scale: 1.02 }}
//       className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       tabIndex={0}
//       role="article"
//       onClick={() => router.push(`/jobs/${job._id}`)}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           router.push(`/jobs/${job._id}`);
//         }
//       }}
//     >
//       <div className="flex items-start justify-between mb-5">
//         <div className="flex items-center gap-4">
//           <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
//             {job.company?.[0]?.toUpperCase() || "?"}
//           </div>
//           <div>
//             <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-700 transition-colors">
//               {job.title}
//             </h3>
//             <p className="text-slate-600">{job.company}</p>
//           </div>
//         </div>

//         {job.remote && (
//           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
//             Remote
//           </span>
//         )}
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-slate-600">
//         <div className="flex items-center gap-2">
//           <MapPin size={16} /> {job.location || "Not specified"}
//         </div>
//         <div className="flex items-center gap-2">
//           <Clock size={16} /> {job.type || "Full-time"}
//         </div>
//       </div>

//       <p className="text-slate-600 line-clamp-3 mb-6">
//         {job.description || "No description available"}
//       </p>

//       <div className="flex flex-wrap gap-2">
//         {job.skills?.slice(0, 4).map((skill, i) => (
//           <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
//             {skill}
//           </span>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// // ────────────────────────────────────────────────
// //                 MAIN HOMEPAGE
// // ────────────────────────────────────────────────
// export default function HomePage() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const statsRef = useRef(null);
//   const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

//   // Fetch jobs
//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/jobs", {
//           cache: "no-store", // ← Important: fresh data
//         });

//         if (!res.ok) throw new Error("Failed to load jobs");
//         const data = await res.json();

//         setJobs(data);
//         setFilteredJobs(data.slice(0, 12));
//       } catch (err) {
//         console.error(err);
//         setError("Could not load jobs at the moment");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchJobs();
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     let result = [...jobs];

//     if (search.trim()) {
//       const term = search.toLowerCase();
//       result = result.filter(
//         (j) =>
//           j.title?.toLowerCase().includes(term) ||
//           j.company?.toLowerCase().includes(term)
//       );
//     }

//     if (location.trim()) {
//       const loc = location.toLowerCase();
//       result = result.filter((j) => j.location?.toLowerCase().includes(loc));
//     }

//     setFilteredJobs(result.slice(0, 12));
//   }, [search, location, jobs]);

//   const stats = useMemo(
//     () => ({
//       jobs: jobs.length,
//       companies: new Set(jobs.map((j) => j.company)).size,
//       users: Math.round(jobs.length * 4.8),
//       success: 97,
//     }),
//     [jobs]
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       {/* Hero Slider - Uncomment when ready */}
//       {/* <HeroSlider /> */}

//       {/* HERO SECTION */}
//       <section className="pt-20 pb-32 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-5xl md:text-7xl font-black mb-6 leading-tight"
//           >
//             Find Your
//             <br />
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Dream Job
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto"
//           >
//             Discover thousands of opportunities from top companies
//           </motion.p>

//           <SearchBar
//             search={search}
//             setSearch={setSearch}
//             location={location}
//             setLocation={setLocation}
//           />
//         </div>
//       </section>

//       {/* STATS */}
//       <section ref={statsRef} className="py-20 px-6">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//           <CounterStat
//             icon={<Briefcase size={32} />}
//             end={stats.jobs}
//             label="Live Jobs"
//             inView={statsInView}
//           />
//           <CounterStat
//             icon={<Building2 size={32} />}
//             end={stats.companies}
//             label="Companies"
//             inView={statsInView}
//             delay={150}
//           />
//           <CounterStat
//             icon={<Users size={32} />}
//             end={stats.users}
//             label="Job Seekers"
//             inView={statsInView}
//             delay={300}
//           />
//           <CounterStat
//             icon={<TrendingUp size={32} />}
//             end={stats.success}
//             suffix="%"
//             label="Success Rate"
//             inView={statsInView}
//             delay={450}
//           />
//         </div>
//       </section>

//       {/* Featured Jobs */}
//       <section className="py-20 px-6 bg-slate-50/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-black mb-4 md:mb-0">
//               Featured Opportunities
//             </h2>
//             <button
//               onClick={() => router.push("/jobs")}
//               className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
//             >
//               View All Jobs <ArrowRight size={18} />
//             </button>
//           </div>

//           {error && (
//             <div className="text-center py-12 text-red-600">{error}</div>
//           )}

//           {loading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {[...Array(8)].map((_, i) => (
//                 <div key={i} className="h-80 bg-slate-200/60 rounded-3xl animate-pulse" />
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={stagger}
//               className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//             >
//               {filteredJobs.map((job) => (
//                 <JobCard key={job._id} job={job} />
//               ))}
//             </motion.div>
//           )}

//           {!loading && filteredJobs.length === 0 && (
//             <div className="text-center py-20 text-slate-500">
//               No matching jobs found. Try different keywords.
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Globe,
//   Award,
//   CheckCircle,
//   Clock,
//   DollarSign,
//   ChevronRight,
//   Star,
//   Rocket,
//   Target,
//   Shield,
//   Heart,
//   Filter,
//   X,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
// };

// const stagger = {
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "backOut" } },
// };

// // Glass Search Bar Component - Enhanced
// function SearchBar({ search, setSearch, location, setLocation }) {
//   const router = useRouter();
//   const [isFocused, setIsFocused] = useState(false);

//   const handleSearch = () => {
//     if (!search.trim() && !location.trim()) return;
//     router.push(`/jobs?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`);
//   };

//   return (
//     <motion.div
//       variants={fadeInUp}
//       className="relative max-w-5xl mx-auto px-4"
//       animate={{ y: isFocused ? -10 : 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/25 shadow-2xl shadow-indigo-500/20 rounded-3xl p-2">
//         <div className="bg-gradient-to-br from-white/98 via-white/95 to-white/90 backdrop-blur-md rounded-2xl p-1">
//           <div className="bg-white/80 rounded-2xl p-6 md:p-8 grid md:grid-cols-12 gap-4">
//             <div className="md:col-span-5">
//               <div className="relative flex items-center">
//                 <div className="absolute left-5 z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/50">
//                   <Search size={22} />
//                 </div>
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   placeholder="Job title, skills, or company"
//                   className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-200/80 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all text-lg placeholder:text-slate-400 hover:border-slate-300"
//                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 />
//               </div>
//             </div>

//             <div className="md:col-span-5">
//               <div className="relative flex items-center">
//                 <div className="absolute left-5 z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg shadow-blue-500/50">
//                   <MapPin size={22} />
//                 </div>
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   placeholder="City, remote, or anywhere"
//                   className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-200/80 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all text-lg placeholder:text-slate-400 hover:border-slate-300"
//                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 />
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={handleSearch}
//               className="md:col-span-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 group"
//             >
//               Search
//               <motion.div
//                 animate={{ x: [0, 5, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <Zap size={22} className="group-hover:rotate-12 transition-transform" />
//               </motion.div>
//             </motion.button>
//           </div>
//         </div>
        
//         <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-4">
//           <button className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:shadow-md transition-all flex items-center gap-2">
//             <Filter size={14} /> Filter
//           </button>
//           <button className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:shadow-md transition-all flex items-center gap-2">
//             <Sparkles size={14} /> AI Match
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // Animated Counter Component
// function CounterStat({ icon, end, label, suffix = "", inView, delay = 0 }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;

//     const timer = setTimeout(() => {
//       let start = 0;
//       const duration = 1800;
//       const increment = end / (duration / 16);

//       const counter = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           setCount(end);
//           clearInterval(counter);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 16);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [inView, end, delay]);

//   return (
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -8, scale: 1.05 }}
//       className="relative group"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-2xl group-hover:blur-3xl transition-all duration-500 rounded-3xl" />
//       <div className="relative bg-white/95 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
//         <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full -translate-y-10 translate-x-10" />
//         <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all">
//           {icon}
//         </div>
//         <p className="text-5xl font-black text-slate-900 text-center mb-2">
//           {count.toLocaleString()}
//           {suffix}
//         </p>
//         <p className="text-slate-600 font-medium text-center">{label}</p>
//         <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 rounded-full" />
//       </div>
//     </motion.div>
//   );
// }

// // Enhanced Job Card Component
// function JobCard({ job, index }) {
//   const router = useRouter();
//   const [isLiked, setIsLiked] = useState(false);

//   const salaryRanges = {
//     junior: "$60k - $90k",
//     mid: "$90k - $130k",
//     senior: "$130k - $200k+",
//     executive: "$200k+"
//   };

//   const getSalaryRange = () => {
//     const title = job.title?.toLowerCase() || "";
//     if (title.includes('senior') || title.includes('lead') || title.includes('principal')) return salaryRanges.senior;
//     if (title.includes('mid') || title.includes('ii') || title.includes('iii')) return salaryRanges.mid;
//     if (title.includes('junior') || title.includes('entry') || title.includes('i')) return salaryRanges.junior;
//     if (title.includes('director') || title.includes('vp') || title.includes('cto')) return salaryRanges.executive;
//     return salaryRanges.mid;
//   };

//   return (
//     <motion.div
//       variants={scaleIn}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1 }}
//       whileHover={{ y: -8, scale: 1.02 }}
//       className="group relative bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
//       onClick={() => router.push(`/jobs/${job._id}`)}
//     >
//       {/* Background Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
//       {/* Like Button */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setIsLiked(!isLiked);
//         }}
//         className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all"
//       >
//         <Heart
//           size={20}
//           className={isLiked ? "fill-red-500 text-red-500" : "text-slate-400"}
//         />
//       </button>

//       <div className="relative">
//         {/* Company Badge */}
//         <div className="flex items-start justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
//                 {job.company?.[0]?.toUpperCase() || "?"}
//               </div>
//               {job.featured && (
//                 <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                   <Star size={10} fill="white" /> Featured
//                 </div>
//               )}
//             </div>
//             <div>
//               <h3 className="font-bold text-xl text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-1">
//                 {job.title}
//               </h3>
//               <div className="flex items-center gap-2 mt-1">
//                 <p className="text-slate-700 font-medium">{job.company}</p>
//                 {job.verified && (
//                   <CheckCircle size={16} className="text-emerald-500" />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Job Details Grid */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 text-slate-600">
//               <MapPin size={18} className="text-blue-500" />
//               <span className="font-medium">{job.location || "Remote"}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               <Clock size={18} className="text-amber-500" />
//               <span className="font-medium">{job.type || "Full-time"}</span>
//             </div>
//           </div>
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 text-slate-600">
//               <DollarSign size={18} className="text-emerald-500" />
//               <span className="font-medium">{getSalaryRange()}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               <Globe size={18} className="text-indigo-500" />
//               <span className="font-medium">{job.remote ? "Remote" : "On-site"}</span>
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-slate-600 line-clamp-2 mb-6">
//           {job.description || "Join our innovative team and work on cutting-edge projects..."}
//         </p>

//         {/* Skills Tags */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {job.skills?.slice(0, 4).map((skill, i) => (
//             <span
//               key={i}
//               className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200"
//             >
//               {skill}
//             </span>
//           ))}
//           {job.skills?.length > 4 && (
//             <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
//               +{job.skills.length - 4} more
//             </span>
//           )}
//         </div>

//         {/* Footer with Posted Date */}
//         <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
//           <span className="text-sm text-slate-500">
//             Posted {Math.floor(Math.random() * 7) + 1}d ago
//           </span>
//           <motion.div
//             whileHover={{ x: 5 }}
//             className="flex items-center gap-1 text-indigo-600 font-medium group/apply"
//           >
//             Apply Now
//             <ChevronRight size={18} className="group-hover/apply:translate-x-1 transition-transform" />
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // Featured Companies Carousel
// function FeaturedCompanies() {
//   const companies = [
//     { name: "TechCorp", logo: "TC", jobs: 42, color: "from-blue-500 to-cyan-500" },
//     { name: "MetaSoft", logo: "M", jobs: 28, color: "from-purple-500 to-pink-500" },
//     { name: "GlobalNet", logo: "GN", jobs: 35, color: "from-emerald-500 to-teal-500" },
//     { name: "CloudSys", logo: "CS", jobs: 19, color: "from-orange-500 to-amber-500" },
//     { name: "DataFlow", logo: "DF", jobs: 31, color: "from-indigo-500 to-purple-500" },
//     { name: "SecureNet", logo: "SN", jobs: 23, color: "from-red-500 to-rose-500" },
//   ];

//   return (
//     <div className="py-16 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between mb-10">
//           <h2 className="text-3xl font-bold text-slate-900">Top Hiring Companies</h2>
//           <button className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
//             View All <ArrowRight size={18} />
//           </button>
//         </div>
        
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
//           <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          
//           <motion.div
//             className="flex gap-6"
//             animate={{ x: [0, -1000] }}
//             transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
//           >
//             {[...companies, ...companies].map((company, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 w-64 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
//               >
//                 <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg`}>
//                   {company.logo}
//                 </div>
//                 <h3 className="font-bold text-lg text-slate-900 mb-2">{company.name}</h3>
//                 <div className="flex items-center justify-between">
//                   <span className="text-slate-600 text-sm">{company.jobs} open positions</span>
//                   <div className="flex items-center gap-1">
//                     {[...Array(4)].map((_, i) => (
//                       <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
//                     ))}
//                     <Star size={14} className="fill-slate-300 text-slate-300" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Benefits Section
// function BenefitsSection() {
//   const benefits = [
//     {
//       icon: <Shield size={28} />,
//       title: "Verified Employers",
//       description: "All companies are vetted for credibility",
//       color: "from-emerald-500 to-teal-500"
//     },
//     {
//       icon: <Rocket size={28} />,
//       title: "Fast Apply",
//       description: "One-click application process",
//       color: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Target size={28} />,
//       title: "AI Matching",
//       description: "Smart job recommendations",
//       color: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Award size={28} />,
//       title: "Career Growth",
//       description: "Opportunities for advancement",
//       color: "from-amber-500 to-orange-500"
//     },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4">
//             <Sparkles size={18} className="text-indigo-600" />
//             <span className="text-indigo-700 font-medium">Why Choose Us</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
//             Your Career Success <br />
//             <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Starts Here
//             </span>
//           </h2>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//             Join thousands who found their dream job through our platform
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {benefits.map((benefit, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ y: -8 }}
//               className="relative group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white rounded-3xl transform group-hover:scale-105 transition-all duration-500" />
//               <div className="relative bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
//                 <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
//                   {benefit.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
//                 <p className="text-slate-600">{benefit.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Main Homepage Component
// export default function HomePage() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("all");

//   const statsRef = useRef(null);
//   const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

//   // Fetch jobs
//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/jobs", {
//           cache: "no-store",
//         });

//         if (!res.ok) throw new Error("Failed to load jobs");
//         const data = await res.json();

//         setJobs(data);
//         setFilteredJobs(data.slice(0, 8));
//       } catch (err) {
//         console.error(err);
//         setError("Could not load jobs at the moment");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchJobs();
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     let result = [...jobs];

//     if (search.trim()) {
//       const term = search.toLowerCase();
//       result = result.filter(
//         (j) =>
//           j.title?.toLowerCase().includes(term) ||
//           j.company?.toLowerCase().includes(term) ||
//           j.skills?.some(skill => skill.toLowerCase().includes(term))
//       );
//     }

//     if (location.trim()) {
//       const loc = location.toLowerCase();
//       result = result.filter((j) => 
//         j.location?.toLowerCase().includes(loc) ||
//         (loc.includes('remote') && j.remote)
//       );
//     }

//     // Apply type filter
//     if (activeFilter !== "all") {
//       result = result.filter((j) => j.type?.toLowerCase() === activeFilter);
//     }

//     setFilteredJobs(result.slice(0, 8));
//   }, [search, location, jobs, activeFilter]);

//   const stats = useMemo(
//     () => ({
//       jobs: jobs.length,
//       companies: new Set(jobs.map((j) => j.company)).size,
//       users: Math.round(jobs.length * 4.8),
//       success: 97,
//     }),
//     [jobs]
//   );

//   const jobTypes = [
//     { id: "all", label: "All Jobs", count: jobs.length },
//     { id: "remote", label: "Remote", count: jobs.filter(j => j.remote).length },
//     { id: "full-time", label: "Full Time", count: jobs.filter(j => j.type?.includes('Full')).length },
//     { id: "contract", label: "Contract", count: jobs.filter(j => j.type?.includes('Contract')).length },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
//       {/* Hero Section */}
//       <section className="relative pt-24 pb-40 px-6 overflow-hidden">
//         {/* Background Effects */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50" />
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
//         <div className="relative max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-full px-6 py-3 shadow-lg mb-8"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                 <span className="text-emerald-700 font-medium">Live Jobs</span>
//               </div>
//               <span className="text-slate-400">|</span>
//               <span className="text-slate-600">{jobs.length.toLocaleString()}+ opportunities</span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight"
//             >
//               Find Your
//               <br />
//               <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Dream Job
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light"
//             >
//               Connect with top companies and land your perfect role. 
//               <span className="text-slate-800 font-medium"> AI-powered matching included.</span>
//             </motion.p>

//             <SearchBar
//               search={search}
//               setSearch={setSearch}
//               location={location}
//               setLocation={setLocation}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section ref={statsRef} className="py-20 px-6 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
//         <div className="relative max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-black text-slate-900 mb-4">
//               Trusted by Professionals Worldwide
//             </h2>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//               Join our community of successful job seekers and employers
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <CounterStat
//               icon={<Briefcase size={32} />}
//               end={stats.jobs}
//               label="Live Jobs"
//               inView={statsInView}
//             />
//             <CounterStat
//               icon={<Building2 size={32} />}
//               end={stats.companies}
//               label="Companies"
//               inView={statsInView}
//               delay={150}
//             />
//             <CounterStat
//               icon={<Users size={32} />}
//               end={stats.users}
//               label="Job Seekers"
//               inView={statsInView}
//               delay={300}
//             />
//             <CounterStat
//               icon={<TrendingUp size={32} />}
//               end={stats.success}
//               suffix="%"
//               label="Success Rate"
//               inView={statsInView}
//               delay={450}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Job Types Filter */}
//       <section className="py-10 px-6 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-wrap gap-4 justify-center">
//             {jobTypes.map((type) => (
//               <button
//                 key={type.id}
//                 onClick={() => setActiveFilter(type.id)}
//                 className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-3 ${
//                   activeFilter === type.id
//                     ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
//                     : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-md"
//                 }`}
//               >
//                 <span>{type.label}</span>
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   activeFilter === type.id
//                     ? "bg-white/20"
//                     : "bg-slate-100 text-slate-600"
//                 }`}>
//                   {type.count}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Jobs */}
//       <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
//                 Featured Opportunities
//               </h2>
//               <p className="text-xl text-slate-600">
//                 Curated selection of top positions from leading companies
//               </p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.push("/jobs")}
//               className="mt-6 md:mt-0 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
//             >
//               View All Jobs
//               <ArrowRight size={20} />
//             </motion.button>
//           </div>

//           {error && (
//             <div className="text-center py-12 text-red-600">{error}</div>
//           )}

//           {loading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {[...Array(8)].map((_, i) => (
//                 <div key={i} className="h-[400px] bg-gradient-to-br from-slate-100/50 to-slate-200/30 rounded-3xl animate-pulse" />
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={stagger}
//               className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//             >
//               {filteredJobs.map((job, index) => (
//                 <JobCard key={job._id} job={job} index={index} />
//               ))}
//             </motion.div>
//           )}

//           {!loading && filteredJobs.length === 0 && (
//             <div className="text-center py-20">
//               <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
//                 <Search size={32} className="text-slate-400" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-3">No matching jobs found</h3>
//               <p className="text-slate-600 max-w-md mx-auto">
//                 Try adjusting your search filters or explore different categories
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Featured Companies */}
//       <FeaturedCompanies />

//       {/* Benefits Section */}
//       <BenefitsSection />

//       {/* CTA Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 overflow-hidden">
//             <div className="absolute inset-0 bg-grid-white/10" />
//             <div className="relative z-10">
//               <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
//                 Ready to Advance Your Career?
//               </h2>
//               <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
//                 Join thousands of professionals who found their dream job through our platform
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-10 py-4 bg-white text-indigo-700 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
//                 >
//                   Get Started Free
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-10 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/30 transition-all"
//                 >
//                   Browse Jobs
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Globe,
//   Award,
//   CheckCircle,
//   Clock,
//   DollarSign,
//   ChevronRight,
//   Star,
//   Rocket,
//   Target,
//   Shield,
//   Heart,
//   Filter,
//   X,
//   Loader2,
//   ExternalLink,
//   Building,
//   Code,
//   Palette,
//   BarChart,
//   Cpu,
//   Cloud,
//   Server,
//   Smartphone,
//   Database,
//   Calendar,
//   GraduationCap,
//   Languages,
//   Layers,
//   Target as TargetIcon,
//   Mail,
//   Phone,
//   Map,
//   Globe as GlobeIcon,
//   CalendarDays,
//   Award as AwardIcon,
//   TrendingUp as TrendingUpIcon,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import Image from "next/image";

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
// };

// const stagger = {
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "backOut" } },
// };

// // Database API Service based on your schema
// const jobApi = {
//   async fetchJobs() {
//     try {
//       console.log("Fetching jobs from database...");
//       const res = await fetch("/api/jobs", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Cache-Control": "no-cache",
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch jobs: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("Fetched jobs:", data.length);
      
//       // Transform data according to your schema
//       return this.transformJobData(data);
//     } catch (error) {
//       console.error("Error fetching jobs from database:", error);
//       return [];
//     }
//   },

//   async fetchJobById(id) {
//     try {
//       const res = await fetch(`/api/jobs/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch job ${id}: ${res.status}`);
//       }

//       const data = await res.json();
//       return this.transformSingleJob(data);
//     } catch (error) {
//       console.error(`Error fetching job ${id}:`, error);
//       return null;
//     }
//   },

//   transformJobData(jobs) {
//     return jobs.map(job => this.transformSingleJob(job));
//   },

//   transformSingleJob(job) {
//     // Transform according to your schema
//     return {
//       // ===== Basic Job Info =====
//       _id: job._id || job.id || `job-${Date.now()}`,
//       title: job.title || "Untitled Position",
//       company: job.company || "Unknown Company",
//       location: job.location || "Location not specified",
      
//       // ===== Job Details =====
//       salary: this.parseSalary(job.salary),
//       description: job.description || "No description available",
//       startDate: job.startDate,
//       endDate: job.endDate,
//       experience: job.experience || 0,
//       status: job.status || "Open",
//       type: job.type || "Remote", // Remote, Hybrid, Onsite
//       skills: job.skills || [],
//       featured: job.featured || false,
      
//       // ===== Job Applications =====
//       applications: job.applications || [],
//       applicationsCount: job.applications?.length || 0,
      
//       // ===== Derived Fields =====
//       postedDate: job.createdAt || new Date(),
//       companyLogo: this.getCompanyLogo(job.company),
//       companyColor: this.generateCompanyColor(job.company),
//       experienceLevel: this.getExperienceLevel(job.experience),
      
//       // ===== Schema Fields =====
//       createdAt: job.createdAt,
//       updatedAt: job.updatedAt,
//     };
//   },

//   parseSalary(salaryString) {
//     if (!salaryString) return { min: 60000, max: 120000, currency: "USD" };
    
//     try {
//       // Handle different salary formats
//       const match = salaryString.match(/(\$?\d+(?:,\d+)?(?:\.\d+)?)\s*(?:-|to)\s*(\$?\d+(?:,\d+)?(?:\.\d+)?)/i);
//       if (match) {
//         const min = parseInt(match[1].replace(/[$,]/g, ''));
//         const max = parseInt(match[2].replace(/[$,]/g, ''));
//         return { min, max, currency: "USD" };
//       }
      
//       // Handle single salary
//       const singleMatch = salaryString.match(/\$?(\d+(?:,\d+)?(?:\.\d+)?)/);
//       if (singleMatch) {
//         const amount = parseInt(singleMatch[1].replace(/[$,]/g, ''));
//         return { min: amount, max: amount * 1.2, currency: "USD" };
//       }
//     } catch (e) {
//       console.warn("Failed to parse salary:", salaryString);
//     }
    
//     return { min: 60000, max: 120000, currency: "USD" };
//   },

//   getCompanyLogo(companyName) {
//     // In a real app, you might store logo URLs in the database
//     // For now, return first letter
//     return companyName?.[0]?.toUpperCase() || "?";
//   },

//   generateCompanyColor(companyName) {
//     const colors = [
//       '#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF6B6B', '#4ECDC4', '#45B7D1', 
//       '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
//     ];
//     const hash = companyName?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
//     return colors[hash % colors.length];
//   },

//   getExperienceLevel(experienceYears) {
//     if (!experienceYears) return "Entry Level";
//     if (experienceYears < 2) return "Entry Level";
//     if (experienceYears < 5) return "Mid Level";
//     if (experienceYears < 8) return "Senior Level";
//     return "Expert Level";
//   },
// };

// // Glass Search Bar Component
// function SearchBar({ search, setSearch, location, setLocation, onSearch, popularSearches = [] }) {
//   const [isFocused, setIsFocused] = useState(false);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       onSearch();
//     }
//   };

//   return (
//     <motion.div
//       variants={fadeInUp}
//       className="relative max-w-5xl mx-auto px-4"
//       animate={{ y: isFocused ? -10 : 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/25 shadow-2xl shadow-indigo-500/20 rounded-3xl p-2">
//         <div className="bg-gradient-to-br from-white/98 via-white/95 to-white/90 backdrop-blur-md rounded-2xl p-1">
//           <div className="bg-white/80 rounded-2xl p-6 md:p-8 grid md:grid-cols-12 gap-4">
//             <div className="md:col-span-5">
//               <div className="relative flex items-center">
//                 <div className="absolute left-5 z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/50">
//                   <Search size={22} />
//                 </div>
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   placeholder="Job title, skills, or company"
//                   className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-200/80 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all text-lg placeholder:text-slate-400 hover:border-slate-300"
//                   onKeyDown={handleKeyDown}
//                 />
//               </div>
//             </div>

//             <div className="md:col-span-5">
//               <div className="relative flex items-center">
//                 <div className="absolute left-5 z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg shadow-blue-500/50">
//                   <MapPin size={22} />
//                 </div>
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   placeholder="City, remote, or anywhere"
//                   className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-200/80 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all text-lg placeholder:text-slate-400 hover:border-slate-300"
//                   onKeyDown={handleKeyDown}
//                 />
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={onSearch}
//               className="md:col-span-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 group"
//             >
//               Search
//               <motion.div
//                 animate={{ x: [0, 5, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <Zap size={22} className="group-hover:rotate-12 transition-transform" />
//               </motion.div>
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Popular Searches */}
//       {popularSearches.length > 0 && (
//         <div className="mt-6 flex flex-wrap gap-2 justify-center">
//           <span className="text-slate-600 text-sm mr-2">Popular:</span>
//           {popularSearches.map((term, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setSearch(term);
//                 onSearch();
//               }}
//               className="px-3 py-1.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-white hover:shadow-sm transition-all"
//             >
//               {term}
//             </button>
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// }

// // Enhanced Job Card Component - Based on your exact schema
// function JobCard({ job, index }) {
//   const router = useRouter();
//   const [isLiked, setIsLiked] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   // Format salary from your schema's salary string
//   const formatSalary = () => {
//     if (job.salaryString) {
//       return job.salaryString;
//     }
    
//     if (job.salary) {
//       const { min, max, currency = "USD" } = job.salary;
//       return `${currency === "USD" ? "$" : ""}${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k`;
//     }
    
//     return "Competitive Salary";
//   };

//   // Format posted date from createdAt
//   const formatPostedDate = () => {
//     if (!job.createdAt) return "Recently";
//     try {
//       const date = new Date(job.createdAt);
//       if (isNaN(date.getTime())) return "Recently";
      
//       const now = new Date();
//       const diffTime = Math.abs(now - date);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays === 0) return "Today";
//       if (diffDays === 1) return "Yesterday";
//       if (diffDays < 7) return `${diffDays}d ago`;
//       if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
//       return `${Math.floor(diffDays / 30)}mo ago`;
//     } catch (error) {
//       return "Recently";
//     }
//   };

//   // Get work type color based on your schema (Remote, Hybrid, Onsite)
//   const getWorkTypeColor = () => {
//     switch(job.type?.toLowerCase()) {
//       case 'remote': return 'bg-emerald-100 text-emerald-700';
//       case 'hybrid': return 'bg-blue-100 text-blue-700';
//       case 'onsite': return 'bg-amber-100 text-amber-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   // Get work type icon
//   const getWorkTypeIcon = () => {
//     switch(job.type?.toLowerCase()) {
//       case 'remote': return <GlobeIcon size={16} className="text-emerald-600" />;
//       case 'hybrid': return <Layers size={16} className="text-blue-600" />;
//       case 'onsite': return <Building size={16} className="text-amber-600" />;
//       default: return <Briefcase size={16} className="text-slate-600" />;
//     }
//   };

//   // Get experience level color
//   const getExperienceColor = () => {
//     const level = job.experienceLevel?.toLowerCase();
//     if (job.experience) {
//       if (job.experience < 2) return "bg-green-100 text-green-700";
//       if (job.experience < 5) return "bg-blue-100 text-blue-700";
//       if (job.experience < 8) return "bg-purple-100 text-purple-700";
//       return "bg-red-100 text-red-700";
//     }
//     return "bg-slate-100 text-slate-700";
//   };

//   // Get job status color (Open, Closed, Draft)
//   const getStatusColor = () => {
//     switch(job.status?.toLowerCase()) {
//       case 'open': return 'bg-green-100 text-green-700';
//       case 'closed': return 'bg-red-100 text-red-700';
//       case 'draft': return 'bg-slate-100 text-slate-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   // Get job status icon
//   const getStatusIcon = () => {
//     switch(job.status?.toLowerCase()) {
//       case 'open': return <TrendingUpIcon size={14} className="text-green-600" />;
//       case 'closed': return <X size={14} className="text-red-600" />;
//       case 'draft': return <Clock size={14} className="text-slate-600" />;
//       default: return <Clock size={14} className="text-slate-600" />;
//     }
//   };

//   // Get skill icon based on skill name
//   const getSkillIcon = (skill) => {
//     const skillLower = skill.toLowerCase();
//     if (skillLower.includes('react') || skillLower.includes('frontend')) 
//       return <Code size={14} className="text-blue-500" />;
//     if (skillLower.includes('node') || skillLower.includes('backend')) 
//       return <Server size={14} className="text-green-500" />;
//     if (skillLower.includes('design') || skillLower.includes('ui') || skillLower.includes('ux')) 
//       return <Palette size={14} className="text-pink-500" />;
//     if (skillLower.includes('data') || skillLower.includes('analyst')) 
//       return <BarChart size={14} className="text-purple-500" />;
//     if (skillLower.includes('aws') || skillLower.includes('cloud')) 
//       return <Cloud size={14} className="text-orange-500" />;
//     if (skillLower.includes('devops') || skillLower.includes('docker')) 
//       return <Database size={14} className="text-cyan-500" />;
//     return <CheckCircle size={14} className="text-slate-500" />;
//   };

//   // Handle job click
//   const handleJobClick = () => {
//     if (job._id) {
//       router.push(`/jobs/${job._id}`);
//     }
//   };

//   // Handle apply click
//   const handleApplyClick = (e) => {
//     e.stopPropagation();
//     handleJobClick();
//   };

//   // Format experience years
//   const formatExperience = () => {
//     if (!job.experience) return "Not specified";
//     return `${job.experience}+ years`;
//   };

//   // Get applications count
//   const getApplicationsCount = () => {
//     return job.applicationsCount || job.applications?.length || 0;
//   };

//   return (
//     <motion.div
//       variants={scaleIn}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1 }}
//       whileHover={{ y: -8, scale: 1.02 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group relative bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
//       onClick={handleJobClick}
//     >
//       {/* Background Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
//       {/* Like Button */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setIsLiked(!isLiked);
//         }}
//         className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all"
//       >
//         <Heart
//           size={20}
//           className={isLiked ? "fill-red-500 text-red-500" : "text-slate-400"}
//         />
//       </button>

//       <div className="relative">
//         {/* Company Header */}
//         <div className="flex items-start justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div 
//                 className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
//                 style={{ 
//                   background: job.companyColor || `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
//                 }}
//               >
//                 {job.companyLogo || job.company?.[0]?.toUpperCase() || "?"}
//               </div>
              
//               {/* Featured Badge */}
//               {job.featured && (
//                 <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                   <Star size={10} fill="white" /> Featured
//                 </div>
//               )}
              
//               {/* Job Status Badge */}
//               <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor()}`}>
//                 {getStatusIcon()}
//                 {job.status || "Open"}
//               </div>
//             </div>
            
//             <div className="flex-1">
//               <h3 className="font-bold text-xl text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-1">
//                 {job.title}
//               </h3>
//               <div className="flex items-center gap-2 mt-1">
//                 <p className="text-slate-700 font-medium">{job.company}</p>
//                 <div className="flex items-center gap-2">
//                   {/* Applications Count */}
//                   <span className="text-xs text-slate-500 flex items-center gap-1">
//                     <Users size={12} />
//                     {getApplicationsCount()} applied
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Job Details Grid */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 text-slate-600">
//               <MapPin size={18} className="text-blue-500 flex-shrink-0" />
//               <span className="font-medium truncate">{job.location}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               {getWorkTypeIcon()}
//               <span className={`font-medium px-2 py-1 rounded-full text-xs ${getWorkTypeColor()}`}>
//                 {job.type}
//               </span>
//             </div>
//           </div>
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 text-slate-600">
//               {/* <DollarSign size={18} className="text-emerald-500 flex-shrink-0" /> */}
//               <span className="text-emerald-500 flex-shrink-0" style={{ fontSize: '18px' }}>Rs</span>
//               <span className="font-medium">{formatSalary()}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               <AwardIcon size={18} className="text-purple-500 flex-shrink-0" />
//               <span className={`font-medium px-2 py-1 rounded-full text-xs ${getExperienceColor()}`}>
//                 {formatExperience()}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Job Description */}
//         <p className="text-slate-600 line-clamp-2 mb-6 text-sm">
//           {job.description}
//         </p>

//         {/* Skills Tags */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {job.skills?.slice(0, 4).map((skill, i) => (
//             <span
//               key={i}
//               className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200 flex items-center gap-1"
//             >
//               {getSkillIcon(skill)}
//               {skill}
//             </span>
//           ))}
//           {job.skills?.length > 4 && (
//             <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
//               +{job.skills.length - 4} more
//             </span>
//           )}
//         </div>

//         {/* Footer with Metadata */}
//         <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
//           <div className="flex items-center gap-4 text-sm text-slate-500">
//             <span className="flex items-center gap-1">
//               <CalendarDays size={14} />
//               {formatPostedDate()}
//             </span>
            
//             {/* Start Date if available */}
//             {job.startDate && (
//               <span className="flex items-center gap-1">
//                 <Calendar size={14} />
//                 Starts: {new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//               </span>
//             )}
//           </div>
          
//           <motion.button
//             animate={isHovered ? { x: 5 } : { x: 0 }}
//             onClick={handleApplyClick}
//             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all group/apply"
//           >
//             {job.status === 'Closed' ? 'View Details' : 'Apply Now'}
//             <ExternalLink size={16} />
//           </motion.button>
//         </div>

//         {/* Additional Info on Hover */}
//         {isHovered && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="mt-4 pt-4 border-t border-slate-200/60"
//           >
//             <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
//               {/* Experience Details */}
//               <div className="flex items-center gap-2">
//                 <GraduationCap size={16} className="text-blue-500" />
//                 <span>{job.experienceLevel || "Entry Level"}</span>
//               </div>
              
//               {/* Applications Status */}
//               <div className="flex items-center gap-2">
//                 <Users size={16} className="text-green-500" />
//                 <span>{getApplicationsCount()} applications</span>
//               </div>
              
//               {/* Created Date */}
//               {job.createdAt && (
//                 <div className="flex items-center gap-2 col-span-2">
//                   <Clock size={16} className="text-slate-500" />
//                   <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// // Animated Counter Component
// function CounterStat({ icon, end, label, suffix = "", inView, delay = 0 }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;

//     const timer = setTimeout(() => {
//       let start = 0;
//       const duration = 1800;
//       const increment = end / (duration / 16);

//       const counter = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           setCount(end);
//           clearInterval(counter);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 16);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [inView, end, delay]);

//   return (
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -8, scale: 1.05 }}
//       className="relative group"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-2xl group-hover:blur-3xl transition-all duration-500 rounded-3xl" />
//       <div className="relative bg-white/95 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
//         <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full -translate-y-10 translate-x-10" />
//         <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all">
//           {icon}
//         </div>
//         <p className="text-5xl font-black text-slate-900 text-center mb-2">
//           {count.toLocaleString()}
//           {suffix}
//         </p>
//         <p className="text-slate-600 font-medium text-center">{label}</p>
//         <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 rounded-full" />
//       </div>
//     </motion.div>
//   );
// }

// // Main Homepage Component
// export default function HomePage() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [stats, setStats] = useState({
//     jobs: 0,
//     companies: 0,
//     applications: 0,
//     remote: 0
//   });

//   const statsRef = useRef(null);
//   const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

//   // Fetch jobs from your database
//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const jobData = await jobApi.fetchJobs();
        
//         if (jobData.length === 0) {
//           setError("No jobs found in the database");
//         } else {
//           setJobs(jobData);
//           setFilteredJobs(jobData.slice(0, 8));
          
//           // Calculate statistics based on your schema
//           const companies = new Set(jobData.map(job => job.company)).size;
//           const applications = jobData.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
//           const remoteJobs = jobData.filter(job => job.type === 'Remote').length;
          
//           setStats({
//             jobs: jobData.length,
//             companies,
//             applications,
//             remote: remoteJobs
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//         setError("Failed to load jobs. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchJobs();
//   }, []);

//   // Filter jobs based on search and filters
//   useEffect(() => {
//     if (!jobs.length) return;

//     let result = [...jobs];

//     // Search filter
//     if (search.trim()) {
//       const term = search.toLowerCase();
//       result = result.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(term) ||
//           job.company?.toLowerCase().includes(term) ||
//           job.skills?.some(skill => skill.toLowerCase().includes(term)) ||
//           job.description?.toLowerCase().includes(term)
//       );
//     }

//     // Location filter
//     if (location.trim()) {
//       const loc = location.toLowerCase();
//       result = result.filter((job) => 
//         job.location?.toLowerCase().includes(loc)
//       );
//     }

//     // Job type filter
//     if (activeFilter !== "all") {
//       if (activeFilter === "remote") {
//         result = result.filter(job => job.type === 'Remote');
//       } else if (activeFilter === "featured") {
//         result = result.filter(job => job.featured);
//       } else if (activeFilter === "open") {
//         result = result.filter(job => job.status === 'Open');
//       } else if (activeFilter === "hybrid") {
//         result = result.filter(job => job.type === 'Hybrid');
//       } else if (activeFilter === "onsite") {
//         result = result.filter(job => job.type === 'Onsite');
//       }
//     }

//     setFilteredJobs(result.slice(0, 12));
//   }, [search, location, jobs, activeFilter]);

//   // Get popular searches from job data
//   const popularSearches = useMemo(() => {
//     const skills = new Set();
//     const locations = new Set();
//     const companies = new Set();
    
//     jobs.forEach(job => {
//       job.skills?.slice(0, 2).forEach(skill => skills.add(skill));
//       if (job.location) locations.add(job.location.split(',')[0].trim());
//       if (job.company) companies.add(job.company);
//     });
    
//     return [
//       ...Array.from(skills).slice(0, 3),
//       ...Array.from(companies).slice(0, 2),
//       ...Array.from(locations).slice(0, 2)
//     ];
//   }, [jobs]);

//   // Get job types for filter based on your schema
//   const jobTypes = useMemo(() => {
//     const types = [
//       { id: "all", label: "All Jobs", count: jobs.length },
//       { id: "featured", label: "Featured", count: jobs.filter(j => j.featured).length },
//       { id: "open", label: "Open", count: jobs.filter(j => j.status === 'Open').length },
//       { id: "remote", label: "Remote", count: jobs.filter(j => j.type === 'Remote').length },
//       { id: "hybrid", label: "Hybrid", count: jobs.filter(j => j.type === 'Hybrid').length },
//       { id: "onsite", label: "Onsite", count: jobs.filter(j => j.type === 'Onsite').length },
//     ];
    
//     return types;
//   }, [jobs]);

//   const handleSearch = () => {
//     // Search logic is handled by useEffect
//     console.log("Search triggered:", { search, location });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
//       {/* Hero Section */}
//       <section className="relative pt-24 pb-40 px-6 overflow-hidden">
//         {/* Background Effects */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50" />
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
//         <div className="relative max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-full px-6 py-3 shadow-lg mb-8"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                 <span className="text-emerald-700 font-medium">Live Jobs</span>
//               </div>
//               <span className="text-slate-400">|</span>
//               <span className="text-slate-600">{stats.jobs.toLocaleString()}+ opportunities</span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight"
//             >
//               Find Your
//               <br />
//               <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Dream Job
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light"
//             >
//               Connect with top companies and land your perfect role. 
//               <span className="text-slate-800 font-medium"> AI-powered matching included.</span>
//             </motion.p>

//             <SearchBar
//               search={search}
//               setSearch={setSearch}
//               location={location}
//               setLocation={setLocation}
//               onSearch={handleSearch}
//               popularSearches={popularSearches}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section ref={statsRef} className="py-20 px-6 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
//         <div className="relative max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-black text-slate-900 mb-4">
//               Job Market Insights
//             </h2>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//               Real-time statistics from our job database
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <CounterStat
//               icon={<Briefcase size={32} />}
//               end={stats.jobs}
//               label="Active Jobs"
//               inView={statsInView}
//             />
//             <CounterStat
//               icon={<Building2 size={32} />}
//               end={stats.companies}
//               label="Hiring Companies"
//               inView={statsInView}
//               delay={150}
//             />
//             <CounterStat
//               icon={<Users size={32} />}
//               end={stats.applications}
//               label="Total Applications"
//               inView={statsInView}
//               delay={300}
//             />
//             <CounterStat
//               icon={<GlobeIcon size={32} />}
//               end={stats.remote}
//               label="Remote Positions"
//               inView={statsInView}
//               delay={450}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Job Types Filter */}
//       <section className="py-10 px-6 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-wrap gap-4 justify-center">
//             {jobTypes.map((type) => (
//               <button
//                 key={type.id}
//                 onClick={() => setActiveFilter(type.id)}
//                 className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-3 ${
//                   activeFilter === type.id
//                     ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
//                     : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-md"
//                 }`}
//               >
//                 <span>{type.label}</span>
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   activeFilter === type.id
//                     ? "bg-white/20"
//                     : "bg-slate-100 text-slate-600"
//                 }`}>
//                   {type.count}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Jobs */}
//       <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
//                 Available Positions
//               </h2>
//               <p className="text-xl text-slate-600">
//                 {stats.jobs > 0 
//                   ? `Browse ${stats.jobs} positions from ${stats.companies} companies`
//                   : "Loading opportunities..."}
//               </p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.push("/jobs")}
//               className="mt-6 md:mt-0 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
//             >
//               View All Jobs
//               <ArrowRight size={20} />
//             </motion.button>
//           </div>

//           {error && !loading && (
//             <div className="text-center py-12">
//               <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
//                 <X size={32} className="text-red-500" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-3">Error Loading Jobs</h3>
//               <p className="text-slate-600 max-w-md mx-auto mb-6">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}

//           {loading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {[...Array(8)].map((_, i) => (
//                 <div key={i} className="h-[400px] bg-gradient-to-br from-slate-100/50 to-slate-200/30 rounded-3xl animate-pulse" />
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={stagger}
//               className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//             >
//               {filteredJobs.map((job, index) => (
//                 <JobCard key={job._id} job={job} index={index} />
//               ))}
//             </motion.div>
//           )}

//           {!loading && filteredJobs.length === 0 && jobs.length > 0 && (
//             <div className="text-center py-20">
//               <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
//                 <Search size={32} className="text-slate-400" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-3">No matching jobs found</h3>
//               <p className="text-slate-600 max-w-md mx-auto mb-6">
//                 Try adjusting your search filters or explore different categories
//               </p>
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setLocation("");
//                   setActiveFilter("all");
//                 }}
//                 className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           )}

//           {!loading && jobs.length === 0 && !error && (
//             <div className="text-center py-20">
//               <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
//                 <Briefcase size={32} className="text-amber-500" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-3">No Jobs Available</h3>
//               <p className="text-slate-600 max-w-md mx-auto">
//                 There are currently no job listings in the database. Check back soon!
//               </p>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Globe,
//   Award,
//   CheckCircle,
//   Clock,
//   DollarSign,
//   ChevronRight,
//   Star,
//   Rocket,
//   Target,
//   Shield,
//   Heart,
//   Filter,
//   X,
//   Loader2,
//   ExternalLink,
//   Building,
//   Code,
//   Palette,
//   BarChart,
//   Cpu,
//   Cloud,
//   Server,
//   Smartphone,
//   Database,
//   Calendar,
//   GraduationCap,
//   Languages,
//   Layers,
//   Target as TargetIcon,
//   Mail,
//   Phone,
//   Map,
//   Globe as GlobeIcon,
//   CalendarDays,
//   Award as AwardIcon,
//   TrendingUp as TrendingUpIcon,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import Image from "next/image";

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
// };

// const stagger = {
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "backOut" } },
// };

// // Database API Service based on your schema
// const jobApi = {
//   async fetchJobs() {
//     try {
//       console.log("Fetching jobs from database...");
//       const res = await fetch("/api/jobs", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Cache-Control": "no-cache",
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch jobs: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("Fetched jobs:", data.length);
      
//       // Transform data according to your schema
//       return this.transformJobData(data);
//     } catch (error) {
//       console.error("Error fetching jobs from database:", error);
//       return [];
//     }
//   },

//   async fetchJobById(id) {
//     try {
//       const res = await fetch(`/api/jobs/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch job ${id}: ${res.status}`);
//       }

//       const data = await res.json();
//       return this.transformSingleJob(data);
//     } catch (error) {
//       console.error(`Error fetching job ${id}:`, error);
//       return null;
//     }
//   },

//   transformJobData(jobs) {
//     return jobs.map(job => this.transformSingleJob(job));
//   },

//   transformSingleJob(job) {
//     // Transform according to your schema
//     return {
//       // ===== Basic Job Info =====
//       _id: job._id || job.id || `job-${Date.now()}`,
//       title: job.title || "Untitled Position",
//       company: job.company || "Unknown Company",
//       location: job.location || "Location not specified",
      
//       // ===== Job Details =====
//       salary: this.parseSalary(job.salary),
//       description: job.description || "No description available",
//       startDate: job.startDate,
//       endDate: job.endDate,
//       experience: job.experience || 0,
//       status: job.status || "Open",
//       type: job.type || "Remote", // Remote, Hybrid, Onsite
//       skills: job.skills || [],
//       featured: job.featured || false,
      
//       // ===== Job Applications =====
//       applications: job.applications || [],
//       applicationsCount: job.applications?.length || 0,
      
//       // ===== Derived Fields =====
//       postedDate: job.createdAt || new Date(),
//       companyLogo: this.getCompanyLogo(job.company),
//       companyColor: this.generateCompanyColor(job.company),
//       experienceLevel: this.getExperienceLevel(job.experience),
      
//       // ===== Schema Fields =====
//       createdAt: job.createdAt,
//       updatedAt: job.updatedAt,
//     };
//   },

//   parseSalary(salaryString) {
//     if (!salaryString) return { min: 60000, max: 120000, currency: "INR" };
    
//     try {
//       // Handle different salary formats
//       const match = salaryString.match(/(?:Rs\.?\s*|₹)?(\d+(?:,\d+)?(?:\.\d+)?)\s*(?:-|to)\s*(?:Rs\.?\s*|₹)?(\d+(?:,\d+)?(?:\.\d+)?)/i);
//       if (match) {
//         const min = parseInt(match[1].replace(/[₹,$,]/g, '').replace(/,/g, ''));
//         const max = parseInt(match[2].replace(/[₹,$,]/g, '').replace(/,/g, ''));
//         return { min, max, currency: "INR" };
//       }
      
//       // Handle single salary
//       const singleMatch = salaryString.match(/(?:Rs\.?\s*|₹)?(\d+(?:,\d+)?(?:\.\d+)?)/i);
//       if (singleMatch) {
//         const amount = parseInt(singleMatch[1].replace(/[₹,$,]/g, '').replace(/,/g, ''));
//         return { min: amount, max: amount * 1.2, currency: "INR" };
//       }
//     } catch (e) {
//       console.warn("Failed to parse salary:", salaryString);
//     }
    
//     return { min: 60000, max: 120000, currency: "INR" };
//   },

//   getCompanyLogo(companyName) {
//     // In a real app, you might store logo URLs in the database
//     // For now, return first letter
//     return companyName?.[0]?.toUpperCase() || "?";
//   },

//   generateCompanyColor(companyName) {
//     const colors = [
//       '#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF6B6B', '#4ECDC4', '#45B7D1', 
//       '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
//     ];
//     const hash = companyName?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
//     return colors[hash % colors.length];
//   },

//   getExperienceLevel(experienceYears) {
//     if (!experienceYears) return "Entry Level";
//     if (experienceYears < 2) return "Entry Level";
//     if (experienceYears < 5) return "Mid Level";
//     if (experienceYears < 8) return "Senior Level";
//     return "Expert Level";
//   },
// };

// // Glass Search Bar Component
// function SearchBar({ search, setSearch, location, setLocation, onSearch, popularSearches = [] }) {
//   const [isFocused, setIsFocused] = useState(false);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       onSearch();
//     }
//   };

//   return (
//     <motion.div
//       variants={fadeInUp}
//       className="relative max-w-5xl mx-auto px-4"
//       animate={{ y: isFocused ? -10 : 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/25 shadow-2xl shadow-indigo-500/20 rounded-3xl p-2">
//         <div className="bg-gradient-to-br from-white/98 via-white/95 to-white/90 backdrop-blur-md rounded-2xl p-1">
//           <div className="bg-white/80 rounded-2xl p-6 md:p-8 grid md:grid-cols-12 gap-4">
//             <div className="md:col-span-5">
//               <div className="relative flex items-center">
//                 <div className="absolute left-5 z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/50">
//                   <Search size={22} />
//                 </div>
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   placeholder="Job title, skills, or company"
//                   className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-200/80 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all text-lg placeholder:text-slate-400 hover:border-slate-300"
//                   onKeyDown={handleKeyDown}
//                 />
//               </div>
//             </div>

//             <div className="md:col-span-5">
//               <div className="relative flex items-center">
//                 <div className="absolute left-5 z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg shadow-blue-500/50">
//                   <MapPin size={22} />
//                 </div>
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   placeholder="City, remote, or anywhere"
//                   className="w-full pl-20 pr-6 py-5 bg-transparent border-2 border-slate-200/80 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all text-lg placeholder:text-slate-400 hover:border-slate-300"
//                   onKeyDown={handleKeyDown}
//                 />
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={onSearch}
//               className="md:col-span-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 group"
//             >
//               Search
//               <motion.div
//                 animate={{ x: [0, 5, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <Zap size={22} className="group-hover:rotate-12 transition-transform" />
//               </motion.div>
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Popular Searches */}
//       {popularSearches.length > 0 && (
//         <div className="mt-6 flex flex-wrap gap-2 justify-center">
//           <span className="text-slate-600 text-sm mr-2">Popular:</span>
//           {popularSearches.map((term, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setSearch(term);
//                 onSearch();
//               }}
//               className="px-3 py-1.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-white hover:shadow-sm transition-all"
//             >
//               {term}
//             </button>
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );
// }

// // Enhanced Job Card Component - Based on your exact schema
// function JobCard({ job, index }) {
//   const router = useRouter();
//   const [isLiked, setIsLiked] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   // Format salary from your schema's salary string
//   const formatSalary = () => {
//     if (job.salaryString) {
//       return job.salaryString;
//     }
    
//     if (job.salary) {
//       const { min, max, currency = "INR" } = job.salary;
//       if (currency === "INR") {
//         return `Rs ${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k`;
//       }
//       return `${currency} ${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k`;
//     }
    
//     return "Competitive Salary";
//   };

//   // Format posted date from createdAt
//   const formatPostedDate = () => {
//     if (!job.createdAt) return "Recently";
//     try {
//       const date = new Date(job.createdAt);
//       if (isNaN(date.getTime())) return "Recently";
      
//       const now = new Date();
//       const diffTime = Math.abs(now - date);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays === 0) return "Today";
//       if (diffDays === 1) return "Yesterday";
//       if (diffDays < 7) return `${diffDays}d ago`;
//       if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
//       return `${Math.floor(diffDays / 30)}mo ago`;
//     } catch (error) {
//       return "Recently";
//     }
//   };

//   // Get work type color based on your schema (Remote, Hybrid, Onsite)
//   const getWorkTypeColor = () => {
//     switch(job.type?.toLowerCase()) {
//       case 'remote': return 'bg-emerald-100 text-emerald-700';
//       case 'hybrid': return 'bg-blue-100 text-blue-700';
//       case 'onsite': return 'bg-amber-100 text-amber-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   // Get work type icon
//   const getWorkTypeIcon = () => {
//     switch(job.type?.toLowerCase()) {
//       case 'remote': return <GlobeIcon size={16} className="text-emerald-600" />;
//       case 'hybrid': return <Layers size={16} className="text-blue-600" />;
//       case 'onsite': return <Building size={16} className="text-amber-600" />;
//       default: return <Briefcase size={16} className="text-slate-600" />;
//     }
//   };

//   // Get experience level color
//   const getExperienceColor = () => {
//     const level = job.experienceLevel?.toLowerCase();
//     if (job.experience) {
//       if (job.experience < 2) return "bg-green-100 text-green-700";
//       if (job.experience < 5) return "bg-blue-100 text-blue-700";
//       if (job.experience < 8) return "bg-purple-100 text-purple-700";
//       return "bg-red-100 text-red-700";
//     }
//     return "bg-slate-100 text-slate-700";
//   };

//   // Get job status color (Open, Closed, Draft)
//   const getStatusColor = () => {
//     switch(job.status?.toLowerCase()) {
//       case 'open': return 'bg-green-100 text-green-700';
//       case 'closed': return 'bg-red-100 text-red-700';
//       case 'draft': return 'bg-slate-100 text-slate-700';
//       default: return 'bg-slate-100 text-slate-700';
//     }
//   };

//   // Get job status icon
//   const getStatusIcon = () => {
//     switch(job.status?.toLowerCase()) {
//       case 'open': return <TrendingUpIcon size={14} className="text-green-600" />;
//       case 'closed': return <X size={14} className="text-red-600" />;
//       case 'draft': return <Clock size={14} className="text-slate-600" />;
//       default: return <Clock size={14} className="text-slate-600" />;
//     }
//   };

//   // Get skill icon based on skill name
//   const getSkillIcon = (skill) => {
//     const skillLower = skill.toLowerCase();
//     if (skillLower.includes('react') || skillLower.includes('frontend')) 
//       return <Code size={14} className="text-blue-500" />;
//     if (skillLower.includes('node') || skillLower.includes('backend')) 
//       return <Server size={14} className="text-green-500" />;
//     if (skillLower.includes('design') || skillLower.includes('ui') || skillLower.includes('ux')) 
//       return <Palette size={14} className="text-pink-500" />;
//     if (skillLower.includes('data') || skillLower.includes('analyst')) 
//       return <BarChart size={14} className="text-purple-500" />;
//     if (skillLower.includes('aws') || skillLower.includes('cloud')) 
//       return <Cloud size={14} className="text-orange-500" />;
//     if (skillLower.includes('devops') || skillLower.includes('docker')) 
//       return <Database size={14} className="text-cyan-500" />;
//     return <CheckCircle size={14} className="text-slate-500" />;
//   };

//   // Handle job click
//   const handleJobClick = () => {
//     if (job._id) {
//       router.push(`/jobs/${job._id}`);
//     }
//   };

//   // Handle apply click
//   const handleApplyClick = (e) => {
//     e.stopPropagation();
//     handleJobClick();
//   };

//   // Format experience years
//   const formatExperience = () => {
//     if (!job.experience) return "Not specified";
//     return `${job.experience}+ years`;
//   };

//   // Get applications count
//   const getApplicationsCount = () => {
//     return job.applicationsCount || job.applications?.length || 0;
//   };

//   return (
//     <motion.div
//       variants={scaleIn}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1 }}
//       whileHover={{ y: -8, scale: 1.02 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group relative bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
//       onClick={handleJobClick}
//     >
//       {/* Background Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
//       {/* Like Button */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           setIsLiked(!isLiked);
//         }}
//         className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all"
//       >
//         <Heart
//           size={20}
//           className={isLiked ? "fill-red-500 text-red-500" : "text-slate-400"}
//         />
//       </button>

//       <div className="relative">
//         {/* Company Header */}
//         <div className="flex items-start justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div 
//                 className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
//                 style={{ 
//                   background: job.companyColor || `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
//                 }}
//               >
//                 {job.companyLogo || job.company?.[0]?.toUpperCase() || "?"}
//               </div>
              
//               {/* Featured Badge */}
//               {job.featured && (
//                 <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                   <Star size={10} fill="white" /> Featured
//                 </div>
//               )}
              
//               {/* Job Status Badge */}
//               <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor()}`}>
//                 {getStatusIcon()}
//                 {job.status || "Open"}
//               </div>
//             </div>
            
//             <div className="flex-1">
//               <h3 className="font-bold text-xl text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-1">
//                 {job.title}
//               </h3>
//               <div className="flex items-center gap-2 mt-1">
//                 <p className="text-slate-700 font-medium">{job.company}</p>
//                 <div className="flex items-center gap-2">
//                   {/* Applications Count */}
//                   <span className="text-xs text-slate-500 flex items-center gap-1">
//                     <Users size={12} />
//                     {getApplicationsCount()} applied
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Job Details Grid */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 text-slate-600">
//               <MapPin size={18} className="text-blue-500 flex-shrink-0" />
//               <span className="font-medium truncate">{job.location}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               {getWorkTypeIcon()}
//               <span className={`font-medium px-2 py-1 rounded-full text-xs ${getWorkTypeColor()}`}>
//                 {job.type}
//               </span>
//             </div>
//           </div>
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 text-slate-600">
//               <span className="text-emerald-500 font-bold flex-shrink-0" style={{ fontSize: '16px' }}>Rs</span>
//               <span className="font-medium">{formatSalary()}</span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               <AwardIcon size={18} className="text-purple-500 flex-shrink-0" />
//               <span className={`font-medium px-2 py-1 rounded-full text-xs ${getExperienceColor()}`}>
//                 {formatExperience()}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Job Description */}
//         <p className="text-slate-600 line-clamp-2 mb-6 text-sm">
//           {job.description}
//         </p>

//         {/* Skills Tags */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {job.skills?.slice(0, 4).map((skill, i) => (
//             <span
//               key={i}
//               className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200 flex items-center gap-1"
//             >
//               {getSkillIcon(skill)}
//               {skill}
//             </span>
//           ))}
//           {job.skills?.length > 4 && (
//             <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
//               +{job.skills.length - 4} more
//             </span>
//           )}
//         </div>

//         {/* Footer with Metadata */}
//         <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
//           <div className="flex items-center gap-4 text-sm text-slate-500">
//             <span className="flex items-center gap-1">
//               <CalendarDays size={14} />
//               {formatPostedDate()}
//             </span>
            
//             {/* Start Date if available */}
//             {job.startDate && (
//               <span className="flex items-center gap-1">
//                 <Calendar size={14} />
//                 Starts: {new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//               </span>
//             )}
//           </div>
          
//           <motion.button
//             animate={isHovered ? { x: 5 } : { x: 0 }}
//             onClick={handleApplyClick}
//             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all group/apply"
//           >
//             {job.status === 'Closed' ? 'View Details' : 'Apply Now'}
//             <ExternalLink size={16} />
//           </motion.button>
//         </div>

//         {/* Additional Info on Hover */}
//         {isHovered && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="mt-4 pt-4 border-t border-slate-200/60"
//           >
//             <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
//               {/* Experience Details */}
//               <div className="flex items-center gap-2">
//                 <GraduationCap size={16} className="text-blue-500" />
//                 <span>{job.experienceLevel || "Entry Level"}</span>
//               </div>
              
//               {/* Applications Status */}
//               <div className="flex items-center gap-2">
//                 <Users size={16} className="text-green-500" />
//                 <span>{getApplicationsCount()} applications</span>
//               </div>
              
//               {/* Created Date */}
//               {job.createdAt && (
//                 <div className="flex items-center gap-2 col-span-2">
//                   <Clock size={16} className="text-slate-500" />
//                   <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// // Animated Counter Component
// function CounterStat({ icon, end, label, suffix = "", inView, delay = 0 }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;

//     const timer = setTimeout(() => {
//       let start = 0;
//       const duration = 1800;
//       const increment = end / (duration / 16);

//       const counter = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           setCount(end);
//           clearInterval(counter);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 16);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [inView, end, delay]);

//   return (
//     <motion.div
//       variants={scaleIn}
//       whileHover={{ y: -8, scale: 1.05 }}
//       className="relative group"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-2xl group-hover:blur-3xl transition-all duration-500 rounded-3xl" />
//       <div className="relative bg-white/95 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
//         <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full -translate-y-10 translate-x-10" />
//         <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all">
//           {icon}
//         </div>
//         <p className="text-5xl font-black text-slate-900 text-center mb-2">
//           {count.toLocaleString()}
//           {suffix}
//         </p>
//         <p className="text-slate-600 font-medium text-center">{label}</p>
//         <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 rounded-full" />
//       </div>
//     </motion.div>
//   );
// }

// // Main Homepage Component
// export default function HomePage() {
//   const router = useRouter();
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [stats, setStats] = useState({
//     jobs: 0,
//     companies: 0,
//     applications: 0,
//     remote: 0
//   });

//   const statsRef = useRef(null);
//   const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

//   // Fetch jobs from your database
//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const jobData = await jobApi.fetchJobs();
        
//         if (jobData.length === 0) {
//           setError("No jobs found in the database");
//         } else {
//           setJobs(jobData);
//           setFilteredJobs(jobData.slice(0, 8));
          
//           // Calculate statistics based on your schema
//           const companies = new Set(jobData.map(job => job.company)).size;
//           const applications = jobData.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
//           const remoteJobs = jobData.filter(job => job.type === 'Remote').length;
          
//           setStats({
//             jobs: jobData.length,
//             companies,
//             applications,
//             remote: remoteJobs
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//         setError("Failed to load jobs. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchJobs();
//   }, []);

//   // Filter jobs based on search and filters
//   useEffect(() => {
//     if (!jobs.length) return;

//     let result = [...jobs];

//     // Search filter
//     if (search.trim()) {
//       const term = search.toLowerCase();
//       result = result.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(term) ||
//           job.company?.toLowerCase().includes(term) ||
//           job.skills?.some(skill => skill.toLowerCase().includes(term)) ||
//           job.description?.toLowerCase().includes(term)
//       );
//     }

//     // Location filter
//     if (location.trim()) {
//       const loc = location.toLowerCase();
//       result = result.filter((job) => 
//         job.location?.toLowerCase().includes(loc)
//       );
//     }

//     // Job type filter
//     if (activeFilter !== "all") {
//       if (activeFilter === "remote") {
//         result = result.filter(job => job.type === 'Remote');
//       } else if (activeFilter === "featured") {
//         result = result.filter(job => job.featured);
//       } else if (activeFilter === "open") {
//         result = result.filter(job => job.status === 'Open');
//       } else if (activeFilter === "hybrid") {
//         result = result.filter(job => job.type === 'Hybrid');
//       } else if (activeFilter === "onsite") {
//         result = result.filter(job => job.type === 'Onsite');
//       }
//     }

//     setFilteredJobs(result.slice(0, 12));
//   }, [search, location, jobs, activeFilter]);

//   // Get popular searches from job data
//   const popularSearches = useMemo(() => {
//     const skills = new Set();
//     const locations = new Set();
//     const companies = new Set();
    
//     jobs.forEach(job => {
//       job.skills?.slice(0, 2).forEach(skill => skills.add(skill));
//       if (job.location) locations.add(job.location.split(',')[0].trim());
//       if (job.company) companies.add(job.company);
//     });
    
//     return [
//       ...Array.from(skills).slice(0, 3),
//       ...Array.from(companies).slice(0, 2),
//       ...Array.from(locations).slice(0, 2)
//     ];
//   }, [jobs]);

//   // Get job types for filter based on your schema
//   const jobTypes = useMemo(() => {
//     const types = [
//       { id: "all", label: "All Jobs", count: jobs.length },
//       { id: "featured", label: "Featured", count: jobs.filter(j => j.featured).length },
//       { id: "open", label: "Open", count: jobs.filter(j => j.status === 'Open').length },
//       { id: "remote", label: "Remote", count: jobs.filter(j => j.type === 'Remote').length },
//       { id: "hybrid", label: "Hybrid", count: jobs.filter(j => j.type === 'Hybrid').length },
//       { id: "onsite", label: "Onsite", count: jobs.filter(j => j.type === 'Onsite').length },
//     ];
    
//     return types;
//   }, [jobs]);

//   const handleSearch = () => {
//     // Search logic is handled by useEffect
//     console.log("Search triggered:", { search, location });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
//       {/* Hero Section */}
//       <section className="relative pt-24 pb-40 px-6 overflow-hidden">
//         {/* Background Effects */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50" />
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
//         <div className="relative max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-full px-6 py-3 shadow-lg mb-8"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                 <span className="text-emerald-700 font-medium">Live Jobs</span>
//               </div>
//               <span className="text-slate-400">|</span>
//               <span className="text-slate-600">{stats.jobs.toLocaleString()}+ opportunities</span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight"
//             >
//               Find Your
//               <br />
//               <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Dream Job
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light"
//             >
//               Connect with top companies and land your perfect role. 
//               <span className="text-slate-800 font-medium"> AI-powered matching included.</span>
//             </motion.p>

//             <SearchBar
//               search={search}
//               setSearch={setSearch}
//               location={location}
//               setLocation={setLocation}
//               onSearch={handleSearch}
//               popularSearches={popularSearches}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section ref={statsRef} className="py-20 px-6 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
//         <div className="relative max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-black text-slate-900 mb-4">
//               Job Market Insights
//             </h2>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//               Real-time statistics from our job database
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <CounterStat
//               icon={<Briefcase size={32} />}
//               end={stats.jobs}
//               label="Active Jobs"
//               inView={statsInView}
//             />
//             <CounterStat
//               icon={<Building2 size={32} />}
//               end={stats.companies}
//               label="Hiring Companies"
//               inView={statsInView}
//               delay={150}
//             />
//             <CounterStat
//               icon={<Users size={32} />}
//               end={stats.applications}
//               label="Total Applications"
//               inView={statsInView}
//               delay={300}
//             />
//             <CounterStat
//               icon={<GlobeIcon size={32} />}
//               end={stats.remote}
//               label="Remote Positions"
//               inView={statsInView}
//               delay={450}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Job Types Filter */}
//       <section className="py-10 px-6 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-wrap gap-4 justify-center">
//             {jobTypes.map((type) => (
//               <button
//                 key={type.id}
//                 onClick={() => setActiveFilter(type.id)}
//                 className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-3 ${
//                   activeFilter === type.id
//                     ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
//                     : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-md"
//                 }`}
//               >
//                 <span>{type.label}</span>
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                   activeFilter === type.id
//                     ? "bg-white/20"
//                     : "bg-slate-100 text-slate-600"
//                 }`}>
//                   {type.count}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Jobs */}
//       <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
//                 Available Positions
//               </h2>
//               <p className="text-xl text-slate-600">
//                 {stats.jobs > 0 
//                   ? `Browse ${stats.jobs} positions from ${stats.companies} companies`
//                   : "Loading opportunities..."}
//               </p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.push("/jobs")}
//               className="mt-6 md:mt-0 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
//             >
//               View All Jobs
//               <ArrowRight size={20} />
//             </motion.button>
//           </div>

//           {error && !loading && (
//             <div className="text-center py-12">
//               <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
//                 <X size={32} className="text-red-500" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-3">Error Loading Jobs</h3>
//               <p className="text-slate-600 max-w-md mx-auto mb-6">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}

//           {loading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {[...Array(8)].map((_, i) => (
//                 <div key={i} className="h-[400px] bg-gradient-to-br from-slate-100/50 to-slate-200/30 rounded-3xl animate-pulse" />
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={stagger}
//               className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//             >
//               {filteredJobs.map((job, index) => (
//                 <JobCard key={job._id} job={job} index={index} />
//               ))}
//             </motion.div>
//           )}

//           {!loading && filteredJobs.length === 0 && jobs.length > 0 && (
//             <div className="text-center py-20">
//               <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
//                 <Search size={32} className="text-slate-400" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-3">No matching jobs found</h3>
//               <p className="text-slate-600 max-w-md mx-auto mb-6">
//                 Try adjusting your search filters or explore different categories
//               </p>
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setLocation("");
//                   setActiveFilter("all");
//                 }}
//                 className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           )}

//           {!loading && jobs.length === 0 && !error && (
//             <div className="text-center py-20">
//               <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
//                 <Briefcase size={32} className="text-amber-500" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-3">No Jobs Available</h3>
//               <p className="text-slate-600 max-w-md mx-auto">
//                 There are currently no job listings in the database. Check back soon!
//               </p>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  ArrowRight,
  Zap,
  Sparkles,
  Globe,
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  ChevronRight,
  Star,
  Rocket,
  Target,
  Shield,
  Heart,
  Filter,
  X,
  Loader2,
  ExternalLink,
  Building,
  Code,
  Palette,
  BarChart,
  Cpu,
  Cloud,
  Server,
  Smartphone,
  Database,
  Calendar,
  GraduationCap,
  Languages,
  Layers,
  Target as TargetIcon,
  Mail,
  Phone,
  Map,
  Globe as GlobeIcon,
  CalendarDays,
  Award as AwardIcon,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "backOut" } },
};

// Database API Service based on your schema
const jobApi = {
  async fetchJobs() {
    try {
      console.log("Fetching jobs from database...");
      const res = await fetch("/api/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch jobs: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched jobs:", data.length);
      
      // Transform data according to your schema
      return this.transformJobData(data);
    } catch (error) {
      console.error("Error fetching jobs from database:", error);
      return [];
    }
  },

  async fetchJobById(id) {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch job ${id}: ${res.status}`);
      }

      const data = await res.json();
      return this.transformSingleJob(data);
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      return null;
    }
  },

  transformJobData(jobs) {
    return jobs.map(job => this.transformSingleJob(job));
  },

  transformSingleJob(job) {
    // Transform according to your schema
    return {
      // ===== Basic Job Info =====
      _id: job._id || job.id || `job-${Date.now()}`,
      title: job.title || "Untitled Position",
      company: job.company || "Unknown Company",
      location: job.location || "Location not specified",
      
      // ===== Job Details =====
      salary: this.parseSalary(job.salary),
      description: job.description || "No description available",
      startDate: job.startDate,
      endDate: job.endDate,
      experience: job.experience || 0,
      status: job.status || "Open",
      type: job.type || "Remote", // Remote, Hybrid, Onsite
      skills: job.skills || [],
      featured: job.featured || false,
      
      // ===== Job Applications =====
      applications: job.applications || [],
      applicationsCount: job.applications?.length || 0,
      
      // ===== Derived Fields =====
      postedDate: job.createdAt || new Date(),
      companyLogo: this.getCompanyLogo(job.company),
      companyColor: this.generateCompanyColor(job.company),
      experienceLevel: this.getExperienceLevel(job.experience),
      
      // ===== Schema Fields =====
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  },

  parseSalary(salaryString) {
    if (!salaryString) return { min: 80000, max: 160000, currency: "PKR" };
    
    try {
      // Handle different salary formats (PKR instead of INR)
      const match = salaryString.match(/(?:Rs\.?\s*|Rs|PKR\.?\s*|PKR)?\s*(\d+(?:,\d+)?(?:\.\d+)?)\s*(?:-|to)\s*(?:Rs\.?\s*|Rs|PKR\.?\s*|PKR)?\s*(\d+(?:,\d+)?(?:\.\d+)?)/i);
      if (match) {
        const min = parseInt(match[1].replace(/[PKR,Rs,$,]/g, '').replace(/,/g, ''));
        const max = parseInt(match[2].replace(/[PKR,Rs,$,]/g, '').replace(/,/g, ''));
        return { min, max, currency: "PKR" };
      }
      
      // Handle single salary
      const singleMatch = salaryString.match(/(?:Rs\.?\s*|Rs|PKR\.?\s*|PKR)?\s*(\d+(?:,\d+)?(?:\.\d+)?)/i);
      if (singleMatch) {
        const amount = parseInt(singleMatch[1].replace(/[PKR,Rs,$,]/g, '').replace(/,/g, ''));
        return { min: amount, max: amount * 1.2, currency: "PKR" };
      }
    } catch (e) {
      console.warn("Failed to parse salary:", salaryString);
    }
    
    return { min: 80000, max: 160000, currency: "PKR" };
  },

  getCompanyLogo(companyName) {
    // In a real app, you might store logo URLs in the database
    // For now, return first letter
    return companyName?.[0]?.toUpperCase() || "?";
  },

  generateCompanyColor(companyName) {
    const colors = [
      '#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF6B6B', '#4ECDC4', '#45B7D1', 
      '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const hash = companyName?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  },

  getExperienceLevel(experienceYears) {
    if (!experienceYears) return "Entry Level";
    if (experienceYears < 2) return "Entry Level";
    if (experienceYears < 5) return "Mid Level";
    if (experienceYears < 8) return "Senior Level";
    return "Expert Level";
  },
};

// Glass Search Bar Component
function SearchBar({ search, setSearch, location, setLocation, onSearch, popularSearches = [] }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="relative max-w-5xl mx-auto px-4"
      animate={{ y: isFocused ? -5 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/25 shadow-2xl shadow-indigo-500/20 rounded-2xl p-1">
        <div className="bg-gradient-to-br from-white/98 via-white/95 to-white/90 backdrop-blur-md rounded-xl p-1">
          <div className="bg-white/80 rounded-xl p-4 md:p-6 grid md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg shadow-lg shadow-indigo-500/50">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Job title, skills, or company"
                  className="w-full pl-16 pr-4 py-3 bg-transparent border border-slate-200/80 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100/50 outline-none transition-all text-base placeholder:text-slate-400 hover:border-slate-300"
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg shadow-blue-500/50">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="City, remote, or anywhere"
                  className="w-full pl-16 pr-4 py-3 bg-transparent border border-slate-200/80 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 outline-none transition-all text-base placeholder:text-slate-400 hover:border-slate-300"
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSearch}
              className="md:col-span-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 group p-3"
            >
              Search
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap size={18} className="group-hover:rotate-12 transition-transform" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      {popularSearches.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-slate-500 text-xs mr-2 font-medium">Popular:</span>
          {popularSearches.map((term, index) => (
            <button
              key={index}
              onClick={() => {
                setSearch(term);
                onSearch();
              }}
              className="px-2.5 py-1 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Enhanced Job Card Component - Based on your exact schema
function JobCard({ job, index }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format salary from your schema's salary string (PKR instead of INR)
  const formatSalary = () => {
    if (job.salaryString) {
      return job.salaryString;
    }
    
    if (job.salary) {
      const { min, max, currency = "PKR" } = job.salary;
      if (currency === "PKR") {
        // Format for PKR (Pakistani Rupees)
        if (max >= 100000) {
          // Show in lakhs for larger amounts
          return `Rs ${(min / 100000).toFixed(1)}L - ${(max / 100000).toFixed(1)}L`;
        } else {
          // Show in thousands for smaller amounts
          return `Rs ${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k`;
        }
      }
      return `${currency} ${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k`;
    }
    
    return "Competitive Salary";
  };

  // Format posted date from createdAt
  const formatPostedDate = () => {
    if (!job.createdAt) return "Recently";
    try {
      const date = new Date(job.createdAt);
      if (isNaN(date.getTime())) return "Recently";
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
      return `${Math.floor(diffDays / 30)}mo ago`;
    } catch (error) {
      return "Recently";
    }
  };

  // Get work type color based on your schema (Remote, Hybrid, Onsite)
  const getWorkTypeColor = () => {
    switch(job.type?.toLowerCase()) {
      case 'remote': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'hybrid': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'onsite': return 'bg-amber-100 text-amber-700 border border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  // Get work type icon
  const getWorkTypeIcon = () => {
    switch(job.type?.toLowerCase()) {
      case 'remote': return <GlobeIcon size={14} className="text-emerald-600" />;
      case 'hybrid': return <Layers size={14} className="text-blue-600" />;
      case 'onsite': return <Building size={14} className="text-amber-600" />;
      default: return <Briefcase size={14} className="text-slate-600" />;
    }
  };

  // Get experience level color
  const getExperienceColor = () => {
    const level = job.experienceLevel?.toLowerCase();
    if (job.experience) {
      if (job.experience < 2) return "bg-green-100 text-green-700 border border-green-200";
      if (job.experience < 5) return "bg-blue-100 text-blue-700 border border-blue-200";
      if (job.experience < 8) return "bg-purple-100 text-purple-700 border border-purple-200";
      return "bg-red-100 text-red-700 border border-red-200";
    }
    return "bg-slate-100 text-slate-700 border border-slate-200";
  };

  // Get job status color (Open, Closed, Draft)
  const getStatusColor = () => {
    switch(job.status?.toLowerCase()) {
      case 'open': return 'bg-green-100 text-green-700 border border-green-200';
      case 'closed': return 'bg-red-100 text-red-700 border border-red-200';
      case 'draft': return 'bg-slate-100 text-slate-700 border border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  // Get job status icon
  const getStatusIcon = () => {
    switch(job.status?.toLowerCase()) {
      case 'open': return <TrendingUpIcon size={12} className="text-green-600" />;
      case 'closed': return <X size={12} className="text-red-600" />;
      case 'draft': return <Clock size={12} className="text-slate-600" />;
      default: return <Clock size={12} className="text-slate-600" />;
    }
  };

  // Get skill icon based on skill name
  const getSkillIcon = (skill) => {
    const skillLower = skill.toLowerCase();
    if (skillLower.includes('react') || skillLower.includes('frontend')) 
      return <Code size={12} className="text-blue-500" />;
    if (skillLower.includes('node') || skillLower.includes('backend')) 
      return <Server size={12} className="text-green-500" />;
    if (skillLower.includes('design') || skillLower.includes('ui') || skillLower.includes('ux')) 
      return <Palette size={12} className="text-pink-500" />;
    if (skillLower.includes('data') || skillLower.includes('analyst')) 
      return <BarChart size={12} className="text-purple-500" />;
    if (skillLower.includes('aws') || skillLower.includes('cloud')) 
      return <Cloud size={12} className="text-orange-500" />;
    if (skillLower.includes('devops') || skillLower.includes('docker')) 
      return <Database size={12} className="text-cyan-500" />;
    return <CheckCircle size={12} className="text-slate-500" />;
  };

  // Handle job click
  const handleJobClick = () => {
    if (job._id) {
      router.push(`/jobs/${job._id}`);
    }
  };

  // Handle apply click
  const handleApplyClick = (e) => {
    e.stopPropagation();
    handleJobClick();
  };

  // Format experience years
  const formatExperience = () => {
    if (!job.experience) return "Not specified";
    return `${job.experience}+ years`;
  };

  // Get applications count
  const getApplicationsCount = () => {
    return job.applicationsCount || job.applications?.length || 0;
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleJobClick}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Like Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
      >
        {/* <Heart
          size={16}
          className={isLiked ? "fill-red-500 text-red-500" : "text-slate-400"}
        /> */}
      </button>

      <div className="relative">
        {/* Company Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md"
                style={{ 
                  background: job.companyColor || `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
                }}
              >
                {job.companyLogo || job.company?.[0]?.toUpperCase() || "?"}
              </div>
              
              {/* Featured Badge */}
              {job.featured && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Star size={8} fill="white" /> Featured
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-slate-800 group-hover:text-indigo-700 transition-colors truncate mb-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-slate-700 font-medium text-sm truncate">{job.company}</p>
                <div className="flex items-center gap-1.5">
                  {/* Job Status Badge */}
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-0.5 ${getStatusColor()}`}>
                    {getStatusIcon()}
                    {job.status || "Open"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-slate-600">
              <MapPin size={14} className="text-blue-500 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              {getWorkTypeIcon()}
              <span className={`font-medium px-2 py-1 rounded-lg text-xs ${getWorkTypeColor()}`}>
                {job.type}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="text-green-600 font-bold flex-shrink-0 text-base">Rs</span>
              <span className="text-sm font-medium truncate">{formatSalary()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <AwardIcon size={14} className="text-purple-500 flex-shrink-0" />
              <span className={`font-medium px-2 py-1 rounded-lg text-xs ${getExperienceColor()}`}>
                {formatExperience()}
              </span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <p className="text-slate-600 line-clamp-2 mb-4 text-sm leading-relaxed">
          {job.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills?.slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 flex items-center gap-1"
            >
              {getSkillIcon(skill)}
              {skill.length > 12 ? `${skill.substring(0, 10)}...` : skill}
            </span>
          ))}
          {job.skills?.length > 4 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        {/* Footer with Metadata */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CalendarDays size={12} />
              {formatPostedDate()}
            </span>
            
            {/* Applications Count */}
            {getApplicationsCount() > 0 && (
              <span className="flex items-center gap-1">
                <Users size={12} />
                {getApplicationsCount()}
              </span>
            )}
          </div>
          
          <motion.button
            animate={isHovered ? { x: 2 } : { x: 0 }}
            onClick={handleApplyClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-md transition-all group/apply text-sm"
          >
            {job.status === 'Closed' ? 'View' : 'Apply'}
            <ExternalLink size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Animated Counter Component
function CounterStat({ icon, end, label, suffix = "", inView, delay = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1800;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, end, delay]);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, scale: 1.03 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-2xl group-hover:blur-3xl transition-all duration-500 rounded-2xl" />
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white flex items-center justify-center shadow-md group-hover:shadow-indigo-500/30 transition-all">
          {icon}
        </div>
        <p className="text-3xl font-black text-slate-900 text-center mb-2">
          {count.toLocaleString()}
          {suffix}
        </p>
        <p className="text-slate-600 font-medium text-center text-sm">{label}</p>
        <div className="mt-3 h-1 w-12 mx-auto bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0 rounded-full" />
      </div>
    </motion.div>
  );
}

// Main Homepage Component
export default function HomePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    applications: 0,
    remote: 0
  });
  
  // New state to track if search is active
  const [isSearchActive, setIsSearchActive] = useState(false);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Fetch jobs from your database
  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);
        
        const jobData = await jobApi.fetchJobs();
        
        if (jobData.length === 0) {
          setError("No jobs found in the database");
        } else {
          setJobs(jobData);
          setFilteredJobs(jobData.slice(0, 8));
          
          // Calculate statistics based on your schema
          const companies = new Set(jobData.map(job => job.company)).size;
          const applications = jobData.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
          const remoteJobs = jobData.filter(job => job.type === 'Remote').length;
          
          setStats({
            jobs: jobData.length,
            companies,
            applications,
            remote: remoteJobs
          });
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    if (!jobs.length) return;

    let result = [...jobs];

    // Search filter
    if (search.trim() || location.trim()) {
      const term = search.toLowerCase();
      const loc = location.toLowerCase();
      
      result = result.filter(
        (job) =>
          (search.trim() === "" || 
           job.title?.toLowerCase().includes(term) ||
           job.company?.toLowerCase().includes(term) ||
           job.skills?.some(skill => skill.toLowerCase().includes(term)) ||
           job.description?.toLowerCase().includes(term)) &&
          (location.trim() === "" || job.location?.toLowerCase().includes(loc))
      );
      
      // Set search as active if there's any search term
      setIsSearchActive(search.trim() !== "" || location.trim() !== "");
    } else {
      setIsSearchActive(false);
    }

    // Job type filter
    if (activeFilter !== "all") {
      if (activeFilter === "remote") {
        result = result.filter(job => job.type === 'Remote');
      } else if (activeFilter === "featured") {
        result = result.filter(job => job.featured);
      } else if (activeFilter === "open") {
        result = result.filter(job => job.status === 'Open');
      } else if (activeFilter === "hybrid") {
        result = result.filter(job => job.type === 'Hybrid');
      } else if (activeFilter === "onsite") {
        result = result.filter(job => job.type === 'Onsite');
      }
    }

    setFilteredJobs(result.slice(0, 12));
  }, [search, location, jobs, activeFilter]);

  // Get popular searches from job data
  const popularSearches = useMemo(() => {
    const skills = new Set();
    const locations = new Set();
    const companies = new Set();
    
    jobs.forEach(job => {
      job.skills?.slice(0, 2).forEach(skill => skills.add(skill));
      if (job.location) locations.add(job.location.split(',')[0].trim());
      if (job.company) companies.add(job.company);
    });
    
    return [
      ...Array.from(skills).slice(0, 3),
      ...Array.from(companies).slice(0, 2),
      ...Array.from(locations).slice(0, 2)
    ];
  }, [jobs]);

  // Get job types for filter based on your schema
  const jobTypes = useMemo(() => {
    const types = [
      { id: "all", label: "All Jobs", count: jobs.length },
      { id: "featured", label: "Featured", count: jobs.filter(j => j.featured).length },
      { id: "open", label: "Open", count: jobs.filter(j => j.status === 'Open').length },
      { id: "remote", label: "Remote", count: jobs.filter(j => j.type === 'Remote').length },
      { id: "hybrid", label: "Hybrid", count: jobs.filter(j => j.type === 'Hybrid').length },
      { id: "onsite", label: "Onsite", count: jobs.filter(j => j.type === 'Onsite').length },
    ];
    
    return types;
  }, [jobs]);

  const handleSearch = () => {
    // Search logic is handled by useEffect
    console.log("Search triggered:", { search, location });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative pt-16 pb-8 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-full px-4 py-2 shadow-sm mb-6"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-700 font-medium text-sm">Live Jobs</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 text-sm">{stats.jobs.toLocaleString()}+ opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Find Your
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dream Job
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto"
            >
              Connect with top companies and land your perfect role. 
              <span className="text-slate-800 font-medium"> AI-powered matching included.</span>
            </motion.p>

            <SearchBar
              search={search}
              setSearch={setSearch}
              location={location}
              setLocation={setLocation}
              onSearch={handleSearch}
              popularSearches={popularSearches}
            />
          </div>
        </div>
      </section>

      {/* Search Results Section - Appears immediately below search when active */}
      {isSearchActive && (
        <section className="py-6 px-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Search Results
                </h2>
                <p className="text-slate-600 text-sm">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                  {search.trim() && ` for "${search}"`}
                  {location.trim() && ` in ${location}`}
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center gap-2">
                {search.trim() && (
                  <button
                    onClick={() => setSearch("")}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors text-sm flex items-center gap-1"
                  >
                    Clear Search
                    <X size={14} />
                  </button>
                )}
                {location.trim() && (
                  <button
                    onClick={() => setLocation("")}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors text-sm flex items-center gap-1"
                  >
                    Clear Location
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-64 bg-gradient-to-br from-slate-100/50 to-slate-200/30 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredJobs.map((job, index) => (
                  <JobCard key={job._id} job={job} index={index} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                  <Search size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No jobs found</h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  Try adjusting your search terms or explore other categories
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setLocation("");
                    setActiveFilter("all");
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm"
                >
                  View All Jobs
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Stats Section - Hidden when search is active */}
      {!isSearchActive && (
        <section ref={statsRef} className="py-12 px-6 relative">
          <div className="relative max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Job Market Insights
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto text-sm">
                Real-time statistics from our job database
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <CounterStat
                icon={<Briefcase size={24} />}
                end={stats.jobs}
                label="Active Jobs"
                inView={statsInView}
              />
              <CounterStat
                icon={<Building2 size={24} />}
                end={stats.companies}
                label="Hiring Companies"
                inView={statsInView}
                delay={150}
              />
              <CounterStat
                icon={<Users size={24} />}
                end={stats.applications}
                label="Total Applications"
                inView={statsInView}
                delay={300}
              />
              <CounterStat
                icon={<GlobeIcon size={24} />}
                end={stats.remote}
                label="Remote Positions"
                inView={statsInView}
                delay={450}
              />
            </div>
          </div>
        </section>
      )}

      {/* Job Types Filter - Always visible but adjusts based on search */}
      <section className={`py-6 px-6 ${isSearchActive ? 'bg-white border-b border-slate-200' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveFilter(type.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                  activeFilter === type.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{type.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs min-w-[20px] ${
                  activeFilter === type.id
                    ? "bg-white/20"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs - Hidden when search is active, otherwise shows default jobs */}
      {!isSearchActive && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  Featured Opportunities
                </h2>
                <p className="text-slate-600 text-sm">
                  {stats.jobs > 0 
                    ? `Browse ${stats.jobs} positions from ${stats.companies} companies`
                    : "Loading opportunities..."}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/jobs")}
                className="mt-4 md:mt-0 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
              >
                View All Jobs
                <ArrowRight size={16} />
              </motion.button>
            </div>

            {error && !loading && (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                  <X size={24} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Jobs</h3>
                <p className="text-slate-600 max-w-md mx-auto mb-4 text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gradient-to-br from-slate-100/50 to-slate-200/30 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={stagger}
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredJobs.map((job, index) => (
                  <JobCard key={job._id} job={job} index={index} />
                ))}
              </motion.div>
            )}

            {!loading && jobs.length === 0 && !error && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <Briefcase size={24} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Jobs Available</h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm">
                  There are currently no job listings in the database. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
