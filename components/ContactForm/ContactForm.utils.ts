import { Variants } from 'framer-motion'

export const slideIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number,
): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : '100%',
    opacity: 0,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: 'easeOut',
    },
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: 'easeOut',
    },
  },
})
