import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics 4 Component (Performance Optimized)
 * 
 * Features:
 * - Loads asynchronously after page is interactive
 * - Tracks page views on route changes
 * - Zero performance impact on Lighthouse scores
 * - Includes event tracking helpers
 */

const Analytics = () => {
    const location = useLocation();
    const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

    // Initialize GA4 only once, after page load
    useEffect(() => {
        // Skip if no measurement ID is set
        if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
            console.warn('⚠️ Google Analytics: Measurement ID not configured. Add REACT_APP_GA_MEASUREMENT_ID to your .env file');
            return;
        }

        // Skip in development (optional)
        if (process.env.NODE_ENV === 'development') {
            console.log('📊 Analytics: Disabled in development mode');
            return;
        }

        // Load GA script asynchronously (non-blocking)
        const loadGA = () => {
            // Check if already loaded
            if (window.gtag) return;

            // Create script element
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            script.async = true;
            script.defer = true;

            // Add to document
            document.head.appendChild(script);

            // Initialize dataLayer
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID, {
                send_page_view: false, // We'll handle this manually for SPA
                anonymize_ip: true, // GDPR compliance
            });
        };

        // Load after page is fully interactive (doesn't block rendering)
        if (document.readyState === 'complete') {
            loadGA();
        } else {
            window.addEventListener('load', loadGA);
            return () => window.removeEventListener('load', loadGA);
        }
    }, [GA_MEASUREMENT_ID]);

    // Track page views on route change (SPA support)
    useEffect(() => {
        if (!window.gtag || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
        if (process.env.NODE_ENV === 'development') return;

        // Send page view
        window.gtag('event', 'page_view', {
            page_path: location.pathname + location.search,
            page_location: window.location.href,
            page_title: document.title,
        });

        console.log('📊 GA4: Page view tracked -', location.pathname);
    }, [location, GA_MEASUREMENT_ID]);

    // No UI needed
    return null;
};

// Export helper functions for custom event tracking
export const trackEvent = (eventName, eventParams = {}) => {
    if (!window.gtag) {
        console.warn('⚠️ Analytics not loaded yet');
        return;
    }

    if (process.env.NODE_ENV === 'development') {
        console.log('📊 Event (dev):', eventName, eventParams);
        return;
    }

    window.gtag('event', eventName, eventParams);
    console.log('📊 GA4: Event tracked -', eventName, eventParams);
};

// Common event helpers
export const trackButtonClick = (buttonName, category = 'engagement') => {
    trackEvent('button_click', {
        event_category: category,
        event_label: buttonName,
    });
};

export const trackFormSubmission = (formName) => {
    trackEvent('form_submission', {
        event_category: 'form',
        event_label: formName,
    });
};

export const trackOutboundLink = (url, linkName) => {
    trackEvent('outbound_click', {
        event_category: 'outbound',
        event_label: linkName,
        event_value: url,
    });
};

export const trackPhoneClick = () => {
    trackEvent('phone_call_intent', {
        event_category: 'contact',
        event_label: 'phone_number_clicked',
    });
};

export const trackWhatsAppClick = () => {
    trackEvent('whatsapp_intent', {
        event_category: 'contact',
        event_label: 'whatsapp_clicked',
    });
};

export default Analytics;
