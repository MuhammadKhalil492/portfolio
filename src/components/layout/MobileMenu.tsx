"use client";

import { X } from "lucide-react";
import { navLinks } from "@/data/personal";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-64 bg-background border-l border-border p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-foreground-muted hover:text-foreground"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <nav className="mt-12 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "text-lg font-medium transition-colors",
                activeSection === link.href.slice(1)
                  ? "text-accent"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
