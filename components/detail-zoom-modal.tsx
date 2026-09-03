"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

interface DetailZoomModalProps {
  imageUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailZoomModal({ imageUrl, title, isOpen, onClose }: DetailZoomModalProps) {
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0f1117] border border-gold/40 rounded-sm overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <ZoomIn className="h-4 w-4 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Tilet Detail Inspector</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Zoom Area */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className="relative aspect-[3/4] sm:aspect-[4/3] w-full overflow-hidden bg-black cursor-crosshair"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className={`object-cover transition-transform duration-200 ${
              isHovered ? "scale-250" : "scale-100"
            }`}
            style={
              isHovered
                ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : { transformOrigin: "center center" }
            }
          />

          {!isHovered && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/30">
              <span className="px-4 py-2 rounded-sm bg-black/80 border border-gold/40 text-gold text-xs font-medium uppercase tracking-widest flex items-center gap-2 shadow-lg">
                <ZoomIn className="h-4 w-4" /> Move cursor/finger to inspect weaving
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 text-center text-xs text-gray-300">
          <p className="font-serif text-sm text-white">{title}</p>
          <p className="text-[10px] text-gold uppercase tracking-widest mt-0.5">Pure Hand-Woven Cotton &amp; Metallic Zari Thread</p>
        </div>

      </div>
    </div>
  );
}
