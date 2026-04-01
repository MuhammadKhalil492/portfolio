import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ExperienceForm } from "@/components/admin/ExperienceForm";

export const dynamic = "force-dynamic";

export default async function EditExperience({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });

  if (!experience) notFound();

  return <ExperienceForm initialData={experience} />;
}
