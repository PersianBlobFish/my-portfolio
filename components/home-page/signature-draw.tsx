"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SignatureDraw = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/signature.svg")
      .then((response) => response.text())
      .then((svg) => {
        if (!cancelled) {
          setMarkup(svg);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMarkup("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !markup) {
      return;
    }

    const svg = container.querySelector("svg");
    const path = container.querySelector("path");

    if (!svg || !path) {
      return;
    }

    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("aria-label", "Signature");
    svg.setAttribute("role", "img");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.overflow = "visible";

    path.setAttribute("fill", "currentColor");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "0.6");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("vector-effect", "non-scaling-stroke");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDasharray = "none";
      path.style.strokeDashoffset = "0";
      path.style.fillOpacity = "1";
      return;
    }

    const length = path.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0,
      });

      gsap
        .timeline()
        .to(path, {
          strokeDashoffset: 0,
          duration: 3.2,
          ease: "power2.inOut",
        })
        .to(
          path,
          {
            fillOpacity: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.35"
        );
    }, container);

    return () => ctx.revert();
  }, [markup]);

  return (
    <div
      ref={containerRef}
      aria-hidden={markup ? undefined : true}
      className="not-prose mb-6 h-[52vh] w-full max-w-5xl text-foreground md:mb-8 md:h-[64vh]"
      dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
    />
  );
};

export default SignatureDraw;
