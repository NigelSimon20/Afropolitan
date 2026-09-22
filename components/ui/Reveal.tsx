'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Distance in px the element travels into place. */
  distance?: number;
  /** Replay every time the element scrolls into view. */
  repeat?: boolean;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Scroll-triggered entrance wrapper used across every section so the whole site
 * shares one motion language.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 28,
  repeat = false,
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
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount: 0.25, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </MotionTag>
  );
}
