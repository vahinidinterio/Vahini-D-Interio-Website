// import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, Loader2, CheckCircle, XCircle, Camera, Upload, X, MessageSquare, CornerUpRight, Zap } from "lucide-react";

// /**
//  * Vahini D'Interio - Enhanced Launching Soon (single-file)
//  *
//  * Updates:
//  * - FIXED: Enhanced desktop form layout by increasing the maximum width of the form container (max-w-2xl) and standardizing button height (h-12) for better horizontal alignment with the input field.
//  * - FIXED: Removed the unused 'apiKey' constant to resolve the ESLint warning.
//  * - FIXED: Added overflow-x-hidden to prevent horizontal scrolling on parallax movement.
//  */

// /* Brand colors */
// const V = {
//   gold: "#C1A35D",
//   gold2: "#D4B76B",
//   offGold: "#E8D2A5",
//   red: "#C0392B",
//   bg: "#0D0D0D",
//   nearBlack: "#0A0A0A",
//   darkAccent: "#1A1A1A",
// };

// /* Gemini API Constants */
// const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

// // Helper function for exponential backoff retry logic
// const fetchWithRetry = async (url, options, maxRetries = 5) => {
//   let attempt = 0;
//   while (attempt < maxRetries) {
//     try {
//       const response = await fetch(url, options);
//       if (response.status === 429 && attempt < maxRetries - 1) {
//         // Retry logic for rate limiting
//         const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
//         await new Promise(resolve => setTimeout(resolve, delay));
//         attempt++;
//         continue;
//       }
//       if (!response.ok) {
//         const errorBody = await response.json();
//         throw new Error(`API Error: ${response.status} - ${errorBody.error.message}`);
//       }
//       return response.json();
//     } catch (error) {
//       if (attempt >= maxRetries - 1) throw error;
//       attempt++;
//     }
//   }
// };

// /**
//  * Converts a file object to a base64 data string (essential for Gemini API image input).
//  */
// const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result.split(',')[1]); // Resolve with only the base64 data
//     reader.onerror = (error) => reject(error);
//     reader.readAsDataURL(file);
//   });
// };


// /**
//  * Renders subtle, decorative gold glints (particles)
//  */
// const LuxuryGlints = ({ count = 12 }) => {
//   const glints = useMemo(
//     () =>
//       Array.from({ length: count }).map((_, i) => ({
//         id: i,
//         left: `${5 + Math.random() * 90}vw`,
//         top: `${5 + Math.random() * 90}vh`,
//         delay: Math.random() * 6,
//         dur: 6 + Math.random() * 6,
//         size: 0.6 + Math.random() * 1.8,
//         opacity: 0.06 + Math.random() * 0.12,
//       })),
//     [count]
//   );

//   return (
//     <>
//       {glints.map((g) => (
//         <motion.div
//           key={g.id}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{
//             opacity: [0, g.opacity, 0.02, g.opacity, 0],
//             scale: [1, 1.6, 1, 1.3, 1],
//             rotate: [0, 9, -6, 9, 0],
//           }}
//           transition={{ duration: g.dur, repeat: Infinity, delay: g.delay, ease: "easeInOut" }}
//           style={{
//             position: "fixed",
//             left: g.left,
//             top: g.top,
//             width: `${g.size}px`,
//             height: `${g.size}px`,
//             borderRadius: "50%",
//             background: V.gold,
//             boxShadow: `0 0 ${6 * g.size}px rgba(193,163,93,0.55)`,
//             pointerEvents: "none",
//             zIndex: 0,
//           }}
//         />
//       ))}
//     </>
//   );
// };

// // Component for the LLM-powered visual design analysis feature
// const DesignAnalysisModal = ({ show, onClose }) => {
//   const [file, setFile] = useState(null);
//   const [base64Image, setBase64Image] = useState(null);
//   const [result, setResult] = useState(null); // { critique: string, enhancement: string }
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type.startsWith('image/')) {
//       if (selectedFile.size > 5 * 1024 * 1024) {
//         setError("Image must be smaller than 5MB.");
//         setFile(null);
//         setBase64Image(null);
//         return;
//       }
//       setFile(selectedFile);
//       setResult(null);
//       setError(null);
//       try {
//         const base64 = await fileToBase64(selectedFile);
//         setBase64Image(base64);
//       } catch (err) {
//         setError("Failed to process image.");
//         setFile(null);
//         setBase64Image(null);
//       }
//     } else {
//       setError("Please select a valid image file.");
//       setFile(null);
//       setBase64Image(null);
//     }
//   };

//   const analyzeImage = useCallback(async () => {
//     if (!base64Image) {
//       setError("Please upload an image first.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setResult(null);

//     const systemPrompt = "You are the lead Design Analyst for Vahini D'Interio, a firm specializing in high-end, bespoke luxury interiors. Analyze the uploaded image for its existing style, dominant color palette, texture, and overall ambiance. Then, provide a concise critique (1-2 paragraphs) and suggest one exclusive 'Vahini Design Enhancement'—a single, impactful, and sophisticated change to instantly elevate the space to true luxury. Format the response as a JSON object with 'critique' and 'enhancement' keys.";
    
//     const userPrompt = "Analyze this image and provide a luxury design critique and a single, high-impact enhancement suggestion.";

//     const payload = {
//         contents: [
//             {
//                 role: "user",
//                 parts: [
//                     { text: userPrompt },
//                     {
//                         inlineData: {
//                             mimeType: file.type,
//                             data: base64Image
//                         }
//                     }
//                 ]
//             }
//         ],
//         systemInstruction: {
//             parts: [{ text: systemPrompt }]
//         },
//         generationConfig: {
//             responseMimeType: "application/json",
//             responseSchema: {
//                 type: "OBJECT",
//                 properties: {
//                     "critique": { "type": "STRING", "description": "A 1-2 paragraph sophisticated analysis of the image's design elements (style, color, ambiance)." },
//                     "enhancement": { "type": "STRING", "description": "A single, exclusive, high-impact suggestion for luxury elevation." }
//                 },
//                 "propertyOrdering": ["critique", "enhancement"]
//             }
//         }
//     };

//     try {
//       const apiResult = await fetchWithRetry(apiUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload)
//       });
      
//       const jsonText = apiResult?.candidates?.[0]?.content?.parts?.[0]?.text;
      
//       if (jsonText) {
//           const parsedJson = JSON.parse(jsonText);
//           setResult(parsedJson);
//       } else {
//           setError("Could not generate analysis. The image might be too complex or unclear.");
//       }
//     } catch (e) {
//       console.error("Gemini API Error:", e);
//       setError("Failed to connect to the Design Analyst. Please check your network.");
//     } finally {
//       setLoading(false);
//     }
//   }, [base64Image, file]);

//   const handleClose = () => {
//     // Reset state when closing
//     setFile(null);
//     setBase64Image(null);
//     setResult(null);
//     setLoading(false);
//     setError(null);
//     onClose();
//   }


//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
//           style={{ background: "rgba(0,0,0,0.7)" }}
//           onClick={handleClose}
//         >
//           <motion.div
//             initial={{ scale: 0.9, y: 50 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.9, y: 50 }}
//             onClick={(e) => e.stopPropagation()}
//             className="w-full max-w-2xl p-6 rounded-xl relative shadow-2xl overflow-y-auto max-h-[90vh]"
//             style={{
//               background: V.darkAccent,
//               border: `1px solid rgba(193,163,93,0.2)`,
//               color: V.offGold,
//             }}
//           >
//             <button
//               onClick={handleClose}
//               className="absolute top-4 right-4 text-white/70 hover:text-white transition z-10"
//               aria-label="Close"
//             >
//               <X className="w-6 h-6" />
//             </button>
            
//             <h3 className="flex items-center gap-2 text-xl font-semibold mb-2" style={{ color: V.gold }}>
//               <Camera className="w-5 h-5" /> Instant Design Critique
//             </h3>
//             <p className="text-sm mb-6 opacity-70">
//               Upload an image of your space or inspiration to receive an elite analysis from our Vahini Design Analysts.
//             </p>

//             {/* Upload Area and Preview */}
//             <div className="flex flex-col md:flex-row gap-6 mb-6">
//                 <div 
//                     className={`flex-shrink-0 w-full md:w-56 h-48 rounded-xl flex flex-col items-center justify-center border-2 border-dashed ${file ? 'border-transparent' : 'border-gray-600 hover:border-gold-500'}`}
//                     style={file ? {border: `2px solid ${V.gold}`, overflow: 'hidden'} : {}}
//                 >
//                     {base64Image ? (
//                         <img 
//                             src={`data:${file.type};base64,${base64Image}`} 
//                             alt="Uploaded Design Inspiration"
//                             className="object-cover w-full h-full rounded-xl"
//                         />
//                     ) : (
//                         <button
//                             type="button"
//                             onClick={() => fileInputRef.current.click()}
//                             className="text-center p-4 transition-colors"
//                             style={{ color: V.offGold }}
//                         >
//                             <Upload className="w-6 h-6 mx-auto mb-2" />
//                             <span className="text-sm">Click to Upload Image</span>
//                             <span className="block text-xs opacity-50 mt-1">(Max 5MB)</span>
//                         </button>
//                     )}
//                 </div>
                
//                 {/* File Input (hidden) */}
//                 <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     accept="image/*"
//                     className="hidden"
//                 />

//                 {/* Analysis/Action Panel */}
//                 <div className="flex-1 flex flex-col justify-start">
//                     <button
//                         onClick={analyzeImage}
//                         disabled={loading || !base64Image}
//                         className="w-full flex items-center justify-center gap-2 transition-all duration-300"
//                         style={{
//                             padding: "12px 18px",
//                             borderRadius: 12,
//                             background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})`,
//                             color: "#000",
//                             fontWeight: 700,
//                             letterSpacing: ".1em",
//                             border: "none",
//                             cursor: loading || !base64Image ? "not-allowed" : "pointer",
//                             boxShadow: "0 6px 20px rgba(193,163,93,0.2)",
//                             opacity: loading || !base64Image ? 0.7 : 1,
//                         }}
//                     >
//                         {loading ? (
//                             <Loader2 className="animate-spin w-5 h-5" />
//                         ) : (
//                             <>
//                                 <Zap className="w-4 h-4" /> Run Vahini Analysis
//                             </>
//                         )}
//                     </button>

//                     {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
//                     {file && !error && !loading && (
//                         <p className="text-sm mt-3 text-center opacity-70">
//                             Ready to analyze: {file.name}
//                         </p>
//                     )}
//                 </div>
//             </div>

//             {/* Analysis Result */}
//             {result && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="mt-4 p-4 rounded-xl"
//                 style={{
//                   background: "rgba(193,163,93,0.08)",
//                   border: `1px solid ${V.gold}`,
//                   color: V.offGold,
//                 }}
//               >
//                 <div className="mb-4">
//                     <h4 className="flex items-center text-lg font-semibold mb-2" style={{ color: V.gold }}>
//                         <MessageSquare className="w-4 h-4 mr-2" /> Design Analyst's Critique
//                     </h4>
//                     <p className="text-sm whitespace-pre-line">{result.critique}</p>
//                 </div>

//                 <div>
//                     <h4 className="flex items-center text-lg font-semibold mb-2" style={{ color: V.red }}>
//                         <CornerUpRight className="w-4 h-4 mr-2" /> Vahini Enhancement
//                     </h4>
//                     <p className="text-base font-bold italic">{result.enhancement}</p>
//                 </div>

//               </motion.div>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };


// export default function App() {
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState("idle"); // idle | submitting | success | error
//   const [showAnalysisModal, setShowAnalysisModal] = useState(false); // State for modal
//   const containerRef = useRef(null);
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });

//   // Parallax handler: maps mouse position to normalized coordinates
//   const handleMouseMove = useCallback((e) => {
//     const rect = containerRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     const cx = rect.left + rect.width / 2;
//     const cy = rect.top + rect.height / 2;
//     const nx = (e.clientX - cx) / (rect.width / 2);
//     const ny = (e.clientY - cy) / (rect.height / 2);
//     setMouse({ x: nx, y: ny });
//   }, []);

//   useEffect(() => {
//     if (!("ontouchstart" in window)) {
//       window.addEventListener("mousemove", handleMouseMove);
//     }
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [handleMouseMove]);

//   // Form Submission Logic (simulated)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (status === "submitting") return;

//     // Basic validation
//     if (!email || !email.includes("@") || email.length < 5) {
//       setStatus("submitting");
//       setTimeout(() => {
//         setStatus("error");
//         // Keeping email in field on error for correction
//       }, 900);
//       return;
//     }

//     setStatus("submitting");
//     // Simulate API call delay
//     setTimeout(() => setStatus("success"), 1300);
//   };

//   // Animation variants for 'LAUNCHING SOON' text
//   const letters = "LAUNCHING SOON".split("");
//   const letterVar = {
//     hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
//     visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 90 } },
//   };

//   return (
//     <>
//       <div
//         ref={containerRef}
//         className="h-screen w-full flex items-center justify-center relative overflow-hidden"
//         style={{
//           background: `radial-gradient(1200px 600px at 50% 42%, rgba(193,163,93,0.04), transparent 8%), linear-gradient(180deg, ${V.bg} 0%, ${V.nearBlack} 100%)`,
//           fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
//           color: V.offGold,
//         }}
//       >
//         {/* decorative glints */}
//         <LuxuryGlints />

//         {/* subtle rotating ring */}
//         <motion.div
//           aria-hidden
//           style={{
//             position: "absolute",
//             width: "95vmin", 
//             height: "95vmin", 
//             borderRadius: "50%",
//             left: "50%",
//             top: "50%",
//             transform: `translate(-50%, -50%) translate(${mouse.x * 2}px, ${mouse.y * 2}px)`,
//             border: `1px solid rgba(193,163,93,0.10)`,
//             zIndex: 0,
//             boxShadow: `inset 0 0 120px rgba(193,163,93,0.03), 0 0 160px rgba(193,163,93,0.02)`,
//           }}
//           animate={{ rotate: 360 }}
//           transition={{ duration: 300, ease: "linear", repeat: Infinity }}
//         />

//         {/* Hero content - shifts slightly opposite to the mouse (foreground) */}
//         <main
//           className="relative z-10 max-w-xl md:max-w-3xl px-3 md:px-6 text-center"
//           style={{
//             transform: `translate3d(${mouse.x * -6}px, ${mouse.y * -6}px, 0)`,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             marginLeft: "auto",
//             marginRight: "auto",
//             height: "100vh",
//             maxHeight: "100vh",
//             paddingTop: "clamp(8px, 2vh, 16px)",
//             paddingBottom: "clamp(8px, 2vh, 16px)",
//             gap: "clamp(4px, 1vh, 8px)",
//           }}
//         >
//           {/* Brand mark + Title */}
//           <motion.section
//             initial={{ opacity: 0, scale: 0.985 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             className="w-full flex flex-col items-center text-center"
//           >
//             {/* VΛHINI (gold gradient + static light glow) */}
//             <div style={{ position: "relative", display: "inline-block", marginBottom: "clamp(4px, 1vh, 8px)", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
//               <h1
//                 className="leading-none uppercase"
//                 style={{
//                   fontSize: "clamp(32px, 6vw, 72px)",
//                   fontWeight: 200,
//                   letterSpacing: "0.12em",
//                   margin: "0 auto",
//                   lineHeight: 0.88,
//                   display: "inline-block",
//                   background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.65))",
//                   textShadow: `0 4px 22px rgba(193,163,93,0.06)`,
//                   fontFamily: "'Cormorant Garamond', serif",
//                   textAlign: "center",
//                 }}
//               >
//                 VΛHINI
//               </h1>

//               {/* static light effect */}
//               <motion.span
//                 aria-hidden
//                 style={{
//                   position: "absolute",
//                   left: "-6%",
//                   top: 0,
//                   width: "120%",
//                   height: "100%",
//                   pointerEvents: "none",
//                   background:
//                     "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0) 100%)",
//                   mixBlendMode: "screen",
//                   transform: "translateX(0%)",
//                 }}
//               />
//             </div>

//             {/* Underline shimmer (animated) */}
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: "clamp(120px, 20vw, 160px)" }}
//               transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
//               style={{
//                 height: 2,
//                 borderRadius: 2,
//                 background: `linear-gradient(90deg, transparent, ${V.red}, transparent)`,
//                 marginBottom: "clamp(4px, 1vh, 8px)",
//                 marginLeft: "auto",
//                 marginRight: "auto",
//               }}
//             />

//             <motion.div
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 1.2 }}
//               style={{ textAlign: "center" }}
//             >
//               <h2
//                 style={{
//                   margin: "0 auto",
//                   fontFamily: "'Cormorant Garamond', serif",
//                   letterSpacing: ".28em",
//                   fontWeight: 400,
//                   color: V.gold,
//                   fontSize: "clamp(11px, 1.2vw, 14px)",
//                   textAlign: "center",
//                 }}
//               >
//                 D'INTERIO
//               </h2>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 14 }}
//               animate={{ opacity: 0.95, y: 0 }}
//               transition={{ delay: 1.1, duration: 1.6, ease: "easeInOut" }}
//               style={{
//                 marginTop: "clamp(6px, 1.5vh, 12px)",
//                 marginLeft: "auto",
//                 marginRight: "auto",
//                 color: V.offGold,
//                 fontSize: "clamp(11px, 1.2vw, 14px)",
//                 fontStyle: "italic",
//                 letterSpacing: ".12em",
//                 maxWidth: "90%",
//                 textAlign: "center",
//               }}
//             >
//               Where Divine Design Flows
//             </motion.p>
//           </motion.section>

//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={{
//               visible: { transition: { staggerChildren: 0.06, delayChildren: 1.8 } },
//             }}
//             style={{ marginTop: "clamp(8px, 2vh, 16px)", marginBottom: "clamp(8px, 2vh, 16px)", width: "100%" }}
//             className="text-center flex justify-center"
//           >
//             <div style={{ display: "inline-block", overflow: "hidden", textAlign: "center" }}>
//               {letters.map((l, i) => (
//                 <motion.span
//                   key={i}
//                   variants={letterVar}
//                   style={{
//                     display: "inline-block",
//                     fontSize: "clamp(24px, 4.5vw, 48px)",
//                     color: "#fff",
//                     fontWeight: 600,
//                     letterSpacing: ".06em", 
//                     marginRight: l === " " ? 4 : 2,
//                   }}
//                 >
//                   {l === " " ? "\u00A0" : l}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>

//           {/* === NEW GEMINI FEATURE BUTTON === */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2.2, duration: 0.8 }}
//             className="text-center"
//             style={{ marginBottom: "clamp(8px, 2vh, 16px)" }}
//           >
//             <motion.button
//               onClick={() => setShowAnalysisModal(true)}
//               whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(193,163,93,0.4)" }}
//               whileTap={{ scale: 0.95 }}
//               className="px-4 md:px-6 py-2 md:py-3 flex items-center justify-center mx-auto rounded-full font-bold transition-all"
//               style={{
//                 background: V.red,
//                 color: V.offGold,
//                 border: `2px solid ${V.gold}`,
//                 letterSpacing: "0.08em",
//                 boxShadow: "0 4px 15px rgba(192,57,43,0.5)",
//                 fontSize: "clamp(12px, 1.3vw, 14px)",
//               }}
//             >
//               <Camera className="w-4 h-4 md:w-5 md:h-5 mr-2" />
//               <span className="whitespace-nowrap">Get Instant Design Analysis</span>
//             </motion.button>
//           </motion.div>
//           {/* ================================= */}

//           {/* Subscription / Notify form (glassmorphism) - IMPROVED RESPONSIVENESS */}
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2.6, duration: 1.2 }}
//             className="w-full max-w-2xl flex flex-col items-center"
//             style={{ marginBottom: "clamp(4px, 1vh, 8px)" }}
//           >
//             {status === "success" ? (
//               <motion.div
//                 initial={{ scale: 0.98, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="p-3 md:p-4 rounded-xl flex items-center justify-center gap-2 md:gap-3"
//                 style={{
//                   border: `1px solid rgba(193,163,93,0.12)`,
//                   background: "linear-gradient(180deg, rgba(193,163,93,0.06), rgba(193,163,93,0.02))",
//                   color: V.gold,
//                   fontSize: "clamp(12px, 1.3vw, 14px)",
//                 }}
//               >
//                 <CheckCircle style={{ width: "clamp(16px, 2vw, 20px)", height: "clamp(16px, 2vw, 20px)" }} />
//                 <span className="font-semibold">Thank you — we'll notify you.</span>
//               </motion.div>
//             ) : (
//               <form
//                 onSubmit={handleSubmit}
//                 // Centering the form content and allowing flex-direction to change on small screens
//                 className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center items-center px-2 md:px-4 w-full" 
//               >
//                 {/* Input Field Container */}
//                 <div
//                   className="relative flex items-center w-full sm:w-auto sm:flex-1 max-w-sm" 
//                   style={{
//                     borderRadius: 10,
//                     padding: "4px 6px",
//                     backdropFilter: "blur(8px)",
//                     background: "rgba(255,255,255,0.02)",
//                     border: `1px solid rgba(193,163,93,0.08)`,
//                   }}
//                 >
//                   <Mail className="absolute left-2 md:left-3" style={{ color: V.gold, opacity: 0.9, width: "clamp(14px, 1.5vw, 18px)", height: "clamp(14px, 1.5vw, 18px)" }} />
//                   <input
//                     type="email"
//                     placeholder="Your email address"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       if (status === "error") setStatus("idle");
//                     }}
//                     disabled={status === "submitting"}
//                     className="w-full" 
//                     style={{
//                       padding: "clamp(8px, 1.5vh, 10px) clamp(10px, 1.5vw, 14px) clamp(8px, 1.5vh, 10px) clamp(28px, 4vw, 38px)", 
//                       border: "none",
//                       outline: "none",
//                       background: "transparent",
//                       color: "#fff",
//                       fontSize: "clamp(12px, 1.3vw, 14px)",
//                       letterSpacing: ".02em",
//                       height: "clamp(36px, 5vh, 44px)",
//                     }}
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   type="submit"
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   disabled={status === "submitting"}
//                   className="w-full sm:w-auto"
//                   style={{
//                     padding: `0 clamp(14px, 2vw, 18px)`,
//                     borderRadius: 10,
//                     background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})`,
//                     color: "#000",
//                     fontWeight: 700,
//                     letterSpacing: ".12em",
//                     border: "none",
//                     minWidth: "clamp(100px, 15vw, 120px)",
//                     height: "clamp(36px, 5vh, 44px)",
//                     cursor: "pointer",
//                     boxShadow: "0 10px 30px rgba(193,163,93,0.08)",
//                     fontSize: "clamp(12px, 1.3vw, 14px)",
//                   }}
//                 >
//                   {status === "submitting" ? <Loader2 className="animate-spin" style={{ width: "clamp(16px, 2vw, 20px)", height: "clamp(16px, 2vw, 20px)" }} /> : "Notify Me"}
//                 </motion.button>
//               </form>
//             )}

//             {status === "error" && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-red-600 flex gap-2 items-center justify-center" style={{ fontSize: "clamp(10px, 1.1vw, 12px)" }}>
//                 <XCircle style={{ width: "clamp(12px, 1.5vw, 16px)", height: "clamp(12px, 1.5vw, 16px)" }} /> <span>Please enter a valid email address.</span>
//               </motion.div>
//             )}
//           </motion.div>

//           {/* Footer small */}
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 3.8, duration: 1.2 }} className="text-center" style={{ color: V.offGold, marginTop: "clamp(4px, 1vh, 8px)" }}>
//             <div style={{ marginBottom: "clamp(2px, 0.5vh, 4px)", height: 1.2, width: "clamp(80px, 15vw, 120px)", margin: "0 auto", background: `linear-gradient(90deg, transparent, ${V.gold}, transparent)` }} />
//             <small style={{ opacity: 0.7, fontSize: "clamp(9px, 1vw, 12px)" }}>© 2025 Vahini D'Interio. All Rights Reserved.</small>
//           </motion.div>
//         </main>

//         {/* Inline styles for small things */}
//         <style>{`
//           /* ensure body neutral background if used standalone */
//           html, body, #root { 
//             height: 100%; 
//             width: 100%;
//             background: ${V.bg}; 
//             overflow: hidden;
//             margin: 0;
//             padding: 0;
//           }
//           /* For placeholder color consistency in Glassmorphic input */
//           input::placeholder, textarea::placeholder { color: ${V.offGold}; opacity: 0.5; }
//           input:focus::placeholder, textarea:focus::placeholder { opacity: 0.2; }
//           /* Prevent scrollbars */
//           * {
//             box-sizing: border-box;
//           }
//         `}</style>
//       </div>
      
//       {/* Design Analysis Modal */}
//       <DesignAnalysisModal show={showAnalysisModal} onClose={() => setShowAnalysisModal(false)} />
//     </>
//   );
// }


import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle, XCircle, Camera, Upload, X, MessageSquare, CornerUpRight, Zap } from "lucide-react";

/**
 * Vahini D'Interio - Enhanced Launching Soon (single-file)
 *
 * Updates:
 * - FIXED: Enhanced desktop form layout by increasing the maximum width of the form container (max-w-2xl) and standardizing button height (h-12) for better horizontal alignment with the input field.
 * - FIXED: Removed the unused 'apiKey' constant to resolve the ESLint warning.
 * - FIXED: Added overflow-x-hidden to prevent horizontal scrolling on parallax movement.
 */

/* Brand colors */
const V = {
  gold: "#C1A35D",
  gold2: "#D4B76B",
  offGold: "#E8D2A5",
  red: "#C0392B",
  bg: "#0D0D0D",
  nearBlack: "#0A0A0A",
  darkAccent: "#1A1A1A",
};

/* Gemini API Constants */
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

// Helper function for exponential backoff retry logic
const fetchWithRetry = async (url, options, maxRetries = 5) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429 && attempt < maxRetries - 1) {
        // Retry logic for rate limiting
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorBody.error.message}`);
      }
      return response.json();
    } catch (error) {
      if (attempt >= maxRetries - 1) throw error;
      attempt++;
    }
  }
};

/**
 * Converts a file object to a base64 data string (essential for Gemini API image input).
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]); // Resolve with only the base64 data
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};


/**
 * Renders subtle, decorative gold glints (particles)
 */
const LuxuryGlints = ({ count = 12 }) => {
  const glints = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}vw`,
        top: `${5 + Math.random() * 90}vh`,
        delay: Math.random() * 6,
        dur: 6 + Math.random() * 6,
        size: 0.6 + Math.random() * 1.8,
        opacity: 0.06 + Math.random() * 0.12,
      })),
    [count]
  );

  return (
    <>
      {glints.map((g) => (
        <motion.div
          key={g.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0, g.opacity, 0.02, g.opacity, 0],
            scale: [1, 1.6, 1, 1.3, 1],
            rotate: [0, 9, -6, 9, 0],
          }}
          transition={{ duration: g.dur, repeat: Infinity, delay: g.delay, ease: "easeInOut" }}
          style={{
            position: "fixed",
            left: g.left,
            top: g.top,
            width: `${g.size}px`,
            height: `${g.size}px`,
            borderRadius: "50%",
            background: V.gold,
            boxShadow: `0 0 ${6 * g.size}px rgba(193,163,93,0.55)`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}
    </>
  );
};

// Component for the LLM-powered visual design analysis feature
const DesignAnalysisModal = ({ show, onClose }) => {
  const [file, setFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [result, setResult] = useState(null); // { critique: string, enhancement: string }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("Image must be smaller than 5MB.");
        setFile(null);
        setBase64Image(null);
        return;
      }
      setFile(selectedFile);
      setResult(null);
      setError(null);
      try {
        const base64 = await fileToBase64(selectedFile);
        setBase64Image(base64);
      } catch (err) {
        setError("Failed to process image.");
        setFile(null);
        setBase64Image(null);
      }
    } else {
      setError("Please select a valid image file.");
      setFile(null);
      setBase64Image(null);
    }
  };

  const analyzeImage = useCallback(async () => {
    if (!base64Image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const systemPrompt = "You are the lead Design Analyst for Vahini D'Interio, a firm specializing in high-end, bespoke luxury interiors. Analyze the uploaded image for its existing style, dominant color palette, texture, and overall ambiance. Then, provide a concise critique (1-2 paragraphs) and suggest one exclusive 'Vahini Design Enhancement'—a single, impactful, and sophisticated change to instantly elevate the space to true luxury. Format the response as a JSON object with 'critique' and 'enhancement' keys.";
    
    const userPrompt = "Analyze this image and provide a luxury design critique and a single, high-impact enhancement suggestion.";

    const payload = {
        contents: [
            {
                role: "user",
                parts: [
                    { text: userPrompt },
                    {
                        inlineData: {
                            mimeType: file.type,
                            data: base64Image
                        }
                    }
                ]
            }
        ],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "critique": { "type": "STRING", "description": "A 1-2 paragraph sophisticated analysis of the image's design elements (style, color, ambiance)." },
                    "enhancement": { "type": "STRING", "description": "A single, exclusive, high-impact suggestion for luxury elevation." }
                },
                "propertyOrdering": ["critique", "enhancement"]
            }
        }
    };

    try {
      const apiResult = await fetchWithRetry(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });
      
      const jsonText = apiResult?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (jsonText) {
          const parsedJson = JSON.parse(jsonText);
          setResult(parsedJson);
      } else {
          setError("Could not generate analysis. The image might be too complex or unclear.");
      }
    } catch (e) {
      console.error("Gemini API Error:", e);
      setError("Failed to connect to the Design Analyst. Please check your network.");
    } finally {
      setLoading(false);
    }
  }, [base64Image, file]);

  const handleClose = () => {
    // Reset state when closing
    setFile(null);
    setBase64Image(null);
    setResult(null);
    setLoading(false);
    setError(null);
    onClose();
  }


  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl p-6 rounded-xl relative shadow-2xl overflow-y-auto max-h-[90vh]"
            style={{
              background: V.darkAccent,
              border: `1px solid rgba(193,163,93,0.2)`,
              color: V.offGold,
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="flex items-center gap-2 text-xl font-semibold mb-2" style={{ color: V.gold }}>
              <Camera className="w-5 h-5" /> Instant Design Critique
            </h3>
            <p className="text-sm mb-6 opacity-70">
              Upload an image of your space or inspiration to receive an elite analysis from our Vahini Design Analysts.
            </p>

            {/* Upload Area and Preview */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div 
                    className={`flex-shrink-0 w-full md:w-56 h-48 rounded-xl flex flex-col items-center justify-center border-2 border-dashed ${file ? 'border-transparent' : 'border-gray-600 hover:border-gold-500'}`}
                    style={file ? {border: `2px solid ${V.gold}`, overflow: 'hidden'} : {}}
                >
                    {base64Image ? (
                        <img 
                            src={`data:${file.type};base64,${base64Image}`} 
                            alt="Uploaded Design Inspiration"
                            className="object-cover w-full h-full rounded-xl"
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="text-center p-4 transition-colors"
                            style={{ color: V.offGold }}
                        >
                            <Upload className="w-6 h-6 mx-auto mb-2" />
                            <span className="text-sm">Click to Upload Image</span>
                            <span className="block text-xs opacity-50 mt-1">(Max 5MB)</span>
                        </button>
                    )}
                </div>
                
                {/* File Input (hidden) */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                {/* Analysis/Action Panel */}
                <div className="flex-1 flex flex-col justify-start">
                    <button
                        onClick={analyzeImage}
                        disabled={loading || !base64Image}
                        className="w-full flex items-center justify-center gap-2 transition-all duration-300"
                        style={{
                            padding: "12px 18px",
                            borderRadius: 12,
                            background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})`,
                            color: "#000",
                            fontWeight: 700,
                            letterSpacing: ".1em",
                            border: "none",
                            cursor: loading || !base64Image ? "not-allowed" : "pointer",
                            boxShadow: "0 6px 20px rgba(193,163,93,0.2)",
                            opacity: loading || !base64Image ? 0.7 : 1,
                        }}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                            <>
                                <Zap className="w-4 h-4" /> Run Vahini Analysis
                            </>
                        )}
                    </button>

                    {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                    {file && !error && !loading && (
                        <p className="text-sm mt-3 text-center opacity-70">
                            Ready to analyze: {file.name}
                        </p>
                    )}
                </div>
            </div>

            {/* Analysis Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-4 rounded-xl"
                style={{
                  background: "rgba(193,163,93,0.08)",
                  border: `1px solid ${V.gold}`,
                  color: V.offGold,
                }}
              >
                <div className="mb-4">
                    <h4 className="flex items-center text-lg font-semibold mb-2" style={{ color: V.gold }}>
                        <MessageSquare className="w-4 h-4 mr-2" /> Design Analyst's Critique
                    </h4>
                    <p className="text-sm whitespace-pre-line">{result.critique}</p>
                </div>

                <div>
                    <h4 className="flex items-center text-lg font-semibold mb-2" style={{ color: V.red }}>
                        <CornerUpRight className="w-4 h-4 mr-2" /> Vahini Enhancement
                    </h4>
                    <p className="text-base font-bold italic">{result.enhancement}</p>
                </div>

              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [showAnalysisModal, setShowAnalysisModal] = useState(false); // State for modal
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Parallax handler: maps mouse position to normalized coordinates
  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    setMouse({ x: nx, y: ny });
  }, []);

  useEffect(() => {
    if (!("ontouchstart" in window)) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Form Submission Logic (simulated)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Basic validation
    if (!email || !email.includes("@") || email.length < 5) {
      setStatus("submitting");
      setTimeout(() => {
        setStatus("error");
        // Keeping email in field on error for correction
      }, 900);
      return;
    }

    setStatus("submitting");
    // Simulate API call delay
    setTimeout(() => setStatus("success"), 1300);
  };

  // Animation variants for 'LAUNCHING SOON' text
  const letters = "LAUNCHING SOON".split("");
  const letterVar = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 90 } },
  };

  return (
    <>
      <div
        ref={containerRef}
        className="h-screen w-full flex items-center justify-center relative overflow-hidden"
        style={{
          background: `radial-gradient(1200px 600px at 50% 42%, rgba(193,163,93,0.04), transparent 8%), linear-gradient(180deg, ${V.bg} 0%, ${V.nearBlack} 100%)`,
          fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          color: V.offGold,
        }}
      >
        {/* decorative glints */}
        <LuxuryGlints />

        {/* subtle rotating ring */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            width: "95vmin", 
            height: "95vmin", 
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${mouse.x * 2}px, ${mouse.y * 2}px)`,
            border: `1px solid rgba(193,163,93,0.10)`,
            zIndex: 0,
            boxShadow: `inset 0 0 120px rgba(193,163,93,0.03), 0 0 160px rgba(193,163,93,0.02)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 300, ease: "linear", repeat: Infinity }}
        />

        {/* Hero content - shifts slightly opposite to the mouse (foreground) */}
        <main
          className="relative z-10 max-w-xl md:max-w-3xl px-3 md:px-6 text-center"
          style={{
            transform: `translate3d(${mouse.x * -6}px, ${mouse.y * -6}px, 0)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100vh",
            maxHeight: "100vh",
            paddingTop: "clamp(8px, 2vh, 16px)",
            paddingBottom: "clamp(8px, 2vh, 16px)",
            gap: "clamp(4px, 1vh, 8px)",
          }}
        >
          {/* Brand mark + Title */}
          <motion.section
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full flex flex-col items-center text-center"
          >
            {/* VΛHINI (gold gradient + static light glow) */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: "clamp(4px, 1vh, 8px)", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
              <h1
                className="leading-none uppercase"
                style={{
                  fontSize: "clamp(32px, 6vw, 72px)",
                  fontWeight: 200,
                  letterSpacing: "0.12em",
                  margin: "0 auto",
                  lineHeight: 0.88,
                  display: "inline-block",
                  background: `linear-gradient(90deg, ${V.gold}, ${V.gold2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.65))",
                  textShadow: `0 4px 22px rgba(193,163,93,0.06)`,
                  // fontFamily: "'Cormorant Garamond', serif",
                  textAlign: "center",
                }}
              >
                VΛHINI
              </h1>

              {/* static light effect */}
              <motion.span
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-6%",
                  top: 0,
                  width: "120%",
                  height: "100%",
                  pointerEvents: "none",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0) 100%)",
                  mixBlendMode: "screen",
                  transform: "translateX(0%)",
                }}
              />
            </div>

            {/* Underline shimmer (animated) */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "clamp(120px, 20vw, 160px)" }}
              transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
              style={{
                height: 2,
                borderRadius: 2,
                background: `linear-gradient(90deg, transparent, ${V.red}, transparent)`,
                marginBottom: "clamp(4px, 1vh, 8px)",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              style={{ textAlign: "center" }}
            >
              <h2
                style={{
                  margin: "0 auto",
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: ".28em",
                  fontWeight: 400,
                  color: V.gold,
                  fontSize: "clamp(11px, 1.2vw, 14px)",
                  textAlign: "center",
                }}
              >
                D'INTERIO
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 0.95, y: 0 }}
              transition={{ delay: 1.1, duration: 1.6, ease: "easeInOut" }}
              style={{
                marginTop: "clamp(6px, 1.5vh, 12px)",
                marginLeft: "auto",
                marginRight: "auto",
                color: V.offGold,
                fontSize: "clamp(11px, 1.2vw, 14px)",
                fontStyle: "italic",
                letterSpacing: ".12em",
                maxWidth: "90%",
                textAlign: "center",
              }}
            >
              Where Divine Design Flows
            </motion.p>
          </motion.section>

          {/* LAUNCHING SOON (MODIFIED BLOCK: Centering fix applied here) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.06, delayChildren: 1.8 } },
            }}
            style={{ 
              marginTop: "clamp(8px, 2vh, 16px)", 
              marginBottom: "clamp(8px, 2vh, 16px)", 
              width: "100%", 
              // Added flex centering to guarantee the block is centered
              display: "flex", 
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            {/* The inner div holds the text and must be inline-block to shrink to text size */}
            <div style={{ display: "inline-block", overflow: "hidden" }}>
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  variants={letterVar}
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(24px, 4.5vw, 48px)",
                    color: "#fff",
                    fontWeight: 600,
                    letterSpacing: ".06em", 
                    marginRight: l === " " ? 4 : 2,
                  }}
                >
                  {l === " " ? "\u00A0" : l}
                </motion.span>
              ))}
            </div>
          </motion.div>
          {/* END OF MODIFIED BLOCK */}
{/* === NEW GEMINI FEATURE BUTTON (PERFECT ALIGNMENT & SPACING) === */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.2, duration: 0.8 }}
  className="text-center flex justify-center"
  style={{ marginBottom: "clamp(8px, 2vh, 20px)" }}
>
  <motion.button
    onClick={() => setShowAnalysisModal(true)}
    whileHover={{
      scale: 1.06,
      boxShadow: "0 0 35px rgba(193,163,93,0.35)",
      background:
        "linear-gradient(135deg, rgba(193,163,93,0.25), rgba(193,163,93,0.15))",
    }}
    whileTap={{ scale: 0.97 }}
    className="relative flex items-center justify-center px-7 md:px-9 py-7 md:py-4 rounded-full font-semibold transition-all duration-300"
    style={{
      background:
        "linear-gradient(135deg, rgba(193,163,93,0.18), rgba(193,163,93,0.08))",
      border: `1.5px solid ${V.gold}`,
      color: V.offGold,
      letterSpacing: "0.08em",
      boxShadow: "0 0 20px rgba(193,163,93,0.15)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      // gap: 'clamp(14px, 1.8vw, 24px)',
      padding: 'clamp(14px, 2vw, 18px)',
      borderRadius: 'clamp(14px, 2vw, 18px)', 
    }}
  >
    <Camera
      className="w-5 h-5 md:w-6 md:h-6 text-[#c1a35d]"
      style={{
        filter: "drop-shadow(0 0 4px rgba(193,163,93,0.6))",
        flexShrink: 0,
      }}
    />
    <span className="whitespace-nowrap tracking-wide text-[clamp(13px,1.2vw,15px)]">
      Get Instant Design Analysis
    </span>
  </motion.button>
</motion.div>
{/* ================================================ */}



          {/* Footer small */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 3.8, duration: 1.2 }} className="text-center" style={{ color: V.offGold, marginTop: "clamp(4px, 1vh, 8px)" }}>
            <div style={{ marginBottom: "clamp(2px, 0.5vh, 4px)", height: 1.2, width: "clamp(80px, 15vw, 120px)", margin: "0 auto", background: `linear-gradient(90deg, transparent, ${V.gold}, transparent)` }} />
            <small style={{ opacity: 0.7, fontSize: "clamp(9px, 1vw, 12px)" }}>© 2025 Vahini D'Interio. All Rights Reserved.</small>
          </motion.div>
        </main>

        {/* Inline styles for small things */}
        <style>{`
          /* ensure body neutral background if used standalone */
          html, body, #root { 
            height: 100%; 
            width: 100%;
            background: ${V.bg}; 
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          /* For placeholder color consistency in Glassmorphic input */
          input::placeholder, textarea::placeholder { color: ${V.offGold}; opacity: 0.5; }
          input:focus::placeholder, textarea:focus::placeholder { opacity: 0.2; }
          /* Prevent scrollbars */
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
      
      {/* Design Analysis Modal */}
      <DesignAnalysisModal show={showAnalysisModal} onClose={() => setShowAnalysisModal(false)} />
    </>
  );
}