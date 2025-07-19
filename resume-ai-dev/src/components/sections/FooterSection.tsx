'use client';

import React from 'react';
import styles from './FooterSection.module.css';
import { motion } from 'framer-motion';

interface FooterSectionProps {
    personalStatement: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ personalStatement }) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      id="footer"
      className={styles.footerSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.footerContent}>
        <p>
            {personalStatement}
        </p>
        <p>
          &copy; {currentYear} Oleksii Niezakomov. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default FooterSection;