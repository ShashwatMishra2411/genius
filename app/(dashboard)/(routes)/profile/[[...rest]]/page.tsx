"use client";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

export default function Profile() {
  return (
    <div>
      <UserProfile />
    </div>
  );
}
