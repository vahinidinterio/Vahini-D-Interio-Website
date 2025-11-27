// Vercel Serverless Function for Pinterest API
// Endpoint: /api/pinterest

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const ACCESS_TOKEN = process.env.PINTEREST_ACCESS_TOKEN;

        if (!ACCESS_TOKEN) {
            console.error('Pinterest access token not found');
            return res.status(200).json({
                success: false,
                pins: [],
                error: 'Access token not configured'
            });
        }

        // Your specific pin IDs
        const pinIds = [
            '1000925085945829162',
            '1000925085945829163',
            '1000925085945944824'
        ];

        // Fetch all pins in parallel
        const pinPromises = pinIds.map(async (pinId) => {
            try {
                const response = await fetch(
                    `https://api.pinterest.com/v5/pins/${pinId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${ACCESS_TOKEN}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    console.error(`Pinterest API error for pin ${pinId}:`, response.status);
                    return null;
                }

                const data = await response.json();

                return {
                    id: data.id,
                    title: data.title || 'Vahini D\'Interio Design',
                    description: data.description || '',
                    imageUrl: data.media?.images?.['600x']?.url || data.media?.images?.original?.url,
                    link: data.link || `https://in.pinterest.com/pin/${pinId}/`,
                    boardName: data.board_name || 'Vahini Designs',
                    createdAt: data.created_at
                };
            } catch (error) {
                console.error(`Error fetching pin ${pinId}:`, error);
                return null;
            }
        });

        const pins = await Promise.all(pinPromises);
        const validPins = pins.filter(pin => pin !== null);

        res.status(200).json({
            success: true,
            pins: validPins,
            count: validPins.length
        });

    } catch (error) {
        console.error('Pinterest API Error:', error);
        res.status(200).json({
            success: false,
            pins: [],
            error: error.message
        });
    }
}
