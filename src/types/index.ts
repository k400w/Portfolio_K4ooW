export type Locale = 'en' | 'ua';

export interface LocalizedString {
  en: string;
  ua: string;
}

export interface Project {
  id: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription?: LocalizedString;
  category: 'ecommerce' | 'corporate' | 'edtech' | 'custom-cms' | 'saas';
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  imageUrl: string;
  featured: boolean;
  sortOrder: number;
  client?: string;
  year?: string;
  architectureHighlights?: {
    en: string[];
    ua: string[];
  };
  metrics?: {
    en: string;
    ua: string;
  };
  status?: 'production' | 'development' | 'maintained';
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  iconName: string;
  category: 'frontend' | 'backend' | 'platforms' | 'architecture';
  description?: LocalizedString;
  highlights?: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  telegram?: string;
  serviceType: string;
  budget?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface UserSession {
  isAuthenticated: boolean;
  username?: string;
  token?: string;
}
