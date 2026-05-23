'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code, FolderGit2, Terminal, ExternalLink, Mail, Phone, MapPin, Award } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import KunalPhoto from './assets/meriphotu.jpg';

// 3D Model Component
const Three3DModel = dynamic(() => import('./components/Three3DModel'), {
  ssr: false,
});

// Mouse Position Hook for 3D effects
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}

// Enhanced Cursor Glow Component with Colorful Shadows tracking cursor
function CursorGlow({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const shadowColors = [
    { color: 'rgba(0, 255, 255, 0.8)', size: 80, blur: '30px' },
    { color: 'rgba(168, 85, 247, 0.6)', size: 120, blur: '50px' },
    { color: 'rgba(236, 72, 153, 0.4)', size: 160, blur: '70px' },
    { color: 'rgba(34, 197, 94, 0.3)', size: 200, blur: '90px' },
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {shadowColors.map((shadow, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full mix-blend-screen pointer-events-none"
          animate={{
            x: mousePosition.x - shadow.size / 2,
            y: mousePosition.y - shadow.size / 2,
          }}
          transition={{
            type: "spring",
            stiffness: 250 - idx * 40,
            damping: 20 - idx * 2,
            mass: 0.5 + idx * 0.2
          }}
          style={{
            width: `${shadow.size}px`,
            height: `${shadow.size}px`,
            backgroundColor: shadow.color,
            filter: `blur(${shadow.blur})`,
            boxShadow: `0 0 ${shadow.size}px ${shadow.size/3}px ${shadow.color}`,
          }}
        />
      ))}
    </div>
  );
}

// 3D Card Component with Perspective Transform & Transparency
function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: -100, y: -100 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotX = ((y - centerY) / centerY) * -15; // Inverted for natural feel
    const rotY = ((centerX - x) / centerX) * 15;
    
    setRotateX(rotX);
    setRotateY(rotY);
    setGlowPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowPosition({ x: -100, y: -100 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: '1500px',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
        background: `radial-gradient(circle 300px at ${glowPosition.x}px ${glowPosition.y}px, rgba(255, 255, 255, 0.15), transparent 60%) rgba(10, 15, 30, 0.4)`,
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div style={{ transform: 'translateZ(40px)' }}>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const mousePosition = useMousePosition();

  return (
    <main className="min-h-screen bg-[#03030d]/80 relative text-slate-200 selection:bg-cyan-500 selection:text-black overflow-hidden">
      
      {/* 3D Glass Background Model */}
      <Three3DModel />

      {/* Cursor Glow Effect */}
      <CursorGlow mousePosition={mousePosition} />
      
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10 space-y-24 pointer-events-auto">
        
        {/* ================= HERO SECTION ================= */}
        <section className="py-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] items-center gap-10 min-h-[70vh]">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]"
            >
              KUNAL PAUL 
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl font-light text-cyan-300 font-mono mt-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
            >
              &lt;Full Stack Developer /&gt; 
            </motion.p>

            {/* Quick Contact Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 text-sm text-slate-300 font-mono"
            >
              <span className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors shadow-lg hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"><Phone className="w-4 h-4 text-cyan-400" /> +91-9870321562 </span>
              <span className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-colors shadow-lg hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"><Mail className="w-4 h-4 text-purple-400" /> paulk3226@gmail.com </span>
              <span className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-lg border border-pink-500/30 hover:border-pink-400 transition-colors shadow-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]"><MapPin className="w-4 h-4 text-pink-400" /> Gautam Buddha Nagar, UP </span>
            </motion.div>

            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 max-w-3xl p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-purple-500/10 border border-white/10 backdrop-blur-2xl shadow-2xl hover:border-cyan-500/40 transition-all"
            >
              <h3 className="text-cyan-400 font-mono text-sm mb-4 drop-shadow-lg flex items-center justify-center lg:justify-start gap-2">
                <Code className="w-4 h-4" /> Professional Summary
              </h3>
              <p className="text-slate-200 text-base md:text-lg leading-relaxed drop-shadow-md">
                Dedicated and skilled Full Stack Developer with hands-on experience in web development using HTML, CSS, JavaScript, React JS, PHP, and MySQL. Adept at both frontend and backend technologies, with a keen eye for detail and performance optimization. Passionate about designing user-centric applications and contributing to collaborative team environments.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 32, rotateY: -12 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="relative mx-auto w-full max-w-[320px] lg:max-w-none"
            style={{ perspective: '1200px' }}
          >
            <div className="absolute -inset-4 bg-cyan-400/20 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-cyan-300/30 bg-slate-950/70 shadow-[0_0_45px_rgba(34,211,238,0.24)]">
              <Image
                src={KunalPhoto}
                alt="Kunal Paul"
                fill
                priority
                sizes="(min-width: 1024px) 340px, 80vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03030d]/40 via-transparent to-cyan-300/10" />
            </div>
          </motion.div>
        </section>

        {/* ================= BENTO SKILLS GRID ================= */}
        <motion.section 
          id="skills" 
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 text-white drop-shadow-lg">
            <Code className="text-cyan-400 w-8 h-8" /> Technical Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card3D className="p-8 rounded-3xl border border-white/10 group duration-300 md:col-span-2 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-cyan-500/50">
              <h3 className="text-cyan-400 font-mono text-base mb-4 drop-shadow-md flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Frontend Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {['HTML5', 'Tailwind CSS', 'Bootstrap', 'JavaScript', 'React JS', 'Next JS', 'Firebase'].map((skill) => ( 
                  <motion.span 
                    key={skill} 
                    className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-xl text-sm font-medium backdrop-blur-md shadow-lg hover:bg-cyan-500/20"
                    whileHover={{ 
                      scale: 1.1, 
                      rotateZ: 2,
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
                      borderColor: 'rgba(0, 255, 255, 0.6)',
                      color: '#00ffff'
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Card3D>
            
            <Card3D className="p-8 rounded-3xl border border-white/10 group duration-300 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-purple-500/50">
              <h3 className="text-purple-400 font-mono text-base mb-4 drop-shadow-md flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Backend Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {['PHP', 'MySQL', 'Node.js', 'MongoDB'].map((tool) => ( 
                  <motion.span 
                    key={tool} 
                    className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-xl text-sm font-medium backdrop-blur-md shadow-lg hover:bg-purple-500/20"
                    whileHover={{ 
                      scale: 1.1, 
                      rotateZ: -2,
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                      borderColor: 'rgba(168, 85, 247, 0.6)',
                      color: '#a855f7'
                    }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </Card3D>

            <Card3D className="p-8 rounded-3xl border border-white/10 group duration-300 md:col-span-2 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-orange-500/50">
              <h3 className="text-orange-400 font-mono text-base mb-4 drop-shadow-md flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Git', 'GitHub', 'VS Code', 'Chrome DevTools', 'Figma', 'Firebase studio IDE'].map((tool) => ( 
                  <motion.span 
                    key={tool} 
                    className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-xl text-sm font-medium backdrop-blur-md shadow-lg hover:bg-orange-500/20"
                    whileHover={{ 
                      scale: 1.1, 
                      rotateZ: 2,
                      boxShadow: '0 0 20px rgba(234, 179, 8, 0.4)',
                      borderColor: 'rgba(234, 179, 8, 0.6)',
                      color: '#eab308'
                    }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </Card3D>

            <Card3D className="p-8 rounded-3xl border border-white/10 group duration-300 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-pink-500/50">
              <h3 className="text-pink-400 font-mono text-base mb-4 drop-shadow-md flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Design Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Adobe Photoshop', 'Canva Pro', 'Corel Draw'].map((tool) => ( 
                  <motion.span 
                    key={tool} 
                    className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-xl text-sm font-medium backdrop-blur-md shadow-lg hover:bg-pink-500/20"
                    whileHover={{ 
                      scale: 1.1, 
                      rotateZ: -2,
                      boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)',
                      borderColor: 'rgba(236, 72, 153, 0.6)',
                      color: '#ec4899'
                    }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </Card3D>
          </div>
        </motion.section>

        {/* ================= INTERACTIVE EXPERIENCE ================= */}
        <motion.section 
          id="experience" 
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 text-white drop-shadow-lg">
            <Briefcase className="text-cyan-400 w-8 h-8" /> Chronology of Deployment
          </h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:right-auto before:left-5 before:w-[2px] before:bg-white/10">
            
            {/* Speed Shed Technologies */}
            <motion.div 
              className="relative pl-14 group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="absolute left-[17px] top-4 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Card3D className="p-8 rounded-3xl border border-white/10 transition-all cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-cyan-500/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Full Stack Developer</h3> 
                  <motion.span 
                    className="mt-2 sm:mt-0 text-sm font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
                  >
                    Jan 2023 - Jan 2024
                  </motion.span>
                </div>
                <p className="text-base font-mono text-cyan-200 mb-6 drop-shadow-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Speed Shed Technologies, Faridabad 
                </p>
                <ul className="list-none space-y-3 text-base text-slate-300 font-sans">
                  {['Designed, developed, and optimized web applications', 'Built real-time data visualization tools for analytics', 'Technologies used: HTML, CSS, JS, React JS, PHP, MySQL, Git'].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Terminal className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </Card3D>
            </motion.div>

            {/* Intern */}
            <motion.div 
              className="relative pl-14 group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="absolute left-[17px] top-4 w-4 h-4 rounded-full bg-purple-400 ring-4 ring-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <Card3D className="p-8 rounded-3xl border border-white/10 transition-all cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-purple-500/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Graphic Designer</h3> 
                  <motion.span 
                    className="mt-2 sm:mt-0 text-sm font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
                  >
                    Jun 2024 – Apr 2025 
                  </motion.span>
                </div>
                <p className="text-base font-mono text-purple-200 mb-6 drop-shadow-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Noida Sector-7, NextBigE  
                </p>
                <ul className="list-none space-y-3 text-base text-slate-300 font-sans">
                  {['Implemented CRUD operations using PHP and MySQL', 'Optimized database queries for performance', 'Maintained project documentation'].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Terminal className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </Card3D>
            </motion.div>



            <motion.div 
              className="relative pl-14 group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="absolute left-[17px] top-4 w-4 h-4 rounded-full bg-purple-400 ring-4 ring-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <Card3D className="p-8 rounded-3xl border border-white/10 transition-all cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-purple-500/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Web Application Developer</h3> 
                  <motion.span 
                    className="mt-2 sm:mt-0 text-sm font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
                  >
                    Feb 2026 – Present 
                  </motion.span>
                </div>
                <p className="text-base font-mono text-purple-200 mb-6 drop-shadow-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> C-17, UPSIDC Industrial Area, Ghaziabad 
                </p>
                <ul className="list-none space-y-3 text-base text-slate-300 font-sans">
                  {['Implemented CRUD operations using PHP and MySQL', 'Optimized database queries for performance', 'Maintained project documentation'].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Terminal className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" /> {item}
                    </motion.li>
                  ))}
                </ul>
              </Card3D>
            </motion.div>

          </div>
        </motion.section>

        {/* ================= PROJECTS ================= */}
        <motion.section 
          id="projects" 
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 text-white drop-shadow-lg">
            <FolderGit2 className="text-cyan-400 w-8 h-8" /> Operational Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gym Exercise App */}
            <Card3D className="p-8 rounded-3xl border border-white/10 flex flex-col justify-between group cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-cyan-500/50">
              <div>
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-lg">Gym Exercise App</h3> 
                  <FolderGit2 className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </motion.div>
                <motion.p 
                  className="text-base text-slate-300 mb-6 font-sans leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1, borderColor: 'rgba(0, 255, 255, 0.2)' }}
                >
                  Responsive application for exercise browsing with YouTube integration. Features client-side exercise lookups and seamless playback navigation.
                </motion.p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['HTML', 'CSS', 'React JS'].map((t) => ( 
                    <motion.span 
                      key={t} 
                      className="text-sm font-medium bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/30 text-cyan-300 shadow-lg"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)' }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 pt-6 border-t border-white/10 font-mono text-sm">
                <motion.a 
                  href="#" 
                  className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 hover:underline bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-cyan-500/30 transition-all"
                  whileHover={{ y: -2 }}
                >
                  GitHub <ExternalLink className="w-4 h-4" />
                </motion.a> 
                <motion.a 
                  href="#" 
                  className="flex items-center gap-2 text-slate-300 hover:text-white hover:underline bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/30 transition-all"
                  whileHover={{ y: -2 }}
                >
                  Live Link <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </Card3D>

            {/* Food App */}
            <Card3D className="p-8 rounded-3xl border border-white/10 flex flex-col justify-between group cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-purple-500/50">
              <div>
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors drop-shadow-lg">Food App</h3> 
                  <FolderGit2 className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
                </motion.div>
                <motion.p 
                  className="text-base text-slate-300 mb-6 font-sans leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1, borderColor: 'rgba(168, 85, 247, 0.2)' }}
                >
                  A modern food ordering application with responsive design and seamless user experience.
                </motion.p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React JS', 'Frontend'].map((t) => ( 
                    <motion.span 
                      key={t} 
                      className="text-sm font-medium bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/30 text-purple-300 shadow-lg"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 pt-6 border-t border-white/10 font-mono text-sm">
                <motion.a 
                  href="https://food-app-kohl-zeta.vercel.app/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-300 hover:text-purple-200 hover:underline bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-purple-500/30 transition-all"
                  whileHover={{ y: -2 }}
                >
                  Live Link <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </Card3D>

            {/* Zomato Client */}
            <Card3D className="p-8 rounded-3xl border border-white/10 flex flex-col justify-between group cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-orange-500/50">
              <div>
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors drop-shadow-lg">Zomato Client</h3> 
                  <FolderGit2 className="w-6 h-6 text-slate-400 group-hover:text-orange-400 transition-colors" />
                </motion.div>
                <motion.p 
                  className="text-base text-slate-300 mb-6 font-sans leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1, borderColor: 'rgba(234, 179, 8, 0.2)' }}
                >
                  A MERN stack implementation of Zomato client interface with dynamic features.
                </motion.p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['MERN', 'Frontend'].map((t) => ( 
                    <motion.span 
                      key={t} 
                      className="text-sm font-medium bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/30 text-orange-300 shadow-lg"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(234, 179, 8, 0.3)' }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 pt-6 border-t border-white/10 font-mono text-sm">
                <motion.a 
                  href="https://github.com/CSekhar-MERN/Zomato-client" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orange-300 hover:text-orange-200 hover:underline bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-orange-500/30 transition-all"
                  whileHover={{ y: -2 }}
                >
                  GitHub <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </Card3D>

            {/* Newsletter Signup */}
            <Card3D className="p-8 rounded-3xl border border-white/10 flex flex-col justify-between group cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-green-500/50">
              <div>
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-2xl font-bold text-white group-hover:text-green-300 transition-colors drop-shadow-lg">Newsletter Signup</h3> 
                  <FolderGit2 className="w-6 h-6 text-slate-400 group-hover:text-green-400 transition-colors" />
                </motion.div>
                <motion.p 
                  className="text-base text-slate-300 mb-6 font-sans leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1, borderColor: 'rgba(34, 197, 94, 0.2)' }}
                >
                  Email subscription platform with modern UI and efficient subscription management.
                </motion.p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React JS', 'Email Service'].map((t) => ( 
                    <motion.span 
                      key={t} 
                      className="text-sm font-medium bg-green-500/10 px-3 py-1.5 rounded-xl border border-green-500/30 text-green-300 shadow-lg"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)' }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 pt-6 border-t border-white/10 font-mono text-sm">
                <motion.a 
                  href="https://github.com/CSekhar-MERN/Newsletter-signup" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-300 hover:text-green-200 hover:underline bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-green-500/30 transition-all"
                  whileHover={{ y: -2 }}
                >
                  GitHub <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </Card3D>
          </div>
        </motion.section>

        {/* ================= EDUCATION & MISC ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.section 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 text-white drop-shadow-lg">
              <GraduationCap className="text-cyan-400 w-8 h-8" /> Academic Logs
            </h2>
            <div className="space-y-6 font-sans">
              {[
                { title: 'Master of Computer Application (MCA)', subtitle: 'Mangalyatan University, Aligarh, UP (2023 – 2025)' },
                { title: 'Bachelor of Computer Application (BCA)', subtitle: 'Hi-Tech Institute of Engineering & Technology, Ghaziabad, UP (2020 – 2023)' }
              ].map((edu, idx) => (
                <motion.div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 255, 255, 0.1)' }}
                >
                  <h4 className="font-bold text-white text-lg">{edu.title}</h4> 
                  <p className="text-base text-cyan-200 font-mono mt-2">{edu.subtitle}</p> 
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 text-white drop-shadow-lg">
              <Award className="text-cyan-400 w-8 h-8" /> Achievements
            </h2>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 font-sans space-y-4 hover:border-purple-500/50 transition-all cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md">
              {[
                { icon: '🏆', title: 'Cross Road Project Competition:', desc: 'Secured 3rd place ranking, showcasing creativity and impactful project delivery.' },
                { icon: '📜', title: 'Full Stack Web Development Internship:', desc: 'Certified Intern via Fiducia Solutions (June 2023)' }
              ].map((achievement, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-start gap-4 text-base text-slate-200 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p>
                      <strong className="text-white">{achievement.title}</strong> {achievement.desc}
                    </p>
                    {idx === 1 && (
                      <a 
                        href="https://www.edureka.co/mycertificate/3ac40e4711186f70e5b2684adef9b288" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-3 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors flex items-center gap-2 w-fit border border-cyan-500/30"
                      >
                        View Certificate <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* ================= TERMINAL FOOTER ================= */}
        <footer className="pt-12 pb-8 border-t border-white/10 text-center font-mono text-sm text-slate-400">
          <p className="flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4" /> System shutdown initiated...
          </p>
          <p className="mt-4">© {new Date().getFullYear()} Kunal Paul. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}
