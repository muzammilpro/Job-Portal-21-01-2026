// "use client";
// import { useState, useEffect, useRef } from "react";
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
//   const [copiedItem, setCopiedItem] = useState(null);
//   const nameInputRef = useRef(null);

//   // Auto-focus name field on mount
//   useEffect(() => {
//     nameInputRef.current?.focus();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!formData.subject.trim()) newErrors.subject = "Subject is required";
//     if (!formData.message.trim()) newErrors.message = "Message is required";
//     else if (formData.message.length > 1000)
//       newErrors.message = "Message must be 1000 characters or less";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitted(true);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//       setTimeout(() => setSubmitted(false), 6000);
//     }, 2000);
//   };

//   const copyToClipboard = (text, item) => {
//     navigator.clipboard.writeText(text);
//     setCopiedItem(item);
//     setTimeout(() => setCopiedItem(null), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-white text-slate-900">
//       {/* HERO */}
//       <section className="py-24 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-5xl mx-auto px-6"
//         >
//           <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-indigo-50 border border-indigo-200">
//             <Sparkles className="text-indigo-600" />
//             <span className="font-semibold">Contact Us</span>
//             <Zap className="text-indigo-600" />
//           </div>
//           <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
//             Let’s{" "}
//             <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Connect
//             </span>
//           </h1>
//           <p className="text-xl text-slate-600">
//             We’re here to help you with jobs, hiring, or partnerships.
//           </p>
//         </motion.div>
//       </section>

//       {/* SUCCESS TOAST */}
//       {submitted && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0 }}
//           className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-8 py-4 rounded-2xl bg-green-600 text-white shadow-2xl"
//         >
//           <CheckCircle size={28} />
//           <div>
//             <p className="font-bold text-lg">Message Sent Successfully!</p>
//             <p>We’ll get back to you within a few hours.</p>
//           </div>
//         </motion.div>
//       )}

//       {/* CONTENT */}
//       <section className="max-w-7xl mx-auto px-6 pb-24">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* FORM */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-12"
//           >
//             <h2 className="text-3xl font-bold mb-2">Send a Message</h2>
//             <p className="text-slate-600 mb-8">
//               Our team usually replies within a few hours.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//               <div className="grid sm:grid-cols-2 gap-6">
//                 <Input
//                   ref={nameInputRef}
//                   label="Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   icon={<User size={18} />}
//                   error={errors.name}
//                   required
//                 />
//                 <Input
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   icon={<Mail size={18} />}
//                   error={errors.email}
//                   required
//                 />
//               </div>
//               <div className="grid sm:grid-cols-2 gap-6">
//                 <Input
//                   label="Phone (optional)"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   icon={<Phone size={18} />}
//                   error={errors.phone}
//                 />
//                 <Input
//                   label="Subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   icon={<MessageCircle size={18} />}
//                   error={errors.subject}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 font-medium">
//                   Message <span className="text-slate-400">(max 1000 chars)</span>
//                 </label>
//                 <textarea
//                   name="message"
//                   rows={5}
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition ${
//                     errors.message
//                       ? "border-red-400 focus:border-red-500"
//                       : "border-slate-300"
//                   }`}
//                   aria-invalid={!!errors.message}
//                   aria-describedby={errors.message ? "message-error" : undefined}
//                 />
//                 <div className="flex justify-between items-center mt-2">
//                   {errors.message && (
//                     <p id="message-error" className="text-red-600 text-sm">
//                       {errors.message}
//                     </p>
//                   )}
//                   <p
//                     className={`text-sm ml-auto ${
//                       formData.message.length > 1000
//                         ? "text-red-600"
//                         : "text-slate-500"
//                     }`}
//                   >
//                     {formData.message.length}/1000
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     Send Message
//                     <Send size={18} />
//                   </>
//                 )}
//               </button>
//             </form>
//           </motion.div>

//           {/* INFO */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="space-y-6"
//           >
//             <InfoCard
//               icon={<Phone />}
//               title="Phone"
//               text="+1 (555) 123-4567"
//               copyText="+15551234567"
//               copied={copiedItem === "phone"}
//               onCopy={() => copyToClipboard("+15551234567", "phone")}
//             />
//             <InfoCard
//               icon={<Mail />}
//               title="Email"
//               text="hello@jobportal.com"
//               copyText="hello@jobportal.com"
//               copied={copiedItem === "email"}
//               onCopy={() => copyToClipboard("hello@jobportal.com", "email")}
//             />
//             <InfoCard
//               icon={<MapPin />}
//               title="Location"
//               text="San Francisco, CA"
//             />

//             <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6">
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <Clock /> Office Hours
//               </h3>
//               <p className="text-slate-600">Mon–Fri: 9AM – 6PM</p>
//               <p className="text-slate-600">Sat: 10AM – 4PM</p>
//               <p className="text-red-500 font-semibold">Sunday: Closed</p>
//             </div>

//             <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6">
//               <h3 className="text-xl font-bold mb-4">Follow Us</h3>
//               <div className="flex gap-4">
//                 <Social icon={<Facebook />} href="https://facebook.com" />
//                 <Social icon={<Twitter />} href="https://twitter.com" />
//                 <Social icon={<Linkedin />} href="https://linkedin.com" />
//                 <Social icon={<Instagram />} href="https://instagram.com" />
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ---------- COMPONENTS ---------- */
// function Input({ label, icon, error, innerRef, ...props }) {
//   return (
//     <div>
//       <label className="block mb-2 font-medium">
//         {label} {props.required && <span className="text-red-500">*</span>}
//       </label>
//       <div className="relative">
//         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//           {icon}
//         </span>
//         <input
//           ref={innerRef}
//           {...props}
//           aria-invalid={!!error}
//           aria-describedby={error ? `${props.name}-error` : undefined}
//           className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition ${
//             error ? "border-red-400 focus:border-red-500" : "border-slate-300"
//           }`}
//         />
//       </div>
//       {error && (
//         <p id={`${props.name}-error`} className="mt-1 text-red-600 text-sm">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// function InfoCard({ icon, title, text, copyText, copied, onCopy }) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6 flex gap-4 items-start">
//       <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl flex-shrink-0">
//         {icon}
//       </div>
//       <div className="flex-1">
//         <h4 className="font-bold">{title}</h4>
//         <p className="text-slate-600 break-all">{text}</p>
//       </div>
//       {copyText && (
//         <button
//           onClick={onCopy}
//           className="p-2 rounded-lg hover:bg-slate-100 transition"
//           aria-label={`Copy ${title}`}
//         >
//           {copied ? <Check className="text-green-600" size={20} /> : <Copy size={20} className="text-slate-500" />}
//         </button>
//       )}
//     </div>
//   );
// }

// function Social({ icon, href = "#" }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="w-12 h-12 flex items-center justify-center border border-slate-300 rounded-xl hover:bg-slate-100 cursor-pointer transition hover:border-indigo-400"
//     >
//       {icon}
//     </a>
//   );
// }



// "use client";
// import { useState, useEffect, useRef } from "react";
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
//   const nameInputRef = useRef(null);

//   useEffect(() => {
//     nameInputRef.current?.focus();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) setErrors({ ...errors, [name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.subject.trim()) newErrors.subject = "Subject is required";
//     if (!formData.message.trim()) newErrors.message = "Message is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Failed");

//       setSubmitted(true);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });

//       setTimeout(() => setSubmitted(false), 5000);
//     } catch (err) {
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-slate-900">
//       {submitted && (
//         <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-xl shadow-lg flex items-center gap-3 z-50">
//           <CheckCircle />
//           Message sent successfully!
//         </div>
//       )}

//       <section className="max-w-6xl mx-auto px-6 py-20">
//         <h1 className="text-5xl font-extrabold mb-6 text-center">
//           Contact <span className="text-indigo-600">Us</span>
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="max-w-3xl mx-auto bg-white shadow-xl p-10 rounded-3xl space-y-6"
//         >
//           <Input
//             ref={nameInputRef}
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             icon={<User size={18} />}
//             error={errors.name}
//           />

//           <Input
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             icon={<Mail size={18} />}
//             error={errors.email}
//           />

//           <Input
//             label="Phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             icon={<Phone size={18} />}
//           />

//           <Input
//             label="Subject"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             icon={<MessageCircle size={18} />}
//             error={errors.subject}
//           />

//           <textarea
//             name="message"
//             rows={5}
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Your message..."
//             className="w-full p-4 border rounded-xl"
//           />

//           <button
//             disabled={isSubmitting}
//             className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
//           >
//             {isSubmitting ? "Sending..." : "Send Message"}
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

// /* ---------- INPUT COMPONENT ---------- */
// function Input({ label, icon, error, ...props }) {
//   return (
//     <div>
//       <label className="block mb-2 font-medium">{label}</label>
//       <div className="relative">
//         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//           {icon}
//         </span>
//         <input
//           {...props}
//           className="w-full pl-12 pr-4 py-3 border rounded-xl"
//         />
//       </div>
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// }


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
      icon: <Mail className="text-blue-500" size={20} />,
      title: "Email Us",
      value: "hello@company.com",
      action: () => copyToClipboard("hello@company.com", "email"),
      copyState: copiedEmail,
      subtitle: "Typically replies within 2 hours"
    },
    {
      icon: <Phone className="text-green-500" size={20} />,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      action: () => copyToClipboard("+1 (555) 123-4567", "phone"),
      copyState: copiedPhone,
      subtitle: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: <MapPin className="text-red-500" size={20} />,
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
          className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 backdrop-blur-sm border border-green-200"
        >
          <CheckCircle className="animate-pulse" />
          <div>
            <p className="font-bold">Message sent successfully!</p>
            <p className="text-sm opacity-90">We'll get back to you within 24 hours.</p>
          </div>
        </motion.div>
      )}

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full mb-6">
            <Sparkles size={20} />
            <span className="font-semibold">Contact Support</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Get in Touch
            <span className="block text-indigo-600">We're Here to Help</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions? Reach out to us and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Contact Methods */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <MessageCircle className="text-indigo-600" />
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-100 transition-all duration-300 cursor-pointer"
                    onClick={item.action}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{item.title}</h3>
                          <p className="text-lg font-medium text-slate-900 mt-1">{item.value}</p>
                          <p className="text-sm text-slate-500 mt-1">{item.subtitle}</p>
                        </div>
                      </div>
                      {item.action && (
                        <button 
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          aria-label={copiedEmail ? "Copied!" : "Copy to clipboard"}
                        >
                          {item.copyState ? (
                            <Check className="text-green-500" size={18} />
                          ) : (
                            <Copy className="text-slate-400" size={18} />
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form Requirements */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border border-amber-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <AlertCircle className="text-amber-600" />
                Form Requirements
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1">
                    <Check className="text-green-500" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Required Fields</p>
                    <p className="text-sm text-slate-600">Name, Email, Subject, Message</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1">
                    <Check className="text-green-500" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Message Length</p>
                    <p className="text-sm text-slate-600">Minimum 20 characters, maximum 1000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1">
                    <Check className="text-green-500" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Response Time</p>
                    <p className="text-sm text-slate-600">We aim to respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
              <div className="flex justify-center gap-4">
                {[
                  { icon: <Facebook className="text-blue-600" />, label: "Facebook" },
                  { icon: <Twitter className="text-sky-500" />, label: "Twitter" },
                  { icon: <Linkedin className="text-blue-700" />, label: "LinkedIn" },
                  { icon: <Instagram className="text-pink-600" />, label: "Instagram" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5 }}
                    href="#"
                    className="p-4 bg-slate-50 hover:bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform">
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
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                    <Send className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Contact Form</h2>
                    <p className="text-slate-600">Fill out all required fields below</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  type="button"
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Clear Form
                </button>
              </div>

              {serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="text-red-500 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium text-red-800">Error submitting form</p>
                    <p className="text-red-600 text-sm">{serverError}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Input
                    ref={nameInputRef}
                    label="Full Name "
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={<User size={18} />}
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
                    icon={<Mail size={18} />}
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
                    icon={<Phone size={18} />}
                    placeholder="+1 (555) 000-0000 (Optional)"
                    maxLength={20}
                  />

                  <Input
                    label="Subject "
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    icon={<MessageCircle size={18} />}
                    error={errors.subject}
                    placeholder="How can we help you?"
                    required
                    maxLength={200}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-semibold text-slate-800 flex items-center gap-2">
                      <MessageCircle size={18} />
                      Your Message *
                    </label>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${charCount > 1000 ? 'text-red-500' : charCount > 800 ? 'text-amber-500' : 'text-slate-500'}`}>
                        {charCount}/1000
                      </span>
                      {charCount > 1000 && (
                        <AlertCircle className="text-red-500" size={16} />
                      )}
                    </div>
                  </div>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide detailed information about your inquiry..."
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 resize-none"
                    maxLength={1000}
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                  <div className="mt-2 text-xs text-slate-500">
                    Minimum 20 characters required. Maximum 1000 characters allowed.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                          <Sparkles className="group-hover:animate-pulse" size={18} />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all duration-300"
                  >
                    Clear All
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <div className="text-sm text-slate-600">
                    <p className="font-medium mb-2">What happens next?</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>We'll send you a confirmation email</li>
                      <li>Our team will review your message</li>
                      <li>You'll receive a response within 24 hours</li>
                    </ol>
                  </div>
                  <p className="text-center text-slate-500 text-sm mt-4">
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
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { value: "24h", label: "Avg. Response Time", icon: <Zap className="text-yellow-500" /> },
                { value: "98%", label: "Success Rate", icon: <CheckCircle className="text-green-500" /> },
                { value: "1000", label: "Max Characters", icon: <MessageCircle className="text-blue-500" /> }
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 text-center">
                  <div className="flex justify-center mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600 mt-2">{stat.label}</div>
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
      <label className="block mb-3 font-semibold text-slate-800">
        {icon && <span className="inline mr-2">{icon}</span>}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          } ${isFocused ? 'bg-white' : 'bg-slate-50'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";