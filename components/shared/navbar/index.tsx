"use client";

import {
  Home,
  Phone,
  ShoppingCart,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import TheamBtn from "./theam-btn";
import SearchBox from "./search";
import { SignedOut } from "@clerk/nextjs";
import UserProfileButton from "./user-profile-button";
import CartCountBadge from "./cart-count-badge";
import { useEffect, useState } from "react";
import { getAllPlantsForSearch } from "@/lib/actions/plant.action";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [plants, setPlants] = useState<{ slug: string; name: string }[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const fetchPlants = async () => {
      const res = await getAllPlantsForSearch();
      setPlants(res);
    };
    fetchPlants();
  }, []);
  const handleSelectPlant = (plant: { slug: string; name: string }) => {
    router.push(`/details/${plant.slug}`);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full h-14 px-4 sm:px-6 py-2 border-b flex justify-between items-center dark:text-white fixed z-50 bg-white/20 dark:bg-black/20 backdrop-blur-sm shadow-sm">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Logo"
          className="w-40 sm:w-52 h-12"
          width={400}
          height={400}
        />
      </div>

      {/* Hamburger for mobile/tablet */}
      <button
        className="flex items-center justify-center md:hidden ml-2 text-gray-800 dark:text-gray-200 focus:outline-none"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Center nav - desktop only */}
      <div className="hidden md:flex gap-6 items-center justify-center">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-yellow-500 transition"
        >
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-1 hover:text-yellow-500 transition"
        >
          <Phone size={18} />
          <span>Contact</span>
        </Link>
        <TheamBtn />
        <SignedOut>
          <div className="flex gap-3 items-center">
            <Link
              href="/log-in/"
              className="flex items-center gap-1 hover:text-yellow-500 transition cursor-pointer"
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
            <Link
              href="/sign-up/"
              className="flex items-center gap-1 hover:text-yellow-500 transition cursor-pointer"
            >
              <LogOut size={18} />
              <span>Sign Up</span>
            </Link>
          </div>
        </SignedOut>
      </div>

      {/* Mobile menu dropdown (with search, cart, and profile) */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md md:hidden animate-fade-in z-50">
          <div className="flex flex-col gap-2 py-4 px-6">
            <SearchBox allPlants={plants} onSelect={handleSelectPlant} />
            <Link
              href="/"
              className="flex items-center gap-2 py-2 hover:text-yellow-500 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={20} /> Home
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 py-2 hover:text-yellow-500 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone size={20} /> Contact
            </Link>
            <TheamBtn />
            <div className="flex items-center gap-4 py-2">
              <Link
                href="/cart"
                className="relative"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                <CartCountBadge />
              </Link>
              <UserProfileButton />
            </div>
            <SignedOut>
              <div className="flex flex-col gap-2">
                <Link
                  href="/log-in/"
                  className="flex items-center gap-2 py-2 hover:text-yellow-500 transition cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={20} /> Sign In
                </Link>
                <Link
                  href="/sign-up/"
                  className="flex items-center gap-2 py-2 hover:text-yellow-500 transition cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogOut size={20} /> Sign Up
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      )}

      {/* Search + Cart - always visible, but shrink on mobile */}
      <div className="hidden md:flex items-center justify-end gap-4 w-40 sm:w-48 flex-shrink-0">
        <div className="hidden sm:block">
          <SearchBox allPlants={plants} onSelect={handleSelectPlant} />
        </div>
        <Link href="/cart" className="relative">
          <ShoppingCart size={20} />
          <CartCountBadge />
        </Link>
        <UserProfileButton />
      </div>
    </nav>
  );
}
