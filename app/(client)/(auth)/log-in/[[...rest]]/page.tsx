// app/log-in/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";

export default function LogInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
        path="/log-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/"
      />
    </div>
  );
}
