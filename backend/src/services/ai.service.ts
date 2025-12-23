import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type RewriteMode = 
  | 'template_apply' 
  | 'hook_enhance' 
  | 'full_rewrite' 
  | 'tone_adjust' 
  | 'length_optimize';

export type ToneStyle = 
  | 'authoritative' 
  | 'conversational' 
  | 'vulnerable' 
  | 'provocative' 
  | 'inspirational';

interface RewriteOptions {
  content: string;
  mode: RewriteMode;
  templatePattern?: string;
  templateExample?: string;
  tone?: ToneStyle;
  targetLength?: 'expand' | 'condense';
}

const toneDescriptions: Record<ToneStyle, string> = {
  authoritative: 'Expert, confident, insight-driven. Speak from experience with conviction.',
  conversational: 'Casual, friendly, approachable. Like talking to a trusted colleague.',
  vulnerable: 'Personal, honest, emotionally open. Share struggles and real feelings.',
  provocative: 'Bold, challenging, contrarian. Push back against conventional wisdom.',
  inspirational: 'Uplifting, motivating, encouraging. Help readers believe in possibilities.',
};

export async function rewriteContent(options: RewriteOptions): Promise<string> {
  const { content, mode, templatePattern, templateExample, tone = 'conversational', targetLength } = options;

  let systemPrompt = `You are an expert LinkedIn content strategist who helps transform raw ideas into high-performing posts. 
You understand what makes content go viral: strong hooks, relatable stories, actionable insights, and engaging closes.

Key principles:
- First line must stop the scroll
- Use short paragraphs and line breaks for readability
- Include specific numbers and details
- End with a question or call to action
- Keep posts between 800-1200 characters for optimal engagement
- Never use hashtags in the body (only at the end if needed)
- Sound human, not like AI`;

  let userPrompt = '';

  switch (mode) {
    case 'template_apply':
      userPrompt = `Transform this raw content into a LinkedIn post using the following template structure.

TEMPLATE PATTERN:
${templatePattern}

TEMPLATE EXAMPLE:
${templateExample}

RAW CONTENT TO TRANSFORM:
${content}

Create a complete LinkedIn post that:
1. Follows the exact template structure
2. Preserves the user's core message and voice
3. Uses a strong hook in the first line
4. Stays within 800-1200 characters
5. Ends with an engagement-driving question

Return ONLY the final post content, no explanations.`;
      break;

    case 'hook_enhance':
      userPrompt = `Improve the opening hook of this LinkedIn post to make it more compelling and scroll-stopping.

CURRENT POST:
${content}

Create 3 alternative opening lines that:
1. Create immediate curiosity
2. Challenge assumptions
3. Promise value
4. Feel authentic, not clickbaity

Then provide the full post with your best hook applied.

Format your response as:
HOOK OPTIONS:
1. [hook option 1]
2. [hook option 2]
3. [hook option 3]

RECOMMENDED VERSION:
[full post with best hook]`;
      break;

    case 'full_rewrite':
      userPrompt = `Rewrite this LinkedIn post to maximize engagement while maintaining the core message.

ORIGINAL POST:
${content}

TONE: ${toneDescriptions[tone]}

Requirements:
1. Strong, attention-grabbing hook
2. Clear structure with good flow
3. Specific, concrete details
4. Authentic voice matching the requested tone
5. 800-1200 characters
6. Engaging close with a question

Return ONLY the rewritten post, no explanations.`;
      break;

    case 'tone_adjust':
      userPrompt = `Adjust the tone of this LinkedIn post to be more ${tone}.

CURRENT POST:
${content}

TARGET TONE: ${toneDescriptions[tone]}

Rewrite the post maintaining the same message but shifting the tone as requested.
Keep it between 800-1200 characters.

Return ONLY the adjusted post, no explanations.`;
      break;

    case 'length_optimize':
      if (targetLength === 'expand') {
        userPrompt = `Expand this LinkedIn post with more detail, examples, and depth.

CURRENT POST:
${content}

Add:
- More specific examples or anecdotes
- Additional context or background
- Deeper insights or lessons
- A stronger close

Target length: 1000-1200 characters

Return ONLY the expanded post, no explanations.`;
      } else {
        userPrompt = `Condense this LinkedIn post while keeping its impact.

CURRENT POST:
${content}

Remove:
- Redundant phrases
- Unnecessary qualifiers
- Filler words

Keep:
- The core message
- The hook
- The key insight
- The engaging close

Target length: 800-1000 characters

Return ONLY the condensed post, no explanations.`;
      }
      break;
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const textContent = response.content.find(block => block.type === 'text');
    return textContent ? textContent.text : '';
  } catch (error) {
    console.error('AI rewrite error:', error);
    throw new Error('Failed to generate content');
  }
}

export async function generateContentIdeas(topic: string, count: number = 5): Promise<string[]> {
  const systemPrompt = `You are a LinkedIn content strategist. Generate engaging content ideas that would perform well on LinkedIn.`;

  const userPrompt = `Generate ${count} LinkedIn post ideas about: ${topic}

For each idea, provide:
- A compelling hook/title
- The angle or unique take
- The template type it would work best with

Format as a numbered list.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent) return [];
    
    // Parse the response into individual ideas
    const ideas = textContent.text.split(/\d+\.\s+/).filter(Boolean);
    return ideas.slice(0, count);
  } catch (error) {
    console.error('Content ideas generation error:', error);
    throw new Error('Failed to generate content ideas');
  }
}
