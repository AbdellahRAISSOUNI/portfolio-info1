'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
  
  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="section-padding bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a]/70 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax background elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-40 left-10 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-40 right-10 w-64 h-64 bg-[#10b981]/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ opacity, scale }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Side with 3D effect */}
          <motion.div 
            variants={itemVariants} 
            className="relative"
            style={{ y: y1 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0">
              <motion.div 
                className="absolute -inset-4 rounded-xl bg-gradient-to-r from-[#3b82f6]/20 to-[#10b981]/20 blur-xl opacity-70"
                animate={{
                  background: [
                    "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)",
                    "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)",
                    "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)",
                    "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div 
                className="absolute inset-0 rounded-xl bg-[#171717] border border-[#262626] overflow-hidden"
                style={{ 
                  rotateY: useTransform(() => mousePosition.x * 5),
                  rotateX: useTransform(() => -mousePosition.y * 5),
                  transformPerspective: 1000,
                }}
              >
                <Image
                  src="/about.jpg"
                  alt="Abdellah Raissouni working"
                  fill
                  className="object-cover"
                />
                {/* Reflective overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              </motion.div>
              
              {/* Experience badge with 3D effect */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-[#171717] border border-[#262626] rounded-lg p-4 shadow-xl"
                style={{ 
                  x: useTransform(() => mousePosition.x * 15),
                  y: useTransform(() => mousePosition.y * 15),
                  rotateY: useTransform(() => mousePosition.x * 10),
                  rotateX: useTransform(() => -mousePosition.y * 10),
                  transformPerspective: 1000,
                }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-center">
                  <span className="block text-3xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">3+</span>
                  <span className="text-sm text-gray-400">Years Experience</span>
                </div>
              </motion.div>
              
              {/* Decorative elements with 3D effect */}
              <motion.div 
                className="absolute -top-6 -left-6 w-12 h-12 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center border border-[#3b82f6]/20"
                style={{ 
                  x: useTransform(() => -mousePosition.x * 20),
                  y: useTransform(() => -mousePosition.y * 20),
                  rotateY: useTransform(() => -mousePosition.x * 15),
                  rotateX: useTransform(() => mousePosition.y * 15),
                }}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content Side with parallax */}
          <motion.div style={{ y: y2 }}>
            <motion.div variants={itemVariants} className="mb-4">
              <span className="px-4 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm font-medium">
                About Me
              </span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="heading">
              Engineering Student & 
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent"> Web Developer</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="mt-6 text-gray-300 leading-relaxed">
              I'm Abdellah Raissouni, an engineering student with a passion for creating exceptional web experiences. 
              I combine my technical knowledge with creative problem-solving to build websites and applications that 
              not only look stunning but also deliver results.
            </motion.p>
            
            <motion.p variants={itemVariants} className="mt-4 text-gray-300 leading-relaxed">
              My journey in web development started 3 years ago, and since then, I've worked on numerous projects 
              ranging from small business websites to complex web applications. I specialize in modern frontend 
              technologies and have a strong foundation in engineering principles that allows me to approach 
              problems with a unique perspective.
            </motion.p>
            
            {/* Stats with interactive hover effects */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10"
            >
              {[
                { number: '20+', label: 'Projects Completed' },
                { number: '15+', label: 'Happy Clients' },
                { number: '3+', label: 'Years Experience' },
                { number: '5+', label: 'Technologies' },
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-4 bg-[#171717]/50 rounded-lg border border-[#262626] relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {/* Animated background on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/0 to-[#10b981]/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    animate={{ 
                      background: [
                        "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))",
                        "linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
                        "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent relative z-10">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 relative z-10">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 