import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';
import { Code, Sparkles, Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { progress } = useProgress();

  const [displayProgress, setDisplayProgress] = useState(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Smoothly increment progress display towards actual progress
  useEffect(() => {
    const target = Math.max(progress, 0);

    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < target) {
          const step = Math.max(1, Math.ceil((target - prev) * 0.2));
          return Math.min(prev + step, target);
        }
        return prev;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [progress]);

  // When progress reaches 100%, trigger completion with a smooth transition
  useEffect(() => {
    if (displayProgress >= 100 && !completedRef.current) {
      completedRef.current = true;
      const timer = setTimeout(() => {
        onCompleteRef.current();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [displayProgress]);

  // Fallback safety: ensure loader never traps the user indefinitely
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        setDisplayProgress(100);
        setTimeout(() => {
          onCompleteRef.current();
        }, 400);
      }
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Status message based on current progress
  const getStatusMessage = (p: number) => {
    if (p < 25) return 'INITIALIZING CORE SYSTEMS...';
    if (p < 55) return 'LOADING 3D WORKSPACE ASSETS...';
    if (p < 80) return 'COMPILING SHADERS & LIGHTING...';
    if (p < 100) return 'FINALIZING ENVIRONMENT...';
    return 'SYSTEM READY // WELCOME';
  };

  const handleSkip = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onCompleteRef.current();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: 'blur(8px)',
        transition: { duration: 0.6, ease: 'easeInOut' },
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none transition-colors duration-500 overflow-hidden cursor-pointer ${
        isDark ? 'bg-gray-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
      onClick={handleSkip}
    >
      {/* Background Ambient Glow & Grid Matrix */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Radial Glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 transition-colors duration-500 ${
            isDark
              ? 'bg-gradient-to-tr from-cyan-600/30 via-blue-600/20 to-amber-500/20'
              : 'bg-gradient-to-tr from-blue-400/25 via-sky-300/30 to-indigo-300/20'
          }`}
        />

        {/* Subtle High-Tech Grid Pattern */}
        <div
          className={`absolute inset-0 opacity-[0.03] transition-opacity ${
            isDark ? 'invert-0' : 'invert'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* HUD Corner Accents */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none">
        <div
          className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-colors duration-500 ${
            isDark ? 'border-cyan-500/40' : 'border-blue-600/40'
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-colors duration-500 ${
            isDark ? 'border-cyan-500/40' : 'border-blue-600/40'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 transition-colors duration-500 ${
            isDark ? 'border-cyan-500/40' : 'border-blue-600/40'
          }`}
        />
        <div
          className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors duration-500 ${
            isDark ? 'border-cyan-500/40' : 'border-blue-600/40'
          }`}
        />

        {/* Top Status Badges */}
        <div className="absolute top-0 left-12 flex items-center gap-2 text-xs font-mono opacity-60">
          <Terminal size={14} className={isDark ? 'text-cyan-400' : 'text-blue-600'} />
          <span className={isDark ? 'text-cyan-300' : 'text-blue-700'}>
            SYS.PORTFOLIO // v2.0
          </span>
        </div>

        <div className="absolute top-0 right-12 hidden sm:flex items-center gap-2 text-xs font-mono opacity-60">
          <span
            className={`w-2 h-2 rounded-full animate-ping ${
              isDark ? 'bg-amber-400' : 'bg-blue-600'
            }`}
          />
          <span className={isDark ? 'text-gray-400' : 'text-slate-600'}>
            MODE: {isDark ? 'DARK' : 'LIGHT'}
          </span>
        </div>
      </div>

      {/* Central HUD Loading Orb */}
      <div className="relative flex flex-col items-center justify-center z-10 px-4 pointer-events-none">
        <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56">
          {/* Outer Slow Rotating Dashed Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            className={`absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-500 ${
              isDark ? 'border-cyan-500/30' : 'border-blue-500/30'
            }`}
          />

          {/* Middle Fast Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className={`absolute inset-4 rounded-full border-t-2 border-b-2 transition-colors duration-500 ${
              isDark
                ? 'border-t-cyan-400 border-b-amber-400 opacity-80'
                : 'border-t-blue-600 border-b-indigo-500 opacity-80'
            }`}
          />

          {/* Inner Pulsing Ring with Glow */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 0.9, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className={`absolute inset-8 rounded-full border transition-colors duration-500 shadow-lg ${
              isDark
                ? 'border-cyan-400/50 shadow-cyan-500/20 bg-gray-900/40 backdrop-blur-sm'
                : 'border-blue-400/40 shadow-blue-500/20 bg-white/40 backdrop-blur-sm'
            }`}
          />

          {/* Center Content: Percentage & Icon */}
          <div className="flex flex-col items-center justify-center z-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-1"
            >
              {displayProgress >= 100 ? (
                <Sparkles
                  className={`w-6 h-6 animate-pulse ${
                    isDark ? 'text-amber-400' : 'text-blue-600'
                  }`}
                />
              ) : (
                <Code
                  className={`w-6 h-6 ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}
                />
              )}
            </motion.div>

            <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono">
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300 ${
                  isDark
                    ? 'from-cyan-300 via-blue-400 to-amber-300'
                    : 'from-blue-700 via-indigo-600 to-sky-600'
                }`}
              >
                {displayProgress}%
              </span>
            </div>
          </div>
        </div>

        {/* Sleek Linear Progress Bar */}
        <div className="w-64 sm:w-80 mt-8">
          <div
            className={`h-1.5 w-full rounded-full overflow-hidden transition-colors duration-500 ${
              isDark
                ? 'bg-gray-800 border border-gray-700/50'
                : 'bg-slate-200 border border-slate-300/50'
            }`}
          >
            <motion.div
              className={`h-full rounded-full transition-all duration-200 ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]'
              }`}
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div
          className={`mt-4 text-xs font-mono uppercase tracking-widest text-center transition-colors duration-500 ${
            isDark ? 'text-cyan-400/90' : 'text-blue-700/90 font-medium'
          }`}
        >
          {getStatusMessage(displayProgress)}
        </div>
      </div>

      {/* Footer Brand Info */}
      <div className="absolute bottom-6 md:bottom-10 flex flex-col items-center text-center opacity-50 z-10 pointer-events-none">
        <p
          className={`text-xs font-mono tracking-wider ${
            isDark ? 'text-gray-400' : 'text-slate-500'
          }`}
        >
          SAYYED MOHAMMAD ADIL
        </p>
        <span
          className={`text-[10px] tracking-widest uppercase font-mono ${
            isDark ? 'text-gray-500' : 'text-slate-400'
          }`}
        >
          Full Stack Developer Portfolio
        </span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
