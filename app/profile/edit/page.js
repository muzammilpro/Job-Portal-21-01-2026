
// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Sparkles,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   MapPin,
//   Download,
//   Trash2,
//   Plus,
//   ArrowRight,
//   X,
//   FileText,
//   Image,
// } from "lucide-react";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");

//   const [selectedCountry, setSelectedCountry] = useState("PK"); 
//   const [phoneNumber, setPhoneNumber] = useState("");


//   const countries = [
//     { code: "PK", name: "Pakistan", dial: "+92" },
//     { code: "US", name: "United States", dial: "+1" },
//     { code: "UK", name: "United Kingdom", dial: "+44" },
//     { code: "SA", name: "Saudi Arabia", dial: "+966" },
//     { code: "AE", name: "UAE", dial: "+971" },
//     { code: "CA", name: "Canada", dial: "+1" },
//     { code: "IN", name: "India", dial: "+91" },
//   ];


// const isValidPhone = (number) => /^\d{10,15}$/.test(number);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [about, setAbout] = useState("");
//   const [education, setEducation] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [skills, setSkills] = useState([]); 
//   const [newSkillName, setNewSkillName] = useState("");
//   const [newSkillLevel, setNewSkillLevel] = useState("");

//   const [accounts, setAccounts] = useState([]);

//   const [resumeMeta, setResumeMeta] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
//   const [showResumeModal, setShowResumeModal] = useState(false);

//   // Resume Auto-fill
//   const [resumeSuggestions, setResumeSuggestions] = useState(null);
//   const [showAutofillModal, setShowAutofillModal] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);

//   const [isFresher, setIsFresher] = useState(false);


// // Profile validation function
// const validateProfile = () => {
//   const newErrors = {};

//   // Required fields check
//   if (!firstName.trim()) newErrors.firstName = "First name is required";
//   if (!lastName.trim()) newErrors.lastName = "Last name is required";
//   if (!resumeMeta) newErrors.resume = "Resume is required for complete profile";
//   if (!about.trim()) newErrors.about = "About section is required";
//   if (skills.length === 0) newErrors.skills = "Add at least 1 skill";
  
//   if (phoneNumber && !isValidPhone(phoneNumber)) {
//     newErrors.phoneNumber = "Phone must be 10-15 digits";
//   }

//   education.forEach((edu, i) => {
//     if (edu.degree.trim() === '' || edu.institute.trim() === '') {
//       newErrors[`education-${i}`] = `Education #${i+1}: Degree & Institute required`;
//     }
//   });

//   const hasValidExperience = experience.some(exp => 
//     exp.title.trim() && exp.company.trim()
//   );

//   if (!isFresher) {  
//     if (experience.length === 0) {
//       newErrors.experience = "Add experience OR mark as Fresher";
//     } else if (!hasValidExperience) {
//       newErrors.experience = "Complete at least 1 experience OR mark as Fresher";
//     }
//   }

//   if (!isFresher) {
//     experience.forEach((exp, i) => {
//       if (exp.title.trim() === '' || exp.company.trim() === '') {
//         newErrors[`experience-${i}`] = `Experience #${i+1}: Title & Company required`;
//       }
//     });
//   }

//   accounts.forEach((acc, i) => {
//     if (acc.platform.trim() === '') {
//       newErrors[`account-${i}`] = `Account #${i+1}: Platform name required`;
//     } else if (acc.url.trim() === '') {
//       newErrors[`account-${i}`] = `Account #${i+1}: URL required`;
//     } else if (!isValidUrl(acc.url)) {
//       newErrors[`account-${i}`] = `Account #${i+1}: Enter valid URL (e.g. linkedin.com/in/username)`;
//     }
//   });

//   setErrors(newErrors);
//   setIsFormValid(Object.keys(newErrors).length === 0);
//   return Object.keys(newErrors).length === 0;
// };

// useEffect(() => {
//   validateProfile();
// }, [firstName, lastName, about, phoneNumber, skills, education, experience, isFresher]); 


// const isValidUrl = (urlString) => {
//   const value = urlString.trim();
  

//   if (!value) return false;

//   if (value.startsWith('http://') || value.startsWith('https://')) {
//     try {
//       new URL(value);
//       return true;
//     } catch {
//       return false;
//     }
//   }
  
//   const socialPattern = /^(linkedin|github|twitter|x|instagram|facebook|dribbble|behance|medium)\.com\/[a-zA-Z0-9\-_\/]+$/i;
//   if (socialPattern.test(value)) {
//     return true;
//   }

//   const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9\-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
//   return domainPattern.test(value);
// };




// const RequiredLabel = ({ children }) => (
//   <span className="flex items-center gap-1">
//     {children}
//     <span className="text-red-500 text-xs font-bold -mt-0.5">*</span>
//   </span>
// );


//   const getFileType = (mimeType) => {
//     if (!mimeType) return "document";
//     if (mimeType.startsWith("image/")) return "image";
//     if (mimeType === "application/pdf") return "pdf";
//     return "document";
//   };


// const getLevelPercentage = (level) => {
//   const levels = {
//     beginner: 40,
//     intermediate: 65,
//     advanced: 85,
//     expert: 98
//   };
//   return levels[level] || 0;
// };

// const addSkill = () => {
//   if (!newSkillName.trim() || !newSkillLevel) return;
  
//   const skill = {
//     name: newSkillName.trim(),
//     level: newSkillLevel,
//     percentage: getLevelPercentage(newSkillLevel)
//   };
  
//   setSkills([...skills, skill]);
//   setNewSkillName("");
//   setNewSkillLevel("");
// };

// const removeSkill = (index) => {
//   setSkills(skills.filter((_, i) => i !== index));
// };



//   // LOAD PROFILE
//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session?.user?.email) {
//       router.push("/signin");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`);
//         if (!res.ok) return;
//         const data = await res.json();

//         setAbout(data.about || "");
//         setFirstName(data.firstName || "");
//         setLastName(data.lastName || "");
//           if (data.phone) {
//             const phoneMatch = data.phone.match(/^\+(\d{1,4})\s?(.+)$/);
//             if (phoneMatch) {
//               const [, countryCode, number] = phoneMatch;
//               const country = countries.find(c => c.dial === `+${countryCode}`);
//               if (country) {
//                 setSelectedCountry(country.code);
//                 setPhoneNumber(number.trim());
//               } else {
//                 setPhoneNumber(data.phone.replace(/\D/g, ""));
//               }
//             } else {
//               setPhoneNumber(data.phone.replace(/\D/g, ""));
//             }
//           } else {
//             setSelectedCountry("PK");
//             setPhoneNumber("");
//           }
//         setEducation(data.education || []);
//         setExperience(data.experience || []);
//         setSkills(data.skills || []);
//         setAccounts(data.accounts || []);

//         if (data.resume?.originalName) {
//           setResumeMeta({
//             originalName: data.resume.originalName,
//             uploadedAt: data.resume.uploadedAt,
//             mimeType: data.resume.mimeType,
//           });

//           try {
//             const previewRes = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=preview`);
//             if (previewRes.ok) {
//               const blob = await previewRes.blob();
//               const url = URL.createObjectURL(blob);
//               setResumePreviewUrl(url);
//             }
//           } catch (e) {
//             console.error("Preview load error - page.js:130", e);
//           }
//         }
//       } catch (err) {
//         console.error("Profile load error - page.js:134", err);
//       } finally {
//         setLoading(false);
//       }

//       useEffect(() => {
//         if (data.experience?.some(exp => exp.title?.toLowerCase().includes('fresher') || exp.company?.toLowerCase().includes('entry'))) {
//           setIsFresher(true);
//         }
//       }, [data]);
//     };

//     fetchProfile();
//   }, [status, router, session?.user?.email]);

//   // SAVE PROFILE
//   const handleSaveProfile = async () => {



//      const isValid = validateProfile();
//       if (!isValid) {
//         alert("⚠️ Please fix all errors before saving!");
//         return;
//       }

//       if (!session?.user?.email) return;

//       if (phoneNumber && !isValidPhone(phoneNumber)) {
//         alert("Phone number must be 10-15 digits long!");
//         return;
//       }

//       try {
//         setSaving(true);
//         const payload = {
//           email: session.user.email,
//           firstName,
//           lastName,
//           phone: selectedCountry && phoneNumber 
//             ? `${countries.find(c => c.code === selectedCountry).dial} ${phoneNumber}`
//             : phone || "",
//           about,
//           education,
//           // experience,
//            experience: isFresher ? [{ title: "Fresher / Recent Graduate", company: "Entry Level", years: "2024 - Present" }] : experience,
//           skills,
//           accounts,
//         };

//         const res = await fetch("/api/profile", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//       if (res.ok) {alert("Profile saved successfully!");}
//       else {
//         console.error("API ERROR:", data);
//       alert(`Failed to save: ${data.message || "Server error"}`);
//       }
//     } catch (err) {
//       alert("Something went wrong");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // RESUME HANDLERS
//   const handleResumeChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setResumeFile(file);
//   };

//   const handleUploadResume = async () => {
//     if (!resumeFile || !session?.user?.email) return;

//     const formData = new FormData();
//     formData.append("email", session.user.email);
//     formData.append("file", resumeFile);

//     try {
//       const res = await fetch("/api/profile/resume", { method: "POST", body: formData });
//       if (!res.ok) throw new Error();

//       const now = new Date();
//       setResumeMeta({
//         originalName: resumeFile.name,
//         uploadedAt: now.toISOString(),
//         mimeType: resumeFile.type,
//       });
//       setResumeFile(null);

//       // Refresh preview
//       const previewRes = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=preview`);
//       if (previewRes.ok) {
//         const blob = await previewRes.blob();
//         setResumePreviewUrl(URL.createObjectURL(blob));
//       }

//       alert("Resume uploaded successfully!");
//     } catch (err) {
//       alert("Upload failed");
//     }
//   };

//   const handleDownloadResume = async () => {
//     if (!session?.user?.email) return;
//     try {
//       const res = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=download`);
//       if (!res.ok) throw new Error();
//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = resumeMeta?.originalName || "resume";
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       alert("Download failed");
//     }
//   };

//   const handleDeleteResume = async () => {
//     if (!confirm("Permanently delete your resume?")) return;
//     try {
//       const res = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         setResumeMeta(null);
//         setResumePreviewUrl(null);
//         alert("Resume deleted");
//       }
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };


//   const handleAutofillFromResume = async () => {
//     try {
//       const res = await fetch("/api/profile/resume/parse", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: session.user.email }),
//       });

//       const data = await res.json();
//       console.log("🔍 FULL API RESPONSE: - page.js:269", data);  

//       if (res.ok && data.extracted) {
//         setResumeSuggestions(
//           Object.fromEntries(
//             Object.entries(data.extracted).map(([k, v]) => [k, { value: v, checked: true }])
//           )
//         );
//         setShowAutofillModal(true);
//       } else {
//         console.error("API ERROR: - page.js:279", data);
//         alert(JSON.stringify(data, null, 2));
//       }
//     } catch (err) {
//       alert("Network error: " + err.message);
//     }
//   };

//   // const applyResumeAutofill = () => {
//   //   if (!resumeSuggestions) return;

//   //   Object.entries(resumeSuggestions).forEach(([key, obj]) => {
//   //     if (!obj.checked) return;

//   //     switch (key) {
//   //       case "about":
//   //         setAbout(obj.value);
//   //         break;

//   //       case "skills":
//   //         setSkillsText(Array.isArray(obj.value) ? obj.value.join(", ") : obj.value);
//   //         break;

//   //       case "education":
//   //         setEducation(Array.isArray(obj.value) ? obj.value : []);
//   //         break;

//   //       case "experience":
//   //         setExperience(Array.isArray(obj.value) ? obj.value : []);
//   //         break;

//   //       default:
//   //         break;
//   //     }
//   //   });

//   //   setShowAutofillModal(false);
//   // };
//   const applyResumeAutofill = () => {
//   if (!resumeSuggestions) return;

//   Object.entries(resumeSuggestions).forEach(([key, obj]) => {
//     if (!obj.checked) return;

//     switch (key) {
//       case "firstName":
//         setFirstName(obj.value);
//         break;
//       case "lastName":
//         setLastName(obj.value);
//         break;
//       case "about":
//         setAbout(obj.value);
//         break;
//       case "skills":
//         // Convert skills array to skill objects
//         const skillData = Array.isArray(obj.value) 
//           ? obj.value.map(skill => ({
//               name: skill,
//               level: "intermediate", 
//               percentage: 65
//             }))
//           : [];
//         setSkills(skillData);
//         break;
//       case "education":
//         setEducation(Array.isArray(obj.value) ? obj.value : []);
//         break;
//       case "experience":
//         setExperience(Array.isArray(obj.value) ? obj.value : []);
//         break;
//       default:
//         break;
//     }
//   });

//   setShowAutofillModal(false);
//   alert("✅ Profile auto-filled from resume!");
// };




//   // Dynamic list helpers (education, experience, accounts)
//   const addEducation = () => setEducation([...education, { degree: "", institute: "", yearFrom: "", yearTo: "" }]);
//   const updateEducation = (i, field, val) => {
//     const newEdu = [...education];
//     newEdu[i][field] = val;
//     setEducation(newEdu);
//   };
//   const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));

//   const addExperience = () => setExperience([...experience, { title: "", company: "", years: "" }]);
//   const updateExperience = (i, field, val) => {
//     const newExp = [...experience];
//     newExp[i][field] = val;
//     setExperience(newExp);
//   };
//   const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));

//   const addAccount = () => setAccounts([...accounts, { platform: "", url: "" }]);
//   const updateAccount = (i, field, val) => {
//     const newAcc = [...accounts];
//     newAcc[i][field] = val;
//     setAccounts(newAcc);
//   };
//   const removeAccount = (i) => setAccounts(accounts.filter((_, idx) => idx !== i));

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center">
//         <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 border border-white/60">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
//           <p className="text-2xl font-semibold text-slate-700 text-center">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-8">
//         <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center border border-white/60 max-w-lg">
//           <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
//             <Users className="w-16 h-16 text-white" />
//           </div>
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">Sign In Required</h2>
//           <p className="text-lg text-slate-600">Please sign in to manage your professional profile.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8">
//         <div className="max-w-5xl mx-auto space-y-12">

//           {/*  WELCOME SECTION */}
//           <div className="text-center">
//             <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-sky-900 bg-clip-text text-transparent mb-6">
//               Complete Your Profile
//             </h1>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
//               Add your personal information, resume, experience, and skills to get started with job applications.
//             </p>
//           </div>

//           {/* PERSONAL INFO */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Personal Info
//               </h2>
//             </div>
          
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="space-y-2">
//                   <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                     <RequiredLabel>First Name</RequiredLabel>
//                   </label>
//                   <input
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     placeholder="Enter your first name"
//                     className={`w-full p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 ${
//                       errors.firstName 
//                         ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                         : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50'
//                     } text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg`}
//                   />
//                   {errors.firstName && (
//                     <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                       ⚠️ {errors.firstName}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                     <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                       <RequiredLabel>Last Name</RequiredLabel>
//                     </label>
//                     <input
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       placeholder="Enter your last name"
//                       className={`w-full p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 ${
//                         errors.lastName 
//                           ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                           : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50'
//                       } text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg`}
//                     />
//                     {errors.lastName && (
//                       <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                         ⚠️ {errors.lastName}
//                       </p>
//                     )}
//                   </div>

              
//                   {/*  PHONE INPUT  */}
//                   <div className="space-y-2 md:col-span-1">
//                     <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                       Phone Number (Optional)
//                     </label>
//                     <div className="relative group">
//                       <div className={`flex rounded-2xl bg-white/60 backdrop-blur-md border-2 shadow-inner hover:shadow-lg transition-all overflow-hidden ${
//                         errors.phoneNumber 
//                           ? 'border-red-400 ring-2 ring-red-100/50' 
//                           : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100/50'
//                       }`}>
//                         <select
//                           value={selectedCountry}
//                           onChange={(e) => setSelectedCountry(e.target.value)}
//                           className="px-3 py-5 bg-transparent border-r border-slate-200 text-base font-medium text-slate-700 focus:outline-none appearance-none cursor-pointer min-w-[100px]"
//                         >
//                           {countries.map((country) => (
//                             <option key={country.code} value={country.code}>
//                               {country.dial}
//                             </option>
//                           ))}
//                         </select>
//                         <input
//                           value={phoneNumber}
//                           onChange={(e) => {
//                             const value = e.target.value.replace(/\D/g, "");
//                             setPhoneNumber(value);
//                           }}
//                           placeholder="3001234567"
//                           maxLength={15}
//                           className="flex-1 p-5 text-base font-medium text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent px-3"
//                         />
//                       </div>
//                     </div>
//                     {errors.phoneNumber && (
//                       <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                         ⚠️ {errors.phoneNumber}
//                       </p>
//                     )}
//                     {phoneNumber && !isValidPhone(phoneNumber) && !errors.phoneNumber && (
//                       <p className="text-xs text-red-500 text-right -mb-1">
//                         10-15 digits required
//                       </p>
//                     )}
//                   </div>
//             </div>
//           </section>

//           {/* RESUME SECTION */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl">
//                 <Briefcase className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Resume</RequiredLabel>
//               </h2>
//             </div>

//             {resumeMeta ? (
//               <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border border-emerald-200/50 rounded-3xl p-6 mb-10 shadow-inner">
//                 <p className="text-sm text-slate-500 uppercase tracking-widest font-medium mb-2">Last Updated</p>
//                 <p className="text-lg font-semibold text-slate-800">
//                   {resumeMeta.originalName} • {new Date(resumeMeta.uploadedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
//                 </p>
//               </div>
//             ) : (
//               <div className="border-4 border-dashed border-slate-300/60 rounded-3xl p-16 text-center mb-10 bg-slate-50/40 backdrop-blur-sm hover:border-indigo-400/60 transition-all">
//                 <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-6" />
//                 <p className="text-2xl font-bold text-slate-700 mb-2">No resume uploaded yet</p>
//                 <p className="text-slate-500 text-lg">Add your resume to complete your profile</p>
//                 {errors.resume && (
//                   <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
//                     <p className="text-red-600 font-semibold flex items-center gap-2 mb-1">
//                       ⚠️ <RequiredLabel>{errors.resume}</RequiredLabel>
//                     </p>
//                     <p className="text-sm text-red-500">Supports PDF, DOC, DOCX, Images</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Preview Card */}
//             {resumeMeta && (
//               <div className="mb-12 flex justify-center">
//                 <div
//                   onClick={() => setShowResumeModal(true)}
//                   className="group relative w-64 h-80 bg-gradient-to-br from-slate-100/80 to-indigo-100/60 rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border border-white/60"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                   {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
//                     <img src={resumePreviewUrl} alt="Resume" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                   ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
//                     <div className="flex flex-col items-center justify-center h-full p-10">
//                       <FileText className="w-24 h-24 text-red-600 mb-6" />
//                       <span className="text-slate-700 font-bold text-lg">PDF Document</span>
//                       <span className="text-slate-500 text-sm mt-2">Click to enlarge</span>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center h-full p-10">
//                       <FileText className="w-24 h-24 text-indigo-600 mb-6" />
//                       <span className="text-slate-700 font-bold text-lg truncate px-4">{resumeMeta.originalName}</span>
//                     </div>
//                   )}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg text-sm font-medium text-slate-700">
//                     {resumeMeta.originalName}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Actions */}
//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Upload New Resume</label>
//                 <div className="flex gap-4">
//                   <input
//                     type="file"
//                     accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
//                     onChange={handleResumeChange}
//                     className="flex-1 file:cursor-pointer file:border-0 file:rounded-2xl file:px-6 file:py-4 file:font-bold file:text-white file:bg-gradient-to-r file:from-orange-600 file:to-red-600 file:shadow-lg hover:file:from-orange-700 hover:file:to-red-700 transition-all"
//                     disabled={!!resumeMeta}
//                   />
//                   <button
//                     onClick={handleUploadResume}
//                     disabled={!resumeFile || !!resumeMeta}
//                     className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     {resumeMeta ? "Updated" : "Upload"}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Actions</label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={handleDownloadResume}
//                     disabled={!resumeMeta}
//                     className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-slate-200 rounded-2xl font-semibold text-slate-800 hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
//                   >
//                     <Download className="w-5 h-5" />
//                     Download
//                   </button>
//                   <button
//                     onClick={handleDeleteResume}
//                     disabled={!resumeMeta}
//                     className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-red-200 rounded-2xl font-semibold text-red-700 hover:bg-red-50 hover:border-red-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                     Delete
//                   </button>
//                  <button
//   onClick={handleAutofillFromResume}
//   disabled={!resumeMeta}
//   className="mt-4 w-full py-4 bg-gradient-to-r from-purple-500 to-emerald-600 hover:from-purple-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 text-lg"
// >
//   <Sparkles className="w-5 h-5" />
//   {/* ✨ Auto-fill Profile from Resume */}
//    Auto-fill Profile from Resume
// </button>
//                 </div>

                
//               </div>
//             </div>
//           </section>

//           {/* ABOUT ME */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>About Me</RequiredLabel>
//               </h2>
//             </div>
//             <div className="space-y-3">
//               <textarea
//                 rows={7}
//                 value={about}
//                 onChange={(e) => setAbout(e.target.value)}
//                 placeholder="Share your professional story, passions, and career aspirations (100-200 words)..."
//                 className={`w-full p-8 rounded-3xl bg-white/60 backdrop-blur-md border-2 resize-none text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg ${
//                   errors.about 
//                     ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                     : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50'
//                 }`}
//               />
//               {errors.about && (
//                 <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
//                   ⚠️ {errors.about}
//                 </p>
//               )}
//             </div>
//           </section>

//           {/* SKILLS */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               <RequiredLabel>Skills</RequiredLabel>
//             </h2>
//             </div>
//             {/* Skills error */}
//           {errors.skills && (
//             <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl shadow-lg">
//               <p className="text-red-600 text-sm font-semibold flex items-center gap-2">
//                 ⚠️ <RequiredLabel>{errors.skills}</RequiredLabel>
//               </p>
//             </div>
//           )}

//           {/* Skills List Display */}
//           <div className="space-y-4 mb-8">
//             {skills.map((skill, index) => (
//               <div key={index} className="group bg-gradient-to-r from-emerald-50/80 to-teal-50/60 rounded-2xl p-6 border border-emerald-200/50 shadow-lg hover:shadow-xl hover:border-emerald-400/60 transition-all">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <h4 className="font-bold text-lg text-slate-800">{skill.name}</h4>
//                     <p className="text-sm text-slate-500 capitalize">{skill.level}</p>
//                   </div>
//                   <button
//                     onClick={() => removeSkill(index)}
//                     className="p-2 rounded-xl bg-red-100/60 hover:bg-red-200/80 text-red-600 hover:text-red-700 transition-all opacity-0 group-hover:opacity-100"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
                
//                 {/* Progress Bar */}
//                 <div className="relative">
//                   <div className="flex justify-between text-sm text-slate-600 mb-1">
//                     <span>{skill.percentage}%</span>
//                     <span className="font-semibold capitalize">{skill.level}</span>
//                   </div>
//                   <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
//                     <div 
//                       className={`h-3 rounded-full transition-all duration-700 shadow-lg ${
//                         skill.level === 'expert' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
//                         skill.level === 'advanced' ? 'bg-gradient-to-r from-sky-500 to-blue-600' :
//                         skill.level === 'intermediate' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
//                         'bg-gradient-to-r from-slate-500 to-slate-600'
//                       }`}
//                       style={{ width: `${skill.percentage}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {errors.skills && (
//               <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200">
//                 ⚠️ {errors.skills}
//               </p>
//             )}
//           </div>

//           {/* Add New Skill Form */}
//           <div className="bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border-2 border-slate-200/50 shadow-lg">
//             <div className="grid lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Skill Name</label>
//                 <input
//                   value={newSkillName}
//                   onChange={(e) => setNewSkillName(e.target.value)}
//                   placeholder="React, Node.js, Python..."
//                   className="w-full p-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50 text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Proficiency Level</label>
//                 <select
//                   value={newSkillLevel}
//                   onChange={(e) => setNewSkillLevel(e.target.value)}
//                   className="w-full p-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100/50 text-lg font-medium text-slate-700"
//                 >
//                   <option value="">Select Level</option>
//                   <option value="beginner">Beginner</option>
//                   <option value="intermediate">Intermediate</option>
//                   <option value="advanced">Advanced</option>
//                   <option value="expert">Expert</option>
//                 </select>
//               </div>

//               <div className="flex items-end gap-4">
//                 <button
//                   onClick={addSkill}
//                   disabled={!newSkillName || !newSkillLevel}
//                   className="flex-1 py-5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
//                 >
//                   <Plus className="w-5 h-5" />
//                   Add Skill
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* EDUCATION */}
//         <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//           <div className="flex items-center gap-5 mb-10">
//             <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl shadow-xl flex items-center justify-center">
//               <Building2 className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//           <RequiredLabel>Education</RequiredLabel> (At least 1)
//         </h2>
//         </div>
//           <div className="space-y-6">
//             {education.map((edu, i) => (
//               <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-blue-50/50 rounded-3xl p-8 border ${errors[`education-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300'} transition-all`}>
//                 <div className="grid lg:grid-cols-2 gap-6">
//                   <div className="space-y-1">
//                     <input 
//                       placeholder="Degree" 
//                       value={edu.degree} 
//                       onChange={(e) => updateEducation(i, "degree", e.target.value)}
//                       className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`education-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`} 
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <input 
//                       placeholder="Institute / University" 
//                       value={edu.institute} 
//                       onChange={(e) => updateEducation(i, "institute", e.target.value)}
//                       className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`education-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`} 
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-6 mt-6">
//                   <div className="space-y-1">
//                     <input 
//                       placeholder="From Year" 
//                       value={edu.yearFrom} 
//                       onChange={(e) => updateEducation(i, "yearFrom", e.target.value)}
//                       className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" 
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <input 
//                       placeholder="To Year" 
//                       value={edu.yearTo} 
//                       onChange={(e) => updateEducation(i, "yearTo", e.target.value)}
//                       className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" 
//                     />
//                   </div>
//                 </div>
//                 {errors[`education-${i}`] && (
//                   <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
//                     ⚠️ {errors[`education-${i}`]}
//                   </p>
//                 )}
//                 <button onClick={() => removeEducation(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//                   <Trash2 className="w-5 h-5" /> Remove
//                 </button>
//               </div>
//             ))}
//             <button onClick={addEducation} className="w-full py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
//               <Plus className="w-7 h-7" /> Add Education
//             </button>
//           </div>
//         </section>

//         {/* EXPERIENCE */}
//         <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//           <div className="flex items-center gap-5 mb-10">
//             <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
//               <Briefcase className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               <RequiredLabel>Experience</RequiredLabel>
//             </h2>
//           </div>

//           {/* Fresher Toggle - NEW */}
//           <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
//             <label className="flex items-center gap-3 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 checked={isFresher}
//                 onChange={(e) => setIsFresher(e.target.checked)}
//                 className="w-6 h-6 text-emerald-600 bg-white border-2 border-emerald-300 rounded-lg focus:ring-emerald-500 focus:ring-2 transition-all duration-200"
//               />
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-sm"></div>
//                 <span className="text-xl font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
//                   I am a Fresher / Recent Graduate
//                 </span>
//               </div>
//             </label>
//             {isFresher && (
//               <p className="ml-9 mt-2 text-emerald-700 text-sm font-medium bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200">
//                 ✅ Perfect! Freshers are welcome. Skip experience section.
//               </p>
//             )}
//           </div>

//           {/* Experience List - Conditional */}
//           {!isFresher && (
//             <div className="space-y-6">
//               {experience.map((exp, i) => (
//                 <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border ${errors[`experience-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-emerald-300'} transition-all`}>
//                   <div className="space-y-3">
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Job Title" 
//                         value={exp.title} 
//                         onChange={(e) => updateExperience(i, "title", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`experience-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'}`} 
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Company" 
//                         value={exp.company} 
//                         onChange={(e) => updateExperience(i, "company", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`experience-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'}`} 
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Duration (e.g. 2021 – Present)" 
//                         value={exp.years} 
//                         onChange={(e) => updateExperience(i, "years", e.target.value)}
//                         className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 font-medium" 
//                       />
//                     </div>
//                   </div>
//                   {errors[`experience-${i}`] && (
//                     <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
//                       ⚠️ {errors[`experience-${i}`]}
//                     </p>
//                   )}
//                   <button onClick={() => removeExperience(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//                     <Trash2 className="w-5 h-5" /> Remove
//                   </button>
//                 </div>
//               ))}
//               <button 
//                 onClick={addExperience} 
//                 className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4"
//               >
//                 <Plus className="w-7 h-7" /> Add Experience
//               </button>
//             </div>
//           )}

//           {/* Experience Error */}
//           {errors.experience && !isFresher && (
//             <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl shadow-xl">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
//                   <Briefcase className="w-6 h-6 text-red-500" />
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-bold text-red-700 mb-1">{errors.experience}</h4>
//                   <p className="text-red-600 text-sm">OR check "I am a Fresher" above</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </section> 



//         {/* SOCIAL ACCOUNTS */}
//         <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//           <div className="flex items-center gap-5 mb-10">
//             <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center"> 
//               <MapPin className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//           Social Accounts (Optional)
//         </h2>
//         </div>
//           <div className="space-y-6">
//             {accounts.map((acc, i) => (
//           <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-purple-50/50 rounded-3xl p-8 border ${errors[`account-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200 ring-2 ring-red-200/50' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300'} transition-all`}>
//             <div className="space-y-3">
//               <div className="space-y-1">
//                 <input 
//                   placeholder="Platform (e.g. LinkedIn, GitHub, Twitter)" 
//                   value={acc.platform} 
//                   onChange={(e) => updateAccount(i, "platform", e.target.value)}
//                   className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium placeholder-slate-400 ${errors[`account-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}`} 
//                 />
//               </div>
//               <div className="space-y-1">
//                 <input 
//                   placeholder="linkedin.com/in/yourusername OR github.com/username OR twitter.com/handle" 
//                   value={acc.url} 
//                   onChange={(e) => updateAccount(i, "url", e.target.value)}
//                   className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium placeholder-slate-400 ${errors[`account-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}`} 
//                 />
//               </div>
//             </div>
//             <button onClick={() => removeAccount(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//               <Trash2 className="w-5 h-5" /> Remove
//             </button>
//           </div>
//         ))}

//             <button onClick={addAccount} className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
//               <Plus className="w-7 h-7" /> Add Account
//             </button>
//           </div>
//         </section>



//           {/* SAVE BUTTON */}
//           <div className="flex justify-center pt-8">
//             <button
//               onClick={handleSaveProfile}
//               disabled={!isFormValid || saving}
//               className={`group relative px-16 py-7 rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden ${
//                 !isFormValid || saving
//                   ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed opacity-60"
//                   : "bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 hover:from-indigo-700 hover:via-purple-700 hover:to-sky-700 hover:shadow-3xl"
//               }`}
//             >
//               <span className="relative z-10 flex items-center gap-4">
//                 {saving ? "Saving..." : "Save Profile"}
//                 {!saving && !isFormValid ? (
//                   <span className="text-xs bg-red-500 px-2 py-1 rounded-full">!Complete</span>
//                 ) : !saving ? (
//                   <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
//                 ) : (
//                   <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
//                 )}
//               </span>
//               {saving && <div className="absolute inset-0 flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div></div>}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RESUME MODAL */}
//       {showResumeModal && resumeMeta && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setShowResumeModal(false)}>
//           <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/60" onClick={(e) => e.stopPropagation()}>
//             <div className="p-12 relative">
//               <button onClick={() => setShowResumeModal(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-slate-100 flex items-center justify-center transition-all">
//                 <X className="w-6 h-6 text-slate-700" />
//               </button>

//               {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
//                 <img src={resumePreviewUrl} alt="Resume" className="max-w-full max-h-[70vh] mx-auto rounded-2xl shadow-2xl" />
//               ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
//                 <div className="text-center py-20">
//                   <FileText className="w-32 h-32 text-red-600 mx-auto mb-8" />
//                   <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
//                   <p className="text-xl text-slate-600 mb-10">PDF preview not available in browser. Download to view.</p>
//                 </div>
//               ) : (
//                 <div className="text-center py-20">
//                   <FileText className="w-32 h-32 text-indigo-600 mx-auto mb-8" />
//                   <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
//                   <p className="text-xl text-slate-600 mb-10">Preview not available. Download to open.</p>
//                 </div>
//               )}

//               <div className="flex justify-center gap-6 mt-10">
//                 <button onClick={handleDownloadResume} className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-4 transition-all">
//                   <Download className="w-6 h-6" />
//                   Download Resume
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showAutofillModal && resumeSuggestions && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
//           <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl">
//             <h3 className="text-2xl font-bold mb-6">
//               We found these details from your resume. Apply?
//             </h3>

//             <div className="space-y-4 max-h-80 overflow-auto">
//               {Object.entries(resumeSuggestions).map(([key, obj]) => (
//                 <label key={key} className="flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     checked={obj.checked}
//                     onChange={(e) =>
//                       setResumeSuggestions((prev) => ({
//                         ...prev,
//                         [key]: { ...prev[key], checked: e.target.checked },
//                       }))
//                     }
//                     className="mt-1"
//                   />
//                   <div>
//                     <p className="font-semibold capitalize">{key}</p>
//                     <p className="text-sm text-slate-600">
//                       {Array.isArray(obj.value)
//                         ? JSON.stringify(obj.value)
//                         : String(obj.value)}
//                     </p>
//                   </div>
//                 </label>
//               ))}
//             </div>

//             <div className="flex justify-end gap-4 mt-8">
//               <button
//                 onClick={() => setShowAutofillModal(false)}
//                 className="px-6 py-3 rounded-xl border font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={applyResumeAutofill}
//                 className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </>
//   );
// }


// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Sparkles,
//   Briefcase,
//   Building2,
//   Users,
//   MapPin,
//   Download,
//   Trash2,
//   Plus,
//   ArrowRight,
//   X,
//   FileText,
// } from "lucide-react";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("PK");

//   const countries = [
//     { code: "PK", name: "Pakistan", dial: "+92" },
//     { code: "US", name: "United States", dial: "+1" },
//     { code: "UK", name: "United Kingdom", dial: "+44" },
//     { code: "SA", name: "Saudi Arabia", dial: "+966" },
//     { code: "AE", name: "UAE", dial: "+971" },
//     { code: "CA", name: "Canada", dial: "+1" },
//     { code: "IN", name: "India", dial: "+91" },
//   ];

//   const isValidPhone = (number) => /^\d{10,15}$/.test(number);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [about, setAbout] = useState("");
//   const [education, setEducation] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [newSkillName, setNewSkillName] = useState("");
//   const [newSkillLevel, setNewSkillLevel] = useState("");

//   const [accounts, setAccounts] = useState([]);

//   const [resumeMeta, setResumeMeta] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
//   const [showResumeModal, setShowResumeModal] = useState(false);

//   const [resumeSuggestions, setResumeSuggestions] = useState(null);
//   const [showAutofillModal, setShowAutofillModal] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [isFresher, setIsFresher] = useState(false);

//   // Validation
//   const validateProfile = () => {
//     const newErrors = {};

//     if (!firstName.trim()) newErrors.firstName = "First name is required";
//     if (!lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!resumeMeta) newErrors.resume = "Resume is required for complete profile";
//     if (!about.trim()) newErrors.about = "About section is required";
//     if (skills.length === 0) newErrors.skills = "Add at least 1 skill";

//     if (phoneNumber && !isValidPhone(phoneNumber)) {
//       newErrors.phoneNumber = "Phone must be 10-15 digits";
//     }

//     education.forEach((edu, i) => {
//       if (!edu.degree.trim() || !edu.institute.trim()) {
//         newErrors[`education-${i}`] = `Education #${i + 1}: Degree & Institute required`;
//       }
//     });

//     if (!isFresher) {
//       const hasValidExperience = experience.some(
//         (exp) => exp.title.trim() && exp.company.trim()
//       );
//       if (experience.length === 0 || !hasValidExperience) {
//         newErrors.experience = "Add at least one complete experience OR mark as Fresher";
//       }
//     }

//     accounts.forEach((acc, i) => {
//       if (acc.platform.trim() && acc.url.trim() && !isValidUrl(acc.url)) {
//         newErrors[`account-${i}`] = `Account #${i + 1}: Enter valid URL`;
//       }
//     });

//     setErrors(newErrors);
//     const valid = Object.keys(newErrors).length === 0;
//     setIsFormValid(valid);
//     return valid;
//   };

//   useEffect(() => {
//     validateProfile();
//   }, [
//     firstName,
//     lastName,
//     about,
//     phoneNumber,
//     skills,
//     education,
//     experience,
//     accounts,
//     isFresher,
//     resumeMeta,
//   ]);

//   const isValidUrl = (urlString) => {
//     const value = urlString.trim();
//     if (!value) return true;

//     if (value.startsWith("http://") || value.startsWith("https://")) {
//       try {
//         new URL(value);
//         return true;
//       } catch {
//         return false;
//       }
//     }

//     const socialPattern =
//       /^(linkedin|github|twitter|x|instagram|facebook|dribbble|behance|medium)\.com\/[a-zA-Z0-9\-_\/]+$/i;
//     if (socialPattern.test(value)) return true;

//     const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9\-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
//     return domainPattern.test(value);
//   };

//   const RequiredLabel = ({ children }) => (
//     <span className="flex items-center gap-1">
//       {children}
//       <span className="text-red-500 text-xs font-bold -mt-0.5">*</span>
//     </span>
//   );

//   const getFileType = (mimeType) => {
//     if (!mimeType) return "document";
//     if (mimeType.startsWith("image/")) return "image";
//     if (mimeType === "application/pdf") return "pdf";
//     return "document";
//   };

//   const getLevelPercentage = (level) => {
//     const levels = { beginner: 40, intermediate: 65, advanced: 85, expert: 98 };
//     return levels[level] || 0;
//   };

//   const addSkill = () => {
//     if (!newSkillName.trim() || !newSkillLevel) return;
//     const skill = {
//       name: newSkillName.trim(),
//       level: newSkillLevel,
//       percentage: getLevelPercentage(newSkillLevel),
//     };
//     setSkills([...skills, skill]);
//     setNewSkillName("");
//     setNewSkillLevel("");
//   };

//   const removeSkill = (index) => {
//     setSkills(skills.filter((_, i) => i !== index));
//   };

//   // Load Profile
//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session?.user?.email) {
//       router.push("/signin");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`);
//         if (!res.ok) return;
//         const data = await res.json();

//         setFirstName(data.firstName || "");
//         setLastName(data.lastName || "");
//         setAbout(data.about || "");
//         setEducation(data.education || []);
//         setExperience(data.experience || []);
//         setSkills(data.skills || []);
//         setAccounts(data.accounts || []);

//         // Phone parsing
//         if (data.phone) {
//           const phoneMatch = data.phone.match(/^\+(\d{1,4})\s?(.+)$/);
//           if (phoneMatch) {
//             const [, countryCode, number] = phoneMatch;
//             const country = countries.find((c) => c.dial === `+${countryCode}`);
//             if (country) {
//               setSelectedCountry(country.code);
//               setPhoneNumber(number.trim());
//             } else {
//               setPhoneNumber(data.phone.replace(/\D/g, ""));
//             }
//           } else {
//             setPhoneNumber(data.phone.replace(/\D/g, ""));
//           }
//         }

//         // Resume
//         if (data.resume?.originalName) {
//           setResumeMeta({
//             originalName: data.resume.originalName,
//             uploadedAt: data.resume.uploadedAt,
//             mimeType: data.resume.mimeType,
//           });

//           const previewRes = await fetch(
//             `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=preview`
//           );
//           if (previewRes.ok) {
//             const blob = await previewRes.blob();
//             setResumePreviewUrl(URL.createObjectURL(blob));
//           }
//         }

//         // Detect fresher
//         if (
//           data.experience?.some(
//             (exp) =>
//               exp.title?.toLowerCase().includes("fresher") ||
//               exp.company?.toLowerCase().includes("entry")
//           )
//         ) {
//           setIsFresher(true);
//         }
//       } catch (err) {
//         console.error("Profile load error", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [status, session?.user?.email, router]);

//   // Save Profile
//   const handleSaveProfile = async () => {
//     if (!validateProfile()) {
//       alert(" Please fix all errors before saving!");
//       return;
//     }

//     try {
//       setSaving(true);
//       const payload = {
//         email: session.user.email,
//         firstName,
//         lastName,
//         phone:
//           selectedCountry && phoneNumber
//             ? `${countries.find((c) => c.code === selectedCountry).dial} ${phoneNumber}`
//             : "",
//         about,
//         education,
//         experience: isFresher
//           ? [{ title: "Fresher / Recent Graduate", company: "Entry Level", years: "2024 - Present" }]
//           : experience,
//         skills,
//         accounts,
//       };

//       const res = await fetch("/api/profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         alert("Profile saved successfully!");
//       } else {
//         const data = await res.json();
//         alert(`Failed to save: ${data.message || "Server error"}`);
//       }
//     } catch (err) {
//       alert("Something went wrong");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Resume Handlers
//   const handleResumeChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setResumeFile(file);
//   };

//   const handleUploadResume = async () => {
//     if (!resumeFile || !session?.user?.email) return;

//     const formData = new FormData();
//     formData.append("email", session.user.email);
//     formData.append("file", resumeFile);

//     try {
//       const res = await fetch("/api/profile/resume", { method: "POST", body: formData });
//       if (!res.ok) throw new Error();

//       const now = new Date();
//       setResumeMeta({
//         originalName: resumeFile.name,
//         uploadedAt: now.toISOString(),
//         mimeType: resumeFile.type,
//       });
//       setResumeFile(null);

//       const previewRes = await fetch(
//         `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=preview`
//       );
//       if (previewRes.ok) {
//         const blob = await previewRes.blob();
//         setResumePreviewUrl(URL.createObjectURL(blob));
//       }

//       alert("Resume uploaded successfully!");
//     } catch (err) {
//       alert("Upload failed");
//     }
//   };

//   const handleDownloadResume = async () => {
//     if (!session?.user?.email) return;
//     try {
//       const res = await fetch(
//         `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=download`
//       );
//       if (!res.ok) throw new Error();
//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = resumeMeta?.originalName || "resume";
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       alert("Download failed");
//     }
//   };

//   const handleDeleteResume = async () => {
//     if (!confirm("Permanently delete your resume?")) return;
//     try {
//       const res = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         setResumeMeta(null);
//         setResumePreviewUrl(null);
//         alert("Resume deleted");
//       }
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const handleAutofillFromResume = async () => {
//     try {
//       const res = await fetch("/api/profile/resume/parse", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: session.user.email }),
//       });

//       const data = await res.json();

//       if (res.ok && data.extracted) {
//         setResumeSuggestions(
//           Object.fromEntries(
//             Object.entries(data.extracted).map(([k, v]) => [k, { value: v, checked: true }])
//           )
//         );
//         setShowAutofillModal(true);
//       } else {
//         alert("Failed to extract data from resume");
//       }
//     } catch (err) {
//       alert("Network error: " + err.message);
//     }
//   };

//   const applyResumeAutofill = () => {
//     if (!resumeSuggestions) return;

//     Object.entries(resumeSuggestions).forEach(([key, obj]) => {
//       if (!obj.checked) return;

//       switch (key) {
//         case "firstName":
//           setFirstName(obj.value);
//           break;
//         case "lastName":
//           setLastName(obj.value);
//           break;
//         case "about":
//           setAbout(obj.value);
//           break;
//         case "skills":
//           const skillData = Array.isArray(obj.value)
//             ? obj.value.map((skill) => ({
//                 name: skill,
//                 level: "intermediate",
//                 percentage: 65,
//               }))
//             : [];
//           setSkills(skillData);
//           break;
//         case "education":
//           setEducation(Array.isArray(obj.value) ? obj.value : []);
//           break;
//         case "experience":
//           setExperience(Array.isArray(obj.value) ? obj.value : []);
//           break;
//         default:
//           break;
//       }
//     });

//     setShowAutofillModal(false);
//     alert(" Profile auto-filled from resume!");
//   };

//   // Dynamic list helpers
//   const addEducation = () =>
//     setEducation([...education, { degree: "", institute: "", yearFrom: "", yearTo: "" }]);
//   const updateEducation = (i, field, val) => {
//     const newEdu = [...education];
//     newEdu[i][field] = val;
//     setEducation(newEdu);
//   };
//   const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));

//   const addExperience = () =>
//     setExperience([...experience, { title: "", company: "", years: "" }]);
//   const updateExperience = (i, field, val) => {
//     const newExp = [...experience];
//     newExp[i][field] = val;
//     setExperience(newExp);
//   };
//   const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));

//   const addAccount = () => setAccounts([...accounts, { platform: "", url: "" }]);
//   const updateAccount = (i, field, val) => {
//     const newAcc = [...accounts];
//     newAcc[i][field] = val;
//     setAccounts(newAcc);
//   };
//   const removeAccount = (i) => setAccounts(accounts.filter((_, idx) => idx !== i));

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center">
//         <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 border border-white/60">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
//           <p className="text-2xl font-semibold text-slate-700 text-center">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-8">
//         <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center border border-white/60 max-w-lg">
//           <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
//             <Users className="w-16 h-16 text-white" />
//           </div>
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">Sign In Required</h2>
//           <p className="text-lg text-slate-600">Please sign in to manage your professional profile.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8">
//         <div className="max-w-5xl mx-auto space-y-12">

//           {/* WELCOME SECTION */}
//           <div className="text-center">
//             <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-sky-900 bg-clip-text text-transparent mb-6">
//               Complete Your Profile
//             </h1>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
//               Add your personal information, resume, experience, and skills to get started with job applications.
//             </p>
//           </div>

//           {/* PERSONAL INFO */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Personal Info
//               </h2>
//             </div>
          
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                   <RequiredLabel>First Name</RequiredLabel>
//                 </label>
//                 <input
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   placeholder="Enter your first name"
//                   className={`w-full p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 ${
//                     errors.firstName 
//                       ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                       : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50'
//                   } text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg`}
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                     ⚠️ {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                   <RequiredLabel>Last Name</RequiredLabel>
//                 </label>
//                 <input
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   placeholder="Enter your last name"
//                   className={`w-full p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 ${
//                     errors.lastName 
//                       ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                       : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50'
//                   } text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg`}
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                     ⚠️ {errors.lastName}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2 md:col-span-1">
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                   Phone Number (Optional)
//                 </label>
//                 <div className="relative group">
//                   <div className={`flex rounded-2xl bg-white/60 backdrop-blur-md border-2 shadow-inner hover:shadow-lg transition-all overflow-hidden ${
//                     errors.phoneNumber 
//                       ? 'border-red-400 ring-2 ring-red-100/50' 
//                       : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100/50'
//                   }`}>
//                     <select
//                       value={selectedCountry}
//                       onChange={(e) => setSelectedCountry(e.target.value)}
//                       className="px-3 py-5 bg-transparent border-r border-slate-200 text-base font-medium text-slate-700 focus:outline-none appearance-none cursor-pointer min-w-[100px]"
//                     >
//                       {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                           {country.dial}
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       value={phoneNumber}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, "");
//                         setPhoneNumber(value);
//                       }}
//                       placeholder="3001234567"
//                       maxLength={15}
//                       className="flex-1 p-5 text-base font-medium text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent px-3"
//                     />
//                   </div>
//                 </div>
//                 {errors.phoneNumber && (
//                   <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                     ⚠️ {errors.phoneNumber}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* RESUME SECTION */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl">
//                 <Briefcase className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Resume</RequiredLabel>
//               </h2>
//             </div>

//             {resumeMeta ? (
//               <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border border-emerald-200/50 rounded-3xl p-6 mb-10 shadow-inner">
//                 <p className="text-sm text-slate-500 uppercase tracking-widest font-medium mb-2">Last Updated</p>
//                 <p className="text-lg font-semibold text-slate-800">
//                   {resumeMeta.originalName} • {new Date(resumeMeta.uploadedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
//                 </p>
//               </div>
//             ) : (
//               <div className="border-4 border-dashed border-slate-300/60 rounded-3xl p-16 text-center mb-10 bg-slate-50/40 backdrop-blur-sm hover:border-indigo-400/60 transition-all">
//                 <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-6" />
//                 <p className="text-2xl font-bold text-slate-700 mb-2">No resume uploaded yet</p>
//                 <p className="text-slate-500 text-lg">Add your resume to complete your profile</p>
//                 {errors.resume && (
//                   <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
//                     <p className="text-red-600 font-semibold flex items-center gap-2 mb-1">
//                       ⚠️ <RequiredLabel>{errors.resume}</RequiredLabel>
//                     </p>
//                     <p className="text-sm text-red-500">Supports PDF, DOC, DOCX, Images</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {resumeMeta && (
//               <div className="mb-12 flex justify-center">
//                 <div
//                   onClick={() => setShowResumeModal(true)}
//                   className="group relative w-64 h-80 bg-gradient-to-br from-slate-100/80 to-indigo-100/60 rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border border-white/60"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                   {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
//                     <img src={resumePreviewUrl} alt="Resume" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                   ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
//                     <div className="flex flex-col items-center justify-center h-full p-10">
//                       <FileText className="w-24 h-24 text-red-600 mb-6" />
//                       <span className="text-slate-700 font-bold text-lg">PDF Document</span>
//                       <span className="text-slate-500 text-sm mt-2">Click to enlarge</span>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center h-full p-10">
//                       <FileText className="w-24 h-24 text-indigo-600 mb-6" />
//                       <span className="text-slate-700 font-bold text-lg truncate px-4">{resumeMeta.originalName}</span>
//                     </div>
//                   )}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg text-sm font-medium text-slate-700">
//                     {resumeMeta.originalName}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Upload New Resume</label>
//                 <div className="flex gap-4">
//                   <input
//                     type="file"
//                     accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
//                     onChange={handleResumeChange}
//                     className="flex-1 file:cursor-pointer file:border-0 file:rounded-2xl file:px-6 file:py-4 file:font-bold file:text-white file:bg-gradient-to-r file:from-orange-600 file:to-red-600 file:shadow-lg hover:file:from-orange-700 hover:file:to-red-700 transition-all"
//                     disabled={!!resumeFile && !!resumeMeta}
//                   />
//                   <button
//                     onClick={handleUploadResume}
//                     disabled={!resumeFile}
//                     className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Actions</label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={handleDownloadResume}
//                     disabled={!resumeMeta}
//                     className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-slate-200 rounded-2xl font-semibold text-slate-800 hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
//                   >
//                     <Download className="w-5 h-5" />
//                     Download
//                   </button>
//                   <button
//                     onClick={handleDeleteResume}
//                     disabled={!resumeMeta}
//                     className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-red-200 rounded-2xl font-semibold text-red-700 hover:bg-red-50 hover:border-red-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                     Delete
//                   </button>
//                 </div>
//                 <button
//                   onClick={handleAutofillFromResume}
//                   disabled={!resumeMeta}
//                   className="mt-4 w-full py-4 bg-gradient-to-r from-purple-500 to-emerald-600 hover:from-purple-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 text-lg"
//                 >
//                   <Sparkles className="w-5 h-5" />
//                   Auto-fill Profile from Resume
//                 </button>
//               </div>
//             </div>
//           </section>

//           {/* ABOUT ME */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>About Me</RequiredLabel>
//               </h2>
//             </div>
//             <div className="space-y-3">
//               <textarea
//                 rows={7}
//                 value={about}
//                 onChange={(e) => setAbout(e.target.value)}
//                 placeholder="Share your professional story, passions, and career aspirations (100-200 words)..."
//                 className={`w-full p-8 rounded-3xl bg-white/60 backdrop-blur-md border-2 resize-none text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg ${
//                   errors.about 
//                     ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                     : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50'
//                 }`}
//               />
//               {errors.about && (
//                 <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
//                   ⚠️ {errors.about}
//                 </p>
//               )}
//             </div>
//           </section>

//           {/* SKILLS */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Skills</RequiredLabel>
//               </h2>
//             </div>

//             {errors.skills && (
//               <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl shadow-lg">
//                 <p className="text-red-600 text-sm font-semibold flex items-center gap-2">
//                   ⚠️ <RequiredLabel>{errors.skills}</RequiredLabel>
//                 </p>
//               </div>
//             )}

//             <div className="space-y-4 mb-8">
//               {skills.map((skill, index) => (
//                 <div key={index} className="group bg-gradient-to-r from-emerald-50/80 to-teal-50/60 rounded-2xl p-6 border border-emerald-200/50 shadow-lg hover:shadow-xl hover:border-emerald-400/60 transition-all">
//                   <div className="flex items-center justify-between mb-3">
//                     <div>
//                       <h4 className="font-bold text-lg text-slate-800">{skill.name}</h4>
//                       <p className="text-sm text-slate-500 capitalize">{skill.level}</p>
//                     </div>
//                     <button
//                       onClick={() => removeSkill(index)}
//                       className="p-2 rounded-xl bg-red-100/60 hover:bg-red-200/80 text-red-600 hover:text-red-700 transition-all opacity-0 group-hover:opacity-100"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <div className="flex justify-between text-sm text-slate-600 mb-1">
//                       <span>{skill.percentage}%</span>
//                       <span className="font-semibold capitalize">{skill.level}</span>
//                     </div>
//                     <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
//                       <div 
//                         className={`h-3 rounded-full transition-all duration-700 shadow-lg ${
//                           skill.level === 'expert' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
//                           skill.level === 'advanced' ? 'bg-gradient-to-r from-sky-500 to-blue-600' :
//                           skill.level === 'intermediate' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
//                           'bg-gradient-to-r from-slate-500 to-slate-600'
//                         }`}
//                         style={{ width: `${skill.percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border-2 border-slate-200/50 shadow-lg">
//               <div className="grid lg:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Skill Name</label>
//                   <input
//                     value={newSkillName}
//                     onChange={(e) => setNewSkillName(e.target.value)}
//                     placeholder="React, Node.js, Python..."
//                     className="w-full p-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50 text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Proficiency Level</label>
//                   <select
//                     value={newSkillLevel}
//                     onChange={(e) => setNewSkillLevel(e.target.value)}
//                     className="w-full p-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100/50 text-lg font-medium text-slate-700"
//                   >
//                     <option value="">Select Level</option>
//                     <option value="beginner">Beginner</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                     <option value="expert">Expert</option>
//                   </select>
//                 </div>
//                 <div className="flex items-end gap-4">
//                   <button
//                     onClick={addSkill}
//                     disabled={!newSkillName || !newSkillLevel}
//                     className="flex-1 py-5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
//                   >
//                     <Plus className="w-5 h-5" />
//                     Add Skill
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* EDUCATION */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Building2 className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Education</RequiredLabel> (At least 1)
//               </h2>
//             </div>
//             <div className="space-y-6">
//               {education.map((edu, i) => (
//                 <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-blue-50/50 rounded-3xl p-8 border ${errors[`education-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300'} transition-all`}>
//                   <div className="grid lg:grid-cols-2 gap-6">
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Degree" 
//                         value={edu.degree} 
//                         onChange={(e) => updateEducation(i, "degree", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`education-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`} 
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Institute / University" 
//                         value={edu.institute} 
//                         onChange={(e) => updateEducation(i, "institute", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`education-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`} 
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-6 mt-6">
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="From Year" 
//                         value={edu.yearFrom} 
//                         onChange={(e) => updateEducation(i, "yearFrom", e.target.value)}
//                         className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" 
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="To Year" 
//                         value={edu.yearTo} 
//                         onChange={(e) => updateEducation(i, "yearTo", e.target.value)}
//                         className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" 
//                       />
//                     </div>
//                   </div>
//                   {errors[`education-${i}`] && (
//                     <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
//                       ⚠️ {errors[`education-${i}`]}
//                     </p>
//                   )}
//                   <button onClick={() => removeEducation(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//                     <Trash2 className="w-5 h-5" /> Remove
//                   </button>
//                 </div>
//               ))}
//               <button onClick={addEducation} className="w-full py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
//                 <Plus className="w-7 h-7" /> Add Education
//               </button>
//             </div>
//           </section>

//           {/* EXPERIENCE */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Briefcase className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Experience</RequiredLabel>
//               </h2>
//             </div>

//             <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
//               <label className="flex items-center gap-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={isFresher}
//                   onChange={(e) => setIsFresher(e.target.checked)}
//                   className="w-6 h-6 text-emerald-600 bg-white border-2 border-emerald-300 rounded-lg focus:ring-emerald-500 focus:ring-2 transition-all duration-200"
//                 />
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-sm"></div>
//                   <span className="text-xl font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
//                     I am a Fresher / Recent Graduate
//                   </span>
//                 </div>
//               </label>
//               {isFresher && (
//                 <p className="ml-9 mt-2 text-emerald-700 text-sm font-medium bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200">
//                   ✅ Perfect! Freshers are welcome. Skip experience section.
//                 </p>
//               )}
//             </div>

//             {!isFresher && (
//               <div className="space-y-6">
//                 {experience.map((exp, i) => (
//                   <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border ${errors[`experience-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-emerald-300'} transition-all`}>
//                     <div className="space-y-3">
//                       <div className="space-y-1">
//                         <input 
//                           placeholder="Job Title" 
//                           value={exp.title} 
//                           onChange={(e) => updateExperience(i, "title", e.target.value)}
//                           className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`experience-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'}`} 
//                         />
//                       </div>
//                       <div className="space-y-1">
//                         <input 
//                           placeholder="Company" 
//                           value={exp.company} 
//                           onChange={(e) => updateExperience(i, "company", e.target.value)}
//                           className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`experience-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'}`} 
//                         />
//                       </div>
//                       <div className="space-y-1">
//                         <input 
//                           placeholder="Duration (e.g. 2021 – Present)" 
//                           value={exp.years} 
//                           onChange={(e) => updateExperience(i, "years", e.target.value)}
//                           className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 font-medium" 
//                         />
//                       </div>
//                     </div>
//                     {errors[`experience-${i}`] && (
//                       <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
//                         ⚠️ {errors[`experience-${i}`]}
//                       </p>
//                     )}
//                     <button onClick={() => removeExperience(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//                       <Trash2 className="w-5 h-5" /> Remove
//                     </button>
//                   </div>
//                 ))}
//                 <button 
//                   onClick={addExperience} 
//                   className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4"
//                 >
//                   <Plus className="w-7 h-7" /> Add Experience
//                 </button>
//               </div>
//             )}

//             {errors.experience && !isFresher && (
//               <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl shadow-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
//                     <Briefcase className="w-6 h-6 text-red-500" />
//                   </div>
//                   <div>
//                     <h4 className="text-xl font-bold text-red-700 mb-1">{errors.experience}</h4>
//                     <p className="text-red-600 text-sm">OR check "I am a Fresher" above</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </section>

//           {/* SOCIAL ACCOUNTS */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center"> 
//                 <MapPin className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Social Accounts (Optional)
//               </h2>
//             </div>
//             <div className="space-y-6">
//               {accounts.map((acc, i) => (
//                 <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-purple-50/50 rounded-3xl p-8 border ${errors[`account-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200 ring-2 ring-red-200/50' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300'} transition-all`}>
//                   <div className="space-y-3">
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Platform (e.g. LinkedIn, GitHub, Twitter)" 
//                         value={acc.platform} 
//                         onChange={(e) => updateAccount(i, "platform", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium placeholder-slate-400 ${errors[`account-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}`} 
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="linkedin.com/in/yourusername OR github.com/username" 
//                         value={acc.url} 
//                         onChange={(e) => updateAccount(i, "url", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium placeholder-slate-400 ${errors[`account-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}`} 
//                       />
//                     </div>
//                   </div>
//                   <button onClick={() => removeAccount(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//                     <Trash2 className="w-5 h-5" /> Remove
//                   </button>
//                 </div>
//               ))}

//               <button onClick={addAccount} className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
//                 <Plus className="w-7 h-7" /> Add Account
//               </button>
//             </div>
//           </section>

//           {/* SAVE BUTTON */}
//           <div className="flex justify-center pt-8">
//             <button
//               onClick={handleSaveProfile}
//               disabled={!isFormValid || saving}
//               className={`group relative px-16 py-7 rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden ${
//                 !isFormValid || saving
//                   ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed opacity-60"
//                   : "bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 hover:from-indigo-700 hover:via-purple-700 hover:to-sky-700 hover:shadow-3xl"
//               }`}
//             >
//               <span className="relative z-10 flex items-center gap-4">
//                 {saving ? "Saving..." : "Save Profile"}
//                 {!saving && !isFormValid ? (
//                   <span className="text-xs bg-red-500 px-2 py-1 rounded-full">!Complete</span>
//                 ) : !saving ? (
//                   <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
//                 ) : (
//                   <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
//                 )}
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RESUME MODAL */}
//       {showResumeModal && resumeMeta && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setShowResumeModal(false)}>
//           <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/60" onClick={(e) => e.stopPropagation()}>
//             <div className="p-12 relative">
//               <button onClick={() => setShowResumeModal(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-slate-100 flex items-center justify-center transition-all">
//                 <X className="w-6 h-6 text-slate-700" />
//               </button>

//               {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
//                 <img src={resumePreviewUrl} alt="Resume" className="max-w-full max-h-[70vh] mx-auto rounded-2xl shadow-2xl" />
//               ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
//                 <div className="text-center py-20">
//                   <FileText className="w-32 h-32 text-red-600 mx-auto mb-8" />
//                   <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
//                   <p className="text-xl text-slate-600 mb-10">PDF preview not available in browser. Download to view.</p>
//                 </div>
//               ) : (
//                 <div className="text-center py-20">
//                   <FileText className="w-32 h-32 text-indigo-600 mx-auto mb-8" />
//                   <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
//                   <p className="text-xl text-slate-600 mb-10">Preview not available. Download to open.</p>
//                 </div>
//               )}

//               <div className="flex justify-center gap-6 mt-10">
//                 <button onClick={handleDownloadResume} className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-4 transition-all">
//                   <Download className="w-6 h-6" />
//                   Download Resume
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* AUTOFILL MODAL */}
//       {showAutofillModal && resumeSuggestions && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
//           <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl">
//             <h3 className="text-2xl font-bold mb-6">
//               We found these details from your resume. Apply?
//             </h3>

//             <div className="space-y-4 max-h-80 overflow-auto">
//               {Object.entries(resumeSuggestions).map(([key, obj]) => (
//                 <label key={key} className="flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     checked={obj.checked}
//                     onChange={(e) =>
//                       setResumeSuggestions((prev) => ({
//                         ...prev,
//                         [key]: { ...prev[key], checked: e.target.checked },
//                       }))
//                     }
//                     className="mt-1"
//                   />
//                   <div>
//                     <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
//                     <p className="text-sm text-slate-600">
//                       {Array.isArray(obj.value)
//                         ? obj.value.join(", ")
//                         : String(obj.value)}
//                     </p>
//                   </div>
//                 </label>
//               ))}
//             </div>

//             <div className="flex justify-end gap-4 mt-8">
//               <button
//                 onClick={() => setShowAutofillModal(false)}
//                 className="px-6 py-3 rounded-xl border font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={applyResumeAutofill}
//                 className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
//               >
//                 Apply Selected
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Sparkles,
//   Briefcase,
//   Building2,
//   Users,
//   MapPin,
//   Download,
//   Trash2,
//   Plus,
//   ArrowRight,
//   X,
//   FileText,
// } from "lucide-react";


// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("PK");

//   const countries = [
//     { code: "PK", name: "Pakistan", dial: "+92" },
//     { code: "US", name: "United States", dial: "+1" },
//     { code: "UK", name: "United Kingdom", dial: "+44" },
//     { code: "SA", name: "Saudi Arabia", dial: "+966" },
//     { code: "AE", name: "UAE", dial: "+971" },
//     { code: "CA", name: "Canada", dial: "+1" },
//     { code: "IN", name: "India", dial: "+91" },
//   ];

//   const isValidPhone = (number) => /^\d{10,15}$/.test(number);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [about, setAbout] = useState("");

//   const [aiSuggestions, setAiSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [suggestionLoading, setSuggestionLoading] = useState(false);


//   const [education, setEducation] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [newSkillName, setNewSkillName] = useState("");
//   const [newSkillLevel, setNewSkillLevel] = useState("");

//   const [accounts, setAccounts] = useState([]);

//   const [resumeMeta, setResumeMeta] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
//   const [showResumeModal, setShowResumeModal] = useState(false);

//   const [resumeSuggestions, setResumeSuggestions] = useState(null);
//   const [showAutofillModal, setShowAutofillModal] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [isFresher, setIsFresher] = useState(false);

//   // Validation
//   const validateProfile = () => {
//     const newErrors = {};

//     if (!firstName.trim()) newErrors.firstName = "First name is required";
//     if (!lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!resumeMeta) newErrors.resume = "Resume is required for complete profile";
//     if (!about.trim()) newErrors.about = "About section is required";
//     if (skills.length === 0) newErrors.skills = "Add at least 1 skill";

//     if (phoneNumber && !isValidPhone(phoneNumber)) {
//       newErrors.phoneNumber = "Phone must be 10-15 digits";
//     }

//     // Education: always require at least one valid entry
//     education.forEach((edu, i) => {
//       if (!edu.degree.trim() || !edu.institute.trim()) {
//         newErrors[`education-${i}`] = `Education #${i + 1}: Degree & Institute required`;
//       }
//     });

//     // Experience: ONLY validate if user is NOT a fresher
//     if (!isFresher) {
//       const hasValidExperience = experience.some(
//         (exp) => exp.title.trim() && exp.company.trim()
//       );
//       if (experience.length === 0 || !hasValidExperience) {
//         newErrors.experience = "Add at least one complete experience OR mark as Fresher";
//       }
//     }
//     // When isFresher === true → no experience validation/error

//     accounts.forEach((acc, i) => {
//       if (acc.platform.trim() && acc.url.trim() && !isValidUrl(acc.url)) {
//         newErrors[`account-${i}`] = `Account #${i + 1}: Enter valid URL`;
//       }
//     });

//     setErrors(newErrors);
//     const valid = Object.keys(newErrors).length === 0;
//     setIsFormValid(valid);
//     return valid;
//   };

//   useEffect(() => {
//     validateProfile();
//   }, [
//     firstName,
//     lastName,
//     about,
//     phoneNumber,
//     skills,
//     education,
//     experience,
//     accounts,
//     isFresher,
//     resumeMeta,
//   ]);

//   const isValidUrl = (urlString) => {
//     const value = urlString.trim();
//     if (!value) return true;

//     if (value.startsWith("http://") || value.startsWith("https://")) {
//       try {
//         new URL(value);
//         return true;
//       } catch {
//         return false;
//       }
//     }

//     const socialPattern =
//       /^(linkedin|github|twitter|x|instagram|facebook|dribbble|behance|medium)\.com\/[a-zA-Z0-9\-_\/]+$/i;
//     if (socialPattern.test(value)) return true;

//     const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9\-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
//     return domainPattern.test(value);
//   };

//   const RequiredLabel = ({ children }) => (
//     <span className="flex items-center gap-1">
//       {children}
//       <span className="text-red-500 text-xs font-bold -mt-0.5">*</span>
//     </span>
//   );

//   const getFileType = (mimeType) => {
//     if (!mimeType) return "document";
//     if (mimeType.startsWith("image/")) return "image";
//     if (mimeType === "application/pdf") return "pdf";
//     return "document";
//   };

//   const getLevelPercentage = (level) => {
//     const levels = { beginner: 40, intermediate: 65, advanced: 85, expert: 98 };
//     return levels[level] || 0;
//   };

//   const addSkill = () => {
//     if (!newSkillName.trim() || !newSkillLevel) return;
//     const skill = {
//       name: newSkillName.trim(),
//       level: newSkillLevel,
//       percentage: getLevelPercentage(newSkillLevel),
//     };
//     setSkills([...skills, skill]);
//     setNewSkillName("");
//     setNewSkillLevel("");
//   };

//   const removeSkill = (index) => {
//     setSkills(skills.filter((_, i) => i !== index));
//   };

//   // Fresher checkbox handler – clears experience when switching to fresher
//   const handleFresherChange = (checked) => {
//     setIsFresher(checked);
//     if (checked) {
//       setExperience([]); // Clear experience fields for better UX
//     }
//   };

//   // Load Profile
//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session?.user?.email) {
//       router.push("/signin");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`);
//         if (!res.ok) return;
//         const data = await res.json();

//         setFirstName(data.firstName || "");
//         setLastName(data.lastName || "");
//         setAbout(data.about || "");
//         setEducation(data.education || []);
//         setExperience(data.experience || []);
//         setSkills(data.skills || []);
//         setAccounts(data.accounts || []);

//         // Phone parsing
//         if (data.phone) {
//           const phoneMatch = data.phone.match(/^\+(\d{1,4})\s?(.+)$/);
//           if (phoneMatch) {
//             const [, countryCode, number] = phoneMatch;
//             const country = countries.find((c) => c.dial === `+${countryCode}`);
//             if (country) {
//               setSelectedCountry(country.code);
//               setPhoneNumber(number.trim());
//             } else {
//               setPhoneNumber(data.phone.replace(/\D/g, ""));
//             }
//           } else {
//             setPhoneNumber(data.phone.replace(/\D/g, ""));
//           }
//         }

//         // Resume
//         if (data.resume?.originalName) {
//           setResumeMeta({
//             originalName: data.resume.originalName,
//             uploadedAt: data.resume.uploadedAt,
//             mimeType: data.resume.mimeType,
//           });

//           const previewRes = await fetch(
//             `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=preview`
//           );
//           if (previewRes.ok) {
//             const blob = await previewRes.blob();
//             setResumePreviewUrl(URL.createObjectURL(blob));
//           }
//         }

//         // Detect fresher
//         if (
//           data.experience?.some(
//             (exp) =>
//               exp.title?.toLowerCase().includes("fresher") ||
//               exp.company?.toLowerCase().includes("entry")
//           )
//         ) {
//           setIsFresher(true);
//           setExperience([]); // optional: clean up
//         }
//       } catch (err) {
//         console.error("Profile load error", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [status, session?.user?.email, router]);

//   // Save Profile
//   const handleSaveProfile = async () => {
//     if (!validateProfile()) {
//       alert("Please fix all errors before saving!");
//       return;
//     }

//     try {
//       setSaving(true);
//       const currentYear = new Date().getFullYear();
//       const payload = {
//         email: session.user.email,
//         firstName,
//         lastName,
//         phone:
//           selectedCountry && phoneNumber
//             ? `${countries.find((c) => c.code === selectedCountry).dial} ${phoneNumber}`
//             : "",
//         about,
//         education,
//         experience: isFresher
//           ? [{ title: "Fresher / Recent Graduate", company: "Entry Level", years: `${currentYear} - Present` }]
//           : experience,
//         skills,
//         accounts,
//       };

//       const res = await fetch("/api/profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         alert("Profile saved successfully!");
//       } else {
//         const data = await res.json();
//         alert(`Failed to save: ${data.message || "Server error"}`);
//       }
//     } catch (err) {
//       alert("Something went wrong");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Resume Handlers
//   const handleResumeChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setResumeFile(file);
//   };

//   const handleUploadResume = async () => {
//     if (!resumeFile || !session?.user?.email) return;

//     const formData = new FormData();
//     formData.append("email", session.user.email);
//     formData.append("file", resumeFile);

//     try {
//       const res = await fetch("/api/profile/resume", { method: "POST", body: formData });
//       if (!res.ok) throw new Error();

//       const now = new Date();
//       setResumeMeta({
//         originalName: resumeFile.name,
//         uploadedAt: now.toISOString(),
//         mimeType: resumeFile.type,
//       });
//       setResumeFile(null);

//       const previewRes = await fetch(
//         `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=preview`
//       );
//       if (previewRes.ok) {
//         const blob = await previewRes.blob();
//         setResumePreviewUrl(URL.createObjectURL(blob));
//       }

//       alert("Resume uploaded successfully!");
//     } catch (err) {
//       alert("Upload failed");
//     }
//   };

//   const handleDownloadResume = async () => {
//     if (!session?.user?.email) return;
//     try {
//       const res = await fetch(
//         `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=download`
//       );
//       if (!res.ok) throw new Error();
//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = resumeMeta?.originalName || "resume";
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       alert("Download failed");
//     }
//   };

//   const handleDeleteResume = async () => {
//     if (!confirm("Permanently delete your resume?")) return;
//     try {
//       const res = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         setResumeMeta(null);
//         setResumePreviewUrl(null);
//         alert("Resume deleted");
//       }
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const handleAutofillFromResume = async () => {
//     try {
//       const res = await fetch("/api/profile/resume/parse", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: session.user.email }),
//       });

//       const data = await res.json();

//       if (res.ok && data.extracted) {
//         setResumeSuggestions(
//           Object.fromEntries(
//             Object.entries(data.extracted).map(([k, v]) => [k, { value: v, checked: true }])
//           )
//         );
//         setShowAutofillModal(true);
//       } else {
//         alert("Failed to extract data from resume");
//       }
//     } catch (err) {
//       alert("Network error: " + err.message);
//     }
//   };


//   const generateAiSuggestions = async () => {
//     if (!about.trim() || suggestionLoading) return;
    
//     try {
//       setSuggestionLoading(true);
//       const res = await fetch("/api/ai-suggestions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           about: about.trim(),
//           skills: skills.map(s => s.name).join(', '),
//           experience: experience.map(e => e.title).join(', '),
//           education: education.map(e => e.degree).join(', ')
//         }),
//       });

//       const data = await res.json();

//       if (data.success && data.suggestions?.length > 0) {
//         const cleanSuggestions = data.suggestions.map(suggestion => {
//           const userInputLower = about.trim().toLowerCase();
//           const suggestionLower = suggestion.toLowerCase();
//           if (!suggestionLower.startsWith(userInputLower)) {
//             return suggestion;
//           }

//           return suggestion.replace(new RegExp(`^${userInputLower}`, 'i'), '').trim();
//         }).filter(Boolean); 
        
//         setAiSuggestions(cleanSuggestions.slice(0, 3));
//         setShowSuggestions(true);
//       }
//     } catch (err) {
//       console.error("AI error:", err);
//     } finally {
//       setSuggestionLoading(false);
//     }
//   };






//   const applyResumeAutofill = () => {
//     if (!resumeSuggestions) return;

//     Object.entries(resumeSuggestions).forEach(([key, obj]) => {
//       if (!obj.checked) return;

//       switch (key) {
//         case "firstName":
//           setFirstName(obj.value);
//           break;
//         case "lastName":
//           setLastName(obj.value);
//           break;
//         case "about":
//           setAbout(obj.value);
//           break;
//         case "skills":
//           const skillData = Array.isArray(obj.value)
//             ? obj.value.map((skill) => ({
//                 name: skill,
//                 level: "intermediate",
//                 percentage: 65,
//               }))
//             : [];
//           setSkills(skillData);
//           break;
//         case "education":
//           setEducation(Array.isArray(obj.value) ? obj.value : []);
//           break;
//         case "experience":
//           setExperience(Array.isArray(obj.value) ? obj.value : []);
//           break;
//         default:
//           break;
//       }
//     });

//     setShowAutofillModal(false);
//     alert("Profile auto-filled from resume!");
//   };

//   // Dynamic list helpers
//   const addEducation = () =>
//     setEducation([...education, { degree: "", institute: "", yearFrom: "", yearTo: "" }]);
//   const updateEducation = (i, field, val) => {
//     const newEdu = [...education];
//     newEdu[i][field] = val;
//     setEducation(newEdu);
//   };
//   const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));

//   const addExperience = () =>
//     setExperience([...experience, { title: "", company: "", years: "" }]);
//   const updateExperience = (i, field, val) => {
//     const newExp = [...experience];
//     newExp[i][field] = val;
//     setExperience(newExp);
//   };
//   const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));

//   const addAccount = () => setAccounts([...accounts, { platform: "", url: "" }]);
//   const updateAccount = (i, field, val) => {
//     const newAcc = [...accounts];
//     newAcc[i][field] = val;
//     setAccounts(newAcc);
//   };
//   const removeAccount = (i) => setAccounts(accounts.filter((_, idx) => idx !== i));

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center">
//         <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 border border-white/60">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
//           <p className="text-2xl font-semibold text-slate-700 text-center">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!session?.user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-8">
//         <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center border border-white/60 max-w-lg">
//           <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
//             <Users className="w-16 h-16 text-white" />
//           </div>
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">Sign In Required</h2>
//           <p className="text-lg text-slate-600">Please sign in to manage your professional profile.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8">
//         <div className="max-w-5xl mx-auto space-y-12">

//           {/* WELCOME SECTION */}
//           <div className="text-center">
//             <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-sky-900 bg-clip-text text-transparent mb-6">
//               Complete Your Profile
//             </h1>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
//               Add your personal information, resume, experience, and skills to get started with job applications.
//             </p>
//           </div>

//           {/* PERSONAL INFO */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Personal Info
//               </h2>
//             </div>
          
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                   <RequiredLabel>First Name</RequiredLabel>
//                 </label>
//                 <input
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   placeholder="Enter your first name"
//                   className={`w-full p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 ${
//                     errors.firstName 
//                       ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                       : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50'
//                   } text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg`}
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                     ⚠️ {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                   <RequiredLabel>Last Name</RequiredLabel>
//                 </label>
//                 <input
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   placeholder="Enter your last name"
//                   className={`w-full p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 ${
//                     errors.lastName 
//                       ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                       : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50'
//                   } text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg`}
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                     ⚠️ {errors.lastName}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2 md:col-span-1">
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
//                   Phone Number (Optional)
//                 </label>
//                 <div className="relative group">
//                   <div className={`flex rounded-2xl bg-white/60 backdrop-blur-md border-2 shadow-inner hover:shadow-lg transition-all overflow-hidden ${
//                     errors.phoneNumber 
//                       ? 'border-red-400 ring-2 ring-red-100/50' 
//                       : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100/50'
//                   }`}>
//                     <select
//                       value={selectedCountry}
//                       onChange={(e) => setSelectedCountry(e.target.value)}
//                       className="px-3 py-5 bg-transparent border-r border-slate-200 text-base font-medium text-slate-700 focus:outline-none appearance-none cursor-pointer min-w-[100px]"
//                     >
//                       {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                           {country.dial}
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       value={phoneNumber}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, "");
//                         setPhoneNumber(value);
//                       }}
//                       placeholder="3001234567"
//                       maxLength={15}
//                       className="flex-1 p-5 text-base font-medium text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent px-3"
//                     />
//                   </div>
//                 </div>
//                 {errors.phoneNumber && (
//                   <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
//                     ⚠️ {errors.phoneNumber}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* RESUME SECTION */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl">
//                 <Briefcase className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Resume</RequiredLabel>
//               </h2>
//             </div>

//             {resumeMeta ? (
//               <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border border-emerald-200/50 rounded-3xl p-6 mb-10 shadow-inner">
//                 <p className="text-sm text-slate-500 uppercase tracking-widest font-medium mb-2">Last Updated</p>
//                 <p className="text-lg font-semibold text-slate-800">
//                   {resumeMeta.originalName} • {new Date(resumeMeta.uploadedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
//                 </p>
//               </div>
//             ) : (
//               <div className="border-4 border-dashed border-slate-300/60 rounded-3xl p-16 text-center mb-10 bg-slate-50/40 backdrop-blur-sm hover:border-indigo-400/60 transition-all">
//                 <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-6" />
//                 <p className="text-2xl font-bold text-slate-700 mb-2">No resume uploaded yet</p>
//                 <p className="text-slate-500 text-lg">Add your resume to complete your profile</p>
//                 {errors.resume && (
//                   <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
//                     <p className="text-red-600 font-semibold flex items-center gap-2 mb-1">
//                       ⚠️ <RequiredLabel>{errors.resume}</RequiredLabel>
//                     </p>
//                     <p className="text-sm text-red-500">Supports PDF, DOC, DOCX, Images</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {resumeMeta && (
//               <div className="mb-12 flex justify-center">
//                 <div
//                   onClick={() => setShowResumeModal(true)}
//                   className="group relative w-64 h-80 bg-gradient-to-br from-slate-100/80 to-indigo-100/60 rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border border-white/60"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                   {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
//                     <img src={resumePreviewUrl} alt="Resume" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                   ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
//                     <div className="flex flex-col items-center justify-center h-full p-10">
//                       <FileText className="w-24 h-24 text-red-600 mb-6" />
//                       <span className="text-slate-700 font-bold text-lg">PDF Document</span>
//                       <span className="text-slate-500 text-sm mt-2">Click to enlarge</span>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center h-full p-10">
//                       <FileText className="w-24 h-24 text-indigo-600 mb-6" />
//                       <span className="text-slate-700 font-bold text-lg truncate px-4">{resumeMeta.originalName}</span>
//                     </div>
//                   )}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg text-sm font-medium text-slate-700">
//                     {resumeMeta.originalName}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Upload New Resume</label>
//                 <div className="flex gap-4">
//                   <input
//                     type="file"
//                     accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
//                     onChange={handleResumeChange}
//                     className="flex-1 file:cursor-pointer file:border-0 file:rounded-2xl file:px-6 file:py-4 file:font-bold file:text-white file:bg-gradient-to-r file:from-orange-600 file:to-red-600 file:shadow-lg hover:file:from-orange-700 hover:file:to-red-700 transition-all"
//                     disabled={!!resumeFile && !!resumeMeta}
//                   />
//                   <button
//                     onClick={handleUploadResume}
//                     disabled={!resumeFile}
//                     className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Actions</label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={handleDownloadResume}
//                     disabled={!resumeMeta}
//                     className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-slate-200 rounded-2xl font-semibold text-slate-800 hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
//                   >
//                     <Download className="w-5 h-5" />
//                     Download
//                   </button>
//                   <button
//                     onClick={handleDeleteResume}
//                     disabled={!resumeMeta}
//                     className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-red-200 rounded-2xl font-semibold text-red-700 hover:bg-red-50 hover:border-red-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                     Delete
//                   </button>
//                 </div>
//                 <button
//                   onClick={handleAutofillFromResume}
//                   disabled={!resumeMeta}
//                   className="mt-4 w-full py-4 bg-gradient-to-r from-purple-500 to-emerald-600 hover:from-purple-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 text-lg"
//                 >
//                   <Sparkles className="w-5 h-5" />
//                   Auto-fill Profile from Resume
//                 </button>
//               </div>
//             </div>
//           </section>

//           {/* ABOUT ME */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>About Me</RequiredLabel>
//               </h2>
//             </div>
            
//             <div className="space-y-4 relative">
//               <div className="relative group/input">
//                 <textarea
//                   rows={7}
//                   value={about}
//                   onChange={(e) => setAbout(e.target.value)}
//                   placeholder="Start typing your story... ✨ Click AI button for magic suggestions!"
//                   className={`w-full p-8 rounded-3xl bg-white/60 backdrop-blur-md border-2 resize-none text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg pr-28 peer ${
//                     errors.about 
//                       ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
//                       : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50'
//                   }`}
//                   onBlur={() => {
//                     if (about.trim().length > 20) generateAiSuggestions();
//                   }}
//                 />
      
//                 {/* SUGGESTION BUTTON */}
//                 <button
//                   onClick={generateAiSuggestions}
//                   disabled={suggestionLoading || !about.trim()}
//                   className={`
//                     absolute bottom-4 right-4 p-3 rounded-2xl shadow-xl border-2 border-white/60
//                     bg-gradient-to-br from-purple-500 via-pink-500 to-emerald-500 text-white
//                     hover:from-purple-600 hover:via-pink-600 hover:to-emerald-600
//                     hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-110 hover:-translate-y-1
//                     active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50
//                     transition-all duration-300 group hover:animate-pulse
                    
//                     ${suggestionLoading || !about.trim()
//                       ? 'opacity-60 cursor-not-allowed scale-100 shadow-md'
//                       : 'cursor-pointer animate-pulse hover:animate-bounce'
//                     }
//                   `}
//                   title="✨ Transform your text with our suggestions!"
//                 >

//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/40 via-pink-400/40 to-emerald-400/40 blur-xl opacity-70 animate-ping-slow"></div>
                  

//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
//                     skew-x-12 opacity-0 group-hover:opacity-100 transform -translate-x-20 
//                     group-hover:translate-x-20 transition-transform duration-1000"></div>
                  
//                   {suggestionLoading ? (
//                     <div className="relative z-10 w-5 h-5">
//                       <div className="absolute inset-0 w-5 h-5 border-2 border-white/20 rounded-full animate-spin"></div>
//                       <div className="absolute inset-0 w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin delay-500"></div>
//                     </div>
//                   ) : (
//                     <div className="relative z-10 flex items-center justify-center">
//                       <span className="ml-1 text-xs font-bold tracking-wider hidden sm:block">Get Suggestions</span>
//                     </div>
//                   )}
                  
                  
//                 </button>
//               </div>

//               {errors.about && (
//                 <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
//                   ⚠️ {errors.about}
//                 </p>
//               )}

//               {/*  Suggestions Dropdown */}
//               {showSuggestions && aiSuggestions.length > 0 && (
//                 <div className="bg-gradient-to-r from-indigo-50/95 to-purple-50/95 backdrop-blur-xl border border-indigo-200/60 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-2 duration-300">
//                   <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-200">
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full animate-pulse"></div>
//                       <span className="text-sm font-semibold text-indigo-800 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full border">
//                         ✨ Made for YOU
//                       </span>
//                     </div>
//                     <button 
//                       onClick={() => {
//                         setShowSuggestions(false);
//                         setAiSuggestions([]);
//                       }}
//                       className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200 transition-all"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-3 max-h-48 overflow-y-auto">
//                     {aiSuggestions.map((suggestion, index) => (
//                       <div
//                         key={index}
//                         className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:border-indigo-400/80 hover:shadow-md cursor-pointer transition-all hover:bg-indigo-50 hover:-translate-y-1 duration-200 relative overflow-hidden"
//                         onClick={() => {
//                           setAbout(suggestion);
//                           setShowSuggestions(false);
//                           setAiSuggestions([]);
//                         }}
//                       >
//                         <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-emerald-400/20 rounded-bl-xl -translate-x-2 translate-y-2"></div>
//                         <p className="text-sm text-slate-800 leading-relaxed group-hover:text-indigo-900 font-medium pr-4">
//                           {suggestion}
//                         </p>
//                         <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200/50">
//                           <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold shadow-sm">
//                             ✨ Click to use
//                           </span>
//                           <span className="text-xs text-slate-500 font-medium">
//                             {suggestion.trim().split(/\s+/).length} words

//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>


//           {/* SKILLS */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Skills</RequiredLabel>
//               </h2>
//             </div>

//             {errors.skills && (
//               <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl shadow-lg">
//                 <p className="text-red-600 text-sm font-semibold flex items-center gap-2">
//                   ⚠️ <RequiredLabel>{errors.skills}</RequiredLabel>
//                 </p>
//               </div>
//             )}

//             <div className="space-y-4 mb-8">
//               {skills.map((skill, index) => (
//                 <div key={index} className="group bg-gradient-to-r from-emerald-50/80 to-teal-50/60 rounded-2xl p-6 border border-emerald-200/50 shadow-lg hover:shadow-xl hover:border-emerald-400/60 transition-all">
//                   <div className="flex items-center justify-between mb-3">
//                     <div>
//                       <h4 className="font-bold text-lg text-slate-800">{skill.name}</h4>
//                       <p className="text-sm text-slate-500 capitalize">{skill.level}</p>
//                     </div>
//                     <button
//                       onClick={() => removeSkill(index)}
//                       className="p-2 rounded-xl bg-red-100/60 hover:bg-red-200/80 text-red-600 hover:text-red-700 transition-all opacity-0 group-hover:opacity-100"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <div className="flex justify-between text-sm text-slate-600 mb-1">
//                       <span>{skill.percentage}%</span>
//                       <span className="font-semibold capitalize">{skill.level}</span>
//                     </div>
//                     <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
//                       <div 
//                         className={`h-3 rounded-full transition-all duration-700 shadow-lg ${
//                           skill.level === 'expert' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
//                           skill.level === 'advanced' ? 'bg-gradient-to-r from-sky-500 to-blue-600' :
//                           skill.level === 'intermediate' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
//                           'bg-gradient-to-r from-slate-500 to-slate-600'
//                         }`}
//                         style={{ width: `${skill.percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border-2 border-slate-200/50 shadow-lg">
//               <div className="grid lg:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Skill Name</label>
//                   <input
//                     value={newSkillName}
//                     onChange={(e) => setNewSkillName(e.target.value)}
//                     placeholder="React, Node.js, Python..."
//                     className="w-full p-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50 text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Proficiency Level</label>
//                   <select
//                     value={newSkillLevel}
//                     onChange={(e) => setNewSkillLevel(e.target.value)}
//                     className="w-full p-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100/50 text-lg font-medium text-slate-700"
//                   >
//                     <option value="">Select Level</option>
//                     <option value="beginner">Beginner</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                     <option value="expert">Expert</option>
//                   </select>
//                 </div>
//                 <div className="flex items-end gap-4">
//                   <button
//                     onClick={addSkill}
//                     disabled={!newSkillName || !newSkillLevel}
//                     className="flex-1 py-5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
//                   >
//                     <Plus className="w-5 h-5" />
//                     Add Skill
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* EDUCATION */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Building2 className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Education</RequiredLabel> (At least 1)
//               </h2>
//             </div>
//             <div className="space-y-6">
//               {education.map((edu, i) => (
//                 <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-blue-50/50 rounded-3xl p-8 border ${errors[`education-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300'} transition-all`}>
//                   <div className="grid lg:grid-cols-2 gap-6">
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Degree" 
//                         value={edu.degree} 
//                         onChange={(e) => updateEducation(i, "degree", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`education-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`} 
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Institute / University" 
//                         value={edu.institute} 
//                         onChange={(e) => updateEducation(i, "institute", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`education-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`} 
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-6 mt-6">
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="From Year" 
//                         value={edu.yearFrom} 
//                         onChange={(e) => updateEducation(i, "yearFrom", e.target.value)}
//                         className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" 
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="To Year" 
//                         value={edu.yearTo} 
//                         onChange={(e) => updateEducation(i, "yearTo", e.target.value)}
//                         className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" 
//                       />
//                     </div>
//                   </div>
//                   {errors[`education-${i}`] && (
//                     <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
//                       ⚠️ {errors[`education-${i}`]}
//                     </p>
//                   )}
//                   <button onClick={() => removeEducation(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//                     <Trash2 className="w-5 h-5" /> Remove
//                   </button>
//                 </div>
//               ))}
//               <button onClick={addEducation} className="w-full py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
//                 <Plus className="w-7 h-7" /> Add Education
//               </button>
//             </div>
//           </section>

//           {/* EXPERIENCE */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
//                 <Briefcase className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 <RequiredLabel>Experience</RequiredLabel>
//               </h2>
//             </div>

//             <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
//               <label className="flex items-center gap-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={isFresher}
//                   onChange={(e) => handleFresherChange(e.target.checked)}
//                   className="w-6 h-6 text-emerald-600 bg-white border-2 border-emerald-300 rounded-lg focus:ring-emerald-500 focus:ring-2 transition-all duration-200"
//                 />
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-sm"></div>
//                   <span className="text-xl font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
//                     I am a Fresher / Recent Graduate
//                   </span>
//                 </div>
//               </label>
//               {isFresher && (
//                 <p className="ml-9 mt-2 text-emerald-700 text-sm font-medium bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200">
//                   ✅ Perfect! Freshers are welcome. Skip experience section.
//                 </p>
//               )}
//             </div>

//             {!isFresher && (
//               <div className="space-y-6">
//                 {experience.map((exp, i) => (
//                   <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border ${errors.experience ? 'border-red-300 bg-red-50/30 shadow-red-200' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-emerald-300'} transition-all`}>
//                     <div className="space-y-3">
//                       <div className="space-y-1">
//                         <input 
//                           placeholder="Job Title" 
//                           value={exp.title} 
//                           onChange={(e) => updateExperience(i, "title", e.target.value)}
//                           className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors.experience ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'}`} 
//                         />
//                       </div>
//                       <div className="space-y-1">
//                         <input 
//                           placeholder="Company" 
//                           value={exp.company} 
//                           onChange={(e) => updateExperience(i, "company", e.target.value)}
//                           className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors.experience ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'}`} 
//                         />
//                       </div>
//                       <div className="space-y-1">
//                         <input 
//                           placeholder="Duration (e.g. 2021 – Present)" 
//                           value={exp.years} 
//                           onChange={(e) => updateExperience(i, "years", e.target.value)}
//                           className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 font-medium" 
//                         />
//                       </div>
//                     </div>
//                     <button onClick={() => removeExperience(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//                       <Trash2 className="w-5 h-5" /> Remove
//                     </button>
//                   </div>
//                 ))}
//                 <button 
//                   onClick={addExperience} 
//                   className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4"
//                 >
//                   <Plus className="w-7 h-7" /> Add Experience
//                 </button>
//               </div>
//             )}

//             {errors.experience && !isFresher && (
//               <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl shadow-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
//                     <Briefcase className="w-6 h-6 text-red-500" />
//                   </div>
//                   <div>
//                     <h4 className="text-xl font-bold text-red-700 mb-1">{errors.experience}</h4>
//                     <p className="text-red-600 text-sm">OR check "I am a Fresher" above</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </section>

//           {/* SOCIAL ACCOUNTS */}
//           <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
//             <div className="flex items-center gap-5 mb-10">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center"> 
//                 <MapPin className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Social Accounts (Optional)
//               </h2>
//             </div>
//             <div className="space-y-6">
//               {accounts.map((acc, i) => (
//                 <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-purple-50/50 rounded-3xl p-8 border ${errors[`account-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200 ring-2 ring-red-200/50' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300'} transition-all`}>
//                   <div className="space-y-3">
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="Platform (e.g. LinkedIn, GitHub, Twitter)" 
//                         value={acc.platform} 
//                         onChange={(e) => updateAccount(i, "platform", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium placeholder-slate-400 ${errors[`account-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}`} 
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <input 
//                         placeholder="linkedin.com/in/yourusername OR github.com/username" 
//                         value={acc.url} 
//                         onChange={(e) => updateAccount(i, "url", e.target.value)}
//                         className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium placeholder-slate-400 ${errors[`account-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}`} 
//                       />
//                     </div>
//                   </div>
//                   <button onClick={() => removeAccount(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
//                     <Trash2 className="w-5 h-5" /> Remove
//                   </button>
//                 </div>
//               ))}

//               <button onClick={addAccount} className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
//                 <Plus className="w-7 h-7" /> Add Account
//               </button>
//             </div>
//           </section>

//           {/* SAVE BUTTON */}
//           <div className="flex justify-center pt-8">
//             <button
//               onClick={handleSaveProfile}
//               disabled={!isFormValid || saving}
//               className={`group relative px-16 py-7 rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden ${
//                 !isFormValid || saving
//                   ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed opacity-60"
//                   : "bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 hover:from-indigo-700 hover:via-purple-700 hover:to-sky-700 hover:shadow-3xl"
//               }`}
//             >
//               <span className="relative z-10 flex items-center gap-4">
//                 {saving ? "Saving..." : "Save Profile"}
//                 {!saving && !isFormValid ? (
//                   <span className="text-xs bg-red-500 px-2 py-1 rounded-full">!Complete</span>
//                 ) : !saving ? (
//                   <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
//                 ) : (
//                   <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
//                 )}
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RESUME MODAL */}
//       {showResumeModal && resumeMeta && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setShowResumeModal(false)}>
//           <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/60" onClick={(e) => e.stopPropagation()}>
//             <div className="p-12 relative">
//               <button onClick={() => setShowResumeModal(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-slate-100 flex items-center justify-center transition-all">
//                 <X className="w-6 h-6 text-slate-700" />
//               </button>

//               {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
//                 <img src={resumePreviewUrl} alt="Resume" className="max-w-full max-h-[70vh] mx-auto rounded-2xl shadow-2xl" />
//               ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
//                 <div className="text-center py-20">
//                   <FileText className="w-32 h-32 text-red-600 mx-auto mb-8" />
//                   <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
//                   <p className="text-xl text-slate-600 mb-10">PDF preview not available in browser. Download to view.</p>
//                 </div>
//               ) : (
//                 <div className="text-center py-20">
//                   <FileText className="w-32 h-32 text-indigo-600 mx-auto mb-8" />
//                   <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
//                   <p className="text-xl text-slate-600 mb-10">Preview not available. Download to open.</p>
//                 </div>
//               )}

//               <div className="flex justify-center gap-6 mt-10">
//                 <button onClick={handleDownloadResume} className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-4 transition-all">
//                   <Download className="w-6 h-6" />
//                   Download Resume
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* AUTOFILL MODAL */}
//       {showAutofillModal && resumeSuggestions && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
//           <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl">
//             <h3 className="text-2xl font-bold mb-6">
//               We found these details from your resume. Apply?
//             </h3>

//             <div className="space-y-4 max-h-80 overflow-auto">
//               {Object.entries(resumeSuggestions).map(([key, obj]) => (
//                 <label key={key} className="flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     checked={obj.checked}
//                     onChange={(e) =>
//                       setResumeSuggestions((prev) => ({
//                         ...prev,
//                         [key]: { ...prev[key], checked: e.target.checked },
//                       }))
//                     }
//                     className="mt-1"
//                   />
//                   <div>
//                     <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
//                     <p className="text-sm text-slate-600">
//                       {Array.isArray(obj.value)
//                         ? obj.value.join(", ")
//                         : String(obj.value)}
//                     </p>
//                   </div>
//                 </label>
//               ))}
//             </div>

//             <div className="flex justify-end gap-4 mt-8">
//               <button
//                 onClick={() => setShowAutofillModal(false)}
//                 className="px-6 py-3 rounded-xl border font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={applyResumeAutofill}
//                 className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
//               >
//                 Apply Selected
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Briefcase,
  Building2,
  Users,
  MapPin,
  Download,
  Trash2,
  Plus,
  ArrowRight,
  X,
  FileText,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("PK");

  const countries = [
    { code: "PK", name: "Pakistan", dial: "+92" },
    { code: "US", name: "United States", dial: "+1" },
    { code: "UK", name: "United Kingdom", dial: "+44" },
    { code: "SA", name: "Saudi Arabia", dial: "+966" },
    { code: "AE", name: "UAE", dial: "+971" },
    { code: "CA", name: "Canada", dial: "+1" },
    { code: "IN", name: "India", dial: "+91" },
  ];

  const isValidPhone = (number) => /^\d{10,15}$/.test(number);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [about, setAbout] = useState("");

  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("");

  const [accounts, setAccounts] = useState([]);

  const [resumeMeta, setResumeMeta] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const [resumeSuggestions, setResumeSuggestions] = useState(null);
  const [showAutofillModal, setShowAutofillModal] = useState(false);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFresher, setIsFresher] = useState(false);

  const RequiredLabel = ({ children }) => (
    <span className="flex items-center gap-1">
      {children}
      <span className="text-red-500 text-xs font-bold -mt-0.5">*</span>
    </span>
  );

  const getFileType = (mimeType) => {
    if (!mimeType) return "document";
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType === "application/pdf") return "pdf";
    return "document";
  };

  const getLevelPercentage = (level) => {
    const levels = { beginner: 40, intermediate: 65, advanced: 85, expert: 98 };
    return levels[level] || 0;
  };

  const addSkill = () => {
    if (!newSkillName.trim() || !newSkillLevel) return;
    const skill = {
      name: newSkillName.trim(),
      level: newSkillLevel,
      percentage: getLevelPercentage(newSkillLevel),
    };
    setSkills([...skills, skill]);
    setNewSkillName("");
    setNewSkillLevel("");
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleFresherChange = (checked) => {
    setIsFresher(checked);
    if (checked) {
      setExperience([]);
    }
  };

  const isValidUrl = useCallback((urlString) => {
    const value = urlString?.trim();
    if (!value) return true;

    try {
      if (value.startsWith("http://") || value.startsWith("https://")) {
        new URL(value);
        return true;
      }

      const socialPattern =
        /^(linkedin|github|twitter|x|instagram|facebook|dribbble|behance|medium)\.com\/[a-zA-Z0-9\-_\/]+$/i;
      if (socialPattern.test(value)) return true;

      const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9\-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
      return domainPattern.test(value);
    } catch {
      return false;
    }
  }, []);

  const validateProfile = useCallback(() => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!resumeMeta) newErrors.resume = "Resume is required for complete profile";
    if (!about.trim()) newErrors.about = "About section is required";
    if (skills.length === 0) newErrors.skills = "Add at least 1 skill";

    if (phoneNumber && !isValidPhone(phoneNumber)) {
      newErrors.phoneNumber = "Phone must be 10-15 digits";
    }

    if (education.length === 0) {
      newErrors.education = "Add at least one education entry";
    } else {
      education.forEach((edu, i) => {
        if (!edu.degree?.trim() || !edu.institute?.trim()) {
          newErrors[`education-${i}`] = `Education #${i + 1}: Degree & Institute required`;
        }
      });
    }

    if (!isFresher) {
      if (experience.length === 0) {
        newErrors.experience = "Add at least one experience entry OR mark as Fresher";
      } else {
        const hasValidExperience = experience.some(
          (exp) => exp.title?.trim() && exp.company?.trim()
        );
        if (!hasValidExperience) {
          newErrors.experience = "Experience entries must have title and company";
        }
      }
    }

    accounts.forEach((acc, i) => {
      if (acc.platform?.trim() && acc.url?.trim() && !isValidUrl(acc.url)) {
        newErrors[`account-${i}`] = `Account #${i + 1}: Enter valid URL`;
      }
    });

    setErrors(newErrors);
    const valid = Object.keys(newErrors).length === 0;
    setIsFormValid(valid);
    return valid;
  }, [firstName, lastName, about, phoneNumber, skills, education, experience, accounts, isFresher, resumeMeta, isValidUrl]);

  useEffect(() => {
    validateProfile();
  }, [validateProfile]);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes ping-slow {
        0% {
          transform: scale(0.9);
          opacity: 0.8;
        }
        100% {
          transform: scale(1.1);
          opacity: 0;
        }
      }
      .animate-ping-slow {
        animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) {
      router.push("/signin");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`);
        if (!res.ok) return;
        const data = await res.json();

        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setAbout(data.about || "");
        setEducation(data.education || []);
        setExperience(data.experience || []);
        setSkills(data.skills || []);
        setAccounts(data.accounts || []);

        if (data.phone) {
          const phoneMatch = data.phone.match(/^\+(\d{1,4})\s?(.+)$/);
          if (phoneMatch) {
            const [, countryCode, number] = phoneMatch;
            const country = countries.find((c) => c.dial === `+${countryCode}`);
            if (country) {
              setSelectedCountry(country.code);
              setPhoneNumber(number.trim());
            } else {
              setPhoneNumber(data.phone.replace(/\D/g, ""));
            }
          } else {
            setPhoneNumber(data.phone.replace(/\D/g, ""));
          }
        }

        if (data.resume?.originalName) {
          setResumeMeta({
            originalName: data.resume.originalName,
            uploadedAt: data.resume.uploadedAt,
            mimeType: data.resume.mimeType,
          });

          const previewRes = await fetch(
            `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=preview`
          );
          if (previewRes.ok) {
            const blob = await previewRes.blob();
            setResumePreviewUrl(URL.createObjectURL(blob));
          }
        }

        if (
          data.experience?.some(
            (exp) =>
              exp.title?.toLowerCase().includes("fresher") ||
              exp.company?.toLowerCase().includes("entry")
          )
        ) {
          setIsFresher(true);
        }
      } catch (err) {
        console.error("Profile load error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status, session?.user?.email, router]);

  const handleSaveProfile = async () => {
    if (!validateProfile()) {
      alert("Please fix all errors before saving!");
      return;
    }

    try {
      setSaving(true);
      const currentYear = new Date().getFullYear();
      const payload = {
        email: session.user.email,
        firstName,
        lastName,
        phone:
          selectedCountry && phoneNumber
            ? `${countries.find((c) => c.code === selectedCountry).dial} ${phoneNumber}`
            : "",
        about,
        education,
        experience: isFresher
          ? [{ title: "Fresher / Recent Graduate", company: "Entry Level", years: `${currentYear} - Present` }]
          : experience,
        skills,
        accounts,
      };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Profile saved successfully!");
      } else {
        const data = await res.json();
        alert(`Failed to save: ${data.message || "Server error"}`);
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleUploadResume = async () => {
    if (!resumeFile || !session?.user?.email) return;

    const formData = new FormData();
    formData.append("email", session.user.email);
    formData.append("file", resumeFile);

    try {
      const res = await fetch("/api/profile/resume", { method: "POST", body: formData });
      if (!res.ok) throw new Error();

      const now = new Date();
      setResumeMeta({
        originalName: resumeFile.name,
        uploadedAt: now.toISOString(),
        mimeType: resumeFile.type,
      });
      setResumeFile(null);

      const previewRes = await fetch(
        `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=preview`
      );
      if (previewRes.ok) {
        const blob = await previewRes.blob();
        setResumePreviewUrl(URL.createObjectURL(blob));
      }

      alert("Resume uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  const handleDownloadResume = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(
        `/api/profile/resume?email=${encodeURIComponent(session.user.email)}&mode=download`
      );
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resumeMeta?.originalName || "resume";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed");
    }
  };

  const handleDeleteResume = async () => {
    if (!confirm("Permanently delete your resume?")) return;
    try {
      const res = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setResumeMeta(null);
        setResumePreviewUrl(null);
        alert("Resume deleted");
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleAutofillFromResume = async () => {
    try {
      const res = await fetch("/api/profile/resume/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });

      const data = await res.json();

      if (res.ok && data.extracted) {
        setResumeSuggestions(
          Object.fromEntries(
            Object.entries(data.extracted).map(([k, v]) => [k, { value: v, checked: true }])
          )
        );
        setShowAutofillModal(true);
      } else {
        alert("Failed to extract data from resume");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  // FIXED FUNCTION: generateAiSuggestions
  const generateAiSuggestions = async () => {
    if (!about?.trim() || suggestionLoading) return;
    
    try {
      setSuggestionLoading(true);
      const res = await fetch("/api/ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          about: about?.trim() || "",
          skills: skills.map(s => s?.name || "").filter(Boolean).join(', '),
          experience: experience.map(e => e?.title || "").filter(Boolean).join(', '),
          education: education.map(e => e?.degree || "").filter(Boolean).join(', ')
        }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }

      const data = await res.json();

      if (data?.success && Array.isArray(data.suggestions)) {
        const cleanSuggestions = data.suggestions
          .map(suggestion => {
            try {
              // Convert to string and trim
              const suggestionStr = String(suggestion || "").trim();
              if (!suggestionStr) return null;
              
              const userInputLower = about.trim().toLowerCase();
              const suggestionLower = suggestionStr.toLowerCase();
              
              // Only modify if the suggestion starts with the user input
              if (suggestionLower.startsWith(userInputLower) && userInputLower.length > 0) {
                return suggestionStr.substring(userInputLower.length).trim();
              }
              
              return suggestionStr;
            } catch (err) {
              console.error("Error processing suggestion:", err);
              return null;
            }
          })
          .filter(suggestion => suggestion && suggestion.length > 10);
        
        if (cleanSuggestions.length > 0) {
          setAiSuggestions(cleanSuggestions.slice(0, 3));
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
      } else {
        console.warn("No valid suggestions received from API");
        setShowSuggestions(false);
      }
    } catch (err) {
      console.error("AI error:", err);
      alert("Failed to generate suggestions. Please try again.");
    } finally {
      setSuggestionLoading(false);
    }
  };

  const applyResumeAutofill = () => {
    if (!resumeSuggestions) return;

    Object.entries(resumeSuggestions).forEach(([key, obj]) => {
      if (!obj.checked) return;

      switch (key) {
        case "firstName":
          setFirstName(obj.value);
          break;
        case "lastName":
          setLastName(obj.value);
          break;
        case "about":
          setAbout(obj.value);
          break;
        case "skills":
          const skillData = Array.isArray(obj.value)
            ? obj.value.map((skill) => ({
                name: skill,
                level: "intermediate",
                percentage: 65,
              }))
            : [];
          setSkills(skillData);
          break;
        case "education":
          setEducation(Array.isArray(obj.value) ? obj.value : []);
          break;
        case "experience":
          setExperience(Array.isArray(obj.value) ? obj.value : []);
          break;
        default:
          break;
      }
    });

    setShowAutofillModal(false);
    alert("Profile auto-filled from resume!");
  };

  const addEducation = () =>
    setEducation([...education, { degree: "", institute: "", yearFrom: "", yearTo: "" }]);
  const updateEducation = (i, field, val) => {
    const newEdu = [...education];
    newEdu[i][field] = val;
    setEducation(newEdu);
  };
  const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));

  const addExperience = () =>
    setExperience([...experience, { title: "", company: "", years: "" }]);
  const updateExperience = (i, field, val) => {
    const newExp = [...experience];
    newExp[i][field] = val;
    setExperience(newExp);
  };
  const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));

  const addAccount = () => setAccounts([...accounts, { platform: "", url: "" }]);
  const updateAccount = (i, field, val) => {
    const newAcc = [...accounts];
    newAcc[i][field] = val;
    setAccounts(newAcc);
  };
  const removeAccount = (i) => setAccounts(accounts.filter((_, idx) => idx !== i));

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 border border-white/60">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
          <p className="text-2xl font-semibold text-slate-700 text-center">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center border border-white/60 max-w-lg">
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
            <Users className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Sign In Required</h2>
          <p className="text-lg text-slate-600">Please sign in to manage your professional profile.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* WELCOME SECTION */}
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-sky-900 bg-clip-text text-transparent mb-6">
              Complete Your Profile
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Add your personal information, resume, experience, and skills to get started with job applications.
            </p>
          </div>

          {/* PERSONAL INFO */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Personal Info
              </h2>
            </div>
          
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
                  <RequiredLabel>First Name</RequiredLabel>
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className={`w-full p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 ${
                    errors.firstName 
                      ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50'
                  } text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
                    ⚠️ {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
                  <RequiredLabel>Last Name</RequiredLabel>
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className={`w-full p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 ${
                    errors.lastName 
                      ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50'
                  } text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
                    ⚠️ {errors.lastName}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider block">
                  Phone Number (Optional)
                </label>
                <div className="relative group">
                  <div className={`flex rounded-2xl bg-white/60 backdrop-blur-md border-2 shadow-inner hover:shadow-lg transition-all overflow-hidden ${
                    errors.phoneNumber 
                      ? 'border-red-400 ring-2 ring-red-100/50' 
                      : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100/50'
                  }`}>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="px-3 py-5 bg-transparent border-r border-slate-200 text-base font-medium text-slate-700 focus:outline-none appearance-none cursor-pointer min-w-[100px]"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.dial}
                        </option>
                      ))}
                    </select>
                    <input
                      value={phoneNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPhoneNumber(value);
                      }}
                      placeholder="3001234567"
                      maxLength={15}
                      className="flex-1 p-5 text-base font-medium text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent px-3"
                    />
                  </div>
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-200 flex items-center gap-1">
                    ⚠️ {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* RESUME SECTION */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <RequiredLabel>Resume</RequiredLabel>
              </h2>
            </div>

            {resumeMeta ? (
              <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border border-emerald-200/50 rounded-3xl p-6 mb-10 shadow-inner">
                <p className="text-sm text-slate-500 uppercase tracking-widest font-medium mb-2">Last Updated</p>
                <p className="text-lg font-semibold text-slate-800">
                  {resumeMeta.originalName} • {new Date(resumeMeta.uploadedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            ) : (
              <div className="border-4 border-dashed border-slate-300/60 rounded-3xl p-16 text-center mb-10 bg-slate-50/40 backdrop-blur-sm hover:border-indigo-400/60 transition-all">
                <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                <p className="text-2xl font-bold text-slate-700 mb-2">No resume uploaded yet</p>
                <p className="text-slate-500 text-lg">Add your resume to complete your profile</p>
                {errors.resume && (
                  <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <p className="text-red-600 font-semibold flex items-center gap-2 mb-1">
                      ⚠️ <RequiredLabel>{errors.resume}</RequiredLabel>
                    </p>
                    <p className="text-sm text-red-500">Supports PDF, DOC, DOCX, Images</p>
                  </div>
                )}
              </div>
            )}

            {resumeMeta && (
              <div className="mb-12 flex justify-center">
                <div
                  onClick={() => setShowResumeModal(true)}
                  className="group relative w-64 h-80 bg-gradient-to-br from-slate-100/80 to-indigo-100/60 rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border border-white/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
                    <img src={resumePreviewUrl} alt="Resume" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
                    <div className="flex flex-col items-center justify-center h-full p-10">
                      <FileText className="w-24 h-24 text-red-600 mb-6" />
                      <span className="text-slate-700 font-bold text-lg">PDF Document</span>
                      <span className="text-slate-500 text-sm mt-2">Click to enlarge</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-10">
                      <FileText className="w-24 h-24 text-indigo-600 mb-6" />
                      <span className="text-slate-700 font-bold text-lg truncate px-4">{resumeMeta.originalName}</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg text-sm font-medium text-slate-700">
                    {resumeMeta.originalName}
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Upload New Resume</label>
                <div className="flex gap-4">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={handleResumeChange}
                    className="flex-1 file:cursor-pointer file:border-0 file:rounded-2xl file:px-6 file:py-4 file:font-bold file:text-white file:bg-gradient-to-r file:from-orange-600 file:to-red-600 file:shadow-lg hover:file:from-orange-700 hover:file:to-red-700 transition-all"
                    disabled={!!resumeFile && !!resumeMeta}
                  />
                  <button
                    onClick={handleUploadResume}
                    disabled={!resumeFile}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Actions</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleDownloadResume}
                    disabled={!resumeMeta}
                    className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-slate-200 rounded-2xl font-semibold text-slate-800 hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={handleDeleteResume}
                    disabled={!resumeMeta}
                    className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-red-200 rounded-2xl font-semibold text-red-700 hover:bg-red-50 hover:border-red-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </button>
                </div>
                <button
                  onClick={handleAutofillFromResume}
                  disabled={!resumeMeta}
                  className="mt-4 w-full py-4 bg-gradient-to-r from-purple-500 to-emerald-600 hover:from-purple-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Auto-fill Profile from Resume
                </button>
              </div>
            </div>
          </section>

          {/* ABOUT ME */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <RequiredLabel>About Me</RequiredLabel>
              </h2>
            </div>
            
            <div className="space-y-4 relative">
              <div className="relative group/input">
                <textarea
                  rows={7}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Start typing your story... ✨ Click AI button for magic suggestions!"
                  className={`w-full p-8 rounded-3xl bg-white/60 backdrop-blur-md border-2 resize-none text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg pr-28 peer ${
                    errors.about 
                      ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/30' 
                      : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50'
                  }`}
                  onBlur={() => {
                    if (about.trim().length > 20) generateAiSuggestions();
                  }}
                />
      
                <button
                  onClick={generateAiSuggestions}
                  disabled={suggestionLoading || !about.trim()}
                  className={`
                    absolute bottom-4 right-4 p-3 rounded-2xl shadow-xl border-2 border-white/60
                    bg-gradient-to-br from-purple-500 via-pink-500 to-emerald-500 text-white
                    hover:from-purple-600 hover:via-pink-600 hover:to-emerald-600
                    hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-110 hover:-translate-y-1
                    active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50
                    transition-all duration-300 group hover:animate-pulse
                    
                    ${suggestionLoading || !about.trim()
                      ? 'opacity-60 cursor-not-allowed scale-100 shadow-md'
                      : 'cursor-pointer animate-pulse hover:animate-bounce'
                    }
                  `}
                  title="✨ Transform your text with our suggestions!"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/40 via-pink-400/40 to-emerald-400/40 blur-xl opacity-70 animate-ping-slow"></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                    skew-x-12 opacity-0 group-hover:opacity-100 transform -translate-x-20 
                    group-hover:translate-x-20 transition-transform duration-1000"></div>
                  
                  {suggestionLoading ? (
                    <div className="relative z-10 w-5 h-5">
                      <div className="absolute inset-0 w-5 h-5 border-2 border-white/20 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin delay-500"></div>
                    </div>
                  ) : (
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="ml-1 text-xs font-bold tracking-wider hidden sm:block">Get Suggestions</span>
                    </div>
                  )}
                </button>
              </div>

              {errors.about && (
                <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
                  ⚠️ {errors.about}
                </p>
              )}

              {showSuggestions && aiSuggestions.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-50/95 to-purple-50/95 backdrop-blur-xl border border-indigo-200/60 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-indigo-800 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full border">
                        ✨ Made for YOU
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        setShowSuggestions(false);
                        setAiSuggestions([]);
                      }}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:border-indigo-400/80 hover:shadow-md cursor-pointer transition-all hover:bg-indigo-50 hover:-translate-y-1 duration-200 relative overflow-hidden"
                        onClick={() => {
                          setAbout(suggestion);
                          setShowSuggestions(false);
                          setAiSuggestions([]);
                        }}
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-emerald-400/20 rounded-bl-xl -translate-x-2 translate-y-2"></div>
                        <p className="text-sm text-slate-800 leading-relaxed group-hover:text-indigo-900 font-medium pr-4">
                          {suggestion}
                        </p>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200/50">
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold shadow-sm">
                            ✨ Click to use
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {suggestion.trim().split(/\s+/).length} words
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SKILLS */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <RequiredLabel>Skills</RequiredLabel>
              </h2>
            </div>

            {errors.skills && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl shadow-lg">
                <p className="text-red-600 text-sm font-semibold flex items-center gap-2">
                  ⚠️ <RequiredLabel>{errors.skills}</RequiredLabel>
                </p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              {skills.map((skill, index) => (
                <div key={index} className="group bg-gradient-to-r from-emerald-50/80 to-teal-50/60 rounded-2xl p-6 border border-emerald-200/50 shadow-lg hover:shadow-xl hover:border-emerald-400/60 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-slate-800">{skill.name}</h4>
                      <p className="text-sm text-slate-500 capitalize">{skill.level}</p>
                    </div>
                    <button
                      onClick={() => removeSkill(index)}
                      className="p-2 rounded-xl bg-red-100/60 hover:bg-red-200/80 text-red-600 hover:text-red-700 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>{skill.percentage}%</span>
                      <span className="font-semibold capitalize">{skill.level}</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-3 rounded-full transition-all duration-700 shadow-lg ${
                          skill.level === 'expert' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                          skill.level === 'advanced' ? 'bg-gradient-to-r from-sky-500 to-blue-600' :
                          skill.level === 'intermediate' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                          'bg-gradient-to-r from-slate-500 to-slate-600'
                        }`}
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border-2 border-slate-200/50 shadow-lg">
              <div className="grid lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Skill Name</label>
                  <input
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="React, Node.js, Python..."
                    className="w-full p-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50 text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Proficiency Level</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    className="w-full p-5 rounded-2xl bg-white border-2 border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100/50 text-lg font-medium text-slate-700"
                  >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div className="flex items-end gap-4">
                  <button
                    onClick={addSkill}
                    disabled={!newSkillName || !newSkillLevel}
                    className="flex-1 py-5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                  >
                    <Plus className="w-5 h-5" />
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* EDUCATION */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <RequiredLabel>Education</RequiredLabel> (At least 1)
              </h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-blue-50/50 rounded-3xl p-8 border ${errors[`education-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300'} transition-all`}>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <input 
                        placeholder="Degree" 
                        value={edu.degree} 
                        onChange={(e) => updateEducation(i, "degree", e.target.value)}
                        className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`education-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`} 
                      />
                    </div>
                    <div className="space-y-1">
                      <input 
                        placeholder="Institute / University" 
                        value={edu.institute} 
                        onChange={(e) => updateEducation(i, "institute", e.target.value)}
                        className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors[`education-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`} 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div className="space-y-1">
                      <input 
                        placeholder="From Year" 
                        value={edu.yearFrom} 
                        onChange={(e) => updateEducation(i, "yearFrom", e.target.value)}
                        className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" 
                      />
                    </div>
                    <div className="space-y-1">
                      <input 
                        placeholder="To Year" 
                        value={edu.yearTo} 
                        onChange={(e) => updateEducation(i, "yearTo", e.target.value)}
                        className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" 
                      />
                    </div>
                  </div>
                  {errors[`education-${i}`] && (
                    <p className="mt-4 text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200 flex items-center gap-2">
                      ⚠️ {errors[`education-${i}`]}
                    </p>
                  )}
                  <button onClick={() => removeEducation(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
                    <Trash2 className="w-5 h-5" /> Remove
                  </button>
                </div>
              ))}
              <button onClick={addEducation} className="w-full py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
                <Plus className="w-7 h-7" /> Add Education
              </button>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                <RequiredLabel>Experience</RequiredLabel>
              </h2>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isFresher}
                  onChange={(e) => handleFresherChange(e.target.checked)}
                  className="w-6 h-6 text-emerald-600 bg-white border-2 border-emerald-300 rounded-lg focus:ring-emerald-500 focus:ring-2 transition-all duration-200"
                />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-sm"></div>
                  <span className="text-xl font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    I am a Fresher / Recent Graduate
                  </span>
                </div>
              </label>
              {isFresher && (
                <p className="ml-9 mt-2 text-emerald-700 text-sm font-medium bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200">
                  ✅ Perfect! Freshers are welcome. Skip experience section.
                </p>
              )}
            </div>

            {!isFresher && (
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border ${errors.experience ? 'border-red-300 bg-red-50/30 shadow-red-200' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-emerald-300'} transition-all`}>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <input 
                          placeholder="Job Title" 
                          value={exp.title} 
                          onChange={(e) => updateExperience(i, "title", e.target.value)}
                          className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors.experience ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'}`} 
                        />
                      </div>
                      <div className="space-y-1">
                        <input 
                          placeholder="Company" 
                          value={exp.company} 
                          onChange={(e) => updateExperience(i, "company", e.target.value)}
                          className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium ${errors.experience ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'}`} 
                        />
                      </div>
                      <div className="space-y-1">
                        <input 
                          placeholder="Duration (e.g. 2021 – Present)" 
                          value={exp.years} 
                          onChange={(e) => updateExperience(i, "years", e.target.value)}
                          className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 font-medium" 
                        />
                      </div>
                    </div>
                    <button onClick={() => removeExperience(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
                      <Trash2 className="w-5 h-5" /> Remove
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addExperience} 
                  className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4"
                >
                  <Plus className="w-7 h-7" /> Add Experience
                </button>
              </div>
            )}

            {errors.experience && !isFresher && (
              <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-red-700 mb-1">{errors.experience}</h4>
                    <p className="text-red-600 text-sm">OR check "I am a Fresher" above</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SOCIAL ACCOUNTS */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center"> 
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Social Accounts (Optional)
              </h2>
            </div>
            <div className="space-y-6">
              {accounts.map((acc, i) => (
                <div key={i} className={`bg-gradient-to-r from-slate-50/70 to-purple-50/50 rounded-3xl p-8 border ${errors[`account-${i}`] ? 'border-red-300 bg-red-50/30 shadow-red-200 ring-2 ring-red-200/50' : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300'} transition-all`}>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <input 
                        placeholder="Platform (e.g. LinkedIn, GitHub, Twitter)" 
                        value={acc.platform} 
                        onChange={(e) => updateAccount(i, "platform", e.target.value)}
                        className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium placeholder-slate-400 ${errors[`account-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}`} 
                      />
                    </div>
                    <div className="space-y-1">
                      <input 
                        placeholder="linkedin.com/in/yourusername OR github.com/username" 
                        value={acc.url} 
                        onChange={(e) => updateAccount(i, "url", e.target.value)}
                        className={`w-full p-5 rounded-2xl bg-white border-2 text-lg font-medium placeholder-slate-400 ${errors[`account-${i}`] ? 'border-red-400 ring-2 ring-red-100/50 bg-red-50/50' : 'border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'}`} 
                      />
                    </div>
                  </div>
                  <button onClick={() => removeAccount(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
                    <Trash2 className="w-5 h-5" /> Remove
                  </button>
                </div>
              ))}

              <button onClick={addAccount} className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
                <Plus className="w-7 h-7" /> Add Account
              </button>
            </div>
          </section>

          {/* SAVE BUTTON */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSaveProfile}
              disabled={!isFormValid || saving}
              className={`group relative px-16 py-7 rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden ${
                !isFormValid || saving
                  ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed opacity-60"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 hover:from-indigo-700 hover:via-purple-700 hover:to-sky-700 hover:shadow-3xl"
              }`}
            >
              <span className="relative z-10 flex items-center gap-4">
                {saving ? "Saving..." : "Save Profile"}
                {!saving && !isFormValid ? (
                  <span className="text-xs bg-red-500 px-2 py-1 rounded-full">!Complete</span>
                ) : !saving ? (
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
                ) : (
                  <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white"></div>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* RESUME MODAL */}
      {showResumeModal && resumeMeta && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setShowResumeModal(false)}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/60" onClick={(e) => e.stopPropagation()}>
            <div className="p-12 relative">
              <button onClick={() => setShowResumeModal(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-slate-100 flex items-center justify-center transition-all">
                <X className="w-6 h-6 text-slate-700" />
              </button>

              {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
                <img src={resumePreviewUrl} alt="Resume" className="max-w-full max-h-[70vh] mx-auto rounded-2xl shadow-2xl" />
              ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
                <div className="text-center py-20">
                  <FileText className="w-32 h-32 text-red-600 mx-auto mb-8" />
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
                  <p className="text-xl text-slate-600 mb-10">PDF preview not available in browser. Download to view.</p>
                </div>
              ) : (
                <div className="text-center py-20">
                  <FileText className="w-32 h-32 text-indigo-600 mx-auto mb-8" />
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
                  <p className="text-xl text-slate-600 mb-10">Preview not available. Download to open.</p>
                </div>
              )}

              <div className="flex justify-center gap-6 mt-10">
                <button onClick={handleDownloadResume} className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-4 transition-all">
                  <Download className="w-6 h-6" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTOFILL MODAL */}
      {showAutofillModal && resumeSuggestions && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">
              We found these details from your resume. Apply?
            </h3>

            <div className="space-y-4 max-h-80 overflow-auto">
              {Object.entries(resumeSuggestions).map(([key, obj]) => (
                <label key={key} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={obj.checked}
                    onChange={(e) =>
                      setResumeSuggestions((prev) => ({
                        ...prev,
                        [key]: { ...prev[key], checked: e.target.checked },
                      }))
                    }
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm text-slate-600">
                      {Array.isArray(obj.value)
                        ? obj.value.join(", ")
                        : String(obj.value)}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAutofillModal(false)}
                className="px-6 py-3 rounded-xl border font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={applyResumeAutofill}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
              >
                Apply Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}