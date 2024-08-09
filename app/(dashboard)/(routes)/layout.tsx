import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getCount } from "@/lib/api-limit";
import React from "react";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const progress = (await getCount()) ?? 0;
  return (
    <section className="min-h-screen max-w-screen w-full overflow-hidden flex">
      <div className="min-h-screen fixed bg-gray-900 hidden lg:flex lg:fex-col lg:inset-y-0 w-60">
        <Sidebar progress={progress} />
      </div>
      <div className="flex flex-col overflow-hidden h-screen lg:pl-60 w-full">
        <Navbar progress={progress} />
        {children}
      </div>
    </section>
  );
}
