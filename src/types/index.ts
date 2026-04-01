export type Lang = 'es' | 'en'

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

export interface BilingualText {
  es: string
  en: string
}

export interface Prompt {
  id: string
  title: BilingualText
  content: BilingualText
  description: BilingualText
  category: Category
  tags: string[]
  author_id?: string
  is_public: boolean
  use_count: number
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url: string
  provider: 'github' | 'google' | 'linkedin_oidc'
}
