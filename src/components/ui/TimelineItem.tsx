"use client";

import { motion } from "motion/react";

interface TimelineItemProps {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export function TimelineItem({
  role,
  company,
  location,
  period,
  description,
  highlights,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-accent after:absolute after:left-[5px] after:top-5 after:h-full after:w-0.5 after:bg-border"
    >
      <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-bold text-foreground">{role}</h3>
        <span className="text-sm font-medium text-accent">{period}</span>
      </div>
      <p className="mb-3 text-foreground-muted">
        {company}, {location}
      </p>
      <p className="mb-4 text-sm text-foreground-muted leading-relaxed">
        {description}
      </p>
      <ul className="space-y-2">
        {highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-sm text-foreground-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {highlight}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
