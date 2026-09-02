/**
 * Loom Threads — pure SVG + CSS animated weaving backdrop for the hero.
 * Bold flowing golden threads weave across like fabric on a shemma loom,
 * with bright glowing shuttle lights travelling over them non-stop.
 * No JavaScript loop, no WebGL: runs on every browser and degrades gracefully.
 */

interface WeftThread {
  y: number;
  d: string;
  delay: number;
  duration: number;
  reverse: boolean;
  opacity: number;
  width: number;
}

const WEFT_THREADS: WeftThread[] = [
  {
    y: 110,
    d: "M -60 110 C 240 88, 480 132, 720 108 S 1080 92, 1260 112",
    delay: 0,
    duration: 2.8,
    reverse: false,
    opacity: 0.55,
    width: 2.6,
  },
  {
    y: 225,
    d: "M -60 225 C 220 248, 500 202, 760 226 S 1060 244, 1260 222",
    delay: 0.3,
    duration: 3.1,
    reverse: true,
    opacity: 0.4,
    width: 2.1,
  },
  {
    y: 340,
    d: "M -60 340 C 260 318, 520 360, 780 338 S 1090 326, 1260 342",
    delay: 0.6,
    duration: 2.9,
    reverse: false,
    opacity: 0.48,
    width: 2.4,
  },
  {
    y: 455,
    d: "M -60 455 C 230 476, 510 436, 750 458 S 1070 472, 1260 454",
    delay: 0.15,
    duration: 3.3,
    reverse: true,
    opacity: 0.38,
    width: 2,
  },
  {
    y: 570,
    d: "M -60 570 C 250 548, 490 592, 730 568 S 1080 556, 1260 572",
    delay: 0.75,
    duration: 2.7,
    reverse: false,
    opacity: 0.46,
    width: 2.3,
  },
  {
    y: 685,
    d: "M -60 685 C 240 706, 500 664, 770 688 S 1060 700, 1260 684",
    delay: 0.45,
    duration: 3.1,
    reverse: true,
    opacity: 0.36,
    width: 2,
  },
];

const WARP_PATHS = [
  { x: 90, bend: 10 },
  { x: 235, bend: -12 },
  { x: 380, bend: 8 },
  { x: 525, bend: -10 },
  { x: 670, bend: 12 },
  { x: 815, bend: -8 },
  { x: 960, bend: 10 },
  { x: 1105, bend: -11 },
];

const SHUTTLES = [
  { y: 340, duration: 4.5, delay: 0.6, opacity: 0.95, width: 3 },
  { y: 110, duration: 5.5, delay: 2.2, opacity: 0.8, width: 2.6 },
  { y: 570, duration: 6.5, delay: 3.4, opacity: 0.85, width: 2.8 },
];

export default function LoomThreads() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="hk-thread-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="hk-thread-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d4af37" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#f3e5ab" stopOpacity="1" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Glow underlay: same threads, blurred, gives the fabric its light */}
      <g stroke="#d4af37" fill="none" strokeLinecap="round" filter="url(#hk-thread-glow)" opacity="0.5">
        {WEFT_THREADS.map((t) => (
          <path key={`glow-${t.y}`} className="hk-weft-line" data-dir={t.reverse ? "rev" : "fwd"} d={t.d} strokeWidth={t.width * 2.4} strokeOpacity={t.opacity * 0.7} pathLength={1} style={{ animationDelay: `${t.delay}s`, animationDuration: `${t.duration}s` }} />
        ))}
      </g>

      {/* Warp: vertical threads easing down into place */}
      <g stroke="#d4af37" fill="none" strokeLinecap="round">
        {WARP_PATHS.map((w, i) => (
          <path
            key={`warp-${w.x}`}
            className="hk-warp-line"
            d={`M ${w.x} -40 C ${w.x + w.bend} 200, ${w.x - w.bend} 450, ${w.x} 840`}
            strokeWidth={1.4}
            opacity={0.2 + (i % 3) * 0.04}
            pathLength={1}
            style={{ animationDelay: `${0.2 + i * 0.18}s`, animationDuration: "3s" }}
          />
        ))}
      </g>

      {/* Weft: the bold woven threads drawing themselves across */}
      <g stroke="url(#hk-thread-fade)" fill="none" strokeLinecap="round">
        {WEFT_THREADS.map((t) => (
          <path key={`weft-${t.y}`} className="hk-weft-line" data-dir={t.reverse ? "rev" : "fwd"} d={t.d} strokeWidth={t.width} strokeOpacity={t.opacity} pathLength={1} style={{ animationDelay: `${t.delay}s`, animationDuration: `${t.duration}s` }} />
        ))}
      </g>

      {/* Shuttle lights: bright streaks forever travelling along the cloth */}
      <g stroke="#ffe9a8" fill="none" strokeLinecap="round" filter="url(#hk-thread-glow)">
        {SHUTTLES.map((s) => (
          <path
            key={`shuttle-${s.y}`}
            className="hk-shuttle"
            d={WEFT_THREADS.find((t) => t.y === s.y)?.d ?? `M -60 ${s.y} H 1260`}
            strokeWidth={s.width}
            opacity={s.opacity}
            pathLength={1}
            style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
