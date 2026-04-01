"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getExperiences() {
  return prisma.experience.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function getExperience(id: string) {
  return prisma.experience.findUnique({ where: { id } });
}

export async function createExperience(data: {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  displayOrder?: number;
  visible?: boolean;
}) {
  await prisma.experience.create({
    data: {
      role: data.role,
      company: data.company,
      location: data.location,
      period: data.period,
      description: data.description,
      highlights: JSON.stringify(data.highlights),
      displayOrder: data.displayOrder || 0,
      visible: data.visible ?? true,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function updateExperience(
  id: string,
  data: {
    role: string;
    company: string;
    location: string;
    period: string;
    description: string;
    highlights: string[];
    displayOrder?: number;
    visible?: boolean;
  }
) {
  await prisma.experience.update({
    where: { id },
    data: {
      role: data.role,
      company: data.company,
      location: data.location,
      period: data.period,
      description: data.description,
      highlights: JSON.stringify(data.highlights),
      displayOrder: data.displayOrder || 0,
      visible: data.visible ?? true,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}
