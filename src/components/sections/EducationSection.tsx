"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <SectionWrapper id="education">
      <SectionHeading title="Education" />
      <div className="mx-auto max-w-2xl">
        {education.map((edu) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 rounded-xl border border-border bg-card p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <GraduationCap size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
              <p className="text-foreground-muted">{edu.institution}</p>
              <p className="mt-1 text-sm text-accent">{edu.period}</p>
              <p className="mt-2 text-sm text-foreground-muted">{edu.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
