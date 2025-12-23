import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileEdit, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Copy,
  Calendar,
  Clock,
  Filter
} from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

// Mock drafts data
const mockDrafts = [
  {
    id: '1',
    title: 'The 5 habits that transformed my productivity...',
    content: 'I used to work 12 hour days and still feel behind. Now I work 6 hours and accomplish twice as much.\n\nHere\'s what changed...',
    templateId: 'structure-listicle',
    templateName: 'The Listicle with Depth',
    updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
    wordCount: 245,
  },
  {
    id: '2',
    title: 'Why I stopped chasing work-life balance...',
    content: 'Work-life balance is a myth.\n\nThere, I said it.\n\nBut hear me out before you scroll away...',
    templateId: 'hook-bold-claim',
    templateName: 'The Bold Claim',
    updatedAt: new Date(Date.now() - 86400000), // 1 day ago
    wordCount: 189,
  },
  {
    id: '3',
    title: 'What nobody tells you about your first management role...',
    content: 'I became a manager 3 years ago.\n\nI thought I was ready.\n\nI wasn\'t even close.',
    templateId: 'hook-behind-scenes',
    templateName: 'The Behind-the-Scenes',
    updatedAt: new Date(Date.now() - 172800000), // 2 days ago
    wordCount: 312,
  },
  {
    id: '4',
    title: 'The networking mistake I made for 5 years...',
    content: 'I used to think networking was about collecting business cards.\n\nMeet people → exchange cards → follow up → repeat.',
    templateId: 'hook-confession',
    templateName: 'The Confession',
    updatedAt: new Date(Date.now() - 432000000), // 5 days ago
    wordCount: 156,
  },
  {
    id: '5',
    title: 'How I prepare for important meetings (30 min system)...',
    content: 'Every important meeting I have, I use the same 30-minute prep system.\n\nIt\'s helped me close deals, get promotions, and build relationships.',
    templateId: 'structure-tutorial',
    templateName: 'The Step-by-Step Tutorial',
    updatedAt: new Date(Date.now() - 604800000), // 7 days ago
    wordCount: 423,
  },
];

export default function Drafts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([]);

  const filteredDrafts = mockDrafts
    .filter(draft => 
      draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.templateName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
      return a.updatedAt.getTime() - b.updatedAt.getTime();
    });

  const toggleSelect = (id: string) => {
    setSelectedDrafts(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedDrafts.length === filteredDrafts.length) {
      setSelectedDrafts([]);
    } else {
      setSelectedDrafts(filteredDrafts.map(d => d.id));
    }
  };

  const handleDelete = (ids: string[]) => {
    toast.success(`${ids.length} draft${ids.length > 1 ? 's' : ''} deleted`);
    setSelectedDrafts([]);
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return format(date, 'MMM d');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Drafts</h1>
          <p className="text-zinc-400">
            {mockDrafts.length} drafts waiting for your final touch
          </p>
        </div>
        
        <Link to="/create" className="btn-primary">
          New Draft
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search drafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-12"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy(sortBy === 'recent' ? 'oldest' : 'recent')}
            className="btn-secondary flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {sortBy === 'recent' ? 'Newest First' : 'Oldest First'}
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedDrafts.length > 0 && (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-accent-muted border border-accent/30 mb-6 animate-fade-in">
          <span className="text-sm">
            {selectedDrafts.length} selected
          </span>
          <div className="flex-1" />
          <button
            onClick={() => handleDelete(selectedDrafts)}
            className="btn-ghost text-red-400 text-sm flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}

      {/* Drafts List */}
      <div className="card overflow-hidden">
        {/* Select All Header */}
        <div className="flex items-center gap-4 p-4 border-b border-dark-600 bg-dark-700/50">
          <input
            type="checkbox"
            checked={selectedDrafts.length === filteredDrafts.length && filteredDrafts.length > 0}
            onChange={toggleSelectAll}
            className="w-4 h-4 rounded border-dark-500 bg-dark-700 text-accent focus:ring-accent/20"
          />
          <span className="text-sm text-zinc-400">Select all</span>
        </div>

        {/* Draft Items */}
        <div className="divide-y divide-dark-600">
          {filteredDrafts.map((draft) => (
            <div
              key={draft.id}
              className={clsx(
                'flex items-start gap-4 p-5 hover:bg-dark-700/50 transition-colors',
                selectedDrafts.includes(draft.id) && 'bg-accent/5'
              )}
            >
              <input
                type="checkbox"
                checked={selectedDrafts.includes(draft.id)}
                onChange={() => toggleSelect(draft.id)}
                className="w-4 h-4 mt-1 rounded border-dark-500 bg-dark-700 text-accent focus:ring-accent/20"
              />
              
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/create?draft=${draft.id}`}
                  className="font-medium hover:text-accent transition-colors line-clamp-1"
                >
                  {draft.title}
                </Link>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                  {draft.content}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
                  <span className="badge-accent">
                    {draft.templateName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(draft.updatedAt)}
                  </span>
                  <span>{draft.wordCount} words</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/create?draft=${draft.id}`}
                  className="btn-ghost p-2"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  className="btn-ghost p-2"
                  title="Schedule"
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(draft.content);
                    toast.success('Copied to clipboard');
                  }}
                  className="btn-ghost p-2"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete([draft.id])}
                  className="btn-ghost p-2 text-red-400 hover:text-red-300"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDrafts.length === 0 && (
          <div className="p-12 text-center">
            <FileEdit className="w-12 h-12 mx-auto text-zinc-600 mb-4" />
            <p className="text-zinc-400 mb-2">No drafts found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-accent hover:text-accent-light text-sm"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-accent/10 to-success/10 border border-accent/20">
        <h3 className="font-semibold mb-2">💡 Draft Writing Tips</h3>
        <ul className="text-sm text-zinc-400 space-y-1">
          <li>• Write your raw thoughts first, then use AI to polish</li>
          <li>• Aim for 800-1200 characters for optimal LinkedIn engagement</li>
          <li>• Let drafts sit for a day before publishing - fresh eyes catch more issues</li>
          <li>• Keep a backlog of 5-7 drafts so you always have content ready</li>
        </ul>
      </div>
    </div>
  );
}
