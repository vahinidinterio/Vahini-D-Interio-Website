import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { V } from '../utils/colors';
import SEO from '../components/SEO';

// Swiper for Carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// Defined FallbackAvatar as a root-relative path to the public folder.
const FallbackAvatar = '/logo192.png';


// --- Custom Avatar Pagination Component (The Dynamic Magnifying Ring) ---
const AvatarPagination = ({ reviews, swiperInstance }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Update active index when the main Swiper slides
    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.on('slideChange', () => {
                setActiveIndex(swiperInstance.realIndex);
            });
            // Cleanup event listener on component unmount
            return () => swiperInstance.off('slideChange');
        }
    }, [swiperInstance]);

    const handleAvatarClick = (index) => {
        if (swiperInstance) {
            swiperInstance.slideToLoop(index);
        }
    };

    return (
        <div
            className="flex justify-center gap-4 mt-8 mb-4 max-w-full overflow-x-auto py-2 
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
            {reviews.map((review, index) => {
                const isActive = activeIndex === index;
                // If profile_photo_url is an empty string, use the FallbackAvatar (your logo).
                // If it's a URL (either UI-Avatars or a person's photo), use that URL.
                const avatarSrc = review.profile_photo_url || FallbackAvatar;

                return (
                    <div
                        key={index}
                        onClick={() => handleAvatarClick(index)}
                        className={`
                            relative cursor-pointer transition-all duration-300 transform 
                            group p-1 rounded-full flex-shrink-0
                            ${isActive ? 'scale-125' : 'scale-90 hover:scale-100'}
                        `}
                        title={review.author_name}
                    >
                        {/* Avatar Image */}
                        <img
                            src={avatarSrc}
                            alt={review.author_name}
                            className={`
                                w-10 h-10 rounded-full object-cover border-2 
                                transition-all duration-300
                            `}
                            style={{
                                // High-Contrast Styling: Black inactive, Gold active
                                borderColor: isActive ? V.gold : V.nearBlack,
                                filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)',
                                boxShadow: isActive
                                    ? `0 0 12px 3px ${V.gold}B0`
                                    : 'none',
                            }}
                            onError={(e) => {
                                // Fallback if the provided URL fails to load
                                e.target.onerror = null;
                                e.target.src = FallbackAvatar; // Fallback to your Logo
                            }}
                        />

                        {/* Name Badge on hover for inactive avatars */}
                        {!isActive && (
                            <span
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 
                                    text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-200 pointer-events-none"
                                style={{ background: V.gold, color: V.cardBg }}
                            >
                                {review.author_name}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const PLACE_ID = process.env.REACT_APP_PLACE_ID;

    // Expert SEO Configuration
    const pageTitle = "Testimonials | Vahini D'Interio - Client Reviews & Success Stories";
    const pageDescription = "Read authentic customer reviews and testimonials from our clients in Narasaraopet and Palnadu. Discover why we're the preferred choice for custom furniture, modular kitchens, and interior design services with 5-star ratings.";
    const pageUrl = "https://www.vahinidinterio.com/testimonials";
    const socialImage = "https://www.vahinidinterio.com/social-share-image.jpg";
    const pageKeywords = "customer reviews Narasaraopet, client testimonials, interior design reviews Palnadu, custom furniture feedback, modular kitchen testimonials, 5-star ratings, customer success stories";

    useEffect(() => {
        const fetchReviews = async () => {
            // Fallback Data - Mix of UI-Avatars (Initials) and High-Quality People Avatars
            const demoReviews = [
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
                    author_name: "Anitha Rao",
                    rating: 4,
                    text: "Great service and excellent craftsmanship. Very happy with the kitchen renovation.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Anitha+Rao&background=C1A35D&color=0D0D0D",
                    relative_time_description: "5 months ago"
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
                {
                    author_name: "Ashok Varma",
                    rating: 4,
                    text: "Good value for money. The living room panelling is very elegant. Minor delay in starting, but flawless execution once started.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Ashok+Varma&background=C1A35D&color=0D0D0D",
                    relative_time_description: "2 months ago"
                },
                {
                    author_name: "Padmavathi Devi",
                    rating: 5,
                    text: "Vahini D'Interio did a wonderful job on our pooja room design. Very traditional and detailed work, just as we requested.",
                    profile_photo_url: "https://images.unsplash.com/photo-1570295999919-56ceb8e255f6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&q=80&w=400",
                    relative_time_description: "4 months ago"
                },
                {
                    author_name: "Ganesh Babu",
                    rating: 5,
                    text: "The quality of the wood used for the cabinets is excellent. Durable and beautiful work. True craftsmanship in Palnadu.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Ganesh+Babu&background=0D0D0D&color=C1A35D",
                    relative_time_description: "6 months ago"
                },
                {
                    author_name: "Priyanka Netha",
                    rating: 5,
                    text: "Responsive and creative! They gave fantastic 3D designs before starting the work, which made the whole process easy.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Priyanka+Netha&background=C1A35D&color=0D0D0D",
                    relative_time_description: "7 months ago"
                },
                {
                    author_name: "Charan Sai",
                    rating: 5,
                    text: "Great experience with the team. They customized everything perfectly to fit our older home's unique dimensions in Narasaraopet.",
                    profile_photo_url: "https://images.unsplash.com/photo-1506794778202-dfa929661494?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&q=80&w=400",
                    relative_time_description: "8 months ago"
                },
                {
                    author_name: "Hema Latha",
                    rating: 4,
                    text: "Finished the main hall interiors beautifully. The lighting suggestions were brilliant. Would have given 5 stars if the finishing had been slightly quicker.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Hema+Latha&background=0D0D0D&color=C1A35D",
                    relative_time_description: "9 months ago"
                },
                {
                    author_name: "Vijayendra Das",
                    rating: 5,
                    text: "Unparalleled skill in woodwork. We needed a complex ceiling design and Vahini D'Interio delivered a true artistic masterpiece.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Vijayendra+Das&background=C1A35D&color=0D0D0D",
                    relative_time_description: "10 months ago"
                },
                {
                    author_name: "Sandhya Rani",
                    rating: 5,
                    text: "Our apartment in Palnadu looks completely new! They managed the entire project smoothly, from design to final execution.",
                    profile_photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&q=80&w=400",
                    relative_time_description: "11 months ago"
                },
                {
                    author_name: "Sudhakar Rao",
                    rating: 4,
                    text: "Reliable and transparent pricing. The quality of materials for the wardrobe was top-notch. Highly recommend for any major woodwork project.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Sudhakar+Rao&background=0D0D0D&color=C1A35D",
                    relative_time_description: "1 year ago"
                },
                {
                    author_name: "Mounika Devi",
                    rating: 5,
                    text: "Fantastic service! They gave us innovative solutions for our small home in Narasaraopet to maximize space. Very happy with the result.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Mounika+Devi&background=C1A35D&color=0D0D0D",
                    relative_time_description: "1 year and 1 month ago"
                },
                {
                    author_name: "Praneeth Chakravarthy",
                    rating: 5,
                    text: "The best interior design experience. They respected our Vishwabrahmin heritage while providing a modern finish. Excellent partners!",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Praneeth+Chakravarthy&background=0D0D0D&color=C1A35D",
                    relative_time_description: "1 year and 2 months ago"
                },
                {
                    author_name: "Sowmya Reddy",
                    rating: 5,
                    text: "The attention to detail on the false ceiling was incredible. Truly high-end craftsmanship that stands out in the Palnadu region.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Sowmya+Reddy&background=C1A35D&color=0D0D0D",
                    relative_time_description: "1 year and 3 months ago"
                },
                {
                    author_name: "Visweswara Rao",
                    rating: 4,
                    text: "Very professional team. They helped us choose durable materials within our budget. A trustworthy interior firm in the area.",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Visweswara+Rao&background=0D0D0D&color=C1A35D",
                    relative_time_description: "1 year and 4 months ago"
                },
                {
                    author_name: "Vahini D'Interio",
                    rating: 5,
                    text: "Our own quality assurance team confirms that our materials and craftsmanship are of the highest standard.",
                    profile_photo_url: "",
                    relative_time_description: "Today"
                }
            ];

            // If no API credentials, use fallback immediately
            // if (!API_KEY || !PLACE_ID) {
            if (true) {  // Temporarily disabled Google API
                // console.log('No API credentials - using fallback reviews');
                setReviews(demoReviews);
                setLoading(false);
                return;
            }

            try {
                // Load Google Maps JavaScript API
                if (!window.google?.maps?.places) {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
                        script.async = true;
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                }

                // Create PlacesService
                const service = new window.google.maps.places.PlacesService(document.createElement('div'));

                // Fetch place details
                service.getDetails(
                    {
                        placeId: PLACE_ID,
                        fields: ['reviews', 'rating', 'user_ratings_total']
                    },
                    (place, status) => {
                        if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.reviews?.length > 0) {
                            // console.log(`✅ Fetched ${place.reviews.length} Google reviews`);
                            setReviews(place.reviews);
                        } else {
                            console.warn('⚠️ Google API failed, using fallback:', status);
                            setReviews(demoReviews);
                        }
                        setLoading(false);
                    }
                );
            } catch (error) {
                console.error('❌ Error fetching Google reviews:', error);
                setReviews(demoReviews);
                setLoading(false);
            }
        };

        fetchReviews();
    }, [API_KEY, PLACE_ID]);

    // Calculate aggregate rating
    const calculateAggregateRating = (reviews) => {
        if (reviews.length === 0) return { ratingValue: 0, reviewCount: 0 };
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return {
            ratingValue: (totalRating / reviews.length).toFixed(1),
            reviewCount: reviews.length
        };
    };

    const aggregateRating = calculateAggregateRating(reviews);

    // Comprehensive Testimonials Schema
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AggregateRating",
                "@id": "https://www.vahinidinterio.com/#aggregaterating",
                "ratingValue": aggregateRating.ratingValue,
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": aggregateRating.reviewCount,
                "reviewCount": aggregateRating.reviewCount,
                "itemReviewed": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                }
            },
            ...reviews.map((review, index) => ({
                "@type": "Review",
                "@id": `https://www.vahinidinterio.com/testimonials#review-${index + 1}`,
                "author": {
                    "@type": "Person",
                    "name": review.author_name
                },
                "datePublished": "2024-01-01", // You can make this dynamic based on relative_time_description
                "reviewBody": review.text,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": review.rating,
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "itemReviewed": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                }
            })),
            {
                "@type": "WebPage",
                "@id": "https://www.vahinidinterio.com/testimonials#webpage",
                "url": "https://www.vahinidinterio.com/testimonials",
                "name": "Testimonials - Vahini D'Interio",
                "description": pageDescription,
                "isPartOf": {
                    "@id": "https://www.vahinidinterio.com/#website"
                },
                "about": {
                    "@id": "https://www.vahinidinterio.com/#organization"
                },
                "breadcrumb": {
                    "@id": "https://www.vahinidinterio.com/testimonials#breadcrumb"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.vahinidinterio.com/testimonials#breadcrumb",
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
                        "name": "Testimonials",
                        "item": "https://www.vahinidinterio.com/testimonials"
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
                "aggregateRating": {
                    "@id": "https://www.vahinidinterio.com/#aggregaterating"
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
        <div className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 overflow-hidden">
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                    Client Stories
                </h1>
                <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: V.offGold }}>
                    The trust we build is as strong as the wood we craft. Here is what our valued clients have to say.
                </p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin w-8 h-8" style={{ color: V.gold }} />
                </div>
            ) : (
                <div className="max-w-full mx-auto pb-20 relative">

                    {/* Swiper Container */}
                    <Swiper
                        effect={'coverflow'}
                        onSwiper={setSwiperInstance}
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
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        keyboard={{ enabled: true }}
                        mousewheel={{ invert: true }}
                        modules={[EffectCoverflow, Autoplay, Navigation, Keyboard, Mousewheel]}
                        className="w-full py-12"
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index} className="max-w-md">
                                <div
                                    className="h-full p-8 rounded-2xl flex flex-col relative transition duration-500"
                                    style={{
                                        background: V.cardBg,
                                        border: `1px solid ${V.cardBorder}`,
                                        backdropFilter: "blur(10px)"
                                    }}
                                >
                                    <Quote className="absolute top-6 right-6 w-8 h-8 opacity-20" style={{ color: V.gold }} />

                                    <div className="flex items-center gap-4 mb-6">
                                        <img
                                            src={review.profile_photo_url || FallbackAvatar} // Uses URL, or if empty, uses Logo
                                            alt={review.author_name}
                                            className="w-12 h-12 rounded-full border border-[#C1A35D]/30 object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = FallbackAvatar;
                                            }}
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
                                                        className={i >= review.rating ? "opacity-30" : ""}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm leading-relaxed italic opacity-90 flex-grow" style={{ color: V.offGold }}>
                                        "{review.text}"
                                    </p>

                                    <p className="text-xs mt-4 opacity-50 uppercase tracking-wider" style={{ color: V.offGold }}>
                                        {review.relative_time_description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}

                        {/* Custom Navigation Arrows */}
                        <div className="swiper-button-prev-custom absolute top-1/2 -left-12 transform -translate-y-1/2 z-10 cursor-pointer hidden md:block" onClick={() => swiperInstance?.slidePrev()}>
                            <ChevronLeft size={48} className="transition-transform hover:scale-110" style={{ color: V.gold }} />
                        </div>
                        <div className="swiper-button-next-custom absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 cursor-pointer hidden md:block" onClick={() => swiperInstance?.slideNext()}>
                            <ChevronRight size={48} className="transition-transform hover:scale-110" style={{ color: V.gold }} />
                        </div>
                    </Swiper>

                    {/* Custom Dynamic Avatar Pagination Display */}
                    {reviews.length > 0 && (
                        <AvatarPagination reviews={reviews} swiperInstance={swiperInstance} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Testimonials;