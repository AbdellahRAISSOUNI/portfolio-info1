'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'HTML/CSS', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'React.js', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'TypeScript', level: 75 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 75 },
      { name: 'MongoDB', level: 70 },
      { name: 'Firebase', level: 75 },
      { name: 'RESTful APIs', level: 85 },
      { name: 'GraphQL', level: 65 },
    ],
  },
  {
    category: 'Tools & Others',
    technologies: [
      { name: 'Git/GitHub', level: 85 },
      { name: 'Figma/UI Design', level: 80 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Performance Optimization', level: 75 },
      { name: 'SEO Basics', level: 70 },
      { name: 'Testing (Jest)', level: 65 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
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
    <section id="skills" className="section-padding bg-gradient-to-b from-[#0a0a0a]/70 to-[#0a0a0a]">
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
              My Skills
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="heading">
            My Technical <span className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent">Expertise</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="subheading max-w-2xl mx-auto">
            I've developed a diverse set of skills throughout my journey as a web developer and engineering student.
            Here's a glimpse of my technical toolkit.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={groupIndex}
              className="card hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-xl font-bold mb-6 bg-gradient-to-r from-[#3b82f6] to-[#10b981] bg-clip-text text-transparent"
              >
                {skillGroup.category}
              </motion.h3>
              
              <div className="space-y-6">
                {skillGroup.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    custom={techIndex}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{tech.name}</span>
                      <span className="text-xs text-gray-400">{tech.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: 0.2 * techIndex }}
                        className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#10b981]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <motion.h3 variants={itemVariants} className="text-xl font-bold mb-6">
            Other Skills & Technologies
          </motion.h3>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              'SASS', 'Redux', 'Webpack', 'Docker', 'AWS Basics', 
              'Material UI', 'Chakra UI', 'Framer Motion', 'GSAP',
              'Responsive Design', 'Cross-Browser Compatibility', 'Web Accessibility'
            ].map((skill) => (
              <span 
                key={skill}
                className="px-4 py-2 bg-[#171717] rounded-full border border-[#262626] text-sm hover:border-[#3b82f6]/50 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 