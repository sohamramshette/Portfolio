import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" }
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://sohamramshette.com'),
  title: {
    default: "Soham Ramshette | Portfolio",
    template: "%s | Soham Ramshette"
  },
  description: "Award-level futuristic personal portfolio of Soham Ramshette, B.Tech Computer Engineering Student, AI Developer, and Future Cybersecurity Engineer.",
  keywords: ["Soham Ramshette", "Portfolio", "Cybersecurity", "AI", "Software Development", "Next.js", "React", "Frontend Developer", "Web Developer"],
  authors: [{ name: "Soham Ramshette", url: "https://sohamramshette.com" }],
  creator: "Soham Ramshette",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sohamramshette.com",
    title: "Soham Ramshette | Futuristic Portfolio",
    description: "Award-level futuristic personal portfolio of Soham Ramshette.",
    siteName: "Soham Ramshette Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soham Ramshette Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Ramshette | Portfolio",
    description: "Award-level futuristic personal portfolio of Soham Ramshette.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Soham Ramshette",
  "url": "https://sohamramshette.com",
  "jobTitle": "Computer Engineering Student",
  "worksFor": {
    "@type": "Organization",
    "name": "MIT Academy of Engineering"
  },
  "alumniOf": "MIT Academy of Engineering",
  "sameAs": [
    "https://github.com/sohamramshette",
    "https://www.linkedin.com/in/soham-ramshette-23096a383/",
    "https://instagram.com/Soham_Ramshette"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 ${outfit.className}`}>
        <div className="noise-overlay"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <ScrollProgress />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
        
        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
