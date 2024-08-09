"use client";
import { Card } from "@/components/ui/card";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const pages = ["/conversation", "/youtube", "/code"];
    pages.forEach((page) => {
      router.prefetch(page);
    });
  }, [router]);
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experince the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 g:px-32 space-y-4">
        {tools.map((tool, index) => {
          return (
            <Card
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
              key={index}
              onClick={() => {
                window.location.href = tool.href;
              }}
            >
              <div className="flex items-center gap-x-4">
                <div
                  style={{
                    backgroundColor: tool.bgcolor,
                  }}
                  className={cn("p-2 w-fit rounded-md", tool.bgcolor)}
                >
                  <tool.icon
                    color={tool.color}
                    className={cn("w-8 h-8", tool.color)}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{tool.label}</h3>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
