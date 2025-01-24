import { ProviderToast } from "@/components/providers/ProviderToast";
import ProviderUI from "@/components/providers/ProviderUI";
// import { Thumbnail } from "@/lib/resources";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../style/globals.css";
const baseUrl = "https://nexus-events.vercel.app";
const montserratAlternates = localFont({
  src: [
    {
      path: "/fonts/MontserratAlternates-Regular.otf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "/fonts/MontserratAlternates-Bold.otf",
      weight: "bold",
      style: "normal",
    },
  ],
  variable: "--font-montserrat-alternates",
});

export async function generateMetadata(): Promise<Metadata> {
  const title = "Nexus Events";

  const description = "Nexus Events es una plataforma de eventos ";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    themeColor: "black",
    openGraph: {
      title,
      description,
      url: baseUrl,
      // images: [
      //   {
      //     url: Thumbnail,
      //     secureUrl: Thumbnail,
      //     width: 1200,
      //     height: 630,
      //     alt: "Evento de Visión Board",
      //   },
      // ],
      type: "website",
      siteName: "Nexus Events",
    },
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${montserratAlternates.variable} antialiased`}>
        <ProviderUI>
          {/* <Navbar /> */}
          {children}
          <ProviderToast />
        </ProviderUI>
      </body>
    </html>
  );
}
