// API Client for ContentForge Backend
// Handles all API calls to the backend server

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Helper to get auth token
const getAuthToken = (): string | null => {
    return localStorage.getItem('contentforge_token');
};

// Helper for API requests
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getAuthToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'API request failed');
    }

    return data;
}

// ============ AI Endpoints ============

export interface RewriteParams {
    content: string;
    mode: 'template_apply' | 'hook_enhance' | 'full_rewrite' | 'tone_adjust' | 'length_optimize';
    templatePattern?: string;
    templateExample?: string;
    tone?: 'authoritative' | 'conversational' | 'vulnerable' | 'provocative' | 'inspirational';
    targetLength?: 'expand' | 'condense';
}

export interface RewriteResponse {
    success: boolean;
    data: {
        original: string;
        rewritten: string;
    };
}

export async function rewriteContent(params: RewriteParams): Promise<RewriteResponse> {
    return apiRequest<RewriteResponse>('/api/ai/rewrite', {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export interface IdeasResponse {
    success: boolean;
    data: {
        ideas: string[];
    };
}

export async function generateIdeas(topic: string, count: number = 5): Promise<IdeasResponse> {
    return apiRequest<IdeasResponse>('/api/ai/ideas', {
        method: 'POST',
        body: JSON.stringify({ topic, count }),
    });
}

// ============ Auth Endpoints ============

export interface AuthResponse {
    success: boolean;
    data: {
        user: {
            id: string;
            email: string;
            linkedinConnected: boolean;
            linkedinProfile?: {
                name: string;
                headline?: string;
                imageUrl?: string;
            };
        };
        token: string;
    };
}

export async function register(email: string, password: string): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    // Store token on successful registration
    if (response.success && response.data.token) {
        localStorage.setItem('contentforge_token', response.data.token);
    }

    return response;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    // Store token on successful login
    if (response.success && response.data.token) {
        localStorage.setItem('contentforge_token', response.data.token);
    }

    return response;
}

export interface MeResponse {
    success: boolean;
    data: {
        id: string;
        email: string;
        linkedinConnected: boolean;
        linkedinProfile?: {
            name: string;
            headline?: string;
            imageUrl?: string;
        };
    };
}

export async function getCurrentUser(): Promise<MeResponse> {
    return apiRequest<MeResponse>('/api/auth/me');
}

export function logout(): void {
    localStorage.removeItem('contentforge_token');
}

export function isAuthenticated(): boolean {
    return !!getAuthToken();
}

// ============ Posts Endpoints ============

export interface Post {
    id: string;
    content: string;
    templateId?: string;
    status: 'draft' | 'scheduled' | 'published' | 'failed';
    scheduledAt?: string;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PostsResponse {
    success: boolean;
    data: Post[];
}

export async function getPosts(): Promise<PostsResponse> {
    return apiRequest<PostsResponse>('/api/posts');
}

export async function createPost(content: string, templateId?: string): Promise<{ success: boolean; data: Post }> {
    return apiRequest('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ content, templateId }),
    });
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<{ success: boolean; data: Post }> {
    return apiRequest(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
}

export async function deletePost(id: string): Promise<{ success: boolean }> {
    return apiRequest(`/api/posts/${id}`, {
        method: 'DELETE',
    });
}

export async function schedulePost(id: string, scheduledAt: string): Promise<{ success: boolean; data: Post }> {
    return apiRequest(`/api/posts/${id}/schedule`, {
        method: 'POST',
        body: JSON.stringify({ scheduledAt }),
    });
}
