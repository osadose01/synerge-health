"use client";
import { useEffect, useState } from "react";

type ConnectionQuality = "fast" | "slow" | "unknown";

export function useConnectionSpeed(): ConnectionQuality {
  const [quality, setQuality] = useState<ConnectionQuality>("unknown");

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    const conn = nav.connection;
    if (!conn) {
      setQuality("fast"); // assume fast when API unavailable (desktop)
      return;
    }
    const slow =
      conn.saveData ||
      conn.effectiveType === "slow-2g" ||
      conn.effectiveType === "2g" ||
      conn.effectiveType === "3g";
    setQuality(slow ? "slow" : "fast");
  }, []);

  return quality;
}
