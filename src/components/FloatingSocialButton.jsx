import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingSocialButton = () => {
    const [showText, setShowText] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

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
            }, 6000);

            return () => clearTimeout(timer);
        } else {
            // Always show text on desktop
            setShowText(true);
        }
    }, [isMobile]);

    return (
        <Link to="/connect">
            <motion.div
                initial={{ opacity: 0, x: 100, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                    scale: 1.08,
                    y: -5,
                    boxShadow: '0 20px 60px rgba(193,163,93,0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                className={`fixed z-40 group cursor-pointer flex items-center gap-3 ${isMobile
                    ? 'bottom-4 right-4' // Mobile: bottom-right (below Analysis button)
                    : 'top-52 right-4 md:right-6 lg:right-8' // Desktop: top-right (below Analysis button)
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
                <div className="relative">
                    <Share2 className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" strokeWidth={2.5} />

                    {/* Pulse ring effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ border: '2px solid white' }}
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>

                {/* Text with smooth collapse animation */}
                <AnimatePresence>
                    {(showText || !isMobile) && (
                        <motion.div
                            className="flex flex-col overflow-hidden text-left"
                            initial={{ width: 'auto', opacity: 1 }}
                            exit={{
                                width: 0,
                                opacity: 0,
                                marginLeft: 0
                            }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="text-xs md:text-sm font-bold text-white tracking-wider uppercase leading-tight whitespace-nowrap drop-shadow-md">
                                Vahini Connect
                            </span>
                            <span className="text-[10px] md:text-xs text-white/90 font-semibold whitespace-nowrap drop-shadow-sm">
                                Connect With Us
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Link>
    );
};

export default FloatingSocialButton;
