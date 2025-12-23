import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// In-memory user storage for demo
let users: any[] = [];

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  try {
    const body = registerSchema.parse(req.body);
    
    // Check if user exists
    if (users.find(u => u.email === body.email)) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    const newUser = {
      id: Date.now().toString(),
      email: body.email,
      password: hashedPassword,
      linkedinConnected: false,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    
    // Generate token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          linkedinConnected: newUser.linkedinConnected,
        },
        token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const body = loginSchema.parse(req.body);
    
    const user = users.find(u => u.email === body.email);
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(body.password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          linkedinConnected: user.linkedinConnected,
          linkedinProfile: user.linkedinProfile,
        },
        token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// GET /api/auth/me - Get current user
authRouter.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        linkedinConnected: user.linkedinConnected,
        linkedinProfile: user.linkedinProfile,
      },
    });
  } catch {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});
