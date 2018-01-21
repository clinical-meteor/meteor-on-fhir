import spring from 'react-motion/lib/spring';

const fadeConfig = { stiffness: 200, damping: 22 };
const popConfig = { stiffness: 800, damping: 30 };
const slideConfig = { stiffness: 330, damping: 30 };

export const fade = {
  atEnter: {
    opacity: 0,
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
  },
  atActive: {
    opacity: spring(1, fadeConfig),
  },
};

export const pop = {
  atEnter: {
    scale: 0.8,
    opacity: 0,
  },
  atLeave: {
    scale: spring(0.8, popConfig),
    opacity: spring(0, popConfig),
  },
  atActive: {
    scale: spring(1, popConfig),
    opacity: spring(1, popConfig)
  },
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    };
  },
};

export const slideLeft = {
  atEnter: {
    opacity: 0,
    offset: 100,
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
    offset: spring(-100, slideConfig),
  },
  atActive: {
    opacity: spring(1, slideConfig),
    offset: spring(0, slideConfig),
  },
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `translateX(${styles.offset}%)`,
    };
  },
};

export const slideRight = {
  atEnter: {
    opacity: 0,
    offset: -100,
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
    offset: spring(100, slideConfig),
  },
  atActive: {
    opacity: spring(1, slideConfig),
    offset: spring(0, slideConfig),
  },
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `translateX(${styles.offset}%)`,
    };
  },
};

// export default { fade, pop, slideLeft, slideRight };