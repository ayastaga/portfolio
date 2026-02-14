import type { Metadata } from "next";
import { Instrument_Serif, Baskervville } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TransitionProvider } from "@/components/TransitionProvider";
import LenisProvider from "@/components/LenisProvider";
import GlobalMouseTracker from "@/components/mouse-tracker";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const baskerville = Baskervville({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-baskerville",
});

const ppMontreal = localFont({
  src: "../public/fonts/ppneuemontreal-medium.otf",
  variable: "--font-pp-montreal",
});

export const metadata: Metadata = {
  title: "Agastya Sharma",
  description:
    "I'm a creative and I love to push the bounds of what's possible; that means coming up with new, bold, innovative solutions and making them look good. If you wanna reach out to me, contact me.",

  openGraph: {
    title: "Agastya Sharma",
    description:
      "I'm a creative and I love to push the bounds of what's possible; that means coming up with new, bold, innovative solutions and making them look good. If you wanna reach out to me, contact me.",
    url: "https://agastyasharma.dev",
    siteName: "Agastya Sharma",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Agastya Sharma",
    description:
      "I'm a creative and I love to push the bounds of what's possible; that means coming up with new, bold, innovative solutions and making them look good. If you wanna reach out to me, contact me.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${baskerville.variable} ${ppMontreal.variable} antialiased`}
      >
        <GlobalMouseTracker>
          <LenisProvider>
            <TransitionProvider>
              <Navbar />
              {children}
              <Footer />
            </TransitionProvider>
          </LenisProvider>
        </GlobalMouseTracker>
      </body>
    </html>
  );
}
