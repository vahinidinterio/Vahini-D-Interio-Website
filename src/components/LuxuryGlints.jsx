import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { V } from "../utils/colors";

const LuxuryGlints = ({ count = 12 }) => {
    const glints = useMemo(
        () =>
            Array.from({ length: count }).map((_, i) => ({
                id: i,
                left: `${5 + Math.random() * 90}vw`,
                top: `${5 + Math.random() * 90}vh`,
                delay: Math.random() * 6,
                dur: 6 + Math.random() * 6,
                size: 0.6 + Math.random() * 1.8,
                opacity: 0.06 + Math.random() * 0.12,
            })),
        [count]
    );

    return (
        <>
            {glints.map((g) => (
                <motion.div
                    key={g.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: [0, g.opacity, 0.02, g.opacity, 0],
                        scale: [1, 1.6, 1, 1.3, 1],
                        rotate: [0, 9, -6, 9, 0],
                    }}
                    transition={{ duration: g.dur, repeat: Infinity, delay: g.delay, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        left: g.left,
                        top: g.top,
                        width: `${g.size}px`,
                        height: `${g.size}px`,
                        borderRadius: "50%",
                        background: V.gold,
                        boxShadow: `0 0 ${6 * g.size}px rgba(193,163,93,0.55)`,
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />
            ))}
        </>
    );
};

export default LuxuryGlints;
