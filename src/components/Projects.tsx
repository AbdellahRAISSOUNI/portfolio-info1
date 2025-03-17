'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart functionality, and payment integration.',
    image: '/project1.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A modern portfolio website for a digital artist showcasing their work with advanced animations.',
    image: '/project2.jpg',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    link: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team functionality.',
    image: '/project3.jpg',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    link: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current and forecasted weather data with interactive maps.',
    image: '/project4.jpg',
    tags: ['JavaScript', 'Weather API', 'Chart.js'],
    link: '#',
  },
  {
    id: 5,
    title: 'Recipe Finder App',
    description: 'An application that allows users to search for recipes based on ingredients they have.',
    image: '/project5.jpg',
    tags: ['React', 'API Integration', 'CSS'],
    link: '#',
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'A fitness tracking application that helps users monitor their workouts and progress.',
    image: '/project6.jpg',
    tags: ['React Native', 'Firebase', 'Redux'],
    link: '#',
  },
];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
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
  
  const filteredProjects = filter === 'featured' 
    ? projects.filter(project => project.featured)
    : projects;
  
  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a]/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4 inline-block">
            <span className="px-4 py-1 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm font-medium">
              My Work
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="heading">
            Featured <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="subheading max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise in web development.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                filter === 'all' 
                  ? 'bg-[#3b82f6] text-white' 
                  : 'bg-[#171717] hover:bg-[#171717]/80'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                filter === 'featured' 
                  ? 'bg-[#3b82f6] text-white' 
                  : 'bg-[#171717] hover:bg-[#171717]/80'
              }`}
            >
              Featured
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card group overflow-hidden"
            >
              <div className="relative h-60 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    href={project.link} 
                    className="px-4 py-2 bg-[#3b82f6] rounded-lg text-white font-medium transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    View Project
                  </Link>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-[#171717]/50 border border-[#262626] rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <Link 
            href="#contact"
            className="btn-primary inline-flex items-center"
          >
            <span>Let's Work Together</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 