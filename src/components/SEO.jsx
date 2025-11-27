import React from 'react';
import { Helmet } from 'react-helmet-async';
import { V } from '../utils/colors';

const SEO = ({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType = 'website',
    schema,
    noindex = false,
    nofollow = false,
    author = "Vahini D'Interio",
    publishedTime,
    modifiedTime,
}) => {
    const siteTitle = "Vahini D'Interio";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "Premier Interior Design and Woodwork Contractors serving Narasaraopet, Guntur, and nearby areas. Specializing in bespoke modular kitchens, custom furniture, and luxury interiors.";
    const defaultKeywords = "Interior Design, Woodwork, Narasaraopet, Guntur, Modular Kitchens, Custom Furniture, Vahini D'Interio, Vishwabrahmin Carpentry, Luxury Interiors Palnadu";
    const siteUrl = "https://www.vahinidinterio.com";
    const currentUrl = canonicalUrl || siteUrl;
    const defaultImage = `${siteUrl}/social-share-image.jpg`;
    const image = ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : defaultImage;

    // Robots directive
    const robots = [
        noindex ? 'noindex' : 'index',
        nofollow ? 'nofollow' : 'follow',
        'max-snippet:-1',
        'max-image-preview:large',
        'max-video-preview:-1'
    ].join(', ');

    return (
        <Helmet>
            {/* --- Standard Meta Tags --- */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta name="author" content={author} />
            <meta name="publisher" content={siteTitle} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={currentUrl} />
            <meta name="theme-color" content={V.gold} />

            {/* --- Local SEO (Geo-Targeting for Narasaraopet) --- */}
            <meta name="geo.region" content="IN-AP" />
            <meta name="geo.placename" content="Narasaraopet" />
            <meta name="geo.position" content="16.2360;80.0546" />
            <meta name="ICBM" content="16.2360, 80.0546" />

            {/* --- Open Graph / Facebook --- */}
            <meta property="og:locale" content="en_IN" />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={fullTitle} />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

            {/* --- Twitter Cards --- */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@VahiniDInterio" /> {/* Placeholder handle */}
            <meta name="twitter:creator" content="@VahiniDInterio" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={fullTitle} />

            {/* --- Mobile / PWA --- */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content={siteTitle} />

            {/* --- Structured Data (JSON-LD) --- */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
