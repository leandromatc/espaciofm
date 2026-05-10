"use client";

import { usePathname } from "next/navigation";
import { AudioPlayerBar } from "@/components/AudioPlayerBar";

export function ConditionalPlayer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <AudioPlayerBar />;
}
