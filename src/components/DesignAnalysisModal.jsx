import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, MessageSquare, CornerUpRight, Zap, Loader2 } from "lucide-react";
import { V } from "../utils/colors";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

const fetchWithRetry = async (url, options, maxRetries = 5) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429 && attempt < maxRetries - 1) {
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

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const DesignAnalysisModal = ({ show, onClose }) => {
  const [file, setFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [result, setResult] = useState(null);
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

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div
                className={`flex-shrink-0 w-full md:w-56 h-48 rounded-xl flex flex-col items-center justify-center border-2 border-dashed ${file ? 'border-transparent' : 'border-gray-600 hover:border-gold-500'}`}
                style={file ? { border: `2px solid ${V.gold}`, overflow: 'hidden' } : {}}
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

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

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

export default DesignAnalysisModal;
