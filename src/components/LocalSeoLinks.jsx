import React from "react";
import { V } from "../utils/colors";

const LocalSeoLinks = () => {
    const links = [
        { text: "Best Carpenters in Narasaraopet", path: "/#services" },
        { text: "Interior Works Near Me Palnadu", path: "/#services" },
        { text: "Custom Cupboard Works Narasaraopet", path: "/#portfolio" },
        { text: "Carpenter Repairs in Narasaraopet", path: "/#services" },
        { text: "Vishwabrahmin Woodworking Services", path: "/#about" },
        { text: "Modern Modular Kitchens Palnadu", path: "/#portfolio" },
        { text: "Custom Doors and Windows Narasaraopet", path: "/#services" },
        { text: "Aluminium Mesh Door Installation", path: "/#services" },
        { text: "Wooden Mesh Door Installation", path: "/#services" },
        { text: "Luxury Interior Designers Palnadu", path: "/#portfolio" },
        { text: "Bespoke Furniture Makers Narasaraopet", path: "/#portfolio" },
        { text: "Commercial Interior Works Palnadu", path: "/#portfolio" },
        { text: "Residential Carpentry Services", path: "/#services" },
        { text: "Home Renovation Contractors", path: "/#services" },
        { text: "Wardrobe Designs Narasaraopet", path: "/#portfolio" },
        { text: "False Ceiling Contractors Palnadu", path: "/#services" },
        { text: "Custom TV Unit Designs", path: "/#portfolio" },
        { text: "Wood Polish and Finishing Services", path: "/#services" },
        { text: "Office Furniture Works Narasaraopet", path: "/#portfolio" },
        { text: "Best Wood Repair Services Palnadu", path: "/#services" },
        { text: "Professional Home Interiors", path: "/#portfolio" },
        { text: "Custom Cabinets Narasaraopet", path: "/#portfolio" },
        { text: "Fine Wood Artistry Palnadu", path: "/#about" },
        { text: "Antique Furniture Restoration", path: "/#services" },
        { text: "Door Frame Installation Narasaraopet", path: "/#services" },
        { text: "Custom Threshold Design", path: "/#portfolio" },
        { text: "Interior Design Consultation Palnadu", path: "/#contact" },
        { text: "Local Carpenters Near Narasaraopet", path: "/#services" },
        { text: "Affordable Interior Works Palnadu", path: "/#services" },
        { text: "Vahini D'Interio Contact", path: "/#contact" },
    ];

    return (
        <div className="w-full py-12 px-4 relative z-10 bg-black/40">
            <div
                className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-3 gap-y-3 text-center"
                style={{ borderTop: `1px solid ${V.darkAccent}`, paddingTop: '2rem' }}
            >
                <div className="w-full pb-4">
                    <h3 className="text-xs uppercase tracking-widest opacity-40 mb-2">Popular Searches in Palnadu</h3>
                </div>
                {links.map((link, index) => (
                    <React.Fragment key={index}>
                        <a
                            href={link.path}
                            className="text-[11px] md:text-xs uppercase tracking-wider hover:text-[#C1A35D] transition-colors duration-300"
                            style={{ color: V.offGold, opacity: 0.5 }}
                        >
                            {link.text}
                        </a>
                        {index < links.length - 1 && (
                            <span className="hidden md:inline-block w-[1px] h-3 bg-[#C1A35D] opacity-20 mx-1" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default LocalSeoLinks;
