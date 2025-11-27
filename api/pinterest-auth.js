// Vercel Serverless Function for Pinterest OAuth
// Endpoint: /api/pinterest-auth

export default async function handler(req, res) {
    const { code, error } = req.query;

    // Step 1: Redirect to Pinterest OAuth
    if (!code && !error) {
        const APP_ID = process.env.PINTEREST_APP_ID || '1537549';
        const REDIRECT_URI = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/pinterest-auth`
            : 'http://localhost:3000/api/pinterest-auth';

        const scope = 'boards:read,pins:read,user_accounts:read';
        const authUrl = `https://www.pinterest.com/oauth/?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;

        return res.redirect(authUrl);
    }

    // Step 2: Handle OAuth callback
    if (error) {
        return res.status(400).send(`
            <html>
                <body style="font-family: Arial; padding: 40px; text-align: center;">
                    <h1 style="color: #e60023;">Pinterest Authorization Failed</h1>
                    <p>Error: ${error}</p>
                    <a href="/connect" style="color: #e60023;">Return to Connect Page</a>
                </body>
            </html>
        `);
    }

    // Step 3: Exchange code for access token
    try {
        const APP_ID = process.env.PINTEREST_APP_ID || '1537549';
        const APP_SECRET = process.env.PINTEREST_APP_SECRET;
        const REDIRECT_URI = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/pinterest-auth`
            : 'http://localhost:3000/api/pinterest-auth';

        const tokenResponse = await fetch('https://api.pinterest.com/v5/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${APP_ID}:${APP_SECRET}`).toString('base64')}`
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI
            })
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.access_token) {
            // Success! Display the token
            return res.status(200).send(`
                <html>
                    <head>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background: linear-gradient(135deg, #e60023 0%, #bd081c 100%);
                                padding: 40px;
                                color: white;
                            }
                            .container {
                                max-width: 800px;
                                margin: 0 auto;
                                background: white;
                                padding: 40px;
                                border-radius: 20px;
                                color: #333;
                                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                            }
                            h1 {
                                color: #e60023;
                                margin-bottom: 20px;
                            }
                            .token-box {
                                background: #f7f7f7;
                                padding: 20px;
                                border-radius: 10px;
                                margin: 20px 0;
                                word-break: break-all;
                                font-family: monospace;
                                border: 2px solid #e60023;
                            }
                            .success {
                                color: #28a745;
                                font-weight: bold;
                            }
                            .instructions {
                                background: #fff3cd;
                                padding: 20px;
                                border-radius: 10px;
                                border-left: 4px solid #ffc107;
                                margin: 20px 0;
                            }
                            button {
                                background: #e60023;
                                color: white;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-size: 16px;
                                margin: 10px 5px;
                            }
                            button:hover {
                                background: #bd081c;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>✅ Pinterest Authorization Successful!</h1>
                            <p class="success">Your permanent access token has been generated.</p>
                            
                            <div class="instructions">
                                <h3>📋 Next Steps:</h3>
                                <ol>
                                    <li>Copy the access token below</li>
                                    <li>Add it to your Vercel environment variables</li>
                                    <li>Variable name: <code>PINTEREST_ACCESS_TOKEN</code></li>
                                    <li>This token will not expire unless you revoke it</li>
                                </ol>
                            </div>

                            <h3>Your Access Token:</h3>
                            <div class="token-box" id="token">
                                ${tokenData.access_token}
                            </div>

                            <button onclick="copyToken()">📋 Copy Token</button>
                            <button onclick="window.location.href='/connect'">🏠 Go to Connect Page</button>

                            ${tokenData.refresh_token ? `
                                <h3>Refresh Token (Optional):</h3>
                                <div class="token-box">
                                    ${tokenData.refresh_token}
                                </div>
                                <p><small>Save this to refresh your access token when needed</small></p>
                            ` : ''}

                            <div style="margin-top: 30px; padding: 20px; background: #e7f3ff; border-radius: 10px;">
                                <h4>Token Details:</h4>
                                <ul>
                                    <li><strong>Expires:</strong> ${tokenData.expires_in ? `${tokenData.expires_in} seconds` : 'Never (permanent)'}</li>
                                    <li><strong>Scope:</strong> ${tokenData.scope || 'boards:read, pins:read, user_accounts:read'}</li>
                                    <li><strong>Token Type:</strong> ${tokenData.token_type || 'Bearer'}</li>
                                </ul>
                            </div>
                        </div>

                        <script>
                            function copyToken() {
                                const token = document.getElementById('token').textContent.trim();
                                navigator.clipboard.writeText(token).then(() => {
                                    alert('✅ Token copied to clipboard!');
                                });
                            }
                        </script>
                    </body>
                </html>
            `);
        } else {
            throw new Error(tokenData.message || 'Failed to get access token');
        }

    } catch (error) {
        console.error('Pinterest OAuth Error:', error);
        return res.status(500).send(`
            <html>
                <body style="font-family: Arial; padding: 40px; text-align: center;">
                    <h1 style="color: #e60023;">Error Getting Access Token</h1>
                    <p>${error.message}</p>
                    <a href="/api/pinterest-auth" style="color: #e60023;">Try Again</a>
                </body>
            </html>
        `);
    }
}
