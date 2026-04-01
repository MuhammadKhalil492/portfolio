"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const defaultSettings = {
  id: "default",
  logo: "/images/logo.png",
  siteName: "Khalil.",
  footerText: "Muhammad Khalil Safi. All rights reserved.",
  footerSubtext: "Built with Next.js & Tailwind CSS",
  heroName: "Muhammad Khalil Safi",
  heroGreeting: "Hello, I'm",
  heroTagline: "Building scalable web applications and complex marketplaces",
  heroRoles: '["Full Stack Developer","React Developer","Laravel Expert","API Architect"]',
  aboutBio: "[]",
  email: "mkhalilmuhuram29@gmail.com",
  phone: "+92 309 8788494",
  location: "Lahore, Pakistan",
  linkedin: "https://linkedin.com/in/khalil-developer",
  github: "https://github.com/MuhammadKhalil492",
  resumeUrl: "/resume/khalil-safi-resume.pdf",
  updatedAt: new Date(),
};

export async function getSettings() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: "default" },
      });
    }

    return settings;
  } catch {
    return defaultSettings;
  }
}

export async function updateSettings(data: {
  logo?: string;
  siteName?: string;
  footerText?: string;
  footerSubtext?: string;
  heroName?: string;
  heroGreeting?: string;
  heroTagline?: string;
  heroRoles?: string[];
  aboutBio?: string[];
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  resumeUrl?: string;
}) {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      logo: data.logo,
      siteName: data.siteName,
      footerText: data.footerText,
      footerSubtext: data.footerSubtext,
      heroName: data.heroName,
      heroGreeting: data.heroGreeting,
      heroTagline: data.heroTagline,
      heroRoles: data.heroRoles ? JSON.stringify(data.heroRoles) : undefined,
      aboutBio: data.aboutBio ? JSON.stringify(data.aboutBio) : undefined,
      email: data.email,
      phone: data.phone,
      location: data.location,
      linkedin: data.linkedin,
      github: data.github,
      resumeUrl: data.resumeUrl,
    },
    create: { id: "default" },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
}
