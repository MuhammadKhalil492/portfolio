"use client";

import { motion } from "motion/react";
import { MapPin, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface SiteConfig {
  aboutBio: string[];
  location: string;
}

export function AboutSection({ config }: { config: SiteConfig }) {
  const quickFacts = [
    { icon: MapPin, label: "Location", value: config.location },
    { icon: Briefcase, label: "Role", value: "Full Stack Dev @ Equal Pixels" },
    { icon: GraduationCap, label: "Education", value: "BS Software Engineering" },
    { icon: Sparkles, label: "Focus", value: "Marketplaces & APIs" },
  ];

  return (
    <SectionWrapper id="about">
      <SectionHeading title="About Me" />

      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {config.aboutBio.map((paragraph, i) => (
            <p key={i} className="text-foreground-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
            >
              <fact.icon size={20} className="mb-2 text-accent" />
              <p className="text-xs text-foreground-muted">{fact.label}</p>
              <p className="text-sm font-medium text-foreground">{fact.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
