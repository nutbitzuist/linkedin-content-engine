import { Router } from 'express';

export const linkedinRouter = Router();

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:4000/api/linkedin/callback';

// Store tokens in memory for demo (use database in production)
const linkedinTokens: Record<string, any> = {};

// GET /api/linkedin/auth - Start OAuth flow
linkedinRouter.get('/auth', (req, res) => {
  const scope = 'openid profile w_member_social';
  const state = Math.random().toString(36).substring(7);
  
  // Store state for verification
  // In production, associate with user session
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${LINKEDIN_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&` +
    `state=${state}&` +
    `scope=${encodeURIComponent(scope)}`;
  
  res.json({ success: true, data: { authUrl } });
});

// GET /api/linkedin/callback - OAuth callback
linkedinRouter.get('/callback', async (req, res) => {
  const { code, state, error } = req.query;
  
  if (error) {
    return res.redirect(`http://localhost:3000/dashboard?linkedin_error=${error}`);
  }
  
  if (!code) {
    return res.redirect('http://localhost:3000/dashboard?linkedin_error=no_code');
  }
  
  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID!,
        client_secret: LINKEDIN_CLIENT_SECRET!,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return res.redirect(`http://localhost:3000/dashboard?linkedin_error=${tokenData.error}`);
    }
    
    // Get user profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });
    
    const profileData = await profileResponse.json();
    
    // Store tokens (in production, associate with user in database)
    const userId = 'demo-user'; // Get from session in production
    linkedinTokens[userId] = {
      accessToken: tokenData.access_token,
      expiresAt: Date.now() + (tokenData.expires_in * 1000),
      profile: {
        id: profileData.sub,
        name: profileData.name,
        picture: profileData.picture,
      },
    };
    
    res.redirect('http://localhost:3000/dashboard?linkedin_connected=true');
  } catch (error) {
    console.error('LinkedIn OAuth error:', error);
    res.redirect('http://localhost:3000/dashboard?linkedin_error=oauth_failed');
  }
});

// GET /api/linkedin/status - Check connection status
linkedinRouter.get('/status', (req, res) => {
  const userId = 'demo-user'; // Get from auth middleware in production
  const tokens = linkedinTokens[userId];
  
  if (!tokens || tokens.expiresAt < Date.now()) {
    return res.json({
      success: true,
      data: { connected: false },
    });
  }
  
  res.json({
    success: true,
    data: {
      connected: true,
      profile: tokens.profile,
    },
  });
});

// POST /api/linkedin/post - Create a LinkedIn post
linkedinRouter.post('/post', async (req, res) => {
  const userId = 'demo-user';
  const tokens = linkedinTokens[userId];
  
  if (!tokens || tokens.expiresAt < Date.now()) {
    return res.status(401).json({
      success: false,
      error: 'LinkedIn not connected or token expired',
    });
  }
  
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({
      success: false,
      error: 'Content is required',
    });
  }
  
  try {
    // Create post using LinkedIn API
    const postResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: `urn:li:person:${tokens.profile.id}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    });
    
    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      return res.status(postResponse.status).json({
        success: false,
        error: errorData.message || 'Failed to create post',
      });
    }
    
    const postData = await postResponse.json();
    
    res.json({
      success: true,
      data: {
        postId: postData.id,
        message: 'Post published successfully',
      },
    });
  } catch (error) {
    console.error('LinkedIn post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to publish post',
    });
  }
});

// POST /api/linkedin/disconnect - Disconnect LinkedIn
linkedinRouter.post('/disconnect', (req, res) => {
  const userId = 'demo-user';
  delete linkedinTokens[userId];
  
  res.json({
    success: true,
    message: 'LinkedIn disconnected',
  });
});
