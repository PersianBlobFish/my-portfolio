"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute ? <NavBar /> : null}
      {children}
      {!isDashboardRoute ? <Footer /> : null}
    </>
  );
}
