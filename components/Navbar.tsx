"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});
import Image from "next/image";
import Sidebar from "./Sidebar";
export default function Navbar({ progress }: { progress: number }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div className="flex items-center p-4 basis-1/12">
      <Link href="/dashboard" className="flex lg:hidden items-center pl-3">
        <div className="relatve w-16 h-16 mr-4">
          <Image
            priority
            height={60}
            width={60}
            className="object-contain"
            src="/genius.svg"
            alt="logo"
          />
        </div>
        <p
          className={cn("font-bold text-2xl text-black", montserrat.className)}
        >
          Genius
        </p>
      </Link>
      <div className="flex w-full items-center justify-end">
        <Sheet>
          <SheetTrigger className="fill-white">
            <Menu className="lg:hidden" />
          </SheetTrigger>
          <SheetContent className="p-0 border-0">
            <SheetHeader className="hidden">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Choose an option</SheetDescription>
            </SheetHeader>
            <Sidebar progress={progress} />
          </SheetContent>
        </Sheet>
        <UserButton />
      </div>
    </div>
  );
}
