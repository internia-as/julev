import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GlobalStateProvider } from "@/hooks/useGlobalState";
import { NextIntlClientProvider } from "next-intl";
import { NotificationProvider } from "@/hooks/useNotification";
import Notification from "@/components/Notification";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Julevbágo - Samisk språkverktøy",
  description: "Utviklet av Internia AS med støtte fra Sametinget",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex flex-col flex-grow">
          <GlobalStateProvider>
            <NotificationProvider>
              <NextIntlClientProvider>
                <Navbar />
                <Notification />
                <div className="mt-14">{children}</div>
                <Footer />
              </NextIntlClientProvider>
            </NotificationProvider>
          </GlobalStateProvider>
        </div>
      </body>
    </html>
  );
}
