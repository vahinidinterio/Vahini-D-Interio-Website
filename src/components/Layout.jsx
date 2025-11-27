import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Instagram, Facebook, Youtube, MapPin, Phone, Mail, Globe, Linkedin } from "lucide-react";
import LuxuryGlints from "./LuxuryGlints";
import LocalSeoLinks from "./LocalSeoLinks";
import CustomScrollIndicator from "./CustomScrollIndicator";
import InteractiveBackground from "./InteractiveBackground";
import FloatingAnalysisButton from "./FloatingAnalysisButton";
import FloatingSocialButton from "./FloatingSocialButton";
import { V } from "../utils/colors";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();

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
        'Custom Furniture Design',
        'Modular Kitchens',
        'Artisan Wardrobe Solutions',
        'Traditional Pooja Rooms',
        'Commercial Fit-Outs',
        'Restoration & Repairs'
    ];

    return (
        <div
            className="min-h-screen w-full relative flex flex-col transition-colors duration-500"
            style={{
                background: isDark
                    ? `radial-gradient(1200px 600px at 50% 42%, rgba(193,163,93,0.04), transparent 8%), linear-gradient(180deg, ${V.bg} 0%, ${V.nearBlack} 100%)`
                    : "#F9F7F3",
                color: V.offGold,
            }}
        >
            {/* Global Background Effects */}
            {isDark && <LuxuryGlints />}
            <InteractiveBackground />
            <CustomScrollIndicator />

            {/* Floating Buttons */}
            <FloatingAnalysisButton />
            <FloatingSocialButton />

            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b transition-colors duration-500"
                style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)',
                    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                }}>
                <Link to="/" className="flex items-center gap-3 group" style={{ color: V.gold }}>
                    <img src="/logo512.png" alt="Vahini Logo" className="h-12 md:h-14 lg:h-16 w-auto rounded-full transition-transform duration-300 group-hover:scale-105" />
                    <div className="hidden md:flex flex-col">
                        <span className="text-2xl font-light tracking-widest uppercase leading-none">VΛHINI D'INTERIO</span>
                        <span className="text-[0.65rem] tracking-[0.3em] uppercase opacity-80 mt-1 font-medium">Built for Living</span>
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
                                className="text-sm tracking-widest uppercase transition-colors duration-300 relative group"
                                style={{
                                    color: isActive ? V.gold : V.offGold,
                                    fontWeight: 500,
                                    letterSpacing: "0.15em"
                                }}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : "w-0"}`}
                                    style={{ backgroundColor: V.gold }}
                                />
                            </Link>
                        );
                    })}

                    {/* Theme Toggle */}
                    <button
                        onClick={(e) => toggleTheme(e)}
                        className="p-2 rounded-full transition-all duration-300 hover:bg-white/10"
                        style={{ color: V.gold }}
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={(e) => toggleTheme(e)}
                        className="p-2 rounded-full transition-all duration-300"
                        style={{ color: V.gold }}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        className="text-current hover:opacity-80"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{ color: V.offGold }}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={{
                            hidden: { y: "-100%", opacity: 0 },
                            visible: {
                                y: "0%",
                                opacity: 1,
                                transition: {
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            },
                            exit: {
                                y: "-100%",
                                opacity: 0,
                                transition: { duration: 0.3, ease: "easeInOut" }
                            }
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-40 pt-32 px-8 md:hidden"
                        style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(249, 245, 240, 0.98)' }}
                    >
                        <div className="flex flex-col gap-8 items-start">
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.path}
                                    variants={{
                                        hidden: { x: -30, opacity: 0 },
                                        visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
                                    }}
                                    className="w-full"
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-2xl tracking-widest uppercase block w-full hover:opacity-70 transition-opacity"
                                        style={{
                                            color: location.pathname === link.path ? V.gold : V.offGold,
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-grow pt-20 relative z-10">
                <Outlet />
            </main>

            {/* Local SEO Links */}
            <LocalSeoLinks />

            {/* Enhanced Footer */}
            <footer className="relative z-10 border-t transition-colors duration-500 pt-16 pb-8"
                style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : '#F9F7F3',
                    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? V.offGold : V.nearBlack
                }}>
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group" style={{ color: V.gold }}>
                            <img src="/logo192.png" alt="Vahini Logo" className="h-10 w-auto" />
                            <div className="flex flex-col">
                                <span className="text-xl font-light tracking-widest uppercase leading-none">VΛHINI D'INTERIO</span>
                                <span className="text-[0.55rem] tracking-[0.3em] uppercase opacity-80 mt-1 font-medium">Built for Living</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed opacity-80">
                            Blending the heritage of Vishwabrahmin craftsmanship with modern interior design to create timeless spaces in Narasaraopet and Palnadu.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: <Facebook size={20} />, href: "https://www.facebook.com/profile.php?id=61583376973962" },
                                { icon: <Instagram size={20} />, href: "https://www.instagram.com/vahinidinterio/" },
                                { icon: <Youtube size={20} />, href: "https://www.youtube.com/@VahiniDInterio" },
                                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/vahinidinterio" },
                                { icon: <Globe size={20} />, href: "https://in.pinterest.com/vahinidinterio/" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full border transition-all duration-300 hover:scale-110"
                                    style={{
                                        borderColor: V.gold,
                                        color: V.gold,
                                        backgroundColor: isDark ? 'rgba(193, 163, 93, 0.1)' : 'transparent'
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links (Updated with longer names) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6" style={{ color: V.gold }}>Important Links</h4>
                        <ul className="space-y-3 text-sm">
                            {expandedNavLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="hover:text-[#C1A35D] transition-colors duration-200 flex items-center gap-2 group opacity-80 hover:opacity-100"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-[#C1A35D] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services (Updated to be links with cursor-pointer) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6" style={{ color: V.gold }}>Our Service Specializations</h4>
                        <ul className="space-y-3 text-sm">
                            {servicesLinks.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        to="/services" // Navigates to the services page
                                        className="hover:text-[#C1A35D] transition-colors duration-200 flex items-center gap-2 group cursor-pointer opacity-80 hover:opacity-100"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-[#C1A35D] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6" style={{ color: V.gold }}>Connect With Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: V.gold }} />
                                <span>Narasaraopet, Palnadu District,<br />Andhra Pradesh, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="flex-shrink-0" style={{ color: V.gold }} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="flex-shrink-0" style={{ color: V.gold }} />
                                <span>contact@vahinidinterio.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="max-w-7xl mx-auto px-6 pt-8 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider opacity-60">
                        <p>© 2025 Vahini D'Interio. All Rights Reserved.</p>
                        <div className="flex gap-6">
                            <Link to="/privacy-policy" className="hover:text-[#C1A35D] transition-colors">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="hover:text-[#C1A35D] transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
