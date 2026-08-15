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
