"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialLinks";

interface SiteConfig {
  heroGreeting: string;
  heroName: string;
  heroTagline: string;
  heroRoles: string[];
  resumeUrl: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export function HeroSection({ config }: { config: SiteConfig }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (config.heroRoles.length <= 1) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % config.heroRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.heroRoles.length]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-lg text-foreground-muted"
          >
            {config.heroGreeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 text-5xl font-extrabold md:text-7xl lg:text-8xl"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-400 bg-clip-text text-transparent">
              {config.heroName}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-6 h-10 text-xl font-medium text-foreground-muted md:text-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {config.heroRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-8 max-w-xl text-foreground-muted leading-relaxed"
          >
            {config.heroTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-light"
            >
              View My Work
              <ArrowDown size={16} />
            </a>
            <a
              href={config.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              Download CV
              <Download size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <SocialLinks
              size={22}
              github={config.github}
              linkedin={config.linkedin}
              email={config.email}
              phone={config.phone}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
