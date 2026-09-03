import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import MobileActionBar from "@/components/mobile-action-bar";

export const metadata: Metadata = {
  title: "Habesha Kamis Tailoring",
  description: "Bespoke Ethiopian Traditional Dress Tailoring",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="pb-16 md:pb-0">
          <Navbar />
          <main>{children}</main>
          <MobileActionBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
