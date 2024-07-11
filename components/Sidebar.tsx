"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import logo from "../public/genius.svg";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { routes } from "@/constants";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function Sidebar() {
  // console.log(logo);
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relatve w-16 h-16 mr-4">
            <Image
              priority
              height={60}
              width={60}
              className="object-contain"
              src={logo.src}
              alt="logo"
            />
          </div>
          <p
            className={cn(
              "font-bold text-2xl text-white",
              montserrat.className
            )}
          >
            Genius
          </p>
        </Link>
        <div className="flex flex-col space-y-1">
          {routes.map((route) => {
            console.log(route.color);
            return (
              <Link
                className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
                href={route.href}
                key={route.href}
              >
                <div className="flex items-center flex-1 ">
                  <route.icon
                    color={route.color}
                    // color="skyblue"
                    className={cn(`h-5 w-5 mr-3`)}
                  />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
