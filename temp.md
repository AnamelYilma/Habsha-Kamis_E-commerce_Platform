- He started this project for two reasons:

  1. To build a shopping site for his father's tailoring business
  2. To write and build it with AI guidance rather than AI blindly writing code without teaching
- He needs the AI to follow his teaching rules.  

_3. To learn and developer from inside function each login to aopply or to seat in code sytanz need additionla think and link or connect code login so he ned logic by stazn how apply
- 
  ---
  # This Is What The User Wants
  - Simple explanations and guidance in plain English without unnecessary fluff.
  - The user is leveling up technical knowledge, so he needs guided conversations.
  - Leave architectural decisions to the user, but help him think, build, and debug by teaching.
  - The user wants to level up his Next.js and TypeScript skills for real-world applications.
  - Act as a senior developer pair-programmer who explains things clearly.
  ---
  # Don't Do This Randomly
  - Don't randomly say "run this in terminal" without explaining WHY it is needed and WHAT it does.
  - Don't just paste code without guiding the user through the syntax, imports, and purpose.
  - Help actively with systematic debugging.
  ---
  # How To Teach Best (The 4 Questions Rule)
  Always explain these 4 points before showing code:
  1. 📍 **What is this thing?**
  2. 📍 **Where does it come from?**
  3. 📍 **Why do we need it?**
  4. 📍 **What happens if we DON'T use it?
  5. 📍**To learn small peacie of logic by code how to learn and develope thsi skill becase ai**  

  **
  - Use tables / comparison lists: Works ✅ vs Breaks ❌
  - Draw the flow in plain words: Step 1 → Step 2 → Step 3
  - Never assume the user "already knows" something — explain every new term.
  - Relate code to real life comparisons: "This is like a translator", "this is like a watchdog".  

  ]]>  

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

  return ;  

  case "holiday":  

  return ;  

  case "modest":  

  return ;  

  case "handloom":  

  return ;  

  default:  

  return ;  

  }  

  }
  // =========================================================================  

  // ZONE 2: REACT COMPONENT  

  // =========================================================================  

  export default function OurStoryPage() {  

  const [activeStyle, setActiveStyle] = useState("bridal");
  const selectedHeritage = heritageStyles.find((item) => [item.id](http://item.id) === activeStyle) || heritageStyles[0];
  return (  

  ```plaintext
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

  ```
  );  

  }
  ]]>  

  ("overview");

    const [orders, setOrders] = useState([]);
    const [designs, setDesigns] = useState([]);
    const [messages, setMessages] = useState([]);
    const [settings, setSettings] = useState({
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
    const [activity, setActivity] = useState([]);
    const [stats, setStats] = useState({
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
    const [selectedOrder, setSelectedOrder] = useState(null);

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
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

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

    const handleImageFileChange = (e: React.ChangeEvent) => {
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

        {/* ===================================================================== */}
        {/* LUXURY ADMIN SIDEBAR */}
        {/* ===================================================================== */}

            {/* Atelier Brand Banner */}

                  HK

  ## 
                    HABESHA KAMIS

                    Admin Studio

            {/* Navigation Links */}

               setActiveNav("overview")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                  activeNav === "overview"
                    ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >

                  Overview & Visitors

               setActiveNav("orders")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                  activeNav === "orders"
                    ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >

                  Bespoke Orders

                  {orders.length}

               setActiveNav("gallery")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                  activeNav === "gallery"
                    ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >

                  Gallery & Uploads

                  {designs.length}

               setActiveNav("messages")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                  activeNav === "messages"
                    ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >

                  Inquiries & Cloth Actions

                {stats.unreadInquiries > 0 && (

                    {stats.unreadInquiries} new

                )}

               setActiveNav("settings")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm transition-all duration-200 ${
                  activeNav === "settings"
                    ? "bg-gold/15 text-gold border-l-2 border-gold font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >

                  Shop & Contact Info

          {/* Sidebar Footer */}

                 Local JSON Database

              Images in public/uploads/

              View Public Store

        {/* ===================================================================== */}
        {/* MAIN ADMIN WORKSPACE */}
        {/* ===================================================================== */}

          {/* Top Sticky Bar */}

                HK ADMIN

  # 
                  {activeNav === "overview" && "Atelier Overview & Visitor Analytics"}
                  {activeNav === "orders" && "Bespoke Measurement Orders"}
                  {activeNav === "gallery" && "Gallery Catalog & Image Uploads"}
                  {activeNav === "messages" && "Customer Cloth Inquiries & Messages"}
                  {activeNav === "settings" && "Shop Information & Contact Channels"}

            {/* Mobile Tab Selector */}

              {(["overview", "orders", "gallery", "messages", "settings"] as const).map((t) => (
                 setActiveNav(t)}
                  className={`px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                    activeNav === t ? "bg-gold text-black font-semibold" : "text-gray-300"
                  }`}
                >
                  {t}

              ))}

              {activeNav === "gallery" && (
                 setIsAddDesignOpen(true)}
                  className="px-3.5 py-1.5 rounded-sm bg-gold text-black text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 hover:bg-gold-light transition-colors"
                >

                  New Design

              )}

          {/* Tab Contents */}

            {/* ================================================================= */}
            {/* TAB 1: OVERVIEW & ANALYTICS */}
            {/* ================================================================= */}
            {activeNav === "overview" && (

                {/* Metric Cards */}

                      Total Bespoke Orders

                      {orders.length}

                        {stats.inProduction} in active production

                      Cloth Inquiries

                      {messages.length}

                        {stats.unreadInquiries} pending reply

                      Gallery Catalog

                      {designs.length}
                      Active dresses online

                      Estimated Visitors

                      {stats.estimatedVisitorsToday}
                      Today's site interactions

                {/* Activity Stream */}

  ### Recent Customer & Visitor Activity

                    Live Stream

                    {activity.map((act) => (

                            {act.title}

  {act.detail}

                          {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

                    ))}

            )}

            {/* ================================================================= */}
            {/* TAB 2: ORDERS PIPELINE */}
            {/* ================================================================= */}
            {activeNav === "orders" && (

                {/* High-Contrast Search & Filter Bar */}

                     setSearchQuery(e.target.value)}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 pl-10 pr-4 py-2.5 rounded-sm text-sm text-white placeholder:text-gray-400 outline-none transition-all"
                    />

                    {["all", "received", "in_production", "ready", "delivered"].map((st) => (
                       setOrderFilter(st)}
                        className={`px-3.5 py-2 rounded-sm uppercase tracking-wider text-xs font-semibold whitespace-nowrap transition-colors ${
                          orderFilter === st
                            ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                            : "bg-[#161922] text-gray-300 hover:text-white border border-white/10"
                        }`}
                      >
                        {st.replace("_", " ")}

                    ))}

                {/* Orders List */}

                  {filteredOrders.map((order) => (

                          {order.trackingCode}

                            {order.status.replace("_", " ")}

                          {new Date(order.createdAt).toLocaleDateString()}

                          Customer

  {order.customerName}
  {order.phone}

                          Garment & Fabric

  {order.garmentType}
  {order.fabric}

                          Measurements

                            H: {order.measurements?.height || "-"}cm • 
                             Sh: {order.measurements?.shoulder || "-"}cm • 
                             Ch: {order.measurements?.chest || "-"}cm

                           setSelectedOrder(order)}
                            className="px-3.5 py-2 rounded-sm bg-white/10 hover:bg-gold hover:text-black border border-white/20 text-xs uppercase tracking-wider font-semibold transition-colors text-white"
                          >
                            View Full

                           handleDeleteOrder(order.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete Order"
                          >

                      {/* Quick Status Update */}

                        Update Status:
                        {["received", "accepted", "in_production", "ready", "delivered"].map((st) => (
                           handleUpdateOrderStatus(order.id, st)}
                            className={`px-2.5 py-1 rounded-sm uppercase tracking-wider font-medium text-[11px] transition-colors ${
                              order.status === st
                                ? "bg-gold text-black font-bold shadow-md"
                                : "bg-[#161922] text-gray-300 hover:text-white border border-white/15"
                            }`}
                          >
                            {st.replace("_", " ")}

                        ))}

                  ))}

            )}

            {/* ================================================================= */}
            {/* TAB 3: GALLERY & DESIGNS CATALOG */}
            {/* ================================================================= */}
            {activeNav === "gallery" && (

  ### Gallery Catalog & Image Uploads
  Total {designs.length} designs active in online gallery

                   setIsAddDesignOpen(true)}
                    className="px-5 py-2.5 bg-gold hover:bg-gold-light text-black text-xs uppercase tracking-wider font-bold rounded-sm flex items-center gap-2 transition-colors shadow-lg"
                  >

                    Upload New Dress

                {/* Designs Grid */}

                  {designs.map((design) => (

                        ![{design.name}]({design.images?.[0])

                            {design.category}

  {design.amharicName}
  #### {design.name}
  {design.priceRange}

                          {design.description}

                          {design.specs?.production || "2 Weeks"}
                           handleDeleteDesign(design.id)}
                            className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors"
                          >

                            Delete

                  ))}

            )}

            {/* ================================================================= */}
            {/* TAB 4: CUSTOMER INQUIRIES & CLOTH ACTIONS */}
            {/* ================================================================= */}
            {activeNav === "messages" && (

  ### Customer Inquiries & Cloth Requests
  Track visitors asking for prices, custom colors, or contact messages

                  {messages.map((msg) => (

                            {msg.action}

                            {msg.status}

                          {new Date(msg.createdAt).toLocaleString()}

                          Customer

  {msg.customerName}
  {msg.phone}

                          Subject / Garment

  {msg.subject}

                            “{msg.message}”

                          Action Status:
                           handleUpdateMessageStatus(msg.id, "read")}
                            className="px-3 py-1.5 rounded-sm bg-[#161922] hover:bg-white/15 text-gray-200 text-xs uppercase font-medium border border-white/10"
                          >
                            Mark Read

                           handleUpdateMessageStatus(msg.id, "replied")}
                            className="px-3 py-1.5 rounded-sm bg-gold/15 hover:bg-gold hover:text-black text-gold text-xs uppercase font-semibold transition-colors border border-gold/40"
                          >
                            Mark Replied

                        [

                          Call Customer
                        ]({`tel:${msg.phone}`})

                  ))}

            )}

            {/* ================================================================= */}
            {/* TAB 5: SHOP SETTINGS & CONTACT INFO */}
            {/* ================================================================= */}
            {activeNav === "settings" && (

  ### Adjust Shop & Contact Information
  Changes saved here are stored in data/settings.json and sync across the site

                {savedSettingsSuccess && (

                    Shop settings saved successfully to data/settings.json!

                )}

                      Shop English Name
                       setSettings({ ...settings, shopName: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                      />

                      Shop Amharic Name
                       setSettings({ ...settings, amharicShopName: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                      />

                      Primary Phone Line
                       setSettings({ ...settings, phone1: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                      />

                      Secondary Phone Line
                       setSettings({ ...settings, phone2: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                      />

                      Telegram Channel Link
                       setSettings({ ...settings, telegram: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                      />

                      Contact Email
                       setSettings({ ...settings, email: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                      />

                    Atelier Physical Address
                     setSettings({ ...settings, address: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                    />

                    Opening Hours
                     setSettings({ ...settings, openingHours: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-2.5 rounded-sm text-sm text-white font-medium outline-none transition-all"
                    />

                    Announcement Banner
                     setSettings({ ...settings, announcement: e.target.value })}
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
                  <span className="text-gray-300 uppercase tracking-widest text-[10px] block font-semibold">Fabric & Embroidery</span>
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

  ]]>
  </file>
  <file name="app\api\admin\activity\route.ts">
  <![CDATA[
  import { NextResponse } from "next/server";
  import fs from "fs";
  import path from "path";
  <p>const activityFilePath = path.join(process.cwd(), "data", "activity.json");<br>
  const ordersFilePath = path.join(process.cwd(), "data", "orders.json");<br>
  const designsFilePath = path.join(process.cwd(), "data", "designs.json");<br>
  const messagesFilePath = path.join(process.cwd(), "data", "messages.json");</p>
  <p>function safeReadJson(filePath: string, fallback: any = []) {<br>
  try {<br>
  if (!fs.existsSync(filePath)) return fallback;<br>
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));<br>
  } catch {<br>
  return fallback;<br>
  }<br>
  }</p>
  <p>export async function GET() {<br>
  try {<br>
  const activities = safeReadJson(activityFilePath, []);<br>
  const orders = safeReadJson(ordersFilePath, []);<br>
  const designs = safeReadJson(designsFilePath, []);<br>
  const messages = safeReadJson(messagesFilePath, []);</p>
  <pre><code>const inProductionCount = orders.filter((o: any) => o.status === "in_production").length;
  const pendingOrdersCount = orders.filter((o: any) => o.status === "received" || o.status === "accepted").length;
  const unreadMessagesCount = messages.filter((m: any) => m.status === "unread").length;

  return NextResponse.json({
    stats: {
      totalOrders: orders.length,
      inProduction: inProductionCount,
      pendingOrders: pendingOrdersCount,
      totalDesigns: designs.length,
      totalInquiries: messages.length,
      unreadInquiries: unreadMessagesCount,
      estimatedVisitorsToday: 142 + Math.floor(orders.length * 3.5)
    },
    recentActivity: activities
  });
  </code></pre>
  <p>} catch (error) {<br>
  return NextResponse.json({ error: "Failed to load activity" }, { status: 500 });<br>
  }<br>
  }</p>
  <p>]]><br>
  </file><br>
  <file name="app\api\admin\designs\route.ts"></p>
  <![CDATA[
  import { NextRequest, NextResponse } from "next/server";
  import fs from "fs";
  import path from "path";

  const dataFilePath = path.join(process.cwd(), "data", "designs.json");
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  // Helper to ensure files and directories exist
  function getDesignsData() {
    if (!fs.existsSync(dataFilePath)) {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    try {
      return JSON.parse(fileContent);
    } catch {
      return [];
    }
  }

  function saveDesignsData(designs: any[]) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(designs, null, 2), "utf-8");
  }

  // GET: Fetch all designs
  export async function GET() {
    try {
      const designs = getDesignsData();
      return NextResponse.json(designs);
    } catch (error) {
      return NextResponse.json({ error: "Failed to read designs" }, { status: 500 });
    }
  }

  // POST: Add new design with optional image file upload
  export async function POST(request: NextRequest) {
    try {
      const contentType = request.headers.get("content-type") || "";
      let name = "";
      let amharicName = "";
      let category = "wedding";
      let priceRange = "";
      let description = "";
      let material = "";
      let weaveTime = "";
      let production = "";
      let imageUrls: string[] = [];

      if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        name = (formData.get("name") as string) || "Custom Design";
        amharicName = (formData.get("amharicName") as string) || "";
        category = (formData.get("category") as string) || "wedding";
        priceRange = (formData.get("priceRange") as string) || "15,000 - 25,000 ETB";
        description = (formData.get("description") as string) || "";
        material = (formData.get("material") as string) || "100% Ethiopian Cotton";
        weaveTime = (formData.get("weaveTime") as string) || "60 Hours";
        production = (formData.get("production") as string) || "2 Weeks";

        // Process uploaded image file
        const imageFile = formData.get("imageFile") as File | null;
        if (imageFile && imageFile.size > 0) {
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          const bytes = await imageFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileExt = path.extname(imageFile.name) || ".jpg";
          const fileName = `design-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${fileExt}`;
          const filePath = path.join(uploadsDir, fileName);
          fs.writeFileSync(filePath, buffer);
          imageUrls.push(`/uploads/${fileName}`);
        }

        // If user also provided fallback URL
        const customUrl = formData.get("imageUrl") as string | null;
        if (customUrl && customUrl.trim()) {
          imageUrls.push(customUrl.trim());
        }
      } else {
        const body = await request.json();
        name = body.name || "Custom Design";
        amharicName = body.amharicName || "";
        category = body.category || "wedding";
        priceRange = body.priceRange || "15,000 - 25,000 ETB";
        description = body.description || "";
        material = body.material || "100% Ethiopian Cotton";
        weaveTime = body.weaveTime || "60 Hours";
        production = body.production || "2 Weeks";
        imageUrls = body.images || [];
      }

      if (imageUrls.length === 0) {
        imageUrls.push("https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80");
      }

      const newDesign = {
        id: `ds-${Date.now()}`,
        name,
        amharicName,
        category,
        priceRange,
        description,
        images: imageUrls,
        specs: {
          material,
          weaveTime,
          production
        },
        createdAt: new Date().toISOString()
      };

      const designs = getDesignsData();
      designs.unshift(newDesign);
      saveDesignsData(designs);

      return NextResponse.json({ success: true, design: newDesign }, { status: 201 });
    } catch (error: any) {
      console.error("Error creating design:", error);
      return NextResponse.json({ error: error?.message || "Failed to create design" }, { status: 500 });
    }
  }

  // DELETE: Delete a design by ID
  export async function DELETE(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({ error: "Missing design ID" }, { status: 400 });
      }

      const designs = getDesignsData();
      const updated = designs.filter((d: any) => d.id !== id);
      saveDesignsData(updated);

      return NextResponse.json({ success: true, message: "Design deleted" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete design" }, { status: 500 });
    }
  }

  ]]>
  </file>
  <file name="app\api\admin\messages\route.ts">
  <![CDATA[
  import { NextRequest, NextResponse } from "next/server";
  import fs from "fs";
  import path from "path";
  <p>const messagesFilePath = path.join(process.cwd(), "data", "messages.json");<br>
  const activityFilePath = path.join(process.cwd(), "data", "activity.json");</p>
  <p>function getMessagesData() {<br>
  if (!fs.existsSync(messagesFilePath)) {<br>
  fs.mkdirSync(path.dirname(messagesFilePath), { recursive: true });<br>
  fs.writeFileSync(messagesFilePath, JSON.stringify([], null, 2), "utf-8");<br>
  return [];<br>
  }<br>
  const fileContent = fs.readFileSync(messagesFilePath, "utf-8");<br>
  try {<br>
  return JSON.parse(fileContent);<br>
  } catch {<br>
  return [];<br>
  }<br>
  }</p>
  <p>function saveMessagesData(messages: any[]) {<br>
  fs.mkdirSync(path.dirname(messagesFilePath), { recursive: true });<br>
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), "utf-8");<br>
  }</p>
  <p>function logActivity(eventType: string, title: string, detail: string) {<br>
  try {<br>
  let activities = [];<br>
  if (fs.existsSync(activityFilePath)) {<br>
  activities = JSON.parse(fs.readFileSync(activityFilePath, "utf-8"));<br>
  }<br>
  activities.unshift({<br>
  id: <code>act-${Date.now()}</code>,<br>
  eventType,<br>
  title,<br>
  detail,<br>
  timestamp: new Date().toISOString()<br>
  });<br>
  fs.writeFileSync(activityFilePath, JSON.stringify(activities.slice(0, 50), null, 2), "utf-8");<br>
  } catch (err) {<br>
  console.error("Failed to log activity", err);<br>
  }<br>
  }</p>
  <p>export async function GET() {<br>
  try {<br>
  const messages = getMessagesData();<br>
  return NextResponse.json(messages);<br>
  } catch (error) {<br>
  return NextResponse.json({ error: "Failed to load messages" }, { status: 500 });<br>
  }<br>
  }</p>
  <p>export async function POST(request: NextRequest) {<br>
  try {<br>
  const body = await request.json();<br>
  const newMessage = {<br>
  id: <code>msg-${Date.now()}</code>,<br>
  type: body.type || "cloth_inquiry", // 'cloth_inquiry' | 'contact_message' | 'price_request'<br>
  customerName: body.customerName || "Customer",<br>
  phone: body.phone || "",<br>
  subject: body.subject || "Cloth Inquiry",<br>
  message: body.message || "",<br>
  action: body.action || "General Request",<br>
  status: "unread",<br>
  createdAt: new Date().toISOString()<br>
  };</p>
  <pre><code>const messages = getMessagesData();
  messages.unshift(newMessage);
  saveMessagesData(messages);

  logActivity(newMessage.type, "New Customer Inquiry Received", `${newMessage.customerName} (${newMessage.phone}) asked about: ${newMessage.subject}`);

  return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  </code></pre>
  <p>} catch (error: any) {<br>
  return NextResponse.json({ error: error?.message || "Failed to create message" }, { status: 500 });<br>
  }<br>
  }</p>
  <p>export async function PATCH(request: NextRequest) {<br>
  try {<br>
  const body = await request.json();<br>
  const { id, status } = body;<br>
  if (!id) return NextResponse.json({ error: "Missing message ID" }, { status: 400 });</p>
  <pre><code>const messages = getMessagesData();
  const idx = messages.findIndex((m: any) => m.id === id);
  if (idx === -1) return NextResponse.json({ error: "Message not found" }, { status: 404 });

  if (status) messages[idx].status = status;
  saveMessagesData(messages);

  return NextResponse.json({ success: true, message: messages[idx] });
  </code></pre>
  <p>} catch (error: any) {<br>
  return NextResponse.json({ error: error?.message || "Failed to update message" }, { status: 500 });<br>
  }<br>
  }</p>
  <p>export async function DELETE(request: NextRequest) {<br>
  try {<br>
  const { searchParams } = new URL(request.url);<br>
  const id = searchParams.get("id");<br>
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });</p>
  <pre><code>const messages = getMessagesData();
  const updated = messages.filter((m: any) => m.id !== id);
  saveMessagesData(updated);

  return NextResponse.json({ success: true });
  </code></pre>
  <p>} catch (error) {<br>
  return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });<br>
  }<br>
  }</p>
  <p>]]><br>
  </file><br>
  <file name="app\api\admin\orders\route.ts"></p>
  <![CDATA[
  import { NextRequest, NextResponse } from "next/server";
  import fs from "fs";
  import path from "path";

  const ordersFilePath = path.join(process.cwd(), "data", "orders.json");

  function getOrdersData() {
    if (!fs.existsSync(ordersFilePath)) {
      fs.mkdirSync(path.dirname(ordersFilePath), { recursive: true });
      fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const fileContent = fs.readFileSync(ordersFilePath, "utf-8");
    try {
      return JSON.parse(fileContent);
    } catch {
      return [];
    }
  }

  function saveOrdersData(orders: any[]) {
    fs.mkdirSync(path.dirname(ordersFilePath), { recursive: true });
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf-8");
  }

  // GET: Fetch all customer orders
  export async function GET() {
    try {
      const orders = getOrdersData();
      return NextResponse.json(orders);
    } catch (error) {
      return NextResponse.json({ error: "Failed to read orders" }, { status: 500 });
    }
  }

  // POST: Create a new custom tailoring order
  export async function POST(request: NextRequest) {
    try {
      const body = await request.json();

      if (!body.phone) {
        return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
      }

      const trackingCode = `HK-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder = {
        id: `ord-${Date.now()}`,
        trackingCode,
        customerName: body.customerName || "Customer",
        phone: body.phone,
        occasion: body.occasion || "Bespoke Fitting",
        garmentType: body.garmentType || "Custom Habesha Dress",
        fabric: body.fabric || "Fine Menen Cotton",
        embroidery: body.embroidery || "Royal Gold Tilf",
        measurements: {
          height: body.measurements?.height || "",
          shoulder: body.measurements?.shoulder || "",
          chest: body.measurements?.chest || "",
          waist: body.measurements?.waist || "",
          hip: body.measurements?.hip || "",
          sleeve: body.measurements?.sleeve || "",
          dressLength: body.measurements?.dressLength || ""
        },
        neededByDate: body.neededByDate || "",
        notes: body.notes || "",
        status: "received", // received -> accepted -> calling_customer -> in_production -> ready -> delivered
        createdAt: new Date().toISOString()
      };

      const orders = getOrdersData();
      orders.unshift(newOrder);
      saveOrdersData(orders);

      return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error?.message || "Failed to create order" }, { status: 500 });
    }
  }

  // PATCH: Update order status or notes
  export async function PATCH(request: NextRequest) {
    try {
      const body = await request.json();
      const { id, status, notes } = body;

      if (!id) {
        return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
      }

      const orders = getOrdersData();
      const orderIndex = orders.findIndex((o: any) => o.id === id);

      if (orderIndex === -1) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      if (status) orders[orderIndex].status = status;
      if (notes !== undefined) orders[orderIndex].notes = notes;
      orders[orderIndex].updatedAt = new Date().toISOString();

      saveOrdersData(orders);

      return NextResponse.json({ success: true, order: orders[orderIndex] });
    } catch (error: any) {
      return NextResponse.json({ error: error?.message || "Failed to update order" }, { status: 500 });
    }
  }

  // DELETE: Delete an order
  export async function DELETE(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
      }

      const orders = getOrdersData();
      const updated = orders.filter((o: any) => o.id !== id);
      saveOrdersData(updated);

      return NextResponse.json({ success: true, message: "Order removed" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
  }

  ]]>
  </file>
  <file name="app\api\admin\settings\route.ts">
  <![CDATA[
  import { NextRequest, NextResponse } from "next/server";
  import fs from "fs";
  import path from "path";
  <p>const settingsFilePath = path.join(process.cwd(), "data", "settings.json");</p>
  <p>function getSettingsData() {<br>
  if (!fs.existsSync(settingsFilePath)) {<br>
  const defaultSettings = {<br>
  shopName: "Habesha Kamis Tailor Shop",<br>
  amharicShopName: "ሐበሻ ቀሚስ የባህል አልባሳት",<br>
  phone1: "+251 911 234 567",<br>
  phone2: "+251 908 765 432",<br>
  telegram: "<a href="https://t.me/HabeshaKamisTailorShop">https://t.me/HabeshaKamisTailorShop</a>",<br>
  telegramUsername: "@HabeshaKamisTailorShop",<br>
  email: "<a href="mailto:contact@habeshakamis.et">contact@habeshakamis.et</a>",<br>
  address: "Bole Medhanialem Mall, 3rd Floor, Suite 304, Addis Ababa, Ethiopia",<br>
  openingHours: "Monday – Saturday: 9:00 AM – 7:00 PM (Sunday by Appointment)",<br>
  announcement: "Now accepting custom wedding bookings for the upcoming holiday season."<br>
  };<br>
  fs.mkdirSync(path.dirname(settingsFilePath), { recursive: true });<br>
  fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2), "utf-8");<br>
  return defaultSettings;<br>
  }<br>
  const fileContent = fs.readFileSync(settingsFilePath, "utf-8");<br>
  try {<br>
  return JSON.parse(fileContent);<br>
  } catch {<br>
  return {};<br>
  }<br>
  }</p>
  <p>function saveSettingsData(settings: any) {<br>
  fs.mkdirSync(path.dirname(settingsFilePath), { recursive: true });<br>
  fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), "utf-8");<br>
  }</p>
  <p>export async function GET() {<br>
  try {<br>
  const settings = getSettingsData();<br>
  return NextResponse.json(settings);<br>
  } catch (error) {<br>
  return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });<br>
  }<br>
  }</p>
  <p>export async function PATCH(request: NextRequest) {<br>
  try {<br>
  const body = await request.json();<br>
  const current = getSettingsData();<br>
  const updated = { ...current, ...body, updatedAt: new Date().toISOString() };<br>
  saveSettingsData(updated);<br>
  return NextResponse.json({ success: true, settings: updated });<br>
  } catch (error: any) {<br>
  return NextResponse.json({ error: error?.message || "Failed to update settings" }, { status: 500 });<br>
  }<br>
  }</p>
  <p>]]><br>
  </file><br>
  <file name="app\contact\page.tsx"></p>
  <![CDATA[
  "use client";

  import React, { useState } from "react";
  import Link from "next/link";
  import { 
    MapPin, 
    Phone, 
    Send, 
    Clock, 
    Mail, 
    MessageSquare, 
    Sparkles, 
    CheckCircle, 
    HelpCircle, 
    ChevronDown,
    ArrowRight,
    ShieldCheck
  } from "lucide-react";

  export default function ContactPage() {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      subject: "Custom Tailoring Consultation",
      message: "",
      contactMethod: "telegram"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
      {
        q: "How long does it take to tailor a custom Habesha Kemis?",
        a: "Standard bespoke orders take 10 to 14 business days. Intricate royal wedding sets with multi-layered hand-woven Tilf embroidery can take 3 to 4 weeks. Rush orders can be accommodated upon request via direct phone consultation."
      },
      {
        q: "How do you ensure my measurements are accurate?",
        a: "You can submit your exact body measurements (height, shoulder, chest, waist, sleeve, dress length) through our online Bespoke Customize studio. You can also visit our atelier in Bole Medhanialem for an in-person measurement session with our master tailor."
      },
      {
        q: "Do you ship custom dresses overseas for diaspora weddings?",
        a: "Yes! We regularly tailor and ship custom gowns to the United States, Europe, Canada, and the Middle East via reliable international express couriers with tracking provided."
      },
      {
        q: "Can I bring my own hand-spun Menen cotton fabric?",
        a: "Absolutely. You can deliver or ship your personal raw fabric or regional thread panels to our atelier in Addis Ababa. Our master tailors will shape, line, and finish your garment to your specifications."
      },
      {
        q: "How does payment and deposit work?",
        a: "We require a standard 50% deposit before weaving and cutting begins, with the remaining balance due upon completion before pickup or dispatch. We accept local bank transfers (CBE, Telebirr, Awash) and international remittance."
      }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.phone) return;

      setIsSubmitting(true);
      setIsSuccess(false);

      try {
        await fetch("/api/admin/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.name || "Contact Inquiry",
            phone: formData.phone,
            occasion: "Consultation Request",
            garmentType: formData.subject,
            notes: `[Contact Form]: ${formData.message} (Preferred method: ${formData.contactMethod})`,
            status: "received"
          })
        });

        setIsSubmitting(false);
        setIsSuccess(true);
      } catch {
        setIsSubmitting(false);
        setIsSuccess(true);
      }
    };

    return (
      <div className="relative min-h-screen bg-[#07080a] text-white selection:bg-gold selection:text-black pb-28">

        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[550px] w-full max-w-7xl rounded-full bg-gold/5 blur-[140px] pointer-events-none" />
        <div className="absolute top-[40%] -right-32 -z-10 h-[500px] w-[500px] rounded-full bg-ethioGreen/5 blur-[130px] pointer-events-none" />

        {/* ===================================================================== */}
        {/* SECTION 1: HERO HEADER */}
        {/* ===================================================================== */}
        <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-12 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[1px] w-8 bg-gold/60" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Get In Touch • ያግኙን
            </span>
            <span className="h-[1px] w-8 bg-gold/60" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white max-w-3xl mx-auto leading-tight">
            Visit Our Atelier or <br />
            <span className="italic font-light text-gold">Inquire with Our</span> Tailors.
          </h1>

          <p className="mt-6 text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
            Whether you need a bespoke wedding gown, a matching family holiday set, or an in-person measurement fitting, 
            our tailoring team is here to assist you.
          </p>
        </section>

        {/* ===================================================================== */}
        {/* SECTION 2: FAST ACTION CARDS */}
        {/* ===================================================================== */}
        <section className="mx-auto max-w-6xl px-6 py-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Telegram Card */}
            <a 
              href="https://t.me/HabeshaKamisTailorShop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-sm bg-[#0f1117] border border-white/15 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between hover:bg-[#151822] shadow-lg"
            >
              <div>
                <div className="h-10 w-10 rounded-sm bg-[#24A1DE]/15 border border-[#24A1DE]/40 flex items-center justify-center mb-4">
                  <Send className="h-5 w-5 text-[#24A1DE]" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Instant Response</span>
                <h3 className="font-serif text-lg text-white group-hover:text-gold transition-colors mt-1 font-normal">Telegram Inquiries</h3>
                <p className="text-xs text-gray-300 mt-2 font-light leading-relaxed">
                  Chat directly with our master tailor, send inspiration photos, and confirm orders in real time.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gold font-semibold">
                <span>Open Telegram</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Direct Phone Card */}
            <div className="group p-6 rounded-sm bg-[#0f1117] border border-white/15 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between hover:bg-[#151822] shadow-lg">
              <div>
                <div className="h-10 w-10 rounded-sm bg-gold/15 border border-gold/40 flex items-center justify-center mb-4">
                  <Phone className="h-5 w-5 text-gold" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Direct Voice Call</span>
                <h3 className="font-serif text-lg text-white group-hover:text-gold transition-colors mt-1 font-normal">Studio Phone Lines</h3>
                <p className="text-xs text-gray-300 mt-2 font-light leading-relaxed">
                  Call our workshop directly during store hours for urgent inquiries and custom fittings.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 space-y-1">
                <p className="font-mono text-sm text-white font-medium">+251 911 234 567</p>
                <p className="font-mono text-xs text-gray-300">+251 908 765 432</p>
              </div>
            </div>

            {/* Physical Atelier Card */}
            <div className="group p-6 rounded-sm bg-[#0f1117] border border-white/15 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between hover:bg-[#151822] shadow-lg">
              <div>
                <div className="h-10 w-10 rounded-sm bg-ethioGreen/15 border border-ethioGreen/40 flex items-center justify-center mb-4">
                  <MapPin className="h-5 w-5 text-ethioGreen" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Addis Ababa Atelier</span>
                <h3 className="font-serif text-lg text-white group-hover:text-gold transition-colors mt-1 font-normal">Visit for Fitting</h3>
                <p className="text-xs text-gray-300 mt-2 font-light leading-relaxed">
                  Bole Medhanialem Mall, 3rd Floor, Suite 304, Addis Ababa, Ethiopia.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-300">
                <span className="text-gold font-semibold">Mon - Sat:</span> 9:00 AM – 7:00 PM
              </div>
            </div>

          </div>
        </section>

        {/* ===================================================================== */}
        {/* SECTION 3: FORM & MAP GRID */}
        {/* ===================================================================== */}
        <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Column: High-Contrast Contact Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-sm border border-white/15 bg-[#0f1117] shadow-2xl">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Direct Inquiry Form</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white mt-1">Send Us a Message</h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 font-light">
                  Fill in your details below. Our master tailor will review your request and connect with you directly.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-sm border border-gold/40 bg-gold/10 text-center space-y-4 animate-fade-in">
                  <CheckCircle className="h-10 w-10 text-gold mx-auto" />
                  <h3 className="font-serif text-xl text-white">Inquiry Received</h3>
                  <p className="text-sm text-gray-200 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. We have logged your request in our workshop queue. Our tailor will contact your phone number shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-sm bg-gold text-black text-xs uppercase tracking-wider font-semibold hover:bg-gold-light transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bethlehem Haile"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white font-medium outline-none transition-all cursor-pointer"
                      >
                        <option value="Custom Bridal Tailoring" className="bg-[#161922] text-white">Custom Bridal / Wedding Gown</option>
                        <option value="Family Matching Sets" className="bg-[#161922] text-white">Family Holiday Matching Sets</option>
                        <option value="Men's Kaftan & Gabi" className="bg-[#161922] text-white">Men's Kaftan & Gabi</option>
                        <option value="In-Person Atelier Fitting" className="bg-[#161922] text-white">Book In-Person Fitting Appointment</option>
                        <option value="Overseas Shipping Inquiry" className="bg-[#161922] text-white">Overseas Diaspora Shipping</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                        Preferred Contact Channel
                      </label>
                      <select
                        value={formData.contactMethod}
                        onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                        className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white font-medium outline-none transition-all cursor-pointer"
                      >
                        <option value="telegram" className="bg-[#161922] text-white">Telegram Direct Message</option>
                        <option value="phone" className="bg-[#161922] text-white">Direct Phone Call</option>
                        <option value="whatsapp" className="bg-[#161922] text-white">WhatsApp Message</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-2">
                      Message / Custom Request Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your celebration date, preferred fabric, pattern colors, or specific sizing questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-4 py-3 rounded-sm text-sm text-white placeholder:text-gray-400 font-medium outline-none resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-gold via-yellow-400 to-gold-dark text-black font-bold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition duration-300 rounded-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Inquiry to Atelier</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Atelier Location & Hours */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">

              {/* Atelier Info Box */}
              <div className="p-8 rounded-sm border border-white/15 bg-[#0f1117] shadow-xl space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Atelier Location</span>
                  <h3 className="font-serif text-2xl text-white mt-1">Bole Medhanialem Atelier</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2 font-light">
                    Our flagship showroom and tailoring fitting lounge is located in the heart of Bole, Addis Ababa.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Address</p>
                      <p className="text-gray-300 text-xs mt-0.5">Bole Medhanialem Mall, 3rd Floor, Suite 304, Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium text-sm">Hours of Operation</p>
                      <p className="text-gray-300 text-xs mt-0.5">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                      <p className="text-gold text-xs font-medium mt-0.5">Sunday: Private fittings by appointment</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Bole+Medhanialem,Addis+Ababa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full py-3.5 border-2 border-gold/50 hover:border-gold bg-gold/10 hover:bg-gold hover:text-black text-gold text-xs uppercase tracking-[0.18em] font-semibold rounded-sm transition-all"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Bespoke Studio Prompt Box */}
              <div className="p-6 rounded-sm border-2 border-gold/30 bg-gradient-to-br from-[#141722] to-[#0a0b10] flex items-center justify-between gap-4 shadow-xl">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold font-semibold">Have Your Measurements?</p>
                  <h4 className="font-serif text-base text-white mt-0.5 font-normal">Use Our Custom Tailoring Studio</h4>
                  <p className="text-xs text-gray-300 font-light mt-1">Specify your exact height, shoulder, chest, and sleeve.</p>
                </div>
                <Link
                  href="/customize"
                  className="px-4 py-2.5 rounded-sm bg-gold text-black font-semibold text-xs uppercase tracking-wider whitespace-nowrap hover:bg-gold-light transition-colors"
                >
                  Customize →
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* ===================================================================== */}
        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
        {/* ===================================================================== */}
        <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Common Inquiries • ጥያቄዎች</span>
            <h2 className="font-serif text-3xl text-white mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-sm border border-white/15 bg-[#0f1117] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:text-gold transition-colors"
                  >
                    <span className="font-serif text-base text-white font-normal">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180" : ""
                    }`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed font-light border-t border-white/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    );
  }

  ]]>
  </file>
  <file name="app\customize\page.tsx">
  <![CDATA[
  "use client";
  <p>import React, { useState } from "react";<br>
  import Link from "next/link";<br>
  import {<br>
  Scissors,<br>
  Ruler,<br>
  Sparkles,<br>
  CheckCircle,<br>
  Send,<br>
  Clock,<br>
  ShieldCheck,<br>
  Layers,<br>
  ArrowRight,<br>
  Phone,<br>
  HelpCircle,<br>
  Copy,<br>
  Info<br>
  } from "lucide-react";</p>
  <p>interface GarmentOption {<br>
  id: string;<br>
  name: string;<br>
  amharic: string;<br>
  basePrice: string;<br>
  leadTime: string;<br>
  description: string;<br>
  }</p>
  <p>interface FabricOption {<br>
  id: string;<br>
  name: string;<br>
  amharic: string;<br>
  description: string;<br>
  }</p>
  <p>interface EmbroideryOption {<br>
  id: string;<br>
  name: string;<br>
  amharic: string;<br>
  palette: string[];<br>
  description: string;<br>
  }</p>
  <p>const garmentOptions: GarmentOption[] = [<br>
  {<br>
  id: "bridal",<br>
  name: "Royal Bridal Wedding Gown",<br>
  amharic: "የሰርግ ሙሽራ ቀሚስ",<br>
  basePrice: "35,000 - 55,000 ETB",<br>
  leadTime: "3-4 Weeks",<br>
  description: "Multi-layered Menen cotton gown with heavy gold Zari Tilf and double bridal veil."<br>
  },<br>
  {<br>
  id: "couple",<br>
  name: "Bride & Groom Matching Set",<br>
  amharic: "የጥንዶች አልባሳት",<br>
  basePrice: "26,000 - 42,000 ETB",<br>
  leadTime: "2-3 Weeks",<br>
  description: "Coordinated gown and groom's Kaftan vest featuring matching neckline embroidery."<br>
  },<br>
  {<br>
  id: "family",<br>
  name: "Family Holiday Celebration Set",<br>
  amharic: "የቤተሰብ በዓላት ስብስብ",<br>
  basePrice: "28,000 - 45,000 ETB (Set of 3)",<br>
  leadTime: "2-3 Weeks",<br>
  description: "Harmonized traditional attire for parents and children for holidays and church ceremonies."<br>
  },<br>
  {<br>
  id: "female_kemis",<br>
  name: "Classic Evening Habesha Kemis",<br>
  amharic: "የምሽት ባህላዊ ቀሚስ",<br>
  basePrice: "14,000 - 22,000 ETB",<br>
  leadTime: "10-14 Days",<br>
  description: "Elegant tailored silhouette with traditional hand-embroidered neckline, cuffs, and Netela trim."<br>
  },<br>
  {<br>
  id: "male_kaftan",<br>
  name: "Men's Kaftan & Warm Chencha Gabi",<br>
  amharic: "የወንድ ካፍታንና ጋቢ",<br>
  basePrice: "12,000 - 18,000 ETB",<br>
  leadTime: "10-12 Days",<br>
  description: "Structured collarless shirt with embroidered chest plaque paired with an ultra-soft Gabi blanket."<br>
  },<br>
  {<br>
  id: "modest",<br>
  name: "Modest High-Neck Flowing Dress",<br>
  amharic: "የተከበረ የባህል ቀሚስ",<br>
  basePrice: "16,000 - 25,000 ETB",<br>
  leadTime: "12-14 Days",<br>
  description: "Full-length flowing gown with high neckline, long sleeves, and matching head covering."<br>
  }<br>
  ];</p>
  <p>const fabricOptions: FabricOption[] = [<br>
  {<br>
  id: "menen_fine",<br>
  name: "100% Superfine Menen Cotton",<br>
  amharic: "ስስ መነን ጥጥ",<br>
  description: "Lightweight, breathable, and soft organic cotton. Perfect for gowns and double-layered dresses."<br>
  },<br>
  {<br>
  id: "chencha_heavy",<br>
  name: "Heavyweight Chencha Loom Weave",<br>
  amharic: "የጨንቻ ወፍራም ሸማ",<br>
  description: "Thick, ultra-warm, combed organic cotton ideal for Gabis, vests, and structured outerwear."<br>
  },<br>
  {<br>
  id: "silk_cotton",<br>
  name: "Silk-Cotton Hybrid with Sheer Netela",<br>
  amharic: "የሐርና የጥጥ ቅልቅል",<br>
  description: "Lustrous woven cotton infused with silk thread for enhanced evening shimmer and drape."<br>
  },<br>
  {<br>
  id: "own_fabric",<br>
  name: "I Will Ship / Provide My Own Fabric",<br>
  amharic: "የራስዎን ጨርቅ በመላክ",<br>
  description: "Deliver or mail your personal raw cotton or specialty regional fabric to our studio."<br>
  }<br>
  ];</p>
  <p>const embroideryOptions: EmbroideryOption[] = [<br>
  {<br>
  id: "gold_zari",<br>
  name: "Royal Gold Zari Tilf",<br>
  amharic: "ወርቃማ ዛሪ ጥልፍ",<br>
  palette: ["#d4af37", "#f3e5ab", "#aa8010"],<br>
  description: "High-grade metallic gold thread woven into dense geometric royal motifs."<br>
  },<br>
  {<br>
  id: "tricolor",<br>
  name: "Traditional Unity Tricolor",<br>
  amharic: "አረንጓዴ፣ ቢጫ፣ ቀይ",<br>
  palette: ["#078732", "#fcd116", "#e51f1f"],<br>
  description: "Balanced green, yellow, and red borders celebrating national heritage."<br>
  },<br>
  {<br>
  id: "emerald_floral",<br>
  name: "Emerald Green & Gold Flora",<br>
  amharic: "ሀረግ አረንጓዴ",<br>
  palette: ["#10b981", "#d4af37", "#064e3b"],<br>
  description: "Rich botanical and vine patterns woven gracefully along edges."<br>
  },<br>
  {<br>
  id: "minimal_silver",<br>
  name: "Minimalist Silver Ribbon Border",<br>
  amharic: "ቀለል ያለ የብር ሪባን",<br>
  palette: ["#e2e8f0", "#94a3b8", "#d4af37"],<br>
  description: "Subtle, clean silver-thread geometric crosslines for understated elegance."<br>
  }<br>
  ];</p>
  <p>export default function CustomizePage() {<br>
  const [selectedGarment, setSelectedGarment] = useState<string>("bridal");<br>
  const [selectedFabric, setSelectedFabric] = useState<string>("menen_fine");<br>
  const [selectedEmbroidery, setSelectedEmbroidery] = useState<string>("gold_zari");</p>
  <p>const [measurements, setMeasurements] = useState({<br>
  height: "",<br>
  shoulder: "",<br>
  chest: "",<br>
  waist: "",<br>
  hip: "",<br>
  sleeve: "",<br>
  dressLength: ""<br>
  });</p>
  <p>const [customer, setCustomer] = useState({<br>
  name: "",<br>
  phone: "",<br>
  neededByDate: "",<br>
  deliveryType: "addis_pickup",<br>
  notes: ""<br>
  });</p>
  <p>const [isSubmitting, setIsSubmitting] = useState(false);<br>
  const [orderResult, setOrderResult] = useState<{ success: boolean; trackingCode: string } | null>(null);<br>
  const [copied, setCopied] = useState(false);</p>
  <p>const activeGarmentObj = garmentOptions.find((g) => <a href="http://g.id">g.id</a> === selectedGarment) || garmentOptions[0];<br>
  const activeFabricObj = fabricOptions.find((f) => <a href="http://f.id">f.id</a> === selectedFabric) || fabricOptions[0];<br>
  const activeEmbroideryObj = embroideryOptions.find((e) => <a href="http://e.id">e.id</a> === selectedEmbroidery) || embroideryOptions[0];</p>
  <p>const handleSubmit = async (e: React.FormEvent) => {<br>
  e.preventDefault();<br>
  if (!customer.phone) {<br>
  alert("Please provide your phone number");<br>
  return;<br>
  }</p>
  <pre><code>setIsSubmitting(true);

  try {
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

    if (data.success) {
      setOrderResult({ success: true, trackingCode: data.order.trackingCode });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const fallbackCode = `HK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderResult({ success: true, trackingCode: fallbackCode });
    }
  } catch {
    const fallbackCode = `HK-${Math.floor(100000 + Math.random() * 900000)}`;
    setIsSubmitting(false);
    setOrderResult({ success: true, trackingCode: fallbackCode });
  }
  </code></pre>
  <p>};</p>
  <p>const copyOrderSummary = () => {<br>
  if (!orderResult) return;<br>
  const summaryText = <code>*Habesha Kamis Bespoke Order*\nTracking: ${orderResult.trackingCode}\nGarment: ${activeGarmentObj.name}\nFabric: ${activeFabricObj.name}\nEmbroidery: ${activeEmbroideryObj.name}\nPhone: ${customer.phone}\nHeight: ${measurements.height}cm | Shoulder: ${measurements.shoulder}cm | Chest: ${measurements.chest}cm | Waist: ${measurements.waist}cm | Sleeve: ${measurements.sleeve}cm</code>;<br>
  navigator.clipboard.writeText(summaryText);<br>
  setCopied(true);<br>
  setTimeout(() => setCopied(false), 3000);<br>
  };</p>
  <p>return (<br>
  <div className="relative min-h-screen bg-[#07080a] text-white selection:bg-gold selection:text-black pb-28"></p>
  <pre><code>  {/* Background ambient glow */}
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
  </code></pre>
  <p>);<br>
  }</p>
  <p>]]><br>
  </file><br>
  <file name="app\gallery\page.tsx"></p>
  <![CDATA[
  "use client";

  import React, { useState, useEffect, Suspense } from "react";
  import Image from "next/image";
  import { useSearchParams, useRouter } from "next/navigation";
  import { 
    Sparkles,      // ✨ decoration / premium feel
    Phone,         // 📞 show phone number in contact section
    Send,          // ➤ submit / send button
    MapPin,        // 📍 show location / address
    X,             // ✖ close a modal or popup
    Maximize2,     // ⤢ expand image to fullscreen
    ChevronLeft,   // ‹ previous button in image slider
    ChevronRight,  // › next button in image slider
    Info,          // ℹ info tooltip or detail button
    CheckCircle,   // ✅ success or confirmed state
    HelpCircle,    // ❓ help or FAQ button
    Scissors,      // ✂ tailoring theme icon
    Ruler          // 📏 measurements theme icon
  } from "lucide-react"; // 👈 free icon library installed in your project

  // =========================================================================
  // MOCK DATA: 36 Luxury Habesha Kamis Designs
  // =========================================================================
  interface Design {
    id: string;
    name: string;
    amharicName: string;
    category: string; // 'family' | 'couple' | 'female' | 'male' | 'wedding' | 'Muslim'
    priceRange: string;
    description: string;
    images: string[];
    specs: {
      material: string;
      weaveTime: string;
      production: string;
    };
  }

  const mockDesigns: Design[] = [
    // WEDDING CATEGORY
    {
      id: "wd-1",
      name: "Royal Empress Bridal Set",
      amharicName: "ክብረ-ንግሥት የሙሽራ አልባሳት",
      category: "wedding",
      priceRange: "35,000 - 55,000 ETB",
      description: "Our signature bridal masterpiece. Hand-woven from fine Menen cotton, featuring triple-layered gold Tilf embroidery, encrusted with gold beads, and a sweeping royalty veil.",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "100% Fine Ethiopian Menen Cotton", weaveTime: "120 Hours", production: "3-4 Weeks" }
    },
    {
      id: "wd-2",
      name: "Axumite Golden Crown Gown",
      amharicName: "የአክሱም ወርቃማ አክሊል ቀሚስ",
      category: "wedding",
      priceRange: "30,000 - 45,000 ETB",
      description: "Inspired by ancient Axumite stone engravings. Displays thick geometric dark gold embroidery on pure white organic thread, styled for a modern luxury look.",
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Bespoke Spun Cotton & Silk Threads", weaveTime: "95 Hours", production: "3 Weeks" }
    },
    {
      id: "wd-3",
      name: "Red Sea Bridal Veil",
      amharicName: "ቀይ ባሕር የሙሽራ ድንቅ",
      category: "wedding",
      priceRange: "28,000 - 40,000 ETB",
      description: "An elegant wedding gown featuring crimson-red silk embroidery intertwined with high-grade metallic gold accents. Complete with matching Netela shawl.",
      images: [
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Menen Cotton with Red Silk Brocade", weaveTime: "80 Hours", production: "2-3 Weeks" }
    },
    {
      id: "wd-4",
      name: "Saba Palace Celebration gown",
      amharicName: "ንግሥተ ሳባ የቤተመንግሥት ቀሚስ",
      category: "wedding",
      priceRange: "40,000 - 60,000 ETB",
      description: "Fit for a queen. Hand-designed embroidery covering 60% of the dress bodice, following traditional Ethiopian royal patterns with golden embellishments.",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Premium Menen & Zari Thread", weaveTime: "140 Hours", production: "4-5 Weeks" }
    },

    // FAMILY CATEGORY
    {
      id: "fam-1",
      name: "Trinity Holiday Family Set",
      amharicName: "የሥላሴ በዓላት የቤተሰብ አልባሳት",
      category: "family",
      priceRange: "25,000 - 42,000 ETB (Set of 3)",
      description: "Designed for parents and children. Made with matching green, yellow, and red silk borders (Tilet) over pristine white cotton, symbolizing unity and celebration.",
      images: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Soft Organic Weft Cotton", weaveTime: "110 Hours total", production: "3 Weeks" }
    },
    {
      id: "fam-2",
      name: "Enkutatash Golden Harvest Set",
      amharicName: "የእንቁጣጣሽ አዲስ ዓመት ስብስብ",
      category: "family",
      priceRange: "22,000 - 35,000 ETB (Set of 3)",
      description: "Bright yellow and gold accents to celebrate the Ethiopian New Year. Hand-crafted using custom daisy motif patterns in the borders.",
      images: [
        "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Soft Weave Cotton & Harvest-Gold Silk", weaveTime: "90 Hours", production: "2 Weeks" }
    },
    {
      id: "fam-3",
      name: "Lasta Mountains Family Pack",
      amharicName: "የላስታ ተራሮች የቤተሰብ ልብሶች",
      category: "family",
      priceRange: "26,000 - 38,000 ETB (Set of 3)",
      description: "Traditional cotton knitwear with geometric patterns inspired by Lalibela's architecture. Perfect for family portraits during religious holidays.",
      images: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Warm-weave Heavy Cotton", weaveTime: "100 Hours", production: "3 Weeks" }
    },

    // COUPLES CATEGORY
    {
      id: "cpl-1",
      name: "Axum & Lalibela Majestic Set",
      amharicName: "አክሱም እና ላሊበላ የጥንዶች አልባሳት",
      category: "couple",
      priceRange: "24,000 - 36,000 ETB (Couple)",
      description: "Stunning coordination. The woman's dress is tapered with golden thread detailing, while the man's Kaftan vest uses matching gold tilet patterns along the neckline.",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Premium Menen Cotton & Gold Lurex", weaveTime: "90 Hours", production: "2-3 Weeks" }
    },
    {
      id: "cpl-2",
      name: "Modern Sheger Fusion Couple Suit",
      amharicName: "ዘመናዊ ሸገር የጥንዶች ፋሽን",
      category: "couple",
      priceRange: "20,000 - 30,000 ETB (Couple)",
      description: "For the contemporary couple. Shorter, slim-fit dress for her with green and gold borders, matched with a structured shirt and matching Netela trim for him.",
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Semi-Stretched Cotton Blend", weaveTime: "70 Hours", production: "2 Weeks" }
    },
    {
      id: "cpl-3",
      name: "Emperor & Empress Coronation Set",
      amharicName: "ንጉሣዊ ዘውድ የጥንዶች ልብስ",
      category: "couple",
      priceRange: "32,000 - 48,000 ETB (Couple)",
      description: "Heavily textured ceremonial outfits. Features traditional dark velvet fabric accents overlaid with hand-stitched gold silk embroidery.",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Cotton Menen & Royal Velvet Borders", weaveTime: "130 Hours", production: "3-4 Weeks" }
    },

    // GIRLS (FEMALE) CATEGORY
    {
      id: "fem-c1",
      name: "Golden Hibiscus Evening Kemis",
      amharicName: "የወርቅ አበባ ምሽት ቀሚስ",
      category: "female",
      priceRange: "14,000 - 20,000 ETB",
      description: "Flowing georgette layered skirt with a structured hand-woven cotton bodice. Embroidered with delicate golden hibiscus floral motifs.",
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Menen Cotton, Silk & Layered Georgette", weaveTime: "60 Hours", production: "10-12 Days" }
    },
    {
      id: "fem-c2",
      name: "Classic Gondar Shield Dress",
      amharicName: "ባህላዊ የጎንደር ጋሻ ቀሚስ",
      category: "female",
      priceRange: "12,000 - 18,000 ETB",
      description: "Originating from Northern Gondar. Features thick cotton weave with deep red, yellow, and black embroidery pattern. Classic high neckline.",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "100% Traditional Gondar Thread", weaveTime: "75 Hours", production: "2 Weeks" }
    },
    {
      id: "fem-c3",
      name: "Emerald Horizon Modern Tilet",
      amharicName: "ሀረግ አረንጓዴ ዘመናዊ ቀሚስ",
      category: "female",
      priceRange: "15,000 - 22,000 ETB",
      description: "A luxury gown showing rich emerald green silk tilet with gold outlines. Elegant side slit and lightweight, sheer Netela shawl included.",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Saba Premium Silk & Cotton Blend", weaveTime: "85 Hours", production: "2 Weeks" }
    },
    {
      id: "fem-c4",
      name: "Pearl White Ribbon Dress",
      amharicName: "ዕንቁ ነጭ የሪባን ቀሚስ",
      category: "female",
      priceRange: "11,500 - 16,000 ETB",
      description: "Pure white light cotton dress decorated with simple, minimalistic silver ribbons and crystal-white tilet borders. Lightweight and perfect for Sundays.",
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Hand-spun Light Cotton Yarn", weaveTime: "50 Hours", production: "7-10 Days" }
    },
    {
      id: "fem-c5",
      name: "Bale Mountain Red Rose Gown",
      amharicName: "የባሌ ተራራ ቀይ ፅጌሬዳ ቀሚስ",
      category: "female",
      priceRange: "16,000 - 23,000 ETB",
      description: "A luxurious evening dress featuring beautiful hand-woven red floral embroidery down the front seams, offset by a rich crimson sash.",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Premium Menen Cotton & Satin Liner", weaveTime: "90 Hours", production: "2 Weeks" }
    },
    {
      id: "fem-c6",
      name: "Blue Nile Cascade Gown",
      amharicName: "ጥቁር አባይ ባህላዊ ቀሚስ",
      category: "female",
      priceRange: "13,500 - 19,000 ETB",
      description: "Shining deep royal blue and gold embroidery representing the majestic flow of the Blue Nile River. High quality hand-woven fabric.",
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Menen Cotton with Royal Silk Thread", weaveTime: "70 Hours", production: "10-14 Days" }
    },

    // MALE CATEGORY
    {
      id: "mal-1",
      name: "Imperial Chencha Gabi & Vest",
      amharicName: "የጨንቻ ባህላዊ ጋቢና ሹራብ",
      category: "male",
      priceRange: "10,000 - 15,000 ETB",
      description: "Extra heavy, warm Gabi wrap woven in Chencha, paired with a matching embroidered cotton vest. A true gentleman's garment for formal heritage events.",
      images: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "100% Chencha Spun Heavy Cotton", weaveTime: "80 Hours", production: "12-14 Days" }
    },
    {
      id: "mal-2",
      name: "Modern Axum Kaftan Shirt",
      amharicName: "ዘመናዊ አክሱም ካፍታን ሸሚዝ",
      category: "male",
      priceRange: "7,000 - 11,000 ETB",
      description: "A comfortable, luxury cotton shirt with custom gold embroidery on the collar, chest plaque, and sleeves. Pairs beautifully with trousers.",
      images: [
        "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Bespoke Medium-Weave Cotton", weaveTime: "40 Hours", production: "7-10 Days" }
    },
    {
      id: "mal-3",
      name: "Patriarchal White Gabi wrap",
      amharicName: "ታላቁ የሽማግሌዎች ነጭ ጋቢ",
      category: "male",
      priceRange: "8,500 - 13,000 ETB",
      description: "Soft, quadruple-layered ceremonial blanket Gabi with elegant black and gold traditional edge embroidery. An item of supreme comfort and respect.",
      images: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Fine Carded Organic Cotton", weaveTime: "60 Hours", production: "8-10 Days" }
    },
    {
      id: "mal-4",
      name: "Ethiopian Lion Crest Kaftan",
      amharicName: "የኢትዮጵያ አንበሳ የባህል ሸሚዝ",
      category: "male",
      priceRange: "9,000 - 14,000 ETB",
      description: "Features a beautiful golden lion pattern woven directly into the fabric of this ceremonial collarless shirt. Traditional elegance for celebrations.",
      images: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Menen Cotton with gold silk brocade", weaveTime: "50 Hours", production: "8-10 Days" }
    },

    // MUSLIM CATEGORY
    {
      id: "mus-1",
      name: "Harar Royal Islamic Gown",
      amharicName: "የሐረር ሙስሊም የክብር አልባሳት",
      category: "Muslim",
      priceRange: "18,000 - 28,000 ETB",
      description: "Designed in Harar. Modest silhouette featuring a high neck, full long sleeves, and a gorgeous gold tilet pattern framing the hem and wrist cuffs. Comes with a matching silk hijab wrap.",
      images: [
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Linen-Cotton Blend & Luxury Chiffon Hijab", weaveTime: "75 Hours", production: "2 Weeks" }
    },
    {
      id: "mus-2",
      name: "Modest Emerald Abaya Kemis",
      amharicName: "ቀለል ያለ አረንጓዴ የባህል አባያ",
      category: "Muslim",
      priceRange: "16,500 - 24,000 ETB",
      description: "An open-front traditional abaya robe embellished with Ethiopian golden patterns along the edges. Worn over a lightweight under-dress.",
      images: [
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Georgette with Traditional Cotton Trim", weaveTime: "65 Hours", production: "12 Days" }
    },
    {
      id: "mus-3",
      name: "Golden Kaftan with Hood",
      amharicName: "ወርቃማ ኮፍያ ያለው ካፍታን",
      category: "Muslim",
      priceRange: "20,000 - 32,000 ETB",
      description: "Stately kaftan robe with an integrated hood. Accented with elaborate hand-woven golden patterns down the center closure, inspired by Eastern Ethiopian designs.",
      images: [
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Soft Weave Silk-Cotton Hybrid", weaveTime: "95 Hours", production: "3 Weeks" }
    },

    // ADDITIONAL ITEMS TO REACH 24+ (TOTAL 36 FOR DEMONSTRATING PAGINATION AND A COMPLETE LOOK)
    {
      id: "wd-5",
      name: "Ethiopian Sunrise Bridal Veil",
      amharicName: "የማለዳ ፀሐይ የሰርግ ልብስ",
      category: "wedding",
      priceRange: "29,000 - 41,000 ETB",
      description: "Features custom gradient silk tilet threads shading from deep red to bright yellow. Exquisite long train and handmade beadwork.",
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Sunrise Silk & Fine Menen Cotton", weaveTime: "90 Hours", production: "2-3 Weeks" }
    },
    {
      id: "fem-c7",
      name: "Sheba Silk Evening Dress",
      amharicName: "የንግሥት ሳባ የሀር ቀሚስ",
      category: "female",
      priceRange: "17,500 - 25,000 ETB",
      description: "Pure hand-spun silk combined with traditional cotton panels. The gold thread shines vividly under evening light.",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "100% Hand-Spun Silk & Gold Lurex", weaveTime: "80 Hours", production: "2 Weeks" }
    },
    {
      id: "fem-c8",
      name: "Lalibela Rose Cross Gown",
      amharicName: "የላሊበላ መስቀል ፅጌሬዳ ቀሚስ",
      category: "female",
      priceRange: "14,500 - 21,000 ETB",
      description: "Classic white gown with a Lalibela cross motif beautifully stitched into the center of the bodice in rose-gold silk thread.",
      images: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Soft Weave Menen Cotton", weaveTime: "70 Hours", production: "12-14 Days" }
    },
    {
      id: "mal-5",
      name: "Modern Gonder Knight Shirt",
      amharicName: "የጎንደር ፈረሰኛ የባህል ሸሚዝ",
      category: "male",
      priceRange: "7,500 - 12,000 ETB",
      description: "Traditional men's dress shirt featuring geometric shields embroidered down the sleeves. Elegant option for modern weddings.",
      images: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Carded Handloom Cotton", weaveTime: "45 Hours", production: "7-10 Days" }
    },
    {
      id: "fam-4",
      name: "Awash Valley Festive Family Pack",
      amharicName: "የአዋሽ ሸለቆ የቤተሰብ ስብስብ",
      category: "family",
      priceRange: "28,000 - 45,000 ETB (Set of 3)",
      description: "Vibrant yellow and green patterns woven with delicate gold borders. A stunning tribute to nature and spring celebrations.",
      images: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Soft organic combed cotton", weaveTime: "115 Hours", production: "3-4 Weeks" }
    },
    {
      id: "cpl-4",
      name: "Blue Nile Majesty Couple Set",
      amharicName: "ጥቁር አባይ የጥንዶች አልባሳት",
      category: "couple",
      priceRange: "26,000 - 40,000 ETB (Couple)",
      description: "Royal blue theme representing the Nile. Beautiful gown with wide tilet hem matched with groom shirt wearing parallel trim on chest.",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Cotton & Royal Silk Tilet Yarn", weaveTime: "95 Hours", production: "3 Weeks" }
    },
    {
      id: "mus-4",
      name: "Adama Golden Lace Kaftan",
      amharicName: "የአዳማ ወርቃማ ካፍታን ልብስ",
      category: "Muslim",
      priceRange: "19,500 - 30,000 ETB",
      description: "Modest long gown featuring golden floral lace patterns on cuffs and hood. Extremely breathable for warm holiday afternoons.",
      images: [
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Breathable Cotton-Linen", weaveTime: "75 Hours", production: "12-14 Days" }
    },
    {
      id: "wd-6",
      name: "Lalibela Eternal Vows Gown",
      amharicName: "የላሊበላ የቃልኪዳን ሰርግ ልብስ",
      category: "wedding",
      priceRange: "38,000 - 58,000 ETB",
      description: "Top-tier custom bridal outfit. Hand-woven using high-grade silk fibers mixed with golden threads. Features 4 layers of net lace.",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Superfine Menen, Silk Weft & Gold Zari", weaveTime: "150 Hours", production: "5 Weeks" }
    },
    {
      id: "fem-c9",
      name: "Semien Starry Sky Kemis",
      amharicName: "የሰሜን ኮከብ የምሽት ቀሚስ",
      category: "female",
      priceRange: "15,000 - 22,000 ETB",
      description: "Deep midnight blue dyed cotton base with shining silver and gold stars hand-stitched on the chest and lower tier.",
      images: [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Organic Cotton Yarn, Natural Indigo Dye", weaveTime: "85 Hours", production: "2 Weeks" }
    },
    {
      id: "mal-6",
      name: "Bale Senator White Kaftan",
      amharicName: "የባሌ አምባሳደር ነጭ ልብስ",
      category: "male",
      priceRange: "9,500 - 15,000 ETB",
      description: "A stately long kaftan jacket for men. Gold-rimmed embroidery along the double-breasted closure. A supreme luxury look.",
      images: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Premium Combed Heavy Cotton", weaveTime: "60 Hours", production: "10-12 Days" }
    },
    {
      id: "fam-5",
      name: "Rift Valley Green Forest Family Set",
      amharicName: "የሪፍት ቫሊ አረንጓዴ የቤተሰብ ልብስ",
      category: "family",
      priceRange: "27,000 - 40,000 ETB (Set of 3)",
      description: "Rich forest green borders styled with gold cross patterns. Premium holiday garments that celebrate growth and life.",
      images: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Soft Organic Weft Cotton & Green Silk", weaveTime: "105 Hours", production: "3 Weeks" }
    },
    {
      id: "cpl-5",
      name: "Imperial Court Couple Set",
      amharicName: "ንጉሣዊ ቤተመንግሥት የጥንዶች ልብስ",
      category: "couple",
      priceRange: "35,000 - 50,000 ETB (Couple)",
      description: "Inspired by late 19th-century royal garments. Intricate gold embroidery covers the cuffs, neck, and waistlines in thick velvet.",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Menen Cotton & Royal Red Velvet Trim", weaveTime: "140 Hours", production: "4 Weeks" }
    },
    {
      id: "mus-5",
      name: "Harar Sunset Embroidered Abaya",
      amharicName: "የሐረር ፀሐይ መግቢያ ባህላዊ አባያ",
      category: "Muslim",
      priceRange: "17,000 - 26,000 ETB",
      description: "Beautiful orange-gold sunset colors woven onto the hems and cuffs of this gorgeous loose-fitting traditional abaya.",
      images: [
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
      ],
      specs: { material: "Premium Crepe with Traditional Hand-weaving", weaveTime: "70 Hours", production: "12-14 Days" }
    }
  ];

  // =========================================================================
  // CATEGORIES LIST DEFINITION
  // =========================================================================
  const CATEGORIES_LIST = [
    { id: "ALL", label: "ALL", amharic: "ሁሉም" },
    { id: "family", label: "Family", amharic: "ቤተሰብ" },
    { id: "couple", label: "Couples", amharic: "ጥንዶች" },
    { id: "female", label: "Girls", amharic: "ሴቶች" },
    { id: "male", label: "Male", amharic: "ወንዶች" },
    { id: "Muslim", label: "Muslim", amharic: "ሙስሊም" },
    { id: "wedding", label: "Wedding", amharic: "ሰርግ" }
  ];

  const ITEMS_PER_PAGE = 24;

  // =========================================================================
  // MAIN PAGE COMPONENT (Wraps in Suspense for safe query param reading)
  // =========================================================================
  export default function GalleryPage() {
    return (
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0a0b0d] text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#d4af37] border-t-transparent"></div>
            <p className="font-serif text-sm tracking-widest text-[#d4af37] uppercase animate-pulse">Loading Collection...</p>
          </div>
        </div>
      }>
        <GalleryContent />
      </Suspense>
    );
  }

  function GalleryContent() {
    // =========================================================================
    // 1. URL NAVIGATION HOOKS (Next.js App Router)
    // =========================================================================
    // `useRouter()` gives us a `router` object to change the browser URL (e.g. redirecting pages).
    // `useSearchParams()` reads query parameters from the browser's URL bar (e.g. reading ?cat=wedding).
    // Why? This lets us read links from the homepage or share links that load a pre-filtered page!
    const router = useRouter();
    const searchParams = useSearchParams();

    // `searchParams.get("cat")` looks at the URL and extracts the value of the "cat" parameter.
    // Example: If the URL is "/gallery?cat=family", queryCat will be "family".
    // Example: If the URL is "/gallery", queryCat will be null (empty).
    const queryCat = searchParams.get("cat");

    // =========================================================================
    // 2. CATEGORY RESOLVER (getInitialCategory)
    // =========================================================================
    // This helper function reads the category from the URL and translates it into
    // the exact category key used in our mock data.
    const getInitialCategory = () => {
      // If there is no category in the URL, show "ALL" designs.
      if (!queryCat) return "ALL";

      // `.toLowerCase()` turns text to lowercase (e.g. "Family" -> "family").
      // `.trim()` removes any accidental empty spaces at the beginning or end.
      const normalized = queryCat.toLowerCase().trim();

      // EXPLANATION OF queryMapping:
      // Why is this needed? On the homepage, category cards link to "?cat=women's" or "?cat=couples".
      // But inside our mock data, categories are named "female", "couple", etc.
      // Without this mapping, clicking "Women's Collection" on the homepage would search for
      // category === "women's" in our database, which does not exist, showing an empty page.
      // So, queryMapping acts as a "translation dictionary" translating URL tag variations
      // into our internal database category keys.
      const queryMapping: { [key: string]: string } = {
        "family": "family",
        "couple": "couple",
        "couples": "couple",
        "girls": "female",
        "female": "female",
        "women": "female",
        "women's": "female",
        "woman": "female",
        "male": "male",
        "men": "male",
        "men's": "male",
        "man": "male",
        "muslim": "Muslim",
        "wedding": "wedding"
      };

      // If the URL value exists in our translation dictionary, return the translated database key.
      if (queryMapping[normalized]) {
        return queryMapping[normalized];
      }

      // Fallback: If it's not in our translation dictionary, search through the official
      // CATEGORIES_LIST to find a category where either the ID or the Label matches.
      const found = CATEGORIES_LIST.find(
        c => c.id.toLowerCase() === normalized || c.label.toLowerCase() === normalized
      );

      // If a match is found in CATEGORIES_LIST, return its ID (e.g. "female").
      // Otherwise, default to "ALL" to prevent showing a blank screen.
      return found ? found.id : "ALL";
    };

    // =========================================================================
    // 3. REACT STATE MANAGEMENT
    // =========================================================================

    // `activeCategory`: holds the string ID of the currently filtered category (e.g. "family", "female", "ALL").
    // Initial value is computed by getInitialCategory() so it syncs with the URL on load.
    const [activeCategory, setActiveCategory] = useState("ALL");

    // `currentPage`: holds the number of the current page for pagination (starts at page 1).
    const [currentPage, setCurrentPage] = useState(1);

    // EXPLANATION OF `useState<Design | null>(null)`:
    // - This is TypeScript syntax. The `<Design | null>` tells TypeScript that this state variable
    //   can hold either a complete `Design` object (when a dress is clicked) OR it can hold `null` (when no modal is open).
    // - The `(null)` inside the parentheses sets the initial value when the page first loads (no modal is open).
    const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

    // `activeImageIndex`: holds the index number of the image currently showing in the modal slideshow (default is 0, the first image).
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // `activeModalTab`: tracks which tab is open in the modal popup ("price", "order", "location", or "fabric").
    const [activeModalTab, setActiveModalTab] = useState<"price" | "order" | "location" | "fabric">("price");

    // =========================================================================
    // 4. SIMULATED OPERATION STATES (Telegram Bot & Form status)
    // =========================================================================
    // How and where do we use these status states?
    // They control user experience feedback during form submissions (spinners, success notices, disabling clicks).

    // - `isSubmittingInquiry`: Becomes `true` when a user clicks the "Ask Bot" price button. We use it to show a loading
    //   spinner on the button and disable it so they don't click it twice. It goes back to `false` when finished.
    // - `inquirySuccess`: Becomes `true` when the simulated price inquiry succeeds. In our HTML, we write:
    //   `{inquirySuccess ? <SuccessNotice /> : <InquiryButtons />}`. This hides the buttons and shows a green success box.
    const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
    const [inquirySuccess, setInquirySuccess] = useState(false);

    // - `isSubmittingOrder` & `orderSuccess` & `orderTracking`: These serve the exact same purpose as above, but for the 
    //   Bespoke Custom Measurements form. When `orderSuccess` is `true`, the form is hidden and a gold order summary
    //   box is displayed containing their unique tracking code (`orderTracking`).
    const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderTracking, setOrderTracking] = useState("");

    // =========================================================================
    // 5. CUSTOM MEASUREMENTS STATE
    // =========================================================================
    // This state holds the form values entered by the user for bespoke tailoring (shoulder, chest, waist, etc.).
    // When a user types in a field (e.g. shoulder), we update only that field using:
    // `setMeasurements({ ...measurements, shoulder: e.target.value })`
    // The `...measurements` (spread operator) copies all existing values (phone, chest, notes) so we don't erase them.
    const [measurements, setMeasurements] = useState({
      phone: "",
      chest: "",
      shoulder: "",
      waist: "",
      height: "",
      arm: "",
      notes: ""
    });

    // =========================================================================
    // 6. TOAST NOTIFICATION SYSTEM (Action Feedbacks)
    // =========================================================================
    // WHAT IS A TOAST? 
    // - In web design, a "toast" is a small alert banner that pops up briefly at the edge of the screen 
    //   and disappears automatically, like a piece of toast popping out of a toaster!
    // - We use it to show quick feedback messages (e.g. "Address copied!" or "Submitting...").
    // - `toasts` is an array of active notifications. The `<{ id, message, type }[]>` defines the object type.
    const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "info" }[]>([]);

    // Function to create a new toast notification on the screen
    const addToast = (message: string, type: "success" | "info" = "success") => {
      // Generate a short, unique random string for the toast ID (e.g. "a9f8s2")
      const id = Math.random().toString(36).substring(2, 9);

      // Add the new toast object to the state array.
      // `(prev)` refers to the previous list of toasts.
      // `[...prev, newToast]` copies the old list and appends the new toast to the end.
      setToasts((prev) => [...prev, { id, message, type }]);

      // Set a timer to automatically remove this toast after 4000 milliseconds (4 seconds).
      // It filters the array to keep all toasts EXCEPT the one with this specific ID.
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };

    // =========================================================================
    // 7. SYNCING URL PARAMS WITH REACT STATE (useEffect)
    // =========================================================================
    // WHAT IS useEffect?
    // - `useEffect` is a React hook that runs a side-effect function when variables in its dependency array change.
    // - The second parameter `[queryCat]` is the dependency array. It tells React: "Run this function only when the value
    //   of queryCat changes in the browser URL bar."
    // - Why? When a user clicks a link from the homepage, the URL updates, causing `queryCat` to change.
    //   This hook detects that change, resolves the category, updates the screen state (`setActiveCategory`), 
    //   and resets the page index back to 1.
    useEffect(() => {
      const initial = getInitialCategory();
      setActiveCategory(initial);
      setCurrentPage(1); // Reset page to 1 so they don't get stuck on page 2
    }, [queryCat]);

    // =========================================================================
    // 8. CATEGORY CLICK HANDLER (handleCategorySelect)
    // =========================================================================
    // This runs when a user manually clicks a category filter button at the top of the gallery page.
    // - "cat" is simply a short name for "category" in URL query parameters. It keeps the URL short and clean.
    // - `URLSearchParams` is a built-in browser helper to manage URL query variables (like ?cat=wedding&page=2).
    const handleCategorySelect = (catId: string) => {
      // Update local React states
      setActiveCategory(catId);
      setCurrentPage(1);

      // Read current query string and modify it
      const params = new URLSearchParams(window.location.search);
      if (catId === "ALL") {
        params.delete("cat"); // If ALL is selected, clean the URL (make it just /gallery)
      } else {
        params.set("cat", catId.toLowerCase()); // Otherwise, set ?cat=family, ?cat=couple, etc.
      }

      // Push the new URL to the browser bar without refreshing the page.
      // `{ scroll: false }` prevents Next.js from resetting scroll to the top of the browser page when the URL changes.
      router.push(`/gallery?${params.toString()}`, { scroll: false });
    };

    // =========================================================================
    // 9. DATA FILTERING
    // =========================================================================
    // NOTE: The rest of the file from here is mostly HTML layout and Tailwind CSS classes.
    // The actual programming logic is fully covered above! Don't let the styling markup overwhelm you!

    // If active category is "ALL", show all mock designs. Otherwise, filter designs that match the category ID.
    const filteredDesigns = activeCategory === "ALL" 
      ? mockDesigns 
      : mockDesigns.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

    // Pagination metrics
    const totalItems = filteredDesigns.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedDesigns = filteredDesigns.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      const gridElement = document.getElementById("gallery-grid-start");
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Simulated Telegram interactions
    const handleTelegramInquiry = (method: "bot" | "chat") => {
      if (method === "chat") {
        addToast("Connecting to Master Tailor Telegram...", "info");
        window.open("https://t.me/HabeshaKamisTailorShop", "_blank");
        return;
      }

      setIsSubmittingInquiry(true);
      setInquirySuccess(false);

      // Simulate Server-Action API call dispatching Telegram bot event
      setTimeout(() => {
        setIsSubmittingInquiry(false);
        setInquirySuccess(true);
        addToast("Price request dispatched to Telegram Bot!", "success");
      }, 1800);
    };

    // Submit Bespoke Tailoring Measurements
    const handleOrderSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!measurements.phone) {
        addToast("Phone number is required", "info");
        return;
      }

      setIsSubmittingOrder(true);
      setOrderSuccess(false);

      // Simulate database write & Telegram bot notification
      setTimeout(() => {
        const trackingCode = `HK-${Math.floor(100000 + Math.random() * 900000)}`;
        setIsSubmittingOrder(false);
        setOrderSuccess(true);
        setOrderTracking(trackingCode);
        addToast(`Tailoring request received! Code: ${trackingCode}`, "success");
      }, 2200);
    };

    return (
      <div className="relative min-h-screen bg-[#0a0b0d] text-white selection:bg-[#d4af37] selection:text-black pb-24">
        {/* Background radial gold/green glows */}
        <div className="absolute top-0 left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-[#d4af37]/3 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] -z-10 h-[700px] w-[700px] rounded-full bg-[#078732]/3 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[10%] -z-10 h-[600px] w-[600px] rounded-full bg-[#d4af37]/2 blur-[120px]" />

        {/* ========================================================================= */}
        {/* GALLERY HERO INTRODUCTION */}
        {/* ========================================================================= */}
        <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-8 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-[#d4af37]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Bespoke Atelier • ማዕከለ-ስዕላት
            </span>
            <span className="h-[1px] w-6 bg-[#d4af37]" />
          </div>
          <h1 className="font-serif text-4xl font-light tracking-[0.05em] md:text-6xl text-white">
            THE <span className="font-normal italic text-[#d4af37]">LUXURY</span> GALLERY
          </h1>
          <p className="mx-auto max-w-2xl text-xs md:text-sm text-gray-400 mt-4 leading-relaxed font-light">
            Browse our hand-woven traditional patterns and modern silhouettes. Every design is tailor-made to your physical shape. Order directly through Telegram or supply your measurements below.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* HORIZONTAL CATEGORY FILTER TABS */}
        {/* ========================================================================= */}
        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8 sticky top-20 z-40 bg-[#0a0b0d]/90 backdrop-blur-md border-y border-white/5">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center gap-2 md:gap-3 mx-auto">
              {CATEGORIES_LIST.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
                const count = cat.id === "ALL" 
                  ? mockDesigns.length 
                  : mockDesigns.filter(item => item.category.toLowerCase() === cat.id.toLowerCase()).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`group relative whitespace-nowrap px-5 py-2.5 rounded-sm text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 ${
                      isActive 
                        ? "text-black bg-[#d4af37] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.25)]" 
                        : "text-gray-400 border border-white/5 bg-[#0f1115]/50 hover:border-[#d4af37]/30 hover:text-white hover:bg-[#13151b]"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {cat.label}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-black/10 text-black font-bold" : "bg-white/5 text-gray-500 group-hover:text-[#d4af37]"
                      }`}>
                        {count}
                      </span>
                    </span>

                    {/* Amharic subtitle text displayed below buttons on hover/active on desktop */}
                    <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-[#d4af37] tracking-widest opacity-0 transition-opacity group-hover:opacity-100 hidden md:block ${
                      isActive ? "opacity-100 font-normal" : "font-light"
                    }`}>
                      {cat.amharic}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Grid boundary anchor for page scroll */}
        <div id="gallery-grid-start" className="h-4" />

        {/* ========================================================================= */}
        {/* GALLERY GRID (24 items per page) */}
        {/* ========================================================================= */}
        <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          {paginatedDesigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <HelpCircle className="h-12 w-12 text-[#d4af37] opacity-50 mb-4" />
              <h3 className="font-serif text-lg text-white">No Designs Found</h3>
              <p className="text-xs text-gray-400 mt-1">We are adding new handloomed garments shortly. Select another tab.</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-fade-in">
                {paginatedDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="group relative flex flex-col rounded-sm border border-white/5 bg-[#0e1014]/70 overflow-hidden transition-all duration-500 hover:border-[#d4af37]/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.06)]"
                  >
                    {/* Aspect-Ratio Box for Image */}
                    <div 
                      onClick={() => {
                        setSelectedDesign(design);
                        setActiveImageIndex(0);
                        setActiveModalTab("price");
                        setInquirySuccess(false);
                        setOrderSuccess(false);
                      }}
                      className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer bg-zinc-900"
                    >
                      <Image
                        src={design.images[0]}
                        alt={design.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Gradient shading */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/90 via-transparent to-transparent opacity-80" />

                      {/* Category Label Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold rounded-sm bg-[#0a0b0d]/80 border border-white/10 text-[#d4af37] backdrop-blur-md">
                          {design.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Hover Overlay Action (Magnifier Icon) */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          className="p-3 rounded-full bg-[#d4af37] text-black hover:scale-110 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition duration-300 mb-2"
                          aria-label="View design details"
                        >
                          <Maximize2 className="h-4.5 w-4.5 stroke-[2.5]" />
                        </button>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white">
                          View Bespoke Specs
                        </span>
                      </div>
                    </div>

                    {/* Card description details */}
                    <div className="p-5 flex-1 flex flex-col justify-between border-t border-white/5">
                      <div className="space-y-1">
                        <p className="text-[10px] text-[#d4af37]/80 tracking-widest font-light">{design.amharicName}</p>
                        <h3 className="font-serif text-sm font-normal text-white group-hover:text-[#d4af37] transition-colors duration-300">
                          {design.name}
                        </h3>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="uppercase tracking-widest text-gray-500">Price Range</span>
                          <span className="font-semibold text-[#d4af37] font-serif">{design.priceRange}</span>
                        </div>

                        {/* Immediate call to action triggers */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              setSelectedDesign(design);
                              setActiveImageIndex(0);
                              setActiveModalTab("price");
                              setInquirySuccess(false);
                              setOrderSuccess(false);
                            }}
                            className="py-2 text-[10px] uppercase tracking-wider font-medium text-gray-400 hover:text-white border border-white/10 hover:border-[#d4af37]/40 rounded-sm bg-[#0a0b0d]/50 transition duration-300"
                          >
                            Check Price
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDesign(design);
                              setActiveImageIndex(0);
                              setActiveModalTab("order");
                              setInquirySuccess(false);
                              setOrderSuccess(false);
                            }}
                            className="py-2 text-[10px] uppercase tracking-wider font-semibold text-black bg-[#d4af37] hover:bg-[#f3e5ab] hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] rounded-sm transition duration-300"
                          >
                            Order Fit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ========================================================================= */}
              {/* PAGINATION SECTION */}
              {/* ========================================================================= */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-white/5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2.5 rounded-sm border border-white/5 bg-[#0f1115] hover:border-[#d4af37]/30 hover:text-[#d4af37] disabled:opacity-30 disabled:pointer-events-none transition duration-300"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isCurrent = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`h-10 w-10 text-[11px] font-semibold tracking-wider rounded-sm transition duration-300 ${
                          isCurrent 
                            ? "bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
                            : "border border-white/5 bg-[#0f1115] hover:border-[#d4af37]/30 text-gray-400 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2.5 rounded-sm border border-white/5 bg-[#0f1115] hover:border-[#d4af37]/30 hover:text-[#d4af37] disabled:opacity-30 disabled:pointer-events-none transition duration-300"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* DESIGN DETAILS INTERACTIVE OVERLAY MODAL */}
        {/* ========================================================================= */}
        {selectedDesign && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
            onClick={() => setSelectedDesign(null)}
          >
            <div 
              className="relative w-full max-w-5xl rounded-sm border border-white/10 bg-[#0a0b0d] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white bg-black/60 hover:bg-black/90 border border-white/10 rounded-full transition duration-300"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Side: Dynamic Image Slideshow */}
                <div className="lg:col-span-6 bg-zinc-950 p-6 flex flex-col justify-center border-r border-white/5">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/5">
                    <Image
                      src={selectedDesign.images[activeImageIndex] || selectedDesign.images[0]}
                      alt={selectedDesign.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover transition-all duration-500"
                      priority
                    />

                    {/* Internal slide controller */}
                    {selectedDesign.images.length > 1 && (
                      <div className="absolute inset-x-4 bottom-4 flex justify-between items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-sm border border-white/5">
                        <button
                          onClick={() => setActiveImageIndex((prev) => (prev === 0 ? selectedDesign.images.length - 1 : prev - 1))}
                          className="text-white hover:text-[#d4af37] transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="text-[10px] uppercase tracking-widest text-gray-300">
                          {activeImageIndex + 1} of {selectedDesign.images.length} view angles
                        </span>
                        <button
                          onClick={() => setActiveImageIndex((prev) => (prev === selectedDesign.images.length - 1 ? 0 : prev + 1))}
                          className="text-white hover:text-[#d4af37] transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Thumbnails list below main display */}
                  {selectedDesign.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {selectedDesign.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm border transition-all duration-300 ${
                            index === activeImageIndex ? "border-[#d4af37] scale-95" : "border-white/5 hover:border-[#d4af37]/50"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${selectedDesign.name} angle ${index + 1}`}
                            fill
                            sizes="150px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side: Metadata specs and Booking forms */}
                <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between h-full bg-[#0d0e12]/60">
                  <div>
                    {/* Design Labels */}
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-medium">
                        {selectedDesign.category} Collection • {selectedDesign.amharicName}
                      </span>
                      <h2 className="font-serif text-2xl md:text-3xl text-white mt-1 leading-tight">
                        {selectedDesign.name}
                      </h2>
                      <p className="text-sm font-semibold text-[#d4af37] font-serif mt-2">{selectedDesign.priceRange}</p>
                    </div>

                    {/* Descriptions */}
                    <p className="text-xs md:text-sm text-gray-400 mt-4 leading-relaxed font-light">
                      {selectedDesign.description}
                    </p>

                    {/* Production specs tags */}
                    <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-white/5 bg-[#0a0b0d]/50 rounded-sm px-3 text-[10px]">
                      <div>
                        <span className="block text-gray-500 uppercase tracking-widest">Fabric Weave</span>
                        <span className="font-medium text-white block mt-0.5">{selectedDesign.specs.material}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 uppercase tracking-widest">Weaving hours</span>
                        <span className="font-medium text-white block mt-0.5">{selectedDesign.specs.weaveTime}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 uppercase tracking-widest">Studio timeline</span>
                        <span className="font-medium text-white block mt-0.5">{selectedDesign.specs.production}</span>
                      </div>
                    </div>

                    {/* Ordering Channels Tab Navigation */}
                    <div className="flex border-b border-white/5 mb-6 text-[10px] uppercase tracking-wider font-semibold">
                      <button
                        onClick={() => setActiveModalTab("price")}
                        className={`flex-1 pb-3 text-center transition-colors border-b-2 ${
                          activeModalTab === "price" ? "border-[#d4af37] text-[#d4af37]" : "border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        Inquire Price
                      </button>
                      <button
                        onClick={() => {
                          setActiveModalTab("order");
                          setOrderSuccess(false);
                        }}
                        className={`flex-1 pb-3 text-center transition-colors border-b-2 ${
                          activeModalTab === "order" ? "border-[#d4af37] text-[#d4af37]" : "border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        Bespoke Order
                      </button>
                      <button
                        onClick={() => setActiveModalTab("location")}
                        className={`flex-1 pb-3 text-center transition-colors border-b-2 ${
                          activeModalTab === "location" ? "border-[#d4af37] text-[#d4af37]" : "border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        In-Person
                      </button>
                      <button
                        onClick={() => setActiveModalTab("fabric")}
                        className={`flex-1 pb-3 text-center transition-colors border-b-2 ${
                          activeModalTab === "fabric" ? "border-[#d4af37] text-[#d4af37]" : "border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        Send Fabric
                      </button>
                    </div>

                    {/* Tab Body Modules */}
                    <div className="min-h-[225px]">
                      {/* TAB MODULE 1: INQUIRE PRICE */}
                      {activeModalTab === "price" && (
                        <div className="space-y-4">
                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            Select your inquiry channel. When connecting to our automated bot, your design interest is parsed instantly and sent to our master tailors.
                          </p>

                          {inquirySuccess ? (
                            <div className="p-4 rounded-sm border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-semibold">Request Logged</p>
                                <p className="text-[10px] text-emerald-400/80 mt-0.5">We have received your price request. Our master tailor will message your Telegram handle shortly.</p>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <button
                                disabled={isSubmittingInquiry}
                                onClick={() => handleTelegramInquiry("bot")}
                                className="group relative flex items-center justify-center gap-2 p-3 border border-[#d4af37]/20 hover:border-[#d4af37] hover:bg-[#d4af37]/5 rounded-sm transition duration-300 text-xs font-semibold text-[#d4af37] uppercase tracking-wider"
                              >
                                {isSubmittingInquiry ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent"></div>
                                ) : (
                                  <>
                                    <Send className="h-4 w-4" />
                                    <span>Telegram Bot (Fast)</span>
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleTelegramInquiry("chat")}
                                className="flex items-center justify-center gap-2 p-3 border border-white/5 hover:border-white/20 bg-white/5 rounded-sm transition duration-300 text-xs font-semibold text-white uppercase tracking-wider"
                              >
                                <Send className="h-4 w-4 rotate-45 text-[#24A1DE]" />
                                <span>Direct Telegram Chat</span>
                              </button>
                            </div>
                          )}

                          <div className="pt-4 border-t border-white/5 flex items-center gap-3 text-xs text-gray-400 bg-[#0a0b0d]/40 p-3 rounded-sm">
                            <Phone className="h-4 w-4 text-[#d4af37]" />
                            <div>
                              <p className="font-medium text-white">Call Shop Directly</p>
                              <p className="text-[10px] font-mono text-[#d4af37]">+251 911 234 567 / +251 908 765 432</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB MODULE 2: CUSTOM BESPOKE ORDER FORM */}
                      {activeModalTab === "order" && (
                        <div>
                          {orderSuccess ? (
                            <div className="p-5 rounded-sm border border-[#d4af37]/20 bg-[#d4af37]/5 text-[#d4af37] text-center space-y-3">
                              <CheckCircle className="h-8 w-8 mx-auto" />
                              <h3 className="font-serif text-sm font-semibold">Bespoke Design Logged</h3>
                              <p className="text-[10px] text-gray-300 max-w-sm mx-auto">
                                Your measurements have been dispatched to our tailoring studio. Use this tracking code on Telegram to confirm deposit option:
                              </p>
                              <div className="bg-black/60 border border-white/10 px-4 py-2 inline-block font-mono text-sm tracking-widest text-white rounded-sm select-all">
                                {orderTracking}
                              </div>
                              <p className="text-[9px] text-gray-400">Please copy and paste this code to our Telegram channel to finalize scheduling.</p>
                            </div>
                          ) : (
                            <form onSubmit={handleOrderSubmit} className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-1.5">Phone Number *</label>
                                  <input
                                    type="tel"
                                    required
                                    placeholder="e.g. 0911234567"
                                    value={measurements.phone}
                                    onChange={(e) => setMeasurements({...measurements, phone: e.target.value})}
                                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2 rounded-sm text-xs text-white placeholder:text-gray-400 font-medium outline-none transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-1.5">Height (cm)</label>
                                  <input
                                    type="number"
                                    placeholder="Base-to-head height"
                                    value={measurements.height}
                                    onChange={(e) => setMeasurements({...measurements, height: e.target.value})}
                                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2 rounded-sm text-xs text-white placeholder:text-gray-400 font-medium outline-none transition-all"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-4 gap-2">
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-gray-200 font-semibold mb-1 text-center" title="Shoulder-to-shoulder width">Shoulder</label>
                                  <input
                                    type="number"
                                    placeholder="cm"
                                    value={measurements.shoulder}
                                    onChange={(e) => setMeasurements({...measurements, shoulder: e.target.value})}
                                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-2 py-1.5 rounded-sm text-xs text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-gray-200 font-semibold mb-1 text-center" title="Chest circumference">Chest</label>
                                  <input
                                    type="number"
                                    placeholder="cm"
                                    value={measurements.chest}
                                    onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
                                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-2 py-1.5 rounded-sm text-xs text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-gray-200 font-semibold mb-1 text-center" title="Waist width">Waist</label>
                                  <input
                                    type="number"
                                    placeholder="cm"
                                    value={measurements.waist}
                                    onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
                                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-2 py-1.5 rounded-sm text-xs text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-gray-200 font-semibold mb-1 text-center" title="Arm sleeve length">Sleeve</label>
                                  <input
                                    type="number"
                                    placeholder="cm"
                                    value={measurements.arm}
                                    onChange={(e) => setMeasurements({...measurements, arm: e.target.value})}
                                    className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-2 py-1.5 rounded-sm text-xs text-white placeholder:text-gray-400 font-medium outline-none text-center transition-all"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-200 font-semibold mb-1.5">Tailor Instructions</label>
                                <textarea
                                  rows={2}
                                  placeholder="Silk color preferences, netela trim requests, pattern details..."
                                  value={measurements.notes}
                                  onChange={(e) => setMeasurements({...measurements, notes: e.target.value})}
                                  className="w-full bg-[#161922] border-2 border-white/20 focus:border-gold focus:bg-[#1a1f2c] focus:ring-1 focus:ring-gold/30 px-3.5 py-2 rounded-sm text-xs text-white placeholder:text-gray-400 font-medium outline-none resize-none transition-all"
                                />
                              </div>

                              <button
                                type="submit"
                                disabled={isSubmittingOrder}
                                className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-yellow-400 to-[#aa8010] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition duration-300 rounded-sm flex items-center justify-center gap-2"
                              >
                                {isSubmittingOrder ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                                ) : (
                                  <>
                                    <Scissors className="h-4 w-4" />
                                    <span>Submit Custom measurements</span>
                                  </>
                                )}
                              </button>
                            </form>
                          )}
                        </div>
                      )}

                      {/* TAB MODULE 3: IN PERSON CONSULTATION */}
                      {activeModalTab === "location" && (
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 bg-[#0a0b0d]/50 p-4 rounded-sm border border-white/5">
                            <MapPin className="h-5 w-5 text-[#d4af37] shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-semibold text-white">Habesha Kamis Atelier</h4>
                              <p className="text-[10px] text-gray-400 mt-1">Bole Medhanialem Mall, 3rd Floor, Suite 304, Addis Ababa, Ethiopia</p>
                              <p className="text-[9px] text-[#d4af37] font-semibold mt-1">Open: Mon - Sat (9:00 AM - 7:00 PM)</p>
                            </div>
                          </div>

                          <p className="text-xs text-gray-400 leading-relaxed font-light">
                            Prefer our master tailors to measure your silhouette? Book a consultation booking code on Telegram or display our interactive Google Maps coordinates.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a
                              href="https://maps.google.com/?q=Bole+Medhanialem,Addis+Ababa"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 p-3 border border-white/10 hover:border-[#d4af37] hover:text-[#d4af37] rounded-sm transition duration-300 text-xs font-semibold text-white uppercase tracking-wider"
                            >
                              <MapPin className="h-4 w-4" />
                              <span>Open Google Maps</span>
                            </a>
                            <button
                              onClick={() => {
                                addToast("Opening scheduling template...", "info");
                                window.open("https://t.me/HabeshaKamisTailorShop?text=Hello,%20I'd%20like%20to%20book%20an%20in-person%20measuring%20appointment.", "_blank");
                              }}
                              className="flex items-center justify-center gap-2 p-3 bg-[#d4af37] hover:bg-[#f3e5ab] text-black rounded-sm transition duration-300 text-xs font-semibold uppercase tracking-wider"
                            >
                              <Ruler className="h-4 w-4" />
                              <span>Book In-Person Fitting</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* TAB MODULE 4: SEND YOUR OWN FABRIC */}
                      {activeModalTab === "fabric" && (
                        <div className="space-y-4">
                          <div className="bg-[#0a0b0d]/50 p-4 rounded-sm border border-white/5 space-y-2">
                            <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                              <Info className="h-4 w-4 text-[#d4af37]" />
                              <span>Fabric Shipping Guidelines</span>
                            </h4>
                            <p className="text-[10px] text-gray-400 leading-relaxed">
                              Supply your own hand-spun organic cotton thread or traditional panels. Send them straight to our workshop, and our tailors will craft the silhouette.
                            </p>
                            <ul className="list-disc pl-4 text-[9px] text-gray-400 space-y-1">
                              <li>Minimum fabric width: 1.2 meters</li>
                              <li>Minimum fabric length: 5 meters for full gowns</li>
                              <li>Attach physical reference: <span className="font-semibold text-[#d4af37] font-mono">Bespoke Fabric - Order Ref</span></li>
                            </ul>
                          </div>

                          <div className="flex justify-between items-center bg-black/40 p-3 rounded-sm border border-white/5">
                            <div>
                              <p className="text-[9px] uppercase tracking-widest text-gray-500">Shipping Coordinator</p>
                              <p className="text-xs text-white font-medium">Biniam Yohannes (+251 912 345 678)</p>
                            </div>
                            <button
                              onClick={() => {
                                addToast("Address copied to clipboard", "success");
                                navigator.clipboard.writeText("Bole Medhanialem Mall, 3rd Floor, Suite 304, Addis Ababa, Ethiopia. Attention: Biniam Yohannes (+251 912 345 678)");
                              }}
                              className="text-[10px] text-[#d4af37] uppercase tracking-wider font-semibold border border-[#d4af37]/30 hover:border-[#d4af37] px-3 py-1.5 rounded-sm hover:bg-[#d4af37]/5 transition duration-300"
                            >
                              Copy Address
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer metadata info */}
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#d4af37]" /> Handloomed Traditional Heritage
                    </span>
                    <span>ID: {selectedDesign.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TOAST SYSTEM RENDERING */}
        {/* ========================================================================= */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-5 py-4 rounded-sm border shadow-2xl backdrop-blur-md transition-all duration-300 ${
                toast.type === "success" 
                  ? "bg-[#0c120e] border-emerald-500/20 text-emerald-400" 
                  : "bg-[#0d1014] border-[#d4af37]/30 text-[#d4af37]"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="h-5 w-5 shrink-0" />
              ) : (
                <Info className="h-5 w-5 shrink-0" />
              )}
              <p className="text-xs font-semibold tracking-wide">{toast.message}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  ]]>
  </file>
  <file name="app\globals.css">
  <![CDATA[
  @import "tailwindcss";
  <p>@theme {<br>
  --color-gold: #d4af37;<br>
  --color-gold-dark: #aa8010;<br>
  --color-gold-light: #f3e5ab;<br>
  --color-ethioGreen: #078732;<br>
  --color-ethioYellow: #fcd116;<br>
  --color-ethioRed: #e51f1f;<br>
  }</p>
  <p>body {<br>
  background-color: #0a0b0d; /* Premium luxury dark mode background */<br>
  color: #f3f4f6;<br>
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;<br>
  overflow-x: hidden;<br>
  }</p>
  <p>a {<br>
  text-decoration: none;<br>
  }</p>
  <p>/* Hide scrollbar for Chrome, Safari and Opera */<br>
  .no-scrollbar::-webkit-scrollbar {<br>
  display: none;<br>
  }</p>
  <p>/* Hide scrollbar for IE, Edge and Firefox <em>/<br>
  .no-scrollbar {<br>
  -ms-overflow-style: none;  /</em> IE and Edge <em>/<br>
  scrollbar-width: none;  /</em> Firefox */<br>
  }</p>
  <p>/* Custom sleek scrollbar for intentional scroll areas */<br>
  .custom-scrollbar::-webkit-scrollbar {<br>
  height: 4px;<br>
  width: 4px;<br>
  }<br>
  .custom-scrollbar::-webkit-scrollbar-track {<br>
  background: rgba(255, 255, 255, 0.03);<br>
  }<br>
  .custom-scrollbar::-webkit-scrollbar-thumb {<br>
  background: rgba(212, 175, 55, 0.3);<br>
  border-radius: 2px;<br>
  }<br>
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {<br>
  background: rgba(212, 175, 55, 0.6);<br>
  }<br>
  ]]><br>
  </file><br>
  <file name="app\layout.tsx"></p>
  <![CDATA[
  import type {Metadata} from "next";
  import "./globals.css"
  import Navbar from "@/components/Navbar";

  export const metadata: Metadata={
      title:"habshaKamsie",
      description:"",
  }

  export default function RootLayout({children} : {children: React.ReactNode }){
      return(
      <html lang="en" suppressHydrationWarning>
          <body>
              <Navbar/>
              <main>
              {children}
              </main>
          </body>
      </html>
      );
  }

  ]]>
  </file>
  <file name="app\our story\page.tsx">
  <![CDATA[
  "use client";
  <p>import OurStoryPage from "@/app/about/page";</p>
  <p>export default function OurStory() {<br>
  return <OurStoryPage />;<br>
  }<br>
  ]]><br>
  </file><br>
  <file name="app\page.tsx"></p>
  <![CDATA[
  "use client";

  import Image from "next/image";
  import Link from "next/link";

  export default function Homepage() {
    return (
      <div className="relative min-h-screen bg-[#0a0b0d] text-white selection:bg-gold selection:text-black pb-16">

        {/* Background ambient glows */}
        <div className="absolute top-[-10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-ethioGreen/5 blur-[120px]" />

        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 lg:pt-24 lg:pb-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Bespoke Traditional Tailors
              </span>
            </div>

            <h1 className="font-serif text-5xl font-normal leading-tight tracking-wide md:text-7xl">
              Timeless Heritage, <br />
              <span className="font-light italic text-gold">Perfecting Your</span> Fit.
            </h1>

            <p className="max-w-xl text-sm md:text-base leading-relaxed text-gray-400">
              Each Habesha Kemis tells a story of royalty. We hand-weave and custom-tailor premium traditional Ethiopian dresses, made exactly to your measurements for weddings, family gatherings, and holy days.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link
                href="/gallery"
                className="group relative px-8 py-4 rounded-sm bg-gold text-black font-semibold text-xs uppercase tracking-[0.2em] transition duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                Explore Collection →
              </Link>
              <Link
                href="/contact"
                className="group border border-white/20 px-8 py-4 rounded-sm hover:border-gold hover:text-gold text-xs uppercase tracking-[0.2em] transition duration-300"
              >
                Send Measurements
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/10 bg-zinc-900 shadow-2xl">
              <Image
                src="/hero_kemis.jpg"
                alt="Premium Habesha Kemis"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
          <div className="border-t border-b border-white/5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-serif text-2xl text-gold font-light">100%</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Hand-Woven</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-gold font-light">Bespoke</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Custom Fit</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-gold font-light">Direct</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Tailor Contact</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-gold font-light">Global</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Shipping Available</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CATEGORIES SECTION */}
        {/* ========================================================================= */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Collections</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-white">Our Masterpieces</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Bridal & Couples", desc: "Matching elegant sets for your special day.", img: "/hero_kemis.jpg" },
              { title: "Women's Kamiss", desc: "Intricate tilet designs and pure cotton weaves.", img: "/hero_kemis.jpg" },
              { title: "Men's Jano & Suits", desc: "Traditional and modern men's formal wear.", img: "/hero_kemis.jpg" },
              { title: "Family & Holiday Sets", desc: "Coordinated outfits for festive celebrations.", img: "/hero_kemis.jpg" }
            ].map((cat, i) => (
              <div key={i} className="group relative flex flex-col bg-zinc-900/40 border border-white/5 rounded-sm overflow-hidden hover:border-gold/30 transition">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    sizes="300px"
                    className="object-cover opacity-80 group-hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-lg text-white mb-2">{cat.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">{cat.desc}</p>
                  </div>
                  <Link
                    href="/gallery"
                    className="inline-block text-center px-4 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition uppercase text-[10px] tracking-widest font-semibold"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HOW IT WORKS SECTION */}
        {/* ========================================================================= */}
        <section className="relative bg-[#060709] border-t border-white/5 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Process</span>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-white">How It Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Choose Your Design", desc: "Browse our gallery and select the style that inspires you." },
                { step: "02", title: "Send Measurements", desc: "Provide your precise measurements online or visit our shop." },
                { step: "03", title: "Crafting & Delivery", desc: "We weave, tailor, and deliver your bespoke garment." }
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center">
                    <span className="font-serif text-2xl text-gold">{item.step}</span>
                  </div>
                  <h3 className="font-serif text-xl text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STORY SECTION */}
        {/* ========================================================================= */}
        <section className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center gap-16 bg-zinc-900/30 border border-white/5 p-8 lg:p-16 rounded-sm">
            <div className="flex-1 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Our Story</span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Rooted in Tradition, Crafted with Love</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                For generations, our family has preserved the art of Ethiopian hand-weaving. We bring the authentic Shiro Meda craftsmanship directly to you, ensuring every thread honors our rich cultural heritage.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-gray-200 transition rounded-sm"
                >
                  📍 View Shop Location
                </Link>
                <a
                  href="https://t.me/yourtelegrambot"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-[#0088cc] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#0077b3] transition rounded-sm flex items-center gap-2"
                >
                  💬 Chat on Telegram
                </a>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-white/10 bg-zinc-900">
                 {/* Optional story image placeholder */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10"/>
                 <Image
                   src="/hero_kemis.jpg"
                   alt="Our weaving process"
                   fill
                   className="object-cover filter brightness-75 grayscale"
                 />
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
  ]]>
  </file>
  <file name="data\activity.json">
  <![CDATA[
  [
    {
      "id": "act-1",
      "eventType": "order_created",
      "title": "New Bespoke Order Logged",
      "detail": "Customer Bethlehem Tadesse submitted measurements for Royal Empress Bridal Set (#HK-849201)",
      "timestamp": "2026-08-15T14:30:00.000Z"
    },
    {
      "id": "act-2",
      "eventType": "cloth_inquiry",
      "title": "Cloth Inquiry Received",
      "detail": "Rahel Mekonnen inquired about Royal Empress Bridal Set with custom emerald thread",
      "timestamp": "2026-08-15T10:15:00.000Z"
    },
    {
      "id": "act-3",
      "eventType": "gallery_view",
      "title": "Gallery Category Browsed",
      "detail": "Visitor browsed Wedding & Bridal collection (18 designs viewed)",
      "timestamp": "2026-08-15T09:42:00.000Z"
    },
    {
      "id": "act-4",
      "eventType": "customize_started",
      "title": "Bespoke Studio Session",
      "detail": "Visitor calculated measurements for Groom Kaftan & Gabi",
      "timestamp": "2026-08-14T18:20:00.000Z"
    },
    {
      "id": "act-5",
      "eventType": "contact_sent",
      "title": "Contact Message Sent",
      "detail": "Dawit Girma requested information for Enkutatash holiday family set",
      "timestamp": "2026-08-14T16:40:00.000Z"
    }
  ]
  <p>]]><br>
  </file><br>
  <file name="data\designs.json"></p>
  <![CDATA[
  [
    {
      "id": "wd-1",
      "name": "Royal Empress Bridal Set",
      "amharicName": "ክብረ-ንግሥት የሙሽራ አልባሳት",
      "category": "wedding",
      "priceRange": "35,000 - 55,000 ETB",
      "description": "Our signature bridal masterpiece. Hand-woven from fine Menen cotton, featuring triple-layered gold Tilf embroidery, encrusted with gold beads, and a sweeping royalty veil.",
      "images": [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
      ],
      "specs": {
        "material": "100% Fine Ethiopian Menen Cotton",
        "weaveTime": "120 Hours",
        "production": "3-4 Weeks"
      },
      "createdAt": "2026-08-01T10:00:00.000Z"
    },
    {
      "id": "wd-2",
      "name": "Axumite Golden Crown Gown",
      "amharicName": "የአክሱም ወርቃማ አክሊል ቀሚስ",
      "category": "wedding",
      "priceRange": "30,000 - 45,000 ETB",
      "description": "Displays thick geometric dark gold embroidery on pure white organic thread, styled for a modern luxury look.",
      "images": [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
      ],
      "specs": {
        "material": "Bespoke Spun Cotton & Silk Threads",
        "weaveTime": "95 Hours",
        "production": "3 Weeks"
      },
      "createdAt": "2026-08-02T11:00:00.000Z"
    },
    {
      "id": "fam-1",
      "name": "Trinity Holiday Family Set",
      "amharicName": "የሥላሴ በዓላት የቤተሰብ አልባሳት",
      "category": "family",
      "priceRange": "25,000 - 42,000 ETB",
      "description": "Designed for parents and children with matching green, yellow, and red silk borders over pristine white cotton.",
      "images": [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
      ],
      "specs": {
        "material": "Soft Organic Weft Cotton",
        "weaveTime": "110 Hours",
        "production": "3 Weeks"
      },
      "createdAt": "2026-08-03T12:00:00.000Z"
    },
    {
      "id": "cpl-1",
      "name": "Axum & Lalibela Majestic Set",
      "amharicName": "አክሱም እና ላሊበላ የጥንዶች አልባሳት",
      "category": "couple",
      "priceRange": "24,000 - 36,000 ETB",
      "description": "Stunning bridal coordination. Woman's dress is tapered with gold thread detailing, matched with groom's Kaftan vest.",
      "images": [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
      ],
      "specs": {
        "material": "Premium Menen Cotton & Gold Lurex",
        "weaveTime": "90 Hours",
        "production": "2-3 Weeks"
      },
      "createdAt": "2026-08-04T13:00:00.000Z"
    },
    {
      "id": "fem-c1",
      "name": "Golden Hibiscus Evening Kemis",
      "amharicName": "የወርቅ አበባ ምሽት ቀሚስ",
      "category": "female",
      "priceRange": "14,000 - 20,000 ETB",
      "description": "Flowing georgette layered skirt with a structured hand-woven cotton bodice, embroidered with golden floral motifs.",
      "images": [
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
      ],
      "specs": {
        "material": "Menen Cotton, Silk & Georgette",
        "weaveTime": "60 Hours",
        "production": "10-12 Days"
      },
      "createdAt": "2026-08-05T14:00:00.000Z"
    },
    {
      "id": "mal-1",
      "name": "Imperial Chencha Gabi & Vest",
      "amharicName": "የጨንቻ ባህላዊ ጋቢና ሹራብ",
      "category": "male",
      "priceRange": "10,000 - 15,000 ETB",
      "description": "Extra heavy, warm Gabi wrap woven in Chencha, paired with a matching embroidered cotton vest.",
      "images": [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
      ],
      "specs": {
        "material": "100% Chencha Spun Heavy Cotton",
        "weaveTime": "80 Hours",
        "production": "12-14 Days"
      },
      "createdAt": "2026-08-06T15:00:00.000Z"
    }
  ]

  ]]>
  </file>
  <file name="data\messages.json">
  <![CDATA[
  [
    {
      "id": "msg-101",
      "type": "cloth_inquiry",
      "customerName": "Rahel Mekonnen",
      "phone": "0911765432",
      "subject": "Royal Empress Bridal Set",
      "message": "Hi, I saw the Royal Empress Bridal Gown in your gallery. Can you do this in ivory with emerald green thread accents for an October wedding?",
      "action": "Price & Customization Inquiry",
      "status": "unread",
      "createdAt": "2026-08-15T10:15:00.000Z"
    },
    {
      "id": "msg-102",
      "type": "contact_message",
      "customerName": "Dawit Girma",
      "phone": "0922446688",
      "subject": "Family Set for Enkutatash",
      "message": "Looking for matching family set for 2 adults and 2 children (ages 4 and 7). Do you have size slots available before the holiday?",
      "action": "Holiday Booking Request",
      "status": "read",
      "createdAt": "2026-08-14T16:40:00.000Z"
    },
    {
      "id": "msg-103",
      "type": "cloth_inquiry",
      "customerName": "Semira Ahmed",
      "phone": "0933998877",
      "subject": "Modest Flow & Kaftan Elegance",
      "message": "Is it possible to order the Modest High-Neck dress with full-length inner lining for overseas delivery to London?",
      "action": "Diaspora Shipping Inquiry",
      "status": "replied",
      "createdAt": "2026-08-13T11:20:00.000Z"
    }
  ]
  <p>]]><br>
  </file><br>
  <file name="data\orders.json"></p>
  <![CDATA[
  [
    {
      "id": "ord-101",
      "trackingCode": "HK-849201",
      "customerName": "Bethlehem Tadesse",
      "phone": "0911234567",
      "occasion": "Wedding Reception",
      "garmentType": "Royal Empress Bridal Set",
      "fabric": "100% Fine Ethiopian Menen Cotton",
      "embroidery": "Royal Gold Zari Tilf",
      "measurements": {
        "height": "168",
        "shoulder": "39",
        "chest": "88",
        "waist": "70",
        "hip": "94",
        "sleeve": "58",
        "dressLength": "145"
      },
      "notes": "Please add a double layer Netela with matching gold trim for the church entrance.",
      "status": "in_production",
      "createdAt": "2026-08-10T14:30:00.000Z"
    },
    {
      "id": "ord-102",
      "trackingCode": "HK-629143",
      "customerName": "Yohannes Haile",
      "phone": "0922887766",
      "occasion": "Enkutatash Family Holiday",
      "garmentType": "Men's Kaftan & Matching Gabi",
      "fabric": "Heavyweight Chencha Cotton",
      "embroidery": "Festive Tricolor Unity Bands",
      "measurements": {
        "height": "180",
        "shoulder": "46",
        "chest": "102",
        "waist": "88",
        "hip": "100",
        "sleeve": "64",
        "dressLength": "105"
      },
      "notes": "Deliver before September 5th for New Year holiday.",
      "status": "accepted",
      "createdAt": "2026-08-12T09:15:00.000Z"
    }
  ]

  ]]>
  </file>
  <file name="data\settings.json">
  <![CDATA[
  {
    "shopName": "Habesha Kamis Tailor Shop",
    "amharicShopName": "ሐበሻ ቀሚስ የባህል አልባሳት",
    "phone1": "+251 911 234 567",
    "phone2": "+251 908 765 432",
    "telegram": "https://t.me/HabeshaKamisTailorShop",
    "telegramUsername": "@HabeshaKamisTailorShop",
    "email": "contact@habeshakamis.et",
    "address": "Bole Medhanialem Mall, 3rd Floor, Suite 304, Addis Ababa, Ethiopia",
    "openingHours": "Monday – Saturday: 9:00 AM – 7:00 PM (Sunday by Appointment)",
    "announcement": "Now accepting custom wedding bookings for the upcoming holiday season."
  }
  <p>]]><br>
  </file><br>
  </files></p>
  </body>
