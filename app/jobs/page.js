// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   MapPin,
//   DollarSign,
//   Briefcase,
//   Search,
//   Filter,
//   ArrowRight,
//   Building2,
//   Clock,
//   Sparkles,
// } from "lucide-react";

// export default function JobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => setJobs(data));
//   }, []);

//   const filteredJobs = jobs.filter((job) =>
//     `${job.title} ${job.company} ${job.location}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

//       {/* HERO */}
//       <section className="relative px-6 pt-24 pb-20 text-center max-w-6xl mx-auto">
//         <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold shadow-sm border border-indigo-200/50">
//           <Sparkles size={16} />
//           Verified Opportunities
//         </span>

//         <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
//           Browse{" "}
//           <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//             Dream Jobs
//           </span>
//         </h1>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
//           Discover opportunities from verified companies worldwide. Your next career move starts here.
//         </p>

//         {/* SEARCH */}
//         <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 hover:shadow-indigo-100/50 transition-shadow duration-300">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex items-center gap-4 flex-1 px-4 py-3 bg-slate-50/70 rounded-2xl focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300">
//               <Search className="text-gray-400 flex-shrink-0" size={20} />
//               <input
//                 placeholder="Search by title, company, or location"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
//               />
//             </div>
//             <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
//               <Filter size={18} className="group-hover:rotate-12 transition-transform" />
//               Filters
//             </button>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
//           <Stat icon={<Briefcase size={24} />} label="Jobs" value={jobs.length} />
//           <Stat icon={<Building2 size={24} />} label="Companies" value="50+" />
//           <Stat icon={<MapPin size={24} />} label="Locations" value="30+" />
//           <Stat icon={<Clock size={24} />} label="New Today" value="12" />
//         </div>
//       </section>

//       {/* JOBS */}
//       <section className="relative max-w-7xl mx-auto px-6 pb-24">
//         {filteredJobs.length === 0 ? (
//           <div className="text-center py-24 bg-white/50 backdrop-blur rounded-3xl border border-white/50 shadow-lg">
//             <div className="bg-gradient-to-br from-indigo-50 to-purple-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
//               <Briefcase className="text-indigo-600" size={40} />
//             </div>
//             <h3 className="text-2xl font-bold mb-3 text-gray-800">No jobs found</h3>
//             <p className="text-gray-600 text-lg">
//               Try adjusting your search keywords or filters.
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredJobs.map((job) => (
//               <JobCard key={job._id} job={job} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function Stat({ icon, label, value }) {
//   return (
//     <div className="relative group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-6 border border-white/50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden backdrop-blur-sm">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="relative flex justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300">
//         {icon}
//       </div>
//       <p className="relative text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{value}</p>
//       <p className="relative text-sm text-gray-500 font-medium mt-1">{label}</p>
//     </div>
//   );
// }

// function JobCard({ job }) {
//   return (
//     <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
//       {/* Gradient overlay on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

//       <div className="relative">
//         {/* Header */}
//         <div className="flex items-start gap-4 mb-6">
//           <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//             <Building2 className="text-white" size={24} />
//           </div>
//           <div className="flex-1 min-w-0">
//             <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">
//               {job.title}
//             </h3>
//             <p className="text-sm text-gray-500 font-medium">{job.company}</p>
//           </div>
//         </div>

//         {/* Job details */}
//         <div className="space-y-3 mb-6 text-sm text-gray-600">
//           {job.location && (
//             <div className="flex items-center gap-3 px-3 py-2 bg-slate-50/70 rounded-xl group-hover:bg-white transition-colors duration-300">
//               <MapPin size={16} className="text-indigo-600 flex-shrink-0" />
//               <span className="font-medium">{job.location}</span>
//             </div>
//           )}
//           {job.salary && (
//             <div className="flex items-center gap-3 px-3 py-2 bg-slate-50/70 rounded-xl group-hover:bg-white transition-colors duration-300">
//               <DollarSign size={16} className="text-purple-600 flex-shrink-0" />
//               <span className="font-semibold text-gray-800">{job.salary}</span>
//             </div>
//           )}
//         </div>

//         {/* Description */}
//         {job.description && (
//           <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
//             {job.description}
//           </p>
//         )}

//         {/* CTA */}
//         <Link
//           href={`/jobs/${job._id}`}
//           className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-4 transition-all duration-300 group/link"
//         >
//           View details 
//           <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
//         </Link>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState, useRef  } from "react";
// import Link from "next/link";
// import {
//   MapPin,
//   DollarSign,
//   Briefcase,
//   Search,
//   Filter,
//   ArrowRight,
//   Building2,
//   Clock,
//   Sparkles,
//   Zap,
// } from "lucide-react";

// export default function JobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const jobsRef = useRef(null);


//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => setJobs(data));
//   }, []);

//   const filteredJobs = jobs.filter((job) =>
//     `${job.title} ${job.company} ${job.location}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

// useEffect(() => {
//   if (!searchTerm.trim() || !jobsRef.current) return;

//   const timeout = setTimeout(() => {
//     jobsRef.current.scrollIntoView({ behavior: "smooth" });
//   }, 50);

//   return () => clearTimeout(timeout);
// }, [searchTerm]);


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
//       {/* Animated futuristic background orbs with soft glows */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
//         <div className="absolute top-40 right-20 w-80 h-80 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
//         <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
//       </div>

//       {/* Subtle grid overlay */}
//       <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

//       {/* HERO */}
//       <section className="relative px-6 pt-24 pb-20 text-center max-w-6xl mx-auto z-10">
//         <span className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-cyan-200/50 text-cyan-700 text-sm font-bold shadow-lg shadow-cyan-200/30">
//           <Zap size={18} className="animate-pulse text-cyan-500" />
//           Verified Future Opportunities
//         </span>

//         <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
//           Unlock Your{" "}
//           <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
//             Next-Gen Career
//           </span>
//         </h1>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
//           Explore cutting-edge opportunities from innovative companies worldwide. The future of work starts now.
//         </p>

//         {/* SEARCH BAR - Glassmorphism with subtle neon border */}
//         <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:border-cyan-300/50 transition-all duration-500 group">
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="flex items-center gap-4 flex-1 px-6 py-4 bg-white/70 rounded-2xl border border-gray-200 focus-within:border-cyan-400 focus-within:shadow-lg focus-within:shadow-cyan-300/40 transition-all duration-500">
//               <Search className="text-cyan-500" size={24} />
//               <input
//                 placeholder="Search roles, companies, or locations..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-500 font-medium text-lg"
//               />
//             </div>
//             <button className="flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-white text-lg hover:from-cyan-400 hover:to-purple-400 hover:shadow-2xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300 group/btn">
//               <Filter size={22} className="group-hover/btn:rotate-180 transition-transform duration-500" />
//               Advanced Filters
//             </button>
//           </div>
//         </div>


//       </section>

//       {/* JOBS GRID */}
//       <section  ref={jobsRef} className="relative max-w-7xl mx-auto px-6 pb-32 z-10">
//         {filteredJobs.length === 0 ? (
//           <div className="text-center py-32 bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl">
//             <div className="bg-gradient-to-br from-cyan-100 to-purple-100 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-cyan-200/50">
//               <Briefcase className="text-cyan-600" size={64} />
//             </div>
//             <h3 className="text-3xl font-bold mb-4 text-gray-800">No matches detected</h3>
//             <p className="text-gray-500 text-xl">Refine your search parameters.</p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {filteredJobs.map((job) => (
//               <JobCard key={job._id} job={job} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function Stat({ icon, label, value }) {
//   return (
//     <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 hover:border-cyan-300/50 shadow-lg hover:shadow-2xl hover:shadow-cyan-200/40 hover:-translate-y-4 transition-all duration-500">
//       <div className="flex flex-col items-center">
//         <div className="text-cyan-500 mb-4 group-hover:scale-125 transition-transform duration-500">
//           {icon}
//         </div>
//         <p className="text-4xl font-extrabold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
//           {value}
//         </p>
//         <p className="text-gray-600 text-sm font-medium mt-2">{label}</p>
//       </div>
//     </div>
//   );
// }

// function JobCard({ job }) {
//   return (
//     <div className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-10 border border-gray-100 hover:border-cyan-300/60 shadow-2xl hover:shadow-cyan-200/50 hover:-translate-y-6 transition-all duration-500 overflow-hidden">
//       {/* Subtle glow overlay on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-purple-100/30 to-pink-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

//       <div className="relative z-10">
//         {/* Company Logo Placeholder */}
//         <div className="flex items-start gap-6 mb-8">
//           <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-300/50 group-hover:scale-110 transition-transform duration-500">
//             <Building2 className="text-white" size={32} />
//           </div>
//           <div className="flex-1">
//             <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
//               {job.title}
//             </h3>
//             <p className="text-gray-600 text-lg font-medium">{job.company}</p>
//           </div>
//         </div>

//         {/* Details */}
//         <div className="space-y-4 mb-8">
//           {job.location && (
//             <div className="flex items-center gap-4 px-5 py-3 bg-white/60 rounded-2xl border border-gray-100">
//               <MapPin size={20} className="text-cyan-500" />
//               <span className="font-medium text-gray-700">{job.location}</span>
//             </div>
//           )}
//           {job.salary && (
//             <div className="flex items-center gap-4 px-5 py-3 bg-white/60 rounded-2xl border border-gray-100">
//               <DollarSign size={20} className="text-purple-500" />
//               <span className="font-bold text-lg text-gray-800">{job.salary}</span>
//             </div>
//           )}
//         </div>

//         {/* Description */}
//         {job.description && (
//           <p className="text-gray-600 line-clamp-3 mb-8 leading-relaxed">
//             {job.description}
//           </p>
//         )}

//         {/* CTA */}
//         <Link
//           href={`/jobs/${job._id}`}
//           className="inline-flex items-center gap-3 text-cyan-600 font-bold text-lg hover:gap-6 transition-all duration-500 group/link"
//         >
//           Explore Opportunity
//           <ArrowRight size={24} className="group-hover/link:translate-x-4 transition-transform duration-300" />
//         </Link>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Search,
  Filter,
  ArrowRight,
  Building2,
  Zap,
} from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const jobsRef = useRef(null);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!searchTerm.trim() || !jobsRef.current) return;

    const timeout = setTimeout(() => {
      jobsRef.current.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated futuristic background orbs with soft glows */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-80 h-80 bg-purple-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* HERO */}
      <section className="relative px-6 pt-24 pb-20 text-center max-w-6xl mx-auto z-10">
        <span className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-cyan-200/50 text-cyan-700 text-sm font-bold shadow-lg shadow-cyan-200/30">
          <Zap size={18} className="animate-pulse text-cyan-500" />
          Verified Future Opportunities
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
          Unlock Your{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Next-Gen Career
          </span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Explore cutting-edge opportunities from innovative companies
          worldwide. The future of work starts now.
        </p>

        {/* SEARCH BAR - Glassmorphism with subtle neon border */}
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:border-cyan-300/50 transition-all duration-500 group">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4 flex-1 px-6 py-4 bg-white/70 rounded-2xl border border-gray-200 focus-within:border-cyan-400 focus-within:shadow-lg focus-within:shadow-cyan-300/40 transition-all duration-500">
              <Search className="text-cyan-500" size={24} />
              <input
                placeholder="Search roles, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-500 font-medium text-lg"
              />
            </div>
            <button className="flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-white text-lg hover:from-cyan-400 hover:to-purple-400 hover:shadow-2xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300 group/btn">
              <Filter
                size={22}
                className="group-hover/btn:rotate-180 transition-transform duration-500"
              />
              Advanced Filters
            </button>
          </div>
        </div>
      </section>

      {/* JOBS GRID */}
      <section
        ref={jobsRef}
        className="relative max-w-7xl mx-auto px-6 pb-32 z-10"
      >
        {filteredJobs.length === 0 ? (
          <div className="text-center py-32 bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl">
            <div className="bg-gradient-to-br from-cyan-100 to-purple-100 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-cyan-200/50">
              <Briefcase className="text-cyan-600" size={64} />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">
              No matches detected
            </h3>
            <p className="text-gray-500 text-xl">
              Refine your search parameters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ icon, label, value }) {
  return (
    <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 hover:border-cyan-300/50 shadow-lg hover:shadow-2xl hover:shadow-cyan-200/40 hover:-translate-y-4 transition-all duration-500">
      <div className="flex flex-col items-center">
        <div className="text-cyan-500 mb-4 group-hover:scale-125 transition-transform duration-500">
          {icon}
        </div>
        <p className="text-4xl font-extrabold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="text-gray-600 text-sm font-medium mt-2">{label}</p>
      </div>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-10 border border-gray-100 hover:border-cyan-300/60 shadow-2xl hover:shadow-cyan-200/50 hover:-translate-y-6 transition-all duration-500 overflow-hidden">
      {/* Subtle glow overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-purple-100/30 to-pink-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

      <div className="relative z-10">
        {/* Company Logo Placeholder */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-300/50 group-hover:scale-110 transition-transform duration-500">
            <Building2 className="text-white" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
              {job.title}
            </h3>
            <p className="text-gray-600 text-lg font-medium">{job.company}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-8">
          {job.location && (
            <div className="flex items-center gap-4 px-5 py-3 bg-white/60 rounded-2xl border border-gray-100">
              <MapPin size={20} className="text-cyan-500" />
              <span className="font-medium text-gray-700">{job.location}</span>
            </div>
          )}


          {job.salary && (
            <div className="flex items-center gap-4 px-5 py-3 bg-white/60 rounded-2xl border border-gray-100">
              {/* PKR Symbol with custom styling */}
              <div className="flex items-center justify-center w-5 h-5 text-purple-600 font-bold">
                ₨
              </div>
              <span className="font-bold text-lg text-gray-800">
                {job.salary.replace(/\$/g, "₨ ")}
              </span>
            </div>
          )}


        </div>

        {/* Description */}
        {job.description && (
          <p className="text-gray-600 line-clamp-3 mb-8 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* CTA */}
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-3 text-cyan-600 font-bold text-lg hover:gap-6 transition-all duration-500 group/link"
        >
          Explore Opportunity
          <ArrowRight
            size={24}
            className="group-hover/link:translate-x-4 transition-transform duration-300"
          />
        </Link>
      </div>
    </div>
  );
}


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
//   IndianRupee,
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
//       // Handle different salary formats for INR
//       const match = salaryString.match(/(₹?\s?\d+(?:,\d+)*(?:\.\d+)?\s*(?:LPA|L|lakh|lakhs)?)\s*(?:-|to|–)\s*(₹?\s?\d+(?:,\d+)*(?:\.\d+)?\s*(?:LPA|L|lakh|lakhs)?)/i);
//       if (match) {
//         const min = this.parseIndianNumber(match[1]);
//         const max = this.parseIndianNumber(match[2]);
//         return { min, max, currency: "INR" };
//       }
      
//       // Handle single salary
//       const singleMatch = salaryString.match(/₹?\s?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:LPA|L|lakh|lakhs)?/i);
//       if (singleMatch) {
//         const amount = this.parseIndianNumber(singleMatch[0]);
//         return { min: amount, max: amount * 1.2, currency: "INR" };
//       }
//     } catch (e) {
//       console.warn("Failed to parse salary:", salaryString);
//     }
    
//     return { min: 600000, max: 1200000, currency: "INR" };
//   },

//   parseIndianNumber(numberString) {
//     // Parse Indian number formats like 6 LPA, 12L, 8.5 Lakhs, etc.
//     const cleaned = numberString.replace(/[₹,]/g, '').trim();
    
//     // Check for lakh format
//     const lakhMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*(?:LPA|L|Lakh|Lakhs|lakh|lakhs)/i);
//     if (lakhMatch) {
//       return parseFloat(lakhMatch[1]) * 100000;
//     }
    
//     // Check for crore format
//     const croreMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*(?:Cr|Crore|crore)/i);
//     if (croreMatch) {
//       return parseFloat(croreMatch[1]) * 10000000;
//     }
    
//     // Assume it's already in rupees
//     return parseInt(cleaned) || 0;
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

//   // Format salary for INR
//   const formatSalary = () => {
//     if (job.salaryString) {
//       return job.salaryString;
//     }
    
//     if (job.salary) {
//       const { min, max, currency = "INR" } = job.salary;
      
//       // Convert to Lakhs for display
//       const minLakhs = min / 100000;
//       const maxLakhs = max / 100000;
      
//       // Format based on amount
//       if (max < 1000000) {
//         // Less than 10 LPA, show in thousands
//         const minThousand = min / 1000;
//         const maxThousand = max / 1000;
//         return `₹${minThousand.toFixed(0)}k - ₹${maxThousand.toFixed(0)}k`;
//       } else {
//         // Show in LPA
//         return `₹${minLakhs.toFixed(1)} - ₹${maxLakhs.toFixed(1)} LPA`;
//       }
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
//               <IndianRupee size={18} className="text-emerald-500 flex-shrink-0" />
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