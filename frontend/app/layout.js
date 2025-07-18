import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './index.css';
import './app.css';
import { UserProvider } from "@/contexts/UserContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toast, Toaster } from "../components/ui/toaster.jsx";
import ClientProviders from "@/components/ClientProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KureMe - Professional Healthcare Services | Your Health is Our Priority",
  description:
    "Experience world-class healthcare with MedCenter. Our expert medical team provides comprehensive services including cardiology, neurology, orthopedics, and emergency care. Book your appointment today.",
  authors: [{ name: "MedCenter Healthcare" }],
  openGraph: {
    title: "MedCenter - Professional Healthcare Services",
    description:
      "Experience world-class healthcare with MedCenter. Expert medical team providing comprehensive healthcare services.",
    type: "website",
    images: [
      {
        url: "https://lovable.dev/opengraph-image-p98pqg.png",
        width: 1200,
        height: 630,
        alt: "MedCenter Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@medcenter",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual domain
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <SidebarProvider>
            {children}
            <ClientProviders/>
          </SidebarProvider>
        </UserProvider>
        
      </body>
    </html>
  );
}
