"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/CtaButton";
import LoomThreads from "@/components/LoomThreads";

// Shape of ONE design coming from /api/designs (matches data/designs.json)
interface Design {
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
}

// Shape of the admin-controlled home page images (from data/settings.json)
const DEFAULT_HOME_IMAGES = {
  heroImage: "/hero_kemis.jpg",
  storyImage: "/hero_kemis.jpg",
  catImageWedding: "/hero_kemis.jpg",
  catImageFemale: "/hero_kemis.jpg",
  catImageMale: "/hero_kemis.jpg",
  catImageFamily: "/hero_kemis.jpg"
};

type HomeImages = typeof DEFAULT_HOME_IMAGES;

// Fetches real designs from data/designs.json via the public API and shows the first 6.
function FeaturedSection() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/designs")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data: Design[]) => {
        if (!cancelled) {
          setDesigns(data.slice(0, 6));
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // If loading or nothing came back, render nothing so the page stays clean
  if (isLoading || designs.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Latest Work</span>
        <h2 className="font-serif text-3xl md:text-5xl font-normal text-white">Fresh From The Loom</h2>
        <p className="mx-auto max-w-xl text-xs md:text-sm text-gray-400 leading-relaxed font-light">
          Our newest hand-woven creations, straight from the atelier.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {designs.map((design) => (
          <Link
            key={design.id}
            href={`/gallery?cat=${encodeURIComponent(design.category.toLowerCase())}`}
            className="group relative flex flex-col rounded-sm border border-white/5 bg-zinc-900/40 overflow-hidden transition hover:border-gold/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.08)]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
              <Image
                src={design.images[0]}
                alt={design.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-90 group-hover:scale-105 transition duration-700"
              />
            </div>
            <div className="p-6 space-y-2">
              <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">{design.category}</p>
              <h3 className="font-serif text-lg text-white group-hover:text-gold transition">{design.name}</h3>
              <p className="text-xs text-gold font-serif">{design.priceRange || "Unknown"}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center pt-4">
        <CtaButton
          href="/gallery"
          en="View Full Gallery"
          am="ሙሉ ጋለሪውን ይመልከቱ"
          variant="borderGold"
          className="px-8 py-4 text-[10px] tracking-widest"
        />
      </div>
    </section>
  );
}

// The focal motion: the hero garment turns toward the visitor like a mannequin.
// Pointer position drives a lerped 3D perspective tilt; a gold sheen travels
// across the fabric in the opposite direction, like light on silk.
// Disabled entirely for users who prefer reduced motion.
function HeroTiltImage({ src }: { src: string }) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const step = () => {
      const c = current.current;
      const t = target.current;
      // Lerp: move 7% of the remaining distance each frame → smooth, weighty feel
      c.x += (t.x - c.x) * 0.07;
      c.y += (t.y - c.y) * 0.07;

      if (frameRef.current) {
        frameRef.current.style.transform = `perspective(1100px) rotateX(${-c.y}deg) rotateY(${c.x}deg)`;
      }
      if (sheenRef.current) {
        sheenRef.current.style.transform = `translateX(${c.x * 8}%)`;
        sheenRef.current.style.opacity = String(Math.min(0.4, Math.abs(c.x) / 16));
      }

      // Stop the loop once settled — never burn frames while idle
      const settled = Math.abs(t.x - c.x) < 0.01 && Math.abs(t.y - c.y) < 0.01;
      if (settled) {
        rafId.current = null;
      } else {
        rafId.current = requestAnimationFrame(step);
      }
    };

    const kick = () => {
      if (rafId.current === null) rafId.current = requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 9;   // max ±4.5° yaw
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 7;  // max ±3.5° pitch
      kick();
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="flex-1 w-full max-w-md relative z-10" style={{ perspective: "1100px" }}>
      <div ref={frameRef} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        <div className="hk-float relative w-full max-h-[58vh] aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-zinc-900 shadow-[30px_40px_80px_rgba(0,0,0,0.6)]">
          <Image
            src={src}
            alt="Premium Habesha Kemis"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 500px"
          />
          {/* Traveling gold light on the fabric */}
          <div
            ref={sheenRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 bg-[linear-gradient(100deg,transparent_35%,rgba(243,229,171,0.22)_46%,rgba(212,175,55,0.38)_50%,rgba(243,229,171,0.22)_54%,transparent_65%)] bg-[length:260%_100%]"
            style={{ willChange: "transform, opacity" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Homepage() {
  const [homeImages, setHomeImages] = useState<HomeImages>(DEFAULT_HOME_IMAGES);

  // Load admin-controlled home page images from settings
  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && !data.error) {
          setHomeImages((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0b0d] text-white selection:bg-gold selection:text-black pb-16">
      
      {/* Background ambient glows — slowly drifting, like candlelight in the atelier */}
      <div className="hk-glow-a absolute top-[-10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-[#d4af37]/5 blur-[120px]" />
      <div className="hk-glow-b absolute top-[30%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-ethioGreen/5 blur-[120px]" />

      {/* ========================================================================= */}
      {/* HERO SECTION — real 3D golden cloth woven behind the headline */}
      {/* ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-6 min-h-[calc(100dvh-5rem)] lg:px-8 py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 content-center">
        {/* Loom weaving backdrop: threads drawn with pure SVG + CSS (works everywhere) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <LoomThreads />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/70 via-[#0a0b0d]/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0a0b0d]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-t from-transparent to-[#0a0b0d]/80" />
        </div>

        <div className="relative z-10 flex-1 space-y-5 lg:space-y-6">
          <div className="hk-fade-up inline-flex items-center gap-2" style={{ animationDelay: "0.1s" }}>
            <span className="h-[1px] w-8 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Bespoke Traditional Tailors
            </span>
          </div>

          {/* Staged reveal: each line rises out of its mask, like fabric pulled from the loom */}
          <h1 className="font-serif font-normal leading-[1.08] tracking-wide text-white text-[clamp(2.4rem,6vw,4.5rem)]">
            <span className="hk-mask">
              <span className="hk-rise" style={{ animationDelay: "0.2s" }}>Timeless Heritage,</span>
            </span>
            <span className="hk-mask">
              <span className="hk-rise font-light italic text-gold" style={{ animationDelay: "0.35s" }}>Perfecting Your</span>
            </span>
            <span className="hk-mask">
              <span className="hk-rise" style={{ animationDelay: "0.5s" }}>Fit.</span>
            </span>
          </h1>

          {/* The gold thread: one hairline drawing itself across after the headline lands */}
          <div
            aria-hidden
            className="hk-thread h-[1px] w-44 bg-gradient-to-r from-gold via-gold/60 to-transparent"
            style={{ animationDelay: "0.85s" }}
          />

          <p className="hk-fade-up max-w-xl text-sm md:text-base leading-relaxed text-gray-400" style={{ animationDelay: "0.7s" }}>
            Each Habesha Kemis tells a story of royalty. We hand-weave and custom-tailor premium traditional Ethiopian dresses, made exactly to your measurements for weddings, family gatherings, and holy days.
          </p>

          <div className="hk-fade-up flex flex-wrap gap-4 pt-1" style={{ animationDelay: "0.9s" }}>
            <CtaButton
              href="/gallery"
              en="Explore Collection"
              am="ስብስቦችን ይመልከቱ"
              variant="gold"
            />
            <CtaButton
              href="/contact"
              en="Send Measurements"
              am="መለኪያዎን ይላኩ"
              variant="outline"
            />
          </div>
        </div>

        <HeroTiltImage src={homeImages.heroImage} />
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

      {/* Featured designs pulled live from data/designs.json via /api/designs */}
      <FeaturedSection />

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
            { title: "Bridal & Couples", desc: "Matching elegant sets for your special day.", imgKey: "catImageWedding" as const },
            { title: "Women's Kamiss", desc: "Intricate tilet designs and pure cotton weaves.", imgKey: "catImageFemale" as const },
            { title: "Men's Jano & Suits", desc: "Traditional and modern men's formal wear.", imgKey: "catImageMale" as const },
            { title: "Family & Holiday Sets", desc: "Coordinated outfits for festive celebrations.", imgKey: "catImageFamily" as const }
          ].map((cat, i) => (
            <div key={i} className="group relative flex flex-col bg-zinc-900/40 border border-white/5 rounded-sm overflow-hidden hover:border-gold/30 transition">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={homeImages[cat.imgKey]}
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
                <CtaButton
                  href="/gallery"
                  en="View Collection"
                  am="ስብስቡን ይመልከቱ"
                  variant="borderGold"
                  className="w-full px-4 py-3 text-[10px] tracking-widest"
                />
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
              <CtaButton
                href="/contact"
                en="View Shop Location"
                am="የሱቅ አድራሻ"
                variant="white"
                className="px-6 py-3 tracking-widest"
              >
                📍
              </CtaButton>
              <CtaButton
                href="https://t.me/yourtelegrambot"
                en="Chat on Telegram"
                am="በቴሌግራም ያውሩ"
                variant="gradient"
                external
                className="px-6 py-3 tracking-widest"
              >
                💬
              </CtaButton>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-white/10 bg-zinc-900">
               {/* Optional story image placeholder */}
               <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10"/>
               <Image
                 src={homeImages.storyImage}
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