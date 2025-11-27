import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sofa, Armchair, Lamp, PaintBucket, Home, Sparkles } from 'lucide-react';

const FloatingAnalysisButton = () => {
    const location = useLocation();
    const [showText, setShowText] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Random icon selection (persists for the session)
    const randomIcon = useMemo(() => {
        const icons = [
            { Icon: Sofa, name: 'sofa' },
            { Icon: Armchair, name: 'armchair' },
            { Icon: Lamp, name: 'lamp' },
            { Icon: PaintBucket, name: 'paint' },
            { Icon: Home, name: 'home' },
            { Icon: Sparkles, name: 'sparkles' }
        ];
        return icons[Math.floor(Math.random() * icons.length)];
    }, []); // Empty dependency array ensures it only runs once per mount

    const { Icon } = randomIcon;

    // Detect mobile/tablet on mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // Mobile/tablet < 1024px
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-hide text after 3 seconds on mobile/tablet
    useEffect(() => {
        if (isMobile) {
            const timer = setTimeout(() => {
                setShowText(false);
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            // Always show text on desktop
            setShowText(true);
        }
    }, [isMobile]);

    // Hide button on the Analysis page itself (AFTER all hooks)
    if (location.pathname === '/analysis') {
        return null;
    }

    return (
        <Link to="/analysis">
            <motion.div
                initial={{ opacity: 0, x: isMobile ? 100 : 100, y: isMobile ? 100 : -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                    scale: 1.08,
                    y: -5,
                    boxShadow: '0 20px 60px rgba(193,163,93,0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                className={`fixed z-40 group cursor-pointer ${isMobile
                    ? 'bottom-20 right-4' // Mobile: bottom-right
                    : 'top-28 right-4 md:right-6 lg:right-8' // Desktop: top-right
                    }`}
                style={{
                    // Glassmorphism Effect
                    background: isMobile && !showText
                        ? `linear-gradient(135deg, rgba(193, 163, 93, 0.45), rgba(193, 163, 93, 0.35))`
                        : `linear-gradient(135deg, rgba(193, 163, 93, 0.4), rgba(193, 163, 93, 0.3))`,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(193, 163, 93, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                    borderRadius: isMobile && !showText ? '50%' : '20px', // Circle on mobile when collapsed
                    padding: isMobile && !showText ? '14px' : '14px 20px',
                    border: '1px solid rgba(255,255,255,0.25)',
                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
            >
                <div className="flex items-center gap-3">
                    {/* Animated Furniture Icon */}
                    <motion.div
                        animate={{
                            rotate: [0, -5, 5, -5, 0],
                            y: [0, -3, 0, -3, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" strokeWidth={2.5} />

                        {/* Sparkle effect on icon */}
                        <motion.div
                            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white"
                            animate={{
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>

                    {/* Text with smooth collapse animation */}
                    <AnimatePresence>
                        {(showText || !isMobile) && (
                            <motion.div
                                className="flex flex-col overflow-hidden"
                                initial={{ width: 'auto', opacity: 1 }}
                                exit={{
                                    width: 0,
                                    opacity: 0,
                                    marginLeft: 0
                                }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <motion.span
                                    className="text-xs md:text-sm font-bold text-white tracking-wider uppercase leading-tight whitespace-nowrap drop-shadow-md"
                                    animate={{
                                        opacity: [1, 0.8, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    Vahini AI
                                </motion.span>
                                <span className="text-[10px] md:text-xs text-white/90 font-semibold whitespace-nowrap drop-shadow-sm">
                                    Design Analysis
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Decorative glass reflection */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none rounded-[inherit]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%)'
                        }}
                        animate={{
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Pulse ring effect */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            border: `2px solid rgba(255,255,255,0.5)`,
                            borderRadius: isMobile && !showText ? '50%' : '20px', // Match button shape
                            opacity: 0.6
                        }}
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

            </motion.div>
        </Link>
    );
};

export default FloatingAnalysisButton;
