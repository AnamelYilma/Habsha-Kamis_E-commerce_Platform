"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";

// =========================================================================
// STATIC CONTENT
// =========================================================================

interface CraftStage {
  step: string;
  title: string;
  description: string;
}

const craftStages: CraftStage[] = [
  {
    step: "01",
    title: "Raw Cotton to Spun Thread",
    description:
      "It starts with pure Ethiopian cotton, carded by hand and spun on a traditional spindle into fine, breathable thread.",
  },
  {
    step: "02",
    title: "The Shemane's Wooden Loom",
    description:
      "Master weavers sit at ancestral pit-looms, passing the shuttle thread by thread to create soft Shemma cloth.",
  },
  {
    step: "03",
    title: "Tibeb: Meaning in the Borders",
    description:
      "Colored silk and gold threads are woven into the borders — green for the land, red for strength, gold for celebration.",
  },
];

interface StyleCard {
  id: string;
  name: string;
  desc: string;
  galleryCat: string;
}

const heritageStyles: StyleCard[] = [
  {
    id: "bridal",
    name: "Royal Bridal & Zari Tilf",
    desc: "Heavy gold & silk wedding weave with flowing ceremonial Netela.",
    galleryCat: "wedding",
  },
  {
    id: "holiday",
    name: "Festive Unity Borders",
    desc: "Green, yellow & red woven motifs for matching family sets.",
    galleryCat: "family",
  },
  {
    id: "modest",
    name: "Modest Flow & Kaftan Elegance",
    desc: "High-neck grace, long sleeves and refined tilet embroidery.",
    galleryCat: "muslim",
  },
  {
    id: "handloom",
    name: "Ancestral Gabi & Handloom",
    desc: "Heavyweight combed cotton gabi and men's kaftan shirts.",
    galleryCat: "male",
  },
];

interface Milestone {
  era: string;
  title: string;
  story: string;
}

const journeyMilestones: Milestone[] = [
  {
    era: "The Beginning",
    title: "A Skill Passed Down Quietly",
    story:
      "It started as a cherished family skill — a tape measure, tailor shears, and hours perfecting single stitch lines for neighbors and friends.",
  },
  {
    era: "Weddings",
    title: "Dressing Brides for Meaningful Days",
    story:
      "Our workshop grew into a trusted atelier for brides and grooms — each garment hand-fitted and delivered on the morning of their big day.",
  },
  {
    era: "Family Traditions",
    title: "Dressing Generations in Harmony",
    story:
      "Matching sets for grandparents, parents and children celebrating holidays together — synchronized traditional colors remain our greatest joy.",
  },
  {
    era: "Across Borders",
    title: "Reaching the Worldwide Diaspora",
    story:
      "Tailored in Addis Ababa and shipped to weddings across North America, Europe and the Middle East — connecting Ethiopians everywhere with home.",
  },
];

// =========================================================================
// COMPONENT
// =========================================================================
export default function OurStoryPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0b0d] text-white selection:bg-gold selection:text-black overflow-hidden pb-28">

      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl rounded-full bg-gold/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] -left-32 -z-10 h-[500px] w-[500px] rounded-full bg-ethioGreen/5 blur-[130px] pointer-events-none" />

      {/* ===================================================================== */}
      {/* SECTION 1: HERO — complete within the first viewport */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 pt-10 pb-10 lg:px-8 text-center min-h-[calc(100dvh-5rem)] flex flex-col justify-center">

        <div className="inline-flex items-center gap-2 mb-4">
          <span className="h-[1px] w-8 bg-gold/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Our Heritage • Est. 2004
          </span>
          <span className="h-[1px] w-8 bg-gold/60" />
        </div>

        <h1 className="font-serif font-normal leading-[1.08] tracking-wide text-white max-w-4xl mx-auto text-[clamp(2rem,5vw,3.75rem)]">
          A Habesha Kemis is <br className="hidden sm:inline" />
          <span className="italic font-light text-gold">Never Just</span> a Dress.
        </h1>

        <p className="mt-5 text-sm sm:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
          Pure raw cotton, spun by hand, woven on traditional looms. For more than twenty years our
          workshop has dedicated itself to this living craft — tailoring each piece to fit your
          silhouette with respect and care.
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 mt-8 border-t border-white/10 max-w-4xl mx-auto">
          {[
            { value: "20+", label: "Years of Tailoring" },
            { value: "100%", label: "Hand-Woven Shemma" },
            { value: "0", label: "Mass Production" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center p-4 rounded-sm bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors">
              <span className="font-serif text-2xl sm:text-3xl text-gold font-light">{m.value}</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-300 mt-1">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: THE CRAFT — 3 SIMPLE STEPS */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 border-t border-white/5">
        <SectionHeader eyebrow="The Craft" title="How Shemma is Born" titleClassName="text-3xl sm:text-4xl" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {craftStages.map((stage) => (
            <div
              key={stage.step}
              className="relative p-8 rounded-sm bg-[#0e1015]/80 border border-white/5 transition-all duration-300 hover:border-gold/30 hover:bg-[#12141a] group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-sm text-gold tracking-widest">{stage.step}</span>
              </div>
              <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">
                {stage.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mt-4 font-light">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: STYLES — SIMPLE CARD GRID LINKING TO GALLERY */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 border-t border-white/5">
        <SectionHeader eyebrow="Bespoke Varieties" title="Traditions Woven for Every Occasion" titleClassName="text-3xl sm:text-4xl" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {heritageStyles.map((item) => (
            <Link
              key={item.id}
              href={`/gallery?cat=${item.galleryCat}`}
              className="group p-8 rounded-sm bg-[#0e1015]/70 border border-white/5 hover:border-gold/40 hover:bg-[#12141a] transition-all duration-300 flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-3 font-light">
                  {item.desc}
                </p>
                <span className="inline-block mt-5 text-[10px] uppercase tracking-widest text-gold font-semibold group-hover:translate-x-1 transition-transform">
                  View in Gallery →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: OUR JOURNEY */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 border-t border-white/5">
        <SectionHeader eyebrow="Our Story" title="Twenty Years of Tailoring" titleClassName="text-3xl sm:text-5xl" />

        <p className="text-center text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto mt-6 leading-relaxed font-light">
          We have dressed brides, families and elders at home and across oceans.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {journeyMilestones.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-sm bg-[#0e1015]/70 border border-white/5 hover:border-gold/30 hover:bg-[#12141a] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-white/5 text-gold border border-white/5">
                  {item.era}
                </span>
              </div>
              <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors mt-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-4 font-light">
                {item.story}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: CLOSING CTA */}
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
            Every dress is still made by hand, measured to fit one person, not a size chart.
            Making something you will wear on a day you will remember.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <CtaButton
              href="/gallery"
              en="Explore Full Gallery"
              am="ሙሉ ጋለሪውን ይመልከቱ"
              variant="gradient"
            />
            <CtaButton
              href="/contact"
              en="Visit Our Atelier"
              am="ቤቴን ይጎብኙ"
              variant="outline"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  titleClassName = "text-3xl md:text-5xl",
}: {
  eyebrow: string;
  title: string;
  titleClassName?: string;
}) {
  return (
    <div className="space-y-3 text-center mx-auto">
      <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">{eyebrow}</span>
      <h2 className={`font-serif font-normal text-white leading-tight ${titleClassName}`}>{title}</h2>
    </div>
  );
}
