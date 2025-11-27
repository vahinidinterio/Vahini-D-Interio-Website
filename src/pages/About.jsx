import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";
import { V } from "../utils/colors";
import SEO from "../components/SEO";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const About = () => {
    // Expert SEO Configuration
    const pageTitle = "About Us | Vahini D'Interio - Vishwabrahmin Master Craftsmen Heritage";
    const pageDescription = "Discover the legacy of Vahini D'Interio, led by Vishwabrahmin Master Craftsmen from Ravipadu, Narasaraopet. Expert interior design blending ancient craftsmanship with modern luxury for bespoke woodwork and premium modular kitchens.";
    const pageUrl = "https://www.vahinidinterio.com/about";
    const socialImage = "https://www.vahinidinterio.com/social-share-image.jpg";
    const pageKeywords = "Vishwabrahmin craftsmen, interior design Narasaraopet, master carpenters Ravipadu, bespoke woodwork, custom furniture, modular kitchens, heritage craftsmanship, luxury interiors Palnadu";

    // Comprehensive Organization & Person Schema
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.vahinidinterio.com/#organization",
                "name": "Vahini D'Interio",
                "alternateName": "Vahini D Interio",
                "url": "https://www.vahinidinterio.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.vahinidinterio.com/logo512.jpg",
                    "width": 512,
                    "height": 512
                },
                "image": "https://www.vahinidinterio.com/social-share-image.jpg",
                "description": "Premium interior design studio specializing in bespoke woodwork and modular interiors, led by Vishwabrahmin Master Craftsmen from Ravipadu, Narasaraopet.",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Narasaraopet",
                    "addressRegion": "Andhra Pradesh",
                    "addressCountry": "IN"
                },
                "areaServed": [
                    {
                        "@type": "City",
                        "name": "Narasaraopet"
                    },
                    {
                        "@type": "AdministrativeArea",
                        "name": "Palnadu"
                    },
                    {
                        "@type": "AdministrativeArea",
                        "name": "Guntur"
                    }
                ],
                "sameAs": [
                    "https://www.facebook.com/profile.php?id=61583594444033",
                    "https://www.facebook.com/profile.php?id=61583376973962",
                    "https://www.instagram.com/vahinidinterio/",
                    "https://www.youtube.com/@VahiniDInterio",
                    "https://in.pinterest.com/vahinidinterio/",
                    "https://www.linkedin.com/in/vahinidinterio",
                    "https://www.linkedin.com/company/vahini-d-interio/"
                ],
                "founders": [
                    {
                        "@id": "https://www.vahinidinterio.com/#chennupalli-koteswara-chari"
                    },
                    {
                        "@id": "https://www.vahinidinterio.com/#kancheti-prasad"
                    }
                ],
                "knowsAbout": [
                    "Interior Design",
                    "Custom Furniture",
                    "Woodworking",
                    "Modular Kitchens",
                    "Wardrobes",
                    "Heritage Craftsmanship",
                    "Bespoke Carpentry"
                ],
                "slogan": "Unparalleled Decade-Defining Quality in Narasaraopet & Palnadu"
            },
            {
                "@type": "Person",
                "@id": "https://www.vahinidinterio.com/#chennupalli-koteswara-chari",
                "name": "Chennupalli Koteswara Chari",
                "givenName": "Koteswara Chari",
                "familyName": "Chennupalli",
                "jobTitle": "Master Craftsman & Custodian of Lineage",
                "description": "Vishwabrahmin Master Carpenter from Ravipadu, continuing generations of woodworking heritage with expertise in traditional joinery and modern modular installations.",
                "worksFor": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "alumniOf": "Ravipadu Vishwabrahmin Lineage",
                "knowsAbout": [
                    "Traditional Carpentry",
                    "Tenon and Mortise Joinery",
                    "Wood Physics",
                    "Custom Furniture Design",
                    "Quality Control"
                ],
                "sameAs": [
                    "https://www.instagram.com/chari.ch.10/"
                ]
            },
            {
                "@type": "Person",
                "@id": "https://www.vahinidinterio.com/#kancheti-prasad",
                "name": "Kancheti Prasad",
                "givenName": "Prasad",
                "familyName": "Kancheti",
                "jobTitle": "Visionary Partner & Modern Architect",
                "description": "Strategic partner combining technical expertise in frontend development, carpentry, and finance to deliver modern, transparent, and digitally-enabled interior design services.",
                "worksFor": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "alumniOf": "Ravipadu",
                "knowsAbout": [
                    "Project Management",
                    "Digital Marketing",
                    "Client Relations",
                    "3D Design",
                    "Modern Design Systems"
                ],
                "sameAs": [
                    "https://www.linkedin.com/in/prasad-kancheti-776b54241/"
                ]
            },
            {
                "@type": "AboutPage",
                "@id": "https://www.vahinidinterio.com/about#webpage",
                "url": "https://www.vahinidinterio.com/about",
                "name": "About Vahini D'Interio - Heritage & Craftsmanship",
                "description": pageDescription,
                "isPartOf": {
                    "@id": "https://www.vahinidinterio.com/#website"
                },
                "about": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": socialImage
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
        <div className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 pb-20 overflow-hidden">
            <SEO
                title={pageTitle}
                description={pageDescription}
                keywords={pageKeywords}
                canonicalUrl={pageUrl}
                ogImage={socialImage}
                ogType="website"
                articleType="AboutPage"
                schema={schema}
            />

            <div className="max-w-5xl mx-auto">

                {/* --- 1. THE CORE NARRATIVE: HERITAGE & PHILOSOPHY --- */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-center mb-24"
                >
                    <h1 className="text-4xl md:text-5xl font-light mb-8 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        The Legacy of the Vishwabrahmins
                    </h1>
                    <div className="h-1 w-24 mx-auto mb-10" style={{ backgroundColor: V.gold }} />

                    <div className="prose prose-lg mx-auto max-w-3xl text-justify md:text-center leading-relaxed space-y-6" style={{ color: V.offGold }}>
                        <p>
                            <strong style={{ color: V.gold }}>Vahini D'Interio</strong> is not merely an interior design studio; it is the continuation of a <strong style={{ color: V.gold }}>SACRED TRADITION</strong>. We are led by a partnership that spans generations, rooted in the Vishwabrahmin Heritage of <strong style={{ color: V.gold }}>MASTER CRAFTSMEN</strong> from the historic artisan village of <strong style={{ color: V.gold }}>Ravipadu</strong>. For centuries, our community has been the custodian of five profound arts—Metalwork, Masonry, Jewelry, Sculpture, and, most importantly for us, Woodworking (Carpentry).
                        </p>
                        <p>
                            Our philosophy is built on the belief that true luxury lies in <strong style={{ color: V.gold }}>TIMELESSNESS</strong>. We honor the deep, <strong style={{ color: V.gold }}>SPIRITUAL KNOWLEDGE</strong> embedded in the selection of materials and the mastery of the hand tool, ensuring every piece of furniture and every interior installation carries the <strong style={{ color: V.gold }}>SOUL</strong> of our <strong style={{ color: V.gold }}>LINEAGE</strong>, perfected for the Modern Home.
                        </p>
                    </div>
                </motion.section>


                {/* --- 2. MEET THE CUSTODIANS: THE FOUNDERS --- */}
                <section className="mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-light text-center mb-16"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        Meet the Custodians
                    </motion.h2>

                    <div className="space-y-20">
                        {/* Founder 1: Chennupalli Koteswara Chari */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="flex flex-col md:flex-row gap-10 items-center"
                        >
                            <motion.div variants={fadeInUp} className="w-full md:w-1/3 flex justify-center">
                                <div className="w-64 h-64 rounded-full border-2 p-2 relative" style={{ borderColor: V.gold }}>
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#C1A35D]/20 to-transparent flex items-center justify-center overflow-hidden">
                                        <img
                                            src="/images/founders/chennupalli_koteswara_chari1.jpg"
                                            alt="Chennupalli Koteswara Chari"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Social Link */}
                                    <a
                                        href="https://www.instagram.com/chari.ch.10/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-2 right-2 p-3 rounded-full bg-white shadow-lg hover:scale-110 transition-transform duration-300 z-10"
                                        style={{ color: V.gold }}
                                        aria-label="Visit Koteswara Chari's Instagram"
                                    >
                                        <Instagram size={24} />
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="w-full md:w-2/3 text-center md:text-left">
                                <h3 className="text-2xl font-semibold mb-2" style={{ color: V.gold }}>Chennupalli Koteswara Chari</h3>
                                <h4 className="text-sm tracking-widest uppercase mb-6 opacity-70">Master Craftsman & Custodian of Lineage</h4>
                                <p className="leading-relaxed opacity-90 text-justify" style={{ color: V.offGold }}>
                                    Koteswara Chari is the <strong style={{ color: V.gold }}>LIVING EMBODIMENT</strong> of our legacy. As a Vishwabrahmin Master Carpenter, he continues a lineage stretching back generations—a tradition dedicated to the sacred art of woodworking. This legacy flows from his revered late grandfather, Swarna Venkateswarlu, and his late father, Chennupalli Veera Brahmachari. Born in <strong style={{ color: V.gold }}>Ravipadu</strong>, Koteswara Chari has successfully led the firm for the past five years, upholding their <strong style={{ color: V.gold }}>EXACTING STANDARDS</strong>. His expertise is not merely technical; it is a deep, innate understanding of <strong style={{ color: V.gold }}>WOOD PHYSICS</strong>, traditional joinery, and the spiritual knowledge that makes our custom furniture and installations truly <strong style={{ color: V.gold }}>TIMELESS</strong>. In Narasaraopet, he is the guarantee of <strong style={{ color: V.gold }}>UNPARALLELED, DECADE-DEFINING QUALITY</strong>.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Founder 2: Kancheti Prasad */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="flex flex-col md:flex-row-reverse gap-10 items-center"
                        >
                            <motion.div variants={fadeInUp} className="w-full md:w-1/3 flex justify-center">
                                <div className="w-64 h-64 rounded-full border-2 p-2 relative" style={{ borderColor: V.gold }}>
                                    <div className="w-full h-full rounded-full bg-gradient-to-bl from-[#C1A35D]/20 to-transparent flex items-center justify-center overflow-hidden">
                                        <img
                                            src="/images/founders/kancheti-prasad.jpg"
                                            alt="Kancheti Prasad"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Social Link */}
                                    <a
                                        href="https://www.linkedin.com/in/prasad-kancheti-776b54241/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-2 right-2 p-3 rounded-full bg-white shadow-lg hover:scale-110 transition-transform duration-300 z-10"
                                        style={{ color: V.gold }}
                                        aria-label="Visit Kancheti Prasad's LinkedIn"
                                    >
                                        <Linkedin size={24} />
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="w-full md:w-2/3 text-center md:text-left">
                                <h3 className="text-2xl font-semibold mb-2" style={{ color: V.gold }}>Kancheti Prasad</h3>
                                <h4 className="text-sm tracking-widest uppercase mb-6 opacity-70">Visionary Partner & Modern Architect</h4>
                                <p className="leading-relaxed opacity-90 text-justify" style={{ color: V.offGold }}>
                                    Prasad provides the vital bridge between our ancient craftsmanship and the demands of modern luxury design. His versatile background—combining experience as a Frontend Developer, former hands-on carpenter, and a finance executive—ensures our operations are as <strong style={{ color: V.gold }}>FLAWLESS</strong> and <strong style={{ color: V.gold }}>TRANSPARENT</strong> as our woodwork. Born in <strong style={{ color: V.gold }}>Ravipadu</strong>, Prasad drives our commitment to <strong style={{ color: V.gold }}>DIGITAL EXCELLENCE</strong>, modern client communication, and efficient project management. This fusion ensures <strong style={{ color: V.gold }}>Vahini D'Interio</strong> delivers not just the <strong style={{ color: V.gold }}>BEST CARPENTRY</strong> in Narasaraopet, but also the most <strong style={{ color: V.gold }}>STREAMLINED, PROFESSIONAL, and TRANSPARENT SERVICE</strong> in the region.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>


                {/* --- 3. THE VAHINI COLLECTIVE: OUR MASTER CRAFTSMEN --- */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mb-32"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                            The Vahini Collective: Masters of the Craft
                        </h2>
                        <p className="max-w-3xl mx-auto opacity-90 leading-relaxed" style={{ color: V.offGold }}>
                            While our founders set the strategic direction and uphold the lineage, the <strong style={{ color: V.gold }}>TRUE HEART</strong> of <strong style={{ color: V.gold }}>Vahini D'Interio</strong> lies with our team—the Vahini Collective. This is not a staff; it is a fellowship of highly experienced, dedicated <strong style={{ color: V.gold }}>MASTER CARPENTERS</strong> and skilled technicians from <strong style={{ color: V.gold }}>Ravipadu</strong> and surrounding regions.
                        </p>
                    </div>

                    {/* Team Image Placeholder */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="w-full aspect-[16/9] md:aspect-[21/9] rounded-lg border border-[#C1A35D]/30 bg-gradient-to-b from-[#C1A35D]/10 to-transparent mb-12 flex items-center justify-center overflow-hidden relative group"
                    >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                        <span className="relative z-10 text-2xl md:text-4xl font-light tracking-widest uppercase opacity-40" style={{ color: V.gold }}>
                            The Vahini Collective Team
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold" style={{ color: V.gold }}>Ownership in Every Joint</h3>
                            <p className="leading-relaxed opacity-80 text-justify" style={{ color: V.offGold }}>
                                Our team members approach every project with a rare and invaluable quality: <strong style={{ color: V.gold }}>OWNERSHIP</strong>. They do not execute a plan; they adopt the client's space as their own, ensuring that every joint, every finish, and every measurement is executed as if the property belonged to them personally. This unique level of commitment stems from deep respect for the <strong style={{ color: V.gold }}>Vishwabrahmin TRADITION</strong> of excellence.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold" style={{ color: V.gold }}>Experience and Dedication</h3>
                            <p className="leading-relaxed opacity-80 text-justify" style={{ color: V.offGold }}>
                                Our craftsmen are veterans in their field, possessing decades of combined experience in high-end, bespoke woodwork.
                            </p>
                            <ul className="space-y-4 opacity-80" style={{ color: V.offGold }}>
                                <li className="flex gap-3">
                                    <span style={{ color: V.gold }}>✦</span>
                                    <span><strong style={{ color: V.gold }}>Deep Expertise:</strong> They are specialists in everything from traditional <strong style={{ color: V.gold }}>TENON-AND-MORTISE JOINERY</strong> to the precise assembly of modern modular units, guaranteeing longevity and flawless aesthetics.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span style={{ color: V.gold }}>✦</span>
                                    <span><strong style={{ color: V.gold }}>Quality Guardians:</strong> The team acts as the final line of <strong style={{ color: V.gold }}>QUALITY CONTROL</strong> on the workshop floor, ensuring only materials that pass the Vahini D'Interio Standard are used.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 text-center p-6 border-t border-b border-[#C1A35D]/20">
                        <p className="text-lg italic opacity-90" style={{ color: V.offGold }}>
                            "The commitment of the Vahini Collective is the ultimate guarantee of the unparalleled, decade-defining quality we deliver across <strong style={{ color: V.gold }}>Ravipadu</strong>, Palnadu and Narasaraopet."
                        </p>
                    </div>
                </motion.section>


                {/* --- 4. OUR CLIENT PROMISE: THE ART OF PARTNERSHIP --- */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mb-32 p-8 md:p-12 rounded-2xl border backdrop-blur-sm"
                    style={{
                        backgroundColor: 'rgba(193, 163, 93, 0.03)',
                        borderColor: 'rgba(193, 163, 93, 0.1)'
                    }}
                >
                    <h2 className="text-3xl md:text-4xl font-light text-center mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        The Vahini D'Interio Client Experience: CRAFTING TRUST
                    </h2>
                    <p className="text-lg text-center mb-12 max-w-3xl mx-auto opacity-90" style={{ color: V.offGold }}>
                        Unlike typical contractors, we treat every project as a <strong style={{ color: V.gold }}>SACRED PARTNERSHIP</strong>. Our commitment extends beyond the final coat of polish; we ensure the client's vision, budget, and peace of mind are always central to our operations.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "INTEGRITY and TRANSPARENCY",
                                desc: "We provide clear, ITEMIZED QUOTATIONS from the outset. There are NO HIDDEN COSTS—only honest discussions about Material Quality and Craftsmanship Value."
                            },
                            {
                                title: "BESPOKE COLLABORATION",
                                desc: "We don't just build; we collaborate. From the initial hand-sketches to the final 3D RENDERS, you are an integral part of the design evolution, ensuring the finished space reflects your unique taste and lifestyle."
                            },
                            {
                                title: "DEDICATION to PALNADU & NARASARAOPET",
                                desc: "Our roots here are deep, stemming from places like Ravipadu. This local expertise means we understand the regional climate, architectural nuances, and local material suppliers, guaranteeing faster, high-quality project completion without compromising the ARTISANAL STANDARDS."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-lg border bg-opacity-50 transition-all duration-300"
                                style={{ borderColor: 'rgba(193, 163, 93, 0.2)', backgroundColor: 'rgba(0,0,0,0.2)' }}
                            >
                                <h3 className="text-lg font-semibold mb-4" style={{ color: V.gold }}>{item.title}</h3>
                                <p className="text-sm leading-relaxed opacity-80 text-justify" style={{ color: V.offGold }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>


                {/* --- 5. THE PROCESS: FROM CONCEPT TO HANDOVER --- */}
                <section>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                            Our Bespoke Project Journey
                        </h2>
                        <p className="text-sm tracking-widest uppercase opacity-70 mb-8">The Vahini D'Interio Standard — Precision in Every Step</p>
                        <p className="max-w-2xl mx-auto opacity-90" style={{ color: V.offGold }}>
                            Every <strong style={{ color: V.gold }}>Vahini D'Interio</strong> project follows a rigorous, <strong style={{ color: V.gold }}>FIVE-STAGE PROCESS</strong> designed for <strong style={{ color: V.gold }}>PRECISION</strong> and <strong style={{ color: V.gold }}>PREDICTABILITY</strong>:
                        </p>
                    </motion.div>

                    <div className="space-y-12 relative">
                        {/* Vertical Line for Desktop */}
                        <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 opacity-20" style={{ backgroundColor: V.gold }}></div>

                        {[
                            {
                                step: "1",
                                title: "DISCOVERY & CONCEPTUALIZATION",
                                content: [
                                    { sub: "DETAILED BRIEFING", text: "We begin with an in-depth site visit and consultation to understand your needs, aesthetic goals, and budget." },
                                    { sub: "DESIGN BLUEPRINT", text: "We create a comprehensive 3D DESIGN PRESENTATION and select preliminary materials, providing a visual road map of the finished space." },
                                    { sub: "EXPERT PLANNING", text: "We perform initial resource allocation and establish a CRITICAL PATH METHOD (CPM) schedule, guaranteeing timely delivery." }
                                ]
                            },
                            {
                                step: "2",
                                title: "TECHNICAL DRAWING & ESTIMATION",
                                content: [
                                    { sub: "PRECISION DOCUMENTATION", text: "Our master carpenters produce detailed TECHNICAL DRAWINGS (CAD/2D) that finalize dimensions, joinery types, and HARDWARE SPECIFICATIONS." },
                                    { sub: "MATERIAL SAFETY & SOURCING", text: "We select only E1-Grade (Low Formaldehyde), moisture-resistant materials, meticulously inspecting wood for stability and sustainability. MATERIAL SAFETY CERTIFICATES are provided upon request." },
                                    { sub: "FINAL QUOTATION", text: "The material and labor costs are meticulously calculated and presented as a final, NON-NEGOTIABLE CONTRACT." }
                                ]
                            },
                            {
                                step: "3",
                                title: "CRAFTSMANSHIP & EXECUTION",
                                content: [
                                    { sub: "WORKSHOP EXCELLENCE & TEAM ASSIGNMENT", text: "The majority of complex elements (Modular Kitchens, Wardrobes, Cabinets) are crafted in our controlled workshop environment. A dedicated PROJECT MANAGER and specialized team are assigned, ensuring clear communication and accountability from the workshop floor to the site." },
                                    { sub: "QUALITY CONTROL GATES", text: "Every stage of construction—from cutting and edge banding to finishing—is checked against a FIVE-POINT QUALITY CHECKLIST." },
                                    { sub: "ON-SITE ASSEMBLY", text: "Minimal, clean site work is performed for installation and integration of the finished pieces. We maintain strict site cleanliness and NOISE MANAGEMENT PROTOCOLS." }
                                ]
                            },
                            {
                                step: "4",
                                title: "QUALITY ASSURANCE & INSPECTION",
                                content: [
                                    { sub: "MASTER CARPENTER CHECK", text: "Chennupalli Koteswara Chari personally oversees the FINAL QUALITY CHECK, inspecting every joint, finish, and mechanism for FLAWLESS OPERATION." },
                                    { sub: "CLIENT WALKTHROUGH", text: "A complete, documented inspection is done with the client to address any minor adjustments before final sign-off." }
                                ]
                            },
                            {
                                step: "5",
                                title: "HANDOVER & AFTERCARE",
                                content: [
                                    { sub: "PROJECT HANDOVER", text: "Once the space meets the VAHINI D'INTERIO STANDARD, keys and a COMPREHENSIVE WARRANTY PACKAGE are formally handed over. This includes a detailed guide for wood maintenance." },
                                    { sub: "DEDICATED SUPPORT", text: "We provide dedicated aftercare support, ensuring your beautiful wooden interiors remain PRISTINE for years to come." }
                                ]
                            }
                        ].map((stage, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col md:flex-row gap-6 md:gap-10 relative"
                            >
                                {/* Step Number */}
                                <div className="flex-shrink-0 flex items-center md:justify-center">
                                    <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl font-bold z-10 bg-[#0D0D0D]"
                                        style={{ borderColor: V.gold, color: V.gold }}>
                                        {stage.step}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow pb-8 border-b border-white/5 last:border-0">
                                    <h3 className="text-xl md:text-2xl font-semibold mb-6" style={{ color: V.gold }}>{stage.title}</h3>
                                    <div className="space-y-6">
                                        {stage.content.map((item, i) => (
                                            <div key={i} className="group">
                                                <h4 className="text-sm font-bold tracking-wide mb-1 opacity-90 group-hover:opacity-100 transition-opacity" style={{ color: V.offGold }}>
                                                    {item.sub}
                                                </h4>
                                                <p className="text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity text-justify" style={{ color: V.offGold }}>
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default About;