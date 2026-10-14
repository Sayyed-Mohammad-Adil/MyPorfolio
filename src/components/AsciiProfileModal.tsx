import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, Terminal, Sparkles, User, CheckCircle2 } from 'lucide-react';
import {
  ASCII_PORTRAIT_DATA,
  ASCII_PORTRAIT_PLAIN,
  ASCII_NAME_SAYYED,
  ASCII_NAME_MOHAMMAD,
  ASCII_NAME_ADIL,
  ASCII_NAME_BANNER
} from '../data/asciiData';

interface AsciiProfileModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AsciiProfileModal: React.FC<AsciiProfileModalProps> = ({ isOpen: propIsOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(propIsOpen ?? false);
  const [copied, setCopied] = useState(false);
  const [isFromContact, setIsFromContact] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);

  // Sync with prop if passed
  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  // Listen for open-profile-modal event (e.g. from Contact form submission)
  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ fromContact?: boolean }>;
      if (customEvent.detail?.fromContact) {
        setIsFromContact(true);
      } else {
        setIsFromContact(false);
      }
      setIsOpen(true);
    };
    window.addEventListener('open-profile-modal', handleTrigger);
    return () => window.removeEventListener('open-profile-modal', handleTrigger);
  }, []);

  // Smooth typewriter/scanline animation: print ASCII portrait row by row
  useEffect(() => {
    if (isOpen) {
      setVisibleRows(1);
      let currentRow = 1;
      const timer = setInterval(() => {
        currentRow++;
        setVisibleRows(currentRow);
        if (currentRow >= ASCII_PORTRAIT_DATA.length) {
          clearInterval(timer);
        }
      }, 35); // 35ms per line -> ~1.0s smooth terminal print
      return () => clearInterval(timer);
    } else {
      setVisibleRows(0);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setIsFromContact(false);
    if (onClose) onClose();
  };

  const handleCopy = () => {
    const fullText = `/* ========================================================
   SAYYED MOHAMMAD ADIL // GITHUB PROFILE ASCII
   github.com/Sayyed-Mohammad-Adil
======================================================== */\n\n${ASCII_PORTRAIT_PLAIN}\n\n${ASCII_NAME_BANNER}\n`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      {/* Floating launcher button at bottom corner for quick access if modal is closed */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsFromContact(false);
            setIsOpen(true);
          }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/90 hover:bg-white text-gray-900 border border-blue-500/40 shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-mono group dark:bg-gray-900/90 dark:hover:bg-black dark:text-gray-100 dark:border-yellow-500/40 dark:shadow-2xl"
          title="Open Profile"
        >
          <Terminal size={14} className="text-blue-600 dark:text-yellow-400 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">Profile</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
            {/* Background Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-900/50 dark:bg-black/80 backdrop-blur-md dark:backdrop-blur-2xl"
              onClick={closeModal}
            />

            {/* Responsive Modal Dialog Container (Scrollable on small mobile screens, zero-scroll on desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[92vh] bg-white/95 dark:bg-gray-950/95 border border-blue-500/40 dark:border-yellow-500/40 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(59,130,246,0.2)] dark:shadow-[0_0_60px_rgba(234,179,8,0.2)] overflow-y-auto md:overflow-hidden flex flex-col z-10 font-mono text-gray-900 dark:text-gray-100"
            >
              {/* Terminal Window Header Bar with integrated actions */}
              <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-gray-100/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800/80 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/90 hover:opacity-80 cursor-pointer shadow-sm" onClick={closeModal} title="Close"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-sm"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/90 shadow-sm"></span>
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-400 font-mono hidden sm:inline-block">
                    sayyed-mohammad-adil@github:~$ ./profile.sh
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800/90 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700/80 transition-all active:scale-95 text-[11px] shadow-sm"
                    title="Copy ASCII Portrait and Banner"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-500 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} className="text-gray-500 dark:text-gray-400" />
                        <span>Copy ASCII</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://github.com/Sayyed-Mohammad-Adil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 dark:bg-yellow-500 text-white dark:text-black font-semibold hover:bg-blue-700 dark:hover:opacity-90 transition-all text-[11px] shadow-sm"
                  >
                    <span>GitHub</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    onClick={closeModal}
                    className="p-1 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/80 dark:hover:bg-gray-800/80 transition-colors ml-1"
                    aria-label="Close modal"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Form Submission Success Banner inside the terminal if opened after sending a message */}
              {isFromContact && (
                <div className="px-4 py-2 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span className="font-semibold">Message sent successfully! Thank you for reaching out.</span>
                  </div>
                  <span className="text-[10px] text-emerald-500/80 hidden sm:inline font-mono">STATUS: 200 OK</span>
                </div>
              )}

              {/* Main Content Area - Balanced 2-Column Grid (NO internal scroll required!) */}
              <div className="p-3 sm:p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                {/* Left Column: Genuine TrueColor ASCII Portrait inside sleek CRT terminal frame */}
                <div className="md:col-span-5 bg-gray-950 dark:bg-black/95 rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-gray-300 dark:border-gray-800/90 shadow-md dark:shadow-inner flex flex-col items-center justify-center">
                  <div className="w-full flex items-center justify-between text-[10px] text-gray-400 font-mono mb-1.5 pb-1 border-b border-gray-800">
                    <div className="flex items-center gap-1.5">
                      <User size={11} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">avatar.ascii</span>
                    </div>
                    <span className="text-[10px] text-blue-400 dark:text-yellow-400 font-medium">TrueColor ASCII</span>
                  </div>

                  {/* High-Definition ASCII Character Matrix with Slow-Print Terminal Animation */}
                  <div className="overflow-x-auto max-w-full flex flex-col items-center justify-center py-0.5 select-all min-h-[175px] sm:min-h-[212px]">
                    <div className="flex flex-col items-center">
                      {ASCII_PORTRAIT_DATA.slice(0, visibleRows).map((row, rowIdx) => (
                        <div key={rowIdx} className="flex whitespace-nowrap leading-[1.0]">
                          {row.map((cell, colIdx) => (
                            <span
                              key={colIdx}
                              style={{ color: cell.col }}
                              className="inline-block text-[5.2px] sm:text-[6.5px] md:text-[7.4px] select-all font-mono font-bold leading-none text-center"
                            >
                              {cell.c}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Blinking scanning indicator while printing rows */}
                    {visibleRows < ASCII_PORTRAIT_DATA.length && (
                      <div className="flex items-center justify-center gap-1.5 mt-1 text-emerald-400 font-mono text-[9px] animate-pulse">
                        <span className="w-1.5 h-2.5 bg-emerald-400 inline-block"></span>
                        <span className="text-gray-400">rendering avatar.ascii... [{Math.round((visibleRows / ASCII_PORTRAIT_DATA.length) * 100)}%]</span>
                      </div>
                    )}
                  </div>

                  {/* Logical metadata under portrait - NO redundant name duplication */}
                  <div className="text-[10px] text-gray-400 mt-1.5 font-mono flex items-center justify-center gap-1.5">
                    <span className="text-emerald-400">●</span>
                    <span className="text-gray-300 dark:text-gray-300 font-medium">TrueColor Matrix</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-blue-400 dark:text-yellow-400 font-medium">@Sayyed-Mohammad-Adil</span>
                  </div>
                </div>

                {/* Right Column: 3-Line Centered After Dark C ASCII Banner + Developer Specs */}
                <div className="md:col-span-7 bg-gray-50/90 dark:bg-black/85 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 border border-gray-200 dark:border-gray-800/80 shadow-sm dark:shadow-inner flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono pb-1 border-b border-gray-200 dark:border-gray-900">
                    <div className="flex items-center gap-1.5">
                      <Terminal size={11} className="text-blue-600 dark:text-yellow-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">whoami --ascii</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">$ ready</span>
                  </div>

                  {/* 3-Line Centered After Dark C ASCII Banner (Compact Font Size) */}
                  <div className="w-full flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 py-0.5 overflow-x-auto">
                    {/* Line 1: SAYYED */}
                    <div className="w-full flex justify-center">
                      <pre className="font-mono text-[2.4px] sm:text-[3.3px] md:text-[3.8px] leading-[1.0] tracking-tight text-blue-600 dark:text-yellow-400 font-bold select-all whitespace-pre text-center inline-block">
                        {ASCII_NAME_SAYYED}
                      </pre>
                    </div>

                    {/* Line 2: MOHAMMAD */}
                    <div className="w-full flex justify-center">
                      <pre className="font-mono text-[1.8px] sm:text-[2.5px] md:text-[2.85px] leading-[1.0] tracking-tight text-blue-600 dark:text-yellow-400 font-bold select-all whitespace-pre text-center inline-block">
                        {ASCII_NAME_MOHAMMAD}
                      </pre>
                    </div>

                    {/* Line 3: ADIL */}
                    <div className="w-full flex justify-center">
                      <pre className="font-mono text-[2.4px] sm:text-[3.3px] md:text-[3.8px] leading-[1.0] tracking-tight text-blue-600 dark:text-yellow-400 font-bold select-all whitespace-pre text-center inline-block">
                        {ASCII_NAME_ADIL}
                      </pre>
                    </div>
                  </div>

                  {/* Developer Terminal Specs */}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800/70 grid grid-cols-2 gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">$</span>
                      <span className="text-gray-500 dark:text-gray-400">ROLE:</span>
                      <span className="text-gray-900 dark:text-gray-100 font-semibold">Full-Stack Engineer</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-600 dark:text-yellow-400 font-bold">$</span>
                      <span className="text-gray-500 dark:text-gray-400">CODE:</span>
                      <span className="text-blue-600 dark:text-yellow-400 font-semibold">50+ Repositories</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">$</span>
                      <span className="text-gray-500 dark:text-gray-400">STACK:</span>
                      <span className="text-gray-800 dark:text-gray-200">React • Node • TS</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">$</span>
                      <span className="text-gray-500 dark:text-gray-400">STATUS:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Open to Work</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Bar */}
              <div className="px-4 sm:px-6 py-2 bg-gray-100/90 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800/80 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-mono">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Sparkles size={12} className="text-blue-600 dark:text-yellow-400" />
                  <span>Press ESC or click outside to dismiss</span>
                </span>
                <button
                  onClick={closeModal}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors font-medium text-xs border border-gray-200 dark:border-gray-700/60 shadow-sm"
                >
                  Close Terminal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AsciiProfileModal;

