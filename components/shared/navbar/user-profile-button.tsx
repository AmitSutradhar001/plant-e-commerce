"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";

const UserProfileButton = () => {
  return (
    <SignedIn>
      <UserButton
        userProfileMode="modal"
        appearance={{
          elements: {
            userButtonAvatarBox: "w-9 h-9 ring-2 ring-blue-500",
            userButtonPopoverCard:
              "shadow-xl border border-gray-300 rounded-lg",
            userButtonPopoverActionButton: "hover:bg-gray-100",
          },
        }}
      />
    </SignedIn>
  );
};

export default UserProfileButton;
