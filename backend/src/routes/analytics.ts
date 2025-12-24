import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/db.js';

export const analyticsRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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

// GET /api/analytics/overview - Dashboard summary stats
analyticsRouter.get('/overview', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.userId;

        // Get post counts
        const [totalPosts, publishedPosts, scheduledPosts, draftPosts] = await Promise.all([
            prisma.post.count({ where: { userId } }),
            prisma.post.count({ where: { userId, status: 'PUBLISHED' } }),
            prisma.post.count({ where: { userId, status: 'SCHEDULED' } }),
            prisma.post.count({ where: { userId, status: 'DRAFT' } }),
        ]);

        // Get aggregated analytics
        const analyticsAgg = await prisma.postAnalytics.aggregate({
            where: { post: { userId } },
            _sum: {
                impressions: true,
                likes: true,
                comments: true,
                shares: true,
                clicks: true,
            },
            _avg: {
                engagement: true,
            },
        });

        // Posts this week
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const postsThisWeek = await prisma.post.count({
            where: {
                userId,
                createdAt: { gte: weekAgo },
            },
        });

        // Posts last week for comparison
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const postsLastWeek = await prisma.post.count({
            where: {
                userId,
                createdAt: { gte: twoWeeksAgo, lt: weekAgo },
            },
        });

        res.json({
            success: true,
            data: {
                posts: {
                    total: totalPosts,
                    published: publishedPosts,
                    scheduled: scheduledPosts,
                    drafts: draftPosts,
                    thisWeek: postsThisWeek,
                    lastWeek: postsLastWeek,
                },
                engagement: {
                    totalImpressions: analyticsAgg._sum.impressions || 0,
                    totalLikes: analyticsAgg._sum.likes || 0,
                    totalComments: analyticsAgg._sum.comments || 0,
                    totalShares: analyticsAgg._sum.shares || 0,
                    totalClicks: analyticsAgg._sum.clicks || 0,
                    avgEngagement: analyticsAgg._avg.engagement || 0,
                },
            },
        });
    } catch (error) {
        console.error('Analytics overview error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
    }
});

// GET /api/analytics/posts - Per-post metrics
analyticsRouter.get('/posts', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.userId;
        const { limit = 10, offset = 0 } = req.query;

        const posts = await prisma.post.findMany({
            where: { userId, status: 'PUBLISHED' },
            include: { analytics: true },
            orderBy: { publishedAt: 'desc' },
            take: Number(limit),
            skip: Number(offset),
        });

        res.json({
            success: true,
            data: posts.map(post => ({
                id: post.id,
                content: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''),
                publishedAt: post.publishedAt,
                analytics: post.analytics || {
                    impressions: 0,
                    likes: 0,
                    comments: 0,
                    shares: 0,
                    clicks: 0,
                    engagement: 0,
                },
            })),
        });
    } catch (error) {
        console.error('Post analytics error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch post analytics' });
    }
});

// GET /api/analytics/trends - Engagement trends over time
analyticsRouter.get('/trends', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.userId;
        const { days = 30 } = req.query;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - Number(days));

        // Get published posts in date range with analytics
        const posts = await prisma.post.findMany({
            where: {
                userId,
                status: 'PUBLISHED',
                publishedAt: { gte: startDate },
            },
            include: { analytics: true },
            orderBy: { publishedAt: 'asc' },
        });

        // Group by day
        const trendMap = new Map<string, { impressions: number; engagement: number; posts: number }>();

        posts.forEach(post => {
            if (post.publishedAt) {
                const dateKey = post.publishedAt.toISOString().split('T')[0];
                const existing = trendMap.get(dateKey) || { impressions: 0, engagement: 0, posts: 0 };
                trendMap.set(dateKey, {
                    impressions: existing.impressions + (post.analytics?.impressions || 0),
                    engagement: existing.engagement + (post.analytics?.engagement || 0),
                    posts: existing.posts + 1,
                });
            }
        });

        // Convert to array
        const trends = Array.from(trendMap.entries()).map(([date, data]) => ({
            date,
            impressions: data.impressions,
            engagement: data.posts > 0 ? data.engagement / data.posts : 0,
            posts: data.posts,
        }));

        res.json({
            success: true,
            data: trends,
        });
    } catch (error) {
        console.error('Analytics trends error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch trends' });
    }
});

// POST /api/analytics/sync - Sync analytics from LinkedIn (placeholder)
analyticsRouter.post('/sync', authMiddleware, async (req: any, res) => {
    try {
        const userId = req.userId;

        // Get user's LinkedIn connection status
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { linkedinConnected: true, linkedinAccessToken: true },
        });

        if (!user?.linkedinConnected || !user?.linkedinAccessToken) {
            return res.status(400).json({
                success: false,
                error: 'LinkedIn not connected. Please connect your LinkedIn account first.',
            });
        }

        // Note: LinkedIn Marketing API requires approval for reading post metrics
        // This would integrate with LinkedIn's UGC Posts API to fetch actual metrics
        // For now, we'll simulate with random data for demo purposes

        const publishedPosts = await prisma.post.findMany({
            where: { userId, status: 'PUBLISHED', linkedinPostId: { not: null } },
            select: { id: true, linkedinPostId: true },
        });

        // Update or create analytics for each post (simulated data for demo)
        for (const post of publishedPosts) {
            await prisma.postAnalytics.upsert({
                where: { postId: post.id },
                create: {
                    postId: post.id,
                    impressions: Math.floor(Math.random() * 1000) + 100,
                    likes: Math.floor(Math.random() * 50) + 5,
                    comments: Math.floor(Math.random() * 20),
                    shares: Math.floor(Math.random() * 10),
                    clicks: Math.floor(Math.random() * 30) + 5,
                    engagement: Math.random() * 5 + 1,
                },
                update: {
                    impressions: { increment: Math.floor(Math.random() * 100) },
                    likes: { increment: Math.floor(Math.random() * 5) },
                    comments: { increment: Math.floor(Math.random() * 3) },
                    fetchedAt: new Date(),
                },
            });
        }

        res.json({
            success: true,
            message: `Synced analytics for ${publishedPosts.length} posts`,
        });
    } catch (error) {
        console.error('Analytics sync error:', error);
        res.status(500).json({ success: false, error: 'Failed to sync analytics' });
    }
});
