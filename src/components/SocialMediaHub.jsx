import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, Youtube, Linkedin, Globe, Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { V } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

const SocialMediaHub = ({ isOpen, onClose }) => {
    const { isDark } = useTheme();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Parallax Effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Mock Social Data
    const socialPosts = [
        {
            id: 1,
            platform: 'instagram',
            type: 'image',
            content: '/images/portfolio/living-room-1.jpg', // Placeholder
            caption: "Modern minimalist living room design in Narasaraopet. #VahiniInteriors #InteriorDesign",
            likes: '1.2k',
            comments: '45',
            icon: <Instagram size={20} />,
            color: '#E1306C',
            colSpan: 1,
            rowSpan: 2
        },
        {
            id: 2,
            platform: 'youtube',
            type: 'video',
            content: '/images/portfolio/kitchen-1.jpg', // Placeholder thumbnail
            caption: "Full Home Tour: Luxury Villa in Palnadu | Vahini D'Interio",
            likes: '5.4k',
            views: '25k',
            icon: <Youtube size={20} />,
            color: '#FF0000',
            colSpan: 2,
            rowSpan: 2
        },
        {
            id: 3,
            platform: 'facebook',
            type: 'image',
            content: '/images/portfolio/bedroom-1.jpg',
            caption: "Transforming spaces, one room at a time. Check out this master bedroom makeover!",
            likes: '850',
            comments: '120',
            icon: <Facebook size={20} />,
            color: '#1877F2',
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 4,
            platform: 'linkedin',
            type: 'text',
            content: null,
            caption: "We are proud to announce our partnership with top material suppliers to bring you the best quality wood for your furniture. #Business #Growth",
            likes: '450',
            comments: '30',
            icon: <Linkedin size={20} />,
            color: '#0A66C2',
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 5,
            platform: 'pinterest',
            type: 'image',
            content: '/images/portfolio/dining-1.jpg',
            caption: "Dining Room Inspiration Board 2025",
            likes: '2.1k',
            save: '500',
            icon: <Globe size={20} />, // Using Globe for Pinterest generic
            color: '#BD081C',
            colSpan: 1,
            rowSpan: 2
        },
        {
            id: 6,
            platform: 'youtube',
            type: 'shorts',
            content: '/images/portfolio/office-1.jpg',
            caption: "Quick Tip: Lighting makes all the difference! 💡 #Shorts",
            likes: '10k',
            views: '150k',
            icon: <Youtube size={20} />,
            color: '#FF0000',
            colSpan: 1,
            rowSpan: 1
        }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden"
                    style={{
                        background: isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(249, 247, 243, 0.95)',
                        backdropFilter: 'blur(20px)'
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                        style={{ color: V.gold }}
                    >
                        <X size={32} />
                    </button>

                    {/* Animated Geometric Background */}
                    <div className="fixed inset-0 pointer-events-none overflow-hidden">
                        {/* Floating Hexagons */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute opacity-10"
                                style={{
                                    border: `2px solid ${V.gold}`,
                                    width: Math.random() * 200 + 100,
                                    height: Math.random() * 200 + 100,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' // Hexagon
                                }}
                                animate={{
                                    x: mousePosition.x * 50 * (i + 1),
                                    y: mousePosition.y * 50 * (i + 1),
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                                    x: { type: "spring", stiffness: 50, damping: 20 },
                                    y: { type: "spring", stiffness: 50, damping: 20 }
                                }}
                            />
                        ))}

                        {/* Floating Triangles */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={`tri-${i}`}
                                className="absolute opacity-5 bg-[#C1A35D]"
                                style={{
                                    width: Math.random() * 100 + 50,
                                    height: Math.random() * 100 + 50,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' // Triangle
                                }}
                                animate={{
                                    y: [0, -100, 0],
                                    rotate: [0, 180, 360],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 15 + i * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 container mx-auto px-4 py-20">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-6xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                                Connect With Vahini
                            </h2>
                            <p className="text-lg opacity-70 max-w-2xl mx-auto" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                Follow our journey across platforms. Explore our latest designs, behind-the-scenes content, and expert tips.
                            </p>
                        </motion.div>

                        {/* Masonry Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
                            {socialPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.03,
                                        rotateX: 5,
                                        rotateY: 5,
                                        zIndex: 10,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                                    }}
                                    className={`relative rounded-2xl overflow-hidden group cursor-pointer ${post.colSpan === 2 ? 'md:col-span-2' : ''} ${post.rowSpan === 2 ? 'row-span-2' : ''}`}
                                    style={{
                                        background: isDark ? '#1a1a1a' : '#ffffff',
                                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                                    }}
                                >
                                    {/* Card Content */}
                                    {post.type === 'image' || post.type === 'video' || post.type === 'shorts' ? (
                                        <div className="absolute inset-0">
                                            {/* Placeholder Image Gradient since we don't have real images yet */}
                                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white/20">
                                                <span className="text-4xl font-bold opacity-20 uppercase tracking-widest">{post.platform}</span>
                                            </div>
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#0A66C2]/10 to-transparent">
                                            <p className="text-lg font-medium leading-relaxed" style={{ color: isDark ? '#fff' : '#000' }}>
                                                "{post.caption}"
                                            </p>
                                        </div>
                                    )}

                                    {/* Play Button for Video */}
                                    {post.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Play fill="white" className="text-white ml-1" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Platform Icon Badge */}
                                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                                        {post.icon}
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {post.type !== 'text' && (
                                            <p className="text-white text-sm font-medium mb-3 line-clamp-2">{post.caption}</p>
                                        )}
                                        <div className="flex items-center justify-between text-white/80 text-xs">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1"><Heart size={14} /> {post.likes}</span>
                                                <span className="flex items-center gap-1"><MessageCircle size={14} /> {post.comments || post.views}</span>
                                            </div>
                                            <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><Share2 size={14} /> Share</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-16">
                            <motion.a
                                href="https://www.instagram.com/vahinidinterio/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-black transition-all shadow-[0_0_30px_rgba(193,163,93,0.3)] hover:shadow-[0_0_50px_rgba(193,163,93,0.5)]"
                                style={{ background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})` }}
                            >
                                <Instagram size={20} />
                                <span>Follow Us on Instagram</span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SocialMediaHub;
