// Template types
export interface Template {
  id: string;
  name: string;
  category: 'hook' | 'structure' | 'engagement' | 'complete';
  description: string;
  pattern: string;
  example: string;
  placeholders: string[];
  bestFor: string[];
  tips: string[];
}

// Post types
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface Post {
  id: string;
  content: string;
  templateId?: string;
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  linkedinPostId?: string;
  createdAt: string;
  updatedAt: string;
  analytics?: PostAnalytics;
}

export interface PostAnalytics {
  impressions: number;
  reactions: number;
  comments: number;
  shares: number;
}

// User types
export interface User {
  id: string;
  email: string;
  linkedinConnected: boolean;
  linkedinProfile?: {
    name: string;
    headline?: string;
    imageUrl?: string;
  };
}

// AI Rewrite types
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

export interface RewriteRequest {
  content: string;
  mode: RewriteMode;
  templateId?: string;
  tone?: ToneStyle;
  targetLength?: 'expand' | 'condense';
}

export interface RewriteResponse {
  original: string;
  rewritten: string;
  alternatives?: string[];
}

// Calendar types
export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  status: PostStatus;
  postId: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
