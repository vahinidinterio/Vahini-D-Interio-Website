import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { V } from "../utils/colors";
import { useTheme } from "../context/ThemeContext";

const TermsOfService = () => {
    const { isDark } = useTheme();

    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using this website (vahinidinterio.com), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement."
        },
        {
            title: "2. Service Description",
            content: "Vahini D'Interio provides interior design services, including but not limited to bespoke furniture design, modular kitchens, wardrobe solutions, and commercial fit-outs. We reserve the right to modify, suspend or discontinue the service with or without notice at any time and without any liability to you."
        },
        {
            title: "3. Intellectual Property",
            content: "The Site and its original content, features, and functionality are owned by Vahini D'Interio and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. All designs, renderings, and concepts presented remain the property of Vahini D'Interio until full payment is received."
        },
        {
            title: "4. User Responsibilities",
            content: "You agree to use the site only for lawful purposes. You are prohibited from posting on or transmitting through the site any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable material of any kind."
        },
        {
            title: "5. Payment Terms",
            content: "For all design and execution projects, payment terms will be outlined in the specific contract agreement signed by the client. Generally, a mobilization advance is required to commence work, with subsequent payments linked to project milestones. Failure to adhere to payment schedules may result in project delays."
        },
        {
            title: "6. Limitation of Liability",
            content: "In no event shall Vahini D'Interio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service."
        },
        {
            title: "7. Governing Law",
            content: "These Terms shall be governed and construed in accordance with the laws of India and the State of Andhra Pradesh, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
        },
        {
            title: "8. Changes to This Agreement",
            content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
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
            <Helmet>
                <title>Terms of Service | Vahini D'Interio</title>
                <meta name="description" content="Terms of Service for Vahini D'Interio. Read our terms and conditions for using our website and services." />
            </Helmet>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wider" style={{ color: V.gold }}>
                            TERMS OF SERVICE
                        </h1>
                        <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: V.gold }} />
                        <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: isDark ? V.offGold : V.nearBlack }}>
                            Please read these terms and conditions carefully before using our website or services.
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
                            <h2 className="text-xl font-semibold mb-4" style={{ color: V.gold }}>
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

export default TermsOfService;
