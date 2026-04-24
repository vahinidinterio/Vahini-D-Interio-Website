// import React, { createContext, useContext, useState, useEffect } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//     const [isDark, setIsDark] = useState(() => {
//         const savedTheme = localStorage.getItem('theme');
//         return savedTheme ? savedTheme === 'dark' : true; // Default to dark
//     });

//     useEffect(() => {
//         const root = window.document.documentElement;
//         if (isDark) {
//             root.classList.remove('light-theme');
//             localStorage.setItem('theme', 'dark');
//         } else {
//             root.classList.add('light-theme');
//             localStorage.setItem('theme', 'light');
//         }
//     }, [isDark]);

//     const toggleTheme = async (e) => {
//         if (!document.startViewTransition) {
//             setIsDark(!isDark);
//             return;
//         }

//         const x = e?.clientX ?? window.innerWidth / 2;
//         const y = e?.clientY ?? window.innerHeight / 2;

//         const endRadius = Math.hypot(
//             Math.max(x, window.innerWidth - x),
//             Math.max(y, window.innerHeight - y)
//         );

//         const transition = document.startViewTransition(() => {
//             setIsDark(!isDark);
//         });

//         try {
//             await transition.ready;

//             // "Architectural" Easing: Gentle spring/snap
//             // cubic-bezier(0.25, 1, 0.5, 1)
//             const duration = 700;
//             const easing = "cubic-bezier(0.25, 1, 0.5, 1)";

//             const clipPath = [
//                 `circle(0px at ${x}px ${y}px)`,
//                 `circle(${endRadius}px at ${x}px ${y}px)`,
//             ];

//             document.documentElement.animate(
//                 {
//                     clipPath: clipPath,
//                 },
//                 {
//                     duration: duration,
//                     easing: easing,
//                     pseudoElement: "::view-transition-new(root)",
//                 }
//             );
//         } catch (err) {
//             console.error("Transition failed", err);
//         }
//     };

//     return (
//         <ThemeContext.Provider value={{ isDark, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => useContext(ThemeContext);




import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const materialThemes = {
  // 🪵 Deep Walnut: Sophisticated and grounded
  wood: {
    name: "Wood",
    bg: "#1A1614", 
    surface: "#251F1D",
    accent: "#A68966",
    isDark: true,
  },

  // 🏛️ Carrara Marble: Bright, clean, and airy
  marble: {
    name: "Marble",
    bg: "#FDFDFD",
    surface: "#F2F2F2",
    accent: "#B59358",
    isDark: false,
  },

  // 🌑 Gunmetal Matte: Professional and architectural
  matte: {
    name: "Matte",
    bg: "#121212",
    surface: "#1E1E1E",
    accent: "#949494",
    isDark: true,
  },

  // ✨ Vahini Signature: High-contrast luxury
  luxury: {
    name: "Luxury",
    bg: "#080808",
    surface: "#121212",
    accent: "#C1A35D",
    isDark: true,
  },

  // 🌊 Coastal Sky: Muted and serene (not too bright)
  sky: {
    name: "Sky",
    bg: "#1e2f42ff",
    surface: "#D5DEE9",
    accent: "#5A86AD",
    isDark: false,
  },

  // 🌿 Sage & Gold: Modern organic luxury
  olive: {
    name: "Olive",
    bg: "#142414ff",
    surface: "#2e3f2eff",
    accent: "#C1A35D",
    isDark: true,
  },

  // 🏜️ Tuscan Sand: Warm, inviting, and natural
  sand: {
    name: "Sand",
    bg: "#F2E8DF",
    surface: "#E7D8C9",
    accent: "#B38B67",
    isDark: false,
  },

  // 🧊 Arctic Studio: Ultra-minimalist modernism
  ice: {
    name: "Ice",
    bg: "#35596aff",
    surface: "#DAE1E3",
    accent: "#8FA3AD",
    isDark: false,
  },

  // 🌌 Royal Midnight: Deep, moody lounge aesthetic
  midnight: {
    name: "Midnight",
    bg: "#0A0D14",
    surface: "#121721",
    accent: "#C1A35D",
    isDark: true,
  },

  // 🌸 Champagne Rose: Soft, warm, and high-end
  rose: {
    name: "Rose",
    bg: "#F9F2F0",
    surface: "#F0E4E1",
    accent: "#D4A59A",
    isDark: false,
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "luxury";
  });

  const currentTheme = materialThemes[theme] || materialThemes["luxury"];

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--bg", currentTheme.bg);
    root.style.setProperty("--surface", currentTheme.surface);
    root.style.setProperty("--accent", currentTheme.accent);

    // Apply global classes for CSS targeting
    if (currentTheme.isDark) {
      root.classList.add("dark");
      root.classList.remove("light-theme");
    } else {
      root.classList.remove("dark");
      root.classList.add("light-theme");
    }

    localStorage.setItem("theme", theme);
  }, [theme, currentTheme]);

  const changeTheme = async (newTheme, e) => {
    if (!materialThemes[newTheme]) return;

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    try {
      await transition.ready;

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch (err) {
      console.error("Transition failed", err);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        themes: materialThemes,
        isDark: currentTheme.isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);