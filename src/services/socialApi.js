// src/services/socialApi.js
import { Instagram, Facebook, Youtube, Linkedin, Globe } from 'lucide-react';

const MOCK_POSTS = [
    {
        id: 1,
        platform: 'Instagram',
        type: 'image',
        caption: 'Minimalist bedroom design with custom teak wood wardrobe. #VahiniDInterio #InteriorDesign',
        mediaUrl: 'https://images.unsplash.com/photo-1616594039964-40891a909d99?auto=format&fit=crop&q=80&w=600',
        likes: '1.2k',
        comments: 45,
        icon: 'Instagram',
        colSpan: 1,
        rowSpan: 1,
        isNew: true
    },
    {
        id: 2,
        platform: 'YouTube',
        type: 'video',
        caption: 'Full Home Tour: 3BHK in Narasaraopet | Traditional Meets Modern',
        mediaUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600',
        views: '5.4k',
        icon: 'Youtube',
        colSpan: 2,
        rowSpan: 2
    },
    {
        id: 3,
        platform: 'Facebook',
        type: 'text',
        caption: 'We are excited to announce our new partnership with premium laminate suppliers! Quality just got an upgrade.',
        likes: 89,
        comments: 12,
        icon: 'Facebook',
        colSpan: 1,
        rowSpan: 1
    },
    {
        id: 4,
        platform: 'Instagram',
        type: 'image',
        caption: 'Custom Pooja Mandir design in progress. The intricate carving details are stunning! ✨',
        mediaUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
        likes: 856,
        comments: 32,
        icon: 'Instagram',
        colSpan: 1,
        rowSpan: 1
    },
    {
        id: 5,
        platform: 'LinkedIn',
        type: 'text',
        caption: 'Hiring Alert: We are looking for experienced carpenters to join our growing team in Guntur.',
        likes: 45,
        comments: 8,
        icon: 'Linkedin',
        colSpan: 1,
        rowSpan: 1
    },
    {
        id: 6,
        platform: 'Instagram',
        type: 'shorts',
        caption: 'Before vs After: Kitchen Renovation 🔨',
        mediaUrl: 'https://images.unsplash.com/photo-1556911220-e8db8e153d67?auto=format&fit=crop&q=80&w=600',
        likes: '2.1k',
        comments: 120,
        icon: 'Instagram',
        colSpan: 1,
        rowSpan: 2
    },
    {
        id: 7,
        platform: 'Pinterest',
        type: 'image',
        caption: 'Living Room Inspiration Board 2025',
        mediaUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
        likes: 340,
        comments: 5,
        icon: 'Globe',
        colSpan: 1,
        rowSpan: 1
    }
];

export const fetchSocialPosts = async () => {
    try {
        // Call our Vercel Serverless Function
        const response = await fetch('/api/social-feed');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        return data.map(post => ({
            ...post,
            icon: getIconComponent(post.icon)
        }));
    } catch (error) {
        console.warn("API Fetch Error (Expected on Localhost), attempting direct fetch...");

        // 1. Try to fetch real YouTube data directly
        const youtubePosts = await fetchYouTubeDirectly();

        // 2. Try to fetch real Facebook data directly
        const facebookPosts = await fetchFacebookDirectly();

        // 3. Get other mock posts (exclude YouTube/FB mocks if we have real data)
        const otherMockPosts = MOCK_POSTS.filter(p => {
            if (p.platform === 'YouTube' && youtubePosts.length > 0) return false;
            if (p.platform === 'Facebook' && facebookPosts.length > 0) return false;
            return true;
        });

        // 4. Combine and Sort
        const combined = [...youtubePosts, ...facebookPosts, ...otherMockPosts].sort((a, b) => {
            // Handle mock dates vs real dates
            const dateA = a.date ? new Date(a.date) : new Date();
            const dateB = b.date ? new Date(b.date) : new Date();
            return dateB - dateA;
        });

        return combined.map(post => ({
            ...post,
            icon: getIconComponent(post.icon)
        }));
    }
};

const fetchYouTubeDirectly = async () => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!apiKey) return [];

    try {
        // Search for videos related to "Vahini D'Interio"
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=Vahini%20D'Interio&part=snippet,id&order=date&maxResults=4&type=video`);
        const data = await response.json();

        if (data.error) {
            console.error('YouTube Direct API Error:', data.error);
            return [];
        }

        return data.items.map(item => ({
            id: item.id.videoId,
            platform: 'YouTube',
            type: 'video',
            caption: item.snippet.title,
            mediaUrl: item.snippet.thumbnails.high.url,
            permalink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            date: item.snippet.publishedAt,
            views: 'New', // Can't get views in search endpoint without extra call
            icon: 'Youtube',
            colSpan: 1,
            rowSpan: 1
        }));
    } catch (e) {
        console.error('Failed to fetch YouTube directly:', e);
        return [];
    }
};

const fetchFacebookDirectly = async () => {
    const token = process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN;
    if (!token) return [];

    try {
        // Fetch posts from 'me' (the user/page associated with the token)
        const response = await fetch(`https://graph.facebook.com/v18.0/me/posts?fields=id,message,full_picture,permalink_url,created_time,likes.summary(true),comments.summary(true)&limit=5&access_token=${token}`);
        const data = await response.json();

        if (data.error) {
            console.error('Facebook Direct API Error:', data.error);
            return [];
        }

        return data.data.map(post => ({
            id: post.id,
            platform: 'Facebook',
            type: post.full_picture ? 'image' : 'text',
            caption: post.message || 'No caption',
            mediaUrl: post.full_picture || null,
            permalink: post.permalink_url,
            date: post.created_time,
            likes: post.likes?.summary?.total_count || 0,
            comments: post.comments?.summary?.total_count || 0,
            icon: 'Facebook',
            colSpan: 1,
            rowSpan: 1
        }));
    } catch (e) {
        console.error('Failed to fetch Facebook directly:', e);
        return [];
    }
};

const getIconComponent = (iconName) => {
    switch (iconName) {
        case 'Instagram': return <Instagram size={16} />;
        case 'Facebook': return <Facebook size={16} />;
        case 'Youtube': return <Youtube size={16} />;
        case 'Linkedin': return <Linkedin size={16} />;
        default: return <Globe size={16} />;
    }
};
