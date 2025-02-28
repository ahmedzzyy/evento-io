import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evento-io | All-in-One Event Planning & Ticketing Solution",
  description: "Evento-io is a comprehensive event management and ticketing platform designed for organizers and attendees. Easily create, promote, and manage events, track attendance, and export guest lists—all with a seamless and secure experience. Powered by the latest web technologies, Evento-io streamlines event planning and enhances attendee engagement. Start organizing smarter today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
