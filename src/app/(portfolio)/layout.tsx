import { getSettings } from "@/actions/settings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <Navbar logo={settings.logo} siteName={settings.siteName} />
      <main>{children}</main>
      <Footer
        logo={settings.logo}
        footerText={settings.footerText}
        footerSubtext={settings.footerSubtext}
        email={settings.email}
        github={settings.github}
        linkedin={settings.linkedin}
      />
    </>
  );
}
