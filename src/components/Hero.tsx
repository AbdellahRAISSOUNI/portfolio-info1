'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export default function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    if (backgroundRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        
        setMousePosition({ x, y });
        
        gsap.to(backgroundRef.current, {
          duration: 1.5,
          x: x * 30,
          y: y * 30,
          ease: 'power2.out',
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements with Parallax */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-[10%] w-72 h-72 bg-[#3b82f6]/20 rounded-full filter blur-3xl opacity-70" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 right-[10%] w-72 h-72 bg-[#10b981]/20 rounded-full filter blur-3xl opacity-70" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#10b981]/10 rounded-full filter blur-3xl opacity-70" />
      </div>
      
      {/* 3D Grid Pattern with Parallax */}
      <motion.div 
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, 150]),
          opacity: useTransform(scrollYProgress, [0, 0.8], [0.02, 0])
        }}
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] z-0" 
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content with Parallax */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4"
            >
              <span className="px-4 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm font-medium">
                Engineering Student & Web Developer
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="heading font-poppins"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">
                Abdellah Raissouni
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="subheading max-w-xl mt-6"
            >
              I craft stunning digital experiences that blend creativity with technical excellence. 
              Transforming ideas into impactful web solutions that drive results.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {/* Enhanced CTA Button with 3D effect */}
              <Link href="#projects">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <button className="relative px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#10b981] text-white font-medium rounded-lg transition-all duration-300 shadow-[0_5px_15px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.6)] group-hover:-translate-y-1">
                    <span className="flex items-center">
                      <span>View My Work</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  </button>
                </motion.div>
              </Link>
              
              <Link href="#contact">
                <motion.button 
                  whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-[#262626] text-white font-medium rounded-lg transition-all duration-300 hover:border-[#3b82f6] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-[#171717] flex items-center justify-center">
                    <span className="text-xs font-medium">🔥</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-medium">20+ Projects</span> completed for clients worldwide
              </p>
            </motion.div>
          </motion.div>
          
          {/* 3D Profile Element with Parallax and Mouse Movement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
            className="relative flex justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96 animate-float">
              <motion.div 
                style={{ 
                  x: useTransform(() => mousePosition.x * 20),
                  y: useTransform(() => mousePosition.y * 20),
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#10b981] opacity-20 blur-2xl animate-pulse" 
              />
              
              {/* 3D Card Effect */}
              <motion.div
                style={{ 
                  rotateY: useTransform(() => mousePosition.x * 10),
                  rotateX: useTransform(() => -mousePosition.y * 10),
                }}
                className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden bg-[#171717] transform-gpu perspective-1000"
              >
                {/* Placeholder instead of image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">AR</span>
                </div>
                
                {/* Reflective overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              </motion.div>
              
              {/* Tech stack floating elements with 3D effect */}
              <motion.div 
                style={{ 
                  x: useTransform(() => mousePosition.x * 30),
                  y: useTransform(() => mousePosition.y * 30),
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#171717] rounded-xl border border-[#262626] p-2 shadow-lg animate-bounce-slow"
              >
                <div className="w-full h-full bg-[#61DAFB] rounded-lg flex items-center justify-center text-[#282c34] font-bold">
                  R
                </div>
              </motion.div>
              
              <motion.div 
                style={{ 
                  x: useTransform(() => -mousePosition.x * 25),
                  y: useTransform(() => -mousePosition.y * 25),
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#171717] rounded-xl border border-[#262626] p-2 shadow-lg animate-spin-slow"
              >
                <div className="w-full h-full bg-black rounded-lg flex items-center justify-center text-white font-bold">
                  N
                </div>
              </motion.div>
              
              <motion.div 
                style={{ 
                  x: useTransform(() => mousePosition.x * 15),
                  y: useTransform(() => mousePosition.y * 15),
                }}
                className="absolute top-1/2 -right-8 w-16 h-16 bg-[#171717] rounded-xl border border-[#262626] p-2 shadow-lg animate-pulse"
              >
                <div className="w-full h-full bg-[#38bdf8] rounded-lg flex items-center justify-center text-white font-bold">
                  T
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
} 