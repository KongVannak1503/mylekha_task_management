"use client";

import React from "react";
import { Search, Bell, Settings, User, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const pathname = usePathname();
  let pathSegments = pathname.split("/").filter((item) => item !== "");
  if (pathSegments.length === 0) {
    pathSegments = ["Dashboard"];
  }
  return (
    <div className="w-full flex items-center justify-between">
      {/* Left side - Burger Menu & Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-2 text-xs">
          <Link
            href="/"
            className="text-slate-400 hover:text-teal-600 transition-colors"
          >
            Pages
          </Link>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <span className="text-slate-300">/</span>
              <span
                className={`capitalize ${
                  index === pathSegments.length - 1
                    ? "text-slate-700 font-medium"
                    : "text-slate-400"
                }`}
              >
                {segment.replace(/-/g, " ")}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right side - Search and Icons */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Type here..."
            className="pl-10 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Sign In</span>
          </button>

          <button className="p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <button className="p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
