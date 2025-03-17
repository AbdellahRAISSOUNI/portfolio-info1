'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="section-padding bg-gradient-to-b from-[#0a0a0a]/90 to-[#0a0a0a] relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-40 left-10 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-40 right-10 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ opacity, scale }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4 inline-block">
            <span className="px-4 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm font-medium">
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="heading">
            Let's <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">Connect</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="subheading max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info with 3D effect */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">
              Contact Information
            </motion.h3>
            
            <div className="space-y-6">
              {[
                {
                  icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                  title: 'Email',
                  content: 'abdellahraissouni@gmail.com'
                },
                {
                  icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                  title: 'Phone',
                  content: '0689541661'
                },
                {
                  icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                  title: 'Location',
                  content: 'Morocco'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <div className="relative flex items-start space-x-4 p-4 bg-[#171717]/50 rounded-lg border border-[#262626] group-hover:border-[#3b82f6]/50 transition-all duration-300">
                    <div className="bg-[#171717]/50 p-3 rounded-lg group-hover:bg-[#3b82f6]/10 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium group-hover:text-[#3b82f6] transition-colors duration-300">{item.title}</h4>
                      <p className="text-gray-400 mt-1">{item.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mt-12 mb-6">
              Follow Me
            </motion.h3>
            
            <motion.div variants={itemVariants} className="flex space-x-4">
              {[
                { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', href: 'https://github.com/AbdellahRAISSOUNI' },
                { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', href: 'https://ma.linkedin.com/in/abdellah-raissouni-1419432a8' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <div className="relative w-12 h-12 bg-[#171717]/50 rounded-full flex items-center justify-center border border-[#262626] group-hover:border-[#3b82f6]/50 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-gray-300 group-hover:text-[#3b82f6] transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Contact Form with 3D effect */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            <div className="relative bg-[#171717]/50 rounded-xl p-8 border border-[#262626] group-hover:border-[#3b82f6]/50 transition-all duration-300">
              <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">
                Send Me a Message
              </motion.h3>
              
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                  <p className="text-gray-300 mt-1">Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="relative w-full px-4 py-3 bg-[#171717]/50 border border-[#262626] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-transparent transition-all duration-300 group-hover:border-[#3b82f6]/50"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Email
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="relative w-full px-4 py-3 bg-[#171717]/50 border border-[#262626] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-transparent transition-all duration-300 group-hover:border-[#3b82f6]/50"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="relative w-full px-4 py-3 bg-[#171717]/50 border border-[#262626] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-transparent transition-all duration-300 group-hover:border-[#3b82f6]/50"
                        placeholder="Project Inquiry"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="relative w-full px-4 py-3 bg-[#171717]/50 border border-[#262626] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-transparent transition-all duration-300 resize-none group-hover:border-[#3b82f6]/50"
                        placeholder="Hello, I'd like to talk about..."
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#10b981] text-white font-medium rounded-lg transition-all duration-300 shadow-[0_5px_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_8px_25px_rgba(59,130,246,0.6)] group-hover:-translate-y-1 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 