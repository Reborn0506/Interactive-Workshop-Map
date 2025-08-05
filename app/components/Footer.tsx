'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Statistics', href: '#statistics' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'info@dynamicshowcase.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: 'San Francisco, CA' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-tesla-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 40%, white 40%, white 60%, transparent 60%)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Dynamic Showcase
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering content creators with flexible, modern web experiences. 
              Build stunning websites that adapt to your unique vision.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-tesla-blue/20 transition-colors duration-300 border border-white/20 hover:border-tesla-blue/50"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-tesla-blue">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-tesla-blue">Contact</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <contact.icon size={16} className="text-tesla-blue" />
                  <span className="text-gray-300">{contact.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Get the latest updates and features delivered to your inbox.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-tesla-blue/50 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-tesla-blue hover:bg-tesla-blue/90 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-gray-400 text-sm">
            © {currentYear} Dynamic Showcase. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </motion.div>

        {/* Animated Elements */}
        <div className="absolute top-10 right-10 opacity-10">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-24 h-24 border-2 border-tesla-blue rounded-full"
          />
        </div>
        
        <div className="absolute bottom-10 left-10 opacity-10">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 bg-tesla-red rounded-lg"
          />
        </div>
      </div>
    </footer>
  )
}