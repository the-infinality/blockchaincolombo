"use client";

import * as React from "react";

import { pointer } from "@/lib/pointer";

/**
 * Renders nothing — just keeps lib/pointer's shared cursor position
 * updated so the ambient particle field (components/particle-field.tsx,
 * used both by the permanent SiteBackground and layered on top of
 * specific section images) can keep reacting to the cursor with its
 * "dent" repulsion effect. Previously this tracking lived inside the
 * visual cursor-trail canvas; now that the trail itself has been removed
 * entirely, this is the sole remaining pointermove listener.
 */
export function PointerTracker() {
  React.useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!supportsFinePointer) return;

    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      pointer.x = -9999;
      pointer.y = -9999;
    };
  }, []);

  return null;
}
