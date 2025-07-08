import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import AnimatedCursor from "@/components/ui/AnimatedCursor";

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
    <>
      <AnimatedCursor />
      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}
