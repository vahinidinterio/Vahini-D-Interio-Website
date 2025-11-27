import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

import { V } from "../utils/colors";
import { useTheme } from "../context/ThemeContext";

const PrivacyPolicy = () => {
    const { isDark } = useTheme();

    const sections = [
        {
            title: "1. Introduction",
            content: "Welcome to Vahini D'Interio. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you."
        },
        {
            title: "2. Information We Collect",
            content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows: Identity Data (includes first name, last name, username or similar identifier), Contact Data (includes billing address, delivery address, email address and telephone numbers), and Technical Data (includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location)."
        },
        {
            title: "3. How We Use Your Information",
            content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you; Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests; Where we need to comply with a legal or regulatory obligation."
        },
        {
            title: "4. Data Security",
            content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know."
        },
        {
            title: "5. Your Legal Rights",
            content: "Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to Request access to your personal data, Request correction of your personal data, Request erasure of your personal data, Object to processing of your personal data, Request restriction of processing your personal data, Request transfer of your personal data, and Right to withdraw consent."
        },
        {
            title: "6. Contact Us",
            content: "If you have any questions about this privacy policy or our privacy practices, please contact us at: contact@vahinidinterio.com or visit us at our office in Narasaraopet, Palnadu District, Andhra Pradesh."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-24 pb-16 px-6"
            style={{ backgroundColor: isDark ? V.bg : "#F9F7F3" }}
        >
            <SEO
                title="Privacy Policy | Vahini D'Interio"
                description="Privacy Policy for Vahini D'Interio. Learn how we collect, use, and protect your personal information."
                canonical="https://vahinidinterio.com/privacy-policy"
            />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wider" style={{ color: V.gold }}>
                            PRIVACY POLICY
                        </h1>
                        <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: V.gold }} />
                        <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                            Your privacy is of utmost importance to us. This document outlines our commitment to protecting your data.
                        </p>
                    </motion.div>
                </div>

                <div className="grid gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-lg border backdrop-blur-sm transition-colors duration-300"
                            style={{
                                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                            }}
                        >
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3" style={{ color: V.gold }}>
                                {section.title}
                            </h2>
                            <p className="leading-relaxed opacity-80 text-justify" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center opacity-60 text-sm" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                    Last Updated: November 2025
                </div>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;
