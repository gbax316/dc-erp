// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types for API responses
interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  message: string;
}

// Content types
export interface Sermon {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  speaker: string;
  date: string;
  duration: number;
  tags: string[];
  scripture: string;
  churchId: string;
}

export interface Devotional {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  thumbnailUrl: string;
  author: string;
  date: string;
  tags: string[];
  scripture: string;
  churchId: string;
}

// Default church ID - should ideally come from context or configuration
const DEFAULT_CHURCH_ID = process.env.NEXT_PUBLIC_DEFAULT_CHURCH_ID || '';

/**
 * Fetch sermons from the API
 */
export async function getSermons(options: {
  churchId?: string;
  startDate?: string;
  endDate?: string;
  speaker?: string;
  limit?: number;
} = {}): Promise<Sermon[]> {
  // Set default churchId if not provided
  const churchId = options.churchId || DEFAULT_CHURCH_ID;
  
  if (!churchId) {
    throw new Error('Church ID is required');
  }
  
  // Build query params
  const params = new URLSearchParams({
    churchId: churchId,
  });
  
  if (options.startDate) params.append('startDate', options.startDate);
  if (options.endDate) params.append('endDate', options.endDate);
  if (options.speaker) params.append('speaker', options.speaker);
  if (options.limit) params.append('limit', String(options.limit));
  
  try {
    const response = await fetch(`${API_BASE_URL}/content/sermons?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sermons: ${response.statusText}`);
    }
    
    const data: ApiResponse<Sermon[]> = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return [];
  }
}

/**
 * Fetch devotionals from the API
 */
export async function getDevotionals(options: {
  churchId?: string;
  startDate?: string;
  endDate?: string;
  author?: string;
  limit?: number;
} = {}): Promise<Devotional[]> {
  // Set default churchId if not provided
  const churchId = options.churchId || DEFAULT_CHURCH_ID;
  
  if (!churchId) {
    throw new Error('Church ID is required');
  }
  
  // Build query params
  const params = new URLSearchParams({
    churchId: churchId,
  });
  
  if (options.startDate) params.append('startDate', options.startDate);
  if (options.endDate) params.append('endDate', options.endDate);
  if (options.author) params.append('author', options.author);
  if (options.limit) params.append('limit', String(options.limit));
  
  try {
    const response = await fetch(`${API_BASE_URL}/content/devotionals?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch devotionals: ${response.statusText}`);
    }
    
    const data: ApiResponse<Devotional[]> = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching devotionals:', error);
    return [];
  }
}

/**
 * Fetch a single content item by ID
 */
export async function getContentById(id: string): Promise<Sermon | Devotional | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/content/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }
    
    const data: ApiResponse<Sermon | Devotional> = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching content item:', error);
    return null;
  }
} 