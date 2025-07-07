import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import ClerkThemeProvider from "@/components/clerk-theme-provider";
import CartSyncOnLogin from "@/components/CartSyncOnLogin";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            <CartSyncOnLogin />
            {children}
            <Toaster />
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
