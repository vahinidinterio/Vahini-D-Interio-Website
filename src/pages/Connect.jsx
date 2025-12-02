import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Globe, MessageCircle, Sofa, Lamp, Tv, DoorOpen, Armchair, BedDouble, ArrowRight, Quote, Trees, FileText, Video, ExternalLink, X } from 'lucide-react';
import { V } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/SEO';

// --- DATA: 50 Bilingual Quotes (25 English, 25 Telugu) ---
const QUOTES = [
    { text: "Wood is the soul of the home, breathing life into every corner.", lang: "en" },
    { text: "Luxury is in each detail.", lang: "en" },
    { text: "Design is not just what it looks like and feels like. Design is how it works.", lang: "en" },
    { text: "Simplicity is the ultimate sophistication.", lang: "en" },
    { text: "Your home should tell the story of who you are, and be a collection of what you love.", lang: "en" },
    { text: "Every room needs a touch of black, just as it needs at least one antique piece.", lang: "en" },
    { text: "Real comfort, visual and physical, is vital to every room.", lang: "en" },
    { text: "The details are not the details. They make the design.", lang: "en" },
    { text: "Wood implies a connection to nature that plastic and metal do not.", lang: "en" },
    { text: "Good design is obvious. Great design is transparent.", lang: "en" },
    { text: "Interiors speak a language that words cannot.", lang: "en" },
    { text: "Craftsmanship is the marriage of skill and passion.", lang: "en" },
    { text: "A house is made of walls and beams; a home is built with love and dreams.", lang: "en" },
    { text: "Quality is never an accident. It is always the result of intelligent effort.", lang: "en" },
    { text: "Minimalism is not about having less. It's about making room for more of what matters.", lang: "en" },
    { text: "The best rooms have something to say about the people who live in them.", lang: "en" },
    { text: "Elegance is the only beauty that never fades.", lang: "en" },
    { text: "Design creates culture. Culture shapes values. Values determine the future.", lang: "en" },
    { text: "Raw wood is the canvas of nature.", lang: "en" },
    { text: "Lighting is the jewelry of the home.", lang: "en" },
    { text: "Architecture is the inhabited sculpture.", lang: "en" },
    { text: "To design is to communicate clearly by whatever means you can control or master.", lang: "en" },
    { text: "Home is where the heart is, and the art is.", lang: "en" },
    { text: "Styles come and go. Good design is a language, not a style.", lang: "en" },
    { text: "Innovation is often the ability to reach into the past and bring back what is good.", lang: "en" },
    { text: "చెక్క కేవలం ఒక వస్తువు కాదు, అది ఇంటికి ప్రాణం పోసే ఆత్మ.", lang: "te" },
    { text: "నిజమైన అందం వివరాలలోనే దాగి ఉంటుంది.", lang: "te" },
    { text: "మీ ఇల్లు మీ వ్యక్తిత్వానికి అద్దం పట్టాలి.", lang: "te" },
    { text: "సరళత్వమే అసలైన గొప్పతనం.", lang: "te" },
    { text: "ప్రతి గదిలోనూ ఒక కథ ఉండాలి.", lang: "te" },
    { text: "నాణ్యత ఎప్పుడూ ప్రమాదవశాత్తు జరగదు, అది కృషి ఫలితం.", lang: "te" },
    { text: "డిజైన్ అంటే కేవలం చూడటానికి బాగుండటం కాదు, అది ఎలా పనిచేస్తుందో కూడా.", lang: "te" },
    { text: "కలపతో చేసిన ఇల్లు ప్రకృతికి దగ్గరగా ఉంటుంది.", lang: "te" },
    { text: "గొప్ప డిజైన్ మనసును తాకుతుంది.", lang: "te" },
    { text: "ఇల్లు అంటే కేవలం గోడలు కాదు, అది కలల సౌధం.", lang: "te" },
    { text: "అందమైన ఇల్లు మనశ్శాంతికి నిలయం.", lang: "te" },
    { text: "పాతకాలపు నైపుణ్యం, ఆధునిక సౌందర్యం - అదే మా ప్రత్యేకత.", lang: "te" },
    { text: "వెలుతురు ఇంటికి ఆభరణం లాంటిది.", lang: "te" },
    { text: "మీ ఇంటిని స్వర్గధామంగా మార్చుకోండి.", lang: "te" },
    { text: "కళ మరియు నైపుణ్యం కలిస్తే అద్భుతాలు సృష్టించవచ్చు.", lang: "te" },
    { text: "ప్రతి మూలలోనూ ఒక కళాఖండం ఉండాలి.", lang: "te" },
    { text: "చెక్క పనిలో జీవం ఉంటుంది.", lang: "te" },
    { text: "మీ కలల ఇంటిని నిజం చేసుకోండి.", lang: "te" },
    { text: "సాంప్రదాయం మరియు ఆధునికత కలయికే మా డిజైన్.", lang: "te" },
    { text: "ఇంటి అందం, ఇంటి సభ్యుల ఆనందం.", lang: "te" },
    { text: "మన్నికైన చెక్క, తరగని అందం.", lang: "te" },
    { text: "ప్రకృతి ఒడిలో ఉన్న అనుభూతిని పొందండి.", lang: "te" },
    { text: "డిజైన్ అనేది ఒక భాష.", lang: "te" },
    { text: "మీ ఇల్లు, మీ సామ్రాజ్యం.", lang: "te" },
    { text: "అద్భుతమైన ఇంటీరియర్స్, అంతులేని ఆనందం.", lang: "te" }
];

const Connect = () => {
    const { isDark } = useTheme();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentQuoteIndices, setCurrentQuoteIndices] = useState([0, 1, 2]);
    const [youtubeVideos, setYoutubeVideos] = useState({ shorts: null, video: null });
    const [showYouTubePostModal, setShowYouTubePostModal] = useState(false);

    // Redirect Modal State
    const [redirectModal, setRedirectModal] = useState({
        isOpen: false,
        platform: '',
        url: '',
        icon: null
    });

    // Expert SEO Configuration
    const pageTitle = "Connect with Vahini D'Interio | Social Media & Community";
    const pageDescription = "Join Vahini D'Interio's vibrant community across Facebook, Instagram, YouTube, Pinterest, and LinkedIn. Get daily interior design inspiration, behind-the-scenes content, and project updates from Narasaraopet's premier craftsmen.";
    const pageUrl = "https://www.vahinidinterio.com/connect";
    const socialImage = "https://www.vahinidinterio.com/social-share-image.jpg";
    const pageKeywords = "Vahini D'Interio social media, interior design inspiration, Facebook page Narasaraopet, Instagram interiors, YouTube home tours, Pinterest design ideas, LinkedIn professional network, community updates";

    // Comprehensive Social Media Schema
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.vahinidinterio.com/connect#webpage",
                "url": "https://www.vahinidinterio.com/connect",
                "name": "Connect with Vahini D'Interio - Social Media Hub",
                "description": pageDescription,
                "isPartOf": {
                    "@id": "https://www.vahinidinterio.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://www.vahinidinterio.com/connect#breadcrumb"
                },
                "about": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.vahinidinterio.com/connect#breadcrumb",
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
                        "name": "Connect",
                        "item": "https://www.vahinidinterio.com/connect"
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
                "@type": "ItemList",
                "@id": "https://www.vahinidinterio.com/connect#socialmedialist",
                "name": "Vahini D'Interio Social Media Channels",
                "description": "Our official social media presence across multiple platforms",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item": {
                            "@type": "ProfilePage",
                            "url": "https://www.facebook.com/profile.php?id=61583376973962",
                            "name": "Facebook - Vahini D'Interio",
                            "about": {
                                "@id": "https://www.vahinidinterio.com/#organization"
                            }
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "item": {
                            "@type": "ProfilePage",
                            "url": "https://www.instagram.com/vahinidinterio/",
                            "name": "Instagram - Visual Journey & Project Showcase",
                            "about": {
                                "@id": "https://www.vahinidinterio.com/#organization"
                            }
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "item": {
                            "@type": "ProfilePage",
                            "url": "https://www.youtube.com/@VahiniDInterio",
                            "name": "YouTube - Home Tours & Design Tips",
                            "about": {
                                "@id": "https://www.vahinidinterio.com/#organization"
                            }
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "item": {
                            "@type": "ProfilePage",
                            "url": "https://in.pinterest.com/vahinidinterio/",
                            "name": "Pinterest - Design Inspiration Board",
                            "about": {
                                "@id": "https://www.vahinidinterio.com/#organization"
                            }
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "item": {
                            "@type": "ProfilePage",
                            "url": "https://www.linkedin.com/in/vahinidinterio",
                            "name": "LinkedIn - Professional Network",
                            "about": {
                                "@id": "https://www.vahinidinterio.com/#organization"
                            }
                        }
                    }
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

    // Pinterest Script Injection
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//assets.pinterest.com/js/pinit.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Suppress Facebook console errors
    useEffect(() => {
        const originalError = console.error;
        console.error = (...args) => {
            const errorString = args.join(' ');
            if (
                errorString.includes('facebook') ||
                errorString.includes('fburl.com') ||
                errorString.includes('ErrorUtils') ||
                errorString.includes('Could not find element')
            ) {
                return;
            }
            originalError.apply(console, args);
        };

        return () => {
            console.error = originalError;
        };
    }, []);

    // Parallax Effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Quote Rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndices(prev => prev.map(() => Math.floor(Math.random() * QUOTES.length)));
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    // Fetch YouTube Videos or use fallback
    useEffect(() => {
        const fetchVideos = async () => {
            const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

            // Always set fallback first, then try to fetch real data
            const fallbackData = {
                shorts: {
                    id: { videoId: 'jTH5xtuIOEQ' }, // Valid Short ID from channel
                    snippet: { title: 'Vahini D’Interio – Premium Interior & Woodwork Branding' }
                },
                video: {
                    id: { videoId: 'jTH5xtuIOEQ' }, // Using Short as fallback video since no long videos exist
                    snippet: { title: 'Vahini D’Interio – Premium Interior & Woodwork Branding' }
                }
            };

            setYoutubeVideos(fallbackData);

            if (!API_KEY) return;

            try {
                // Use your specific Channel ID directly
                const channelId = 'UCym6C7lzUKDqddk-50086FQ';

                // Fetch latest video from YOUR channel
                const videoRes = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1&type=video`);

                // Fetch latest short from YOUR channel (videos under 60 seconds)
                const shortsRes = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5&type=video&videoDuration=short`);

                const videoData = videoRes.ok ? await videoRes.json() : null;
                const shortsData = shortsRes.ok ? await shortsRes.json() : null;

                // Update if we got real data from YOUR channel
                if (videoData?.items?.[0] || shortsData?.items?.[0]) {
                    setYoutubeVideos({
                        video: videoData?.items?.[0] || fallbackData.video,
                        shorts: shortsData?.items?.[0] || fallbackData.shorts
                    });
                }
            } catch (error) {
                console.log('Using fallback YouTube content');
                // Fallback is already set
            }
        };

        fetchVideos();
    }, []);

    const handleCardClick = (item) => {
        if (item.type === 'iframe' || item.type === 'instagram-embed' || item.type === 'pinterest-widget') return;

        if (item.type === 'youtube-post') {
            setShowYouTubePostModal(true);
            return;
        }

        setRedirectModal({
            isOpen: true,
            platform: item.platform,
            url: item.url,
            icon: item.icon
        });
    };

    const handleRedirectConfirm = () => {
        if (redirectModal.url) {
            window.open(redirectModal.url, '_blank', 'noopener,noreferrer');
            setRedirectModal({ ...redirectModal, isOpen: false });
        }
    };

    const bgIcons = [Sofa, Lamp, Tv, DoorOpen, Armchair, BedDouble];

    const getPremiumGradient = (variant = 1) => {
        if (isDark) {
            return variant === 1
                ? "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)"
                : "linear-gradient(135deg, #2a2a2a 0%, #111111 100%)";
        } else {
            return variant === 1
                ? "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)"
                : "linear-gradient(135deg, #fdfbf7 0%, #f5f0e6 100%)";
        }
    };

    const gridItems = [
        {
            id: 'facebook',
            type: 'iframe',
            platform: 'Facebook',
            embedUrl: `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61583376973962&tabs=timeline&width=800&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`,
            colSpan: 2,
            rowSpan: 2
        },
        {
            id: 'yt-shorts',
            type: youtubeVideos.shorts ? 'video' : 'card',
            platform: 'YouTube Shorts',
            url: 'https://www.youtube.com/@VahiniDInterio/shorts',
            embedUrl: youtubeVideos.shorts ? `https://www.youtube.com/embed/${youtubeVideos.shorts.id.videoId}` : null,
            description: "Quick Tours & Tips",
            icon: <Video size={20} />,
            colSpan: 1,
            rowSpan: 2
        },
        {
            id: 'quote-1',
            type: 'text',
            quoteIndex: 0,
            icon: <Trees size={20} />,
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 'yt-videos',
            type: youtubeVideos.video ? 'video' : 'card',
            platform: 'YouTube Videos',
            url: 'https://www.youtube.com/@VahiniDInterio/videos',
            embedUrl: youtubeVideos.video ? `https://www.youtube.com/embed/${youtubeVideos.video.id.videoId}` : null,
            description: "Full Home Tours",
            icon: <Youtube size={20} />,
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 'yt-community',
            type: 'youtube-post',
            platform: 'YouTube Posts',
            url: 'http://youtube.com/post/UgkxL99kw-RbvhFx71zU-nhuC-LiiAzKEsCa',
            imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
            description: "Community updates & behind-the-scenes",
            icon: <FileText size={20} />,
            colSpan: 1,
            rowSpan: 2
        },
        {
            id: 'instagram',
            type: 'instagram-embed',
            platform: 'Instagram',
            url: 'https://www.instagram.com/p/DRSHvxlkqSF/',
            embedUrl: 'https://www.instagram.com/p/DRSHvxlkqSF/embed',
            description: "Visual Journey",
            icon: <Instagram size={20} />,
            colSpan: 1,
            rowSpan: 2
        },
        {
            id: 'quote-2',
            type: 'text',
            quoteIndex: 1,
            icon: <Quote size={20} />,
            colSpan: 2,
            rowSpan: 1
        },
        {
            id: 'whatsapp',
            type: 'card',
            platform: 'WhatsApp',
            url: 'https://chat.whatsapp.com/DrnQVcVSCDAJVT1AgQoe98',
            description: "Daily Updates",
            icon: <MessageCircle size={20} />,
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 'arattai',
            type: 'card',
            platform: 'Arattai',
            url: 'https://aratt.ai/@vahinidinterio',
            description: "Secure Community",
            icon: <MessageCircle size={20} />,
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 'linkedin',
            type: 'card',
            platform: 'LinkedIn',
            url: 'https://www.linkedin.com/in/vahinidinterio',
            description: "Professional Network",
            icon: <Linkedin size={20} />,
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 'quote-3',
            type: 'text',
            quoteIndex: 2,
            icon: <Trees size={20} />,
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 'pinterest',
            type: 'pinterest-widget',
            platform: 'Pinterest',
            url: 'https://in.pinterest.com/vahinidinterio/pins/',
            description: "Pin Inspiration",
            icon: <Globe size={20} />,
            colSpan: 1,
            rowSpan: 2
        },
        {
            id: 'quote-4',
            type: 'text',
            quoteIndex: 0,
            icon: <Quote size={20} />,
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 'quote-5',
            type: 'text',
            quoteIndex: 1,
            icon: <Trees size={20} />,
            colSpan: 1,
            rowSpan: 1
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-32 md:pb-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
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

            {/* Background Animation */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(12)].map((_, i) => {
                    const Icon = bgIcons[i % bgIcons.length];
                    const movementFactor = (i % 3 + 1) * 20;
                    return (
                        <motion.div
                            key={i}
                            className="absolute opacity-5"
                            style={{
                                color: V.gold,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: mousePosition.x * movementFactor,
                                y: mousePosition.y * movementFactor,
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                x: { type: "spring", stiffness: 1, damping: 60, mass: 1 },
                                y: { type: "spring", stiffness: 1, damping: 60, mass: 1 },
                                rotate: { duration: 10 + i, repeat: Infinity, ease: "easeInOut" }
                            }}
                        >
                            <Icon size={Math.random() * 100 + 50} strokeWidth={1} />
                        </motion.div>
                    );
                })}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                        Vahini Connect
                    </h1>
                    <p className="text-base md:text-xl max-w-2xl mx-auto opacity-80 px-4" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                        Join our digital community. Experience the art of living through our lens.
                    </p>
                </motion.div>

                {/* Masonry Grid - Responsive Unique Layout for ALL Devices */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]">
                    {gridItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            onClick={() => handleCardClick(item)}
                            className={`relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer 
                                ${item.colSpan === 2 ? 'col-span-2' : 'col-span-1'} 
                                ${item.rowSpan === 2 ? 'row-span-2' : 'row-span-1'}
                            `}
                            style={{
                                background: item.type === 'text'
                                    ? (isDark ? '#222' : '#f0f0f0')
                                    : getPremiumGradient(index % 2),
                                border: `1px solid ${isDark ? 'rgba(255,215,0,0.1)' : 'rgba(0,0,0,0.05)'}`,
                                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.05)'
                            }}
                        >
                            {/* IFRAME TYPE (Facebook) */}
                            {item.type === 'iframe' && (
                                <div className="w-full h-full bg-white">
                                    <iframe
                                        src={item.embedUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 'none', overflow: 'hidden' }}
                                        scrolling="no"
                                        frameBorder="0"
                                        allowFullScreen={true}
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        title={`${item.platform} Feed`}
                                    />
                                </div>
                            )}

                            {/* VIDEO TYPE (YouTube) */}
                            {item.type === 'video' && (
                                <div className="w-full h-full bg-black">
                                    <iframe
                                        src={item.embedUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 'none' }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={`${item.platform} Player`}
                                    />
                                </div>
                            )}

                            {/* INSTAGRAM EMBED TYPE */}
                            {item.type === 'instagram-embed' && (
                                <div className="w-full h-full bg-white overflow-auto">
                                    <iframe
                                        src={item.embedUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 'none', minHeight: '400px' }}
                                        frameBorder="0"
                                        scrolling="no"
                                        allowtransparency="true"
                                        title={`${item.platform} Post`}
                                    />
                                </div>
                            )}

                            {/* YOUTUBE POST TYPE */}
                            {item.type === 'youtube-post' && (
                                <div className="block w-full h-full relative overflow-hidden group">
                                    {/* Background Image with Zoom Effect */}
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url(${item.imageUrl || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'})`
                                        }}
                                    />

                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-500" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center relative z-10">
                                        {/* Icon - Corner on Mobile, Center on Desktop */}
                                        <div className="absolute top-3 right-3 md:static md:mb-4 p-2 md:p-4 rounded-full border transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                                            style={{
                                                borderColor: V.gold,
                                                background: 'rgba(255,255,255,0.1)',
                                                backdropFilter: 'blur(5px)',
                                                color: V.gold
                                            }}>
                                            {React.cloneElement(item.icon, { size: window.innerWidth < 768 ? 16 : 28 })}
                                        </div>

                                        <h3 className="text-sm md:text-xl font-light mb-1 md:mb-2 text-white mt-4 md:mt-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                            {item.platform}
                                        </h3>

                                        <div className="mb-2 md:mb-4 px-3 py-1 md:px-4 md:py-2 rounded-lg" style={{ background: 'rgba(255,215,0,0.15)', backdropFilter: 'blur(5px)' }}>
                                            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5 md:mb-1" style={{ color: V.gold }}>
                                                Latest Post
                                            </p>
                                            <p className="text-xs md:text-sm opacity-90 italic text-gray-200 line-clamp-1 md:line-clamp-none">
                                                {item.description}
                                            </p>
                                        </div>

                                        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest border-b pb-1 transition-all group-hover:gap-3"
                                            style={{
                                                borderColor: V.gold,
                                                color: V.gold
                                            }}>
                                            View Post <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* PINTEREST WIDGET TYPE */}
                            {item.type === 'pinterest-widget' && (
                                <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden relative">
                                    <a
                                        data-pin-do="embedPin"
                                        data-pin-width="medium"
                                        data-pin-terse="true"
                                        href="https://in.pinterest.com/pin/1000925085945829162/"
                                    >
                                    </a>
                                </div>
                            )}

                            {/* CARD TYPE (WhatsApp, LinkedIn, etc) */}
                            {item.type === 'card' && (
                                <div className="block w-full h-full relative overflow-hidden group">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `linear-gradient(45deg, transparent, ${V.gold}10)` }}
                                    />

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                                        {/* Icon - Corner on Mobile, Center on Desktop */}
                                        <div className="absolute top-3 right-3 md:static md:mb-4 p-2 md:p-4 rounded-full border transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                                            style={{
                                                borderColor: V.gold,
                                                background: isDark ? 'rgba(255,255,255,0.03)' : 'white',
                                                color: V.gold
                                            }}>
                                            {React.cloneElement(item.icon, { size: window.innerWidth < 768 ? 16 : 28 })}
                                        </div>

                                        <h3 className="text-sm md:text-xl font-light mb-1 md:mb-2 mt-4 md:mt-0" style={{ fontFamily: "'Cormorant Garamond', serif", color: isDark ? '#fff' : '#000' }}>
                                            {item.platform}
                                        </h3>

                                        <p className="text-xs md:text-sm opacity-60 mb-3 md:mb-6 font-sans tracking-wide line-clamp-2" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                            {item.description}
                                        </p>

                                        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest border-b pb-1 transition-all group-hover:gap-3"
                                            style={{
                                                borderColor: V.gold,
                                                color: V.gold
                                            }}>
                                            View <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* TEXT BLOCK TYPE (Quotes) */}
                            {item.type === 'text' && (
                                <div className="w-full h-full p-4 md:p-6 flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}
                                    />

                                    <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-20" style={{ color: V.gold }}>
                                        {React.cloneElement(item.icon, { size: 16 })}
                                    </div>

                                    <div className="relative z-10 flex-grow flex items-center justify-center text-center">
                                        <AnimatePresence mode='wait'>
                                            <motion.div
                                                key={currentQuoteIndices[item.quoteIndex]}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-full"
                                            >
                                                <Quote size={16} className="mb-2 opacity-50 mx-auto md:hidden" style={{ color: V.gold }} />
                                                <Quote size={20} className="mb-3 opacity-50 hidden md:block" style={{ color: V.gold }} />

                                                {/* Responsive Font Size for Quotes */}
                                                <p className="text-xs sm:text-sm md:text-xl font-medium leading-relaxed italic line-clamp-4 md:line-clamp-none"
                                                    style={{ fontFamily: "'Cormorant Garamond', serif", color: isDark ? '#e0e0e0' : '#333' }}>
                                                    "{QUOTES[currentQuoteIndices[item.quoteIndex]].text}"
                                                </p>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <div className="relative z-10 mt-2 md:mt-4 text-center md:text-left">
                                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-50" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                            — Vahini Philosophy
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* YouTube Post Modal */}
            <AnimatePresence>
                {showYouTubePostModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.9)' }}
                        onClick={() => setShowYouTubePostModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
                            style={{
                                background: isDark ? '#1a1a1a' : '#ffffff',
                                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${V.gold}30`
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowYouTubePostModal(false)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all hover:scale-110"
                                style={{
                                    background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
                                    border: `1px solid ${V.gold}`,
                                    color: V.gold
                                }}
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Header */}
                            <div className="p-6 border-b" style={{ borderColor: isDark ? 'rgba(255,215,0,0.1)' : 'rgba(0,0,0,0.1)' }}>
                                <h2 className="text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                                    YouTube Community Post
                                </h2>
                                <p className="text-sm mt-2 opacity-70" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                    Click the button below to view the post on YouTube
                                </p>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 text-center">
                                <div className="mb-6">
                                    <FileText size={64} style={{ color: V.gold, margin: '0 auto', opacity: 0.5 }} />
                                </div>

                                <p className="text-lg mb-6" style={{ color: isDark ? '#e0e0e0' : '#333' }}>
                                    Community updates & behind-the-scenes content
                                </p>

                                <a
                                    href="http://youtube.com/post/UgkxL99kw-RbvhFx71zU-nhuC-LiiAzKEsCa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all hover:scale-105"
                                    style={{
                                        background: V.gold,
                                        color: '#000',
                                        fontWeight: 'bold',
                                        textDecoration: 'none',
                                        boxShadow: `0 4px 20px ${V.gold}40`
                                    }}
                                >
                                    <Youtube size={24} />
                                    Open Post on YouTube
                                    <ExternalLink size={20} />
                                </a>

                                <p className="text-xs mt-6 opacity-50" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                    YouTube community posts cannot be embedded directly
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Redirect Modal */}
            <AnimatePresence>
                {redirectModal.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)' }}
                        onClick={() => setRedirectModal({ ...redirectModal, isOpen: false })}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md rounded-2xl overflow-hidden p-8 text-center"
                            style={{
                                background: isDark ? '#1a1a1a' : '#ffffff',
                                border: `1px solid ${V.gold}30`,
                                boxShadow: `0 20px 60px rgba(0,0,0,0.5)`
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-6 p-4 rounded-full inline-block"
                                style={{ background: isDark ? 'rgba(255,215,0,0.1)' : 'rgba(255,215,0,0.1)', color: V.gold }}>
                                {redirectModal.icon ? React.cloneElement(redirectModal.icon, { size: 48 }) : <ExternalLink size={48} />}
                            </div>

                            <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                                Leaving Vahini D'Interio
                            </h3>

                            <p className="mb-8 opacity-70" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                You are being redirected to our {redirectModal.platform} page.
                            </p>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => setRedirectModal({ ...redirectModal, isOpen: false })}
                                    className="px-6 py-2 rounded-lg transition-colors"
                                    style={{
                                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                        color: isDark ? V.offGold : V.nearBlack
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRedirectConfirm}
                                    className="px-6 py-2 rounded-lg font-bold transition-transform hover:scale-105 flex items-center gap-2"
                                    style={{
                                        background: V.gold,
                                        color: '#000'
                                    }}
                                >
                                    Continue <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Connect;
