import { Router } from 'express';

export const templatesRouter = Router();

// Templates are served from frontend, but we can track usage here
const templateUsage: Record<string, number> = {};

// GET /api/templates/usage - Get template usage stats
templatesRouter.get('/usage', (req, res) => {
  res.json({
    success: true,
    data: templateUsage,
  });
});

// POST /api/templates/:id/use - Track template usage
templatesRouter.post('/:id/use', (req, res) => {
  const { id } = req.params;
  
  templateUsage[id] = (templateUsage[id] || 0) + 1;
  
  res.json({
    success: true,
    data: { templateId: id, uses: templateUsage[id] },
  });
});

// GET /api/templates/popular - Get most used templates
templatesRouter.get('/popular', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 5;
  
  const sorted = Object.entries(templateUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([id, uses]) => ({ id, uses }));
  
  res.json({
    success: true,
    data: sorted,
  });
});
