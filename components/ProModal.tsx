"use client";

import React from "react";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Check, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ProModal() {
  const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex justify-center font-bold items-center gap-2">
              Upgrade to Genius
              <Badge className="bg-gradient-to-r font-bold text-sm from-indigo-500 border-0 via-purple-500 to-pink-500 py-1">
                PRO
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
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
                  <Check />
                </Card>
              );
            })}
            <Button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-lg">
              Upgrade
              <Zap className="fill-white" />
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
