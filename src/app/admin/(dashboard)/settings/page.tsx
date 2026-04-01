import { getSettings } from "@/actions/settings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const settings = await getSettings();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="text-sm text-zinc-400">
          Manage your portfolio branding, contact info, and site configuration.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
