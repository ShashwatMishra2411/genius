import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex">
      <div className="min-h-screen relative bg-gray-900 hidden md:flex md:fex-col md:inset-y-0 z-[80] w-72">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <Navbar />
        {children}
      </div>
    </section>
  );
}
