// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Send,
//   MessageCircle,
//   Clock,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   CheckCircle,
//   User,
//   Sparkles,
//   Zap,
//   Copy,
//   Check,
//   Globe,
//   Building,
//   Briefcase,
//   Heart,
//   AlertCircle,
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [copiedEmail, setCopiedEmail] = useState(false);
//   const [copiedPhone, setCopiedPhone] = useState(false);
//   const [charCount, setCharCount] = useState(0);
//   const [serverError, setServerError] = useState("");
//   const nameInputRef = useRef(null);

//   useEffect(() => {
//     nameInputRef.current?.focus();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) setErrors({ ...errors, [name]: "" });
//     if (serverError) setServerError("");
    
//     if (name === "message") {
//       setCharCount(value.length);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Name validation
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     } else if (formData.name.trim().length < 2) {
//       newErrors.name = "Name must be at least 2 characters";
//     }
    
//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
    
//     // Subject validation
//     if (!formData.subject.trim()) {
//       newErrors.subject = "Subject is required";
//     } else if (formData.subject.trim().length < 5) {
//       newErrors.subject = "Subject must be at least 5 characters";
//     }
    
//     // Message validation (maxlength 1000 as per schema)
//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required";
//     } else if (formData.message.length < 20) {
//       newErrors.message = "Message must be at least 20 characters";
//     } else if (formData.message.length > 1000) {
//       newErrors.message = "Message must be less than 1000 characters";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setServerError("");

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           email: formData.email.trim(),
//           phone: formData.phone.trim(),
//           subject: formData.subject.trim(),
//           message: formData.message.trim(),
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to send message");
//       }

//       // Success
//       setSubmitted(true);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//       setCharCount(0);

//       // Scroll to top to show success message
//       window.scrollTo({ top: 0, behavior: 'smooth' });

//       setTimeout(() => setSubmitted(false), 5000);
//     } catch (err) {
//       setServerError(err.message || "Something went wrong. Please try again.");
//       console.error("Submission error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const copyToClipboard = async (text, type) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       if (type === "email") {
//         setCopiedEmail(true);
//         setTimeout(() => setCopiedEmail(false), 2000);
//       } else {
//         setCopiedPhone(true);
//         setTimeout(() => setCopiedPhone(false), 2000);
//       }
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: <Mail className="text-blue-500" size={20} />,
//       title: "Email Us",
//       value: "hello@company.com",
//       action: () => copyToClipboard("hello@company.com", "email"),
//       copyState: copiedEmail,
//       subtitle: "Typically replies within 2 hours"
//     },
//     {
//       icon: <Phone className="text-green-500" size={20} />,
//       title: "Call Us",
//       value: "+1 (555) 123-4567",
//       action: () => copyToClipboard("+1 (555) 123-4567", "phone"),
//       copyState: copiedPhone,
//       subtitle: "Mon-Fri, 9AM-6PM EST"
//     },
//     {
//       icon: <MapPin className="text-red-500" size={20} />,
//       title: "Visit Us",
//       value: "123 Innovation Street",
//       subtitle: "San Francisco, CA 94107"
//     }
//   ];

//   // Clear all form data
//   const handleReset = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       subject: "",
//       message: "",
//     });
//     setErrors({});
//     setCharCount(0);
//     setServerError("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Success Toast */}
//       {submitted && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 backdrop-blur-sm border border-green-200"
//         >
//           <CheckCircle className="animate-pulse" />
//           <div>
//             <p className="font-bold">Message sent successfully!</p>
//             <p className="text-sm opacity-90">We'll get back to you within 24 hours.</p>
//           </div>
//         </motion.div>
//       )}

//       <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
//         {/* Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full mb-6">
//             <Sparkles size={20} />
//             <span className="font-semibold">Contact Support</span>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
//             Get in Touch
//             <span className="block text-indigo-600">We're Here to Help</span>
//           </h1>
          
//           <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//             Have questions? Reach out to us and we'll respond as soon as possible.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Contact Info */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="lg:col-span-1 space-y-8"
//           >
//             {/* Contact Methods */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200">
//               <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
//                 <MessageCircle className="text-indigo-600" />
//                 Contact Information
//               </h2>
              
//               <div className="space-y-6">
//                 {contactInfo.map((item, index) => (
//                   <motion.div
//                     key={index}
//                     whileHover={{ scale: 1.02 }}
//                     className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-100 transition-all duration-300 cursor-pointer"
//                     onClick={item.action}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className="p-3 bg-white rounded-lg shadow-sm">
//                           {item.icon}
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-slate-800">{item.title}</h3>
//                           <p className="text-lg font-medium text-slate-900 mt-1">{item.value}</p>
//                           <p className="text-sm text-slate-500 mt-1">{item.subtitle}</p>
//                         </div>
//                       </div>
//                       {item.action && (
//                         <button 
//                           className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//                           aria-label={copiedEmail ? "Copied!" : "Copy to clipboard"}
//                         >
//                           {item.copyState ? (
//                             <Check className="text-green-500" size={18} />
//                           ) : (
//                             <Copy className="text-slate-400" size={18} />
//                           )}
//                         </button>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Form Requirements */}
//             <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border border-amber-100">
//               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                 <AlertCircle className="text-amber-600" />
//                 Form Requirements
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <div className="p-1">
//                     <Check className="text-green-500" size={16} />
//                   </div>
//                   <div>
//                     <p className="font-medium text-slate-800">Required Fields</p>
//                     <p className="text-sm text-slate-600">Name, Email, Subject, Message</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="p-1">
//                     <Check className="text-green-500" size={16} />
//                   </div>
//                   <div>
//                     <p className="font-medium text-slate-800">Message Length</p>
//                     <p className="text-sm text-slate-600">Minimum 20 characters, maximum 1000</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="p-1">
//                     <Check className="text-green-500" size={16} />
//                   </div>
//                   <div>
//                     <p className="font-medium text-slate-800">Response Time</p>
//                     <p className="text-sm text-slate-600">We aim to respond within 24 hours</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Media */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200">
//               <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
//               <div className="flex justify-center gap-4">
//                 {[
//                   { icon: <Facebook className="text-blue-600" />, label: "Facebook" },
//                   { icon: <Twitter className="text-sky-500" />, label: "Twitter" },
//                   { icon: <Linkedin className="text-blue-700" />, label: "LinkedIn" },
//                   { icon: <Instagram className="text-pink-600" />, label: "Instagram" }
//                 ].map((social, index) => (
//                   <motion.a
//                     key={index}
//                     whileHover={{ y: -5 }}
//                     href="#"
//                     className="p-4 bg-slate-50 hover:bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-300 group"
//                     aria-label={social.label}
//                   >
//                     <div className="text-2xl group-hover:scale-110 transition-transform">
//                       {social.icon}
//                     </div>
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column - Contact Form */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="lg:col-span-2"
//           >
//             <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200">
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
//                     <Send className="text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-3xl font-bold">Contact Form</h2>
//                     <p className="text-slate-600">Fill out all required fields below</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleReset}
//                   type="button"
//                   className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
//                 >
//                   Clear Form
//                 </button>
//               </div>

//               {serverError && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
//                 >
//                   <AlertCircle className="text-red-500 mt-0.5" size={20} />
//                   <div>
//                     <p className="font-medium text-red-800">Error submitting form</p>
//                     <p className="text-red-600 text-sm">{serverError}</p>
//                   </div>
//                 </motion.div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-8">
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <Input
//                     ref={nameInputRef}
//                     label="Full Name "
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     icon={<User size={18} />}
//                     error={errors.name}
//                     placeholder="John Doe"
//                     required
//                     maxLength={100}
//                   />

//                   <Input
//                     label="Email Address "
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     icon={<Mail size={18} />}
//                     error={errors.email}
//                     placeholder="john@example.com"
//                     required
//                     maxLength={100}
//                   />

//                   <Input
//                     label="Phone Number"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     icon={<Phone size={18} />}
//                     placeholder="+1 (555) 000-0000 (Optional)"
//                     maxLength={20}
//                   />

//                   <Input
//                     label="Subject "
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     icon={<MessageCircle size={18} />}
//                     error={errors.subject}
//                     placeholder="How can we help you?"
//                     required
//                     maxLength={200}
//                   />
//                 </div>

//                 <div>
//                   <div className="flex justify-between items-center mb-3">
//                     <label className="font-semibold text-slate-800 flex items-center gap-2">
//                       <MessageCircle size={18} />
//                       Your Message *
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <span className={`text-sm font-medium ${charCount > 1000 ? 'text-red-500' : charCount > 800 ? 'text-amber-500' : 'text-slate-500'}`}>
//                         {charCount}/1000
//                       </span>
//                       {charCount > 1000 && (
//                         <AlertCircle className="text-red-500" size={16} />
//                       )}
//                     </div>
//                   </div>
//                   <textarea
//                     name="message"
//                     rows={6}
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Please provide detailed information about your inquiry..."
//                     className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 resize-none"
//                     maxLength={1000}
//                     required
//                   />
//                   {errors.message && (
//                     <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
//                       <AlertCircle size={14} />
//                       {errors.message}
//                     </p>
//                   )}
//                   <div className="mt-2 text-xs text-slate-500">
//                     Minimum 20 characters required. Maximum 1000 characters allowed.
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     disabled={isSubmitting}
//                     type="submit"
//                     className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
//                   >
//                     <span className="relative z-10 flex items-center justify-center gap-3">
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Sending Message...
//                         </>
//                       ) : (
//                         <>
//                           <Send size={20} />
//                           Send Message
//                           <Sparkles className="group-hover:animate-pulse" size={18} />
//                         </>
//                       )}
//                     </span>
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </motion.button>

//                   <button
//                     type="button"
//                     onClick={handleReset}
//                     className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-300"
//                   >
//                     Clear All
//                   </button>
//                 </div>

//                 <div className="pt-6 border-t border-slate-200">
//                   <div className="text-sm text-slate-600">
//                     <p className="font-medium mb-2">What happens next?</p>
//                     <ol className="list-decimal pl-5 space-y-1">
//                       <li>We'll send you a confirmation email</li>
//                       <li>Our team will review your message</li>
//                       <li>You'll receive a response within 24 hours</li>
//                     </ol>
//                   </div>
//                   <p className="text-center text-slate-500 text-sm mt-4">
//                     Fields marked with * are required. By submitting, you agree to our{" "}
//                     <a href="#" className="text-indigo-600 hover:underline font-medium">
//                       Privacy Policy
//                     </a>
//                   </p>
//                 </div>
//               </form>
//             </div>

//             {/* Stats */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="mt-8 grid grid-cols-3 gap-4"
//             >
//               {[
//                 { value: "24h", label: "Avg. Response Time", icon: <Zap className="text-yellow-500" /> },
//                 { value: "98%", label: "Success Rate", icon: <CheckCircle className="text-green-500" /> },
//                 { value: "1000", label: "Max Characters", icon: <MessageCircle className="text-blue-500" /> }
//               ].map((stat, index) => (
//                 <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 text-center">
//                   <div className="flex justify-center mb-3">{stat.icon}</div>
//                   <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
//                   <div className="text-sm text-slate-600 mt-2">{stat.label}</div>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>
//       </main>

//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ---------- INPUT COMPONENT ---------- */
// const Input = React.forwardRef(({ label, icon, error, required, ...props }, ref) => {
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <div>
//       <label className="block mb-3 font-semibold text-slate-800">
//         {icon && <span className="inline mr-2">{icon}</span>}
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <div className="relative">
//         <input
//           ref={ref}
//           {...props}
//           className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
//             error
//               ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
//               : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//           } ${isFocused ? 'bg-white' : 'bg-slate-50'}`}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />
//         {icon && (
//           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//             {icon}
//           </span>
//         )}
//       </div>
//       {error && (
//         <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
//           <AlertCircle size={14} />
//           {error}
//         </p>
//       )}
//     </div>
//   );
// });

// Input.displayName = "Input";


"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  User,
  Sparkles,
  Zap,
  Copy,
  Check,
  Globe,
  Building,
  Briefcase,
  Heart,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [serverError, setServerError] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (serverError) setServerError("");
    
    if (name === "message") {
      setCharCount(value.length);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }
    
    // Message validation (maxlength 1000 as per schema)
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      // Success
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setCharCount(0);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="text-blue-500" size={18} />,
      title: "Email Us",
      value: "hello@company.com",
      action: () => copyToClipboard("hello@company.com", "email"),
      copyState: copiedEmail,
      subtitle: "Typically replies within 2 hours"
    },
    {
      icon: <Phone className="text-green-500" size={18} />,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      action: () => copyToClipboard("+1 (555) 123-4567", "phone"),
      copyState: copiedPhone,
      subtitle: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: <MapPin className="text-red-500" size={18} />,
      title: "Visit Us",
      value: "123 Innovation Street",
      subtitle: "San Francisco, CA 94107"
    }
  ];

  // Clear all form data
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setErrors({});
    setCharCount(0);
    setServerError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Success Toast */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50 backdrop-blur-sm border border-green-200"
        >
          <CheckCircle className="animate-pulse" size={18} />
          <div>
            <p className="font-bold text-sm">Message sent successfully!</p>
            <p className="text-xs opacity-90">We'll get back to you within 24 hours.</p>
          </div>
        </motion.div>
      )}

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <Sparkles size={16} />
            <span className="font-medium text-sm">Contact Support</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Get in Touch
            <span className="block text-indigo-600 mt-2">We're Here to Help</span>
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions? Reach out to us and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Contact Methods */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-200">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="text-indigo-600" size={20} />
                Contact Information
              </h2>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 rounded-lg bg-slate-50 hover:bg-white border border-slate-100 transition-all duration-300 cursor-pointer"
                    onClick={item.action}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 text-sm">{item.title}</h3>
                          <p className="text-base font-medium text-slate-900 mt-1">{item.value}</p>
                          <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
                        </div>
                      </div>
                      {item.action && (
                        <button 
                          className="p-1 hover:bg-slate-100 rounded transition-colors"
                          aria-label={copiedEmail ? "Copied!" : "Copy to clipboard"}
                        >
                          {item.copyState ? (
                            <Check className="text-green-500" size={16} />
                          ) : (
                            <Copy className="text-slate-400" size={16} />
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form Requirements */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border border-amber-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="text-amber-600" size={20} />
                Form Requirements
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="p-1">
                    <Check className="text-green-500" size={14} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">Required Fields</p>
                    <p className="text-xs text-slate-600">Name, Email, Subject, Message</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="p-1">
                    <Check className="text-green-500" size={14} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">Message Length</p>
                    <p className="text-xs text-slate-600">Minimum 20 characters, maximum 1000</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="p-1">
                    <Check className="text-green-500" size={14} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">Response Time</p>
                    <p className="text-xs text-slate-600">We aim to respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-200">
              <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
              <div className="flex justify-center gap-3">
                {[
                  { icon: <Facebook className="text-blue-600" size={18} />, label: "Facebook" },
                  { icon: <Twitter className="text-sky-500" size={18} />, label: "Twitter" },
                  { icon: <Linkedin className="text-blue-700" size={18} />, label: "LinkedIn" },
                  { icon: <Instagram className="text-pink-600" size={18} />, label: "Instagram" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3 }}
                    href="#"
                    className="p-3 bg-slate-50 hover:bg-white rounded-lg shadow-sm border border-slate-100 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <div className="text-lg group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                    <Send className="text-white" size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Contact Form</h2>
                    <p className="text-slate-600 text-sm">Fill out all required fields below</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  type="button"
                  className="px-3 py-1 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Clear Form
                </button>
              </div>

              {serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                >
                  <AlertCircle className="text-red-500 mt-0.5" size={16} />
                  <div>
                    <p className="font-medium text-red-800 text-sm">Error submitting form</p>
                    <p className="text-red-600 text-xs">{serverError}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    ref={nameInputRef}
                    label="Full Name "
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={<User size={16} />}
                    error={errors.name}
                    placeholder="John Doe"
                    required
                    maxLength={100}
                  />

                  <Input
                    label="Email Address "
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<Mail size={16} />}
                    error={errors.email}
                    placeholder="john@example.com"
                    required
                    maxLength={100}
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    icon={<Phone size={16} />}
                    placeholder="+1 (555) 000-0000 (Optional)"
                    maxLength={20}
                  />

                  <Input
                    label="Subject "
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    icon={<MessageCircle size={16} />}
                    error={errors.subject}
                    placeholder="How can we help you?"
                    required
                    maxLength={200}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold text-slate-800 flex items-center gap-1 text-sm">
                      <MessageCircle size={16} />
                      Your Message *
                    </label>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-medium ${charCount > 1000 ? 'text-red-500' : charCount > 800 ? 'text-amber-500' : 'text-slate-500'}`}>
                        {charCount}/1000
                      </span>
                      {charCount > 1000 && (
                        <AlertCircle className="text-red-500" size={14} />
                      )}
                    </div>
                  </div>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide detailed information about your inquiry..."
                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 resize-none text-sm"
                    maxLength={1000}
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.message}
                    </p>
                  )}
                  <div className="mt-1 text-xs text-slate-500">
                    Minimum 20 characters required. Maximum 1000 characters allowed.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                          <Sparkles className="group-hover:animate-pulse" size={16} />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-300 text-sm"
                  >
                    Clear All
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-600">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>We'll send you a confirmation email</li>
                      <li>Our team will review your message</li>
                      <li>You'll receive a response within 24 hours</li>
                    </ol>
                  </div>
                  <p className="text-center text-slate-500 text-xs mt-3">
                    Fields marked with * are required. By submitting, you agree to our{" "}
                    <a href="#" className="text-indigo-600 hover:underline font-medium">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            </div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 grid grid-cols-3 gap-3"
            >
              {[
                { value: "24h", label: "Avg. Response Time", icon: <Zap className="text-yellow-500" size={16} /> },
                { value: "98%", label: "Success Rate", icon: <CheckCircle className="text-green-500" size={16} /> },
                { value: "1000", label: "Max Characters", icon: <MessageCircle className="text-blue-500" size={16} /> }
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border border-slate-200 text-center">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

/* ---------- INPUT COMPONENT ---------- */
const Input = React.forwardRef(({ label, icon, error, required, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="block mb-2 font-medium text-slate-800 text-sm">
        {icon && <span className="inline mr-1">{icon}</span>}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={`w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 text-sm ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          } ${isFocused ? 'bg-white' : 'bg-slate-50'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";