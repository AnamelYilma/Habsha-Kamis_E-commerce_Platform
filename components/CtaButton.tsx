import Link from "next/link";
import { ReactNode } from "react";

type CtaVariant = "gold" | "gradient" | "outline" | "borderGold" | "white";

const VARIANT_CLASSES: Record<CtaVariant, string> = {
  gold: "btn-sheen relative bg-gold text-black font-semibold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
  gradient:
    "bg-gradient-to-r from-gold via-yellow-400 to-gold-dark text-black font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]",
  outline:
    "border border-white/20 text-white font-medium hover:border-gold hover:text-gold",
  borderGold:
    "border border-gold text-gold font-semibold hover:bg-gold hover:text-black",
  white: "bg-white text-black font-semibold hover:bg-gray-200",
};

interface CtaButtonProps {
  href: string;
  en: string;
  am: string;
  variant?: CtaVariant;
  external?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Main call-to-action button: English label on top, small gold Amharic
 * underneath. The only place where the two languages appear together.
 */
export function CtaButton({
  href,
  en,
  am,
  variant = "gold",
  external = false,
  className = "",
  children,
}: CtaButtonProps) {
  const classes = `inline-flex flex-col items-center justify-center gap-1 rounded-sm px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition duration-300 ${VARIANT_CLASSES[variant]} ${className}`;

  const label = (
    <>
      <span className="flex items-center justify-center gap-2">
        {children}
        <span>{en}</span>
      </span>
      <span className="text-[9px] normal-case tracking-wider font-light opacity-80 leading-none">
        {am}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
