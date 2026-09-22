'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'span' | 'figure';
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Scroll-triggered entrance. Deliberately restrained — a short fade and a small
 * rise, nothing that draws attention to itself.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = 'up',
  distance = 24,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, ...offset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      data-reveal
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -60px 0px' }}
    >
      {children}
    </MotionTag>
  );
}
