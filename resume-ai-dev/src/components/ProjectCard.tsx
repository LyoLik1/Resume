"use client";
import React from 'react';
import styles from './ProjectCard.module.css';
import { motion } from 'framer-motion';
import { ResumeData } from '@/lib/resumeParser';

type PortfolioItem = ResumeData['portfolio'][0];

interface ProjectCardProps {
  project: PortfolioItem;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardStyle = project.screenshot
    ? {
        backgroundImage: `url(${project.screenshot})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  const CardContent = () => (
    <>
      <h3 className={styles.projectTitle}>{project.name}</h3>
      <p className={styles.projectDescription}>View project at {project.name}</p>
      <span className={styles.viewProjectLink}>View project &rarr;</span>
    </>
  );

  if (project.url !== '#') {
    return (
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.projectCardLink} ${project.screenshot ? styles.hasBackgroundImage : ''}`}
        style={cardStyle}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        custom={index}
        viewport={{ once: true }}
      >
        <div className={styles.cardOverlay}>
          <CardContent />
        </div>
      </motion.a>
    );
  }

  return (
    <motion.div
      className={`${styles.projectCard} ${project.screenshot ? styles.hasBackgroundImage : ''}`}
      style={cardStyle}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true }}
    >
      <div className={styles.cardOverlay}>
        <CardContent />
      </div>
    </motion.div>
  );
};

export default ProjectCard;