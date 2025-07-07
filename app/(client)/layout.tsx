import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";

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
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
