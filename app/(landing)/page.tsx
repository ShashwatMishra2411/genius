"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

export default function Landing() {
  const { user } = useUser();
  console.log(user);
  return <div></div>;
}
