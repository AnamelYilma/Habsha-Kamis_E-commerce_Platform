"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState("family");
  const [customFile, setCustomFile] = useState<string | null>(null);

  // References for horizontal scroll containers (allows smooth scroll via buttons)
  const familyScrollRef = useRef<HTMLDivElement>(null);
  const girlsScrollRef = useRef<HTMLDivElement>(null);
  const weddingScrollRef = useRef<HTMLDivElement>(null);
  const muslimScrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  // Mock list of 8 items per showcase section (using hero_kemis with different styling filters as placeholders)
  const generateShowcaseItems = (category: string, count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: `${category}-${i + 1}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Design #${i + 1}`,
      amharic: `የ${category === "girls" ? "ሴቶች" : category === "boys" ? "ወንዶች" : category} ዲዛይን ቁጥር ${i + 1}`,
      priceRange: "8,000 - 15,000 ETB",
      img: "/hero_kemis.jpg", // Using our generated high-quality asset
    }));
  };

  const sections = {
    family: generateShowcaseItems("family", 8),
    hersHis: generateShowcaseItems("individual", 8),
    wedding: generateShowcaseItems("wedding", 8),
    muslim: generateShowcaseItems("muslim", 8),
  };

  return (
    <div className="relative min-h-screen bg-[#0a0b0d] text-white selection:bg-gold selection:text-black">
      
      {/* Background ambient gold glows */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
      <div className="absolute top-[30%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-ethioGreen/5 blur-[120px]" />
      <div className="absolute top-[60%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-ethioYellow/3 blur-[120px]" />

      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-8 lg:pt-24 lg:pb-32 min-h-[90vh] flex items-center">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center w-full">
          
          {/* Left Column: Copywriting */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-8 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Bespoke traditional Tailors • ባህላዊ ልብስ
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
                className="group relative px-8 py-4 overflow-hidden rounded-sm bg-gold text-black font-semibold text-xs uppercase tracking-[0.2em] transition duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                <span className="relative z-10">Explore Gallery</span>
              </Link>
              <Link
                href="/about"
                className="group border border-white/20 px-8 py-4 rounded-sm hover:border-gold hover:text-gold text-xs uppercase tracking-[0.2em] transition duration-300"
              >
                Our Heritage
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
              <div>
                <p className="font-serif text-2xl text-gold font-light">100%</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Hand-Woven • በእጅ የተሸመነ</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-gold font-light">Bespoke</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Custom Fit • ልክዎትን ጠብቆ</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-gold font-light">Direct</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Telegram Inquiry</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="relative lg:col-span-5 flex justify-center lg:justify-end">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-gold/10 via-transparent to-transparent blur-2xl transform translate-x-4 translate-y-4" />
            <div className="relative aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-sm border border-white/10 bg-zinc-900 shadow-2xl transition duration-500 hover:border-gold/30 group">
              <Image
                src="/hero_kemis.jpg"
                alt="Premium Habesha Kemis Custom Dress"
                fill
                priority
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition duration-300 group-hover:opacity-40" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-sm bg-[#0a0b0d]/90 border border-white/5 backdrop-blur-md">
                <p className="text-[10px] text-gold uppercase tracking-[0.2em] font-medium">Featured Design</p>
                <h3 className="font-serif text-base font-normal text-white mt-1">Royal Gold Tilet Kemis</h3>
                <p className="text-xs text-gray-400 mt-0.5">Available for custom tailoring orders</p>
              </div>
            </div>
            <div className="absolute -left-4 -bottom-4 -z-10 h-24 w-24 border-l border-b border-gold/30" />
            <div className="absolute -right-4 -top-4 -z-10 h-24 w-24 border-r border-t border-gold/30" />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: 100DVH CATEGORY HUB (6 Categories) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center border-t border-white/5 py-12 bg-[#08090b]">
        <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 flex flex-col justify-between space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Select Styles • አማራጮች</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-white">Choose a Category</h2>
            <p className="text-xs md:text-sm text-gray-400">Click a card to filter our collection gallery.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Family & Holiday", amharic: "የቤተሰብ አልባሳት", href: "/gallery?cat=family", num: "01" },
              { name: "Couples & Bridal", amharic: "የጥንዶች አልባሳት", href: "/gallery?cat=couples", num: "02" },
              { name: "Women's Collection", amharic: "የሴቶች ልብሶች", num: "03" },
              { name: "Men's Wear", amharic: "የወንዶች ልብሶች", num: "04" },
              { name: "Muslim Traditional", amharic: "የሙስሊም አልባሳት", num: "05" },
              { name: "Wedding Exclusive", amharic: "የሰርግ አልባሳት", num: "06" }
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/gallery?cat=${cat.name.toLowerCase().split(" ")[0]}`}
                className="group relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-sm border border-white/5 bg-zinc-900/40 transition duration-300 hover:border-gold/30"
              >
                {/* Fallback traditional woven strip details */}
                <div className="absolute inset-0 bg-[#0f1115] transition-colors group-hover:bg-[#13151b]" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ethioGreen via-ethioYellow to-ethioRed opacity-50" />
                
                {/* Beautiful overlay texture */}
                <Image
                  src="/hero_kemis.jpg"
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105 opacity-20 group-hover:opacity-40 filter grayscale hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                  <span className="text-[10px] text-gold font-mono tracking-widest">{cat.num}</span>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gold uppercase tracking-[0.15em] font-medium">{cat.name}</p>
                    <h3 className="font-serif text-sm md:text-lg font-normal text-white">{cat.amharic}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: FAMILY & COUPLES HORIZONTAL SHOWCASE (20 Images) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center border-t border-white/5 py-12 bg-[#060709]">
        <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Matching Outfits • ጥንዶች እና ቤተሰብ</span>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-white mt-1">Family & Couples</h2>
            </div>
            
            {/* Actions: View All & Scroll */}
            <div className="flex items-center gap-4">
              <Link 
                href="/gallery?cat=family"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gold/30 rounded-sm text-xs text-gold hover:bg-gold hover:text-black transition duration-300 uppercase tracking-[0.15em] font-medium"
              >
                View All • ሁሉንም እይ →
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollLeft(familyScrollRef)}
                  className="p-3 border border-white/10 rounded-sm hover:border-gold hover:text-gold transition duration-300"
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button 
                  onClick={() => scrollRight(familyScrollRef)}
                  className="p-3 border border-white/10 rounded-sm hover:border-gold hover:text-gold transition duration-300"
                  aria-label="Scroll right"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Snap Scroll Box */}
          <div 
            ref={familyScrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth"
          >
            {sections.family.map((item) => (
              <div 
                key={item.id}
                className="relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start overflow-hidden rounded-sm border border-white/5 bg-[#0f1115] group"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="320px"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] text-gold tracking-widest uppercase">{item.title}</p>
                  <h3 className="font-serif text-base text-white font-normal mt-0.5">{item.amharic}</h3>
                  <p className="text-[10px] text-gray-400 mt-1">{item.priceRange}</p>
                </div>
              </div>
            ))}

            {/* Final Showcase Link Card */}
            <div className="relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start flex flex-col justify-center items-center rounded-sm border border-gold/20 bg-zinc-950 p-6 text-center space-y-6">
              <span className="text-3xl text-gold font-light">ቤተሰብ</span>
              <p className="text-xs text-gray-400 max-w-[200px]">View all matching holiday outfits and family designs.</p>
              <Link 
                href="/gallery?cat=family"
                className="px-6 py-3 bg-gold text-black uppercase tracking-[0.15em] text-[10px] font-semibold rounded-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition"
              >
                Full Collection →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: HERS & HIS INDIVIDUARY HORIZONTAL SHOWCASE */}
      {/* ========================================================================= */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center border-t border-white/5 py-12 bg-[#08090b]">
        <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Single Cuts • ወንዶች እና ሴቶች</span>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-white mt-1">Hers & His Individual</h2>
            </div>
            
            {/* Actions: View All & Scroll */}
            <div className="flex items-center gap-4">
              <Link 
                href="/gallery?cat=girls"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gold/30 rounded-sm text-xs text-gold hover:bg-gold hover:text-black transition duration-300 uppercase tracking-[0.15em] font-medium"
              >
                View All • ሁሉንም እይ →
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollLeft(girlsScrollRef)}
                  className="p-3 border border-white/10 rounded-sm hover:border-gold hover:text-gold transition duration-300"
                >
                  ←
                </button>
                <button 
                  onClick={() => scrollRight(girlsScrollRef)}
                  className="p-3 border border-white/10 rounded-sm hover:border-gold hover:text-gold transition duration-300"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div 
            ref={girlsScrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth"
          >
            {sections.hersHis.map((item) => (
              <div 
                key={item.id}
                className="relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start overflow-hidden rounded-sm border border-white/5 bg-[#0f1115] group"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="320px"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] text-gold tracking-widest uppercase">{item.title}</p>
                  <h3 className="font-serif text-base text-white font-normal mt-0.5">{item.amharic}</h3>
                  <p className="text-[10px] text-gray-400 mt-1">{item.priceRange}</p>
                </div>
              </div>
            ))}

            <div className="relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start flex flex-col justify-center items-center rounded-sm border border-gold/20 bg-zinc-950 p-6 text-center space-y-6">
              <span className="text-3xl text-gold font-light">ግልባጭ</span>
              <p className="text-xs text-gray-400 max-w-[200px]">View custom women's dresses and men's traditional jackets.</p>
              <Link 
                href="/gallery?cat=girls"
                className="px-6 py-3 bg-gold text-black uppercase tracking-[0.15em] text-[10px] font-semibold rounded-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition"
              >
                Explore All →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WEDDING EXCLUSIVE SHOWCASE */}
      {/* ========================================================================= */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center border-t border-white/5 py-12 bg-[#060709]">
        <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Bespoke Bridal • የሰርግ ልዩ ስብስብ</span>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-white mt-1">Wedding Showcase</h2>
            </div>
            
            {/* Actions: View All & Scroll */}
            <div className="flex items-center gap-4">
              <Link 
                href="/gallery?cat=wedding"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gold/30 rounded-sm text-xs text-gold hover:bg-gold hover:text-black transition duration-300 uppercase tracking-[0.15em] font-medium"
              >
                View All • ሁሉንም እይ →
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollLeft(weddingScrollRef)}
                  className="p-3 border border-white/10 rounded-sm hover:border-gold hover:text-gold transition duration-300"
                >
                  ←
                </button>
                <button 
                  onClick={() => scrollRight(weddingScrollRef)}
                  className="p-3 border border-white/10 rounded-sm hover:border-gold hover:text-gold transition duration-300"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div 
            ref={weddingScrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth"
          >
            {sections.wedding.map((item) => (
              <div 
                key={item.id}
                className="relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start overflow-hidden rounded-sm border border-white/5 bg-[#0f1115] group"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="320px"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] text-gold tracking-widest uppercase">{item.title}</p>
                  <h3 className="font-serif text-base text-white font-normal mt-0.5">{item.amharic}</h3>
                  <p className="text-[10px] text-gray-400 mt-1">{item.priceRange}</p>
                </div>
              </div>
            ))}

            <div className="relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start flex flex-col justify-center items-center rounded-sm border border-gold/20 bg-zinc-950 p-6 text-center space-y-6">
              <span className="text-3xl text-gold font-light">የሰርግ</span>
              <p className="text-xs text-gray-400 max-w-[200px]">View hand-woven royal gold and silver wedding collections.</p>
              <Link 
                href="/gallery?cat=wedding"
                className="px-6 py-3 bg-gold text-black uppercase tracking-[0.15em] text-[10px] font-semibold rounded-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition"
              >
                View Bridal →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: MUSLIM FESTIVE SHOWCASE */}
      {/* ========================================================================= */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center border-t border-white/5 py-12 bg-[#08090b]">
        <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Eid & Modest Weaves • የሙስሊም በዓላት</span>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-white mt-1">Muslim Showcase</h2>
            </div>
            
            {/* Actions: View All & Scroll */}
            <div className="flex items-center gap-4">
              <Link 
                href="/gallery?cat=muslim"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gold/30 rounded-sm text-xs text-gold hover:bg-gold hover:text-black transition duration-300 uppercase tracking-[0.15em] font-medium"
              >
                View All • ሁሉንም እይ →
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollLeft(muslimScrollRef)}
                  className="p-3 border border-white/10 rounded-sm hover:border-gold hover:text-gold transition duration-300"
                >
                  ←
                </button>
                <button 
                  onClick={() => scrollRight(muslimScrollRef)}
                  className="p-3 border border-white/10 rounded-sm hover:border-gold hover:text-gold transition duration-300"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div 
            ref={muslimScrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth"
          >
            {sections.muslim.map((item) => (
              <div 
                key={item.id}
                className="relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start overflow-hidden rounded-sm border border-white/5 bg-[#0f1115] group"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="320px"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] text-gold tracking-widest uppercase">{item.title}</p>
                  <h3 className="font-serif text-base text-white font-normal mt-0.5">{item.amharic}</h3>
                  <p className="text-[10px] text-gray-400 mt-1">{item.priceRange}</p>
                </div>
              </div>
            ))}

            <div className="relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start flex flex-col justify-center items-center rounded-sm border border-gold/20 bg-zinc-950 p-6 text-center space-y-6">
              <span className="text-3xl text-gold font-light">የሙስሊም</span>
              <p className="text-xs text-gray-400 max-w-[200px]">View modest custom Habesha wear perfect for Eid and weddings.</p>
              <Link 
                href="/gallery?cat=muslim"
                className="px-6 py-3 bg-gold text-black uppercase tracking-[0.15em] text-[10px] font-semibold rounded-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition"
              >
                View Muslim →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: CUSTOM REQUEST FORM (100dvh) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center border-t border-white/5 py-16 bg-[#060709]">
        <div className="mx-auto max-w-4xl w-full px-6 flex flex-col justify-center space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Bespoke Customizer • ልዩ ትዕዛዝ</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-white">Submit Custom Design</h2>
            <p className="text-xs md:text-sm text-gray-400">Provide measurements and design requests to our Telegram Bot.</p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Custom design submitted to Telegram channel!");
            }}
            className="space-y-6 rounded-sm border border-white/5 bg-[#0a0b0d]/50 p-6 md:p-10 backdrop-blur-md"
          >
            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gold uppercase tracking-widest font-medium">Full Name • ስም</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Almaz Bekele" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gold uppercase tracking-widest font-medium">Phone Number • ስልክ</label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. +251 911 000 000" 
                  className="w-full bg-[#0f1115] border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition"
                />
              </div>
            </div>

            {/* Row 2: Measurements Grid */}
            <div className="space-y-3">
              <span className="text-[10px] text-gold uppercase tracking-widest font-medium block">Measurements (Inches) • ልኮች በኢንች</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-500 block uppercase">Chest • ደረት</span>
                  <input type="number" placeholder="e.g. 36" className="w-full bg-[#0f1115] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-gold transition" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-500 block uppercase">Waist • ወገብ</span>
                  <input type="number" placeholder="e.g. 30" className="w-full bg-[#0f1115] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-gold transition" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-500 block uppercase">Sleeve • እጅጌ</span>
                  <input type="number" placeholder="e.g. 24" className="w-full bg-[#0f1115] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-gold transition" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-500 block uppercase">Height • ቁመት</span>
                  <input type="number" placeholder="e.g. 58" className="w-full bg-[#0f1115] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-gold transition" />
                </div>
              </div>
            </div>

            {/* Row 3: Design Description & Upload */}
            <div className="space-y-2">
              <label className="text-[10px] text-gold uppercase tracking-widest font-medium">Design Details • ማብራሪያ</label>
              <textarea 
                rows={3}
                placeholder="Mention patterns, embroidery colors (Tilet), or customized adjustments here..." 
                className="w-full bg-[#0f1115] border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition resize-none"
              />
            </div>

            {/* Visual File Uploader */}
            <div className="space-y-2">
              <label className="text-[10px] text-gold uppercase tracking-widest font-medium">Inspiration Photo • የናሙና ምስል</label>
              <div className="relative border border-dashed border-white/20 rounded-sm p-6 text-center hover:border-gold transition cursor-pointer bg-[#0f1115]/30">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCustomFile(e.target.files[0].name);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-1 text-center">
                  <p className="text-xs text-gray-300 font-medium">
                    {customFile ? `Selected: ${customFile}` : "Drag and drop or browse sample design"}
                  </p>
                  <p className="text-[9px] text-gray-500">Supports PNG, JPG (Max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative flex items-center justify-center py-4 overflow-hidden rounded-sm bg-gradient-to-r from-gold via-yellow-400 to-gold-dark text-black font-semibold text-xs uppercase tracking-[0.2em] transition hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            >
              Submit Order via Telegram • በቴሌግራም አዘዝ
            </button>
          </form>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/5 bg-[#040506] py-16 text-gray-500">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Info */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col font-serif tracking-[0.2em] text-white">
              <span className="text-lg font-semibold tracking-[0.25em] text-white">HABESHA</span>
              <span className="text-[10px] tracking-[0.55em] text-gold font-light mt-[-2px]">KAMIS</span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-400 max-w-[240px]">
              Custom traditional weaving and tailoring based in Shiro Meda, Addis Ababa. Making royal outfits for your special memories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] text-gold uppercase tracking-[0.2em] font-semibold">Explore</h4>
            <div className="flex flex-col space-y-2 text-xs">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <Link href="/gallery" className="hover:text-white transition">Gallery Grid</Link>
              <Link href="/about" className="hover:text-white transition">Our Story</Link>
              <Link href="/contact" className="hover:text-white transition">Location & Map</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-[10px] text-gold uppercase tracking-[0.2em] font-semibold">Contact</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p>📍 Shiro Meda Market, Addis Ababa</p>
              <p>📞 +251 911 000 000</p>
              <p>💬 Telegram Bot API Connected</p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h4 className="text-[10px] text-gold uppercase tracking-[0.2em] font-semibold">Business Hours</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p>Monday – Saturday: 8:00 AM – 7:00 PM</p>
              <p>Sunday: Closed</p>
              <div className="h-[2px] w-12 bg-gradient-to-r from-ethioGreen via-ethioYellow to-ethioRed mt-4" />
            </div>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px]">
          <p>© {new Date().getFullYear()} Habesha Kamis Tailoring. All rights reserved.</p>
          <p className="tracking-widest uppercase text-gold/60">Tradition • Elegance • Craftsmanship</p>
        </div>
      </footer>

    </div>
  );
}