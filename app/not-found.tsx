"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  console.log("HELLO");

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null; // You can return a loading spinner if desired
}
