"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, Scissors, Phone } from "lucide-react";

export default function MobileActionBar() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#0a0b0d]/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href="https://t.me/HabeshaKamisTailorShop"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-[#24A1DE] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:bg-[#1f8fc7] transition-all active:scale-[0.98]"
        >
          <Send className="h-4 w-4" />
          <span>Telegram</span>
        </a>

        <Link
          href="/customize"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-gradient-to-r from-gold via-yellow-400 to-gold-dark text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all active:scale-[0.98]"
        >
          <Scissors className="h-4 w-4" />
          <span>Bespoke Order</span>
        </Link>
      </div>
    </div>
  );
}
