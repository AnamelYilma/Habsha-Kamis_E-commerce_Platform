"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  Plus, 
  Trash2, 
  Phone, 
  CheckCircle, 
  Clock, 
  RefreshCw, 
  Search, 
  X, 
  Scissors, 
  Globe, 
  ShieldAlert, 
  ExternalLink,
  Users,
  Eye,
  TrendingUp,
  Mail,
  Send,
  MapPin,
  Save,
  Check,
  AlertCircle,
  Upload
} from "lucide-react";

interface DesignItem {
  id: string;
  name: string;
  amharicName: string;
  category: string;
  priceRange: string;
  description: string;
  images: string[];
  specs: {
    material: string;
    weaveTime: string;
    production: string;
  };
  createdAt?: string;
}

interface OrderItem {
  id: string;
  trackingCode: string;
  customerName: string;
  phone: string;
  occasion: string;
  garmentType: string;
  fabric: string;
  embroidery: string;
  measurements: {
    height: string;
    shoulder: string;
    chest: string;
    waist: string;
    hip?: string;
    sleeve: string;
    dressLength?: string;
  };
  neededByDate?: string;
  notes?: string;
  status: string;
  createdAt: string;
}

interface MessageItem {
  id: string;
  type: string;
  customerName: string;
  phone: string;
  subject: string;
  message: string;
  action: string;
  status: string;
  createdAt: string;
}

interface ShopSettings {
  shopName: string;
  amharicShopName: string;
  phone1: string;
  phone2: string;
  telegram: string;
  telegramUsername: string;
  email: string;
  address: string;
  openingHours: string;
  announcement: string;
}

export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState<"overview" | "orders" | "gallery" | "messages" | "settings">("overview");

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [settings, setSettings] = useState<ShopSettings>({
    shopName: "Habesha Kamis Tailor Shop",
    amharicShopName: "ሐበሻ ቀሚስ የባህል አልባሳት",
    phone1: "+251 911 234 567",
    phone2: "+251 908 765 432",
    telegram: "https://t.me/HabeshaKamisTailorShop",
    telegramUsername: "@HabeshaKamisTailorShop",
    email: "contact@habeshakamis.et",
    address: "Bole Medhanialem Mall, 3rd Floor, Suite 304, Addis Ababa, Ethiopia",
    openingHours: "Monday – Saturday: 9:00 AM – 7:00 PM (Sunday by Appointment)",
    announcement: "Now accepting custom wedding bookings for the upcoming holiday season."
  });
  const [activity, setActivity] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalOrders: 0,
    inProduction: 0,
    pendingOrders: 0,
    totalDesigns: 0,
    totalInquiries: 0,
    unreadInquiries: 0,
    estimatedVisitorsToday: 142
  });

  const [isLoading, setIsLoading] = useState(true);
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  const [orderFilter, setOrderFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const [isAddDesignOpen, setIsAddDesignOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [designForm, setDesignForm] = useState({
    name: "",
    amharicName: "",
    category: "wedding",
    priceRange: "20,000 - 35,000 ETB",
    description: "",
    material: "100% Fine Ethiopian Menen Cotton",
    weaveTime: "80 Hours",
    production: "2-3 Weeks",
    imageUrlFallback: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, designsRes, msgsRes, settingsRes, actRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/designs"),
        fetch("/api/admin/messages"),
        fetch("/api/admin/settings"),
        fetch("/api/admin/activity")
      ]);

      const [ordersData, designsData, msgsData, settingsData, actData] = await Promise.all([
        ordersRes.json(),
        designsRes.json(),
        msgsRes.json(),
        settingsRes.json(),
        actRes.json()
      ]);

      if (Array.isArray(ordersData)) setOrders(ordersData);
      if (Array.isArray(designsData)) setDesigns(designsData);
      if (Array.isArray(msgsData)) setMessages(msgsData);
      if (settingsData && !settingsData.error) setSettings(settingsData);
      if (actData && actData.stats) {
        setStats(actData.stats);
        setActivity(actData.recentActivity || []);
      }
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${orderId}`, { method: "DELETE" });
      if (res.ok) {
        setOrders(orders.filter((o) => o.id !== orderId));
        if (selectedOrder?.id === orderId) setSelectedOrder(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDesign = async (designId: string) => {
    if (!confirm("Are you sure you want to remove this design from the gallery catalog?")) return;
    try {
      const res = await fetch(`/api/admin/designs?id=${designId}`, { method: "DELETE" });
      if (res.ok) {
        setDesigns(designs.filter((d) => d.id !== designId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMessageStatus = async (msgId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msgId, status: newStatus })
      });
      if (res.ok) {
        setMessages(messages.map((m) => (m.id === msgId ? { ...m, status: newStatus } : m)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSavedSettingsSuccess(true);
        setTimeout(() => setSavedSettingsSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddDesignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!designForm.name) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("name", designForm.name);
      formData.append("amharicName", designForm.amharicName);
      formData.append("category", designForm.category);
      formData.append("priceRange", designForm.priceRange);
      formData.append("description", designForm.description);
      formData.append("material", designForm.material);
      formData.append("weaveTime", designForm.weaveTime);
      formData.append("production", designForm.production);
      
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }
      if (designForm.imageUrlFallback) {
        formData.append("imageUrl", designForm.imageUrlFallback);
      }

      const res = await fetch("/api/admin/designs", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setIsUploading(false);

      if (data.success) {
        setDesigns([data.design, ...designs]);
        setIsAddDesignOpen(false);
        setDesignForm({
          name: "",
          amharicName: "",
          category: "wedding",
          priceRange: "20,000 - 35,000 ETB",
          description: "",
          material: "100% Fine Ethiopian Menen Cotton",
          weaveTime: "80 Hours",
          production: "2-3 Weeks",
          imageUrlFallback: ""
        });
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = orderFilter === "all" || order.status === orderFilter;
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.trackingCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#07080a] text-white selection:bg-gold selection:text-black">
      
      {/* ===================================================================== */}
      {/* LUXURY ADMIN SIDEBAR */}
      {/* ===================================================================== */}
      <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0a0b0e] flex flex-col justify-between hidden md:flex sticky top-0 h-screen z-30">
        
        <div>
          {/* Atelier Brand Banner */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-sm bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center text-black font-bold font-serif text-base shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                HK
              </div>
              <div>
                <h2 className="font-serif text-sm tracking-[0.15em] text-white font-semibold">
                  HABESHA KAMIS
                </h2>
                <span className="text-[10px] text-gold uppercase tracking-[0.25em] font-light">
                  Admin Studio
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs">
            
            <button
              onClick={() => setActiveNav("overview")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                activeNav === "overview"
                  ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview &amp; Visitors</span>
              </div>
            </button>

            <button
              onClick={() => setActiveNav("orders")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                activeNav === "orders"
                  ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4" />
                <span>Bespoke Orders</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-gray-200 font-mono">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveNav("gallery")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                activeNav === "gallery"
                  ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4" />
                <span>Gallery &amp; Uploads</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-gray-200 font-mono">
                {designs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveNav("messages")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                activeNav === "messages"
                  ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4" />
                <span>Inquiries &amp; Cloth Actions</span>
              </div>
              {stats.unreadInquiries > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[9px] bg-gold text-black font-bold">
                  {stats.unreadInquiries} new
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveNav("settings")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                activeNav === "settings"
                  ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <span>Shop &amp; Contact Info</span>
              </div>
            </button>

          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="p-3 rounded-sm bg-black/40 border border-white/10 text-[10px] text-gray-300">
            <span className="text-gold font-medium flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Local JSON Database
            </span>
            <span className="text-gray-400 block mt-0.5">Images in public/uploads/</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm border border-white/15 hover:border-gold text-xs text-gray-200 hover:text-gold transition-colors font-medium"
          >
            <span>View Public Store</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

      </aside>

      {/* ===================================================================== */}
      {/* MAIN ADMIN WORKSPACE */}
      {/* ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Sticky Bar */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0d0e14]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <span className="font-serif text-sm text-gold font-bold">HK ADMIN</span>
            </div>
            <div className="hidden md:block">
              <h1 className="font-serif text-base text-white capitalize">
                {activeNav === "overview" && "Atelier Overview & Visitor Analytics"}
                {activeNav === "orders" && "Bespoke Measurement Orders"}
                {activeNav === "gallery" && "Gallery Catalog & Image Uploads"}
                {activeNav === "messages" && "Customer Cloth Inquiries & Messages"}
                {activeNav === "settings" && "Shop Information & Contact Channels"}
              </h1>
            </div>
          </div>

          {/* Mobile Tab Selector */}
          <div className="flex md:hidden items-center gap-1 text-[11px] overflow-x-auto no-scrollbar">
            {(["overview", "orders", "gallery", "messages", "settings"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveNav(t)}
                className={`px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                  activeNav === t ? "bg-gold text-black font-semibold" : "text-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              className="p-2 text-gray-300 hover:text-gold transition-colors rounded-sm hover:bg-white/5"
              title="Refresh Workspace"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin text-gold" : ""}`} />
            </button>
            {activeNav === "gallery" && (
              <button
                onClick={() => setIsAddDesignOpen(true)}
                className="px-3.5 py-1.5 rounded-sm bg-gold text-black text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 hover:bg-gold-light transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Design</span>
              </button>
            )}
          </div>
        </header>

        {/* Tab Contents */}
        <main className="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto">
          
          {/* ================================================================= */}
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {/* ================================================================= */}
          {activeNav === "overview" && (
            <div className="space-y-8">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="p-5 rounded-sm bg-[#0f1117] border border-white/15 flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">Total Bespoke Orders</span>
                    <Package className="h-4 w-4 text-gold" />
                  </div>
                  <div className="mt-4">
                    <span className="font-serif text-3xl text-white font-light">{orders.length}</span>
                    <span className="text-xs text-emerald-400 block mt-1 font-medium">
                      {stats.inProduction} in active production
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-sm bg-[#0f1117] border border-white/15 flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">Cloth Inquiries</span>
                    <MessageSquare className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="mt-4">
                    <span className="font-serif text-3xl text-white font-light">{messages.length}</span>
                    <span className="text-xs text-gold block mt-1 font-medium">
                      {stats.unreadInquiries} pending reply
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-sm bg-[#0f1117] border border-white/15 flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">Gallery Catalog</span>
                    <ShoppingBag className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="mt-4">
                    <span className="font-serif text-3xl text-white font-light">{designs.length}</span>
                    <span className="text-xs text-gray-300 block mt-1 font-light">Active dresses online</span>
                  </div>
                </div>

                <div className="p-5 rounded-sm bg-[#0f1117] border border-white/15 flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">Estimated Visitors</span>
                    <Users className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="mt-4">
                    <span className="font-serif text-3xl text-white font-light">{stats.estimatedVisitorsToday}</span>
                    <span className="text-xs text-gray-300 block mt-1 font-light">Today&apos;s site interactions</span>
                  </div>
                </div>

              </div>

              {/* Activity Stream */}
              <div className="p-6 rounded-sm bg-[#0f1117] border border-white/15 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    <h3 className="font-serif text-lg text-white">Recent Customer &amp; Visitor Activity</h3>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">Live Stream</span>
                </div>

                <div className="space-y-3">
                  {activity.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-sm bg-[#161922] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-gold" />
                          <span className="text-white font-medium">{act.title}</span>
                        </div>
                        <p className="text-gray-300 text-xs mt-0.5 ml-4 font-light">{act.detail}</p>
                      </div>
                      <span className="text-xs text-gray-400 font-mono shrink-0 ml-4 sm:ml-0">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: ORDERS PIPELINE */}
          {/* ================================================================= */}
          {activeNav === "orders" && (
            <div className="space-y-6">
              
              {/* High-Contrast Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-sm bg-[#0f1117] border border-white/15 shadow-xl">
                <div className="relative flex-1 max-w-md">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search customer name, phone, tracking code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 pl-10 pr-4 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 outline-none transition-all"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
                  {["all", "received", "in_production", "ready", "delivered"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3.5 py-2 rounded-sm uppercase tracking-wider text-xs font-semibold whitespace-nowrap transition-colors ${
                        orderFilter === st
                          ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                          : "bg-[#161922] text-gray-300 hover:text-white border border-white/10"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="grid grid-cols-1 gap-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-sm bg-[#0f1117] border border-white/15 hover:border-gold/50 transition-all duration-300 space-y-4 shadow-xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base text-gold font-bold">{order.trackingCode}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider font-semibold border ${
                          order.status === "in_production" ? "bg-gold/15 text-gold border-gold/50" :
                          order.status === "ready" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40" :
                          order.status === "delivered" ? "bg-green-600/25 text-green-300 border-green-500/50" :
                          "bg-blue-500/15 text-blue-300 border-blue-500/40"
                        }`}>
                          {order.status.replace("_", " ")}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-semibold">Customer</span>
                        <p className="text-white font-medium text-sm mt-0.5">{order.customerName}</p>
                        <p className="text-gold font-mono text-xs mt-0.5 font-medium">{order.phone}</p>
                      </div>

                      <div>
                        <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-semibold">Garment &amp; Fabric</span>
                        <p className="text-white font-medium">{order.garmentType}</p>
                        <p className="text-gray-300 text-xs font-light">{order.fabric}</p>
                      </div>

                      <div>
                        <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-semibold">Measurements</span>
                        <div className="text-gray-200 text-xs space-y-0.5 mt-0.5 font-mono">
                          <span>H: {order.measurements?.height || "-"}cm</span> • 
                          <span> Sh: {order.measurements?.shoulder || "-"}cm</span> • 
                          <span> Ch: {order.measurements?.chest || "-"}cm</span>
                        </div>
                      </div>

                      <div className="flex sm:justify-end items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3.5 py-2 rounded-sm bg-white/10 hover:bg-gold hover:text-black border border-white/20 text-xs uppercase tracking-wider font-semibold transition-colors text-white"
                        >
                          View Full
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Status Update */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10 text-xs">
                      <span className="text-gray-300 uppercase tracking-wider text-[10px] font-semibold">Update Status:</span>
                      {["received", "accepted", "in_production", "ready", "delivered"].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateOrderStatus(order.id, st)}
                          className={`px-2.5 py-1 rounded-sm uppercase tracking-wider font-medium text-[11px] transition-colors ${
                            order.status === st
                              ? "bg-gold text-black font-bold shadow-md"
                              : "bg-[#161922] text-gray-300 hover:text-white border border-white/15"
                          }`}
                        >
                          {st.replace("_", " ")}
                        </button>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: GALLERY & DESIGNS CATALOG */}
          {/* ================================================================= */}
          {activeNav === "gallery" && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center bg-[#0f1117] p-5 rounded-sm border border-white/15 shadow-xl">
                <div>
                  <h3 className="font-serif text-xl text-white">Gallery Catalog &amp; Image Uploads</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Total {designs.length} designs active in online gallery</p>
                </div>
                <button
                  onClick={() => setIsAddDesignOpen(true)}
                  className="px-5 py-2.5 bg-gold hover:bg-gold-light text-black text-xs uppercase tracking-wider font-bold rounded-sm flex items-center gap-2 transition-colors shadow-lg"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload New Dress</span>
                </button>
              </div>

              {/* Designs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design) => (
                  <div
                    key={design.id}
                    className="rounded-sm bg-[#0f1117] border border-white/15 overflow-hidden flex flex-col justify-between shadow-xl"
                  >
                    <div className="relative aspect-[4/3] bg-zinc-900">
                      <Image
                        src={design.images?.[0] || "/hero_kemis.jpg"}
                        alt={design.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2.5 py-1 rounded-sm bg-black/90 text-xs uppercase tracking-wider font-bold text-gold border border-white/20">
                          {design.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <p className="text-xs text-gold font-medium">{design.amharicName}</p>
                        <h4 className="font-serif text-lg text-white font-normal mt-0.5">{design.name}</h4>
                        <p className="text-sm text-gold font-mono font-semibold mt-1">{design.priceRange}</p>
                      </div>

                      <p className="text-xs text-gray-300 line-clamp-2 font-light leading-relaxed">
                        {design.description}
                      </p>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-mono">{design.specs?.production || "2 Weeks"}</span>
                        <button
                          onClick={() => handleDeleteDesign(design.id)}
                          className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: CUSTOMER INQUIRIES & CLOTH ACTIONS */}
          {/* ================================================================= */}
          {activeNav === "messages" && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-sm bg-[#0f1117] border border-white/15 shadow-xl">
                <h3 className="font-serif text-xl text-white">Customer Inquiries &amp; Cloth Requests</h3>
                <p className="text-xs sm:text-sm text-gray-300">Track visitors asking for prices, custom colors, or contact messages</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-6 rounded-sm bg-[#0f1117] border transition-all duration-300 space-y-4 shadow-xl ${
                      msg.status === "unread" ? "border-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.15)]" : "border-white/15"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-sm bg-[#161922] text-gold text-xs uppercase tracking-wider font-semibold border border-white/20">
                          {msg.action}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider font-bold ${
                          msg.status === "unread" ? "bg-gold text-black font-bold" : "bg-white/10 text-gray-300"
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-semibold">Customer</span>
                        <p className="text-white font-medium text-sm mt-0.5">{msg.customerName}</p>
                        <p className="text-gold font-mono text-xs mt-0.5 font-medium">{msg.phone}</p>
                      </div>

                      <div className="sm:col-span-2">
                        <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-semibold">Subject / Garment</span>
                        <p className="text-white font-serif text-sm">{msg.subject}</p>
                        <p className="text-gray-200 text-xs mt-2 font-light leading-relaxed p-3.5 rounded-sm bg-[#161922] border border-white/15">
                          &ldquo;{msg.message}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-300 uppercase font-semibold">Action Status:</span>
                        <button
                          onClick={() => handleUpdateMessageStatus(msg.id, "read")}
                          className="px-3 py-1.5 rounded-sm bg-[#161922] hover:bg-white/15 text-gray-200 text-xs uppercase font-medium border border-white/10"
                        >
                          Mark Read
                        </button>
                        <button
                          onClick={() => handleUpdateMessageStatus(msg.id, "replied")}
                          className="px-3 py-1.5 rounded-sm bg-gold/15 hover:bg-gold hover:text-black text-gold text-xs uppercase font-semibold transition-colors border border-gold/40"
                        >
                          Mark Replied
                        </button>
                      </div>

                      <a
                        href={`tel:${msg.phone}`}
                        className="px-4 py-2 bg-gold text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-light transition-colors rounded-sm shadow-md"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Call Customer</span>
                      </a>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: SHOP SETTINGS & CONTACT INFO */}
          {/* ================================================================= */}
          {activeNav === "settings" && (
            <div className="max-w-4xl space-y-6">
              
              <div className="p-5 rounded-sm bg-[#0f1117] border border-white/15 shadow-xl">
                <h3 className="font-serif text-xl text-white">Adjust Shop &amp; Contact Information</h3>
                <p className="text-xs sm:text-sm text-gray-300">Changes saved here are stored in data/settings.json and sync across the site</p>
              </div>

              {savedSettingsSuccess && (
                <div className="p-4 rounded-sm bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in font-medium">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Shop settings saved successfully to data/settings.json!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="p-8 rounded-sm bg-[#0f1117] border border-white/15 shadow-2xl space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Shop English Name</label>
                    <input
                      type="text"
                      value={settings.shopName}
                      onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Shop Amharic Name</label>
                    <input
                      type="text"
                      value={settings.amharicShopName}
                      onChange={(e) => setSettings({ ...settings, amharicShopName: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Primary Phone Line</label>
                    <input
                      type="text"
                      value={settings.phone1}
                      onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Secondary Phone Line</label>
                    <input
                      type="text"
                      value={settings.phone2}
                      onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Telegram Channel Link</label>
                    <input
                      type="text"
                      value={settings.telegram}
                      onChange={(e) => setSettings({ ...settings, telegram: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Atelier Physical Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Opening Hours</label>
                  <input
                    type="text"
                    value={settings.openingHours}
                    onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">Announcement Banner</label>
                  <textarea
                    rows={2}
                    value={settings.announcement}
                    onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none resize-none transition-all"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gold hover:bg-gold-light text-black font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors shadow-lg"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Shop Settings</span>
                  </button>
                </div>

              </form>

            </div>
          )}

        </main>

      </div>

      {/* =================================================================== */}
      {/* MODAL: ADD NEW DESIGN TO GALLERY (WITH LOCAL FILE UPLOAD) */}
      {/* =================================================================== */}
      {isAddDesignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-[#0f1117] border-2 border-gold/50 rounded-sm p-6 sm:p-8 shadow-2xl space-y-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-semibold">Gallery Catalog Management</span>
                <h3 className="font-serif text-2xl text-white">Upload New Habesha Kemis Design</h3>
              </div>
              <button onClick={() => setIsAddDesignOpen(false)} className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddDesignSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-1.5">Design English Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Empress Bridal Set"
                    value={designForm.name}
                    onChange={(e) => setDesignForm({ ...designForm, name: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold px-3.5 py-2.5 rounded-sm text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-1.5">Amharic Name</label>
                  <input
                    type="text"
                    placeholder="e.g. ክብረ-ንግሥት የሙሽራ አልባሳት"
                    value={designForm.amharicName}
                    onChange={(e) => setDesignForm({ ...designForm, amharicName: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold px-3.5 py-2.5 rounded-sm text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-1.5">Category</label>
                  <select
                    value={designForm.category}
                    onChange={(e) => setDesignForm({ ...designForm, category: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold px-3.5 py-2.5 rounded-sm text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="wedding" className="bg-[#161922] text-white">Wedding (የሰርግ)</option>
                    <option value="family" className="bg-[#161922] text-white">Family (የቤተሰብ)</option>
                    <option value="couple" className="bg-[#161922] text-white">Couple (የጥንዶች)</option>
                    <option value="female" className="bg-[#161922] text-white">Girls/Female (የሴቶች)</option>
                    <option value="male" className="bg-[#161922] text-white">Male (የወንዶች)</option>
                    <option value="Muslim" className="bg-[#161922] text-white">Muslim Traditional (የሙስሊም)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-1.5">Price Range</label>
                  <input
                    type="text"
                    placeholder="e.g. 25,000 - 45,000 ETB"
                    value={designForm.priceRange}
                    onChange={(e) => setDesignForm({ ...designForm, priceRange: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold px-3.5 py-2.5 rounded-sm text-sm text-white outline-none"
                  />
                </div>
              </div>

              {/* Local File Upload */}
              <div className="p-4 rounded-sm border-2 border-dashed border-gold/50 bg-[#161922] space-y-3">
                <label className="block text-xs uppercase tracking-wider text-gold font-bold">
                  Upload Image File (Saved to public/uploads/)
                </label>
                
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="text-xs text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-gold file:text-black hover:file:bg-gold-light cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="relative h-14 w-14 rounded-sm overflow-hidden border-2 border-gold shadow-md">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-300 mb-1">
                    Or Image URL (Fallback)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={designForm.imageUrlFallback}
                    onChange={(e) => setDesignForm({ ...designForm, imageUrlFallback: e.target.value })}
                    className="w-full bg-[#0e1017] border border-white/20 focus:border-gold px-3.5 py-2 rounded-sm text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-1.5">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details about the embroidery, Netela trim, and fabric..."
                  value={designForm.description}
                  onChange={(e) => setDesignForm({ ...designForm, description: e.target.value })}
                  className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold px-3.5 py-2.5 rounded-sm text-sm text-white outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-300 mb-1">Material</label>
                  <input
                    type="text"
                    value={designForm.material}
                    onChange={(e) => setDesignForm({ ...designForm, material: e.target.value })}
                    className="w-full bg-[#161922] border border-white/20 px-3 py-2 rounded-sm text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-300 mb-1">Weave Hours</label>
                  <input
                    type="text"
                    value={designForm.weaveTime}
                    onChange={(e) => setDesignForm({ ...designForm, weaveTime: e.target.value })}
                    className="w-full bg-[#161922] border border-white/20 px-3 py-2 rounded-sm text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-300 mb-1">Production Lead</label>
                  <input
                    type="text"
                    value={designForm.production}
                    onChange={(e) => setDesignForm({ ...designForm, production: e.target.value })}
                    className="w-full bg-[#161922] border border-white/20 px-3 py-2 rounded-sm text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddDesignOpen(false)}
                  className="px-4 py-2.5 rounded-sm border border-white/25 text-xs text-gray-200 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-sm bg-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-gold-light flex items-center gap-2 shadow-lg"
                >
                  {isUploading ? "Uploading..." : "Save Design to JSON"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: ORDER MEASUREMENTS INSPECTOR */}
      {/* =================================================================== */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0f1117] border-2 border-gold/50 rounded-sm p-6 sm:p-8 shadow-2xl space-y-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xl text-gold font-bold">{selectedOrder.trackingCode}</span>
                <h3 className="font-serif text-2xl text-white mt-0.5 font-normal">{selectedOrder.customerName}</h3>
                <p className="text-sm text-gold font-mono mt-0.5 font-medium">Phone: {selectedOrder.phone}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-semibold">Garment Type</span>
                <p className="text-white font-medium text-sm mt-0.5">{selectedOrder.garmentType}</p>
              </div>
              <div>
                <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-semibold">Fabric &amp; Embroidery</span>
                <p className="text-white font-medium">{selectedOrder.fabric}</p>
                <p className="text-gray-300 text-xs mt-0.5">{selectedOrder.embroidery}</p>
              </div>
            </div>

            {/* Measurements Grid */}
            <div className="p-5 rounded-sm bg-[#161922] border border-white/15 space-y-3">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block">
                Detailed Body Measurements (cm)
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-black/60 rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-400 block">Height</span>
                  <span className="text-white font-bold text-sm">{selectedOrder.measurements?.height || "-"} cm</span>
                </div>
                <div className="p-2.5 bg-black/60 rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-400 block">Shoulder</span>
                  <span className="text-white font-bold text-sm">{selectedOrder.measurements?.shoulder || "-"} cm</span>
                </div>
                <div className="p-2.5 bg-black/60 rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-400 block">Chest</span>
                  <span className="text-white font-bold text-sm">{selectedOrder.measurements?.chest || "-"} cm</span>
                </div>
                <div className="p-2.5 bg-black/60 rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-400 block">Waist</span>
                  <span className="text-white font-bold text-sm">{selectedOrder.measurements?.waist || "-"} cm</span>
                </div>
                <div className="p-2.5 bg-black/60 rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-400 block">Hip</span>
                  <span className="text-white font-bold text-sm">{selectedOrder.measurements?.hip || "-"} cm</span>
                </div>
                <div className="p-2.5 bg-black/60 rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-400 block">Sleeve</span>
                  <span className="text-white font-bold text-sm">{selectedOrder.measurements?.sleeve || "-"} cm</span>
                </div>
                <div className="p-2.5 bg-black/60 rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-400 block">Dress Length</span>
                  <span className="text-white font-bold text-sm">{selectedOrder.measurements?.dressLength || "-"} cm</span>
                </div>
              </div>
            </div>

            {selectedOrder.notes && (
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-300 block mb-1 font-semibold">Customer Notes</span>
                <p className="text-xs text-gray-200 font-light p-3.5 rounded-sm bg-[#161922] border border-white/15 leading-relaxed">
                  {selectedOrder.notes}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300 font-medium">Update Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                  className="bg-[#161922] border-2 border-gold text-xs text-gold px-3.5 py-2 rounded-sm outline-none font-semibold cursor-pointer"
                >
                  <option value="received" className="bg-[#161922] text-white">Received</option>
                  <option value="accepted" className="bg-[#161922] text-white">Accepted</option>
                  <option value="calling_customer" className="bg-[#161922] text-white">Calling Customer</option>
                  <option value="in_production" className="bg-[#161922] text-white">In Production</option>
                  <option value="ready" className="bg-[#161922] text-white">Ready for Delivery</option>
                  <option value="delivered" className="bg-[#161922] text-white">Delivered</option>
                  <option value="rejected" className="bg-[#161922] text-white">Rejected</option>
                </select>
              </div>
              
              <a
                href={`tel:${selectedOrder.phone}`}
                className="px-5 py-2.5 bg-gold text-black font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 hover:bg-gold-light transition-colors shadow-md"
              >
                <Phone className="h-4 w-4" />
                <span>Call Customer</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
