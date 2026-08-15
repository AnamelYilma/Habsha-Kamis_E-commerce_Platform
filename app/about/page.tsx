"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Scissors, 
  Ruler, 
  ArrowRight, 
  MapPin, 
  Heart, 
  Layers, 
  Compass, 
  Globe2,
  CheckCircle2,
  ShieldCheck,
  Crown,
  SunMedium,
  Feather,
  Shirt
} from "lucide-react";

// =========================================================================
// ZONE 1: STATIC DATA & BLUEPRINTS (OUTSIDE THE COMPONENT)
// =========================================================================

interface CraftStage {
  step: string;
  title: string;
  amharic: string;
  description: string;
  detail: string;
}

interface HeritageStyle {
  id: string;
  name: string;
  amharic: string;
  tagline: string;
  palette: string[];
  signature: string;
  description: string;
  purpose: string;
  galleryCat: string;
}

interface Milestone {
  era: string;
  title: string;
  amharic: string;
  story: string;
  tag: string;
}

// 1. The 3 stages of Ethiopian hand-weaving
const craftStages: CraftStage[] = [
  {
    step: "01",
    title: "Raw Cotton to Spun Thread",
    amharic: "ጥጥ መፍተል",
    description: "It starts with pure, unrefined Ethiopian cotton. Carded by hand and spun using a traditional drop spindle (Inzirt) into fine, breathable threads.",
    detail: "100% natural organic cotton, gentle on the skin and naturally thermo-regulating."
  },
  {
    step: "02",
    title: "The Shemane's Wooden Loom",
    amharic: "የሸማኔ ዕደ-ጥበብ",
    description: "Master weavers (Shemane) sit at ancestral pit-looms, rhythmically passing the shuttle back and forth to transform raw thread into soft Shemma cloth.",
    detail: "Woven thread by thread, creating a fabric with unmatched drape, lightness, and texture."
  },
  {
    step: "03",
    title: "Tibeb: Meaning in the Borders",
    amharic: "የጥበብ ትርጉም",
    description: "Along the borders, colored silk and gold threads are woven directly into the fabric to form intricate Tibeb patterns carrying centuries of artistic tradition.",
    detail: "Green represents the fertile land. Red symbolizes strength and resilience. Gold reflects joy and sacred celebration."
  }
];

// 2. 4 Universal Ethiopian Heritage Weaving Styles (Inclusive & Unifying)
const heritageStyles: HeritageStyle[] = [
  {
    id: "bridal",
    name: "Royal Bridal & Zari Tilf",
    amharic: "የሰርግና የክብር ጥበብ",
    tagline: "Heavy Gold & Silk Wedding Weave",
    palette: ["#d4af37", "#f3e5ab", "#aa8010"],
    signature: "Lustrous Gold Thread (Zari) & Multi-Layered Veils",
    description: "Our signature bridal design. Hand-woven from fine Menen cotton, accented with dense golden Tilf borders, and paired with a flowing ceremonial Netela shawl.",
    purpose: "Crafted for unforgettable wedding vows, holy matrimonial blessings, and heirloom ceremonies.",
    galleryCat: "wedding"
  },
  {
    id: "holiday",
    name: "Festive Unity Borders",
    amharic: "የበዓላትና የአንድነት ጥበብ",
    tagline: "Vibrant Ethiopian Tricolor Bands",
    palette: ["#078732", "#fcd116", "#e51f1f"],
    signature: "Balanced Green, Yellow & Red Woven Motifs",
    description: "The timeless national palette that unites all celebrations. Clean, harmonious geometric bands woven into pristine white cotton for matching family sets.",
    purpose: "Worn for New Year (Enkutatash), holy days, and joyous multi-generational family gatherings.",
    galleryCat: "family"
  },
  {
    id: "modest",
    name: "Modest Flow & Kaftan Elegance",
    amharic: "የተከበረ የባህል ጥበብ",
    tagline: "High-Neck Grace & Flowing Lines",
    palette: ["#0a0b0d", "#d4af37", "#10b981"],
    signature: "Modest Sleeves, Cuff Embroidery & Matching Wraps",
    description: "Graceful silhouettes featuring high-cut necklines, long tailored sleeves, and refined gold or emerald tilet along the cuffs, hems, and head coverings.",
    purpose: "Designed for respectful holiday celebrations, formal banquets, and modest everyday luxury.",
    galleryCat: "muslim"
  },
  {
    id: "handloom",
    name: "Ancestral Gabi & Handloom Weaves",
    amharic: "የጥንታዊ ሸማ ጥበብ",
    tagline: "Heavyweight Organic Combed Weave",
    palette: ["#f8fafc", "#94a3b8", "#1e293b"],
    signature: "Soft Multi-Layered Cotton & Geometric Shields",
    description: "Heavyweight, ultra-soft combed cotton blankets (Gabi) and structured men's kaftan shirts hand-woven by master weavers using time-tested loom techniques.",
    purpose: "A symbol of dignity, warmth, and lifelong respect for fathers, elders, and formal gatherings.",
    galleryCat: "male"
  }
];

// 3. The 20+ Years Tailoring Journey Milestones
const journeyMilestones: Milestone[] = [
  {
    era: "The Beginning",
    title: "A Skill Passed Down Quietly",
    amharic: "የጥበብ መጀመሪያ",
    story: "It did not start as a business plan. It started as a cherished family skill, practiced one dress at a time. A tape measure, tailor shears, and hours spent perfecting single stitch lines for neighbors and friends.",
    tag: "Bespoke Origins"
  },
  {
    era: "Wedding Celebrations",
    title: "Dressing Brides for Meaningful Days",
    amharic: "የሙሽሮች ክብር",
    story: "Over the years, our workshop grew to become a trusted atelier for brides and grooms. Hand-fitting each garment to the customer's exact posture, delivered on the morning of their most important day.",
    tag: "Wedding Mastery"
  },
  {
    era: "Family Traditions",
    title: "Dressing Generations in Harmony",
    amharic: "የቤተሰብ ትስስር",
    story: "Crafting matching sets for grandparents, parents, and children celebrating holidays together. Seeing families walk together in synchronized traditional colors remains our greatest joy.",
    tag: "Family Heritage"
  },
  {
    era: "Across Borders",
    title: "Reaching the Worldwide Diaspora",
    amharic: "ዓለም አቀፍ ትስስር",
    story: "Tailored carefully in our Addis Ababa workshop and shipped overseas to weddings in North America, Europe, and the Middle East — connecting Ethiopians everywhere with their cultural roots.",
    tag: "Global Reach"
  }
];

// Helper icon resolver for styles
function getStyleIcon(id: string) {
  switch (id) {
    case "bridal":
      return <Crown className="h-5 w-5 text-gold" />;
    case "holiday":
      return <SunMedium className="h-5 w-5 text-gold" />;
    case "modest":
      return <Feather className="h-5 w-5 text-gold" />;
    case "handloom":
      return <Shirt className="h-5 w-5 text-gold" />;
    default:
      return <Sparkles className="h-5 w-5 text-gold" />;
  }
}

// =========================================================================
// ZONE 2: REACT COMPONENT
// =========================================================================
export default function OurStoryPage() {
  const [activeStyle, setActiveStyle] = useState<string>("bridal");

  const selectedHeritage = heritageStyles.find((item) => item.id === activeStyle) || heritageStyles[0];

  return (
    <div className="relative min-h-screen bg-[#0a0b0d] text-white selection:bg-gold selection:text-black overflow-hidden pb-28">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl rounded-full bg-gold/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] -left-32 -z-10 h-[500px] w-[500px] rounded-full bg-ethioGreen/5 blur-[130px] pointer-events-none" />
      <div className="absolute top-[65%] -right-32 -z-10 h-[500px] w-[500px] rounded-full bg-ethioRed/4 blur-[130px] pointer-events-none" />

      {/* ===================================================================== */}
      {/* SECTION 1: HERO HEADER */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-16 lg:px-8 text-center">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="h-[1px] w-8 bg-gold/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Our Heritage • ታሪካችን • Est. 2004
          </span>
          <span className="h-[1px] w-8 bg-gold/60" />
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-normal leading-[1.1] tracking-wide text-white max-w-4xl mx-auto">
          A Habesha Kemis is <br className="hidden sm:inline" />
          <span className="italic font-light text-gold">Never Just</span> a Dress.
        </h1>

        {/* Hero Narrative Intro */}
        <p className="mt-8 text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
          It starts with pure raw cotton, spun by hand into thread, then woven on traditional looms into breathable Shemma cloth. 
          For more than twenty years, our workshop has dedicated itself to this living craft — tailoring each piece 
          to fit your silhouette with respect and care.
        </p>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-14 mt-12 border-t border-white/10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-5 rounded-sm bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors">
            <span className="font-serif text-3xl sm:text-4xl text-gold font-light">20+</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-300 mt-1">Years of Tailoring</span>
            <span className="text-[10px] text-gray-500 font-light mt-0.5">የ20 ዓመታት የሙያ ልምድ</span>
          </div>
          <div className="flex flex-col items-center p-5 rounded-sm bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors">
            <span className="font-serif text-3xl sm:text-4xl text-gold font-light">100%</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-300 mt-1">Hand-Woven Shemma</span>
            <span className="text-[10px] text-gray-500 font-light mt-0.5">በእጅ የተሸመነ ጥበብ</span>
          </div>
          <div className="flex flex-col items-center p-5 rounded-sm bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors">
            <span className="font-serif text-3xl sm:text-4xl text-gold font-light">0</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-300 mt-1">Mass Production</span>
            <span className="text-[10px] text-gray-500 font-light mt-0.5">ልክዎትን ጠብቆ የተሰፋ</span>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: THE ANATOMY OF THE CRAFT */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">The Craft • ዕደ-ጥበብ</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mt-1">How Shemma is Born</h2>
          </div>
          <p className="text-xs md:text-sm text-gray-400 max-w-md font-light">
            Every thread has purpose. From organic cotton fields to the master weaver&apos;s loom, our garments honor timeless Ethiopian craftsmanship.
          </p>
        </div>

        {/* 3 Step Craft Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {craftStages.map((stage) => (
            <div 
              key={stage.step}
              className="relative p-8 rounded-sm bg-[#0e1015]/80 border border-white/5 transition-all duration-300 hover:border-gold/30 hover:bg-[#12141a] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm text-gold tracking-widest">{stage.step}</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{stage.amharic}</span>
                </div>
                <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">
                  {stage.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mt-4 font-light">
                  {stage.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5">
                <p className="text-[11px] text-gold/90 font-light italic">
                  &ldquo;{stage.detail}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: LIVING HERITAGE SPOTLIGHT — SHIRO MEDA & GLOBAL SKIES */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="relative overflow-hidden rounded-sm border border-gold/20 bg-gradient-to-br from-[#12141a] via-[#0d0e12] to-[#0a0b0d] p-8 sm:p-12">
          
          {/* Subtle Ethiopian Tri-color accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ethioGreen via-ethioYellow to-ethioRed opacity-70" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                  Weaving Heritage • የሸማ ጥበብ ማዕከል
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight">
                From Historic Looms in Shiro Meda to the Skies Worldwide
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                For generations, the weavers of Shiro Meda in Addis Ababa have kept this delicate craft alive, turning fine thread 
                into works of art. Today, this rich tradition is worn across every community in Ethiopia during weddings, holidays, 
                and church gatherings, and is proudly showcased to the world as the celebrated uniform of Ethiopian Airlines.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Living Craftsmanship</span>
                <p className="font-serif text-lg text-white">Addis Ababa, Ethiopia</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Color Symbolism</span>
                <p className="text-xs text-gray-300 font-light">
                  <span className="text-ethioGreen font-semibold">Green</span> for fertile land • 
                  <span className="text-ethioRed font-semibold ml-1">Red</span> for strength • 
                  <span className="text-gold font-semibold ml-1">Gold</span> for celebration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: UNIFYING HERITAGE MOTIFS & STYLES (MODERN 4-CARD SELECTOR) */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Bespoke Varieties • የጥበብ አይነቶች</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white mt-2">Traditions Woven for Every Occasion</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-3 font-light">
            Select a bespoke weaving style below to discover its heritage characteristics:
          </p>
        </div>

        {/* 4 Interactive Selector Cards (No horizontal scroll, fully responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {heritageStyles.map((item) => {
            const isActive = activeStyle === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveStyle(item.id)}
                className={`relative p-5 rounded-sm text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? "bg-[#14161f] border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.15)] transform -translate-y-1"
                    : "bg-[#0c0d12]/80 border border-white/10 hover:border-gold/40 hover:bg-[#11131a]"
                }`}
              >
                {/* Active Gold Indicator Top Accent */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-300 to-gold-dark" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-sm bg-white/5 border border-white/5">
                      {getStyleIcon(item.id)}
                    </div>
                    {/* Color Dots */}
                    <div className="flex gap-1.5 items-center">
                      {item.palette.map((color, idx) => (
                        <span 
                          key={idx} 
                          className="h-2.5 w-2.5 rounded-full border border-white/20" 
                          style={{ backgroundColor: color }} 
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className={`font-serif text-base leading-snug transition-colors ${
                    isActive ? "text-white font-medium" : "text-gray-200"
                  }`}>
                    {item.name}
                  </h3>

                  <p className="text-[10px] text-gold/80 tracking-wider font-light mt-1">
                    {item.amharic}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
                    {item.tagline.split(" ")[0]} Style
                  </span>
                  <span className={`text-[10px] font-semibold transition-colors ${
                    isActive ? "text-gold" : "text-gray-600"
                  }`}>
                    {isActive ? "Viewing" : "Explore →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Style Spotlight Drawer */}
        <div className="p-8 sm:p-12 rounded-sm border border-gold/30 bg-[#0d0e14]/95 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-[9px] uppercase tracking-widest font-semibold rounded-sm bg-gold/10 border border-gold/30 text-gold">
                  {selectedHeritage.amharic}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                  {selectedHeritage.tagline}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-white">
                {selectedHeritage.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-gold font-medium">
                {selectedHeritage.signature}
              </p>
              
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {selectedHeritage.description}
              </p>

              <div className="p-4 rounded-sm bg-black/50 border border-white/5 flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  <span className="text-gold font-semibold">Purpose & Occasion: </span>
                  {selectedHeritage.purpose}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-center p-8 bg-black/60 rounded-sm border border-white/5 text-center space-y-4">
              <div className="h-16 w-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5">
                <Scissors className="h-7 w-7 text-gold stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-lg text-white">Custom Tailored to You</h4>
              <p className="text-xs text-gray-400 font-light max-w-xs leading-relaxed">
                We weave and tailor every border trim, neckline, and drape according to your individual measurements.
              </p>
              <Link
                href={`/gallery?cat=${selectedHeritage.galleryCat}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-gold/10 hover:bg-gold hover:text-black border border-gold/40 text-xs uppercase tracking-[0.2em] text-gold font-semibold transition-all duration-300 mt-2"
              >
                <span>View {selectedHeritage.name.split(" ")[0]} in Gallery</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: OUR 20-YEAR JOURNEY */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Our Story • የኛ ጉዞ</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white">Twenty Years of Tailoring</h2>
          <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-light">
            We have dressed brides for their wedding day, made matching sets for families walking into church on holidays, 
            and tailored dresses that traveled across oceans to celebrations around the globe.
          </p>
        </div>

        {/* 4 Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {journeyMilestones.map((item, index) => (
            <div 
              key={index}
              className="p-8 rounded-sm bg-[#0e1015]/70 border border-white/5 hover:border-gold/30 hover:bg-[#12141a] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-white/5 text-gold border border-white/5">
                    {item.tag}
                  </span>
                  <span className="text-[11px] text-gray-500 font-mono">{item.era}</span>
                </div>
                
                <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors mt-2">
                  {item.title}
                </h3>
                <p className="text-[10px] text-gold/80 tracking-widest mt-1 font-light">{item.amharic}</p>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-4 font-light">
                  {item.story}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-gold" /> Measured by Hand
                </span>
                <span>Bespoke Tailoring</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: THE TAILOR'S PROMISE & CLOSING CTA */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-5xl px-6 pt-12 pb-8 lg:px-8 text-center">
        <div className="p-8 sm:p-14 rounded-sm border border-gold/30 bg-gradient-to-b from-[#13151c] to-[#0a0b0d] shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
          
          <div className="h-12 w-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto bg-gold/10">
            <Heart className="h-5 w-5 text-gold" />
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl text-white leading-tight">
            &ldquo;We do not mass produce. We tailor.&rdquo;
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Every dress is still made by hand, measured to fit one person, not a generic size chart. 
            Twenty-plus years in, we are still doing the same thing that started all of this: 
            <span className="text-white font-medium"> making something you will wear on a day you will remember.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Link
              href="/gallery"
              className="px-8 py-3.5 rounded-sm bg-gradient-to-r from-gold via-yellow-400 to-gold-dark text-black font-semibold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition duration-300"
            >
              Explore Full Gallery
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-sm border border-white/20 hover:border-gold hover:text-gold text-xs uppercase tracking-[0.2em] font-medium text-white transition duration-300"
            >
              Visit Our Atelier
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
