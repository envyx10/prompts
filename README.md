# Promptly

Tu librería personal de prompts de IA.

## Stack

- React 19 + TypeScript
- Vite 6 + Bun
- Tailwind CSS v4
- shadcn/ui (Radix UI)
- Supabase (Auth + DB)
- TanStack Query v5
- Zustand v5
- React Router v7
- React Icons + Lucide React
- Framer Motion
- Sonner

## Setup

1. Clonar e instalar:
```bash
bun install
```

2. Crear archivo `.env` con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Configurar OAuth en Supabase (GitHub, Google, LinkedIn) en Authentication > Providers

4. Arrancar el dev server:
```bash
bun dev
```

## Estructura

- `/` — Explorar prompts públicos con búsqueda y filtros
- `/library` — Librería personal del usuario (requiere auth)
