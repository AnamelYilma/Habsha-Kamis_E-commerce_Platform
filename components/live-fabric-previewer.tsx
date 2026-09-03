"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Eye } from "lucide-react";

interface LiveFabricPreviewerProps {
  garmentName: string;
  garmentAmharic: string;
  fabricName: string;
  embroideryName: string;
  palette: string[];
}

export default function LiveFabricPreviewer({
  garmentName,
  garmentAmharic,
  fabricName,
  embroideryName,
  palette,
}: LiveFabricPreviewerProps) {
  const primaryColor = palette[0] || "#d4af37";
  const secondaryColor = palette[1] || "#078732";
  const accentColor = palette[2] || "#e51f1f";

  return (
    <div className="relative p-6 rounded-sm border-2 border-gold/40 bg-[#0f1117] shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">Live Dress Canvas Preview</span>
        </div>
        <span className="text-[10px] text-gray-400 font-mono uppercase">Interactive Studio</span>
      </div>

      {/* Visual Canvas Display */}
      <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-black border border-white/10 shadow-inner flex flex-col justify-between p-6">

        {/* Background Dress Model with Dynamic Tint/Pattern Blend Overlay */}
        <Image
          src="/hero_kemis.jpg"
          alt="Live Dress Canvas Preview"
          fill
          priority
          className="object-cover object-top filter brightness-90 transition-all duration-500"
        />

        {/* Dynamic Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${primaryColor}33 0%, transparent 70%), linear-gradient(135deg, ${secondaryColor}22 0%, ${accentColor}22 100%)`,
          }}
        />

        {/* Top Badge */}
        <div className="relative z-10 self-start">
          <span className="px-3 py-1 rounded-sm bg-black/70 backdrop-blur-md border border-gold/40 text-gold font-serif text-xs font-semibold">
            {garmentAmharic || "የሐበሻ ቀሚስ"}
          </span>
        </div>

        {/* Bottom Specs Pill */}
        <div className="relative z-10 p-4 rounded-sm bg-black/80 backdrop-blur-md border border-white/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-serif text-sm font-semibold text-white">{garmentName}</span>
            <div className="flex gap-1.5 items-center">
              {palette.map((c, i) => (
                <span key={i} className="h-3 w-3 rounded-full border border-white/40 shadow-sm" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-white/10">
            <div>
              <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Fabric</span>
              <span className="text-gray-200 font-medium truncate block">{fabricName}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Embroidery Motif</span>
              <span className="text-gold font-medium truncate block">{embroideryName}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
