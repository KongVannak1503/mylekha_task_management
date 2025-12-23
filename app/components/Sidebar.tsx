"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Users,
  Settings,
  User,
  ListChecks,
  LogIn,
  UserPlus,
  Plus,
  ChevronDown,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, onClose }) => {
  const currentPath = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({
    Task: false,
  });

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    {
      icon: CheckSquare,
      label: "Task",
      href: "/task",
      subItems: [
        { name: "Marketing", href: "/task/marketing" },
        { name: "Development", href: "/task/development" },
        { name: "Support", href: "/task/support" },
      ],
      badge: true,
    },
    { icon: BarChart3, label: "Timeline", href: "/timeline", badge: true },
    { icon: Users, label: "Team", href: "/team" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Users, label: "Roles", href: "/roles" },
  ];

  const accountPages = [
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      subItems: [
        { name: "Profile", href: "/settings/profile" },
        { name: "My Task", href: "/settings/my-task" },
        { name: "Sign In", href: "/settings/sign-in" },
        { name: "Sign Up", href: "/settings/sign-up" },
      ],
      badge: true,
    },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col h-full bg-white border-r border-slate-100
          transition-all duration-300 ease-in-out
          ${isCollapsed && !isOpen ? "lg:w-20" : "w-60"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo/Brand */}
        <div
          className={`p-6 flex items-center ${
            isCollapsed && !isOpen ? "justify-center" : "gap-3"
          }`}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/logo.webp"
              width={32}
              height={32}
              alt="MyLekha Logo"
              className="object-contain"
              priority
            />
          </div>
          {(!isCollapsed || isOpen) && (
            <span className="text-lg font-semibold text-slate-800">
              MyLekha
            </span>
          )}
        </div>

        {/* Add Project Button */}
        {(!isCollapsed || isOpen) && (
          <div className="px-6 mb-4">
            <button className="w-full flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" />
              Add project
            </button>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-1">
              {item.subItems ? (
                // Button for items with dropdown
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-teal-50 text-teal-600"
                      : "text-slate-600 hover:bg-slate-50"
                  } ${isCollapsed && !isOpen ? "justify-center" : ""}`}
                  title={isCollapsed && !isOpen ? item.label : ""}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {(!isCollapsed || isOpen) && (
                    <>
                      <span className="text-sm font-medium flex-1  text-left">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4  transition-transform ${
                          openDropdowns[item.label] ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>
              ) : (
                // Link for regular items
                <Link
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-teal-50 text-teal-600"
                      : "text-slate-600 hover:bg-slate-50"
                  } ${isCollapsed && !isOpen ? "justify-center" : ""}`}
                  title={isCollapsed && !isOpen ? item.label : ""}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {(!isCollapsed || isOpen) && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      )}
                    </>
                  )}
                </Link>
              )}

              {/* Sub Items */}
              {item.subItems &&
                openDropdowns[item.label] &&
                (!isCollapsed || isOpen) && (
                  /* ml-7 aligns the line under the icon, border-l-2 creates the vertical line */
                  <div className="ml-7 mt-1 space-y-1 border-l-2 border-slate-100">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        /* pl-6 pushes the text away from the line */
                        className={`block w-full text-left pl-6 py-2 text-sm transition-colors ${
                          currentPath === subItem.href
                            ? "text-teal-600 font-medium"
                            : "text-slate-500 hover:text-teal-600"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        {/* Account Pages Section */}
        {(!isCollapsed || isOpen) && (
          <div className="px-4 pb-6 border-t border-slate-100 pt-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
              Account Pages
            </div>
            {accountPages.map((item, index) => (
              <div key={index} className="mb-1">
                {item.subItems ? (
                  // Renders a Toggle Button if subItems exist
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-teal-50 text-teal-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium flex-1 text-left">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdowns[item.label] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Sub Items */}
                    {item.subItems &&
                      openDropdowns[item.label] &&
                      (!isCollapsed || isOpen) && (
                        /* ml-7 aligns the line under the icon, border-l-2 creates the vertical line */
                        <div className="ml-7 mt-1 space-y-1 border-l-2 border-slate-100">
                          {item.subItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              /* pl-6 pushes the text away from the line */
                              className={`block w-full text-left pl-6 py-2 text-sm transition-colors ${
                                currentPath === subItem.href
                                  ? "text-teal-600 font-medium"
                                  : "text-slate-500 hover:text-teal-600"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </>
                ) : (
                  // Regular Link if no subItems exist
                  <Link
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-teal-50 text-teal-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
