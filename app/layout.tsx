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
  description: "Personal Portfolio of Agastya Sharma",
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
