"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { apiBaseUrl } from "@/lib/backend";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("visitor_session");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("visitor_session", id);
  }
  return id;
}

/**
 * Fire-and-forget page-view tracking sent to the Laravel backend.
 * Records one visit per pathname change.
 */
export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl()}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
        session_id: getSessionId(),
      }),
      signal: controller.signal,
      keepalive: true,
    }).catch(() => {
      /* tracking is best-effort; ignore errors */
    });
    return () => controller.abort();
  }, [pathname]);

  return null;
}
