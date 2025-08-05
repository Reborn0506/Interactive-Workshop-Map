'use client'

import { motion } from 'framer-motion'
import { useContent } from '../Context/ContentContext'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function Statistics() {
  const { statistics } = useContent()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Counter animation hook
  const useCounter = (end: string, duration: number = 2) => {
    const [count, setCount] = useState('0')
    
    useEffect(() => {
      if (!isInView) return
      
      // Extract numeric part from the string
      const numericEnd = parseFloat(end.replace(/[^\d.]/g, ''))
      const isPercentage = end.includes('%')
      const hasPlus = end.includes('+')
      const suffix = end.replace(/[\d.,]/g, '')
      
      if (isNaN(numericEnd)) {
        setCount(end)
        return
      }

      let start = 0
      const increment = numericEnd / (duration * 60) // 60fps
      
      const timer = setInterval(() => {
        start += increment
        if (start >= numericEnd) {
          setCount(end)
          clearInterval(timer)
        } else {
          const formattedValue = Math.floor(start).toLocaleString()
          setCount(`${formattedValue}${suffix}`)
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }, [end, duration, isInView])

    return count
  }

  if (statistics.length === 0) {
    return (
      <section id="statistics" className="py-20 bg-tesla-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">No Statistics Yet</h2>
          <p className="text-gray-300">Use the admin panel to add some statistics!</p>
        </div>
      </section>
    )
  }

  return (
    <section id="statistics" ref={ref} className="py-20 bg-tesla-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These statistics showcase our commitment to excellence and innovation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {statistics.map((stat, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const animatedValue = useCounter(stat.value)
            
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-tesla-blue/50 transition-all duration-300"
                >
                  <motion.div
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-tesla-blue transition-colors duration-300"
                  >
                    {animatedValue}
                  </motion.div>
                  
                  <div className="text-gray-300 text-sm md:text-base font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="mt-4 h-1 bg-gradient-to-r from-tesla-blue to-tesla-red rounded-full origin-left"
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="w-4 h-4 bg-gradient-to-r from-tesla-blue to-tesla-red rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-tesla-blue/20 to-tesla-red/20 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-tesla-blue rounded-full border-t-tesla-red"
            />
            <span className="text-white font-medium">Continuously growing and improving</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}