"use client";

import * as React from "react";
import Link from "next/link";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FeatureModalAction = {
  label: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: () => void;
  variant?: React.ComponentProps<typeof Button>["variant"];
  closeOnClick?: boolean;
};

export type FeatureModalConfig = {
  title: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  actions?: FeatureModalAction[];
  closeLabel?: string;
  showCloseButton?: boolean;
  contentClassName?: string;
  bodyClassName?: string;
};

type FeatureModalProps = {
  config: FeatureModalConfig;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

function FeatureModalActionButton({ action }: { action: FeatureModalAction }) {
  const button = (
    <Button variant={action.variant ?? "default"} onClick={action.onClick} asChild={!!action.href}>
      {action.href ? (
        <Link
          href={action.href}
          target={action.target}
          rel={action.rel ?? (action.target === "_blank" ? "noreferrer" : undefined)}
        >
          {action.label}
        </Link>
      ) : (
        action.label
      )}
    </Button>
  );

  if (action.closeOnClick === false || action.href) {
    return button;
  }

  return <DialogClose asChild>{button}</DialogClose>;
}

export function FeatureModal({
  config,
  trigger,
  open,
  onOpenChange,
  children,
}: FeatureModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className={cn("sm:max-w-lg", config.contentClassName)}
        showCloseButton={config.showCloseButton}
      >
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          {config.description ? (
            <DialogDescription>{config.description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {config.content || children ? (
          <div
            className={cn(
              "space-y-4 text-sm leading-6 text-muted-foreground",
              config.bodyClassName,
            )}
          >
            {config.content}
            {children}
          </div>
        ) : null}
        <DialogFooter>
          {config.actions?.map((action) => (
            <FeatureModalActionButton key={action.label} action={action} />
          ))}
          {config.closeLabel ? (
            <DialogClose asChild>
              <Button variant="outline">{config.closeLabel}</Button>
            </DialogClose>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
