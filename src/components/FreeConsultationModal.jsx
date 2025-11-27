import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { V } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';

const FreeConsultationModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { isDark } = useTheme();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    // Show modal after 10 seconds, once per session
    useEffect(() => {
        const hasSeen = sessionStorage.getItem('vahini_consultation_shown');
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem('vahini_consultation_shown', 'true');
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, []);

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
            if (!serviceId || serviceId === 'YOUR_SERVICE_ID') {
                // Simulate success if keys not set
                await new Promise((resolve) => setTimeout(resolve, 2000));
                console.warn('EmailJS keys not set. Simulating success.');
            } else {
                // Send Admin Notification
                const adminEmailPromise = emailjs.send(serviceId, templateId, {
                    name: formData.name,           // Matches {{name}} in template
                    email: formData.email,         // Matches {{email}} in template
                    phone: formData.phone,         // Matches {{phone}} in template
                    message: formData.message,     // Matches {{message}} in template
                    type: 'Free Consultation Request'
                }, publicKey);

                // Send Auto-Reply to User
                const autoReplyPromise = emailjs.send(serviceId, autoReplyTemplateId, {
                    to_name: formData.name,
                    name: formData.name,           // Matches {{name}} in template
                    to_email: formData.email,      // Common variable
                    reply_to: formData.email,      // Common variable for "Reply To"
                    user_email: formData.email,    // Common variable
                    email: formData.email,         // Common variable
                    message: "Thank you for booking a free site visit with Vahini D'Interio. We will contact you shortly to schedule.",
                    type: 'Auto-Reply'
                }, publicKey);

                await Promise.all([adminEmailPromise, autoReplyPromise]);
            }
            setIsSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsSubmitted(false);
            }, 3000);
        } catch (err) {
            console.error('EmailJS Error:', err);
            setError('Something went wrong. Please try again or call us directly.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.6 }}
                        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: isDark ? '#1a1a1a' : '#ffffff',
                            border: `1px solid ${V.gold}40`
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors z-10"
                            style={{ color: isDark ? V.offGold : V.nearBlack }}
                        >
                            <X size={20} />
                        </button>

                        {/* Header Image/Banner */}
                        <div className="h-32 bg-cover bg-center relative flex items-center justify-center" style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800")',
                        }}>
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="relative z-10 text-center p-4">
                                <h3 className="text-2xl font-light text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    Get a Free Quote
                                </h3>
                                <p className="text-white/80 text-sm">Expert Woodwork & Interior Design</p>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="text-center mb-6">
                                        <p className="text-sm opacity-80" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                            Book your <span className="font-bold" style={{ color: V.gold }}>FREE Site Visit</span> today! Let's discuss your dream space.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full p-3 rounded-lg border focus:outline-none focus:border-[#C1A35D] transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full p-3 rounded-lg border focus:outline-none focus:border-[#C1A35D] transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full p-3 rounded-lg border focus:outline-none focus:border-[#C1A35D] transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}
                                    />
                                    <textarea
                                        name="message"
                                        rows="3"
                                        placeholder="Tell us about your project (e.g., 2BHK Interior, Custom Wardrobe)..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full p-3 rounded-lg border focus:outline-none focus:border-[#C1A35D] transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-black/5 border-black/10 text-black'}`}
                                    />
                                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg mt-2"
                                        style={{
                                            background: `linear-gradient(135deg, ${V.gold}, ${V.gold2})`,
                                            boxShadow: `0 8px 20px ${V.gold}40`
                                        }}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Calendar className="w-5 h-5" />
                                                Book Free Site Visit
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2" style={{ color: isDark ? '#fff' : '#000' }}>
                                        Request Received!
                                    </h4>
                                    <p className="opacity-70 mb-6" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                        Thank you, {formData.name}. We will call you shortly to schedule your free site visit.
                                    </p>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-sm underline opacity-60 hover:opacity-100"
                                        style={{ color: isDark ? V.offGold : V.nearBlack }}
                                    >
                                        Close Window
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FreeConsultationModal;
