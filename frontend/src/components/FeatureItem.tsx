import React from 'react'
import { motion } from 'framer-motion'

export const animationContainer = {
  hidden: { opacity: 0.4, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      damping: 20,
      staggerChildren: 0.1,
      stiffness: 260,
      type: 'spring',
      when: 'beforeChildren',
    },
  },
}

const animationItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const FeatureList = ({ title, description }: IProps) => {
  return (
    <motion.div variants={animationItem}>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

interface IProps {
  title: string
  description: string
}


export default FeatureList