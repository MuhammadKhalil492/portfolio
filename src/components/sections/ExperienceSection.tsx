"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export function ExperienceSection({ experiences }: { experiences: ExperienceItem[] }) {
  return (
    <SectionWrapper id="experience" className="bg-background-secondary">
      <SectionHeading title="Work Experience" />
      <div className="mx-auto max-w-3xl space-y-12">
        {experiences.map((exp) => (
          <TimelineItem key={exp.company + exp.role} {...exp} />
        ))}
      </div>
    </SectionWrapper>
  );
}
