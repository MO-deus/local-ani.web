import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  subsets: ['latin'],
  weight: '700', // Bold
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LocalAni",
  description: "Build with love for all the otakus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className="font-roboto"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
