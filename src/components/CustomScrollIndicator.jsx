import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { V } from "../utils/colors";

const CustomScrollIndicator = () => {
    const { scrollYProgress } = useScroll();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Transform scroll progress to stroke dashoffset for circle
    // Circle circumference = 2 * pi * r. If r=18, C ~ 113
    const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [113, 0]);

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-50 cursor-pointer mix-blend-difference"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
        >
            <div className="relative w-12 h-12 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                    <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke={V.darkAccent}
                        strokeWidth="2"
                    />
                    <motion.circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke={V.gold}
                        strokeWidth="2"
                        strokeDasharray="113"
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                    />
                </svg>

                <ArrowUp size={20} color={V.gold} />
            </div>
        </motion.div>
    );
};

export default CustomScrollIndicator;
