"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function getProject(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function createProject(data: {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  displayOrder?: number;
  visible?: boolean;
}) {
  await prisma.project.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      features: JSON.stringify(data.features),
      tech: JSON.stringify(data.tech),
      liveUrl: data.liveUrl || "",
      githubUrl: data.githubUrl || "",
      image: data.image || "",
      displayOrder: data.displayOrder || 0,
      visible: data.visible ?? true,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function updateProject(
  id: string,
  data: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    tech: string[];
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
    displayOrder?: number;
    visible?: boolean;
  }
) {
  await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      features: JSON.stringify(data.features),
      tech: JSON.stringify(data.tech),
      liveUrl: data.liveUrl || "",
      githubUrl: data.githubUrl || "",
      image: data.image || "",
      displayOrder: data.displayOrder || 0,
      visible: data.visible ?? true,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}
