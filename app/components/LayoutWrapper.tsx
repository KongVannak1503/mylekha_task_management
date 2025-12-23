"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-slate-100 transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-60"
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onClose={closeSidebar}
        />
      </aside>
      <div className="lg:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={false} // Always full width on mobile
          onClose={closeSidebar}
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-15 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center shrink-0">
          <Navbar onToggleSidebar={toggleSidebar} />
        </header>

        <main className="flex-1 overflow-y-auto p-5 ">{children}</main>
      </div>
    </div>
  );
}
