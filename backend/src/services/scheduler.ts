import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/db.js';

export const schedulerRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Store scheduled jobs in memory (for simple deployment without Redis)
const scheduledJobs = new Map<string, NodeJS.Timeout>();

// Auth middleware
const authMiddleware = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'No token provided' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
};

// POST /api/scheduler/schedule - Schedule a post
schedulerRouter.post('/schedule', authMiddleware, async (req: any, res) => {
    try {
        const { postId, scheduledAt } = req.body;
        const userId = req.userId;

        if (!postId || !scheduledAt) {
            return res.status(400).json({ success: false, error: 'postId and scheduledAt are required' });
        }

        const scheduledDate = new Date(scheduledAt);
        if (scheduledDate <= new Date()) {
            return res.status(400).json({ success: false, error: 'Scheduled time must be in the future' });
        }

        // Verify post belongs to user
        const post = await prisma.post.findFirst({
            where: { id: postId, userId },
        });

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }

        // Update post status
        await prisma.post.update({
            where: { id: postId },
            data: {
                status: 'SCHEDULED',
                scheduledAt: scheduledDate,
            },
        });

        // Schedule the job
        schedulePost(postId, scheduledDate, userId);

        res.json({
            success: true,
            data: {
                postId,
                scheduledAt: scheduledDate.toISOString(),
                message: 'Post scheduled successfully',
            },
        });
    } catch (error) {
        console.error('Schedule post error:', error);
        res.status(500).json({ success: false, error: 'Failed to schedule post' });
    }
});

// POST /api/scheduler/cancel - Cancel a scheduled post
schedulerRouter.post('/cancel', authMiddleware, async (req: any, res) => {
    try {
        const { postId } = req.body;
        const userId = req.userId;

        // Verify post belongs to user
        const post = await prisma.post.findFirst({
            where: { id: postId, userId, status: 'SCHEDULED' },
        });

        if (!post) {
            return res.status(404).json({ success: false, error: 'Scheduled post not found' });
        }

        // Cancel the job
        const jobKey = `post:${postId}`;
        if (scheduledJobs.has(jobKey)) {
            clearTimeout(scheduledJobs.get(jobKey));
            scheduledJobs.delete(jobKey);
        }

        // Update post status back to draft
        await prisma.post.update({
            where: { id: postId },
            data: {
                status: 'DRAFT',
                scheduledAt: null,
            },
        });

        res.json({
            success: true,
            message: 'Schedule cancelled',
        });
    } catch (error) {
        console.error('Cancel schedule error:', error);
        res.status(500).json({ success: false, error: 'Failed to cancel schedule' });
    }
});

// GET /api/scheduler/upcoming - Get upcoming scheduled posts
schedulerRouter.get('/upcoming', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.userId;

        const scheduledPosts = await prisma.post.findMany({
            where: {
                userId,
                status: 'SCHEDULED',
                scheduledAt: { gt: new Date() },
            },
            orderBy: { scheduledAt: 'asc' },
            take: 10,
        });

        res.json({
            success: true,
            data: scheduledPosts,
        });
    } catch (error) {
        console.error('Get upcoming error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch scheduled posts' });
    }
});

// Schedule a post to be published
function schedulePost(postId: string, scheduledAt: Date, userId: string) {
    const delay = scheduledAt.getTime() - Date.now();

    if (delay <= 0) {
        // Already past, publish immediately
        publishPost(postId, userId);
        return;
    }

    const jobKey = `post:${postId}`;

    // Cancel existing job if any
    if (scheduledJobs.has(jobKey)) {
        clearTimeout(scheduledJobs.get(jobKey));
    }

    // Schedule new job
    const timeout = setTimeout(() => {
        publishPost(postId, userId);
        scheduledJobs.delete(jobKey);
    }, delay);

    scheduledJobs.set(jobKey, timeout);
    console.log(`📅 Scheduled post ${postId} for ${scheduledAt.toISOString()}`);
}

// Publish a post to LinkedIn
async function publishPost(postId: string, userId: string) {
    try {
        console.log(`📤 Publishing post ${postId}...`);

        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { user: true },
        });

        if (!post) {
            console.error(`Post ${postId} not found`);
            return;
        }

        // Check if LinkedIn is connected
        if (!post.user.linkedinConnected || !post.user.linkedinAccessToken || !post.user.linkedinPersonUrn) {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    status: 'FAILED',
                    publishError: 'LinkedIn not connected',
                },
            });
            console.error(`Post ${postId} failed: LinkedIn not connected`);
            return;
        }

        // Check if token is expired
        if (post.user.linkedinTokenExpiry && new Date(post.user.linkedinTokenExpiry) < new Date()) {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    status: 'FAILED',
                    publishError: 'LinkedIn token expired',
                },
            });
            console.error(`Post ${postId} failed: LinkedIn token expired`);
            return;
        }

        // Publish to LinkedIn
        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${post.user.linkedinAccessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
            },
            body: JSON.stringify({
                author: post.user.linkedinPersonUrn,
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: post.content,
                        },
                        shareMediaCategory: 'NONE',
                    },
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            await prisma.post.update({
                where: { id: postId },
                data: {
                    status: 'FAILED',
                    publishError: errorData.message || 'LinkedIn API error',
                },
            });
            console.error(`Post ${postId} failed:`, errorData);
            return;
        }

        const data = await response.json();

        // Update post as published
        await prisma.post.update({
            where: { id: postId },
            data: {
                status: 'PUBLISHED',
                publishedAt: new Date(),
                linkedinPostId: data.id,
                publishError: null,
            },
        });

        console.log(`✅ Post ${postId} published successfully`);
    } catch (error) {
        console.error(`Error publishing post ${postId}:`, error);
        await prisma.post.update({
            where: { id: postId },
            data: {
                status: 'FAILED',
                publishError: 'Unknown error occurred',
            },
        });
    }
}

// Initialize scheduler - reschedule any pending posts on startup
export async function initScheduler() {
    try {
        console.log('🔄 Initializing post scheduler...');

        const pendingPosts = await prisma.post.findMany({
            where: {
                status: 'SCHEDULED',
                scheduledAt: { gt: new Date() },
            },
            include: { user: true },
        });

        for (const post of pendingPosts) {
            if (post.scheduledAt) {
                schedulePost(post.id, post.scheduledAt, post.userId);
            }
        }

        console.log(`✅ Scheduler initialized with ${pendingPosts.length} pending posts`);
    } catch (error) {
        console.error('Failed to initialize scheduler:', error);
    }
}
