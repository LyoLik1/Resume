import type { Metadata } from 'next';
import React from 'react';
import { parseResume } from '@/lib/resumeParser';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import AboutSection from '@/components/sections/AboutSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import EducationSection from '@/components/sections/EducationSection';
import LanguagesSection from '@/components/sections/LanguagesSection';
import FooterSection from '@/components/sections/FooterSection';
import { BabylonScene } from '@/components/NeuralNetworkAnimation';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export const metadata: Metadata = {
  title: 'Resume AI Dev',
  description: 'AI Developer Resume',
};

export default function HomePage() {
  const resumeData = parseResume();

  return (
    <>
      <ThemeSwitcher />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <BabylonScene />
      </div>
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection personalInfo={resumeData.personalInfo} about={resumeData.about} />
        <ContactSection contacts={resumeData.contacts} />
        <AboutSection about={resumeData.about} />
        <TechStackSection techStack={resumeData.techStack} />
        <ExperienceSection workHistory={resumeData.workHistory} />
        <PortfolioSection portfolio={resumeData.portfolio} />
        <EducationSection education={resumeData.education} />
        <LanguagesSection languages={resumeData.languages} />
        <FooterSection personalStatement={resumeData.personalStatement} />
    </main>
    </>
  );
}