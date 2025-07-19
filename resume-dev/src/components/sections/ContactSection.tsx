'use client';

import React, { useState, useRef } from 'react';
import styles from './ContactSection.module.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@/contexts/ThemeContext';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faPhone, faRobot } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons';

interface ContactProp {
  type: string;
  value: string;
  href: string;
}

interface Contact extends ContactProp {
  icon: IconDefinition;
  ariaLabel: string;
  hoverColor: string;
  glowColor?: string;
  hueRotateValue: string;
}

interface ContactSectionProps {
  contacts: ContactProp[];
}

const getIconForContact = (type: string): IconDefinition => {
  switch (type.toLowerCase()) {
    case 'email': return faEnvelope;
    case 'phone': return faPhone;
    case 'linkedin': return faLinkedin;
    case 'github': return faGithub;
    case 'telegram': return faTelegram;
    default: return faRobot;
  }
};

const getContactStyling = (type: string) => {
    switch (type.toLowerCase()) {
        case 'email': return { hoverColor: '#ADD8E6', hueRotateValue: '196deg' };
        case 'phone': return { hoverColor: '#25D366', hueRotateValue: '145deg' };
        case 'linkedin': return { hoverColor: '#0077B5', hueRotateValue: '207deg' };
        case 'github': return { hoverColor: '#333333', glowColor: '#333333', hueRotateValue: '0deg' };
        case 'telegram': return { hoverColor: '#26A5E4', hueRotateValue: '200deg' };
        default: return { hoverColor: '#FFA500', hueRotateValue: '39deg' };
    }
}
const hexToRgbString = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255'; 
};

const ContactSection: React.FC<ContactSectionProps> = ({ contacts }) => {
    const { theme } = useTheme();

    const contactData: Contact[] = contacts.map(c => {
        const styling = getContactStyling(c.type);
        const typeLower = c.type.toLowerCase();

        if (typeLower === 'github') {
            styling.hoverColor = theme === 'light' ? '#333333' : '#FFFFFF';
        } else if (typeLower === 'email') {
            styling.hoverColor = theme === 'light' ? '#0077B5' : '#ADD8E6';
        }

        return {
            ...c,
            icon: getIconForContact(c.type),
            ariaLabel: `Contact ${c.type === 'Email' || c.type === 'Phone' ? 'by' : 'on'} ${c.type}`,
            ...styling
        };
    });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [currentHoverColor, setCurrentHoverColor] = useState<string | null>(null);

  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10; 
    const rotateY = (x - centerX) / -10; 

    setRotate({ x: rotateX, y: rotateY });
    setCurrentHoverColor(contactData[index].hoverColor);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setCurrentHoverColor(null);
  };

  const handleContactClick = async (contact: Contact) => {
    if (contact.type === 'Email' || contact.type === 'Phone') {
      try {
        await navigator.clipboard.writeText(contact.value);
        setNotificationText(`${contact.type} copied!`);
      } catch (error) {
        console.error('Failed to copy:', error);
        setNotificationText(`Failed to copy ${contact.type}`);
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } else if (contact.type === 'AI Assistant') {
      setNotificationText('AI Assistant interaction is not yet implemented.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="contact" className={`${styles.contactSection}`}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>
      <div className={styles.contactsGrid}>
        {contactData.map((contact, index) => {
          const glowColorForCss = contact.glowColor || contact.hoverColor;
          const glowColorRgb = hexToRgbString(glowColorForCss);
          const isInteractiveCard = contact.type === 'Email' || contact.type === 'Phone' || contact.type === 'AI Assistant';

          return (
            <motion.a
              key={contact.type}
              ref={(el: HTMLAnchorElement | null) => { cardRefs.current[index] = el; }}
              className={`${styles.contactItem} ${currentHoverColor === contact.hoverColor ? styles.hoverEffect : ''}`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
              href={contact.type === 'LinkedIn' ? 'https://www.linkedin.com/in/oleksii-nieznakomov-135b9a2a4/' : (isInteractiveCard ? '#' : contact.href)}
              target={!isInteractiveCard ? '_blank' : undefined}
              rel={!isInteractiveCard ? 'noopener noreferrer' : undefined}
              onClick={(e) => {
                if (isInteractiveCard) {
                  e.preventDefault();
                  handleContactClick(contact);
                }
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                // @ts-expect-error CSS Custom Properties are not fully supported in TSX style prop typing for --hover-color
                '--hover-color': contact.hoverColor, 
                '--glow-color-rgb': glowColorRgb,
                '--hue-rotate-value': contact.hueRotateValue,
              }}
              onKeyPress={(e) => {
                if (isInteractiveCard && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleContactClick(contact);
                }
              }}
              aria-label={contact.ariaLabel}
            >
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={contact.icon} size="2x" />
              </div>
              <h3 className={styles.contactType}>{contact.type}</h3>
              <span className={styles.contactValue}>
                {contact.type === 'LinkedIn'
                  ? 'linkedin.com/in/oleksii-nieznakomov'
                  : contact.type === 'GitHub'
                  ? 'github.com/LyoLik1'
                  : contact.type === 'Telegram'
                  ? 't.me/Lyo_Likk'
                  : contact.value}
              </span>
            </motion.a>
          );
        })}
      </div>
      {showNotification && (
        <motion.div
          className={styles.copyNotification}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {notificationText}
        </motion.div>
      )}
    </section>
  );
};

export default ContactSection;