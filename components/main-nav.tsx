import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      {/* Logo and Site Name */}
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>

      {/* Desktop Navigation Links (Hidden on Mobile) */}
      {items?.length ? (
        <nav className="hidden md:flex gap-6">
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}

      {/* Mobile Drawer */}
      <Drawer>
        {/* Drawer Trigger Button (Visible only on Mobile) */}
        <DrawerTrigger>
        <Menu className="md:hidden"/>
        </DrawerTrigger>

        {/* Drawer Content */}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Menu</DrawerTitle>
          </DrawerHeader>
          {items?.length ? (
            <nav className="flex flex-col items-center gap-4 mt-4">
              {items.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "text-sm font-medium text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
          <DrawerClose className="mt-6 mx-auto">
      Close
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
