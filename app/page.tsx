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