"use client";
import React from 'react';
import styles from './PortfolioSection.module.css';
import { motion } from 'framer-motion';
import ProjectCard from '../ProjectCard';
import { ResumeData } from '@/lib/resumeParser';

type PortfolioItem = ResumeData['portfolio'][0];

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolio }) => {
  return (
    <section id="portfolio" className={`${styles.portfolioSection} section-gradient-background`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={styles.title}
      >
        Portfolio
      </motion.h2>
      <div className={styles.portfolioGrid}>
        {portfolio.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;