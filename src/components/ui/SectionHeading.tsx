"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-foreground md:text-4xl"
      >
        {title}
      </motion.h2>
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent" />
      {subtitle && (
        <p className="mt-4 text-foreground-muted">{subtitle}</p>
      )}
    </div>
  );
}
