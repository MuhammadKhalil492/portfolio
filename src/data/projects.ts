import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Carsooq",
    subtitle: "UAE Automotive Marketplace",
    description:
      "The UAE's trusted automotive marketplace designed to digitize traditional car 'Sooqs' and streamline global vehicle exports. Connects buyers, verified showrooms, and global exporters with AI-powered multilingual support.",
    features: [
      "Mobile Application API Infrastructure — high-performance RESTful APIs powering the Carsooq mobile app",
      "AI-Powered Multi-Language Translator — auto-translating vehicle descriptions between international buyers and local UAE sellers",
      "Verified Showroom Ecosystem — secure B2B portal for verified showrooms to manage inventory and receive direct leads",
      "Global Export Engine — specialized search filters for export-ready vehicles with regional-spec filtering (GCC vs. European/American)",
      "Smart Lead Routing — direct lead generation via WhatsApp and webhooks for instant seller response",
    ],
    tech: ["Laravel", "React", "Tailwind CSS", "Python", "REST APIs"],
    liveUrl: "https://carsooq.com",
    image: "/images/projects/carsooq.webp",
  },
  {
    title: "ESP Marketplace",
    subtitle: "B2B Multi-Vendor Global Trade Platform",
    description:
      "A global B2B multi-vendor trade platform connecting international buyers with verified manufacturers and wholesalers. Supports complex negotiations, multi-currency transactions, and comprehensive vendor analytics.",
    features: [
      "Advanced RFQ System — buyers request custom pricing and specifications from multiple suppliers simultaneously",
      "Verified Supplier Verification — multi-tier verification workflow with badges and document validation",
      "Bulk Order & Negotiation Logic — complex pricing algorithms for tiered wholesale discounts and direct negotiation channels",
      "Multi-Currency & Regional Trade — automatic currency conversion and localized shipping estimates",
      "Vendor Performance Analytics — comprehensive dashboard tracking store views, inquiry conversion rates, and buyer demographics",
    ],
    tech: ["Laravel", "Livewire", "FilamentPHP", "Tailwind CSS", "Alpine.js"],
    liveUrl: "https://espmarketplace.com",
    image: "/images/projects/espmarketplace.webp",
  },
];
