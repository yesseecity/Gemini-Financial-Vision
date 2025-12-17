import React from 'react';
import { motion } from 'framer-motion';
import { Milestone } from '../types';
import { Zap, Brain, Globe, CheckCircle2 } from 'lucide-react';

interface MilestoneCardProps {
  milestone: Milestone;
  isActive: boolean;
  delay: number;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, isActive, delay }) => {
  const Icon = () => {
    switch (milestone.icon) {
      case 'zap': return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'brain': return <Brain className="w-6 h-6 text-fuchsia-400" />;
      case 'globe': return <Globe className="w-6 h-6 text-indigo-400" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const borderColor = isActive 
    ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]' 
    : 'border-white/10';
  
  const bgGradient = isActive
    ? 'bg-gradient-to-br from-slate-900/90 to-slate-800/90'
    : 'bg-slate-900/50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.8 }}
      className={`relative p-6 rounded-2xl border ${borderColor} ${bgGradient} backdrop-blur-md overflow-hidden transition-all duration-500 group`}
    >
      {/* Background Glow Effect */}
      {isActive && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
          <Icon />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Timeline
          </span>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Year {milestone.year}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-200 transition-colors">
        {milestone.title}
      </h3>
      
      <p className="text-sm text-slate-400 mb-4 leading-relaxed">
        {milestone.description}
      </p>

      <div className="space-y-2">
        {milestone.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MilestoneCard;