// import React, { useState } from "react";
// import { Link, useLocation, Outlet } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu,
//   X,
//   Sun,
//   Moon,
//   Instagram,
//   Facebook,
//   Youtube,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   Linkedin,
//   TreePine,
//   Gem,
//   Layers,
//   Crown,
// } from "lucide-react";
// import FloatingAnalysisButton from "./FloatingAnalysisButton";
// import FloatingSocialButton from "./FloatingSocialButton";
// import LocalSeoLinks from "./LocalSeoLinks";
// import CustomScrollIndicator from "./CustomScrollIndicator";
// import { V } from "../utils/colors";
// import { useTheme } from "../context/ThemeContext";

// // Lazy load heavy background components
// const LuxuryGlints = React.lazy(() => import("./LuxuryGlints"));
// const InteractiveBackground = React.lazy(() =>
//   import("./InteractiveBackground")
// );

// const themeIcons = {
//   wood: <TreePine size={16} />,
//   marble: <Gem size={16} />,
//   matte: <Layers size={16} />,
//   luxury: <Crown size={16} />,
// };

// const materialThemes = {
//   wood: {
//     name: "Wood",
//     bg: "#1A1412", // Deep Espresso/Walnut
//     surface: "#2D2421", // Burnt Umber
//     accent: "#D4A373", // Natural Oak
//     icon: "🪵",
//   },
//   marble: {
//     name: "Marble",
//     bg: "#FDFDFD", // Clean Carrara White
//     surface: "#F2F2F2", // Soft Fog
//     accent: "#1A1A1A", // High-contrast Black Marble veining
//     icon: "🪨",
//   },
//   matte: {
//     name: "Matte",
//     bg: "#121212", // Absolute Obsidian
//     surface: "#1E1E1E", // Carbon Steel
//     accent: "#E0E0E0", // Cool Chrome
//     icon: "🎨",
//   },
//   luxury: {
//     name: "Luxury",
//     bg: "#0A0A0A", // Pitch Black
//     surface: "#151515", // Velvet shadow
//     accent: "#C1A35D", // Signature Gold
//     icon: "✨",
//   },

//   // NEW DIVERSIFIED THEMES (No overlap)
//   sky: {
//     name: "Sky",
//     bg: "#F2F6F9", // Airy Morning Light
//     surface: "#E1E8EF", // Frosted Glass
//     accent: "#5A7D9A", // Slate Blue
//     icon: "🌤️",
//   },
//   olive: {
//     name: "Olive",
//     bg: "#1E241E", // Deep Forest
//     surface: "#2A312A", // Sage Leaf
//     accent: "#A3B18A", // Dusty Moss
//     icon: "🌿",
//   },
//   sand: {
//     name: "Sand",
//     bg: "#F9F6F1", // Warm Parchment
//     surface: "#F0EAE0", // Travertine Stone
//     accent: "#BC9E82", // Terracotta Clay
//     icon: "🏖️",
//   },
//   ice: {
//     name: "Ice",
//     bg: "#E3F2FD", // Glacial Blue
//     surface: "#BBDEFB", // Clear Water
//     accent: "#1976D2", // Deep Cobalt
//     icon: "🧊",
//   },
//   midnight: {
//     name: "Midnight",
//     bg: "#050B14", // Deepest Navy
//     surface: "#0D1726", // Night Sky
//     accent: "#E5C100", // 24k Brass
//     icon: "🌌",
//   },
//   rose: {
//     name: "Rose",
//     bg: "#2D1B1E", // Deep Wine/Burgundy (Dark Alternative)
//     surface: "#3D262A", // Plum Velvet
//     accent: "#D88C9A", // Muted Blush
//     icon: "🌸",
//   },
// };

// const Layout = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
//   const { theme, changeTheme, themes, isDark } = useTheme();
//   const currentTheme = themes[theme];

//   const [isDesktop, setIsDesktop] = useState(false);

//   // Only load heavy 3D background on desktop
//   React.useEffect(() => {
//     const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
//     checkDesktop();
//     window.addEventListener("resize", checkDesktop);
//     return () => window.removeEventListener("resize", checkDesktop);
//   }, []);

//   const navLinks = [
//     { path: "/", label: "Home" },
//     { path: "/about", label: "About" },
//     { path: "/portfolio", label: "Portfolio" },
//     { path: "/services", label: "Services" },
//     { path: "/gallery", label: "Gallery" },
//     { path: "/testimonials", label: "Testimonials" },
//     { path: "/contact", label: "Contact" },
//   ];

//   const expandedNavLinks = [
//     { path: "/", label: "Vahini D'Interio Home" },
//     { path: "/about", label: "About Vahini D'Interio" },
//     { path: "/portfolio", label: "Design Portfolio" },
//     { path: "/gallery", label: "Design Gallery" },
//     { path: "/testimonials", label: "Genuine Client Testimonials" },
//     { path: "/contact", label: "Contact Vahini D'Interio" },
//   ];

//   const servicesLinks = [
//     "Custom Furniture Design",
//     "Modular Kitchens",
//     "Artisan Wardrobe Solutions",
//     "Traditional Pooja Rooms",
//     "Commercial Fit-Outs",
//     "Restoration & Repairs",
//   ];

//   return (
//     <div
//       className="min-h-screen w-full relative flex flex-col transition-colors duration-500"
//       style={{
//         background: isDark
//           ? `radial-gradient(1200px 600px at 50% 42%, rgba(193,163,93,0.04), transparent 8%), linear-gradient(180deg, ${V.bg} 0%, ${V.nearBlack} 100%)`
//           : "#F9F7F3",
//         color: V.offGold,
//       }}
//     >
//       {/* Global Background Effects */}
//       <React.Suspense fallback={null}>
//         {isDark && <LuxuryGlints />}
//         {isDesktop && <InteractiveBackground />}
//       </React.Suspense>
//       <CustomScrollIndicator />

//       {/* Floating Buttons */}
//       <FloatingAnalysisButton />
//       <FloatingSocialButton />

//       {/* Navigation Bar */}
//       <nav
//         className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b transition-colors duration-500"
//         style={{
//           backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.6)",
//           borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
//         }}
//       >
//         <Link
//           to="/"
//           className="flex items-center gap-3 group"
//           style={{ color: V.gold }}
//         >
//           <img
//             src="/logo512.png"
//             alt="Vahini D'Interio - Luxury Interior Design Narasaraopet"
//             width="64"
//             height="64"
//             className="h-12 md:h-14 lg:h-16 w-auto rounded-full transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="hidden md:flex flex-col">
//             <span className="text-2xl font-light tracking-widest uppercase leading-none">
//               VΛHINI D'INTERIO
//             </span>
//             <span className="text-[0.65rem] tracking-[0.3em] uppercase opacity-80 mt-1 font-medium">
//               Built for Living
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center md:gap-4 lg:gap-8">
//           {navLinks.map((link) => {
//             const isActive = location.pathname === link.path;
//             return (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className="text-sm tracking-widest uppercase transition-colors duration-300 relative group"
//                 style={{
//                   color: isActive ? V.gold : V.offGold,
//                   fontWeight: 500,
//                   letterSpacing: "0.15em",
//                 }}
//               >
//                 {link.label}
//                 <span
//                   className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full ${
//                     isActive ? "w-full" : "w-0"
//                   }`}
//                   style={{ backgroundColor: V.gold }}
//                 />
//               </Link>
//             );
//           })}

//           {/* Theme Dropdown */}
//           <div className="relative group hidden md:block">
//             <button
//               className="px-3 py-2 text-xs border rounded-full tracking-widest transition-all duration-300 hover:bg-[#C1A35D]/10"
//               style={{ borderColor: V.gold, color: V.gold }}
//             >
//               Theme
//             </button>

//             <div
//               className="absolute right-0 mt-3 w-52 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-50"
//               style={{
//                 background: "var(--surface)",
//                 border: "1px solid rgba(193,163,93,0.2)",
//                 backdropFilter: "blur(12px)",
//               }}
//             >
//               {Object.entries(materialThemes).map(([key, val]) => (
//                 <div
//                   key={key}
//                   onClick={(e) => changeTheme(key, e)}
//                   className={`px-4 py-3 text-sm cursor-pointer transition-all duration-200 flex items-center justify-between ${
//                     theme === key ? "bg-[#C1A35D]/10" : "hover:bg-[#C1A35D]/10"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <span>{materialThemes[key].icon}</span>
//                     <span>{val.name}</span>
//                   </div>

//                   <div className="flex gap-1">
//                     <span
//                       className="w-3 h-3 rounded-full"
//                       style={{ background: val.bg }}
//                     />
//                     <span
//                       className="w-3 h-3 rounded-full"
//                       style={{ background: val.surface }}
//                     />
//                     <span
//                       className="w-3 h-3 rounded-full"
//                       style={{ background: val.accent }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="flex items-center gap-4 md:hidden">
//           <button
//             onClick={(e) => {
//               const keys = Object.keys(materialThemes);
//               const currentIndex = keys.includes(theme)
//                 ? keys.indexOf(theme)
//                 : 0;
//               const nextTheme = keys[(currentIndex + 1) % keys.length];
//               changeTheme(nextTheme, e);
//             }}
//             className="p-2 rounded-full border flex items-center justify-center"
//             style={{ color: V.gold, borderColor: V.gold }}
//           >
//             <span>{materialThemes[theme]?.icon}</span>
//           </button>

//           <button
//             className="text-current hover:opacity-80"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             style={{ color: V.offGold }}
//             aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
//             aria-expanded={isMenuOpen}
//           >
//             {isMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             variants={{
//               hidden: { y: "-100%", opacity: 0 },
//               visible: {
//                 y: "0%",
//                 opacity: 1,
//                 transition: {
//                   duration: 0.45,
//                   ease: [0.16, 1, 0.3, 1],
//                   staggerChildren: 0.1,
//                   delayChildren: 0.2,
//                 },
//               },
//               exit: {
//                 y: "-100%",
//                 opacity: 0,
//                 transition: { duration: 0.3, ease: "easeInOut" },
//               },
//             }}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 z-40 pt-32 px-8 md:hidden"
//             style={{
//               backgroundColor: isDark
//                 ? "rgba(0,0,0,0.95)"
//                 : "rgba(249, 245, 240, 0.98)",
//             }}
//           >
//             <div className="flex flex-col gap-8 items-start">
//               {navLinks.map((link) => (
//                 <motion.div
//                   key={link.path}
//                   variants={{
//                     hidden: { x: -30, opacity: 0 },
//                     visible: {
//                       x: 0,
//                       opacity: 1,
//                       transition: { duration: 0.4, ease: "easeOut" },
//                     },
//                   }}
//                   className="w-full"
//                 >
//                   <Link
//                     to={link.path}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="text-2xl tracking-widest uppercase block w-full hover:opacity-70 transition-opacity"
//                     style={{
//                       color:
//                         location.pathname === link.path ? V.gold : V.offGold,
//                     }}
//                   >
//                     {link.label}
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content Area */}
//       <main className="flex-grow pt-20 relative z-10">
//         <Outlet />
//       </main>

//       {/* Local SEO Links */}
//       <LocalSeoLinks />

//       {/* Enhanced Footer */}
//       <footer
//         className="relative z-10 border-t transition-colors duration-500 pt-16 pb-8"
//         style={{
//           backgroundColor: isDark ? "rgba(0,0,0,0.8)" : "#F9F7F3",
//           borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
//           color: isDark ? V.offGold : V.nearBlack,
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
//           {/* Brand Column */}
//           <div className="space-y-6">
//             <Link
//               to="/"
//               className="flex items-center gap-3 group"
//               style={{ color: V.gold }}
//             >
//               <img
//                 src="/logo192.png"
//                 alt="Vahini D'Interio Logo"
//                 width="40"
//                 height="40"
//                 className="h-10 w-auto"
//               />
//               <div className="flex flex-col">
//                 <span className="text-xl font-light tracking-widest uppercase leading-none">
//                   VΛHINI D'INTERIO
//                 </span>
//                 <span className="text-[0.55rem] tracking-[0.3em] uppercase opacity-80 mt-1 font-medium">
//                   Built for Living
//                 </span>
//               </div>
//             </Link>
//             <p className="text-sm leading-relaxed opacity-80">
//               Blending the heritage of Vishwabrahmin craftsmanship with modern
//               interior design to create timeless spaces in Narasaraopet and
//               Palnadu.
//             </p>
//             <div className="flex items-center gap-4">
//               {[
//                 {
//                   icon: <Facebook size={20} />,
//                   href: "https://www.facebook.com/profile.php?id=61583376973962",
//                   label: "Visit Vahini D'Interio on Facebook",
//                 },
//                 {
//                   icon: <Instagram size={20} />,
//                   href: "https://www.instagram.com/vahinidinterio/",
//                   label: "Follow Vahini D'Interio on Instagram",
//                 },
//                 {
//                   icon: <Youtube size={20} />,
//                   href: "https://www.youtube.com/@VahiniDInterio",
//                   label: "Watch Vahini D'Interio on YouTube",
//                 },
//                 {
//                   icon: <Linkedin size={20} />,
//                   href: "https://www.linkedin.com/in/vahinidinterio",
//                   label: "Connect with Vahini D'Interio on LinkedIn",
//                 },
//                 {
//                   icon: <Globe size={20} />,
//                   href: "https://in.pinterest.com/vahinidinterio/",
//                   label: "View Vahini D'Interio on Pinterest",
//                 },
//               ].map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={social.label}
//                   className="p-2 rounded-full border transition-all duration-300 hover:scale-110"
//                   style={{
//                     borderColor: V.gold,
//                     color: V.gold,
//                     backgroundColor: isDark
//                       ? "rgba(193, 163, 93, 0.1)"
//                       : "transparent",
//                   }}
//                 >
//                   {social.icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links (Updated with longer names) */}
//           <div>
//             <h4
//               className="text-lg font-semibold mb-6"
//               style={{ color: V.gold }}
//             >
//               Important Links
//             </h4>
//             <ul className="space-y-3 text-sm">
//               {expandedNavLinks.map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     to={link.path}
//                     className="hover:text-[#C1A35D] transition-colors duration-200 flex items-center gap-2 group opacity-80 hover:opacity-100"
//                   >
//                     <span className="w-1 h-1 rounded-full bg-[#C1A35D] opacity-0 group-hover:opacity-100 transition-opacity" />
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services (Updated to be links with cursor-pointer) */}
//           <div>
//             <h4
//               className="text-lg font-semibold mb-6"
//               style={{ color: V.gold }}
//             >
//               Our Service Specializations
//             </h4>
//             <ul className="space-y-3 text-sm">
//               {servicesLinks.map((service, index) => (
//                 <li key={index}>
//                   <Link
//                     to="/services" // Navigates to the services page
//                     className="hover:text-[#C1A35D] transition-colors duration-200 flex items-center gap-2 group cursor-pointer opacity-80 hover:opacity-100"
//                   >
//                     <span className="w-1 h-1 rounded-full bg-[#C1A35D] opacity-0 group-hover:opacity-100 transition-opacity" />
//                     {service}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4
//               className="text-lg font-semibold mb-6"
//               style={{ color: V.gold }}
//             >
//               Connect With Us
//             </h4>
//             <ul className="space-y-4 text-sm">
//               <li className="flex items-start gap-3">
//                 <MapPin
//                   size={18}
//                   className="mt-1 flex-shrink-0"
//                   style={{ color: V.gold }}
//                 />
//                 <span>
//                   Narasaraopet, Palnadu District,
//                   <br />
//                   Andhra Pradesh, India
//                 </span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone
//                   size={18}
//                   className="flex-shrink-0"
//                   style={{ color: V.gold }}
//                 />
//                 <span>+91 7416385148</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail
//                   size={18}
//                   className="flex-shrink-0"
//                   style={{ color: V.gold }}
//                 />
//                 <span>contact@vahinidinterio.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div
//           className="max-w-7xl mx-auto px-6 pt-8 border-t"
//           style={{
//             borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
//           }}
//         >
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider opacity-60">
//             <p>© 2025 Vahini D'Interio. All Rights Reserved.</p>
//             <div className="flex gap-6">
//               <Link
//                 to="/privacy-policy"
//                 className="hover:text-[#C1A35D] transition-colors"
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 to="/terms-of-service"
//                 className="hover:text-[#C1A35D] transition-colors"
//               >
//                 Terms of Service
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;



// import React, { useState } from "react";
// import { Link, useLocation, Outlet } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu,
//   X,
//   Instagram,
//   Facebook,
//   Youtube,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   Linkedin,
// } from "lucide-react";
// import FloatingAnalysisButton from "./FloatingAnalysisButton";
// import FloatingSocialButton from "./FloatingSocialButton";
// import LocalSeoLinks from "./LocalSeoLinks";
// import CustomScrollIndicator from "./CustomScrollIndicator";
// import { V } from "../utils/colors";
// import { useTheme } from "../context/ThemeContext";

// // Lazy load heavy background components
// const LuxuryGlints = React.lazy(() => import("./LuxuryGlints"));
// const InteractiveBackground = React.lazy(() =>
//   import("./InteractiveBackground")
// );

// const Layout = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();
  
//   // Destructure everything from the global ThemeContext
//   const { theme, changeTheme, themes, isDark } = useTheme();
  
//   // currentTheme now holds the specific bg, surface, and accent for the active choice
//   const currentTheme = themes[theme] || themes['luxury'];

//   const [isDesktop, setIsDesktop] = useState(false);

//   React.useEffect(() => {
//     const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
//     checkDesktop();
//     window.addEventListener("resize", checkDesktop);
//     return () => window.removeEventListener("resize", checkDesktop);
//   }, []);

//   const navLinks = [
//     { path: "/", label: "Home" },
//     { path: "/about", label: "About" },
//     { path: "/portfolio", label: "Portfolio" },
//     { path: "/services", label: "Services" },
//     { path: "/gallery", label: "Gallery" },
//     { path: "/testimonials", label: "Testimonials" },
//     { path: "/contact", label: "Contact" },
//   ];

//   const expandedNavLinks = [
//     { path: "/", label: "Vahini D'Interio Home" },
//     { path: "/about", label: "About Vahini D'Interio" },
//     { path: "/portfolio", label: "Design Portfolio" },
//     { path: "/gallery", label: "Design Gallery" },
//     { path: "/testimonials", label: "Genuine Client Testimonials" },
//     { path: "/contact", label: "Contact Vahini D'Interio" },
//   ];

//   const servicesLinks = [
//     "Custom Furniture Design",
//     "Modular Kitchens",
//     "Artisan Wardrobe Solutions",
//     "Traditional Pooja Rooms",
//     "Commercial Fit-Outs",
//     "Restoration & Repairs",
//   ];

//   return (
//     <div
//       className="min-h-screen w-full relative flex flex-col transition-colors duration-700 ease-in-out"
//       style={{
//         // Dynamically sets the background based on the selected material theme
//         backgroundColor: currentTheme.bg,
//         color: isDark ? V.offGold : V.nearBlack,
//       }}
//     >
//       <React.Suspense fallback={null}>
//         {isDark && <LuxuryGlints />}
//         {isDesktop && <InteractiveBackground />}
//       </React.Suspense>
//       <CustomScrollIndicator />

//       <FloatingAnalysisButton />
//       <FloatingSocialButton />

//       {/* Navigation Bar */}
//       <nav
//         className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b transition-all duration-500"
//         style={{
//           backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)",
//           borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
//         }}
//       >
//         <Link to="/" className="flex items-center gap-3 group" style={{ color: V.gold }}>
//           <img
//             src="/logo512.png"
//             alt="Vahini D'Interio"
//             className="h-12 md:h-14 w-auto rounded-full transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="hidden md:flex flex-col">
//             <span className="text-2xl font-light tracking-widest uppercase leading-none">
//               VΛHINI D'INTERIO
//             </span>
//             <span className="text-[0.65rem] tracking-[0.3em] uppercase opacity-80 mt-1 font-medium">
//               Built for Living
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center md:gap-4 lg:gap-8">
//           {navLinks.map((link) => {
//             const isActive = location.pathname === link.path;
//             return (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className="text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group"
//                 style={{
//                   color: isActive ? V.gold : (isDark ? V.offGold : V.nearBlack),
//                   fontWeight: isActive ? 600 : 400,
//                 }}
//               >
//                 {link.label}
//                 <span
//                   className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
//                   style={{ backgroundColor: V.gold }}
//                 />
//               </Link>
//             );
//           })}

//           {/* Theme Dropdown - Uses Global Themes */}
//           <div className="relative group">
//             <button
//               className="px-4 py-1.5 text-[10px] border rounded-full tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#C1A35D]/10"
//               style={{ borderColor: V.gold, color: V.gold }}
//             >
//               Material: {currentTheme.name}
//             </button>

//             <div
//               className="absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-50 shadow-2xl border"
//               style={{
//                 background: isDark ? "#121212" : "#FFFFFF",
//                 borderColor: `${V.gold}33`,
//                 backdropFilter: "blur(20px)",
//               }}
//             >
//               {Object.entries(themes).map(([key, val]) => (
//                 <div
//                   key={key}
//                   onClick={(e) => changeTheme(key, e)}
//                   className={`px-5 py-4 text-sm cursor-pointer transition-all duration-200 flex items-center justify-between border-b last:border-0 ${
//                     theme === key ? "bg-[#C1A35D]/15" : "hover:bg-[#C1A35D]/10"
//                   }`}
//                   style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="text-lg">{val.icon}</span>
//                     <span className={`font-light tracking-wide ${theme === key ? "font-medium" : ""}`} style={{ color: isDark ? "#fff" : "#000" }}>
//                       {val.name}
//                     </span>
//                   </div>
//                   <div className="flex gap-1.5">
//                     <div className="w-3 h-3 rounded-full border border-white/10" style={{ background: val.bg }} />
//                     <div className="w-3 h-3 rounded-full border border-white/10" style={{ background: val.accent }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu & Theme Toggle */}
//         <div className="flex items-center gap-4 md:hidden">
//           <button
//             onClick={(e) => {
//               const keys = Object.keys(themes);
//               const currentIndex = keys.indexOf(theme);
//               const nextTheme = keys[(currentIndex + 1) % keys.length];
//               changeTheme(nextTheme, e);
//             }}
//             className="p-2.5 rounded-full border flex items-center justify-center active:scale-90 transition-transform"
//             style={{ color: V.gold, borderColor: `${V.gold}44` }}
//           >
//             <span className="text-xl">{currentTheme.icon}</span>
//           </button>

//           <button
//             className="p-2"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             style={{ color: isDark ? V.offGold : V.nearBlack }}
//           >
//             {isMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="fixed inset-0 z-40 pt-32 px-10 md:hidden"
//             style={{ backgroundColor: isDark ? "rgba(10,10,10,0.98)" : "rgba(255,255,255,0.98)" }}
//           >
//             <div className="flex flex-col gap-10">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className="text-3xl font-light tracking-widest uppercase"
//                   style={{ color: location.pathname === link.path ? V.gold : (isDark ? V.offGold : V.nearBlack) }}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <main className="flex-grow pt-20 relative z-10">
//         <Outlet />
//       </main>

//       <LocalSeoLinks />

//       {/* Footer */}
//       <footer
//         className="relative z-10 border-t pt-20 pb-10 transition-colors duration-700"
//         style={{
//           backgroundColor: isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.02)",
//           borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
//           <div className="space-y-8">
//             <div className="flex flex-col gap-2">
//               <span className="text-2xl font-light tracking-widest uppercase text-[#C1A35D]">VΛHINI D'INTERIO</span>
//               <p className="text-xs tracking-widest uppercase opacity-60">Legacy Craftsmanship. Modern Living.</p>
//             </div>
//             <p className="text-sm leading-relaxed opacity-70 italic">
//               Blending heritage Vishwabrahmin artistry with cutting-edge architectural design.
//             </p>
//             <div className="flex items-center gap-4">
//               {[<Facebook />, <Instagram />, <Youtube />, <Linkedin />, <Globe />].map((icon, i) => (
//                 <button key={i} className="p-2.5 rounded-full border border-[#C1A35D]/30 text-[#C1A35D] hover:bg-[#C1A35D] hover:text-black transition-all duration-300">
//                   {React.cloneElement(icon, { size: 18 })}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8 text-[#C1A35D]">Navigation</h4>
//             <ul className="space-y-4">
//               {expandedNavLinks.map((link) => (
//                 <li key={link.path}>
//                   <Link to={link.path} className="text-sm opacity-60 hover:opacity-100 hover:text-[#C1A35D] transition-all">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8 text-[#C1A35D]">Expertise</h4>
//             <ul className="space-y-4">
//               {servicesLinks.map((service, i) => (
//                 <li key={i}>
//                   <Link to="/services" className="text-sm opacity-60 hover:opacity-100 transition-all flex items-center gap-2">
//                     <span className="w-1 h-1 rounded-full bg-[#C1A35D]" /> {service}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="space-y-6">
//             <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8 text-[#C1A35D]">Studio</h4>
//             <div className="space-y-4 text-sm opacity-70">
//               <div className="flex gap-3"><MapPin size={16} className="text-[#C1A35D]" /> Narasaraopet, AP, India</div>
//               <div className="flex gap-3"><Phone size={16} className="text-[#C1A35D]" /> +91 7416385148</div>
//               <div className="flex gap-3"><Mail size={16} className="text-[#C1A35D]" /> contact@vahinidinterio.com</div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-[#C1A35D]/10">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.2em] uppercase opacity-40">
//             <p>© 2026 Vahini D'Interio. Artisanally Authored.</p>
//             <div className="flex gap-8">
//               <Link to="/privacy-policy" className="hover:text-[#C1A35D]">Privacy</Link>
//               <Link to="/terms-of-service" className="hover:text-[#C1A35D]">Terms</Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;






import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Globe,
  Linkedin,
  TreePine,
  Gem,
  Layers,
  Crown,
  Cloud,
  Leaf,
  Sun,
  Snowflake,
  Moon,
  Heart
} from "lucide-react";
import FloatingAnalysisButton from "./FloatingAnalysisButton";
import FloatingSocialButton from "./FloatingSocialButton";
import LocalSeoLinks from "./LocalSeoLinks";
import CustomScrollIndicator from "./CustomScrollIndicator";
import { V } from "../utils/colors";
import { useTheme } from "../context/ThemeContext";

// Lazy load heavy background components
const LuxuryGlints = React.lazy(() => import("./LuxuryGlints"));
const InteractiveBackground = React.lazy(() =>
  import("./InteractiveBackground")
);

// Map theme keys to Lucide React components for the UI
const themeIcons = {
  wood: <TreePine size={14} />,
  marble: <Gem size={14} />,
  matte: <Layers size={14} />,
  luxury: <Crown size={14} />,
  sky: <Cloud size={14} />,
  olive: <Leaf size={14} />,
  sand: <Sun size={14} />,
  ice: <Snowflake size={14} />,
  midnight: <Moon size={14} />,
  rose: <Heart size={14} />,
};

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const location = useLocation();
  const { theme, changeTheme, themes, isDark } = useTheme();
  
  // Safety check for theme data
  const currentTheme = themes[theme] || { name: "Luxury", bg: "#0A0A0A", icon: "✨" };

  const [isDesktop, setIsDesktop] = useState(false);

  // Close theme dropdown when clicking anywhere else
  React.useEffect(() => {
    const handleClickOutside = () => setIsThemeOpen(false);
    if (isThemeOpen) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isThemeOpen]);

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
  ];

  const expandedNavLinks = [
    { path: "/", label: "Vahini D'Interio Home" },
    { path: "/about", label: "About Vahini D'Interio" },
    { path: "/portfolio", label: "Design Portfolio" },
    { path: "/gallery", label: "Design Gallery" },
    { path: "/testimonials", label: "Genuine Client Testimonials" },
    { path: "/contact", label: "Contact Vahini D'Interio" },
  ];

  const servicesLinks = [
    "Custom Furniture Design",
    "Modular Kitchens",
    "Artisan Wardrobe Solutions",
    "Traditional Pooja Rooms",
    "Commercial Fit-Outs",
    "Restoration & Repairs",
  ];

  return (
    <div
  className="min-h-screen w-full relative flex flex-col transition-colors duration-700 ease-in-out"
  style={{
    // FIX: Instead of a hardcoded #F9F7F3, we use the actual theme background
    background: isDark
      ? `radial-gradient(1200px 600px at 50% 42%, rgba(193,163,93,0.04), transparent 8%), linear-gradient(180deg, ${currentTheme.bg} 0%, ${V.nearBlack} 100%)`
      : currentTheme.bg, // This allows Sky, Sand, and Ice to show their unique colors
    color: isDark ? V.offGold : "#1A1A1A",
  }}
>
      <React.Suspense fallback={null}>
        {isDark && <LuxuryGlints />}
        {isDesktop && <InteractiveBackground />}
      </React.Suspense>
      <CustomScrollIndicator />

      <FloatingAnalysisButton />
      <FloatingSocialButton />

{/* Navigation Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b transition-all duration-500"
        style={{
          backgroundColor: isDark 
            ? "rgba(0,0,0,0.3)" 
            : `${currentTheme.bg}CC`, 
          borderColor: isDark 
            ? "rgba(255,255,255,0.08)" 
            : "rgba(0,0,0,0.1)",
        }}
      >
        <Link to="/" className="flex items-center gap-3 group" style={{ color: V.gold }}>
          <img
            src="/logo512.png"
            alt="Logo"
            className="h-12 md:h-14 lg:h-16 w-auto rounded-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden md:flex flex-col">
            <span 
              className="text-2xl font-light tracking-widest uppercase leading-none transition-colors duration-500"
              style={{ color: isDark ? V.gold : "#1A1A1A" }} // FIXED: Brand name color
            >
              VΛHINI D'INTERIO
            </span>
            <span 
              className="text-[0.65rem] tracking-[0.3em] uppercase mt-1 font-medium opacity-80"
              style={{ color: isDark ? V.offGold : "#444" }} // FIXED: Subtitle color
            >
              Built for Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center md:gap-4 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm tracking-widest uppercase transition-all duration-300 relative group"
                style={{
                  // FIXED: Logic forced to dark charcoal on light backgrounds
                  color: isActive ? V.gold : (isDark ? V.offGold : "#1A1A1A"),
                  fontWeight: isActive ? "600" : "500",
                }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 ${isActive ? "w-full" : "w-0"}`}
                  style={{ backgroundColor: V.gold }}
                />
              </Link>
            );
          })}

          {/* Theme Toggle Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsThemeOpen(!isThemeOpen);
              }}
              className="px-3 py-1.5 text-[10px] border rounded-full tracking-widest transition-all duration-300 flex items-center gap-2"
              style={{ 
                borderColor: V.gold, 
                color: isDark ? V.gold : "#1A1A1A", // FIXED: Button text color
                backgroundColor: isDark ? "transparent" : "rgba(0,0,0,0.03)" 
              }}
            >
              <span style={{ color: V.gold }}>{themeIcons[theme] || currentTheme.icon}</span>
              {currentTheme.name}
            </button>

            <AnimatePresence>
              {isThemeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden z-50 border shadow-2xl"
                  style={{
                    background: isDark ? "#121212" : "#FFFFFF",
                    borderColor: "rgba(193,163,93,0.3)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {Object.entries(themes).map(([key, val]) => (
                    <div
                      key={key}
                      onClick={(e) => {
                        changeTheme(key, e);
                        setIsThemeOpen(false);
                      }}
                      className={`px-4 py-2.5 text-xs cursor-pointer transition-all duration-200 flex items-center justify-between ${
                        theme === key ? "bg-[#C1A35D]/20" : "hover:bg-[#C1A35D]/10"
                      }`}
                      style={{ color: isDark ? "#FFF" : "#1A1A1A" }} // FIXED: Dropdown item color
                    >
                      <div className="flex items-center gap-3">
                        <span style={{ color: V.gold }}>{themeIcons[key] || val.icon}</span>
                        <span>{val.name}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile View Buttons */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={(e) => {
              const keys = Object.keys(themes);
              const currentIndex = keys.indexOf(theme);
              const nextTheme = keys[(currentIndex + 1) % keys.length];
              changeTheme(nextTheme, e);
            }}
            className="p-2.5 rounded-full border flex items-center justify-center transition-all"
            style={{ color: V.gold, borderColor: V.gold }}
          >
            <span>{themeIcons[theme] || currentTheme.icon}</span>
          </button>

          <button
            className="p-2 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: isDark ? V.offGold : "#1A1A1A" }} // FIXED: Burger menu icon color
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-40 pt-32 px-8 md:hidden flex flex-col"
            style={{ backgroundColor: isDark ? "rgba(10,10,10,0.98)" : currentTheme.bg }}
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl tracking-widest uppercase font-light"
                  style={{ 
                    // FIXED: Mobile link colors
                    color: location.pathname === link.path ? V.gold : (isDark ? V.offGold : "#1A1A1A") 
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20 relative z-10">
        <Outlet />
      </main>

      <LocalSeoLinks />

      {/* Footer */}
      <footer
        className="relative z-10 border-t pt-16 pb-8 transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "rgba(0,0,0,0.8)" : "#F9F7F3",
          borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          color: isDark ? V.offGold : "#1A1A1A",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group" style={{ color: V.gold }}>
              <img src="/logo192.png" alt="Vahini Logo" width="40" height="40" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-xl font-light tracking-widest uppercase leading-none">VΛHINI D'INTERIO</span>
                <span className="text-[0.55rem] tracking-[0.3em] uppercase opacity-80 mt-1 font-medium">Built for Living</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed opacity-80">
              Blending heritage Vishwabrahmin craftsmanship with modern design to create timeless spaces in Narasaraopet and Palnadu.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Facebook size={20} />, href: "https://www.facebook.com/profile.php?id=61583376973962" },
                { icon: <Instagram size={20} />, href: "https://www.instagram.com/vahinidinterio/" },
                { icon: <Youtube size={20} />, href: "https://www.youtube.com/@VahiniDInterio" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/vahinidinterio" },
                { icon: <Globe size={20} />, href: "https://in.pinterest.com/vahinidinterio/" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border transition-all duration-300 hover:scale-110"
                  style={{ borderColor: V.gold, color: V.gold }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: V.gold }}>Important Links</h4>
            <ul className="space-y-3 text-sm">
              {expandedNavLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-[#C1A35D] transition-colors flex items-center gap-2 group opacity-80 hover:opacity-100">
                    <span className="w-1 h-1 rounded-full bg-[#C1A35D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: V.gold }}>Specializations</h4>
            <ul className="space-y-3 text-sm">
              {servicesLinks.map((service, index) => (
                <li key={index}>
                  <Link to="/services" className="hover:text-[#C1A35D] transition-colors flex items-center gap-2 group opacity-80 hover:opacity-100">
                    <span className="w-1 h-1 rounded-full bg-[#C1A35D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: V.gold }}>Connect With Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: V.gold }} />
                <span>Narasaraopet, Palnadu District,<br />Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} style={{ color: V.gold }} />
                <span>+91 7416385148</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} style={{ color: V.gold }} />
                <span>contact@vahinidinterio.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider opacity-60">
            <p>© 2026 Vahini D'Interio. All Rights Reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-[#C1A35D]">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-[#C1A35D]">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;