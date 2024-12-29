import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";
import DotPatternBackground from "@/components/ui/DotPatternBackground";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
<<<<<<< Updated upstream
import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
=======
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css"; // Adjust path as needed
>>>>>>> Stashed changes

// Move themeColor configuration inside viewport export
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/anime.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  session: any; // Type for session data (use appropriate type if defined)
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning className={GeistSans.className}>
        <body className={cn("min-h-screen bg-background relative")}>
          {/* Client-only DotPattern as background */}
          <DotPatternBackground />

          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <NextTopLoader
                  color="#616161"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={200}
                  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                  template='<div class="bar" role="bar"><div class="peg"></div></div> <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                  zIndex={1600}
                  showAtBottom={false}
                />
                <div className="flex-1">
                  {children}
                  <Analytics />
                  <SpeedInsights />
                </div>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
