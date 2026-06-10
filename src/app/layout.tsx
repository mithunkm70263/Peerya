import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Peerya — Nobody learns alone anymore.",
  description:
    "Peerya forms committed teams of 5–10 people across the world, matched by skill and experience level, guided by an AI agent that keeps everyone accountable.",
  openGraph: {
    title: "Peerya — Nobody learns alone anymore.",
    description:
      "Committed global learning teams with AI accountability. Join the waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
