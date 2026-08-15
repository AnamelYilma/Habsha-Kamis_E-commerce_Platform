"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // If we are in the admin dashboard, hide the public customer navbar completely
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Customize", href: "/customize" },
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0f1115]/75 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group flex flex-col font-serif tracking-[0.2em] text-white"
            >
              <span className="text-lg font-semibold tracking-[0.25em] transition-colors group-hover:text-gold">
                HABESHA
              </span>
              <span className="text-[10px] tracking-[0.55em] text-gold font-light mt-[-2px]">
                KAMIS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-white ${
                    isActive ? "text-gold" : "text-gray-400"
                  }`}
                >
                  {link.name}
                  {/* Underline Animation */}
                  <span 
                    className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 hover:w-full"
                    }`} 
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Section: Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA Button */}
            <div className="hidden md:flex">
              <Link
                href="/customize"
                className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-xs uppercase tracking-[0.15em] text-black transition duration-300 ease-out rounded-sm bg-gradient-to-r from-gold via-yellow-400 to-gold-dark hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group"
              >
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative font-semibold">Bespoke Fit</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-sm text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0f1115]/95 backdrop-blur-md transition-all duration-300">
          <div className="space-y-1 px-6 pt-2 pb-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                    isActive ? "text-gold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/5">
              <Link
                href="/customize"
                onClick={() => setIsOpen(false)}
                className="relative flex items-center justify-center w-full py-3 overflow-hidden font-medium text-xs uppercase tracking-[0.15em] text-black rounded-sm bg-gradient-to-r from-gold via-yellow-400 to-gold-dark hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                <span className="relative font-semibold">Bespoke Fit</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}