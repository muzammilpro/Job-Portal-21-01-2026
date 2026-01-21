// "use client";
// import { useEffect, useState } from "react";
// import {
//     Mail,
//     Phone,
//     User,
//     Trash2,
//     MessageCircle,
//     Loader2,
// } from "lucide-react";

// export default function AdminMessagesPage() {
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [deletingId, setDeletingId] = useState(null);

//     const fetchMessages = async () => {
//         try {
//             const res = await fetch("/api/admin/contact");
//             const data = await res.json();
//             setMessages(data);
//         } catch (error) {
//             alert("Failed to load messages");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchMessages();
//     }, []);

//     const deleteMessage = async (id) => {
//         if (!confirm("Are you sure you want to delete this message?")) return;

//         setDeletingId(id);
//         try {
//             await fetch("/api/admin/contact", {
//                 method: "DELETE",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ id }),
//             });

//             setMessages((prev) => prev.filter((msg) => msg._id !== id));
//         } catch (error) {
//             alert("Failed to delete message");
//         } finally {
//             setDeletingId(null);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <Loader2 className="animate-spin" size={40} />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-slate-50 p-8">
//             <h1 className="text-4xl font-extrabold mb-8">
//                 Contact Messages
//             </h1>

//             {messages.length === 0 ? (
//                 <div className="bg-white p-10 rounded-2xl shadow text-center">
//                     <MessageCircle size={40} className="mx-auto mb-4 text-slate-400" />
//                     <p className="text-slate-600">No messages found</p>
//                 </div>
//             ) : (
//                 <div className="grid gap-6">
//                     {messages.map((msg) => (
//                         <div
//                             key={msg._id}
//                             className="bg-white p-6 rounded-2xl shadow border border-slate-200"
//                         >
//                             <div className="flex justify-between items-start gap-6">
//                                 <div className="space-y-2">
//                                     <p className="flex items-center gap-2 font-bold">
//                                         <User size={16} /> {msg.name}
//                                     </p>
//                                     <p className="flex items-center gap-2 text-slate-600">
//                                         <Mail size={16} /> {msg.email}
//                                     </p>
//                                     {msg.phone && (
//                                         <p className="flex items-center gap-2 text-slate-600">
//                                             <Phone size={16} /> {msg.phone}
//                                         </p>
//                                     )}
//                                     <p className="font-semibold mt-3">
//                                         Subject:{" "}
//                                         <span className="text-slate-700">
//                                             {msg.subject}
//                                         </span>
//                                     </p>
//                                     <p className="text-slate-600 whitespace-pre-wrap">
//                                         {msg.message}
//                                     </p>
//                                     <p className="text-sm text-slate-400 mt-2">
//                                         {new Date(msg.createdAt).toLocaleString()}
//                                     </p>
//                                 </div>

//                                 <button
//                                     onClick={() => deleteMessage(msg._id)}
//                                     disabled={deletingId === msg._id}
//                                     className="p-3 rounded-xl bg-red-50 hover:bg-red-100 transition"
//                                 >
//                                     {deletingId === msg._id ? (
//                                         <Loader2 className="animate-spin text-red-600" />
//                                     ) : (
//                                         <Trash2 className="text-red-600" />
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";
import { useEffect, useState, useMemo } from "react";
import {
  Mail,
  Phone,
  User,
  Trash2,
  MessageCircle,
  Loader2,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc,
  Download,
  Archive,
  Reply,
  AlertCircle,
  Shield,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, read, unread
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [expandedMessages, setExpandedMessages] = useState({});
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    today: 0,
  });

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      setMessages(data);
      setFilteredMessages(data);
      
      // Calculate stats
      const today = new Date().toDateString();
      const todayMessages = data.filter(msg => 
        new Date(msg.createdAt).toDateString() === today
      );
      const unreadMessages = data.filter(msg => !msg.read);
      
      setStats({
        total: data.length,
        unread: unreadMessages.length,
        today: todayMessages.length,
      });
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter and sort messages
  useEffect(() => {
    let result = [...messages];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(msg =>
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.subject.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(msg => 
        statusFilter === "read" ? msg.read : !msg.read
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredMessages(result);
  }, [messages, searchQuery, statusFilter, sortBy]);

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message? This action cannot be undone.")) return;

    setDeletingId(id);
    try {
      await fetch("/api/admin/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      
      // Show success toast
      showToast("Message deleted successfully");
    } catch (error) {
      showToast("Failed to delete message", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });

      setMessages(prev => prev.map(msg => 
        msg._id === id ? { ...msg, read: true } : msg
      ));
      
      showToast("Marked as read");
    } catch (error) {
      showToast("Failed to update message", "error");
    }
  };

  const toggleExpand = (id) => {
    setExpandedMessages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const showToast = (message, type = "success") => {
    // In a real app, use a proper toast library
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 ${
      type === "success" 
        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
        : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
    }`;
    toast.innerHTML = `
      ${type === "success" ? '<div class="w-5 h-5 bg-white rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></div>' : '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'}
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  const exportMessages = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Email,Phone,Subject,Message,Date\n"
      + messages.map(msg => 
          `"${msg.name}","${msg.email}","${msg.phone || ''}","${msg.subject}","${msg.message.replace(/"/g, '""')}","${new Date(msg.createdAt).toLocaleString()}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contact_messages.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Messages exported successfully");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto" />
            <MessageCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-indigo-400" />
          </div>
          <p className="mt-6 text-lg font-medium text-slate-700">Loading messages...</p>
          <p className="text-sm text-slate-500 mt-2">Please wait while we fetch your data</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Contact Messages
                  </h1>
                  <p className="text-slate-600 mt-1">Manage and review all incoming contact messages</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportMessages}
                className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Download size={18} />
                Export CSV
              </button>
              <button
                onClick={fetchMessages}
                className="p-2.5 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-sm"
                title="Refresh"
              >
                <RefreshCw size={20} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Messages</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <BarChart3 className="text-white" size={24} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Unread Messages</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.unread}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                  <AlertCircle className="text-white" size={24} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Today's Messages</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.today}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl">
                  <Calendar className="text-white" size={24} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Search size={16} className="inline mr-2" />
                  Search Messages
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, or subject..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-slate-50"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Filter size={16} className="inline mr-2" />
                  Filter by Status
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "all", label: "All Messages" },
                    { value: "unread", label: "Unread" },
                    { value: "read", label: "Read" },
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        statusFilter === filter.value
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <SortAsc size={16} className="inline mr-2" />
                  Sort By
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "newest", label: "Newest First", icon: <SortDesc size={16} /> },
                    { value: "oldest", label: "Oldest First", icon: <SortAsc size={16} /> },
                    { value: "name", label: "Name A-Z", icon: <User size={16} /> },
                  ].map((sort) => (
                    <button
                      key={sort.value}
                      onClick={() => setSortBy(sort.value)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                        sortBy === sort.value
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {sort.icon}
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {(searchQuery || statusFilter !== "all") && (
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-bold">{filteredMessages.length}</span> of{" "}
                  <span className="font-bold">{messages.length}</span> messages
                </div>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Messages List */}
          <AnimatePresence>
            {filteredMessages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-12 rounded-2xl shadow-xl text-center border border-slate-200"
              >
                <MessageCircle size={60} className="mx-auto mb-6 text-slate-300" />
                <h3 className="text-xl font-bold text-slate-700 mb-3">No messages found</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {searchQuery || statusFilter !== "all"
                    ? "No messages match your current filters. Try adjusting your search criteria."
                    : "No contact messages have been received yet. Messages will appear here once users start contacting you."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6"
              >
                {filteredMessages.map((msg, index) => (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                      msg.read
                        ? "border-slate-200"
                        : "border-indigo-300 bg-gradient-to-r from-indigo-50 to-blue-50"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        {/* Message Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl ${
                                msg.read 
                                  ? "bg-slate-100" 
                                  : "bg-gradient-to-r from-indigo-500 to-purple-600"
                              }`}>
                                <User className={msg.read ? "text-slate-600" : "text-white"} size={20} />
                              </div>
                              <div>
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-bold text-slate-900">{msg.name}</h3>
                                  {!msg.read && (
                                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                                      New
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 mt-2 flex-wrap">
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <Mail size={14} />
                                    <span className="text-sm">{msg.email}</span>
                                  </div>
                                  {msg.phone && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                      <Phone size={14} />
                                      <span className="text-sm">{msg.phone}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <Calendar size={14} />
                                    <span className="text-sm">
                                      {new Date(msg.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              {!msg.read && (
                                <button
                                  onClick={() => markAsRead(msg._id)}
                                  className="p-2.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors duration-200"
                                  title="Mark as read"
                                >
                                  <CheckCircle size={18} />
                                </button>
                              )}
                              <button
                                onClick={() => toggleExpand(msg._id)}
                                className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-colors duration-200"
                                title={expandedMessages[msg._id] ? "Collapse" : "Expand"}
                              >
                                {expandedMessages[msg._id] ? (
                                  <ChevronUp size={18} />
                                ) : (
                                  <ChevronDown size={18} />
                                )}
                              </button>
                              <button
                                onClick={() => deleteMessage(msg._id)}
                                disabled={deletingId === msg._id}
                                className="p-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Delete message"
                              >
                                {deletingId === msg._id ? (
                                  <Loader2 className="animate-spin" size={18} />
                                ) : (
                                  <Trash2 size={18} />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Subject */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle size={16} className="text-indigo-500" />
                              <span className="font-medium text-slate-700">Subject:</span>
                            </div>
                            <p className="text-lg font-semibold text-slate-900 pl-6">
                              {msg.subject}
                            </p>
                          </div>

                          {/* Message Preview */}
                          {!expandedMessages[msg._id] && (
                            <div className="pl-6">
                              <p className="text-slate-600 line-clamp-3">
                                {msg.message}
                              </p>
                              <button
                                onClick={() => toggleExpand(msg._id)}
                                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                              >
                                Read more...
                              </button>
                            </div>
                          )}

                          {/* Expanded Message */}
                          <AnimatePresence>
                            {expandedMessages[msg._id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 pt-6 border-t border-slate-200"
                              >
                                <div className="pl-6">
                                  <div className="flex items-center gap-2 mb-3">
                                    <MessageCircle size={16} className="text-indigo-500" />
                                    <span className="font-medium text-slate-700">Message:</span>
                                  </div>
                                  <div className="bg-slate-50 rounded-xl p-5">
                                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                      {msg.message}
                                    </p>
                                  </div>
                                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                      <Clock size={14} />
                                      <span>
                                        Received: {new Date(msg.createdAt).toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Shield size={14} />
                                      <span>Message ID: {msg._id.slice(-8)}</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Stats */}
          {filteredMessages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-8 border-t border-slate-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-slate-600">
                  <p className="text-sm">
                    Showing <span className="font-bold">{filteredMessages.length}</span> of{" "}
                    <span className="font-bold">{messages.length}</span> messages
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Unread</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-slate-600">Read</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}