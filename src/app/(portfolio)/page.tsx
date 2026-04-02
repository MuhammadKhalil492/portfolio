import { prisma } from "@/lib/prisma";
import { getSettings } from "@/actions/settings";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";

// Static data fallbacks
import { experiences as staticExperiences } from "@/data/experience";
import { projects as staticProjects } from "@/data/projects";
import { skillCategories as staticSkills } from "@/data/skills";
import { personalInfo } from "@/data/personal";

export const dynamic = "force-dynamic";

export default async function Home() {
  let dbProjects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  let dbExperiences: Awaited<ReturnType<typeof prisma.experience.findMany>> = [];
  let dbSkills: Awaited<ReturnType<typeof prisma.skillCategory.findMany>> = [];
  let settings = await getSettings();

  try {
    [dbProjects, dbExperiences, dbSkills] = await Promise.all([
      prisma.project.findMany({
        where: { visible: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.experience.findMany({
        where: { visible: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.skillCategory.findMany({ orderBy: { displayOrder: "asc" } }),
    ]);
  } catch {
    // Database unavailable — fall through to static data fallbacks
  }

  const projects =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({
          title: p.title,
          subtitle: p.subtitle,
          description: p.description,
          features: JSON.parse(p.features) as string[],
          tech: JSON.parse(p.tech) as string[],
          liveUrl: p.liveUrl || undefined,
          githubUrl: p.githubUrl || undefined,
          image: p.image,
        }))
      : staticProjects;

  const experiences =
    dbExperiences.length > 0
      ? dbExperiences.map((e) => ({
          role: e.role,
          company: e.company,
          location: e.location,
          period: e.period,
          description: e.description,
          highlights: JSON.parse(e.highlights) as string[],
        }))
      : staticExperiences;

  const skills =
    dbSkills.length > 0
      ? dbSkills.map((s) => ({
          category: s.category,
          skills: JSON.parse(s.skills) as string[],
        }))
      : staticSkills;

  const heroRoles = JSON.parse(settings.heroRoles || "[]") as string[];
  const aboutBio = JSON.parse(settings.aboutBio || "[]") as string[];

  const siteConfig = {
    heroGreeting: settings.heroGreeting,
    heroName: settings.heroName,
    heroTagline: settings.heroTagline,
    heroRoles: heroRoles.length > 0 ? heroRoles : personalInfo.roles,
    aboutBio: aboutBio.length > 0 ? aboutBio : personalInfo.bio,
    email: settings.email || personalInfo.email,
    phone: settings.phone || personalInfo.phone,
    location: settings.location || personalInfo.location,
    linkedin: settings.linkedin || personalInfo.linkedin,
    github: settings.github || personalInfo.github,
    resumeUrl: settings.resumeUrl || personalInfo.resumeUrl,
  };

  return (
    <>
      <HeroSection config={siteConfig} />
      <AboutSection config={siteConfig} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <EducationSection />
      <ContactSection config={siteConfig} />
    </>
  );
}
