import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, DoorOpen, Armchair, ArrowRight, MessageCircle, Eye, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { V } from '../utils/colors';
import SEO from '../components/SEO';

// Data for the three main service categories with Images
const coreServices = [
    {
        id: 'kitchens',
        title: 'Bespoke Modular Kitchens',
        subtitle: 'Engineered for Longevity & Function',
        description: "Our kitchens combine complex, traditional joinery with modern ergonomics. We don't build temporary structures; we craft durable, efficient culinary spaces guaranteed to perform flawlessly for decades, using hand-selected, premium materials.",
        imageText: "KITCHEN ARCHITECTURE",
        imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
        Icon: Utensils,
        priceRange: "$$$$"
    },
    {
        id: 'wardrobes',
        title: 'Artisan Wardrobes & Storage',
        subtitle: 'Integrated, Elegant Space Management',
        description: "From seamless floor-to-ceiling sliding units to luxurious walk-in closets, our storage solutions maximize every centimeter. Every compartment is reinforced, ensuring smooth operation and structural integrity for heavy, long-term use.",
        imageText: "STORAGE MASTERY",
        imageUrl: "https://images.unsplash.com/photo-1558603668-6570496b66f8?q=80&w=2000&auto=format&fit=crop",
        Icon: DoorOpen,
        priceRange: "$$$"
    },
    {
        id: 'furniture',
        title: 'Heirloom Custom Furniture',
        subtitle: 'Structural Purity & Timeless Design',
        description: "We craft standalone pieces—beds, display units, tables, and paneling—where the aesthetic beauty of the wood is matched by the invisible strength of the joinery. These are investment pieces, designed to become the artifacts of your home's future.",
        imageText: "FURNITURE LEGACY",
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        Icon: Armchair,
        priceRange: "$$$"
    }
];

// Data for the Pillars of Mastery
const masteryPillars = [
    { title: 'Ravipadu Craftsmanship', detail: 'Lineage-trained artisans ensure unrivaled hand-finishing.' },
    { title: 'Tenon-and-Mortise Integrity', detail: 'Traditional joinery guarantees structural strength and longevity.' },
    { title: 'Master Material Selection', detail: 'Personal sourcing of materials for decade-defining durability.' },
    { title: 'Full Transparency', detail: 'Itemized quotations with no hidden costs—only honest value.' },
    { title: 'Decade-Defining Quality', detail: 'A commitment that extends far beyond the final coat of polish.' },
];

const Services = () => {
    const [activeServiceId, setActiveServiceId] = useState(coreServices[0].id);
    const activeService = coreServices.find(s => s.id === activeServiceId);
    const { isDark } = useTheme();

    // Expert SEO Configuration
    const pageTitle = "Services | Vahini D'Interio - Bespoke Woodwork, Modular Kitchens & Custom Furniture";
    const pageDescription = "Premium interior design services in Narasaraopet: Bespoke Modular Kitchens, Artisan Wardrobes & Storage, and Heirloom Custom Furniture. Expert Vishwabrahmin craftsmanship with traditional joinery and modern design excellence.";
    const pageUrl = "https://www.vahinidinterio.com/services";
    const socialImage = "https://www.vahinidinterio.com/social-share-image.jpg";
    const pageKeywords = "modular kitchen Narasaraopet, custom wardrobes Palnadu, bespoke furniture, interior carpentry services, traditional joinery, premium woodwork, custom furniture design, storage solutions, kitchen design services";

    // Comprehensive Services Schema
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": "https://www.vahinidinterio.com/services#modular-kitchens",
                "name": "Bespoke Modular Kitchens",
                "description": "Custom-designed modular kitchens engineered for longevity and function using traditional joinery and premium materials.",
                "provider": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "areaServed": [
                    {
                        "@type": "City",
                        "name": "Narasaraopet"
                    },
                    {
                        "@type": "AdministrativeArea",
                        "name": "Palnadu"
                    }
                ],
                "serviceType": "Interior Design",
                "category": "Kitchen Design and Installation",
                "offers": {
                    "@type": "Offer",
                    "priceRange": "$$$$",
                    "availability": "https://schema.org/InStock"
                }
            },
            {
                "@type": "Service",
                "@id": "https://www.vahinidinterio.com/services#wardrobes-storage",
                "name": "Artisan Wardrobes & Storage Solutions",
                "description": "Custom wardrobes and storage solutions from floor-to-ceiling sliding units to luxurious walk-in closets with reinforced compartments.",
                "provider": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "areaServed": [
                    {
                        "@type": "City",
                        "name": "Narasaraopet"
                    },
                    {
                        "@type": "AdministrativeArea",
                        "name": "Palnadu"
                    }
                ],
                "serviceType": "Interior Design",
                "category": "Custom Storage Solutions",
                "offers": {
                    "@type": "Offer",
                    "priceRange": "$$$",
                    "availability": "https://schema.org/InStock"
                }
            },
            {
                "@type": "Service",
                "@id": "https://www.vahinidinterio.com/services#custom-furniture",
                "name": "Heirloom Custom Furniture",
                "description": "Investment-grade custom furniture pieces including beds, display units, tables, and paneling crafted with structural purity and timeless design.",
                "provider": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "areaServed": [
                    {
                        "@type": "City",
                        "name": "Narasaraopet"
                    },
                    {
                        "@type": "AdministrativeArea",
                        "name": "Palnadu"
                    }
                ],
                "serviceType": "Custom Furniture Manufacturing",
                "category": "Bespoke Furniture Design",
                "offers": {
                    "@type": "Offer",
                    "priceRange": "$$$",
                    "availability": "https://schema.org/InStock"
                }
            },
            {
                "@type": "ItemList",
                "@id": "https://www.vahinidinterio.com/services#service-list",
                "name": "Vahini D'Interio Service Offerings",
                "description": "Comprehensive interior design and custom woodwork services",
                "numberOfItems": coreServices.length,
                "itemListElement": coreServices.map((service, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "Service",
                        "name": service.title,
                        "description": service.description
                    }
                }))
            },
            {
                "@type": "ProfessionalService",
                "@id": "https://www.vahinidinterio.com/#professional-service",
                "name": "Vahini D'Interio Interior Design Services",
                "description": "Professional interior design and custom woodwork services specializing in modular kitchens, wardrobes, and bespoke furniture.",
                "priceRange": "$$$-$$$$",
                "areaServed": {
                    "@type": "AdministrativeArea",
                    "name": "Palnadu",
                    "containsPlace": [
                        {
                            "@type": "City",
                            "name": "Narasaraopet"
                        },
                        {
                            "@type": "City",
                            "name": "Guntur"
                        }
                    ]
                },
                "provider": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Interior Design Services Catalog",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@id": "https://www.vahinidinterio.com/services#modular-kitchens"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@id": "https://www.vahinidinterio.com/services#wardrobes-storage"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@id": "https://www.vahinidinterio.com/services#custom-furniture"
                            }
                        }
                    ]
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.vahinidinterio.com/services#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.vahinidinterio.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Services",
                        "item": "https://www.vahinidinterio.com/services"
                    }
                ]
            },
            {
                "@type": "Organization",
                "@id": "https://www.vahinidinterio.com/#organization",
                "name": "Vahini D'Interio",
                "url": "https://www.vahinidinterio.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.vahinidinterio.com/logo512.jpg"
                },
                "sameAs": [
                    "https://www.facebook.com/profile.php?id=61583594444033",
                    "https://www.facebook.com/profile.php?id=61583376973962",
                    "https://www.instagram.com/vahinidinterio/",
                    "https://www.youtube.com/@VahiniDInterio",
                    "https://in.pinterest.com/vahinidinterio/",
                    "https://www.linkedin.com/in/vahinidinterio",
                    "https://www.linkedin.com/company/vahini-d-interio/"
                ]
            },
            {
                "@type": "WebPage",
                "@id": "https://www.vahinidinterio.com/services#webpage",
                "url": "https://www.vahinidinterio.com/services",
                "name": "Services - Vahini D'Interio",
                "description": pageDescription,
                "isPartOf": {
                    "@id": "https://www.vahinidinterio.com/#website"
                },
                "about": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "breadcrumb": {
                    "@id": "https://www.vahinidinterio.com/services#breadcrumb"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://www.vahinidinterio.com/#website",
                "url": "https://www.vahinidinterio.com",
                "name": "Vahini D'Interio",
                "publisher": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                }
            }
        ]
    };

    return (
        <div className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 pb-20 overflow-hidden" style={{ backgroundColor: isDark ? V.dark : V.light, color: isDark ? V.offGold : V.nearBlack }}>
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={pageKeywords}
                canonicalUrl={pageUrl}
                ogImage={socialImage}
                ogType="website"
                articleType="WebPage"
                schema={schema}
            />

            <div className="max-w-7xl mx-auto">

                {/* --- HEADER SECTION --- */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h1
                        className="text-4xl md:text-6xl font-extralight mb-4 tracking-wider"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}
                    >
                        Mastery in Interior Woodwork
                    </h1>
                    <div className="h-1 w-32 mx-auto mb-6 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: V.gold }} />
                    <p className="text-lg md:text-xl max-w-4xl mx-auto opacity-90 leading-relaxed" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        Our services are defined by the hand of the Master Craftsman. We specialize in <Link to="/about" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>bespoke interior carpentry</strong></Link> where legacy, material purity, and structural integrity are non-negotiable. View our <Link to="/portfolio" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>completed projects</strong></Link> or <a href="https://www.instagram.com/vahinidinterio/" target="_blank" rel="noopener noreferrer" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>follow us on Instagram</strong></a> to see our latest installations.
                    </p>
                </motion.header>

                {/* --- 1. INTERACTIVE SERVICE SHOWCASE --- */}
                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-light text-center mb-16" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        The Bespoke Vahini Offerings
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* LEFT COLUMN: INTERACTIVE SERVICE MENU */}
                        <div className="lg:order-1 space-y-6">
                            {coreServices.map((service) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * coreServices.indexOf(service) }}
                                    onMouseEnter={() => setActiveServiceId(service.id)}
                                    onClick={() => setActiveServiceId(service.id)}
                                    className={`p-6 rounded-xl transition-all duration-300 transform cursor-pointer border ${activeServiceId === service.id ? 'scale-[1.02] border-2 shadow-2xl shadow-[#C1A35D]/20' : 'border-[#C1A35D]/10 hover:border-[#C1A35D]/40'}`}
                                    style={{
                                        backgroundColor: activeServiceId === service.id
                                            ? (isDark ? 'rgba(193, 163, 93, 0.08)' : 'rgba(193, 163, 93, 0.15)')
                                            : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'),
                                    }}
                                >
                                    <div className="flex items-center mb-3">
                                        <service.Icon className="w-6 h-6 mr-3" style={{ color: V.gold }} />
                                        <h3 className="text-xl md:text-2xl font-semibold" style={{ color: V.gold }}>
                                            {service.title}
                                        </h3>
                                    </div>
                                    <h4 className="text-sm tracking-widest uppercase mb-4 opacity-70" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                        {service.subtitle}
                                    </h4>
                                    <p className="text-sm leading-relaxed text-justify opacity-80" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                        {service.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* RIGHT COLUMN: VISUAL DISPLAY BOARD (Active Service Details) */}
                        <div className="lg:order-2 sticky top-28 h-[670px] hidden lg:block">
                            <motion.div
                                key={activeService.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full rounded-2xl overflow-hidden border-2 relative shadow-2xl"
                                style={{ borderColor: V.gold }}
                            >
                                {/* Background Image */}
                                <img
                                    src={activeService.imageUrl}
                                    alt={activeService.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-4xl font-light tracking-widest mb-2" style={{ color: V.gold, fontFamily: "'Cormorant Garamond', serif" }}>
                                        {activeService.imageText}
                                    </h3>
                                    <p className="text-white/80 text-sm uppercase tracking-wider">
                                        Vahini D'Interio Exclusive
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* MOBILE IMAGE DISPLAY (Visible only on small screens) */}
                        <div className="lg:hidden order-first mb-8">
                            <motion.div
                                key={activeService.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full h-64 rounded-xl overflow-hidden border border-[#C1A35D]/30 relative"
                            >
                                <img
                                    src={activeService.imageUrl}
                                    alt={activeService.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <h3 className="text-2xl font-light tracking-widest text-white text-center px-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                        {activeService.imageText}
                                    </h3>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </section>

                {/* --- 2. THE VAHINI PILLARS OF MASTERY --- */}
                <section className="mb-20 pt-16 border-t border-[#C1A35D]/20">
                    <h2 className="text-3xl md:text-4xl font-light text-center mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        The Pillars of Vahini D'Interio Mastery
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {masteryPillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="text-center p-6 rounded-xl border border-[#C1A35D]/20 transition-all duration-300 group"
                                style={{
                                    backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5',
                                    borderColor: isDark ? 'rgba(193, 163, 93, 0.2)' : 'rgba(193, 163, 93, 0.3)'
                                }}
                            >
                                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300" style={{ color: V.gold, fontFamily: "'Cormorant Garamond', serif" }}>
                                    {index + 1}
                                </span>
                                <h3 className="text-lg font-semibold mb-3" style={{ color: V.gold }}>{pillar.title}</h3>
                                <p className="text-sm opacity-70 leading-relaxed" style={{ color: isDark ? V.offGold : V.nearBlack }}>{pillar.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- CTA SECTION: START YOUR PROJECT --- */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                    className="mb-24 p-8 md:p-16 rounded-3xl relative overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${V.gold}08, ${V.gold}03)`,
                        border: `1px solid ${V.gold}30`
                    }}
                >
                    <div className="text-center relative z-10">
                        <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                            Start Your Project Today
                        </h2>
                        <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                            Transform your space with the expertise of our Vishwabrahmin master craftsmen. From concept to completion, we're here to bring your vision to life with unparalleled quality and craftsmanship.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                            <Link
                                to="/contact"
                                className="group flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
                                style={{
                                    background: `linear-gradient(135deg, ${V.gold}, ${V.gold2})`,
                                    color: '#000'
                                }}
                            >
                                <MessageCircle size={22} />
                                <span>Schedule Consultation</span>
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/portfolio"
                                className="group flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95"
                                style={{
                                    border: `2px solid ${V.gold}`,
                                    color: V.gold,
                                    backgroundColor: 'transparent'
                                }}
                            >
                                <Eye size={22} />
                                <span>View Our Portfolio</span>
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/about"
                                className="group flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95"
                                style={{
                                    border: `2px solid ${V.gold}`,
                                    color: V.gold,
                                    backgroundColor: 'transparent'
                                }}
                            >
                                <Users size={22} />
                                <span>Meet Our Craftsmen</span>
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <p className="text-sm opacity-70" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                            See our latest <a href="https://www.instagram.com/vahinidinterio/" target="_blank" rel="noopener noreferrer" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>kitchen installations on Instagram</strong></a> and <a href="https://in.pinterest.com/vahinidinterio/" target="_blank" rel="noopener noreferrer" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>design inspiration on Pinterest</strong></a>.
                        </p>
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default Services;