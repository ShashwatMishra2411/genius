"use client";
import React, { useEffect, useState } from "react";
import ProModal from "./ProModal";
export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ProModal />
    </>
  );
}
