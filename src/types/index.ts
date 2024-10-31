export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  role: 'editor' | 'viewer';
}

// Mock authentication context
export interface AuthContext {
  user: User | null;
  isEditor: boolean;
}