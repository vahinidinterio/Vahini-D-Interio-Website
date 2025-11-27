import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

// NOTE: This is a serverless function. It runs on the server side.
// You must add the following environment variables to your Vercel project:
// - INSTAGRAM_ACCESS_TOKEN
// - FACEBOOK_PAGE_ACCESS_TOKEN
// - YOUTUBE_API_KEY
// - LINKEDIN_ACCESS_TOKEN (Optional)

export default async function handler(req, res) {
    try {
        // 1. Fetch Instagram Posts
        // Documentation: https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media
        const instagramPosts = await fetchInstagramPosts();

        // 2. Fetch YouTube Videos
        // Documentation: https://developers.google.com/youtube/v3/docs/search/list
        const youtubeVideos = await fetchYouTubeVideos();

        // 3. Combine and Sort by Date
        const allPosts = [...instagramPosts, ...youtubeVideos]
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        // Return the aggregated feed
        res.status(200).json(allPosts);
    } catch (error) {
        console.error('Social Feed Error:', error);
        // Fallback to mock data if API fails (prevents broken UI)
        res.status(200).json(getMockData());
    }
}

// --- Helper Functions ---

async function fetchInstagramPosts() {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!token) return [];

    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${token}`);
        const data = await response.json();

        if (data.error) {
            console.error('Instagram API Error:', data.error);
            return [];
        }

        return data.data.map(post => ({
            id: post.id,
            platform: 'Instagram',
            type: post.media_type === 'VIDEO' ? 'video' : 'image',
            caption: post.caption || '',
            mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
            permalink: post.permalink,
            date: post.timestamp,
            likes: Math.floor(Math.random() * 50) + 10, // Placeholder as Basic Display API doesn't return likes
            comments: Math.floor(Math.random() * 5) + 1,
            icon: 'Instagram'
        }));
    } catch (e) {
        console.error('Failed to fetch Instagram:', e);
        return [];
    }
}

async function fetchYouTubeVideos() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = 'YOUR_CHANNEL_ID'; // Replace with actual Channel ID if known, or fetch from env
    if (!apiKey) return [];

    try {
        // Fetch latest videos from channel
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`);
        const data = await response.json();

        if (data.error) {
            console.error('YouTube API Error:', data.error);
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
            views: '1.2k', // Placeholder
            icon: 'Youtube'
        }));
    } catch (e) {
        console.error('Failed to fetch YouTube:', e);
        return [];
    }
}

function getMockData() {
    return [
        {
            id: '1',
            platform: 'Instagram',
            type: 'image',
            caption: 'Minimalist bedroom design with custom teak wood wardrobe. #VahiniDInterio #InteriorDesign',
            mediaUrl: 'https://images.unsplash.com/photo-1616594039964-40891a909d99?auto=format&fit=crop&q=80&w=600',
            permalink: 'https://instagram.com',
            date: new Date().toISOString(),
            likes: 124,
            comments: 12,
            icon: 'Instagram'
        },
        {
            id: '2',
            platform: 'YouTube',
            type: 'video',
            caption: 'Full Home Tour: 3BHK in Narasaraopet | Traditional Meets Modern',
            mediaUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600',
            permalink: 'https://youtube.com',
            date: new Date(Date.now() - 86400000).toISOString(),
            views: '3.5k',
            icon: 'Youtube'
        },
        {
            id: '3',
            platform: 'Facebook',
            type: 'text',
            caption: 'We are excited to announce our new partnership with premium laminate suppliers! Quality just got an upgrade.',
            mediaUrl: null,
            permalink: 'https://facebook.com',
            date: new Date(Date.now() - 172800000).toISOString(),
            likes: 45,
            comments: 8,
            icon: 'Facebook'
        },
        {
            id: '4',
            platform: 'Instagram',
            type: 'image',
            caption: 'Custom Pooja Mandir design in progress. The intricate carving details are stunning! ✨',
            mediaUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
            permalink: 'https://instagram.com',
            date: new Date(Date.now() - 259200000).toISOString(),
            likes: 210,
            comments: 34,
            icon: 'Instagram',
            colSpan: 2,
            rowSpan: 2
        }
    ];
}
