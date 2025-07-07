"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes"; // You can use any preset theme

export default function ClerkThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        userProfile: { baseTheme: resolvedTheme === "dark" ? dark : undefined },
        signIn: { baseTheme: resolvedTheme === "dark" ? dark : undefined },
        signUp: { baseTheme: resolvedTheme === "dark" ? dark : undefined },
        userButton: { baseTheme: resolvedTheme === "dark" ? dark : undefined },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
