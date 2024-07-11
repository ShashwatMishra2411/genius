import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const montserrat = Montserrat({
  weight: "700",
  subsets: ["latin"],
});
import Image from "next/image";
export default function Navbar() {
  return (
    <div className="flex items-center p-4">
      <Link href="/dashboard" className="flex items-center pl-3">
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
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
        <UserButton />
      </div>
    </div>
  );
}
