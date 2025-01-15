// Animation config for BestSelling component

export const bestSellingAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  },

  itemVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  },
};

// Animation config for LatestProduct component

export const latestProductAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },

  cardVariants: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  },
};

// Animation config for FeaturedProduct component

export const featuredProductAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  },

  imageVariants: {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  },

  titleVariants: {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
};

// Animation config for Categories component

export const categoryAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5,
        when: "beforeChildren",
      },
    },
  },

  cardVariants: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  },

  imageVariants: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
  },

  overlayVariants: {
    initial: { opacity: 0 },
    hover: { opacity: 0.3 },
  },
};

// Animation config for Subscribe component

export const subscribeAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  },

  itemVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  },

  featureVariants: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  },

  imageVariants: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 0.5,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  },
};

// Animation config for Login component

export const loginAnimations = {
  // Left side image animations
  imageContainerVariants: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 90,
      damping: 20,
    },
  },

  imageVariants: {
    whileHover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },

  // Form container animations
  formContainerVariants: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 90,
      damping: 20,
      delay: 0.2,
    },
  },

  // Header animations
  headerVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5, duration: 0.6 },
  },

  // Input field animations
  inputVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },

  // Individual input delays
  emailInputTransition: {
    delay: 0.6,
    duration: 0.5,
  },

  passwordInputTransition: {
    delay: 0.7,
    duration: 0.5,
  },

  // Forgot password link animations
  forgotPasswordVariants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.8, duration: 0.5 },
  },

  // Button animations
  buttonVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.9, duration: 0.5 },
  },

  // Register link animations
  registerLinkVariants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 1, duration: 0.5 },
  },
};

// Animation config for Register component

export const registerAnimations = {
  imageContainerVariants: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 90,
      damping: 20,
    },
  },

  imageVariants: {
    whileHover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },

  // Form container animations
  formContainerVariants: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 90,
      damping: 20,
      delay: 0.2,
    },
  },

  // Header animations
  headerVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5, duration: 0.6 },
  },

  // Input field animations with different delays
  getInputVariants: (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
  }),

  // Button animations
  buttonVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 1.2, duration: 0.5 },
  },

  // Login link animations
  loginLinkVariants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 1.3, duration: 0.5 },
  },
};

// Animation config for ProductGrid component

export const productGridAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },

  cardVariants: (index) => ({
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      },
    },
  }),

  titleVariants: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },

  buttonVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
  },
};

// Add animation config for ProductView component
export const productViewAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
};
