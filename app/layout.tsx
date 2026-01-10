import type { Metadata } from "next";
import { Instrument_Serif, Baskervville } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import GlobalMouseTracker from "@/components/mouse-tracker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const baskerville = Baskervville({
  variable: "--font-baskerville",
  subsets: ["latin"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${instrumentSerif.variable} ${ppMontreal.variable} ${baskerville.variable} antialiased h-full flex flex-col`}
      >
        <GlobalMouseTracker>
          <Navbar />
          <main className="flex-grow mb-20">{children}</main>
          <Footer />
        </GlobalMouseTracker>
      </body>
    </html>
  );
}
