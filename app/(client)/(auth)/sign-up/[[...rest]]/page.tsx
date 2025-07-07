// app/log-in/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";

export default function LogInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/log-in"
        fallbackRedirectUrl="/"
      />
    </div>
  );
}
