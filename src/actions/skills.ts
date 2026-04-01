"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSkillCategories() {
  return prisma.skillCategory.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function getSkillCategory(id: string) {
  return prisma.skillCategory.findUnique({ where: { id } });
}

export async function createSkillCategory(data: {
  category: string;
  skills: string[];
  displayOrder?: number;
}) {
  await prisma.skillCategory.create({
    data: {
      category: data.category,
      skills: JSON.stringify(data.skills),
      displayOrder: data.displayOrder || 0,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function updateSkillCategory(
  id: string,
  data: {
    category: string;
    skills: string[];
    displayOrder?: number;
  }
) {
  await prisma.skillCategory.update({
    where: { id },
    data: {
      category: data.category,
      skills: JSON.stringify(data.skills),
      displayOrder: data.displayOrder || 0,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkillCategory(id: string) {
  await prisma.skillCategory.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}
