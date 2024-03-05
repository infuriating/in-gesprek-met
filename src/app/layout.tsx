import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Page from "@/components/Page";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "In Gesprek Met",
  description: "Een evenement van het Grafisch Lyceum Rotterdam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <body className={inter.className}>
            <Page>
              {children}
              <Toaster />
            </Page>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
