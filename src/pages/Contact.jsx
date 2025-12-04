import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';
import { V } from '../utils/colors';
import SEO from '../components/SEO';

import { useTheme } from "../context/ThemeContext";

const Contact = () => {
    const { isDark } = useTheme();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Expert SEO Configuration
    const pageTitle = "Contact Us | Vahini D'Interio - Expert Interior Design in Narasaraopet";
    const pageDescription = "Contact Vahini D'Interio for custom furniture, modular kitchens, and interior design services in Narasaraopet, Palnadu. Schedule a consultation with our expert craftsmen today.";
    const pageUrl = "https://www.vahinidinterio.com/contact";
    const socialImage = "https://www.vahinidinterio.com/social-share-image.jpg";
    const pageKeywords = "contact interior designer Narasaraopet, custom furniture consultation Palnadu, modular kitchen quotes, interior design services contact, Vishwabrahmin craftsmen, get in touch Narasaraopet";

    // Comprehensive Contact Page Schema
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ContactPage",
                "@id": "https://www.vahinidinterio.com/contact#webpage",
                "url": "https://www.vahinidinterio.com/contact",
                "name": "Contact Vahini D'Interio",
                "description": pageDescription,
                "isPartOf": {
                    "@id": "https://www.vahinidinterio.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://www.vahinidinterio.com/contact#breadcrumb"
                },
                "about": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "mainEntity": {
                    "@id": "https://www.vahinidinterio.com/#localbusiness"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.vahinidinterio.com/contact#breadcrumb",
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
                        "name": "Contact",
                        "item": "https://www.vahinidinterio.com/contact"
                    }
                ]
            },
            {
                "@type": ["LocalBusiness", "FurnitureStore", "InteriorDesignService"],
                "@id": "https://www.vahinidinterio.com/#localbusiness",
                "name": "Vahini D'Interio",
                "image": "https://www.vahinidinterio.com/logo512.jpg",
                "url": "https://www.vahinidinterio.com",
                "telephone": "+91-7416385148",
                "email": "contact@vahinidinterio.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Main Road",
                    "addressLocality": "Narasaraopet",
                    "addressRegion": "Andhra Pradesh",
                    "postalCode": "522601",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "16.2348",
                    "longitude": "80.0467"
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "opens": "09:00",
                        "closes": "18:00"
                    }
                ],
                "priceRange": "₹₹₹",
                "areaServed": [
                    {
                        "@type": "City",
                        "name": "Narasaraopet"
                    },
                    {
                        "@type": "AdministrativeArea",
                        "name": "Palnadu District"
                    },
                    {
                        "@type": "City",
                        "name": "Chilakaluripet"
                    },
                    {
                        "@type": "City",
                        "name": "Ravipadu"
                    },
                    {
                        "@type": "City",
                        "name": "Guntur"
                    }
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Interior Design Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Custom Modular Kitchens",
                                "serviceType": "Interior Design"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Custom Furniture Design",
                                "serviceType": "Furniture Manufacturing"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Wardrobe Design",
                                "serviceType": "Interior Design"
                            }
                        }
                    ]
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
                "@type": "Organization",
                "@id": "https://www.vahinidinterio.com/#organization",
                "name": "Vahini D'Interio",
                "url": "https://www.vahinidinterio.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.vahinidinterio.com/logo512.jpg"
                },
                "contactPoint": [
                    {
                        "@type": "ContactPoint",
                        "telephone": "+91-7416385148",
                        "contactType": "customer service",
                        "email": "contact@vahinidinterio.com",
                        "areaServed": "IN",
                        "availableLanguage": ["English", "Telugu", "Hindi"]
                    },
                    {
                        "@type": "ContactPoint",
                        "telephone": "+91-7416385148",
                        "contactType": "sales",
                        "email": "contact@vahinidinterio.com",
                        "areaServed": "IN",
                        "availableLanguage": ["English", "Telugu", "Hindi"]
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const autoReplyTemplateId = process.env.REACT_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        try {
            if (!serviceId) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
                // Send Admin Notification
                const adminEmailPromise = emailjs.send(serviceId, templateId, {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    type: "General Inquiry"
                }, publicKey);

                // Send Auto-Reply to User
                const autoReplyPromise = emailjs.send(serviceId, autoReplyTemplateId, {
                    to_name: formData.name,
                    name: formData.name,
                    to_email: formData.email,
                    reply_to: formData.email,
                    user_email: formData.email,
                    email: formData.email,
                    message: "Thank you for contacting Vahini D'Interio. We have received your message and will get back to you shortly.",
                    type: "Auto-Reply"
                }, publicKey);

                await Promise.all([adminEmailPromise, autoReplyPromise]);
            }

            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                articleType="ContactPage"
                schema={schema}
            />

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Left Column: Info & CTA */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        Start Your Design Journey in Palnadu.
                    </h1>
                    <p className="leading-relaxed mb-8" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        Ready to collaborate on your <Link to="/services" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>custom interiors</strong></Link> or <Link to="/portfolio" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>furniture needs</strong></Link>? Whether you are in Narasaraopet or anywhere in the Palnadu district, connect with us to schedule a consultation. Use our Design Analysis tool or contact us directly for expert advice. You can also <a href="https://www.instagram.com/vahinidinterio/" target="_blank" rel="noopener noreferrer" style={{ color: V.gold, textDecoration: 'none', borderBottom: `1px solid ${V.gold}` }}><strong>message us on Instagram</strong></a> for quick responses.
                    </p>

                    <div className="space-y-6 mb-10">
                        <div className="flex items-center gap-4 opacity-80">
                            <div className="p-3 rounded-full bg-[#C1A35D]/10 text-[#C1A35D]"><Phone size={20} /></div>
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>Call Us</p>
                                <p className={isDark ? "text-white" : "text-black"}>+91 9704367692</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 opacity-80">
                            <div className="p-3 rounded-full bg-[#C1A35D]/10 text-[#C1A35D]"><Mail size={20} /></div>
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>Email Us</p>
                                <p className={isDark ? "text-white" : "text-black"}>contact@vahinidinterio.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 opacity-80">
                            <div className="p-3 rounded-full bg-[#C1A35D]/10 text-[#C1A35D]"><MapPin size={20} /></div>
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>Visit Us</p>
                                <p className={isDark ? "text-white" : "text-black"}>Narasaraopet, Palnadu District</p>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/analysis"
                        className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 mb-6"
                        style={{
                            background: `linear-gradient(135deg, ${V.gold}20, ${V.gold}10)`,
                            border: `1px solid ${V.gold}`,
                            color: V.gold,
                        }}
                    >
                        <Camera size={20} />
                        <span>Use AI Design Analysis Tool</span>
                    </Link>
                    <div className="flex gap-4 flex-wrap">
                        <Link
                            to="/services"
                            className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                            style={{ color: isDark ? V.offGold : V.nearBlack }}
                        >
                            View our <span style={{ color: V.gold, borderBottom: `1px solid ${V.gold}` }}>services</span>
                        </Link>
                        <Link
                            to="/about"
                            className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                            style={{ color: isDark ? V.offGold : V.nearBlack }}
                        >
                            Meet our <span style={{ color: V.gold, borderBottom: `1px solid ${V.gold}` }}>craftsmen</span>
                        </Link>
                    </div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`p-8 rounded-2xl border ${isDark ? 'border-white/5' : 'border-black/5'}`}
                    style={{
                        background: isDark ? "rgba(26, 26, 26, 0.4)" : "rgba(255, 255, 255, 0.6)",
                        backdropFilter: "blur(10px)"
                    }}
                >
                    {!isSubmitted ? (
                        <>
                            <h3 className="text-xl font-semibold mb-6" style={{ color: isDark ? V.offGold : V.nearBlack }}>Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full border rounded-lg p-3 focus:border-[#C1A35D] focus:outline-none transition-colors ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white/50 border-black/10 text-black'}`}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full border rounded-lg p-3 focus:border-[#C1A35D] focus:outline-none transition-colors ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white/50 border-black/10 text-black'}`}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full border rounded-lg p-3 focus:border-[#C1A35D] focus:outline-none transition-colors ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white/50 border-black/10 text-black'}`}
                                        placeholder="Your Phone Number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: isDark ? V.offGold : V.nearBlack }}>Project Details</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full border rounded-lg p-3 focus:border-[#C1A35D] focus:outline-none transition-colors ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white/50 border-black/10 text-black'}`}
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-lg font-semibold text-black mt-2 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    style={{ background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})` }}
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    {isLoading ? "Sending..." : "Send Message"}
                                </motion.button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: isDark ? '#fff' : '#000' }}>Message Sent!</h3>
                            <p className="opacity-70 mb-8" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                Thanks for reaching out. We'll get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-sm underline opacity-60 hover:opacity-100"
                                style={{ color: isDark ? V.offGold : V.nearBlack }}
                            >
                                Send another message
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
