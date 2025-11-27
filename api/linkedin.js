// Vercel Serverless Function for LinkedIn API
// Endpoint: /api/linkedin

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
        const COMPANY_ID = process.env.LINKEDIN_COMPANY_ID || 'vahinidinterio';

        if (!ACCESS_TOKEN) {
            console.error('LinkedIn access token not found');
            return res.status(200).json({
                success: false,
                posts: [],
                error: 'Access token not configured'
            });
        }

        // Fetch organization posts using LinkedIn API v2
        // Note: This requires the r_organization_social scope
        const response = await fetch(
            `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn%3Ali%3Aorganization%3A${COMPANY_ID})&count=10&sortBy=LAST_MODIFIED`,
            {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'X-Restli-Protocol-Version': '2.0.0',
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('LinkedIn API error:', response.status, errorText);
            return res.status(200).json({
                success: false,
                posts: [],
                error: `LinkedIn API returned ${response.status}`
            });
        }

        const data = await response.json();

        // Transform LinkedIn posts to our format
        const posts = (data.elements || []).map(post => {
            const specificContent = post.specificContent?.['com.linkedin.ugc.ShareContent'];
            const shareCommentary = specificContent?.shareCommentary?.text || '';
            const media = specificContent?.media?.[0];

            return {
                id: post.id,
                text: shareCommentary,
                author: post.author,
                createdAt: new Date(post.created?.time || Date.now()).toISOString(),
                lastModified: new Date(post.lastModified?.time || Date.now()).toISOString(),
                imageUrl: media?.thumbnails?.[0]?.url || null,
                link: `https://www.linkedin.com/feed/update/${post.id}`,
                lifeycleState: post.lifecycleState,
                visibility: post.visibility?.['com.linkedin.ugc.MemberNetworkVisibility']
            };
        });

        res.status(200).json({
            success: true,
            posts: posts,
            count: posts.length
        });

    } catch (error) {
        console.error('LinkedIn API Error:', error);
        res.status(200).json({
            success: false,
            posts: [],
            error: error.message
        });
    }
}
