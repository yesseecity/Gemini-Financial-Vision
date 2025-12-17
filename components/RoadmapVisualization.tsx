import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RoadmapData } from '../types';
import MilestoneCard from './MilestoneCard';

interface RoadmapVisualizationProps {
  data: RoadmapData;
}

const RoadmapVisualization: React.FC<RoadmapVisualizationProps> = ({ data }) => {
  const controls = useAnimation();
  const [stage, setStage] = useState(0); // 0 = start, 1 = year1, 2 = year3, 3 = year5

  useEffect(() => {
    const sequence = async () => {
      setStage(0);
      await controls.start("hidden");
      await controls.start("visible");
    };
    sequence();
  }, [data, controls]);

  // Update stage based on animation duration roughly
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 500);  // Start drawing to year 1
    const t2 = setTimeout(() => setStage(2), 2000); // Reach year 3
    const t3 = setTimeout(() => setStage(3), 3500); // Reach year 5

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [data]);

  // SVG Configuration
  const svgWidth = 1000;
  const svgHeight = 250;
  const paddingX = 100;
  const centerY = svgHeight / 2;
  
  // Define node positions
  const x1 = paddingX;
  const x2 = svgWidth / 2;
  const x3 = svgWidth - paddingX;

  // Path definition (Curved sine wave style or straight tech line)
  // Let's do a slight curve for elegance
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 4, 
        ease: "easeInOut",
        opacity: { duration: 0.5 } 
      } 
    }
  };

  const nodeVariants = (delay: number) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { delay, type: "spring", stiffness: 200 } 
    }
  });

  const pulseVariants = {
    visible: {
      scale: [1, 1.5, 1],
      opacity: [0.5, 0, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* SVG Container */}
      <div className="w-full overflow-hidden relative" style={{ height: '250px' }}>
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />   {/* cyan */}
              <stop offset="50%" stopColor="#e879f9" stopOpacity="1" />    {/* fuchsia */}
              <stop offset="100%" stopColor="#818cf8" stopOpacity="1" />   {/* indigo */}
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Guide Line (faint) */}
          <path 
            d={`M ${x1} ${centerY} C ${x1 + 100} ${centerY - 50}, ${x2 - 100} ${centerY + 50}, ${x2} ${centerY} S ${x3 - 100} ${centerY - 50}, ${x3} ${centerY}`}
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2" 
            strokeDasharray="5,5"
          />

          {/* Animated Main Line */}
          <motion.path
            d={`M ${x1} ${centerY} C ${x1 + 100} ${centerY - 50}, ${x2 - 100} ${centerY + 50}, ${x2} ${centerY} S ${x3 - 100} ${centerY - 50}, ${x3} ${centerY}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            variants={pathVariants}
            initial="hidden"
            animate={controls}
            filter="url(#glow)"
          />

          {/* Year 1 Node */}
          <g transform={`translate(${x1}, ${centerY})`}>
             {/* Pulse Ring */}
            <motion.circle r="15" fill="none" stroke="#22d3ee" strokeWidth="1" variants={pulseVariants} animate="visible" />
            <motion.circle 
              r="8" fill="#0891b2" stroke="#fff" strokeWidth="2"
              variants={nodeVariants(0.5)} initial="hidden" animate={controls}
            />
            <motion.text 
               x="0" y="35" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold" fontFamily="monospace"
               initial={{opacity: 0}} animate={{opacity: stage >= 1 ? 1 : 0}} transition={{duration: 0.5}}
            >
              YEAR 1
            </motion.text>
          </g>

          {/* Year 3 Node */}
          <g transform={`translate(${x2}, ${centerY})`}>
            <motion.circle r="20" fill="none" stroke="#e879f9" strokeWidth="1" variants={pulseVariants} animate="visible" />
            <motion.circle 
              r="10" fill="#c026d3" stroke="#fff" strokeWidth="2"
              variants={nodeVariants(2.0)} initial="hidden" animate={controls}
            />
             <motion.text 
               x="0" y="45" textAnchor="middle" fill="#e879f9" fontSize="16" fontWeight="bold" fontFamily="monospace"
               initial={{opacity: 0}} animate={{opacity: stage >= 2 ? 1 : 0}} transition={{duration: 0.5}}
            >
              YEAR 3
            </motion.text>
          </g>

          {/* Year 5 Node */}
          <g transform={`translate(${x3}, ${centerY})`}>
             <motion.circle r="25" fill="none" stroke="#818cf8" strokeWidth="1" variants={pulseVariants} animate="visible" />
            <motion.circle 
              r="12" fill="#4f46e5" stroke="#fff" strokeWidth="2"
              variants={nodeVariants(3.5)} initial="hidden" animate={controls}
            />
            <motion.text 
               x="0" y="55" textAnchor="middle" fill="#818cf8" fontSize="18" fontWeight="bold" fontFamily="monospace"
               initial={{opacity: 0}} animate={{opacity: stage >= 3 ? 1 : 0}} transition={{duration: 0.5}}
            >
              YEAR 5
            </motion.text>
          </g>
        </svg>
      </div>

      {/* Cards Container - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 mt-8">
        <MilestoneCard milestone={data.year1} isActive={stage >= 1} delay={0.6} />
        <MilestoneCard milestone={data.year3} isActive={stage >= 2} delay={2.1} />
        <MilestoneCard milestone={data.year5} isActive={stage >= 3} delay={3.6} />
      </div>
    </div>
  );
};

export default RoadmapVisualization;