// src/hooks/useRateLimiter.js
import { useState, useEffect, useCallback } from 'react';

const MAX_USES = 5;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000;
const USAGE_COUNT_KEY = 'vahini_ai_count';
const LAST_RESET_KEY = 'vahini_ai_reset';

const formatTimeRemaining = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (totalSeconds <= 0) return 'immediately';
    let parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);
    return parts.join(' ');
};

export const useRateLimiter = () => {
    const [usageCount, setUsageCount] = useState(0);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [timeUntilReset, setTimeUntilReset] = useState('');

    const checkAndReset = useCallback(() => {
        const lastReset = parseInt(localStorage.getItem(LAST_RESET_KEY) || '0', 10);
        const now = Date.now();

        if (now - lastReset >= RESET_INTERVAL_MS) {
            localStorage.setItem(USAGE_COUNT_KEY, '0');
            localStorage.setItem(LAST_RESET_KEY, now.toString());
            setUsageCount(0);
            setIsRateLimited(false);
            setTimeUntilReset('');
        } else {
            const currentCount = parseInt(localStorage.getItem(USAGE_COUNT_KEY) || '0', 10);
            setUsageCount(currentCount);

            if (currentCount >= MAX_USES) {
                setIsRateLimited(true);
                const remainingTime = lastReset + RESET_INTERVAL_MS - now;
                setTimeUntilReset(formatTimeRemaining(remainingTime));
            } else {
                setIsRateLimited(false);
            }
        }
    }, []);

    useEffect(() => {
        checkAndReset();
        const intervalId = setInterval(checkAndReset, 1000);

        // Listen for storage changes from other tabs
        window.addEventListener('storage', checkAndReset);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('storage', checkAndReset);
        };
    }, [checkAndReset]);

    const incrementUsage = useCallback(() => {
        const lastReset = parseInt(localStorage.getItem(LAST_RESET_KEY) || '0', 10);
        const currentCount = parseInt(localStorage.getItem(USAGE_COUNT_KEY) || '0', 10);
        const newCount = currentCount + 1;
        localStorage.setItem(USAGE_COUNT_KEY, newCount.toString());
        setUsageCount(newCount);

        if (lastReset === 0 || Date.now() - lastReset >= RESET_INTERVAL_MS) {
            localStorage.setItem(LAST_RESET_KEY, Date.now().toString());
        }

        if (newCount >= MAX_USES) {
            setIsRateLimited(true);
            const remainingTime = parseInt(localStorage.getItem(LAST_RESET_KEY), 10) + RESET_INTERVAL_MS - Date.now();
            setTimeUntilReset(formatTimeRemaining(remainingTime));
        }
    }, []);

    return {
        usageCount,
        maxUses: MAX_USES,
        isRateLimited,
        timeUntilReset,
        canUseAI: !isRateLimited,
        incrementUsage,
    };
};
