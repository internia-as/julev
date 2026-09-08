import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("translate", "/translate");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}