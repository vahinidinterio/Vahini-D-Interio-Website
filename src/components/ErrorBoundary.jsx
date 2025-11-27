import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, PenTool, Ruler, Compass } from 'lucide-react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-[#C1A35D] p-6 relative overflow-hidden font-sans">
                    {/* Architectural Grid Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(#C1A35D 1px, transparent 1px), linear-gradient(90deg, #C1A35D 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Floating Design Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-20 -right-20 opacity-5"
                        >
                            <Compass size={400} strokeWidth={0.5} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                            className="absolute -bottom-20 -left-20 opacity-5"
                        >
                            <Ruler size={400} strokeWidth={0.5} />
                        </motion.div>
                    </div>

                    <div className="max-w-4xl w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        {/* Left: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-left"
                        >
                            <div className="flex items-center gap-3 mb-6 text-[#C1A35D]/60">
                                <PenTool size={20} />
                                <span className="uppercase tracking-[0.2em] text-sm">Under Renovation</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tighter leading-none text-white"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                Design <br />
                                <span className="text-[#C1A35D] italic">Interrupted</span>
                            </h1>

                            <p className="text-xl text-white/70 font-light mb-8 leading-relaxed">
                                Even the most meticulously planned spaces encounter the unexpected. We are currently refining this section to meet our exacting standards.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={this.handleGoHome}
                                    className="group relative px-8 py-4 bg-[#C1A35D] text-black font-medium tracking-wide overflow-hidden transition-all hover:bg-[#D4B76B]"
                                >
                                    <span className="relative flex items-center gap-3 z-10">
                                        <Home size={18} />
                                        RETURN HOME
                                    </span>
                                </button>

                                <button
                                    onClick={this.handleGoBack}
                                    className="group px-8 py-4 border border-white/20 text-white font-medium tracking-wide hover:border-[#C1A35D] hover:text-[#C1A35D] transition-all"
                                >
                                    <span className="flex items-center gap-3">
                                        <ArrowLeft size={18} />
                                        GO BACK
                                    </span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Right: Abstract Blueprint Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative h-[400px] hidden md:flex items-center justify-center"
                        >
                            <div className="absolute inset-0 border border-[#C1A35D]/20 rounded-full animate-pulse"></div>
                            <div className="absolute inset-10 border border-[#C1A35D]/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                            {/* Central "404" or Abstract Shape */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                <div className="text-[12rem] font-thin text-[#C1A35D]/10 select-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    404
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 border-2 border-[#C1A35D] rotate-45 opacity-50"></div>
                                    <div className="w-32 h-32 border-2 border-white rotate-12 absolute opacity-20"></div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
