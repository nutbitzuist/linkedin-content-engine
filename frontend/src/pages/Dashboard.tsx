import { Link } from 'react-router-dom';
import { 
  Plus, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { clsx } from 'clsx';

// Mock data for demo
const upcomingPosts = [
  { id: '1', title: 'The biggest mistake I made in my first year...', scheduledAt: new Date(Date.now() + 86400000), status: 'scheduled' },
  { id: '2', title: '5 things I wish I knew about productivity...', scheduledAt: new Date(Date.now() + 172800000), status: 'scheduled' },
  { id: '3', title: 'Why your morning routine doesn\'t matter...', scheduledAt: new Date(Date.now() + 259200000), status: 'draft' },
];

const quickStats = [
  { label: 'Posts This Week', value: '4', icon: FileText, change: '+2 vs last week' },
  { label: 'Scheduled', value: '3', icon: Calendar, change: 'Next: Tomorrow 9am' },
  { label: 'Drafts', value: '7', icon: Clock, change: '2 need review' },
  { label: 'Avg. Engagement', value: '2.4%', icon: TrendingUp, change: '+0.3% vs last month' },
];

const popularTemplates = [
  { id: 'hook-contradiction', name: 'The Contradiction Hook', uses: 12 },
  { id: 'structure-story-arc', name: 'The Story Arc', uses: 8 },
  { id: 'hook-unexpected-number', name: 'The Unexpected Number', uses: 6 },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-display font-bold mb-2">
          Welcome back
        </h1>
        <p className="text-zinc-400">
          Ready to create content that resonates? Let's build your LinkedIn presence.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link 
          to="/create" 
          className="card-hover p-6 group animate-slide-up stagger-1"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Create Post</h3>
              <p className="text-sm text-zinc-400">Start from scratch or use AI</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/templates" 
          className="card-hover p-6 group animate-slide-up stagger-2"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success-muted flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Use Template</h3>
              <p className="text-sm text-zinc-400">30 viral frameworks ready</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/calendar" 
          className="card-hover p-6 group animate-slide-up stagger-3"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning-muted flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">View Calendar</h3>
              <p className="text-sm text-zinc-400">Plan your week ahead</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div 
            key={stat.label} 
            className={clsx(
              'card p-5 animate-slide-up',
              `stagger-${index + 1}`
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <stat.icon className="w-5 h-5 text-zinc-500" />
              <span className="text-xs text-zinc-500">{stat.change}</span>
            </div>
            <p className="text-3xl font-display font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Posts */}
        <div className="lg:col-span-2 card p-6 animate-slide-up stagger-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Upcoming Posts</h2>
            <Link to="/calendar" className="btn-ghost text-sm flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingPosts.map((post) => (
              <div 
                key={post.id} 
                className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors"
              >
                <div className={clsx(
                  'w-2 h-2 rounded-full',
                  post.status === 'scheduled' ? 'bg-success' : 'bg-warning'
                )} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-sm text-zinc-500">
                    {post.scheduledAt.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={clsx(
                  'badge',
                  post.status === 'scheduled' ? 'badge-success' : 'badge-warning'
                )}>
                  {post.status}
                </span>
              </div>
            ))}

            {upcomingPosts.length === 0 && (
              <div className="text-center py-8 text-zinc-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming posts scheduled</p>
                <Link to="/create" className="text-accent hover:text-accent-light mt-2 inline-block">
                  Create your first post
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Popular Templates */}
        <div className="card p-6 animate-slide-up stagger-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Top Templates</h2>
            <Link to="/templates" className="btn-ghost text-sm">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {popularTemplates.map((template, index) => (
              <Link
                key={template.id}
                to={`/create/${template.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center text-accent font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate group-hover:text-accent transition-colors">
                    {template.name}
                  </p>
                  <p className="text-sm text-zinc-500">{template.uses} uses</p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* Pro Tip */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-success/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Pro Tip</p>
                <p className="text-xs text-zinc-400">
                  The best time to post on LinkedIn is Tuesday-Thursday between 8-10am. 
                  Schedule your best content for these windows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Ideas Section */}
      <div className="mt-8 card p-6 animate-slide-up stagger-5">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-accent" />
          <h2 className="text-lg font-semibold">Content Ideas for Today</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600 hover:border-accent/50 transition-colors cursor-pointer">
            <p className="text-sm text-zinc-400 mb-2">Based on your industry</p>
            <p className="font-medium">Share a lesson from your biggest professional failure this year</p>
          </div>
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600 hover:border-accent/50 transition-colors cursor-pointer">
            <p className="text-sm text-zinc-400 mb-2">Trending topic</p>
            <p className="font-medium">Your hot take on the latest AI developments affecting your field</p>
          </div>
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600 hover:border-accent/50 transition-colors cursor-pointer">
            <p className="text-sm text-zinc-400 mb-2">Engagement booster</p>
            <p className="font-medium">Ask your network: What's one skill you wish you learned earlier?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
