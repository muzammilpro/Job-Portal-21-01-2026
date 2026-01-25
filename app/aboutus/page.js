// "use client";
// import { motion, useInView } from "framer-motion";
// import {
//   Target,
//   Eye,
//   Heart,
//   Users,
//   Briefcase,
//   TrendingUp,
//   Award,
//   Globe,
//   Zap,
//   Shield,
//   Star,
//   CheckCircle,
//   Linkedin,
//   Twitter,
//   Mail,
//   Sparkles,
//   ArrowRight,
// } from "lucide-react";
// import { useRef, useState, useEffect } from "react";

// export default function AboutPage() {
//   const statsRef = useRef(null);
//   const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/50 to-purple-50/30 overflow-x-hidden">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white py-32 sm:py-40">
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
//         {/* Animated background blobs */}
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//           className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{ rotate: -360 }}
//           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//           className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
//         />
//         <div className="absolute top-20 left-1/3 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl animate-pulse" />

//         <div className="relative max-w-7xl mx-auto px-6 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="inline-flex items-center gap-3 mb-10 rounded-full bg-white/15 backdrop-blur-md px-8 py-4 text-sm font-semibold border border-white/20 shadow-lg">
//               <Sparkles className="text-yellow-300" size={20} />
//               Building the Future of Work
//               <ArrowRight size={16} />
//             </div>

//             <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight">
//               Connecting Talent with{" "}
//               <span className="block bg-gradient-to-r from-cyan-200 via-white to-pink-200 bg-clip-text text-transparent animate-gradient">
//                 Extraordinary Opportunity
//               </span>
//             </h1>

//             <p className="text-xl sm:text-2xl text-indigo-100 max-w-4xl mx-auto opacity-90">
//               We’re redefining professional growth by matching exceptional talent with visionary companies.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section ref={statsRef} className="max-w-7xl mx-auto px-6 -mt-20 mb-32 relative z-10">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//           {statsData.map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 50 }}
//               animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: i * 0.15, duration: 0.8 }}
//               className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//               <div className="relative z-10 text-center">
//                 <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
//                   {stat.icon}
//                 </div>
//                 <AnimatedStat end={stat.end} suffix={stat.suffix} inView={isStatsInView} />
//                 <p className="text-slate-700 font-medium mt-2">{stat.label}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="max-w-7xl mx-auto px-6 py-32">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Our Core Values
//           </h2>
//           <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
//             The principles that guide everything we do
//           </p>
//         </motion.div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {values.map((v, i) => (
//             <motion.div
//               key={v.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
//             >
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
//               <div className="relative">
//                 <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg mb-6">
//                   {v.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
//                 <p className="text-slate-600 leading-relaxed">{v.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="max-w-7xl mx-auto px-6 py-32 bg-gradient-to-r from-indigo-50/50 via-transparent to-purple-50/50 rounded-3xl mx-6">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Meet Our Leadership
//           </h2>
//           <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
//             Passionate experts driving innovation in talent acquisition
//           </p>
//         </motion.div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
//           {teamMembers.map((m, i) => (
//             <motion.div
//               key={m.name}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="group text-center"
//             >
//               <div className="relative mb-8">
//                 <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
//                   <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center text-5xl font-bold text-indigo-600">
//                     {m.initials}
//                   </div>
//                 </div>
//                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full blur-xl opacity-70" />
//               </div>
//               <h3 className="text-xl font-bold">{m.name}</h3>
//               <p className="text-slate-600 mb-6">{m.role}</p>
//               <div className="flex justify-center gap-4">
//                 <SocialIcon icon={<Linkedin size={20} />} href={m.linkedin} />
//                 <SocialIcon icon={<Twitter size={20} />} href={m.twitter} />
//                 <SocialIcon icon={<Mail size={20} />} href={`mailto:${m.email}`} />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Gradient Animation */}
//       <style jsx>{`
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 15s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */
// function AnimatedStat({ end, suffix, inView }) {
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
//     <p className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//       {count.toLocaleString()}{suffix}
//     </p>
//   );
// }

// function SocialIcon({ icon, href }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="p-3 rounded-xl bg-white/70 backdrop-blur border border-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-md"
//     >
//       {icon}
//     </a>
//   );
// }

// /* ---------------- DATA ---------------- */
// const statsData = [
//   { icon: <Users />, end: 75000, suffix: "+", label: "Professionals Connected" },
//   { icon: <Briefcase />, end: 15000, suffix: "+", label: "Jobs Posted" },
//   { icon: <TrendingUp />, end: 98, suffix: "%", label: "Placement Success" },
//   { icon: <Award />, end: 1200, suffix: "+", label: "Partner Companies" },
// ];

// const values = [
//   { icon: <Shield size={32} />, title: "Trust & Integrity", description: "We believe in radical transparency, verified profiles, and honest communication at every step." },
//   { icon: <Zap size={32} />, title: "Innovation", description: "Leveraging AI and modern tools to create faster, smarter, and more human-centric hiring experiences." },
//   { icon: <Heart size={32} />, title: "Empathy First", description: "Every decision puts people at the center — candidates and employers alike." },
//   { icon: <Star size={32} />, title: "Excellence", description: "We strive for exceptional outcomes, not just transactions." },
//   { icon: <Globe size={32} />, title: "Inclusivity", description: "Building opportunities for talent from all backgrounds and locations." },
//   { icon: <Target size={32} />, title: "Precision Matching", description: "Going beyond keywords to connect skills, values, and cultural fit." },
// ];

// const teamMembers = [
//   { name: "Arfan", role: "Founder & CEO", initials: "MH", linkedin: "#", twitter: "#", email: "#" },
//   { name: "Sarah Johnson", role: "Chief Product Officer", initials: "SJ", linkedin: "#", twitter: "#", email: "#" },
//   { name: "Michael Chen", role: "Chief Technology Officer", initials: "MC", linkedin: "#", twitter: "#", email: "#" },
//   { name: "Emily Rodriguez", role: "Head of People & Culture", initials: "ER", linkedin: "#", twitter: "#", email: "#" },
// ];



"use client";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Globe,
  Zap,
  Shield,
  Star,
  CheckCircle,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function AboutPage() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/50 to-purple-50/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white py-20 sm:py-28 md:py-32">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Animated background blobs */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
        />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/15 backdrop-blur-md px-6 py-3 text-sm font-semibold border border-white/20 shadow-lg">
              <Sparkles className="text-yellow-300" size={18} />
              Building the Future of Work
              <ArrowRight size={16} />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Connecting Talent with{" "}
              <span className="block bg-gradient-to-r from-cyan-200 via-white to-pink-200 bg-clip-text text-transparent animate-gradient mt-2">
                Extraordinary Opportunity
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto opacity-90 leading-relaxed">
              We're redefining professional growth by matching exceptional talent with visionary companies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 mb-24 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 shadow-xl border border-white/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
                  {stat.icon}
                </div>
                <AnimatedStat end={stat.end} suffix={stat.suffix} inView={isStatsInView} />
                <p className="text-sm text-slate-600 font-medium mt-2">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-white/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md mb-4">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 bg-gradient-to-r from-indigo-50/50 via-transparent to-purple-50/50 rounded-2xl sm:rounded-3xl mx-4 sm:mx-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Leadership
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Passionate experts driving innovation in talent acquisition
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {teamMembers.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-4xl font-bold text-indigo-600">
                    {m.initials}
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full blur-xl opacity-70" />
              </div>
              <h3 className="text-lg font-bold mb-1">{m.name}</h3>
              <p className="text-slate-600 text-sm mb-4">{m.role}</p>
              <div className="flex justify-center gap-3">
                <SocialIcon icon={<Linkedin size={18} />} href={m.linkedin} />
                <SocialIcon icon={<Twitter size={18} />} href={m.twitter} />
                <SocialIcon icon={<Mail size={18} />} href={`mailto:${m.email}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gradient Animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function AnimatedStat({ end, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </p>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 sm:p-3 rounded-lg bg-white/70 backdrop-blur border border-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {icon}
    </a>
  );
}

/* ---------------- DATA ---------------- */
const statsData = [
  { icon: <Users size={24} />, end: 75000, suffix: "+", label: "Professionals Connected" },
  { icon: <Briefcase size={24} />, end: 15000, suffix: "+", label: "Jobs Posted" },
  { icon: <TrendingUp size={24} />, end: 98, suffix: "%", label: "Placement Success" },
  { icon: <Award size={24} />, end: 1200, suffix: "+", label: "Partner Companies" },
];

const values = [
  { icon: <Shield size={24} />, title: "Trust & Integrity", description: "We believe in radical transparency, verified profiles, and honest communication at every step." },
  { icon: <Zap size={24} />, title: "Innovation", description: "Leveraging AI and modern tools to create faster, smarter, and more human-centric hiring experiences." },
  { icon: <Heart size={24} />, title: "Empathy First", description: "Every decision puts people at the center — candidates and employers alike." },
  { icon: <Star size={24} />, title: "Excellence", description: "We strive for exceptional outcomes, not just transactions." },
  { icon: <Globe size={24} />, title: "Inclusivity", description: "Building opportunities for talent from all backgrounds and locations." },
  { icon: <Target size={24} />, title: "Precision Matching", description: "Going beyond keywords to connect skills, values, and cultural fit." },
];

const teamMembers = [
  { name: "Arfan", role: "Founder & CEO", initials: "MH", linkedin: "#", twitter: "#", email: "#" },
  { name: "Sarah Johnson", role: "Chief Product Officer", initials: "SJ", linkedin: "#", twitter: "#", email: "#" },
  { name: "Michael Chen", role: "Chief Technology Officer", initials: "MC", linkedin: "#", twitter: "#", email: "#" },
  { name: "Emily Rodriguez", role: "Head of People & Culture", initials: "ER", linkedin: "#", twitter: "#", email: "#" },
];