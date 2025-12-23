import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Zap,
  ArrowRight,
  Copy,
  Eye,
  X,
  Bookmark,
  Target,
  MessageSquare,
  FileText,
  Layers
} from 'lucide-react';
import { clsx } from 'clsx';
import { templates, templateCategories } from '../lib/templates';
import type { Template } from '../types';

const categoryIcons = {
  hook: Zap,
  structure: Layers,
  engagement: MessageSquare,
  complete: FileText,
};

const categoryColors = {
  hook: 'text-accent bg-accent-muted',
  structure: 'text-success bg-success-muted',
  engagement: 'text-warning bg-warning-muted',
  complete: 'text-purple-400 bg-purple-400/15',
};

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.bestFor.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === null || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-display font-bold mb-2">
          Viral Templates
        </h1>
        <p className="text-zinc-400">
          30 proven frameworks from top LinkedIn creators. Pick one and start writing.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-12"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={clsx(
              'px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all',
              selectedCategory === null
                ? 'bg-accent text-dark-900'
                : 'bg-dark-700 text-zinc-300 hover:bg-dark-600'
            )}
          >
            All ({templates.length})
          </button>
          {templateCategories.map((cat) => {
            const Icon = categoryIcons[cat.id as keyof typeof categoryIcons];
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={clsx(
                  'px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2',
                  selectedCategory === cat.id
                    ? 'bg-accent text-dark-900'
                    : 'bg-dark-700 text-zinc-300 hover:bg-dark-600'
                )}
              >
                <Icon className="w-4 h-4" />
                {cat.name} ({cat.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Description */}
      {selectedCategory && (
        <div className="mb-6 p-4 rounded-xl bg-dark-700/50 border border-dark-600 animate-fade-in">
          <p className="text-zinc-400">
            {templateCategories.find(c => c.id === selectedCategory)?.description}
          </p>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => {
          const Icon = categoryIcons[template.category];
          return (
            <div
              key={template.id}
              className="template-card animate-slide-up group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={clsx(
                  'w-10 h-10 rounded-xl flex items-center justify-center template-icon transition-all',
                  categoryColors[template.category]
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-zinc-500 capitalize">{template.category}</span>
              </div>

              <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                {template.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {template.bestFor.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-md bg-dark-600 text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-dark-600">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="btn-ghost flex-1 flex items-center justify-center gap-2 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <Link
                  to={`/create/${template.id}`}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2"
                >
                  Use
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 mx-auto text-zinc-600 mb-4" />
          <p className="text-zinc-400">No templates found matching your search.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
            className="text-accent hover:text-accent-light mt-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm"
            onClick={() => setPreviewTemplate(null)}
          />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto card p-0 animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-dark-600 bg-dark-800">
              <div className="flex items-center gap-4">
                <div className={clsx(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  categoryColors[previewTemplate.category]
                )}>
                  {(() => {
                    const Icon = categoryIcons[previewTemplate.category];
                    return <Icon className="w-6 h-6" />;
                  })()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{previewTemplate.name}</h2>
                  <p className="text-sm text-zinc-400">{previewTemplate.description}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="btn-ghost p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Best For Tags */}
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.bestFor.map((tag) => (
                    <span key={tag} className="badge-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pattern Structure */}
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Pattern Structure</h3>
                <div className="relative">
                  <pre className="p-4 rounded-xl bg-dark-700 text-sm text-zinc-300 whitespace-pre-wrap font-mono overflow-x-auto">
                    {previewTemplate.pattern}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(previewTemplate.pattern)}
                    className="absolute top-3 right-3 btn-ghost p-2"
                    title="Copy pattern"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Full Example */}
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Full Example</h3>
                <div className="relative">
                  <div className="post-preview">
                    {previewTemplate.example.split('\n').map((line, i) => (
                      <p key={i} className={clsx(line === '' && 'h-4')}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={() => copyToClipboard(previewTemplate.example)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-dark-700/80 text-zinc-400 hover:text-zinc-200 transition-colors"
                    title="Copy example"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tips */}
              {previewTemplate.tips.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-3">Pro Tips</h3>
                  <ul className="space-y-2">
                    {previewTemplate.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Target className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-zinc-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Placeholders */}
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Key Placeholders</h3>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.placeholders.map((placeholder) => (
                    <span key={placeholder} className="px-3 py-1.5 rounded-lg bg-dark-700 text-sm text-zinc-300 font-mono">
                      [{placeholder}]
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex items-center justify-between p-6 border-t border-dark-600 bg-dark-800">
              <button className="btn-ghost flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Save to Favorites
              </button>
              <Link
                to={`/create/${previewTemplate.id}`}
                className="btn-primary flex items-center gap-2"
              >
                Use This Template
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
