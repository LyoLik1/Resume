import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const nameSvgRef = useRef<HTMLObjectElement | null>(null);
  const titleSvgRef = useRef<HTMLObjectElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const topHalfRef = useRef<HTMLDivElement | null>(null);
  const bottomHalfRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (preloaderRef.current && topHalfRef.current && bottomHalfRef.current) {
              const tl = gsap.timeline({
                onComplete: () => {
                  setIsLoading(false);
                  if (preloaderRef.current) {
                    preloaderRef.current.style.display = 'none';
                  }
                }
              });
              tl.to(topHalfRef.current, { y: '-100%', duration: 0.7, ease: 'power2.inOut' })
                .to(bottomHalfRef.current, { y: '100%', duration: 0.7, ease: 'power2.inOut' }, '<');
            }
          }, 500);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const animateSvgPaths = (svgObjectRef: React.RefObject<HTMLObjectElement>) => {
    if (svgObjectRef.current && svgObjectRef.current.contentDocument) {
      const svgDocument = svgObjectRef.current.contentDocument;
      const paths = Array.from(svgDocument.querySelectorAll('path')) as SVGPathElement[];
      paths.forEach(path => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, autoAlpha: 1, stroke: '#FFFFFF' });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power1.inOut',
          delay: 0.5,
        });
      });
    }
  };

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.1,
        ease: 'linear',
      });
    }
  }, [progress]);


  if (!isLoading && progress < 100) {
  }

  if (!isLoading && progress === 100) {
      return null;
  }

  return (
    <div ref={preloaderRef} className={styles.preloaderContainer}>
      <div ref={topHalfRef} className={styles.halfScreen}>
        <div className={styles.svgTextContainer}>
          <object
            ref={nameSvgRef}
            type="image/svg+xml"
            data="/name.svg"
            className={styles.preloaderSvg}
            aria-label="MYKYTA NIEZNAKOMOV"
            onLoad={() => {
              if (nameSvgRef.current) {
                animateSvgPaths(nameSvgRef as React.RefObject<HTMLObjectElement>);
              }
            }}
          />
        </div>
      </div>
      <div className={styles.progressBarContainer}>
        <div ref={progressBarRef} className={styles.progressBar}></div>
      </div>
      <div ref={bottomHalfRef} className={styles.halfScreen}>
        <div className={styles.svgTextContainer}>
          <object
            ref={titleSvgRef}
            type="image/svg+xml"
            data="/full-stack_dev_ai_engineer.svg"
            className={styles.preloaderSvg}
            aria-label="FULL STACK DEV AI ENGINEER"
            onLoad={() => {
              if (titleSvgRef.current) {
                animateSvgPaths(titleSvgRef as React.RefObject<HTMLObjectElement>);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;