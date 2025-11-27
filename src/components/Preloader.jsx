import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { V } from '../utils/colors';
import LightRays from './LightRays';

const Preloader = ({ onComplete }) => {
    const [phase, setPhase] = useState('intro'); // 'intro', 'flying', 'complete'
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Phase 1: Intro (0-3.5s)
        const flightTimer = setTimeout(() => {
            setPhase('flying');
        }, 3500);

        // Phase 2: Flight (3.5s-4.5s) -> Complete
        const completeTimer = setTimeout(() => {
            setPhase('complete');
            onComplete();
        }, 4500);

        return () => {
            clearTimeout(flightTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    // Calculate destination based on screen size (matching Navbar padding)
    // Mobile: px-6 py-4 (24px, 16px) | Desktop: px-8 (32px)
    const destTop = 16; // py-4 is 1rem = 16px
    const destLeft = windowSize.width < 768 ? 24 : 32; // px-6 (24px) or px-8 (32px)
    const destWidth = windowSize.width < 768 ? 48 : 64; // h-12 (48px) or h-16 (64px)

    return (
        <AnimatePresence>
            {phase !== 'complete' && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
                >
                    {/* Background (Black + Rays) - Fades out during flight */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: phase === 'flying' ? 0 : 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-black z-0"
                    >
                        <LightRays
                            raysOrigin="top-center"
                            raysColor="#FFFACD"
                            raysSpeed={1.5}
                            lightSpread={0.9}
                            rayLength={3}
                            pulsating={true}
                            fadeDistance={2}
                            saturation={0.6}
                            followMouse={true}
                            mouseInfluence={1}
                            noiseAmount={0}
                            distortion={0}
                            className="w-full h-full opacity-100"
                        />
                    </motion.div>

                    <div className="relative z-10 flex flex-col items-center w-full h-full justify-center">
                        {/* Logo Container - Handles the Flight */}
                        <motion.div
                            initial={{ top: '50%', left: '50%', x: '-50%', y: '-50%', width: '100%', height: '100%' }}
                            animate={phase === 'flying' ? {
                                top: destTop,
                                left: destLeft,
                                x: 0,
                                y: 0,
                                width: destWidth,
                                height: destWidth, // Keep aspect ratio
                                position: 'fixed'
                            } : {
                                top: '50%',
                                left: '50%',
                                x: '-50%',
                                y: '-50%',
                                width: '100%',
                                height: '100%',
                                position: 'absolute'
                            }}
                            transition={{
                                duration: 1.2,
                                ease: [0.76, 0, 0.24, 1] // Custom bezier for smooth "flight"
                            }}
                            className="flex items-center justify-center z-50"
                        >
                            {/* The Logo Image */}
                            <motion.img
                                src="/loaderLogo.png"
                                alt="Vahini Logo"
                                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                                animate={{
                                    opacity: 1,
                                    scale: phase === 'flying' ? 1 : 1, // Scale handled by container width
                                    filter: 'blur(0px)'
                                }}
                                transition={{ delay: 0.5, duration: 1.5 }}
                                className={`object-contain drop-shadow-2xl rounded-full ${phase === 'flying' ? '' : 'w-48 h-48 md:w-64 md:h-64'}`}
                                style={{
                                    filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.4))',
                                    width: '50%',
                                    height: '50%'
                                }}
                            />
                        </motion.div>

                        {/* Text Reveal - Fades out during flight */}
                        <motion.div
                            animate={{ opacity: phase === 'flying' ? 0 : 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center overflow-hidden relative z-10 mt-4"
                        >
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 2.0, duration: 1 }}
                                className="text-3xl md:text-5xl font-light tracking-widest text-white mb-2"
                                style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '0 0 15px rgba(255,215,0,0.3)' }}
                            >
                                VAHINI
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                transition={{ delay: 2.5, duration: 1 }}
                                className="text-xs md:text-sm uppercase tracking-[0.3em]"
                                style={{ color: V.gold }}
                            >
                                D'Interio
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
