'use client';

import React from 'react';
import styles from './ExperienceSection.module.css';
import { motion } from 'framer-motion';

interface ExperienceItem {
  jobTitle: string;
  companyName: string;
  companyUrl?: string;
  dates: string;
  responsibilities: string[];
}

interface ExperienceSectionProps {
    workHistory: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ workHistory }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = (index: number) => ({
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.2 },
    },
  });

  return (
    <motion.section
      id="experience"
      className={`${styles.experienceSection} section-gradient-background`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <motion.h2
        className={styles.title}
        initial={{ opacity:0, y: -20}}
        whileInView={{ opacity:1, y:0}}
        viewport={{ once: true, amount: 0.5 }}
        transition={{duration: 0.5}}
      >
        Work Experience
      </motion.h2>
      <div className={styles.timeline}>
        {workHistory.map((item, index) => (
          <motion.div
            key={index}
            className={styles.timelineItem}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants(index)}
          >
            <div className={styles.timelineContent}>
              <h3 className={styles.jobTitle}>{item.jobTitle}</h3>
              {item.companyName && (
                item.companyUrl ? (
                  <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className={styles.companyLink}>
                    <p className={styles.companyName}>{item.companyName}</p>
                  </a>
                ) : (
                  <p className={styles.companyName}>{item.companyName}</p>
                )
              )}
              <p className={styles.dates}>{item.dates}</p>
              <ul className={styles.responsibilities}>
                {item.responsibilities.map((resp, i) => {
                  const htmlResp = resp.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                  return <li key={i} dangerouslySetInnerHTML={{ __html: htmlResp }} />;
                })}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ExperienceSection;