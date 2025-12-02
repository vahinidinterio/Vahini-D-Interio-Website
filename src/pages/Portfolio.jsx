import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Wrench, Users } from "lucide-react";
import { V } from "../utils/colors";
import { useTheme } from "../context/ThemeContext";
import SEO from "../components/SEO";

const Portfolio = () => {
    const { isDark } = useTheme();

    // Expert SEO Configuration
    const pageTitle = "Portfolio | Vahini D'Interio - Premium Interior Design Projects Gallery";
    const pageDescription = "Explore our curated collection of high-end interior design and custom furniture projects across Palnadu and Narasaraopet. See our excellence in modern luxury residential and commercial spaces, bespoke woodwork, and traditional craftsmanship.";
    const pageUrl = "https://www.vahinidinterio.com/portfolio";
    const socialImage = "https://www.vahinidinterio.com/social-share-image.jpg";
    const pageKeywords = "interior design portfolio, custom furniture Narasaraopet, modular kitchen projects, luxury interiors Palnadu, bespoke woodwork gallery, commercial interior design, residential projects, traditional craftsmanship showcase";

    const projects = [
        { id: 1, title: "Luxury Wardrobe", category: "Custom Furniture", location: "Narasaraopet" },
        { id: 2, title: "Teak Door Frame", category: "Joinery", location: "Palnadu" },
        { id: 3, title: "Modern Kitchen", category: "Interior Fit-Out", location: "Guntur" },
        { id: 4, title: "Office Interior", category: "Commercial", location: "Narasaraopet" },
        { id: 5, title: "Pooja Room", category: "Traditional", location: "Palnadu" },
        { id: 6, title: "Living Room", category: "Interior Design", location: "Vijayawada" },
    ];

    // Comprehensive Portfolio Schema with ImageGallery and ItemList
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://www.vahinidinterio.com/portfolio#webpage",
                "url": "https://www.vahinidinterio.com/portfolio",
                "name": "Portfolio - Vahini D'Interio Interior Design Projects",
                "description": pageDescription,
                "isPartOf": {
                    "@id": "https://www.vahinidinterio.com/#website"
                },
                "about": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "breadcrumb": {
                    "@id": "https://www.vahinidinterio.com/portfolio#breadcrumb"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.vahinidinterio.com/portfolio#breadcrumb",
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
                        "name": "Portfolio",
                        "item": "https://www.vahinidinterio.com/portfolio"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "@id": "https://www.vahinidinterio.com/portfolio#itemlist",
                "name": "Vahini D'Interio Project Portfolio",
                "description": "Curated collection of interior design and custom furniture projects",
                "numberOfItems": projects.length,
                "itemListElement": projects.map((project, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": project.title,
                    "description": `${project.category} project in ${project.location}`,
                    "item": {
                        "@type": "CreativeWork",
                        "name": project.title,
                        "description": `${project.category} - ${project.location}`,
                        "creator": {
                            "@id": "https://www.vahinidinterio.com/#organization"
                        },
                        "keywords": [project.category, project.location, "interior design", "custom furniture"]
                    }
                }))
            },
            {
                "@type": "ImageGallery",
                "name": "Vahini D'Interio Portfolio Gallery",
                "description": "Gallery showcasing premium interior design and custom furniture projects",
                "creator": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "about": "Interior Design, Custom Furniture, Woodworking",
                "spatialCoverage": {
                    "@type": "Place",
                    "name": "Palnadu Region",
                    "containsPlace": [
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
                            "name": "Vijayawada"
                        }
                    ]
                }
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
        <div className="min-h-screen pt-12 px-4 md:px-8 lg:px-16 pb-20">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={pageKeywords}
                canonicalUrl={pageUrl}
                ogImage={socialImage}
                ogType="website"
                articleType="CollectionPage"
                schema={schema}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                    The Vahini D'Interio Portfolio: Crafted for the Palnadu Region
                </h1>
                <p className="max-w-3xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                    Explore a curated selection of our finest works, spanning <Link to="/services" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>custom wardrobe solutions</strong></Link>, intricate threshold and door frame installations, and <Link to="/services" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>bespoke interior fit-outs</strong></Link> throughout Narasaraopet and Palnadu. Learn more about our <Link to="/about" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>master craftsmen heritage</strong></Link>.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                        style={{ background: isDark ? V.darkAccent : "rgba(0,0,0,0.05)", border: `1px solid ${V.gold}20` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/80 z-10" />
                        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-serif z-0">
                            {index + 1}
                        </div>

                        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-xl font-semibold mb-1" style={{ color: V.gold }}>{project.title}</h3>
                            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: V.offGold }}>{project.category}</p>
                            <p className="text-xs opacity-60" style={{ color: V.offGold }}>{project.location}</p>
                        </div>
                    </motion.div>


                ))}
            </div>
            {/* SEO Rich Text Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-24 pt-16 border-t"
                style={{ borderColor: isDark ? 'rgba(193, 163, 93, 0.2)' : 'rgba(0,0,0,0.1)' }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        Premier Interior Design & Carpentry Across Palnadu
                    </h2>
                    <div className="space-y-6 text-justify md:text-center leading-relaxed opacity-80" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        <p>
                            At <strong style={{ color: V.gold }}>Vahini D'Interio</strong>, our portfolio is a testament to our deep-rooted heritage in <strong style={{ color: V.gold }}>Ravipadu</strong>, the home of Vishwabrahmin master craftsmanship. We don't just design spaces; we craft legacies. From the bustling streets of <strong style={{ color: V.gold }}>Narasaraopet</strong> to the expanding urban landscapes of <strong style={{ color: V.gold }}>Guntur</strong> and <strong style={{ color: V.gold }}>Piduguralla</strong>, our work stands as a benchmark of quality and durability.
                        </p>
                        <p>
                            Whether it is a bespoke teakwood door frame in a traditional home in <strong style={{ color: V.gold }}>Chilakaluripet</strong>, a modern modular kitchen in <strong style={{ color: V.gold }}>Sattenapalle</strong>, or a complete commercial fit-out in <strong style={{ color: V.gold }}>Vinukonda</strong>, we bring the same level of dedication and precision. Our team of expert carpenters and designers understands the unique architectural needs of the Palnadu region, ensuring that every project we undertake blends seamlessly with the local culture while offering modern luxury and comfort.
                        </p>
                        <p>
                            We are proud to be the preferred choice for homeowners looking for <Link to="/services" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>authentic woodwork</strong></Link> and <strong style={{ color: V.gold }}>contemporary interior design</strong> in Andhra Pradesh. Explore our work to see how we transform houses into homes with the timeless touch of Ravipadu craftsmanship. <a href="https://www.instagram.com/vahinidinterio/" target="_blank" rel="noopener noreferrer" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>Follow us on Instagram</strong></a> for behind-the-scenes content.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* --- CTA SECTION: READY TO CREATE --- */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
                className="mt-20 p-8 md:p-16 rounded-3xl relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${V.gold}08, ${V.gold}03)`,
                    border: `1px solid ${V.gold}30`
                }}
            >
                <div className="text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        Ready to Create Your Dream Space?
                    </h2>
                    <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        Inspired by what you see? Let's bring your vision to life with the same dedication, precision, and timeless quality that defines every project in our portfolio.
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
                            <span>Start Your Project</span>
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/services"
                            className="group flex items-center gap-3 px-10 py-5 rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95"
                            style={{
                                border: `2px solid ${V.gold}`,
                                color: V.gold,
                                backgroundColor: 'transparent'
                            }}
                        >
                            <Wrench size={22} />
                            <span>Explore Services</span>
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
                            <span>Meet the Team</span>
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <p className="text-sm opacity-70" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        <a href="https://www.instagram.com/vahinidinterio/" target="_blank" rel="noopener noreferrer" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>Follow us for daily design inspiration</strong></a> and see our latest completed projects.
                    </p>
                </div>
            </motion.section>
        </div>
    );
};

export default Portfolio;
