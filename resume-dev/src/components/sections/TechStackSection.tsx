'use client';

import React from 'react';
import styles from './TechStackSection.module.css';
import { motion } from 'framer-motion';

interface TechStackSectionProps {
    techStack: { [key: string]: string[] };
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ techStack }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
    }),
  };
  
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.03, duration: 0.3, ease: 'easeOut' },
    }),
  };

  return (
    <motion.section
      id="tech-stack"
      className={`${styles.techStackSection} section-gradient-background`}
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
        Tech Stack
      </motion.h2>
      <div className={styles.categoriesGrid}>
        {Object.keys(techStack).map((category, categoryIndex) => (
          <motion.div
            key={category}
            className={styles.categoryCard}
            custom={categoryIndex}
            variants={cardVariants}
          >
            <h3 className={styles.categoryTitle}>{category}</h3>
            <ul className={styles.techList}>
              {techStack[category].map((tech, techIndex) => (
                <motion.li
                  key={tech}
                  className={styles.techListItem}
                  custom={techIndex} // Можно использовать общий индекс или индекс внутри категории
                  variants={listItemVariants}
                >
                  {tech}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TechStackSection;