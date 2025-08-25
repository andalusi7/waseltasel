import type { Metadata } from "next";
import { Geist, Geist_Mono, Alexandria } from "next/font/google";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import ActiveMediaQuery from "@/components/active-media-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Wasel Tasel",
  description:
    "Wasel Tasel Humanitarian Foundation is a non-governmental, non-profit civil society organization dedicated to serving the public interest. Founded in Iraq in 2015 as a youth-led initiative, the foundation emerged in response to the humanitarian needs created by the widespread displacement crisis caused by terrorist activities in 2014.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${alexandria.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          {/* <ActiveMediaQuery /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
