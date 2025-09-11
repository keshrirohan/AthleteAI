// app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "AthletiQ",
  description: "AthletiQ Progressive Web App",
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico", type: "image/x-icon" },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  // keep manifest path consistent with your public/manifest file
  manifest: "/manifest.json",
  themeColor: "#000000", // PWA theme color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* keep these consistent with metadata.manifest and your public/ files */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon512_rounded.png" />
        <meta name="theme-color" content="#8936FF" />
      </head>

      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
