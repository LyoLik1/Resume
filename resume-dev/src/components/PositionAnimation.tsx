'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './PositionAnimation.module.css';
import Image from 'next/image';

const PositionAnimation: React.FC = () => {
  const svgVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={styles.positionContainer}
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <Image
        src="/front-end-dev.svg"
        alt="Front End Developer "
        width={600}
        height={77}
        className={styles.positionSvg}
      />
    </motion.div>
  );
};

export default PositionAnimation;