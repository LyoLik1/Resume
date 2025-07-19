'use client';

import React from 'react';
import styles from './HeroSection.module.css';
import { motion } from 'framer-motion';

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13v4h-2v-4H8l4-4 4 4h-3z" />
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);


interface HeroSectionProps {
  personalInfo: {
    name: string;
    position: string;
  };
  about: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ personalInfo, about }) => {
  const { name, position } = personalInfo;
  const introParagraphs = about.split('. ').map(s => s.trim()).filter(s => s);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
  };

  const viewportSettings = { once: false, amount: 0.2 };

  return (
    <section id="hero" className={`${styles.heroSection} section-gradient-background`}>
      <motion.h1
        className={styles.name}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={variants}
      >
        {name.toUpperCase()}
      </motion.h1>
      <motion.h2
        className={styles.title}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={variants}
      >
        {position}
      </motion.h2>
      {introParagraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          className={styles.intro} 
          custom={2 + index * 0.1} 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={variants}
        >
          {paragraph}
        </motion.p>
      ))}
      <motion.div
        className={styles.buttonsContainer}
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={variants}
      >
        <motion.a
          href="#contact"
          className={`${styles.button} ${styles.buttonPrimary}`}
          whileHover={{
            borderRadius: '9999px',
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <ContactIcon /> Contact Me
        </motion.a>
        <motion.a
          href="/CV_Oleksii_Nieznakomov.pdf"
          download
          className={`${styles.button} ${styles.buttonSecondary}`}
          whileHover={{
            borderRadius: '9999px',
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <DownloadIcon /> Download CV
        </motion.a>
      </motion.div>

     
    </section>
  );
};

export default HeroSection;