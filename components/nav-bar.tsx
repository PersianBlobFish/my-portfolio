"use client";
import { cn } from "@/lib/utils";
import { Home, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Dialog, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import ModeToggle from "./mode-toggle";

export function NavBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navItems = [
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
  ];

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

  const renderNavButton = ({
    label,
    href,
    mobile = false,
  }: {
    label: string;
    href: string;
    mobile?: boolean;
  }) => {
    const hash = href.replace("/#", "#");
    const button = (
      <Button variant="ghost" className={mobile ? "w-full justify-start" : undefined}>
        {label}
      </Button>
    );

    return (
      <Link href={href} onClick={handleSectionClick(hash)}>
        {button}
      </Link>
    );
  };

  return (
    <div
      id="site-nav"
      className="flex items-center min-w-full w-full fixed justify-center p-2 z-[50] mt-[2rem]"
    >
      <div className="flex justify-between md:w-[720px] w-[95%] border dark:border-zinc-900 dark:bg-black bg-opacity-10 relative backdrop-filter backdrop-blur-lg bg-white border-white border-opacity-20 rounded-xl p-2 shadow-lg">
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
                  {renderNavButton({ ...item, mobile: true })}
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
        <NavigationMenu>
          <NavigationMenuList className="max-[825px]:hidden ">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="pl-2 inline-flex items-center"
              aria-label="Home"
            >
              <Home className="h-5 w-5" />
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2 max-[825px]:hidden">
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              {renderNavButton(item)}
            </React.Fragment>
          ))}
          <Link href="/login">
            <Button variant="outline" className="hidden">Sign in</Button>
          </Link>
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
