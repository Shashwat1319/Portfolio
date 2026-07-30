import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion"

const ScrollProgress = () => {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (prefersReducedMotion) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[9998]"
      style={{
        scaleX,
        background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
        boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
      }}
    />
  )
}

export default ScrollProgress
