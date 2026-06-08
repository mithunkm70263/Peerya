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
      <body className="min-h-full flex flex-col font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
