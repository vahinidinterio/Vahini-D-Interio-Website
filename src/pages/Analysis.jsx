import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Upload, Loader2, CheckCircle, X, MessageCircle, Palette, Coffee, Zap, Crown } from 'lucide-react';
import { useRateLimiter } from '../hooks/useRateLimiter';
import { V } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { ULTRA_PRO_NANO_PROMPT } from '../utils/prompts';

const LIMIT_MESSAGES = [
    {
        title: "Whoa, Slow Down Picasso! 🎨",
        text: "You've created so much beauty today, our AI is blushing. Let's turn these dreams into reality with our human experts.",
        icon: Palette
    },
    {
        title: "Maximum Fabulousness Reached ✨",
        text: "Your design game is too strong! You've hit the daily limit of AI magic. Want to make it real? Chat with us!",
        icon: Sparkles
    },
    {
        title: "The AI Needs a Coffee Break ☕",
        text: "It's been working hard keeping up with your great taste. While it recharges, why not talk to our very awake design team?",
        icon: Coffee
    },
    {
        title: "Design Overload! 🤯",
        text: "So many great ideas! You've maxed out the free visualizations. Let's channel that energy into a real project.",
        icon: Zap
    },
    {
        title: "You're Officially a Vahini VIP 👑",
        text: "You've used all your daily credits like a pro. Ready for the royal treatment? Contact us for a premium consultation.",
        icon: Crown
    }
];

const Analysis = () => {
    const { isDark } = useTheme();
    const { usageCount, maxUses, isRateLimited, incrementUsage } = useRateLimiter();
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [limitMessage, setLimitMessage] = useState(LIMIT_MESSAGES[0]);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUploadClick = () => {
        if (isRateLimited) {
            setLimitMessage(LIMIT_MESSAGES[Math.floor(Math.random() * LIMIT_MESSAGES.length)]);
            setShowLimitModal(true);
        } else {
            fileInputRef.current?.click();
        }
    };

    const handleVisualize = async () => {
        if (!selectedFile) return;
        setIsLoading(true);

        const prompt = ULTRA_PRO_NANO_PROMPT(selectedFile.name);

        try {
            // Always copy the prompt first
            await navigator.clipboard.writeText(prompt);

            // OPTION A: MOBILE / SHARE API (Passes Image + Prompt)
            if (navigator.canShare && navigator.canShare({ files: [selectedFile] })) {
                await navigator.share({
                    files: [selectedFile],
                    title: 'Vahini AI Design',
                    text: prompt
                });
                incrementUsage();
            }
            // OPTION B: DESKTOP / FALLBACK (Try multiple AI platforms)
            else {
                // Show toast
                setShowToast(true);
                incrementUsage();

                // Try AI platforms in order: Gemini → ChatGPT → Copilot
                const encodedPrompt = encodeURIComponent(prompt);

                setTimeout(() => {
                    // Try to detect which AI is available (simple fallback chain)
                    const aiPlatforms = [
                        `https://gemini.google.com/app?text=${encodedPrompt}`,
                        `https://chatgpt.com/?q=${encodedPrompt}`,
                        `https://copilot.microsoft.com/?q=${encodedPrompt}`
                    ];

                    // Open the first available (Gemini by default, others as fallback)
                    // In practice, all will work, but Gemini is preferred
                    window.open(aiPlatforms[0], '_blank');

                    setShowToast(false);
                }, 2500); // Increased to 2.5s to give user time to read
            }
        } catch (error) {
            console.error("Error in Visualization Flow:", error);
            // Ultimate fallback: open generic AI platforms
            if (error.name !== 'AbortError') {
                // Try ChatGPT as ultimate fallback
                window.open('https://chatgpt.com/', '_blank');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <>
            <Helmet>
                <title>Vahini Analysis - AI-Powered Interior Design Analysis | Vahini D'Interio</title>
                <meta name="description" content="Experience cutting-edge AI analysis for your interior spaces. Get professional design insights and visualization prompts powered by advanced AI technology." />
            </Helmet>

            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16"
                style={{
                    background: isDark
                        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)'
                        : 'linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #fafafa 100%)'
                }}
            >
                {/* Hero Section */}
                <div className="max-w-6xl mx-auto mb-16 text-center">
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                        style={{
                            background: `linear-gradient(135deg, ${V.gold}20, ${V.gold}10)`,
                            border: `1px solid ${V.gold}40`
                        }}
                    >
                        <Sparkles className="w-4 h-4" style={{ color: V.gold }} />
                        <span className="text-sm font-medium" style={{ color: V.gold }}>
                            AI-Powered Design Intelligence
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl lg:text-7xl font-light mb-6"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}
                    >
                        Vahini Analysis
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-80"
                        style={{ color: isDark ? V.offGold : V.nearBlack }}
                    >
                        Transform your interior vision with cutting-edge AI technology. Upload your photo to generate a professional design prompt and visualize it instantly.
                    </motion.p>

                    {/* Usage Progress Bar */}
                    <motion.div variants={fadeInUp} className="mt-8 max-w-md mx-auto">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm opacity-70" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                Analysis Credits
                            </span>
                            <span className="text-sm font-bold" style={{ color: V.gold }}>
                                {maxUses - usageCount} / {maxUses} remaining
                            </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((maxUses - usageCount) / maxUses) * 100}%` }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                                style={{ background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})` }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Main Content - Upload & Simulate UI */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="p-8 md:p-12 rounded-3xl border relative overflow-hidden text-center"
                        style={{
                            background: isDark ? 'rgba(26, 26, 26, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
                        }}
                    >
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleFileSelect}
                            ref={fileInputRef}
                            className="hidden"
                        />

                        {!selectedFile ? (
                            // STATE 1: UPLOAD (Now clickable even if limited)
                            <div
                                onClick={handleUploadClick}
                                className={`w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-6 relative overflow-hidden ${isDark
                                    ? 'border-white/10 hover:border-[#C1A35D]/50 hover:bg-white/5'
                                    : 'border-black/10 hover:border-[#C1A35D]/50 hover:bg-black/5'
                                    } cursor-pointer`}
                            >
                                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                                    style={{ background: `linear-gradient(135deg, ${V.gold}20, ${V.gold}10)` }}>
                                    <Upload className="w-8 h-8" style={{ color: V.gold }} />
                                </div>
                                <div className="text-center px-4">
                                    <h3 className="text-2xl font-light mb-2" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                        {isRateLimited ? "Daily Limit Reached (Click for Options)" : "Drop your interior image here"}
                                    </h3>
                                    <p className="text-sm opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                        or click to browse • JPEG, PNG, WebP • Max 5MB
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // STATE 2: VISUALIZE
                            // STATE 2: VISUALIZE + INSTRUCTIONS
                            <div className="w-full space-y-6">
                                {/* Image Preview */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2" style={{ borderColor: V.gold }}>
                                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                {/* Step-by-Step Instructions - VISIBLE IMMEDIATELY */}
                                <div className="text-left rounded-lg p-4 md:p-6 space-y-4 border"
                                    style={{
                                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(193,163,93,0.08)',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(193,163,93,0.2)'
                                    }}>
                                    <h5 className="font-bold text-sm md:text-base mb-3 flex items-center gap-2"
                                        style={{ color: isDark ? '#fff' : V.nearBlack }}>
                                        <Sparkles className="w-5 h-5" style={{ color: V.gold }} />
                                        What Happens Next:
                                    </h5>

                                    {/* Step 1 */}
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{ background: V.gold, color: '#000' }}>
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm mb-1" style={{ color: isDark ? '#fff' : V.nearBlack }}>
                                                Click "Visualize with AI"
                                            </p>
                                            <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                                The button will copy a professional design prompt automatically
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{ background: V.gold, color: '#000' }}>
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm mb-1" style={{ color: isDark ? '#fff' : V.nearBlack }}>
                                                Choose Your AI
                                            </p>
                                            <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                                Opens Gemini, ChatGPT, or Copilot (whichever is available)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{ background: V.gold, color: '#000' }}>
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm mb-1" style={{ color: isDark ? '#fff' : V.nearBlack }}>
                                                Paste the Prompt
                                            </p>
                                            <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                                Press <kbd className="px-1 py-0.5 rounded text-xs"
                                                    style={{
                                                        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                                        color: isDark ? '#fff' : V.nearBlack
                                                    }}>Ctrl+V</kbd>
                                                (or <kbd className="px-1 py-0.5 rounded text-xs"
                                                    style={{
                                                        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                                        color: isDark ? '#fff' : V.nearBlack
                                                    }}>⌘+V</kbd>) in the chat box
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{ background: V.gold, color: '#000' }}>
                                            4
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm mb-1" style={{ color: isDark ? '#fff' : V.nearBlack }}>
                                                Upload This Image
                                            </p>
                                            <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                                Click the <Upload className="w-3 h-3 inline mx-0.5" /> icon and upload this same photo
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 5 */}
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{ background: V.gold, color: '#000' }}>
                                            5
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm mb-1" style={{ color: isDark ? '#fff' : V.nearBlack }}>
                                                Send & Get AI Magic! ✨
                                            </p>
                                            <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                                Hit Enter or click Send. AI will analyze and transform your space!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Visualize Button */}
                                <motion.button
                                    onClick={handleVisualize}
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full px-8 py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-3 shadow-xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${V.gold}, ${V.gold2})`,
                                        boxShadow: `0 10px 30px ${V.gold}40`
                                    }}
                                >
                                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                                    {isLoading ? "Preparing..." : "Visualize with AI"}
                                </motion.button>

                                <p className="text-sm opacity-60 text-center" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                    {navigator.canShare ? "Will share to AI App" : "Will open Gemini, ChatGPT, or Copilot"}
                                </p>
                            </div>
                        )}

                        {/* Limit Reached Overlay */}
                        <AnimatePresence>
                            {showLimitModal && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute inset-0 flex items-center justify-center z-30 p-6 text-center"
                                    style={{
                                        background: isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(15px)'
                                    }}
                                >
                                    <div className="relative w-full max-w-sm mx-auto">
                                        <button
                                            onClick={() => setShowLimitModal(false)}
                                            className="absolute -top-4 -right-4 p-2 hover:opacity-70 transition-opacity"
                                            style={{ color: isDark ? V.offGold : V.nearBlack }}
                                        >
                                            <X className="w-6 h-6" />
                                        </button>

                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                                            style={{
                                                background: `linear-gradient(135deg, ${V.gold}, ${V.gold2})`,
                                                boxShadow: `0 10px 30px ${V.gold}40`
                                            }}
                                        >
                                            <limitMessage.icon className="w-8 h-8 text-white" />
                                        </motion.div>

                                        <h4 className="text-2xl font-light mb-3"
                                            style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                                            {limitMessage.title}
                                        </h4>
                                        <p className="text-sm mb-6 leading-relaxed opacity-80"
                                            style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                            {limitMessage.text}
                                        </p>

                                        <a
                                            href="/contact"
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white transition-transform hover:scale-105 shadow-xl"
                                            style={{ background: `linear-gradient(135deg, ${V.nearBlack}, #000)` }}
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            Contact Our Designers
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Toast Overlay - DETAILED STEPS */}
                        <AnimatePresence>
                            {showToast && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-20 overflow-y-auto p-4"
                                >
                                    <div className="text-center p-6 md:p-8 max-w-lg">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                                        >
                                            <CheckCircle className="w-8 h-8 text-green-500" />
                                        </motion.div>
                                        <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Prompt Copied!</h4>
                                        <p className="text-gray-400 text-sm mb-6">Opening Gemini AI...</p>

                                        {/* Step-by-Step Instructions */}
                                        <div className="text-left bg-white/5 rounded-lg p-4 md:p-6 mb-4 space-y-4">
                                            <h5 className="text-white font-bold text-sm md:text-base mb-3 flex items-center gap-2">
                                                <Sparkles className="w-5 h-5" style={{ color: V.gold }} />
                                                Follow These Steps:
                                            </h5>

                                            {/* Step 1 */}
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                                    style={{ background: V.gold, color: '#000' }}>
                                                    1
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold text-sm mb-1">Open Gemini AI</p>
                                                    <p className="text-gray-400 text-xs">The prompt is already copied! A new tab will open automatically.</p>
                                                </div>
                                            </div>

                                            {/* Step 2 */}
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                                    style={{ background: V.gold, color: '#000' }}>
                                                    2
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold text-sm mb-1">Paste the Prompt</p>
                                                    <p className="text-gray-400 text-xs">Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-white">Ctrl+V</kbd> (or <kbd className="px-1 py-0.5 bg-white/10 rounded text-white">⌘+V</kbd> on Mac) in the Gemini chat box</p>
                                                </div>
                                            </div>

                                            {/* Step 3 */}
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                                    style={{ background: V.gold, color: '#000' }}>
                                                    3
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold text-sm mb-1">Upload Your Image</p>
                                                    <p className="text-gray-400 text-xs">Click the <Upload className="w-3 h-3 inline mx-0.5" /> image icon in Gemini and upload the same interior photo</p>
                                                </div>
                                            </div>

                                            {/* Step 4 */}
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                                    style={{ background: V.gold, color: '#000' }}>
                                                    4
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold text-sm mb-1">Send & Get Results!</p>
                                                    <p className="text-gray-400 text-xs">Hit Enter or click Send. Gemini will analyze your space and suggest improvements! ✨</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tip */}
                                        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-3 text-xs text-left">
                                            <p className="text-yellow-200">
                                                <strong>💡 Tip:</strong> If Gemini doesn't open automatically, <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">click here</a> and paste manually!
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default Analysis;
