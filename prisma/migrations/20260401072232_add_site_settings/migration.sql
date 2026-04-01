-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "logo" TEXT NOT NULL DEFAULT '/images/logo.png',
    "siteName" TEXT NOT NULL DEFAULT 'Khalil.',
    "footerText" TEXT NOT NULL DEFAULT 'Muhammad Khalil Safi. All rights reserved.',
    "footerSubtext" TEXT NOT NULL DEFAULT 'Built with Next.js & Tailwind CSS',
    "heroName" TEXT NOT NULL DEFAULT 'Muhammad Khalil Safi',
    "heroGreeting" TEXT NOT NULL DEFAULT 'Hello, I''m',
    "heroTagline" TEXT NOT NULL DEFAULT 'Building scalable web applications and complex marketplaces',
    "heroRoles" TEXT NOT NULL DEFAULT '["Full Stack Developer","React Developer","Laravel Expert","API Architect"]',
    "aboutBio" TEXT NOT NULL DEFAULT '[]',
    "email" TEXT NOT NULL DEFAULT 'mkhalilmuhuram29@gmail.com',
    "phone" TEXT NOT NULL DEFAULT '+92 309 8788494',
    "location" TEXT NOT NULL DEFAULT 'Lahore, Pakistan',
    "linkedin" TEXT NOT NULL DEFAULT 'https://linkedin.com/in/khalil-developer',
    "github" TEXT NOT NULL DEFAULT 'https://github.com/MuhammadKhalil492',
    "resumeUrl" TEXT NOT NULL DEFAULT '/resume/khalil-safi-resume.pdf',
    "updatedAt" DATETIME NOT NULL
);
