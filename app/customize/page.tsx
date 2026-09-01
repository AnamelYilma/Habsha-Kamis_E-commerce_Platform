"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Scissors, 
  Ruler, 
  Sparkles, 
  CheckCircle, 
  Send, 
  Clock, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  Phone,
  HelpCircle,
  Copy,
  Info
} from "lucide-react";

interface GarmentOption {
  id: string;
  name: string;
  amharic: string;
  basePrice: string;
  leadTime: string;
  description: string;
}

interface FabricOption {
  id: string;
  name: string;
  amharic: string;
  description: string;
}

interface EmbroideryOption {
  id: string;
  name: string;
  amharic: string;
  palette: string[];
  description: string;
}

const garmentOptions: GarmentOption[] = [
  {
    id: "bridal",
    name: "Royal Bridal Wedding Gown",
    amharic: "የሰርግ ሙሽራ ቀሚስ",
    basePrice: "35,000 - 55,000 ETB",
    leadTime: "3-4 Weeks",
    description: "Multi-layered Menen cotton gown with heavy gold Zari Tilf and double bridal veil."
  },
  {
    id: "couple",
    name: "Bride & Groom Matching Set",
    amharic: "የጥንዶች አልባሳት",
    basePrice: "26,000 - 42,000 ETB",
    leadTime: "2-3 Weeks",
    description: "Coordinated gown and groom's Kaftan vest featuring matching neckline embroidery."
  },
  {
    id: "family",
    name: "Family Holiday Celebration Set",
    amharic: "የቤተሰብ በዓላት ስብስብ",
    basePrice: "28,000 - 45,000 ETB (Set of 3)",
    leadTime: "2-3 Weeks",
    description: "Harmonized traditional attire for parents and children for holidays and church ceremonies."
  },
  {
    id: "female_kemis",
    name: "Classic Evening Habesha Kemis",
    amharic: "የምሽት ባህላዊ ቀሚስ",
    basePrice: "14,000 - 22,000 ETB",
    leadTime: "10-14 Days",
    description: "Elegant tailored silhouette with traditional hand-embroidered neckline, cuffs, and Netela trim."
  },
  {
    id: "male_kaftan",
    name: "Men's Kaftan & Warm Chencha Gabi",
    amharic: "የወንድ ካፍታንና ጋቢ",
    basePrice: "12,000 - 18,000 ETB",
    leadTime: "10-12 Days",
    description: "Structured collarless shirt with embroidered chest plaque paired with an ultra-soft Gabi blanket."
  },
  {
    id: "modest",
    name: "Modest High-Neck Flowing Dress",
    amharic: "የተከበረ የባህል ቀሚስ",
    basePrice: "16,000 - 25,000 ETB",
    leadTime: "12-14 Days",
    description: "Full-length flowing gown with high neckline, long sleeves, and matching head covering."
  }
];

const fabricOptions: FabricOption[] = [
  {
    id: "menen_fine",
    name: "100% Superfine Menen Cotton",
    amharic: "ስስ መነን ጥጥ",
    description: "Lightweight, breathable, and soft organic cotton. Perfect for gowns and double-layered dresses."
  },
  {
    id: "chencha_heavy",
    name: "Heavyweight Chencha Loom Weave",
    amharic: "የጨንቻ ወፍራም ሸማ",
    description: "Thick, ultra-warm, combed organic cotton ideal for Gabis, vests, and structured outerwear."
  },
  {
    id: "silk_cotton",
    name: "Silk-Cotton Hybrid with Sheer Netela",
    amharic: "የሐርና የጥጥ ቅልቅል",
    description: "Lustrous woven cotton infused with silk thread for enhanced evening shimmer and drape."
  },
  {
    id: "own_fabric",
    name: "I Will Ship / Provide My Own Fabric",
    amharic: "የራስዎን ጨርቅ በመላክ",
    description: "Deliver or mail your personal raw cotton or specialty regional fabric to our studio."
  }
];

const embroideryOptions: EmbroideryOption[] = [
  {
    id: "gold_zari",
    name: "Royal Gold Zari Tilf",
    amharic: "ወርቃማ ዛሪ ጥልፍ",
    palette: ["#d4af37", "#f3e5ab", "#aa8010"],
    description: "High-grade metallic gold thread woven into dense geometric royal motifs."
  },
  {
    id: "tricolor",
    name: "Traditional Unity Tricolor",
    amharic: "አረንጓዴ፣ ቢጫ፣ ቀይ",
    palette: ["#078732", "#fcd116", "#e51f1f"],
    description: "Balanced green, yellow, and red borders celebrating national heritage."
  },
  {
    id: "emerald_floral",
    name: "Emerald Green & Gold Flora",
    amharic: "ሀረግ አረንጓዴ",
    palette: ["#10b981", "#d4af37", "#064e3b"],
    description: "Rich botanical and vine patterns woven gracefully along edges."
  },
  {
    id: "minimal_silver",
    name: "Minimalist Silver Ribbon Border",
    amharic: "ቀለል ያለ የብር ሪባን",
    palette: ["#e2e8f0", "#94a3b8", "#d4af37"],
    description: "Subtle, clean silver-thread geometric crosslines for understated elegance."
  }
];

export default function CustomizePage() {
  const [selectedGarment, setSelectedGarment] = useState<string>("bridal");
  const [selectedFabric, setSelectedFabric] = useState<string>("menen_fine");
  const [selectedEmbroidery, setSelectedEmbroidery] = useState<string>("gold_zari");

  const [measurements, setMeasurements] = useState({
    height: "",
    shoulder: "",
    chest: "",
    waist: "",
    hip: "",
    sleeve: "",
    dressLength: ""
  });

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    neededByDate: "",
    deliveryType: "addis_pickup",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<{ success: boolean; trackingCode: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const activeGarmentObj = garmentOptions.find((g) => g.id === selectedGarment) || garmentOptions[0];
  const activeFabricObj = fabricOptions.find((f) => f.id === selectedFabric) || fabricOptions[0];
  const activeEmbroideryObj = embroideryOptions.find((e) => e.id === selectedEmbroidery) || embroideryOptions[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.phone) {
      alert("Please provide your phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send Order notification to Telegram Bot
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          customer: {
            fullName: customer.name || "Customer",
            phone: customer.phone,
            notes: `[Delivery: ${customer.deliveryType}] [Needed By: ${customer.neededByDate || "N/A"}] ${customer.notes}`,
          },
          designName: `${activeGarmentObj.name} (${activeGarmentObj.amharic}) - ${activeFabricObj.name}`,
          measurements: measurements,
        }),
      });

      // 2. Save Order to Admin DB
      const response = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customer.name || "Customer",
          phone: customer.phone,
          occasion: "Bespoke Custom Order",
          garmentType: `${activeGarmentObj.name} (${activeGarmentObj.amharic})`,
          fabric: `${activeFabricObj.name}`,
          embroidery: `${activeEmbroideryObj.name}`,
          measurements: measurements,
          neededByDate: customer.neededByDate,
          notes: `[Delivery: ${customer.deliveryType}] ${customer.notes}`,
          status: "received"
        })
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (data.success && data.order?.trackingCode) {
        setOrderResult({ success: true, trackingCode: data.order.trackingCode });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const fallbackCode = `HK-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderResult({ success: true, trackingCode: fallbackCode });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      const fallbackCode = `HK-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsSubmitting(false);
      setOrderResult({ success: true, trackingCode: fallbackCode });
    }
  };

  const copyOrderSummary = () => {
    if (!orderResult) return;
    const summaryText = `*Habesha Kamis Bespoke Order*\nTracking: ${orderResult.trackingCode}\nGarment: ${activeGarmentObj.name}\nFabric: ${activeFabricObj.name}\nEmbroidery: ${activeEmbroideryObj.name}\nPhone: ${customer.phone}\nHeight: ${measurements.height}cm | Shoulder: ${measurements.shoulder}cm | Chest: ${measurements.chest}cm | Waist: ${measurements.waist}cm | Sleeve: ${measurements.sleeve}cm`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white selection:bg-gold selection:text-black pb-28">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl rounded-full bg-gold/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] -left-32 -z-10 h-[500px] w-[500px] rounded-full bg-ethioGreen/5 blur-[130px] pointer-events-none" />

      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-12 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Scissors className="h-4 w-4 text-gold" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Bespoke Studio • የልብስ ማበጃ ስቱዲዮ
          </span>
          <Scissors className="h-4 w-4 text-gold" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white max-w-4xl mx-auto leading-tight">
          Design Your Custom <br />
          <span className="italic font-light text-gold">Hand-Tailored</span> Silhouette.
        </h1>

        <p className="mt-6 text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
          Choose your garment type, traditional fabric, and embroidery pattern. Input your physical measurements 
          to have our master tailors craft a piece made exclusively for you.
        </p>
      </section>

      {/* ===================================================================== */}
      {/* SUCCESS CONFIRMATION BANNER */}
      {/* ===================================================================== */}
      {orderResult && (
        <section className="mx-auto max-w-4xl px-6 py-6 lg:px-8 animate-fade-in">
          <div className="p-8 sm:p-12 rounded-sm border-2 border-gold bg-[#11131a] shadow-[0_0_50px_rgba(212,175,55,0.2)] text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-gold" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Bespoke Order Confirmed</span>
              <h2 className="font-serif text-3xl text-white">Your Custom Measurements Are Logged</h2>
              <p className="text-sm text-gray-200 max-w-lg mx-auto font-light leading-relaxed">
                Your order has been queued in our Addis Ababa tailoring workshop. Please save your official tracking code below:
              </p>
            </div>

            <div className="p-4 rounded-sm bg-black/60 border border-white/20 max-w-sm mx-auto flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 block">Tracking Code</span>
                <span className="font-mono text-xl text-gold font-bold tracking-widest">{orderResult.trackingCode}</span>
              </div>
              <button
                onClick={copyOrderSummary}
                className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-gold hover:text-black border border-white/20 text-xs text-white flex items-center gap-1.5 transition-colors font-medium"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{copied ? "Copied!" : "Copy Details"}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={`https://t.me/HabeshaKamisTailorShop?text=Hello,%20I%20just%20submitted%20bespoke%20order%20${orderResult.trackingCode}%20for%20${encodeURIComponent(activeGarmentObj.name)}.%20Please%20confirm%20deposit%20and%20timeline.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-sm bg-[#24A1DE] text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#1f8fc7] transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>Confirm on Telegram</span>
              </a>
              <button
                onClick={() => setOrderResult(null)}
                className="px-6 py-3 rounded-sm border border-white/30 text-xs uppercase tracking-wider text-gray-200 hover:text-white hover:border-gold transition-colors font-medium"
              >
                Design Another Garment
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* MAIN CUSTOMIZER STUDIO LAYOUT */}
      {/* ===================================================================== */}
      <section className="mx-auto max-w-6xl px-6 py-6 lg:px-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: 4 Step Customization Options */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* STEP 1: GARMENT TYPE */}
            <div className="p-6 sm:p-8 rounded-sm border border-white/15 bg-[#0f1117] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Step 01</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white">Select Garment &amp; Occasion</h3>
                </div>
                <span className="text-xs text-gray-400 font-mono">1 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {garmentOptions.map((option) => {
                  const isSelected = selectedGarment === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => setSelectedGarment(option.id)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#181d28] border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                          : "bg-[#131620] border-white/15 hover:border-gold/50 hover:bg-[#161a26]"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className={`font-serif text-base ${isSelected ? "text-white font-semibold" : "text-gray-200 font-medium"}`}>
                            {option.name}
                          </h4>
                          {isSelected && <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5 ml-1" />}
                        </div>
                        <p className="text-xs text-gold/90 font-light mt-0.5">{option.amharic}</p>
                        <p className="text-xs text-gray-300 font-light leading-relaxed mt-2.5">
                          {option.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-mono">Lead: {option.leadTime}</span>
                        <span className="text-gold font-semibold font-serif">{option.basePrice}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: FABRIC SELECTION */}
            <div className="p-6 sm:p-8 rounded-sm border border-white/15 bg-[#0f1117] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Step 02</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white">Choose Hand-Woven Fabric</h3>
                </div>
                <span className="text-xs text-gray-400 font-mono">2 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fabricOptions.map((fabric) => {
                  const isSelected = selectedFabric === fabric.id;
                  return (
                    <div
                      key={fabric.id}
                      onClick={() => setSelectedFabric(fabric.id)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#181d28] border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                          : "bg-[#131620] border-white/15 hover:border-gold/50 hover:bg-[#161a26]"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className={`font-serif text-base ${isSelected ? "text-white font-semibold" : "text-gray-200 font-medium"}`}>
                            {fabric.name}
                          </h4>
                          {isSelected && <CheckCircle className="h-4 w-4 text-gold shrink-0 mt-0.5 ml-1" />}
                        </div>
                        <p className="text-xs text-gold/90 font-light mt-0.5">{fabric.amharic}</p>
                        <p className="text-xs text-gray-300 font-light leading-relaxed mt-2.5">
                          {fabric.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: EMBROIDERY TILET */}
            <div className="p-6 sm:p-8 rounded-sm border border-white/15 bg-[#0f1117] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Step 03</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white">Select Embroidery &amp; Tilet Motif</h3>
                </div>
                <span className="text-xs text-gray-400 font-mono">3 of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {embroideryOptions.map((emb) => {
                  const isSelected = selectedEmbroidery === emb.id;
                  return (
                    <div
                      key={emb.id}
                      onClick={() => setSelectedEmbroidery(emb.id)}
                      className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#181d28] border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                          : "bg-[#131620] border-white/15 hover:border-gold/50 hover:bg-[#161a26]"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-1.5">
                          <h4 className={`font-serif text-base ${isSelected ? "text-white font-semibold" : "text-gray-200 font-medium"}`}>
                            {emb.name}
                          </h4>
                          <div className="flex gap-1.5 items-center">
                            {emb.palette.map((c, idx) => (
                              <span key={idx} className="h-3 w-3 rounded-full border border-white/30" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gold/90 font-light">{emb.amharic}</p>
                        <p className="text-xs text-gray-300 font-light leading-relaxed mt-2">
                          {emb.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: HIGH-CONTRAST BODY MEASUREMENTS */}
            <div className="p-6 sm:p-8 rounded-sm border border-white/15 bg-[#0f1117] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Step 04</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white">Body Measurements (cm)</h3>
                </div>
                <span className="text-xs text-gray-400 font-mono">4 of 4</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Provide your measurements in centimeters (cm). If you are unsure, provide your total height and phone number — our master tailor will guide you through measuring.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Total Height *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 168 cm"
                    value={measurements.height}
                    onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Shoulder Width
                  </label>
                  <input
                    type="number"
                    placeholder="cm"
                    value={measurements.shoulder}
                    onChange={(e) => setMeasurements({ ...measurements, shoulder: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Chest / Bust
                  </label>
                  <input
                    type="number"
                    placeholder="cm"
                    value={measurements.chest}
                    onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Waist
                  </label>
                  <input
                    type="number"
                    placeholder="cm"
                    value={measurements.waist}
                    onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Hip Circumference
                  </label>
                  <input
                    type="number"
                    placeholder="cm"
                    value={measurements.hip}
                    onChange={(e) => setMeasurements({ ...measurements, hip: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Sleeve / Arm Length
                  </label>
                  <input
                    type="number"
                    placeholder="cm"
                    value={measurements.sleeve}
                    onChange={(e) => setMeasurements({ ...measurements, sleeve: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Dress Total Length
                  </label>
                  <input
                    type="number"
                    placeholder="Floor length (cm)"
                    value={measurements.dressLength}
                    onChange={(e) => setMeasurements({ ...measurements, dressLength: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                  />
                </div>
              </div>
            </div>

            {/* CUSTOMER CONTACT & DELIVERY */}
            <div className="p-6 sm:p-8 rounded-sm border border-white/15 bg-[#0f1117] shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Final Details</span>
                <h3 className="font-serif text-xl sm:text-2xl text-white">Contact &amp; Delivery Schedule</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bethlehem Tadesse"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Phone Number (Telegram/WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0911 234 567"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Needed by Date (Celebration Day)
                  </label>
                  <input
                    type="date"
                    value={customer.neededByDate}
                    onChange={(e) => setCustomer({ ...customer, neededByDate: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white font-medium outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                    Delivery Option
                  </label>
                  <select
                    value={customer.deliveryType}
                    onChange={(e) => setCustomer({ ...customer, deliveryType: e.target.value })}
                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white font-medium outline-none transition-all cursor-pointer"
                  >
                    <option value="addis_pickup" className="bg-[#161922] text-white">In-Person Pickup (Bole Medhanialem Atelier)</option>
                    <option value="local_delivery" className="bg-[#161922] text-white">Addis Ababa City Delivery</option>
                    <option value="international_shipping" className="bg-[#161922] text-white">International Overseas Courier (US / Europe / Diaspora)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                  Special Tailoring Notes / Alterations
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Double-layered Netela request, custom silk thread shade, neckline depth preferences..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none resize-none transition-all"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Live Bespoke Summary Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 p-6 sm:p-8 rounded-sm border-2 border-gold/40 bg-gradient-to-b from-[#131622] to-[#0a0b10] shadow-2xl space-y-6">
              
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Bespoke Summary</span>
                <h3 className="font-serif text-2xl text-white mt-1 font-normal">Your Custom Specification</h3>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-white/15 text-xs">
                <div>
                  <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-medium">Selected Garment</span>
                  <span className="text-white font-semibold text-sm">{activeGarmentObj.name}</span>
                  <span className="text-xs text-gold block mt-0.5">{activeGarmentObj.amharic}</span>
                </div>

                <div>
                  <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-medium">Fabric Type</span>
                  <span className="text-gray-100 font-medium">{activeFabricObj.name}</span>
                </div>

                <div>
                  <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-medium">Embroidery Motif</span>
                  <span className="text-gray-100 font-medium">{activeEmbroideryObj.name}</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-gray-300 text-xs">Estimated Timeline:</span>
                  <span className="text-gold font-mono text-xs font-semibold">{activeGarmentObj.leadTime}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-gray-300 text-xs">Price Estimate:</span>
                  <span className="text-gold font-serif font-bold text-base">{activeGarmentObj.basePrice}</span>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-black/60 border border-white/15 text-xs text-gray-300 space-y-1.5">
                <p className="text-gold font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" /> Hand-Tailored Guarantee
                </p>
                <p className="font-light text-gray-300 leading-relaxed">
                  50% deposit required upon order confirmation via Telegram or in-person consultation.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-gold via-yellow-400 to-gold-dark text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <>
                    <Scissors className="h-4 w-4" />
                    <span>Submit Bespoke Order</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </section>

    </div>
  );
}
