"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function VantaBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    let effect: { destroy: () => void } | null = null;
    let cancelled = false;

    // vanta.dots reads window.THREE at module-eval time, the THREE option alone is not enough
    (window as unknown as { THREE: typeof THREE }).THREE = THREE;

    // @ts-expect-error vanta ships no type declarations
    import("vanta/dist/vanta.dots.min").then(({ default: DOTS }) => {
      if (cancelled || !ref.current) return;
      effect = DOTS({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        // ponytail: transparent clear, so the themed body background is the backdrop
        backgroundAlpha: 0,
        color: resolvedTheme === "dark" ? 0x6c757d : 0x000000,
        showLines: false,
      });
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
    // ponytail: vanta bakes the dot color into the material, so re-init on theme change
  }, [resolvedTheme]);

  return (
    <div ref={ref} aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />
  );
}
