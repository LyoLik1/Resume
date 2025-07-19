'use client';

import React from 'react';
import styles from './AboutSection.module.css';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  about: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  const paragraphs = about.split('. ').map(s => s.trim()).filter(s => s);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      id="about"
      className={`${styles.aboutSection}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        <motion.div className={styles.aboutTextContainer} variants={itemVariants}>
          <h2 className={styles.title}>About Me</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className={styles.aboutParagraph}>
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;