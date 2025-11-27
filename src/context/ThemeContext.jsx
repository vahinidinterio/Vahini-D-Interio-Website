import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : true; // Default to dark
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = async (e) => {
        if (!document.startViewTransition) {
            setIsDark(!isDark);
            return;
        }

        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? window.innerHeight / 2;

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setIsDark(!isDark);
        });

        try {
            await transition.ready;

            // "Architectural" Easing: Gentle spring/snap
            // cubic-bezier(0.25, 1, 0.5, 1)
            const duration = 700;
            const easing = "cubic-bezier(0.25, 1, 0.5, 1)";

            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: duration,
                    easing: easing,
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        } catch (err) {
            console.error("Transition failed", err);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
