import { useState, useEffect } from 'react';
import {
    BarChart3,
    TrendingUp,
    Eye,
    Heart,
    MessageCircle,
    RefreshCw,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';
import { clsx } from 'clsx';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';

// API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const getAuthToken = () => localStorage.getItem('contentforge_token');

async function fetchAnalyticsOverview() {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}/api/analytics/overview`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

async function fetchAnalyticsTrends() {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}/api/analytics/trends?days=30`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

async function fetchPostAnalytics() {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}/api/analytics/posts?limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

async function syncAnalytics() {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}/api/analytics/sync`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

// Demo data for visual preview
const demoTrends = [
    { date: '2024-01-01', impressions: 450, engagement: 2.1, posts: 1 },
    { date: '2024-01-02', impressions: 320, engagement: 1.8, posts: 0 },
    { date: '2024-01-03', impressions: 580, engagement: 2.4, posts: 2 },
    { date: '2024-01-04', impressions: 720, engagement: 3.1, posts: 1 },
    { date: '2024-01-05', impressions: 650, engagement: 2.8, posts: 1 },
    { date: '2024-01-06', impressions: 890, engagement: 3.5, posts: 2 },
    { date: '2024-01-07', impressions: 1100, engagement: 4.2, posts: 1 },
];

const demoPosts = [
    { id: '1', content: 'The biggest mistake I made in my first year...', publishedAt: new Date(), analytics: { impressions: 1234, likes: 45, comments: 12, shares: 8, engagement: 3.2 } },
    { id: '2', content: '5 things I wish I knew about productivity...', publishedAt: new Date(), analytics: { impressions: 987, likes: 38, comments: 8, shares: 5, engagement: 2.8 } },
    { id: '3', content: 'Why your morning routine doesn\'t matter...', publishedAt: new Date(), analytics: { impressions: 756, likes: 29, comments: 15, shares: 3, engagement: 2.4 } },
];

export default function Analytics() {
    const [overview, setOverview] = useState<any>(null);
    const [trends, setTrends] = useState<any[]>(demoTrends);
    const [posts, setPosts] = useState<any[]>(demoPosts);
    const [, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setIsLoading(true);
        try {
            const [overviewRes, trendsRes, postsRes] = await Promise.all([
                fetchAnalyticsOverview(),
                fetchAnalyticsTrends(),
                fetchPostAnalytics(),
            ]);

            if (overviewRes.success) setOverview(overviewRes.data);
            if (trendsRes.success && trendsRes.data.length > 0) setTrends(trendsRes.data);
            if (postsRes.success && postsRes.data.length > 0) setPosts(postsRes.data);
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSync() {
        setIsSyncing(true);
        try {
            await syncAnalytics();
            await loadData();
        } catch (error) {
            console.error('Sync failed:', error);
        } finally {
            setIsSyncing(false);
        }
    }

    const stats = overview ? [
        {
            label: 'Total Impressions',
            value: overview.engagement.totalImpressions.toLocaleString(),
            icon: Eye,
            change: '+12%',
            positive: true,
        },
        {
            label: 'Total Likes',
            value: overview.engagement.totalLikes.toLocaleString(),
            icon: Heart,
            change: '+8%',
            positive: true,
        },
        {
            label: 'Comments',
            value: overview.engagement.totalComments.toLocaleString(),
            icon: MessageCircle,
            change: '+15%',
            positive: true,
        },
        {
            label: 'Avg. Engagement',
            value: `${overview.engagement.avgEngagement.toFixed(1)}%`,
            icon: TrendingUp,
            change: overview.engagement.avgEngagement > 2 ? '+0.5%' : '-0.2%',
            positive: overview.engagement.avgEngagement > 2,
        },
    ] : [
        { label: 'Total Impressions', value: '4,521', icon: Eye, change: '+12%', positive: true },
        { label: 'Total Likes', value: '287', icon: Heart, change: '+8%', positive: true },
        { label: 'Comments', value: '94', icon: MessageCircle, change: '+15%', positive: true },
        { label: 'Avg. Engagement', value: '2.8%', icon: TrendingUp, change: '+0.5%', positive: true },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">Analytics</h1>
                    <p className="text-zinc-400">Track your content performance and engagement</p>
                </div>
                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className={clsx(
                        'btn-secondary flex items-center gap-2',
                        isSyncing && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <RefreshCw className={clsx('w-4 h-4', isSyncing && 'animate-spin')} />
                    {isSyncing ? 'Syncing...' : 'Sync Data'}
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="card p-5 animate-slide-up">
                        <div className="flex items-start justify-between mb-3">
                            <stat.icon className="w-5 h-5 text-zinc-500" />
                            <span className={clsx(
                                'flex items-center gap-1 text-xs font-medium',
                                stat.positive ? 'text-success' : 'text-red-400'
                            )}>
                                {stat.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-3xl font-display font-bold mb-1">{stat.value}</p>
                        <p className="text-sm text-zinc-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Impressions Trend */}
                <div className="card p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-accent" />
                        Impressions Over Time
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trends}>
                                <defs>
                                    <linearGradient id="impressionsGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#52525b"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                />
                                <YAxis stroke="#52525b" tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    labelStyle={{ color: '#a1a1aa' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="impressions"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fill="url(#impressionsGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Engagement Trend */}
                <div className="card p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-accent" />
                        Engagement Rate
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#52525b"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                />
                                <YAxis stroke="#52525b" tick={{ fontSize: 12 }} unit="%" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    formatter={(value) => [`${(value as number).toFixed(1)}%`, 'Engagement']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="engagement"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    dot={{ fill: '#f59e0b', strokeWidth: 0, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top Posts Table */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    Top Performing Posts
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-zinc-500 border-b border-dark-600">
                                <th className="pb-3 font-medium">Post</th>
                                <th className="pb-3 font-medium text-right">Impressions</th>
                                <th className="pb-3 font-medium text-right">Likes</th>
                                <th className="pb-3 font-medium text-right">Comments</th>
                                <th className="pb-3 font-medium text-right">Engagement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                                    <td className="py-4 pr-4">
                                        <p className="font-medium truncate max-w-md">{post.content}</p>
                                        <p className="text-sm text-zinc-500">
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className="font-medium">{post.analytics.impressions.toLocaleString()}</span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className="flex items-center justify-end gap-1">
                                            <Heart className="w-4 h-4 text-red-400" />
                                            {post.analytics.likes}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className="flex items-center justify-end gap-1">
                                            <MessageCircle className="w-4 h-4 text-blue-400" />
                                            {post.analytics.comments}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className={clsx(
                                            'badge',
                                            post.analytics.engagement >= 3 ? 'badge-success' :
                                                post.analytics.engagement >= 2 ? 'badge-warning' : 'badge-error'
                                        )}>
                                            {post.analytics.engagement.toFixed(1)}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
