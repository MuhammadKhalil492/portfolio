"use client";

import { motion } from "motion/react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { SkillCategory } from "@/types";

export function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  let globalIndex = 0;

  return (
    <SectionWrapper id="skills" className="bg-background-secondary">
      <SectionHeading title="Tech Stack" subtitle="Technologies I work with" />
      <div className="mx-auto max-w-4xl space-y-10">
        {skills.map((category) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-muted">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => {
                const idx = globalIndex++;
                return <SkillBadge key={skill} name={skill} index={idx} />;
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
