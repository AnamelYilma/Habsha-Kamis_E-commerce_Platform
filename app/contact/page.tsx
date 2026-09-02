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
      {/* SECTION 1: HERO HEADER — compact, fits the first viewport */}
      {/* ===================================================================== */}
      <section className="relative mx-auto max-w-6xl px-6 pt-10 pb-6 lg:px-8 text-center min-h-[calc(100dvh-5rem)] flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 mb-3 mx-auto">
          <span className="h-[1px] w-8 bg-gold/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Get In Touch
          </span>
          <span className="h-[1px] w-8 bg-gold/60" />
        </div>

        <h1 className="font-serif font-normal text-white max-w-3xl mx-auto leading-[1.1] text-[clamp(2rem,5vw,3.5rem)]">
          Visit Our Atelier or <br />
          <span className="italic font-light text-gold">Inquire with Our</span> Tailors.
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
          Whether you need a bespoke wedding gown, a matching family holiday set, or an in-person measurement fitting, 
          our tailoring team is here to assist you.
        </p>

        {/* Quick contact shortcuts so the first screen is actionable */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://t.me/HabeshaKamisTailorShop"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen px-7 py-3.5 rounded-sm bg-gradient-to-r from-gold via-yellow-400 to-gold-dark text-black font-semibold text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition duration-300"
          >
            💬 Chat on Telegram
          </a>
          <a
            href="tel:+251911234567"
            className="border border-white/20 px-7 py-3.5 rounded-sm hover:border-gold hover:text-gold text-xs uppercase tracking-[0.2em] transition duration-300"
          >
            📍 Call / Directions
          </a>
        </div>
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
              <div className="h-10 w-10 rounded-sm bg-gold/15 border border-gold/40 flex items-center justify-center mb-4">
                <Send className="h-5 w-5 text-gold" />
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
                      <option value="Men's Kaftan & Gabi" className="bg-[#161922] text-white">Men&apos;s Kaftan &amp; Gabi</option>
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
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">Common Inquiries</span>
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
