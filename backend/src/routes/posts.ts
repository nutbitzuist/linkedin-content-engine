import { Router } from 'express';
import { z } from 'zod';

export const postsRouter = Router();

// In-memory storage for demo (replace with database in production)
let posts: any[] = [
  {
    id: '1',
    content: 'I got rejected from my dream job. It was the best thing that ever happened to me...',
    templateId: 'hook-contradiction',
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    content: '5 things I wish someone told me about building in public...',
    templateId: 'structure-listicle',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const createPostSchema = z.object({
  content: z.string().min(1),
  templateId: z.string().optional(),
  status: z.enum(['draft', 'scheduled']).default('draft'),
  scheduledAt: z.string().datetime().optional(),
});

const updatePostSchema = createPostSchema.partial();

// GET /api/posts - Get all posts
postsRouter.get('/', (req, res) => {
  const { status } = req.query;
  
  let filteredPosts = posts;
  if (status) {
    filteredPosts = posts.filter(p => p.status === status);
  }
  
  res.json({
    success: true,
    data: filteredPosts.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ),
  });
});

// GET /api/posts/:id - Get single post
postsRouter.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  
  if (!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }
  
  res.json({ success: true, data: post });
});

// POST /api/posts - Create new post
postsRouter.post('/', (req, res) => {
  try {
    const body = createPostSchema.parse(req.body);
    
    const newPost = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    posts.push(newPost);
    
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({ success: false, error: 'Failed to create post' });
  }
});

// PUT /api/posts/:id - Update post
postsRouter.put('/:id', (req, res) => {
  try {
    const body = updatePostSchema.parse(req.body);
    const index = posts.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    posts[index] = {
      ...posts[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    res.json({ success: true, data: posts[index] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({ success: false, error: 'Failed to update post' });
  }
});

// DELETE /api/posts/:id - Delete post
postsRouter.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }
  
  posts.splice(index, 1);
  
  res.json({ success: true, message: 'Post deleted' });
});

// POST /api/posts/:id/schedule - Schedule a post
postsRouter.post('/:id/schedule', (req, res) => {
  const { scheduledAt } = req.body;
  const index = posts.findIndex(p => p.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }
  
  posts[index] = {
    ...posts[index],
    status: 'scheduled',
    scheduledAt,
    updatedAt: new Date().toISOString(),
  };
  
  res.json({ success: true, data: posts[index] });
});
