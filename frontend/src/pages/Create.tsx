import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Wand2,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  Calendar,
  Send,
  FileText,
  ChevronDown,
  ArrowLeft,
  Zap,
  Target,
  MessageSquare,
  Layers,
  Info,
  Clock,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { getTemplateById, templates } from '../lib/templates';
import { useStore } from '../lib/store';
import { rewriteContent } from '../lib/api';
import type { Template, ToneStyle, RewriteMode } from '../types';

const toneOptions: { value: ToneStyle; label: string; description: string }[] = [
  { value: 'authoritative', label: 'Authoritative', description: 'Expert, confident, insight-driven' },
  { value: 'conversational', label: 'Conversational', description: 'Casual, friendly, approachable' },
  { value: 'vulnerable', label: 'Vulnerable', description: 'Personal, honest, emotionally open' },
  { value: 'provocative', label: 'Provocative', description: 'Bold, challenging, contrarian' },
  { value: 'inspirational', label: 'Inspirational', description: 'Uplifting, motivating, encouraging' },
];

const rewriteModes: { value: RewriteMode; label: string; icon: typeof Wand2 }[] = [
  { value: 'template_apply', label: 'Apply Template', icon: Layers },
  { value: 'hook_enhance', label: 'Stronger Hook', icon: Zap },
  { value: 'full_rewrite', label: 'Full Rewrite', icon: RefreshCw },
  { value: 'tone_adjust', label: 'Adjust Tone', icon: MessageSquare },
  { value: 'length_optimize', label: 'Optimize Length', icon: Target },
];

export default function Create() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { currentDraft, setCurrentDraft, clearDraft } = useStore();

  const [content, setContent] = useState(currentDraft.content);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    templateId ? getTemplateById(templateId) || null : null
  );
  const [selectedTone, setSelectedTone] = useState<ToneStyle>('conversational');
  const [selectedMode, setSelectedMode] = useState<RewriteMode>('full_rewrite');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [generatedVersions, setGeneratedVersions] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('09:00');

  // Character count and optimal zone
  const charCount = content.length;
  const isOptimalLength = charCount >= 800 && charCount <= 1200;
  const isShort = charCount > 0 && charCount < 800;
  const isLong = charCount > 1200;

  useEffect(() => {
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        setSelectedTemplate(template);
      }
    }
  }, [templateId]);

  // Auto-save draft
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentDraft({ content, templateId: selectedTemplate?.id });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [content, selectedTemplate]);

  const handleAIRewrite = async () => {
    if (!content.trim()) {
      toast.error('Please write something first');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await rewriteContent({
        content,
        mode: selectedMode,
        templatePattern: selectedTemplate?.pattern,
        templateExample: selectedTemplate?.example,
        tone: selectedTone,
        targetLength: selectedMode === 'length_optimize'
          ? (content.length > 1200 ? 'condense' : 'expand')
          : undefined,
      });

      if (response.success && response.data.rewritten) {
        setGeneratedVersions([response.data.rewritten, ...generatedVersions.slice(0, 2)]);
        toast.success('Content generated with AI!');
      } else {
        toast.error('Failed to generate content');
      }
    } catch (error) {
      console.error('AI rewrite error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const applyVersion = (version: string) => {
    setContent(version);
    toast.success('Applied to editor');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      toast.error('Please select a date and time');
      return;
    }

    // In production, this would call the API
    toast.success(`Scheduled for ${scheduleDate} at ${scheduleTime}`);
    setShowScheduleModal(false);
    clearDraft();
    navigate('/calendar');
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved');
    navigate('/drafts');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-dark-900/95 backdrop-blur-xl border-b border-dark-600">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="btn-ghost p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-display font-semibold">Create Post</h1>
                {selectedTemplate && (
                  <p className="text-sm text-zinc-400">Using: {selectedTemplate.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleSaveDraft} className="btn-ghost">
                Save Draft
              </button>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Send className="w-4 h-4" />
                Post Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selector */}
            <div className="card p-4">
              <button
                onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <span className="font-medium">
                    {selectedTemplate ? selectedTemplate.name : 'Select a template (optional)'}
                  </span>
                </div>
                <ChevronDown className={clsx(
                  'w-5 h-5 text-zinc-400 transition-transform',
                  showTemplateSelector && 'rotate-180'
                )} />
              </button>

              {showTemplateSelector && (
                <div className="mt-4 pt-4 border-t border-dark-600 grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => { setSelectedTemplate(null); setShowTemplateSelector(false); }}
                    className={clsx(
                      'p-3 rounded-lg text-left text-sm transition-colors',
                      !selectedTemplate ? 'bg-accent text-dark-900' : 'bg-dark-700 hover:bg-dark-600'
                    )}
                  >
                    No Template (Freeform)
                  </button>
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => { setSelectedTemplate(template); setShowTemplateSelector(false); }}
                      className={clsx(
                        'p-3 rounded-lg text-left text-sm transition-colors',
                        selectedTemplate?.id === template.id
                          ? 'bg-accent text-dark-900'
                          : 'bg-dark-700 hover:bg-dark-600'
                      )}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Template Pattern Guide */}
            {selectedTemplate && (
              <div className="card p-4 bg-accent-muted border-accent/30 animate-fade-in">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-2">Template Structure</p>
                    <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono">
                      {selectedTemplate.pattern}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Content Editor */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Your Content</h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>

              {showPreview ? (
                <div className="post-preview min-h-[400px]">
                  {content.split('\n').map((line, i) => (
                    <p key={i} className={clsx(line === '' && 'h-4')}>
                      {line || '\u00A0'}
                    </p>
                  ))}
                  {!content && (
                    <p className="text-zinc-400 italic">Start writing to see preview...</p>
                  )}
                </div>
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={selectedTemplate
                    ? `Start writing using the ${selectedTemplate.name} pattern...`
                    : "What's on your mind? Share your story, insight, or lesson..."
                  }
                  className="textarea min-h-[400px] text-base leading-relaxed"
                />
              )}

              {/* Character Count */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={clsx(
                    'text-sm font-medium',
                    isOptimalLength && 'text-success',
                    isShort && 'text-warning',
                    isLong && 'text-red-400'
                  )}>
                    {charCount} characters
                  </span>
                  <span className="text-xs text-zinc-500">
                    {isOptimalLength && '✓ Optimal length'}
                    {isShort && '↑ Consider adding more detail'}
                    {isLong && '↓ Consider trimming'}
                  </span>
                </div>
                <div className="w-32 h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      'h-full transition-all',
                      isOptimalLength && 'bg-success',
                      isShort && 'bg-warning',
                      isLong && 'bg-red-400',
                      charCount === 0 && 'bg-dark-500'
                    )}
                    style={{ width: `${Math.min((charCount / 1200) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Generated Versions */}
            {generatedVersions.length > 0 && (
              <div className="card p-6 animate-slide-up">
                <h3 className="font-semibold mb-4">AI Generated Versions</h3>
                <div className="space-y-4">
                  {generatedVersions.map((version, index) => (
                    <div key={index} className="p-4 rounded-xl bg-dark-700 relative group">
                      <p className="text-sm line-clamp-4 pr-20">{version}</p>
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => copyToClipboard(version)}
                          className="p-2 rounded-lg bg-dark-600 hover:bg-dark-500 transition-colors"
                          title="Copy"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => applyVersion(version)}
                          className="p-2 rounded-lg bg-accent hover:bg-accent-light text-dark-900 transition-colors"
                          title="Use this version"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Sidebar */}
          <div className="space-y-6">
            {/* AI Rewrite Panel */}
            <div className="card p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-success flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-dark-900" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-zinc-400">Enhance your content</p>
                </div>
              </div>

              {/* Rewrite Mode */}
              <div className="mb-6">
                <label className="text-sm text-zinc-400 mb-2 block">Rewrite Mode</label>
                <div className="grid grid-cols-1 gap-2">
                  {rewriteModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setSelectedMode(mode.value)}
                      className={clsx(
                        'flex items-center gap-3 p-3 rounded-xl text-sm text-left transition-all',
                        selectedMode === mode.value
                          ? 'bg-accent text-dark-900'
                          : 'bg-dark-700 hover:bg-dark-600'
                      )}
                    >
                      <mode.icon className="w-4 h-4" />
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Selection */}
              <div className="mb-6">
                <label className="text-sm text-zinc-400 mb-2 block">Tone</label>
                <div className="grid grid-cols-1 gap-2">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setSelectedTone(tone.value)}
                      className={clsx(
                        'p-3 rounded-xl text-sm text-left transition-all',
                        selectedTone === tone.value
                          ? 'bg-success/20 border border-success/50'
                          : 'bg-dark-700 hover:bg-dark-600'
                      )}
                    >
                      <span className="font-medium">{tone.label}</span>
                      <p className="text-xs text-zinc-400 mt-0.5">{tone.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleAIRewrite}
                disabled={isGenerating || !content.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </>
                )}
              </button>

              {/* Tips */}
              <div className="mt-6 p-4 rounded-xl bg-dark-700/50">
                <p className="text-xs text-zinc-500">
                  💡 Tip: Write your raw thoughts first, then use AI to polish and structure them.
                  Your authentic voice + proven structure = viral potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm"
            onClick={() => setShowScheduleModal(false)}
          />
          <div className="relative w-full max-w-md card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Schedule Post</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="btn-ghost p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400 mb-2 block">Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="input"
                />
              </div>

              <div className="p-4 rounded-xl bg-accent-muted">
                <div className="flex items-center gap-2 text-accent text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Best times: Tue-Thu, 8-10am or 12pm</span>
                </div>
              </div>

              <button
                onClick={handleSchedule}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
