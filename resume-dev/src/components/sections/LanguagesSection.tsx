'use client';

import React from 'react';
import styles from './LanguagesSection.module.css';
import { motion } from 'framer-motion';

interface Language {
  name: string;
  level: string;
}

interface LanguagesSectionProps {
    languages: Language[];
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
  };

  return (
    <motion.section
      id="languages"
      className={`${styles.languagesSection} section-gradient-background`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.h2
        className={styles.title}
        initial={{ opacity:0, y: -20}}
        whileInView={{ opacity:1, y:0}}
        viewport={{ once: true, amount: 0.5 }}
        transition={{duration: 0.5}}
      >
        Languages
      </motion.h2>
      <div className={styles.languagesGrid}>
        {languages.map((lang, index) => (
          <motion.div
            key={index}
            className={styles.languageItem}
            custom={index}
            variants={itemVariants}
          >
            <h3 className={styles.languageName}>{lang.name}</h3>
            <p className={styles.languageLevel}>{lang.level}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default LanguagesSection;