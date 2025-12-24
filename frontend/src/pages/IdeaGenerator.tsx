import { useState } from 'react';
import { Lightbulb, ArrowRight, ArrowLeft, Sparkles, Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

// API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const getAuthToken = () => localStorage.getItem('contentforge_token');

async function generateIdeas(topic: string, tone: string, count: number = 5) {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}/api/ai/ideas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic, tone, count }),
    });
    return res.json();
}

async function saveToDraft(content: string, title?: string) {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, title }),
    });
    return res.json();
}

const tones = [
    { id: 'authoritative', name: 'Authoritative', description: 'Expert, confident, insight-driven', emoji: '🎯' },
    { id: 'conversational', name: 'Conversational', description: 'Casual, friendly, approachable', emoji: '💬' },
    { id: 'vulnerable', name: 'Vulnerable', description: 'Personal, honest, emotionally open', emoji: '❤️' },
    { id: 'provocative', name: 'Provocative', description: 'Bold, challenging, contrarian', emoji: '🔥' },
    { id: 'inspirational', name: 'Inspirational', description: 'Uplifting, motivating, encouraging', emoji: '✨' },
];

const contentCategories = [
    { id: 'career', name: 'Career Growth', examples: ['leadership', 'promotions', 'skills'] },
    { id: 'productivity', name: 'Productivity', examples: ['time management', 'focus', 'habits'] },
    { id: 'entrepreneurship', name: 'Entrepreneurship', examples: ['startups', 'business', 'funding'] },
    { id: 'tech', name: 'Technology', examples: ['AI', 'software', 'innovation'] },
    { id: 'personal', name: 'Personal Development', examples: ['mindset', 'wellness', 'learning'] },
];

export default function IdeaGenerator() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [topic, setTopic] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTone, setSelectedTone] = useState('conversational');
    const [ideas, setIdeas] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [savedIdeas, setSavedIdeas] = useState<Set<number>>(new Set());

    async function handleGenerate() {
        if (!topic.trim()) return;

        setIsLoading(true);
        try {
            const res = await generateIdeas(topic, selectedTone);
            if (res.success && res.data?.ideas) {
                setIdeas(res.data.ideas);
                setStep(3);
            }
        } catch (error) {
            console.error('Failed to generate ideas:', error);
            // Use placeholder ideas for demo
            setIdeas([
                `Share a counterintuitive lesson about ${topic} that changed your perspective`,
                `3 myths about ${topic} that hold most people back (and what to do instead)`,
                `The biggest mistake I made with ${topic} and how I recovered`,
                `Why conventional wisdom about ${topic} is often wrong`,
                `A simple framework for ${topic} that anyone can apply today`,
            ]);
            setStep(3);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSaveIdea(index: number, idea: string) {
        try {
            const res = await saveToDraft(idea);
            if (res.success) {
                setSavedIdeas(prev => new Set(prev).add(index));
            }
        } catch (error) {
            console.error('Failed to save idea:', error);
        }
    }

    function handleSelectCategory(categoryId: string) {
        setSelectedCategory(categoryId);
        const category = contentCategories.find(c => c.id === categoryId);
        if (category) {
            setTopic(category.examples[0]);
        }
    }

    function handleUseIdea(idea: string) {
        // Navigate to create page with the idea pre-filled
        navigate('/create', { state: { content: idea } });
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-success mb-4">
                    <Lightbulb className="w-8 h-8 text-dark-900" />
                </div>
                <h1 className="text-3xl font-display font-bold mb-2">Content Idea Generator</h1>
                <p className="text-zinc-400 max-w-lg mx-auto">
                    Let AI help you brainstorm engaging LinkedIn content ideas tailored to your niche and style.
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div
                            className={clsx(
                                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                                step >= s ? 'bg-accent text-dark-900' : 'bg-dark-700 text-zinc-500'
                            )}
                        >
                            {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                        </div>
                        <span className={clsx('text-sm', step >= s ? 'text-white' : 'text-zinc-500')}>
                            {s === 1 ? 'Topic' : s === 2 ? 'Tone' : 'Ideas'}
                        </span>
                        {s < 3 && <div className={clsx('w-12 h-0.5', step > s ? 'bg-accent' : 'bg-dark-600')} />}
                    </div>
                ))}
            </div>

            {/* Step 1: Topic Selection */}
            {step === 1 && (
                <div className="card p-8 animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6">What topic would you like to write about?</h2>

                    {/* Quick Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                        {contentCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleSelectCategory(cat.id)}
                                className={clsx(
                                    'p-3 rounded-xl text-center transition-all border',
                                    selectedCategory === cat.id
                                        ? 'border-accent bg-accent/10 text-accent'
                                        : 'border-dark-600 hover:border-dark-500'
                                )}
                            >
                                <span className="text-sm font-medium">{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Custom Topic Input */}
                    <div className="mb-6">
                        <label className="block text-sm text-zinc-400 mb-2">Or enter a custom topic</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., remote work productivity, career transitions, AI tools..."
                            className="input"
                        />
                    </div>

                    <button
                        onClick={() => setStep(2)}
                        disabled={!topic.trim()}
                        className={clsx(
                            'btn-primary w-full flex items-center justify-center gap-2',
                            !topic.trim() && 'opacity-50 cursor-not-allowed'
                        )}
                    >
                        Continue <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Step 2: Tone Selection */}
            {step === 2 && (
                <div className="card p-8 animate-fade-in">
                    <h2 className="text-xl font-semibold mb-2">Choose your writing tone</h2>
                    <p className="text-zinc-400 mb-6">Topic: <span className="text-white">{topic}</span></p>

                    <div className="space-y-3 mb-6">
                        {tones.map((tone) => (
                            <button
                                key={tone.id}
                                onClick={() => setSelectedTone(tone.id)}
                                className={clsx(
                                    'w-full p-4 rounded-xl text-left transition-all border flex items-center gap-4',
                                    selectedTone === tone.id
                                        ? 'border-accent bg-accent/10'
                                        : 'border-dark-600 hover:border-dark-500'
                                )}
                            >
                                <span className="text-2xl">{tone.emoji}</span>
                                <div>
                                    <p className="font-medium">{tone.name}</p>
                                    <p className="text-sm text-zinc-400">{tone.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(1)}
                            className="btn-ghost flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Generate Ideas
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Ideas Display */}
            {step === 3 && (
                <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold">Your Content Ideas</h2>
                            <p className="text-zinc-400">
                                Topic: {topic} • Tone: {tones.find(t => t.id === selectedTone)?.name}
                            </p>
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <RefreshCw className={clsx('w-4 h-4', isLoading && 'animate-spin')} />
                            Regenerate
                        </button>
                    </div>

                    <div className="space-y-4">
                        {ideas.map((idea, index) => (
                            <div
                                key={index}
                                className="card p-6 hover:border-accent/50 transition-colors"
                            >
                                <p className="text-lg mb-4">{idea}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUseIdea(idea)}
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Use This Idea
                                    </button>
                                    <button
                                        onClick={() => handleSaveIdea(index, idea)}
                                        disabled={savedIdeas.has(index)}
                                        className={clsx(
                                            'btn-ghost flex items-center gap-2',
                                            savedIdeas.has(index) && 'text-success'
                                        )}
                                    >
                                        {savedIdeas.has(index) ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Saved
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Save to Drafts
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setStep(1);
                            setTopic('');
                            setSelectedCategory(null);
                            setIdeas([]);
                            setSavedIdeas(new Set());
                        }}
                        className="btn-ghost w-full mt-6 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Start Over
                    </button>
                </div>
            )}
        </div>
    );
}
