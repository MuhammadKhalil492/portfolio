"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -4 }}
      className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-accent-glow md:p-8"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
          <p className="mt-1 text-sm font-medium text-accent">{project.subtitle}</p>
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-muted transition-colors hover:text-accent"
            aria-label={`Visit ${project.title}`}
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>

      <p className="mb-6 text-foreground-muted leading-relaxed">
        {project.description}
      </p>

      <div className="mb-6 space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted">
          Key Features
        </h4>
        <ul className="space-y-2">
          {project.features.map((feature) => {
            const [title, ...rest] = feature.split(" — ");
            return (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-foreground-muted">
                  <span className="font-medium text-foreground">{title}</span>
                  {rest.length > 0 && ` — ${rest.join(" — ")}`}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
