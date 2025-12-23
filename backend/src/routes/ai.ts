import { Router } from 'express';
import { z } from 'zod';
import { rewriteContent, generateContentIdeas } from '../services/ai.service.js';

export const aiRouter = Router();

const rewriteSchema = z.object({
  content: z.string().min(1),
  mode: z.enum(['template_apply', 'hook_enhance', 'full_rewrite', 'tone_adjust', 'length_optimize']),
  templatePattern: z.string().optional(),
  templateExample: z.string().optional(),
  tone: z.enum(['authoritative', 'conversational', 'vulnerable', 'provocative', 'inspirational']).optional(),
  targetLength: z.enum(['expand', 'condense']).optional(),
});

const ideasSchema = z.object({
  topic: z.string().min(1),
  count: z.number().min(1).max(10).optional().default(5),
});

// POST /api/ai/rewrite - Rewrite content using AI
aiRouter.post('/rewrite', async (req, res) => {
  try {
    const body = rewriteSchema.parse(req.body);
    
    const result = await rewriteContent({
      content: body.content,
      mode: body.mode,
      templatePattern: body.templatePattern,
      templateExample: body.templateExample,
      tone: body.tone,
      targetLength: body.targetLength,
    });

    res.json({
      success: true,
      data: {
        original: body.content,
        rewritten: result,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error('Rewrite error:', error);
    res.status(500).json({ success: false, error: 'Failed to rewrite content' });
  }
});

// POST /api/ai/ideas - Generate content ideas
aiRouter.post('/ideas', async (req, res) => {
  try {
    const body = ideasSchema.parse(req.body);
    
    const ideas = await generateContentIdeas(body.topic, body.count);

    res.json({
      success: true,
      data: { ideas },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error('Ideas generation error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate ideas' });
  }
});
