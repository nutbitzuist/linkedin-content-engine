import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye
} from 'lucide-react';
import { clsx } from 'clsx';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay, isToday } from 'date-fns';

// Mock scheduled posts
const mockPosts = [
  { 
    id: '1', 
    title: 'The biggest mistake I made starting out was thinking I needed to be perfect...', 
    scheduledAt: new Date(Date.now() + 86400000 + 32400000), // Tomorrow 9am
    status: 'scheduled' as const
  },
  { 
    id: '2', 
    title: '5 things I wish someone told me about building in public...', 
    scheduledAt: new Date(Date.now() + 172800000 + 43200000), // Day after tomorrow 12pm
    status: 'scheduled' as const
  },
  { 
    id: '3', 
    title: 'Why your morning routine doesn\'t matter (and what does)...', 
    scheduledAt: new Date(Date.now() + 259200000 + 32400000), // 3 days 9am
    status: 'draft' as const
  },
  { 
    id: '4', 
    title: 'I got fired. Best thing that ever happened...', 
    scheduledAt: new Date(Date.now() + 345600000 + 61200000), // 4 days 5pm
    status: 'scheduled' as const
  },
];

const timeSlots = [
  { time: '08:00', label: '8 AM' },
  { time: '09:00', label: '9 AM', recommended: true },
  { time: '10:00', label: '10 AM', recommended: true },
  { time: '11:00', label: '11 AM' },
  { time: '12:00', label: '12 PM', recommended: true },
  { time: '13:00', label: '1 PM' },
  { time: '14:00', label: '2 PM' },
  { time: '15:00', label: '3 PM' },
  { time: '16:00', label: '4 PM' },
  { time: '17:00', label: '5 PM' },
  { time: '18:00', label: '6 PM' },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [view, setView] = useState<'week' | 'month'>('week');

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getPostsForDay = (date: Date) => {
    return mockPosts.filter(post => isSameDay(post.scheduledAt, date));
  };

  const getPostsForSlot = (date: Date, time: string) => {
    const [hours] = time.split(':').map(Number);
    return mockPosts.filter(post => {
      const postHour = post.scheduledAt.getHours();
      return isSameDay(post.scheduledAt, date) && postHour === hours;
    });
  };

  return (
    <div className="p-8 max-w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Content Calendar</h1>
          <p className="text-zinc-400">
            Plan and schedule your LinkedIn content
          </p>
        </div>
        
        <Link to="/create" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Post
        </Link>
      </div>

      {/* Calendar Navigation */}
      <div className="card mb-6">
        <div className="flex items-center justify-between p-4 border-b border-dark-600">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
              className="btn-ghost p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold min-w-[200px] text-center">
              {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
            </h2>
            <button
              onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
              className="btn-ghost p-2"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="btn-ghost text-sm"
            >
              Today
            </button>
            <div className="flex bg-dark-700 rounded-lg p-1">
              <button
                onClick={() => setView('week')}
                className={clsx(
                  'px-3 py-1.5 rounded-md text-sm transition-colors',
                  view === 'week' ? 'bg-accent text-dark-900' : 'text-zinc-400'
                )}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={clsx(
                  'px-3 py-1.5 rounded-md text-sm transition-colors',
                  view === 'month' ? 'bg-accent text-dark-900' : 'text-zinc-400'
                )}
              >
                Month
              </button>
            </div>
          </div>
        </div>

        {/* Week View */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Day Headers */}
            <div className="grid grid-cols-8 border-b border-dark-600">
              <div className="p-3 text-xs text-zinc-500 font-medium">
                Time
              </div>
              {days.map((day) => (
                <div 
                  key={day.toISOString()} 
                  className={clsx(
                    'p-3 text-center border-l border-dark-600',
                    isToday(day) && 'bg-accent/5'
                  )}
                >
                  <p className={clsx(
                    'text-xs uppercase tracking-wide',
                    isToday(day) ? 'text-accent' : 'text-zinc-500'
                  )}>
                    {format(day, 'EEE')}
                  </p>
                  <p className={clsx(
                    'text-lg font-semibold',
                    isToday(day) ? 'text-accent' : 'text-zinc-200'
                  )}>
                    {format(day, 'd')}
                  </p>
                  {isToday(day) && (
                    <span className="badge-accent text-[10px] mt-1">Today</span>
                  )}
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="max-h-[600px] overflow-y-auto">
              {timeSlots.map((slot) => (
                <div key={slot.time} className="grid grid-cols-8 border-b border-dark-600/50">
                  <div className="p-3 text-xs text-zinc-500 flex items-center gap-2">
                    {slot.label}
                    {slot.recommended && (
                      <span className="w-2 h-2 rounded-full bg-success" title="Recommended time" />
                    )}
                  </div>
                  {days.map((day) => {
                    const posts = getPostsForSlot(day, slot.time);
                    return (
                      <div 
                        key={`${day.toISOString()}-${slot.time}`}
                        className={clsx(
                          'p-2 border-l border-dark-600/50 min-h-[60px] relative group',
                          isToday(day) && 'bg-accent/5'
                        )}
                      >
                        {posts.map((post) => (
                          <div
                            key={post.id}
                            onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                            className={clsx(
                              'p-2 rounded-lg text-xs cursor-pointer transition-all mb-1',
                              post.status === 'scheduled' 
                                ? 'bg-success/20 border border-success/30 hover:border-success/50' 
                                : 'bg-warning/20 border border-warning/30 hover:border-warning/50'
                            )}
                          >
                            <p className="line-clamp-2 font-medium">
                              {post.title.substring(0, 40)}...
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-zinc-400">
                              <Clock className="w-3 h-3" />
                              {format(post.scheduledAt, 'h:mm a')}
                            </div>
                            
                            {/* Post Actions Dropdown */}
                            {selectedPost === post.id && (
                              <div className="absolute right-2 top-full mt-1 z-10 card p-2 min-w-[140px] animate-fade-in">
                                <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-dark-600 text-left">
                                  <Eye className="w-4 h-4" />
                                  Preview
                                </button>
                                <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-dark-600 text-left">
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                                <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-dark-600 text-left">
                                  <Copy className="w-4 h-4" />
                                  Duplicate
                                </button>
                                <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-dark-600 text-left text-red-400">
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Add Post Button (on hover) */}
                        {posts.length === 0 && (
                          <Link
                            to="/create"
                            className="absolute inset-2 flex items-center justify-center rounded-lg border-2 border-dashed border-dark-500 opacity-0 group-hover:opacity-100 transition-opacity hover:border-accent hover:bg-accent/5"
                          >
                            <Plus className="w-4 h-4 text-zinc-500" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span>Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span>Draft</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success/50" />
          <span>Recommended posting times</span>
        </div>
      </div>

      {/* Upcoming Posts Summary */}
      <div className="mt-8 card p-6">
        <h3 className="font-semibold mb-4">This Week's Posts</h3>
        <div className="space-y-3">
          {mockPosts.map((post) => (
            <div 
              key={post.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors"
            >
              <div className={clsx(
                'w-2 h-2 rounded-full flex-shrink-0',
                post.status === 'scheduled' ? 'bg-success' : 'bg-warning'
              )} />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{post.title}</p>
                <p className="text-sm text-zinc-500">
                  {format(post.scheduledAt, 'EEEE, MMM d')} at {format(post.scheduledAt, 'h:mm a')}
                </p>
              </div>
              <span className={clsx(
                'badge',
                post.status === 'scheduled' ? 'badge-success' : 'badge-warning'
              )}>
                {post.status}
              </span>
              <button className="btn-ghost p-2">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
