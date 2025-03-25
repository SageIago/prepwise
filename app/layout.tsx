/* eslint-disable camelcase */
import type { Metadata } from "next";
import React from "react";
import { Mona_Sans } from "next/font/google";
import "./globals.css";


const monaSans= Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prepwise -  An AI Powered Interview Prep Platform",
  description: "Prepwise is an AI powered interview prep platform that helps you prepare for your next job interview. It helps you practice coding, system design, and behavioral questions and also teaches you how to answer them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
