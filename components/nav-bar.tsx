"use client";
import { cn } from "@/lib/utils";
import { Home, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Dialog, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { NavigationMenuLink } from "./ui/navigation-menu";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import ModeToggle from "./mode-toggle";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
];

export function NavBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeHref, setActiveHref] = React.useState<string | null>(null);

  // Scroll-spy: last section whose top has crossed the nav's bottom edge wins.
  React.useEffect(() => {
    if (!isHomePage) {
      setActiveHref(null);
      return;
    }

    const syncActive = () => {
      const nav = document.getElementById("site-nav");
      const line = (nav?.getBoundingClientRect().bottom ?? 0) + 1;
      // Last sections sit below max scroll, so bottom of page = last section.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      let currentTop = Number.NEGATIVE_INFINITY;

      // Nav order != document order, so compare positions instead of index.
      for (const item of navItems) {
        const element = document.querySelector(item.href.replace("/#", "#"));
        if (!(element instanceof HTMLElement)) continue;

        const top = element.getBoundingClientRect().top;
        if ((atBottom || top <= line) && top > currentTop) {
          current = item.href;
          currentTop = top;
        }
      }

      setActiveHref(current);
    };

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [isHomePage]);

  const scrollToTarget = (target: string) => {
    const windowWithLenis = window as Window & {
      __lenis?: {
        scrollTo: (target: string | number, options?: { duration?: number }) => void;
      };
    };

    const element = document.querySelector(target);

    if (element instanceof HTMLElement) {
      const nav = document.getElementById("site-nav");
      const navBottom = nav?.getBoundingClientRect().bottom ?? 0;
      const extraOffset = Number(element.dataset.navOffset ?? 0);
      const top =
        window.scrollY + element.getBoundingClientRect().top - navBottom - extraOffset;

      if (windowWithLenis.__lenis) {
        windowWithLenis.__lenis.scrollTo(Math.max(top, 0));
        return;
      }

      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHomePage) {
      return;
    }

    event.preventDefault();
    const windowWithLenis = window as Window & {
      __lenis?: {
        scrollTo: (target: string | number, options?: { duration?: number }) => void;
      };
    };

    if (windowWithLenis.__lenis) {
      windowWithLenis.__lenis.scrollTo(0);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionClick =
    (hash: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isHomePage) {
        return;
      }

      event.preventDefault();
      scrollToTarget(hash);
    };

  // ponytail: mobile sheet keeps plain ghost buttons; morph pill is desktop-only
  const renderNavButton = ({ label, href }: { label: string; href: string }) => (
    <Link href={href} onClick={handleSectionClick(href.replace("/#", "#"))}>
      <Button variant="ghost" className="w-full justify-start">
        {label}
      </Button>
    </Link>
  );

  // The bar IS the pill: every segment carries the glass, joined edge to edge.
  // The active section's segment detaches, so the whole bar splits around it.
  // "spacer" keeps the original justify-between gap between logo and links.
  const segments = ["/", "spacer", ...navItems.map((item) => item.href), "theme"];
  const activeIndex = activeHref ? segments.indexOf(activeHref) : -1;
  const lastIndex = segments.length - 1;

  const segmentClass = (index: number) =>
    cn(
      "flex h-[52px] items-center border border-white border-opacity-20 bg-white bg-opacity-10 shadow-lg backdrop-filter backdrop-blur-lg transition-all duration-300 dark:border-zinc-900 dark:bg-black",
      index === activeIndex
        ? "mx-2 rounded-xl"
        : cn(
            (index === 0 || index === activeIndex + 1) && "rounded-l-xl",
            (index === lastIndex || index === activeIndex - 1) && "rounded-r-xl",
            // Drop both sides of a shared edge, else the two borders draw a seam.
            index > 0 && index !== activeIndex + 1 && "border-l-0",
            index < lastIndex && index !== activeIndex - 1 && "border-r-0",
          ),
    );

  return (
    <div
      id="site-nav"
      className="flex items-center min-w-full w-full fixed justify-center p-2 z-[50] mt-[2rem]"
    >
      <div className="flex justify-between md:w-[720px] w-[95%] border dark:border-zinc-900 dark:bg-black bg-opacity-10 relative backdrop-filter backdrop-blur-lg bg-white border-white border-opacity-20 rounded-xl p-2 shadow-lg min-[826px]:hidden">
        <Dialog>
          <SheetTrigger className="min-[825px]:hidden p-2 transition">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="p-8">
              <SheetTitle>Nguyen</SheetTitle>
              <SheetDescription>
                My personal portfolio showcasing my projects, software, and blog
                posts. Explore my work and learn more about me.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-2 mt-[1rem] z-[99] px-7">
              <DialogClose asChild>
                <Link href="/" onClick={handleHomeClick}>
                  <Button variant="ghost" className="w-full justify-start">
                    Home
                  </Button>
                </Link>
              </DialogClose>
              {navItems.map((item) => (
                <DialogClose asChild key={item.label}>
                  {renderNavButton(item)}
                </DialogClose>
              ))}
                <DialogClose asChild>
                  <Link href="/login">
                    <Button variant="outline" className="hidden justify-start">
                      Sign in
                    </Button>
                  </Link>
                </DialogClose>
              <div className="flex justify-end">
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Dialog>
      </div>

      <div className="hidden w-[95%] items-center md:w-[720px] min-[826px]:flex">
        <Link
          href="/"
          onClick={handleHomeClick}
          className={cn(segmentClass(0), "px-4")}
          aria-label="Home"
        >
          <Home className="h-5 w-5" />
        </Link>
        <div className={cn(segmentClass(1), "flex-1")} aria-hidden />
        {navItems.map((item, index) => {
          const isActive = activeHref === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              onClick={handleSectionClick(item.href.replace("/#", "#"))}
              className={cn(
                segmentClass(index + 2),
                "px-4 text-sm",
                isActive && "font-semibold",
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <div className={cn(segmentClass(segments.length - 1), "px-1")}>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
