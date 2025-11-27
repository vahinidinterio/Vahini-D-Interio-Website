import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Upload, Loader2, ExternalLink, CheckCircle, X, MessageCircle, Palette, Coffee, Zap, Crown } from 'lucide-react';
import { useRateLimiter } from '../hooks/useRateLimiter';
import { useTheme } from '../context/ThemeContext';
import { V } from '../utils/colors';
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

const VahiniAIButton = () => {
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
            // OPTION A: MOBILE / SHARE API (Passes Image + Prompt)
            if (navigator.canShare && navigator.canShare({ files: [selectedFile] })) {
                await navigator.share({
                    files: [selectedFile],
                    title: 'Vahini AI Design',
                    text: prompt
                });
                incrementUsage();
            }
            // OPTION B: DESKTOP / FALLBACK (Copy Prompt + Redirect)
            else {
                // 1. Copy Prompt (Backup)
                await navigator.clipboard.writeText(prompt);

                // 2. Show Toast
                setShowToast(true);
                incrementUsage();

                // 3. Redirect with Prompt in URL
                const encodedPrompt = encodeURIComponent(prompt);
                setTimeout(() => {
                    window.open(`https://gemini.google.com/app?text=${encodedPrompt}`, '_blank');
                    setShowToast(false);
                }, 2000);
            }
        } catch (error) {
            console.error("Error in Visualization Flow:", error);
            // Fallback if share fails (e.g., user cancelled)
            if (error.name !== 'AbortError') {
                window.open('https://gemini.google.com/app', '_blank');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-2xl border relative overflow-hidden ${isDark ? 'border-white/10' : 'border-black/10'}`}
            style={{
                background: isDark ? 'rgba(26, 26, 26, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}
        >
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl md:text-3xl font-light flex items-center gap-3"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        <Sparkles className="w-6 h-6" />
                        Vahini AI Design Visualizer
                    </h3>
                    <div className="text-sm px-3 py-1 rounded-full"
                        style={{
                            background: `linear-gradient(135deg, ${V.gold}20, ${V.gold}10)`,
                            border: `1px solid ${V.gold}40`,
                            color: V.gold
                        }}>
                        {maxUses - usageCount}/{maxUses} remaining
                    </div>
                </div>
                <p className="text-sm opacity-70" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                    Upload your interior photo. We'll generate a professional design prompt and redirect you to our AI engine.
                </p>
            </div>

            {/* Main Action Area */}
            <div className="space-y-4">
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                    className="hidden"
                />

                {!selectedFile ? (
                    // STATE 1: UPLOAD BUTTON
                    <motion.button
                        onClick={handleUploadClick}
                        disabled={isLoading}
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        className={`w-full py-6 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-3 ${isDark
                                ? 'border-white/20 hover:border-[#C1A35D]/50 hover:bg-white/5'
                                : 'border-black/20 hover:border-[#C1A35D]/50 hover:bg-black/5'
                            } ${isLoading ? 'cursor-wait opacity-80' : 'cursor-pointer'}`}
                    >
                        <Upload className="w-8 h-8" style={{ color: V.gold }} />
                        <div className="text-center">
                            <p className="font-semibold text-lg" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                {isRateLimited ? "Daily Limit Reached (Click for Options)" : "Click to Upload Photo"}
                            </p>
                            <p className="text-xs opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                JPEG, PNG, WebP • Max 5MB
                            </p>
                        </div>
                    </motion.button>
                ) : (
                    // STATE 2: VISUALIZE ACTION
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-black/5 border border-black/10">
                            <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden">
                                <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                    {selectedFile.name}
                                </p>
                                <p className="text-xs opacity-60">Ready to visualize</p>
                            </div>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="p-1 hover:bg-black/10 rounded-full"
                            >
                                <span className="sr-only">Remove</span>
                                ✕
                            </button>
                        </div>

                        <motion.button
                            onClick={handleVisualize}
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 shadow-lg"
                            style={{
                                background: `linear-gradient(135deg, ${V.gold}, ${V.gold2})`,
                                boxShadow: `0 8px 20px ${V.gold}40`
                            }}
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <ExternalLink className="w-6 h-6" />
                            )}
                            {isLoading ? "Preparing..." : "Visualize in Gemini AI"}
                        </motion.button>
                    </motion.div>
                )}

                {/* Limit Reached Overlay */}
                <AnimatePresence>
                    {showLimitModal && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-0 flex items-center justify-center z-20 p-6 text-center"
                            style={{
                                background: isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(15px)'
                            }}
                        >
                            <div className="relative w-full max-w-sm">
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
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
                                    style={{ background: `linear-gradient(135deg, ${V.nearBlack}, #000)` }}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Contact Our Designers
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toast Notification */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl z-10"
                        >
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Prompt Copied!</h4>
                                <p className="text-gray-300 text-sm mb-4">Redirecting to Gemini AI...</p>
                                <div className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full inline-block">
                                    Paste prompt & upload this image
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default VahiniAIButton;
