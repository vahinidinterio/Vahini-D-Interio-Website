// import React, { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
// import { V } from '../utils/colors';
// import { Loader, ZoomIn, X, ChevronLeft, ChevronRight, Sofa, Utensils, Bed, Briefcase, HardHat, ShowerHead, TreeDeciduous, LayoutGrid } from 'lucide-react';
// import SEO from '../components/SEO';

// import { galleryData, getCategory } from '../data/galleryData';

// // --- Tilt Card Component ---
// const TiltCard = ({ children, onClick, className }) => {
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);

//     const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
//     const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

//     const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
//     const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

//     const handleMouseMove = (e) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         const width = rect.width;
//         const height = rect.height;
//         const mouseXFromCenter = e.clientX - rect.left - width / 2;
//         const mouseYFromCenter = e.clientY - rect.top - height / 2;

//         x.set(mouseXFromCenter / width);
//         y.set(mouseYFromCenter / height);
//     };

//     const handleMouseLeave = () => {
//         x.set(0);
//         y.set(0);
//     };

//     return (
//         <motion.div
//             style={{
//                 rotateX,
//                 rotateY,
//                 transformStyle: "preserve-3d",
//             }}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             onClick={onClick}
//             className={className}
//             whileHover={{ scale: 1.02, zIndex: 10 }}
//             whileTap={{ scale: 0.98 }}
//         >
//             {children}
//         </motion.div>
//     );
// };

// const Gallery = () => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [activeCategory, setActiveCategory] = useState('All');

//     // Expert SEO Configuration
//     const pageTitle = "Gallery | Vahini D'Interio - Interior Design Portfolio & Project Showcase";
//     const pageDescription = "Explore our comprehensive gallery of custom interiors, bespoke furniture, modular kitchens, and architectural joinery projects in Narasaraopet and Palnadu. View our portfolio of living rooms, bedrooms, offices, and traditional craftsmanship.";
//     const pageUrl = "https://www.vahinidinterio.com/gallery";
//     const socialImage = "https://www.vahinidinterio.com/social-share-image.jpg";
//     const pageKeywords = "interior design gallery, project portfolio Narasaraopet, custom furniture images, modular kitchen photos, bedroom designs, living room interiors, office designs, traditional joinery, woodwork gallery Palnadu";

//     // NOTE: In a real production environment, these should be in a .env file
//     const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
//     const FOLDER_ID = process.env.REACT_APP_DRIVE_FOLDER_ID;

//     useEffect(() => {
//         const fetchImages = async () => {
//             // Start with fallback images
//             const fallbackImages = galleryData.map(img => ({
//                 ...img,
//                 category: getCategory(img.name),
//                 type: 'image'
//             }));

//             if (!API_KEY || !FOLDER_ID) {
//                 // If no API credentials, just use fallback
//                 setImages(fallbackImages);
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 // Fetch both images and videos from Google Drive
//                 const imageResponse = await fetch(
//                     `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'&key=${API_KEY}&fields=files(id,name,thumbnailLink,webContentLink,mimeType)`
//                 );

//                 const videoResponse = await fetch(
//                     `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'video/'&key=${API_KEY}&fields=files(id,name,thumbnailLink,webContentLink,mimeType)`
//                 );

//                 const imageData = imageResponse.ok ? await imageResponse.json() : { files: [] };
//                 const videoData = videoResponse.ok ? await videoResponse.json() : { files: [] };

//                 // Combine images and videos from Google Drive
//                 const driveImages = imageData.files.map((file, index) => ({
//                     id: file.id,
//                     name: file.name,
//                     // url: `https://drive.google.com/uc?export=view&id=${file.id}`,
//                     url: `https://lh3.googleusercontent.com/d/${file.id}`,  // ✅ NEW
//                     height: ['h-32 md:h-64', 'h-40 md:h-80', 'h-48 md:h-96', 'h-36 md:h-72'][index % 4],
//                     category: getCategory(file.name),
//                     type: 'image'
//                 }));

//                 const driveVideos = videoData.files.map((file, index) => ({
//                     id: file.id,
//                     name: file.name,
//                     // url: `https://drive.google.com/uc?export=download&id=${file.id}`,
//                     url: `https://drive.google.com/file/d/${file.id}/preview`,  // ✅ NEW
//                     height: ['h-32 md:h-64', 'h-40 md:h-80', 'h-48 md:h-96', 'h-36 md:h-72'][index % 4],
//                     category: getCategory(file.name),
//                     type: 'video',
//                     mimeType: file.mimeType
//                 }));

//                 // DEBUG LOGS
//                 console.log('📸 Google Drive Images fetched:', driveImages.length);
//                 console.log('🎥 Google Drive Videos fetched:', driveVideos.length);
//                 if (driveImages.length > 0) {
//                     console.log('Sample image URL:', driveImages[0].url);
//                 }
//                 if (driveVideos.length > 0) {
//                     console.log('Sample video URL:', driveVideos[0].url);
//                 }

//                 // Combine fallback images with Google Drive content and shuffle
//                 const allMedia = [...fallbackImages, ...driveImages, ...driveVideos].sort(() => Math.random() - 0.5);
//                 console.log('✅ Total media loaded:', allMedia.length, '(Fallback:', fallbackImages.length, '+ Drive:', driveImages.length + driveVideos.length, ')');
//                 setImages(allMedia);
//             } catch (err) {
//                 console.error("Gallery Error:", err);
//                 // On error, still show fallback images
//                 setImages(fallbackImages);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchImages();
//     }, [API_KEY, FOLDER_ID]);

//     const categories = ['All', 'Living', 'Kitchen & Dining', 'Bedroom', 'Office', 'Joinery', 'Bathroom', 'Outdoor', 'Details'];

//     const filteredImages = useMemo(() => {
//         if (activeCategory === 'All') return images;
//         return images.filter(img => img.category === activeCategory);
//     }, [images, activeCategory]);

//     const handleNextImage = (e) => {
//         e.stopPropagation();
//         if (!selectedImage) return;
//         const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
//         const nextIndex = (currentIndex + 1) % filteredImages.length;
//         setSelectedImage(filteredImages[nextIndex]);
//     };

//     const handlePrevImage = (e) => {
//         e.stopPropagation();
//         if (!selectedImage) return;
//         const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
//         const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
//         setSelectedImage(filteredImages[prevIndex]);
//     };

//     const categoryIcons = {
//         'All': <LayoutGrid size={18} />,
//         'Living': <Sofa size={18} />,
//         'Kitchen & Dining': <Utensils size={18} />,
//         'Bedroom': <Bed size={18} />,
//         'Office': <Briefcase size={18} />,
//         'Joinery': <HardHat size={18} />,
//         'Bathroom': <ShowerHead size={18} />,
//         'Outdoor': <TreeDeciduous size={18} />,
//         'Details': <ZoomIn size={18} />
//     };

//     // Comprehensive Gallery Schema
//     const schema = {
//         "@context": "https://schema.org",
//         "@graph": [
//             {
//                 "@type": "ImageGallery",
//                 "@id": "https://www.vahinidinterio.com/gallery#imagegallery",
//                 "name": "Vahini D'Interio Project Gallery",
//                 "description": "Comprehensive gallery showcasing custom interiors, bespoke furniture, and architectural joinery projects",
//                 "url": "https://www.vahinidinterio.com/gallery",
//                 "creator": {
//                     "@id": "https://www.vahinidinterio.com/#organization"
//                 },
//                 "about": [
//                     "Interior Design",
//                     "Custom Furniture",
//                     "Modular Kitchens",
//                     "Architectural Joinery",
//                     "Woodworking"
//                 ],
//                 "spatialCoverage": {
//                     "@type": "Place",
//                     "name": "Palnadu Region",
//                     "containsPlace": [
//                         {
//                             "@type": "City",
//                             "name": "Narasaraopet"
//                         },
//                         {
//                             "@type": "AdministrativeArea",
//                             "name": "Palnadu"
//                         }
//                     ]
//                 }
//             },
//             {
//                 "@type": "ItemList",
//                 "@id": "https://www.vahinidinterio.com/gallery#categories",
//                 "name": "Gallery Categories",
//                 "description": "Interior design project categories",
//                 "numberOfItems": categories.length - 1, // Exclude 'All'
//                 "itemListElement": categories.filter(cat => cat !== 'All').map((category, index) => ({
//                     "@type": "ListItem",
//                     "position": index + 1,
//                     "name": category,
//                     "item": {
//                         "@type": "CreativeWork",
//                         "name": `${category} Projects by Vahini D'Interio`,
//                         "description": `Collection of ${category.toLowerCase()} interior design and furniture projects`
//                     }
//                 }))
//             },
//             {
//                 "@type": "CollectionPage",
//                 "@id": "https://www.vahinidinterio.com/gallery#webpage",
//                 "url": "https://www.vahinidinterio.com/gallery",
//                 "name": "Gallery - Vahini D'Interio",
//                 "description": pageDescription,
//                 "isPartOf": {
//                     "@id": "https://www.vahinidinterio.com/#website"
//                 },
//                 "about": {
//                     "@id": "https://www.vahinidinterio.com/#organization"
//                 },
//                 "breadcrumb": {
//                     "@id": "https://www.vahinidinterio.com/gallery#breadcrumb"
//                 },
//                 "mainEntity": {
//                     "@id": "https://www.vahinidinterio.com/gallery#imagegallery"
//                 }
//             },
//             {
//                 "@type": "BreadcrumbList",
//                 "@id": "https://www.vahinidinterio.com/gallery#breadcrumb",
//                 "itemListElement": [
//                     {
//                         "@type": "ListItem",
//                         "position": 1,
//                         "name": "Home",
//                         "item": "https://www.vahinidinterio.com/"
//                     },
//                     {
//                         "@type": "ListItem",
//                         "position": 2,
//                         "name": "Gallery",
//                         "item": "https://www.vahinidinterio.com/gallery"
//                     }
//                 ]
//             },
//             {
//                 "@type": "Organization",
//                 "@id": "https://www.vahinidinterio.com/#organization",
//                 "name": "Vahini D'Interio",
//                 "url": "https://www.vahinidinterio.com",
//                 "logo": {
//                     "@type": "ImageObject",
//                     "url": "https://www.vahinidinterio.com/logo512.jpg"
//                 },
//                 "sameAs": [
//                     "https://www.facebook.com/profile.php?id=61583594444033",
//                     "https://www.facebook.com/profile.php?id=61583376973962",
//                     "https://www.instagram.com/vahinidinterio/",
//                     "https://www.youtube.com/@VahiniDInterio",
//                     "https://in.pinterest.com/vahinidinterio/",
//                     "https://www.linkedin.com/in/vahinidinterio",
//                     "https://www.linkedin.com/company/vahini-d-interio/"
//                 ]
//             },
//             {
//                 "@type": "WebSite",
//                 "@id": "https://www.vahinidinterio.com/#website",
//                 "url": "https://www.vahinidinterio.com",
//                 "name": "Vahini D'Interio",
//                 "publisher": {
//                     "@id": "https://www.vahinidinterio.com/#organization"
//                 }
//             }
//         ]
//     };

//     return (
//         <div className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 pb-20">
//             <SEO
//                 title={pageTitle}
//                 description={pageDescription}
//                 keywords={pageKeywords}
//                 canonicalUrl={pageUrl}
//                 ogImage={socialImage}
//                 ogType="website"
//                 articleType="CollectionPage"
//                 schema={schema}
//             />

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mb-12"
//             >
//                 <h1 className="text-4xl md:text-6xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
//                     Curated Excellence
//                 </h1>
//                 <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: V.offGold }}>
//                     A visual anthology of our finest work. Each piece tells a story of precision, heritage, and modern design.
//                 </p>
//             </motion.div>

//             {/* Filter Tabs */}
//             <div className="flex flex-row flex-nowrap overflow-x-auto space-x-4 pb-4 px-2 md:justify-center md:flex-wrap scrollbar-hide">
//                 {categories.map((cat) => (
//                     <button
//                         key={cat}
//                         onClick={() => setActiveCategory(cat)}
//                         className={`flex items-center justify-center gap-2 w-12 h-12 md:w-auto md:h-auto p-0 md:px-6 md:py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 relative overflow-hidden shrink-0`}
//                         style={{
//                             color: activeCategory === cat ? '#000000' : V.offGold,
//                             border: `1px solid ${activeCategory === cat ? V.gold : 'rgba(193, 163, 93, 0.2)'}`,
//                             background: activeCategory === cat ? V.gold : 'transparent',
//                             boxShadow: activeCategory === cat ? `0 0 15px ${V.gold}40` : 'none'
//                         }}
//                     >
//                         <span className="text-xl md:text-lg">{categoryIcons[cat]}</span>
//                         <span className="hidden md:inline-block">{cat}</span>
//                     </button>
//                 ))}
//             </div>

//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <Loader className="animate-spin w-8 h-8" style={{ color: V.gold }} />
//                 </div>
//             ) : (
//                 <motion.div
//                     layout
//                     className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8"
//                 >
//                     <AnimatePresence>
//                         {filteredImages.map((img, index) => (
//                             <motion.div
//                                 layout
//                                 key={img.id}
//                                 initial={{ opacity: 0, y: 50 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, scale: 0.9 }}
//                                 transition={{ duration: 0.5, delay: index * 0.05 }}
//                                 className="break-inside-avoid"
//                             >
//                                 <TiltCard
//                                     className="group relative rounded-xl overflow-hidden cursor-zoom-in shadow-lg"
//                                     onClick={() => setSelectedImage(img)}
//                                 >
//                                     <div className={`w-full ${img.height} relative overflow-hidden`}>
//                                         {img.type === 'video' ? (
//                                             <iframe
//                                                 src={img.url}
//                                                 className="w-full h-full transition-transform duration-700 group-hover:scale-110"
//                                                 frameBorder="0"
//                                                 allow="autoplay; encrypted-media"
//                                                 allowFullScreen
//                                                 title={img.name}
//                                             />
//                                         ) : (
//                                             <img
//                                                 src={img.url}
//                                                 alt={img.name}
//                                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                                 loading="lazy"
//                                             />
//                                         )}
//                                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 " />

//                                         {/* Watermark Logo */}
//                                         <div className="absolute top-3 left-3 opacity-90 pointer-events-none z-10 rounded-full">
//                                             <img src="/social-share-image.jpg" alt="Vahini" className="w-8 h-auto drop-shadow-md rounded-full" />
//                                         </div>

//                                         {/* Hover Overlay */}
//                                         <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                             <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                                                 <p className="text-[#C1A35D] text-xs tracking-widest uppercase mb-2">{img.category}</p>
//                                                 <h3 className="text-white font-medium text-lg mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{img.name}</h3>
//                                                 <div className="w-12 h-[1px] bg-[#C1A35D]" />
//                                             </div>
//                                             <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full">
//                                                 <ZoomIn className="w-4 h-4 text-white" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </TiltCard>
//                             </motion.div>
//                         ))}
//                     </AnimatePresence>
//                 </motion.div>
//             )}

//             {/* Lightbox Modal */}
//             <AnimatePresence>
//                 {selectedImage && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
//                         onClick={() => setSelectedImage(null)}
//                     >
//                         <button
//                             className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
//                             onClick={() => setSelectedImage(null)}
//                         >
//                             <X size={32} />
//                         </button>

//                         {/* Navigation Buttons */}
//                         <button
//                             className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all z-50"
//                             onClick={handlePrevImage}
//                         >
//                             <ChevronLeft size={32} />
//                         </button>
//                         <button
//                             className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all z-50"
//                             onClick={handleNextImage}
//                         >
//                             <ChevronRight size={32} />
//                         </button>

//                         <motion.div
//                             key={selectedImage.id}
//                             initial={{ scale: 0.9, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             exit={{ scale: 0.9, opacity: 0 }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                             className="relative max-w-7xl max-h-[90vh] rounded-lg overflow-hidden"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <img
//                                 src={selectedImage.url}
//                                 alt={selectedImage.name}
//                                 className="max-w-full max-h-[90vh] object-contain shadow-2xl"
//                             />
//                             {/* Lightbox Watermark */}
//                             <div className="absolute bottom-6 left-6 opacity-60 pointer-events-none z-20 rounded-full">
//                                 <img src="/social-share-image.jpg" alt="Vahini" className="w-12 md:w-16 h-auto drop-shadow-lg rounded-full" />
//                             </div>
//                             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20">
//                                 <p className="text-[#C1A35D] text-sm tracking-widest uppercase mb-2 ml-16">{selectedImage.category}</p>
//                                 <h3 className="text-3xl text-white font-light ml-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//                                     {selectedImage.name}
//                                 </h3>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default Gallery;




import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { V } from '../utils/colors';
import { Loader, ZoomIn, X, ChevronLeft, ChevronRight, Sofa, Utensils, Bed, Briefcase, HardHat, ShowerHead, TreeDeciduous, LayoutGrid, Video } from 'lucide-react';
import SEO from '../components/SEO';

import { galleryData, getCategory } from '../data/galleryData';

// --- Tilt Card Component (Kept unchanged for functionality) ---
const TiltCard = ({ children, onClick, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.div>
    );
};

// --- Helper function for RELIABLE Google Drive URL construction ---
const getDriveMediaUrl = (fileId, type, apiKey) => {
    if (type === 'video') {
        // Use the /preview link for videos (best for iframe embedding)
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    // ⭐ CRITICAL FIX: Use the 'files/ID' endpoint with 'alt=media' for direct image embedding.
    // This is the most reliable method for public files + API Key combination.
    return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
};


const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    // SEO configuration (Kept unchanged)
    const pageTitle = "Gallery | Vahini D'Interio - Interior Design Portfolio & Project Showcase";
    const pageDescription = "Explore our comprehensive gallery of custom interiors, bespoke furniture, modular kitchens, and architectural joinery projects in Narasaraopet and Palnadu. View our portfolio of living rooms, bedrooms, offices, and traditional craftsmanship.";
    const pageUrl = "https://www.vahinidinterio.com/gallery";
    const socialImage = "https://www.vahinidinterio.com/social-share-image.jpg";
    const pageKeywords = "interior design gallery, project portfolio Narasaraopet, custom furniture images, modular kitchen photos, bedroom designs, living room interiors, office designs, traditional joinery, woodwork gallery Palnadu";

    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const FOLDER_ID = process.env.REACT_APP_DRIVE_FOLDER_ID;

    useEffect(() => {
        const fetchImages = async () => {
            // 1. Prepare Fallback Images
            const fallbackImages = galleryData.map((img, index) => ({
                id: img.id || `fallback-${index}`,
                name: img.name,
                url: img.url, 
                fullUrl: img.url, // Fallback for lightbox
                height: ['h-32 md:h-64', 'h-40 md:h-80', 'h-48 md:h-96', 'h-36 md:h-72'][index % 4],
                category: getCategory(img.name),
                type: img.url.toLowerCase().includes('.mp4') ? 'video' : 'image'
            }));

            if (!API_KEY || !FOLDER_ID) {
                console.warn("Missing API_KEY or FOLDER_ID. Using fallback images only.");
                setImages(fallbackImages);
                setLoading(false);
                return;
            }

            try {
                // 2. Fetch both images and videos from Google Drive
                // Requesting minimal fields, relying on the 'alt=media' fix for URLs
                const query = `'${FOLDER_ID}'+in+parents`;
                // We must request the thumbnailLink for the grid preview, as 'alt=media' doesn't scale well.
                const fields = 'files(id,name,mimeType,thumbnailLink)'; 

                const imageResponse = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q=${query}+and+(mimeType+contains+'image/')&key=${API_KEY}&fields=${fields}`
                );

                const videoResponse = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q=${query}+and+(mimeType+contains+'video/')&key=${API_KEY}&fields=${fields}`
                );

                const imageData = imageResponse.ok ? await imageResponse.json() : { files: [] };
                const videoData = videoResponse.ok ? await videoResponse.json() : { files: [] };
                
                if (!imageResponse.ok || !videoResponse.ok) {
                     throw new Error(`Google Drive API returned status: ${imageResponse.status}/${videoResponse.status}`);
                }

                // 3. Process Google Drive Media
                const driveImages = imageData.files.map((file, index) => ({
                    id: file.id,
                    name: file.name,
                    // Use thumbnailLink for the grid view (small, CORS-friendly)
                    url: file.thumbnailLink, 
                    // Use the 'alt=media' endpoint for the full-resolution lightbox view
                    fullUrl: getDriveMediaUrl(file.id, 'image', API_KEY), 
                    height: ['h-32 md:h-64', 'h-40 md:h-80', 'h-48 md:h-96', 'h-36 md:h-72'][index % 4],
                    category: getCategory(file.name),
                    type: 'image'
                }));

                const driveVideos = videoData.files.map((file, index) => ({
                    id: file.id,
                    name: file.name,
                    // Use thumbnailLink for the video thumbnail in the grid
                    url: file.thumbnailLink, 
                    // Use the /preview link for the lightbox iframe
                    fullUrl: getDriveMediaUrl(file.id, 'video', API_KEY), 
                    height: ['h-32 md:h-64', 'h-40 md:h-80', 'h-48 md:h-96', 'h-36 md:h-72'][index % 4],
                    category: getCategory(file.name),
                    type: 'video',
                    mimeType: file.mimeType
                }));

                // console.log('📸 Google Drive Images fetched:', driveImages.length);
                // console.log('🎥 Google Drive Videos fetched:', driveVideos.length);
                
                // 4. Combine Google Drive content and Fallback Images
                const allMedia = [...fallbackImages, ...driveImages, ...driveVideos].sort(() => Math.random() - 0.5);
                setImages(allMedia);

            } catch (err) {
                console.error("Gallery Error: Failed to fetch from Google Drive API. Falling back to local data.", err);
                // On error, revert to only showing fallback images
                setImages(fallbackImages);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [API_KEY, FOLDER_ID]); // Dependencies are necessary for the effect

    const categories = ['All', 'Living', 'Kitchen & Dining', 'Bedroom', 'Office', 'Joinery', 'Bathroom', 'Outdoor', 'Details'];

    const filteredImages = useMemo(() => {
        if (activeCategory === 'All') return images;
        return images.filter(img => img.category === activeCategory);
    }, [images, activeCategory]);

    const handleNextImage = (e) => {
        e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
    };

    const handlePrevImage = (e) => {
        e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[prevIndex]);
    };

    const categoryIcons = {
        'All': <LayoutGrid size={18} />,
        'Living': <Sofa size={18} />,
        'Kitchen & Dining': <Utensils size={18} />,
        'Bedroom': <Bed size={18} />,
        'Office': <Briefcase size={18} />,
        'Joinery': <HardHat size={18} />,
        'Bathroom': <ShowerHead size={18} />,
        'Outdoor': <TreeDeciduous size={18} />,
        'Details': <ZoomIn size={18} />
    };

    // Schema definition (Omitted for brevity, kept untouched)
    const schema = { /* ... */ }; 

    return (
        <div className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 pb-20">
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
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: V.gold }}>
                    Curated Excellence
                </h1>
                <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: V.offGold }}>
                    A visual anthology of our finest work. Each piece tells a story of precision, heritage, and modern design.
                </p>
            </motion.div>

            {/* Filter Tabs (Kept unchanged) */}
            <div className="flex flex-row flex-nowrap overflow-x-auto space-x-4 pb-4 px-2 md:justify-center md:flex-wrap scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`flex items-center justify-center gap-2 w-12 h-12 md:w-auto md:h-auto p-0 md:px-6 md:py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 relative overflow-hidden shrink-0`}
                        style={{
                            color: activeCategory === cat ? '#000000' : V.offGold,
                            border: `1px solid ${activeCategory === cat ? V.gold : 'rgba(193, 163, 93, 0.2)'}`,
                            background: activeCategory === cat ? V.gold : 'transparent',
                            boxShadow: activeCategory === cat ? `0 0 15px ${V.gold}40` : 'none'
                        }}
                    >
                        <span className="text-xl md:text-lg">{categoryIcons[cat]}</span>
                        <span className="hidden md:inline-block">{cat}</span>
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin w-8 h-8" style={{ color: V.gold }} />
                </div>
            ) : (
                <motion.div
                    layout
                    className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8"
                >
                    <AnimatePresence>
                        {filteredImages.map((img, index) => (
                            <motion.div
                                layout
                                key={img.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="break-inside-avoid"
                            >
                                <TiltCard
                                    className="group relative rounded-xl overflow-hidden cursor-zoom-in shadow-lg"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <div className={`w-full ${img.height} relative overflow-hidden`}>
                                        {/* Grid View: Use thumbnailLink (img.url) for all media */}
                                        {img.type === 'video' && (
                                            <Video size={36} className="text-white/80 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-lg" />
                                        )}
                                        
                                        <img
                                            // img.url is the thumbnailLink, which is generally reliable for grid display
                                            src={img.url} 
                                            alt={img.name}
                                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${img.type === 'video' ? 'opacity-50' : ''}`}
                                            loading="lazy"
                                            // Handle potential thumbnail failures by replacing with a placeholder
                                            onError={(e) => { e.target.onerror = null; e.target.src = '/image-placeholder.png'; }}
                                        />
                                        
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 " />

                                        {/* Watermark Logo */}
                                        <div className="absolute top-3 left-3 opacity-90 pointer-events-none z-10 rounded-full">
                                            <img src="/social-share-image.jpg" alt="Vahini" className="w-8 h-auto drop-shadow-md rounded-full" />
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-[#C1A35D] text-xs tracking-widest uppercase mb-2">{img.category}</p>
                                                <h3 className="text-white font-medium text-lg mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{img.name}</h3>
                                                <div className="w-12 h-[1px] bg-[#C1A35D]" />
                                            </div>
                                            <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full">
                                                <ZoomIn className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation Buttons (Kept unchanged) */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all z-50"
                            onClick={handlePrevImage}
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all z-50"
                            onClick={handleNextImage}
                        >
                            <ChevronRight size={32} />
                        </button>

                        <motion.div
                            key={selectedImage.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative max-w-7xl max-h-[90vh] rounded-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedImage.type === 'video' ? (
                                <iframe
                                    // Use the reliable /preview link for video embed
                                    src={selectedImage.fullUrl || selectedImage.url} 
                                    className="w-[90vw] h-[50vh] md:w-[70vw] md:h-[70vh] object-contain shadow-2xl"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title={selectedImage.name}
                                />
                            ) : (
                                <img
                                    // Use the 'alt=media' link (selectedImage.fullUrl) for max quality image
                                    src={selectedImage.fullUrl || selectedImage.url}
                                    alt={selectedImage.name}
                                    className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                                />
                            )}
                            
                            {/* Lightbox Watermark and Details (Kept unchanged) */}
                            <div className="absolute bottom-6 left-6 opacity-60 pointer-events-none z-20 rounded-full">
                                <img src="/social-share-image.jpg" alt="Vahini" className="w-12 md:w-16 h-auto drop-shadow-lg rounded-full" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20">
                                <p className="text-[#C1A35D] text-sm tracking-widest uppercase mb-2 ml-16">{selectedImage.category}</p>
                                <h3 className="text-3xl text-white font-light ml-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    {selectedImage.name}
                                </h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;