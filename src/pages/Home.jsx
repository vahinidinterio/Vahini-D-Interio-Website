import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, Hammer, Ruler, Wrench, Mail, Phone, MapPin, Star, Quote, ChevronLeft, ChevronRight, Instagram, Linkedin } from "lucide-react";
import { V } from "../utils/colors";
import DesignAnalysisModal from "../components/DesignAnalysisModal";
import VahiniAIButton from "../components/VahiniAIButton";
import FreeConsultationModal from "../components/FreeConsultationModal";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";

// Swiper for Testimonials
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { galleryData } from "../data/galleryData";

const Home = () => {
    const [showAnalysisModal, setShowAnalysisModal] = useState(false);
    const containerRef = useRef(null);
    const { isDark } = useTheme();

    // Performance Optimization: Use MotionValues instead of State for mouse movement
    // This prevents re-rendering the entire component on every mouse move
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    // Transform values for parallax effects
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]); // Tilt effect
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const moveX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]); // Background movement
    const moveY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

    const contentMoveX = useTransform(mouseXSpring, [-0.5, 0.5], ["-30px", "30px"]); // Content movement (opposite direction)
    const contentMoveY = useTransform(mouseYSpring, [-0.5, 0.5], ["-30px", "30px"]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const width = rect.width;
            const height = rect.height;

            // Calculate normalized mouse position (-0.5 to 0.5)
            const x = (e.clientX - rect.left) / width - 0.5;
            const y = (e.clientY - rect.top) / height - 0.5;

            mouseX.set(x);
            mouseY.set(y);
        };

        if (!("ontouchstart" in window)) {
            window.addEventListener("mousemove", handleMouseMove);
        }
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // --- Data for Sections ---

    // Select a subset of images for the Home page gallery (e.g., first 14 or specific IDs)
    const galleryImages = galleryData.slice(0, 10).map(img => ({
        ...img,
        category: img.category || 'Interior' // Ensure category exists if not in data
    }));

    const testimonials = [
        {
            author_name: "Suresh Reddy",
            rating: 5,
            text: "Vahini D'Interio transformed our home in Narasaraopet. The woodwork is exquisite and the attention to detail is unmatched. Highly recommended!",
            profile_photo_url: "https://images.unsplash.com/photo-1542178243-bc20204b769f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&q=80&w=400",
            relative_time_description: "2 weeks ago"
        },
        {
            author_name: "Lakshmi Priya",
            rating: 5,
            text: "The best interior designers in Palnadu. They understood our requirements perfectly and delivered a modern yet traditional look.",
            profile_photo_url: "https://ui-avatars.com/api/?name=Lakshmi+Priya&background=0D0D0D&color=C1A35D",
            relative_time_description: "1 month ago"
        },
        {
            author_name: "Kavya Sree",
            rating: 5,
            text: "Exceptional modular kitchen design! The team was professional and finished the work in our Chilakaluripet apartment ahead of schedule.",
            profile_photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&q=80&w=400",
            relative_time_description: "3 days ago"
        },
        {
            author_name: "Bhargav Teja",
            rating: 5,
            text: "The custom furniture work for my new business office in Palnadu was superb. Highly skilled carpenters and prompt service.",
            profile_photo_url: "https://ui-avatars.com/api/?name=Bhargav+Teja&background=0D0D0D&color=C1A35D",
            relative_time_description: "1 week ago"
        },
        {
            author_name: "Swathi Kiran",
            rating: 5,
            text: "Absolutely love the bedroom interiors! The aesthetic is exactly what I wanted. Best service provider near Narasaraopet.",
            profile_photo_url: "https://images.unsplash.com/photo-1554151228-14d2faae6d8d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&q=80&w=400",
            relative_time_description: "1 month ago"
        },
    ];

    const services = [
        {
            icon: <Hammer className="w-8 h-8" />,
            title: "Custom Furniture & Joinery",
            description: "Specializing in custom-built furniture, modular kitchen interiors, elegant window/door frames, and intricate ceiling solutions. We are the trusted source for custom cupboard works near me in the area.",
        },
        {
            icon: <Ruler className="w-8 h-8" />,
            title: "Interior Design & Fit-Out",
            description: "Full-scope interior design services, managing everything from aluminum and wooden mesh doors to wall paneling and lighting design. We handle all kinds of interior works near me.",
        },
        {
            icon: <Wrench className="w-8 h-8" />,
            title: "Repairs & Restoration",
            description: "Expert carpentry and furniture repairs. We offer reliable carpenter repairs in Narasaraopet to restore the beauty and function of your valuable wood pieces.",
        },
    ];

    // --- Expert SEO Schema ---
    const homeSchema = {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": "Vahini D'Interio",
        "image": "https://www.vahinidinterio.com/logo512.jpg",
        "@id": "https://www.vahinidinterio.com/#organization",
        "url": "https://www.vahinidinterio.com",
        "telephone": "+917416385148",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Reddy Nagar",
            "addressLocality": "Narasaraopet",
            "addressRegion": "Andhra Pradesh",
            "postalCode": "522601",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 16.2360,
            "longitude": 80.0546
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.instagram.com/chari.ch.10/",
            "https://www.linkedin.com/in/prasad-kancheti-776b54241/"
        ],
        "priceRange": "$$-$$$",
        "areaServed": [
            {
                "@type": "City",
                "name": "Narasaraopet"
            },
            {
                "@type": "City",
                "name": "Guntur"
            },
            {
                "@type": "City",
                "name": "Palnadu"
            },
            {
                "@type": "City",
                "name": "Vijayawada"
            }
        ],
        "knowsAbout": ["Interior Design", "Custom Furniture", "Woodwork", "Modular Kitchens", "Carpentry"],
        "founder": [
            {
                "@type": "Person",
                "name": "Chennupalli Koteswara Chari"
            },
            {
                "@type": "Person",
                "name": "Kancheti Prasad"
            }
        ]
    };

    return (
        <div ref={containerRef} className="relative overflow-hidden">
            <SEO
                title="Luxury Interiors & Custom Furniture in Narasaraopet"
                description="Vahini D'Interio brings the precision of Vishwabrahmin wood artistry to Narasaraopet and Palnadu. We specialize in custom furniture, bespoke interiors, and luxury design."
                keywords="Interior Design, Custom Furniture, Narasaraopet, Palnadu, Vishwabrahmin, Woodwork, Luxury Interiors, Modular Kitchens, Best Interior Designers Guntur"
                canonicalUrl="https://www.vahinidinterio.com/"
                schema={homeSchema}
            />

            {/* Subtle rotating ring (Background Element) */}
            <motion.div
                aria-hidden
                style={{
                    position: "fixed",
                    width: "95vmin",
                    height: "95vmin",
                    borderRadius: "50%",
                    left: "50%",
                    top: "50%",
                    x: moveX,
                    y: moveY,
                    translateX: "-50%",
                    translateY: "-50%",
                    border: `1px solid rgba(193,163,93,0.10)`,
                    zIndex: 0,
                    boxShadow: `inset 0 0 120px rgba(193,163,93,0.03), 0 0 160px rgba(193,163,93,0.02)`,
                    pointerEvents: "none"
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 300, ease: "linear", repeat: Infinity }}
            />

            {/* HERO SECTION */}
            <section className="min-h-[90vh] flex items-center justify-center relative z-10 px-4">
                <motion.div
                    className="max-w-xl md:max-w-3xl text-center flex flex-col items-center justify-center gap-4"
                    style={{
                        x: contentMoveX,
                        y: contentMoveY,
                        rotateX: rotateX,
                        rotateY: rotateY,
                        perspective: 1000
                    }}
                >
                    {/* Brand Title */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-full flex flex-col items-center text-center"
                    >
                        <div className="relative inline-block mb-2 text-center">
                            <h1
                                className="leading-none uppercase"
                                style={{
                                    fontSize: "clamp(32px, 6vw, 72px)",
                                    fontWeight: 200,
                                    letterSpacing: "0.12em",
                                    background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.65))",
                                    textShadow: `0 4px 22px rgba(193,163,93,0.06)`,
                                }}
                            >
                                VΛHINI
                            </h1>
                            <motion.span
                                aria-hidden
                                className="absolute left-[-6%] top-0 w-[120%] h-full pointer-events-none mix-blend-screen"
                                style={{
                                    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0) 100%)",
                                }}
                            />
                        </div>

                        {/* Underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "clamp(120px, 20vw, 160px)" }}
                            transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
                            style={{
                                height: 2,
                                borderRadius: 2,
                                background: `linear-gradient(90deg, transparent, ${V.red}, transparent)`,
                                marginBottom: "8px",
                            }}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1.2 }}
                        >
                            <h2
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    letterSpacing: ".28em",
                                    fontWeight: 400,
                                    color: V.gold,
                                    fontSize: "clamp(11px, 1.2vw, 14px)",
                                    textTransform: "uppercase",
                                    opacity: 0.9
                                }}
                            >
                                D'INTERIO
                            </h2>
                            <p
                                className="mt-2"
                                style={{
                                    fontSize: "clamp(9px, 1vw, 11px)",
                                    letterSpacing: "0.4em",
                                    textTransform: "uppercase",
                                    color: V.offGold,
                                    opacity: 0.7
                                }}
                            >
                                Built for Living
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 1 }}
                        className="text-2xl md:text-4xl font-light mt-6 mb-4"
                        style={{ color: isDark ? "#fff" : V.nearBlack, fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        The Heritage of Woodworking. <br /> The Future of Design.
                    </motion.h3>

                    {/* Body Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ delay: 1.8, duration: 1 }}
                        className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
                        style={{ color: isDark ? V.offGold : V.nearBlack }}
                    >
                        For generations, the art of fine carpentry has been our legacy. Vahini D'Interio brings the precision of Vishwabrahmin wood artistry to the modern spaces of Narasaraopet and the Palnadu region. We specialize in custom, bespoke furniture and comprehensive interior solutions, blending traditional mastery with contemporary aesthetics.
                    </motion.p>

                    {/* Analysis Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2, duration: 0.8 }}
                        className="text-center flex justify-center mt-8"
                    >
                        <Link
                            to="/analysis"
                            className="relative flex items-center justify-center px-7 md:px-9 py-7 md:py-4 rounded-full font-semibold transition-all duration-300 group"
                            style={{
                                background: "linear-gradient(135deg, rgba(193,163,93,0.18), rgba(193,163,93,0.08))",
                                border: `1.5px solid ${V.gold}`,
                                color: V.offGold,
                                letterSpacing: "0.08em",
                                boxShadow: "0 0 20px rgba(193,163,93,0.15)",
                                backdropFilter: "blur(8px)",
                                WebkitBackdropFilter: "blur(8px)",
                                padding: 'clamp(14px, 2vw, 18px)',
                                borderRadius: 'clamp(14px, 2vw, 18px)',
                            }}
                        >
                            <Camera
                                className="w-5 h-5 md:w-6 md:h-6 text-[#c1a35d] group-hover:scale-110 transition-transform"
                                style={{
                                    filter: "drop-shadow(0 0 4px rgba(193,163,93,0.6))",
                                    flexShrink: 0,
                                    marginRight: "8px"
                                }}
                            />
                            <span className="whitespace-nowrap tracking-wide text-[clamp(13px,1.2vw,15px)]">
                                Get Instant Design Analysis
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </section >

            {/* SERVICES SECTION */}
            < section id="services" className={`py-20 px-4 md:px-8 lg:px-16 relative z-10 ${isDark ? 'bg-black/20' : 'bg-[#C1A35D]/5'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        Bespoke Craftsmanship: Services Designed for Narasaraopet
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            className={`p-8 rounded-xl border transition-colors duration-300 ${isDark ? 'border-white/5 hover:border-[#C1A35D]/30' : 'border-black/5 hover:border-[#C1A35D]/30'}`}
                            style={{
                                background: isDark ? "rgba(26, 26, 26, 0.4)" : "rgba(255, 255, 255, 0.6)",
                                backdropFilter: "blur(10px)"
                            }}
                        >
                            <div className="mb-6 text-[#C1A35D]">{service.icon}</div>
                            <h3 className="text-xl font-semibold mb-4" style={{ color: isDark ? V.offGold : V.nearBlack }}>{service.title}</h3>
                            <p className="text-sm leading-relaxed opacity-80" style={{ color: isDark ? V.offGold : V.nearBlack }}>{service.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/services" className="inline-block px-8 py-3 border border-[#C1A35D] text-[#C1A35D] uppercase tracking-widest text-xs hover:bg-[#C1A35D] hover:text-black transition-colors duration-300">
                        View All Services
                    </Link>
                </div>
            </section >

            {/* AI-POWERED DESIGN VISUALIZATION SECTION */}
            < section id="ai-visualization" className="py-24 px-4 md:px-8 lg:px-16 relative z-10" >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        AI-Powered Design Visualization
                    </h2>
                    <p className="max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-4" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        Experience the future of interior design with our cutting-edge AI technology. Upload an image of your space—whether under construction or already finished—and receive professional analysis, design recommendations, and a detailed visualization prompt featuring our signature Nano Banana elements.
                    </p>
                    <p className="max-w-2xl mx-auto text-xs opacity-70" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        Limited to 5 free analyses per day. Get instant insights powered by advanced AI.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <VahiniAIButton />
                </div>
            </section >

            {/* GALLERY SECTION (Curved Brick Wall Layout) */}
            < section id="portfolio" className="py-24 px-4 md:px-8 lg:px-16 relative z-10 overflow-hidden" >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        The Vahini D'Interio Gallery
                    </h2>
                    <p className="max-w-3xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        Explore a curated selection of our finest works. From custom wardrobes to intricate joinery, witness the quality we bring to Palnadu.
                    </p>
                </motion.div>

                {/* Masonry / Curved Brick Wall Layout */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6 px-2 md:px-12">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.8, type: "spring", bounce: 0.3 }}
                            className={`break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer shadow-lg border border-[#C1A35D]/20 ${index % 2 === 0 ? 'mt-0' : 'mt-4 md:mt-12'}`} // Stagger effect
                            style={{
                                transform: `translateY(${index % 3 === 0 ? '0px' : index % 3 === 1 ? '10px' : '-10px'})`, // Random-ish vertical offset
                            }}
                        >
                            <div className="relative w-full overflow-hidden">
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Watermark */}
                                <div className="absolute top-4 left-4 opacity-80 pointer-events-none z-10">
                                    <img src="/social-share-image.jpg" alt="Vahini" className="w-8 h-8 rounded-full drop-shadow-md border border-white/20" />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-[#C1A35D] text-[10px] tracking-[0.2em] uppercase mb-2 font-bold">{img.category}</p>
                                    <h3 className="text-white font-light text-xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{img.name}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <Link to="/gallery" className="inline-block px-10 py-4 border border-[#C1A35D] text-[#C1A35D] uppercase tracking-widest text-xs hover:bg-[#C1A35D] hover:text-black transition-all duration-500 hover:shadow-[0_0_30px_rgba(193,163,93,0.4)]">
                        View Full Gallery
                    </Link>
                </div>
            </section >

            {/* TESTIMONIALS SECTION (New) */}
            < section className={`py-24 px-4 relative z-10 ${isDark ? 'bg-black/20' : 'bg-[#C1A35D]/5'}`}>
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                            Trusted by Families in Palnadu
                        </h2>
                        <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                            Our reputation is built on the satisfaction of our clients. Here is what they have to say about their Vahini experience.
                        </p>
                    </motion.div>

                    <Swiper
                        modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation={{
                            prevEl: '.home-swiper-prev',
                            nextEl: '.home-swiper-next',
                        }}
                        className="w-full py-12"
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {testimonials.map((review, index) => (
                            <SwiperSlide key={index} className="max-w-md">
                                <div
                                    className="h-full p-8 rounded-2xl flex flex-col relative transition duration-500 mx-4 my-4"
                                    style={{
                                        background: isDark ? "rgba(26, 26, 26, 0.6)" : "rgba(255, 255, 255, 0.8)",
                                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                                        backdropFilter: "blur(10px)",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                                    }}
                                >
                                    <Quote className="absolute top-6 right-6 w-8 h-8 opacity-20" style={{ color: V.gold }} />

                                    <div className="flex items-center gap-4 mb-6">
                                        <img
                                            src={review.profile_photo_url}
                                            alt={review.author_name}
                                            className="w-12 h-12 rounded-full border border-[#C1A35D]/30 object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold" style={{ color: V.gold }}>{review.author_name}</h3>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        fill={i < review.rating ? "#C1A35D" : "none"}
                                                        color={i < review.rating ? "#C1A35D" : V.offGold}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm leading-relaxed italic opacity-90 flex-grow" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                        "{review.text}"
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}

                        {/* Navigation Buttons */}
                        <div className="home-swiper-prev absolute top-1/2 left-0 md:left-4 transform -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full bg-black/10 hover:bg-black/20 text-[#C1A35D] transition-all hidden md:block">
                            <ChevronLeft size={32} />
                        </div>
                        <div className="home-swiper-next absolute top-1/2 right-0 md:right-4 transform -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full bg-black/10 hover:bg-black/20 text-[#C1A35D] transition-all hidden md:block">
                            <ChevronRight size={32} />
                        </div>
                    </Swiper>

                    <div className="text-center mt-12">
                        <Link to="/testimonials" className="inline-block px-8 py-3 border border-[#C1A35D] text-[#C1A35D] uppercase tracking-widest text-xs hover:bg-[#C1A35D] hover:text-black transition-colors duration-300">
                            Read All Reviews
                        </Link>
                    </div>
                </div>
            </section >

            {/* ABOUT SECTION */}
            < section id="about" className="py-20 px-4 md:px-8 lg:px-16 relative z-10" >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                            A Partnership of Heritage and Modernity
                        </h2>
                        <p className="text-lg leading-relaxed mb-12" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                            Vahini D'Interio is a partnership rooted in generations of craftsmanship and powered by modern expertise.
                        </p>
                    </motion.div>

                    <div className="space-y-16 mb-12">
                        {/* Founder 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-row-reverse md:flex-row gap-4 md:gap-8 items-start md:items-center"
                        >
                            <div className="flex-1 text-left">
                                <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4" style={{ color: V.gold }}>Chennupalli Koteswara Chari</h3>
                                <p className="text-sm md:text-base leading-relaxed opacity-80 mb-4 md:mb-6" style={{ color: isDark ? V.offGold : "#1a1a1a" }}>
                                    As a Vishwabrahmin carpenter, Koteswara Chari continues a lineage of master woodworkers. He has led the firm for the past five years, upholding the standards set by his late father—a legacy built on decades of unparalleled carpentry skill in Narasaraopet.
                                </p>
                                <a href="https://www.instagram.com/chari.ch.10/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs md:text-sm font-medium hover:text-[#C1A35D] transition-colors" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                    <Instagram className="w-4 h-4 md:w-[18px] md:h-[18px]" /> Follow on Instagram
                                </a>
                            </div>
                            <div className="w-24 h-24 md:w-64 md:h-64 rounded-full border-2 p-1 relative flex-shrink-0" style={{ borderColor: V.gold }}>
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <img
                                        src="/images/founders/chennupalli_koteswara_chari1.jpg"
                                        alt="Chennupalli Koteswara Chari"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Founder 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-row-reverse md:flex-row-reverse gap-4 md:gap-8 items-start md:items-center"
                        >
                            <div className="flex-1 text-left">
                                <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4" style={{ color: V.gold }}>Kancheti Prasad</h3>
                                <p className="text-sm md:text-base leading-relaxed opacity-80 mb-4 md:mb-6" style={{ color: isDark ? V.offGold : "#1a1a1a" }}>
                                    Bringing a versatile skillset to the partnership, Prasad combines his experience as a frontend developer, former carpenter, and invoice executive. This fusion ensures Vahini D'Interio delivers not only flawless woodwork but also modern, transparent service and digital excellence.
                                </p>
                                <a href="https://www.linkedin.com/in/prasad-kancheti-776b54241/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs md:text-sm font-medium hover:text-[#C1A35D] transition-colors" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                    <Linkedin className="w-4 h-4 md:w-[18px] md:h-[18px]" /> Connect on LinkedIn
                                </a>
                            </div>
                            <div className="w-24 h-24 md:w-64 md:h-64 rounded-full border-2 p-1 relative flex-shrink-0" style={{ borderColor: V.gold }}>
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <img
                                        src="/images/founders/kancheti-prasad.jpg"
                                        alt="Kancheti Prasad"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="text-center">
                        <Link to="/about" className="inline-block px-8 py-3 border border-[#C1A35D] text-[#C1A35D] uppercase tracking-widest text-xs hover:bg-[#C1A35D] hover:text-black transition-colors duration-300">
                            Read Our Story
                        </Link>
                    </div>
                </div>
            </section >

            {/* CONTACT SECTION - REDESIGNED */}
            < section id="contact" className="py-24 px-4 md:px-8 lg:px-16 relative z-10" >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden relative"
                    style={{
                        background: isDark
                            ? "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)"
                            : "linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)",
                        boxShadow: isDark
                            ? "0 20px 50px rgba(0,0,0,0.5)"
                            : "0 20px 50px rgba(193,163,93,0.15)",
                        border: `1px solid ${V.gold}30`
                    }}
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C1A35D] opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C1A35D] opacity-5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                    <div className="relative z-10 p-6 md:p-16 text-center">
                        <h2
                            className="text-3xl md:text-6xl font-light mb-4 md:mb-6"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}
                        >
                            Ready to Transform Your Space?
                        </h2>
                        <p
                            className="text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed opacity-90"
                            style={{ color: isDark ? V.offGold : V.nearBlack }}
                        >
                            From bespoke furniture to full home interiors, we bring your vision to life with the precision of Vishwabrahmin craftsmanship.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16 w-full">
                            <Link
                                to="/contact"
                                className="group relative px-8 py-4 rounded-full font-bold text-black overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(193,163,93,0.4)] w-full md:w-auto"
                                style={{ background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})` }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Mail size={20} />
                                    Get a Free Quote
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Link>

                            <a
                                href="tel:+917416385148"
                                className="px-8 py-4 rounded-full font-bold transition-all hover:bg-[#C1A35D]/10 flex items-center justify-center gap-2 w-full md:w-auto"
                                style={{
                                    border: `1px solid ${V.gold}`,
                                    color: V.gold
                                }}
                            >
                                <Phone size={20} />
                                Call +91 98765 43210
                            </a>
                        </div>

                        {/* Contact Details Row */}
                        <div className="grid grid-cols-3 gap-2 md:gap-8 border-t border-[#C1A35D]/20 pt-6 md:pt-10">
                            <div className="flex flex-col items-center gap-2 md:gap-3">
                                <div className="p-2 md:p-3 rounded-full bg-[#C1A35D]/10 text-[#C1A35D]">
                                    <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xs md:text-base font-semibold mb-0 md:mb-1" style={{ color: V.gold }}>Visit Us</h4>
                                    <p className="hidden md:block text-sm opacity-70" style={{ color: isDark ? "#fff" : "#000" }}>Narasaraopet, Palnadu District</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 md:gap-3">
                                <div className="p-2 md:p-3 rounded-full bg-[#C1A35D]/10 text-[#C1A35D]">
                                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xs md:text-base font-semibold mb-0 md:mb-1" style={{ color: V.gold }}>Email Us</h4>
                                    <p className="hidden md:block text-sm opacity-70" style={{ color: isDark ? "#fff" : "#000" }}>contact@vahinidinterio.com</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 md:gap-3">
                                <div className="p-2 md:p-3 rounded-full bg-[#C1A35D]/10 text-[#C1A35D]">
                                    <Camera className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xs md:text-base font-semibold mb-0 md:mb-1" style={{ color: V.gold }}>AI Tool</h4>
                                    <Link to="/analysis" className="hidden md:block text-sm underline hover:text-[#C1A35D] transition-colors" style={{ color: isDark ? "#fff" : "#000" }}>
                                        Try it for free
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section >

            <DesignAnalysisModal show={showAnalysisModal} onClose={() => setShowAnalysisModal(false)} />
            <FreeConsultationModal />
        </div >
    );
};

export default Home;
