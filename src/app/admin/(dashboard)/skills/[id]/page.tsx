import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SkillsForm } from "@/components/admin/SkillsForm";

export const dynamic = "force-dynamic";

export default async function EditSkillCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.skillCategory.findUnique({ where: { id } });

  if (!category) notFound();

  return <SkillsForm initialData={category} />;
}
