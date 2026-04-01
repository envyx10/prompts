export type Language = 'es' | 'en' | 'both'

export type Category =
  | 'writing'
  | 'coding'
  | 'marketing'
  | 'productivity'
  | 'creativity'
  | 'business'
  | 'education'
  | 'data'
  | 'design'
  | 'other'

export interface Prompt {
  id: string
  title: string
  content: string
  description: string
  category: Category
  language: Language
  tags: string[]
  author_id?: string
  is_public: boolean
  use_count: number
  created_at: string
  updated_at: string
  is_saved?: boolean
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url: string
  provider: 'github' | 'google' | 'linkedin_oidc'
}
