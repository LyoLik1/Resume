'use client';

import React from 'react';
import styles from './EducationSection.module.css';
import { motion } from 'framer-motion';

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  certificateLink?: string;
  courses?: string[];
}

interface EducationSectionProps {
    education: EducationItem[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <motion.section
      id="education"
      className={`${styles.educationSection} section-gradient-background`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      <motion.h2
        className={styles.title}
        initial={{ opacity:0, y: -20}}
        whileInView={{ opacity:1, y:0}}
        viewport={{ once: true, amount: 0.5 }}
        transition={{duration: 0.5}}
      >
        Education & Certificates
      </motion.h2>
      <div className={styles.educationGrid}>
        {education.map((edu, index) => (
          <motion.div
            key={index}
            className={styles.educationItem}
            custom={index}
            variants={itemVariants}
          >
            <h3 className={styles.institution}>{edu.institution}</h3>
            {edu.certificateLink ? (
                <a href={edu.certificateLink} target="_blank" rel="noopener noreferrer" className={styles.certificateLink}>
                    <p className={styles.degree}>{edu.degree}</p>
                </a>
            ) : (
                <p className={styles.degree}>{edu.degree}</p>
            )}
            <p className={styles.dates}>{edu.period}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EducationSection;