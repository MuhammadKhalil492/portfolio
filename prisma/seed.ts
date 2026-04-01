const { PrismaClient } = require("../src/generated/prisma") as typeof import("../src/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Projects
  await prisma.project.createMany({
    data: [
      {
        title: "Carsooq",
        subtitle: "UAE Automotive Marketplace",
        description:
          "The UAE's trusted automotive marketplace designed to digitize traditional car 'Sooqs' and streamline global vehicle exports. Connects buyers, verified showrooms, and global exporters with AI-powered multilingual support.",
        features: JSON.stringify([
          "Mobile Application API Infrastructure — high-performance RESTful APIs powering the Carsooq mobile app",
          "AI-Powered Multi-Language Translator — auto-translating vehicle descriptions between international buyers and local UAE sellers",
          "Verified Showroom Ecosystem — secure B2B portal for verified showrooms to manage inventory and receive direct leads",
          "Global Export Engine — specialized search filters for export-ready vehicles with regional-spec filtering (GCC vs. European/American)",
          "Smart Lead Routing — direct lead generation via WhatsApp and webhooks for instant seller response",
        ]),
        tech: JSON.stringify(["Laravel", "React", "Tailwind CSS", "Python", "REST APIs"]),
        liveUrl: "https://carsooq.com",
        image: "/images/projects/carsooq.webp",
        displayOrder: 0,
      },
      {
        title: "ESP Marketplace",
        subtitle: "B2B Multi-Vendor Global Trade Platform",
        description:
          "A global B2B multi-vendor trade platform connecting international buyers with verified manufacturers and wholesalers. Supports complex negotiations, multi-currency transactions, and comprehensive vendor analytics.",
        features: JSON.stringify([
          "Advanced RFQ System — buyers request custom pricing and specifications from multiple suppliers simultaneously",
          "Verified Supplier Verification — multi-tier verification workflow with badges and document validation",
          "Bulk Order & Negotiation Logic — complex pricing algorithms for tiered wholesale discounts and direct negotiation channels",
          "Multi-Currency & Regional Trade — automatic currency conversion and localized shipping estimates",
          "Vendor Performance Analytics — comprehensive dashboard tracking store views, inquiry conversion rates, and buyer demographics",
        ]),
        tech: JSON.stringify(["Laravel", "Livewire", "FilamentPHP", "Tailwind CSS", "Alpine.js"]),
        liveUrl: "https://espmarketplace.com",
        image: "/images/projects/espmarketplace.webp",
        displayOrder: 1,
      },
    ],
  });

  // Seed Experience
  await prisma.experience.create({
    data: {
      role: "Full Stack Developer",
      company: "Equal Pixels",
      location: "Lahore",
      period: "2023 — Present",
      description:
        "Building high-performance web applications and custom software solutions. Focused on delivering robust, maintainable codebases for diverse client requirements.",
      highlights: JSON.stringify([
        "Lead end-to-end development of complex web systems using the TALL stack and React for highly interactive user interfaces",
        "Engineered robust RESTful APIs and microservices for seamless data exchange between front-end and third-party services",
        "Integrated complex third-party APIs including payment gateways, shipping providers, and AI translation services",
        "Leveraged Python for backend scripting, data processing, and automation tasks",
        "Implemented custom administrative dashboards using FilamentPHP for streamlined data management",
        "Architected scalable backend structures and managed database migrations for growing user bases",
        "Collaborated with design teams to translate UI/UX wireframes into responsive, high-performance components",
        "Mentored junior developers and participated in code reviews to maintain high engineering standards",
      ]),
      displayOrder: 0,
    },
  });

  // Seed Skills
  await prisma.skillCategory.createMany({
    data: [
      {
        category: "Languages",
        skills: JSON.stringify(["JavaScript", "TypeScript", "Python", "HTML", "CSS"]),
        displayOrder: 0,
      },
      {
        category: "Frontend",
        skills: JSON.stringify(["React", "Next.js", "Livewire", "Alpine.js", "Tailwind CSS", "Bootstrap"]),
        displayOrder: 1,
      },
      {
        category: "Backend",
        skills: JSON.stringify(["Laravel", "FilamentPHP", "REST APIs", "Microservices"]),
        displayOrder: 2,
      },
      {
        category: "Tools & Practices",
        skills: JSON.stringify(["Git", "Database Design", "API Architecture", "Agile"]),
        displayOrder: 3,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
