import Image from "next/image";
import React from "react";
import { Linkedin, Facebook, Instagram, Github, Link } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 lg:grid-cols-3 items-start gap-8 text-sm">
        {/* Logo Placeholder */}
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={400}
            className="w-52 h-auto"
          />
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Connect</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline flex items-center gap-2">
                <Linkedin size={18} /> LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline flex items-center gap-2">
                <Facebook size={18} /> Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline flex items-center gap-2">
                <Instagram size={18} /> Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline flex items-center gap-2">
                <Github size={18} /> GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline flex items-center gap-2">
                <Link size={18} /> Website
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col text-sm text-gray-600">
          <h4 className="font-medium text-gray-700 mb-2">Made with 💚</h4>
          <p>
            By
            <span className="italic text-lg font-semibold">
              {" "}
              Amit Sutradhar
            </span>
          </p>
          <p>Built using Next.js & Tailwind CSS</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-xs py-4 border-t">
        © {new Date().getFullYear()} All rights reserved by Root & Rise.
      </div>
    </footer>
  );
};

export default Footer;
