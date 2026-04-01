import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Compass, LogOut } from 'lucide-react'
import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LoginModal from '@/components/auth/LoginModal'
import { useAuthStore, selectUser } from '@/stores/authStore'
import { useLangStore } from '@/stores/langStore'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// ── Minimal inline dropdown ───────────────────────────────────────────────

const DMContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[10rem] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-1 text-zinc-100 shadow-xl shadow-black/40',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-1',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DMContent.displayName = 'DMContent'

const DMItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors',
      'focus:bg-zinc-900 focus:text-zinc-100',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  />
))
DMItem.displayName = 'DMItem'

const DMSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-zinc-800/80', className)}
    {...props}
  />
))
DMSeparator.displayName = 'DMSeparator'

// ── Component ─────────────────────────────────────────────────────────────

export default function Header() {
  const location  = useLocation()
  const user      = useAuthStore(selectUser)
  const openLogin = useAuthStore((s) => s.openLoginModal)
  const { lang, setLang } = useLangStore()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    error
      ? toast.error(lang === 'es' ? 'Error al cerrar sesión' : 'Sign out failed')
      : toast.success(lang === 'es' ? 'Sesión cerrada' : 'Signed out')
  }

  const initials = user?.user_metadata?.full_name
    ? (user.user_metadata.full_name as string).split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? 'U'

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/50 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* Logo — wordmark only, no gradient box */}
        <Link to="/" className="text-sm font-semibold tracking-tight text-zinc-100 hover:text-white transition-colors">
          Promptly
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5">
          <Link to="/">
            <Button
              variant={isActive('/') ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-1.5 text-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {lang === 'es' ? 'Explorar' : 'Explore'}
              </span>
            </Button>
          </Link>

          {user ? (
            <Link to="/library">
              <Button
                variant={isActive('/library') ? 'secondary' : 'ghost'}
                size="sm"
                className="gap-1.5 text-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {lang === 'es' ? 'Mi Librería' : 'My Library'}
                </span>
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={openLogin}>
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {lang === 'es' ? 'Mi Librería' : 'My Library'}
              </span>
            </Button>
          )}
        </nav>

        {/* Right: lang toggle + auth */}
        <div className="flex items-center gap-2">

          {/* Language pill toggle */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  'px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide transition-colors cursor-pointer uppercase',
                  lang === l
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-300'
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Auth */}
          {user ? (
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button className="rounded-full focus:outline-none focus:ring-1 focus:ring-zinc-500">
                  <Avatar className="w-7 h-7 cursor-pointer">
                    <AvatarImage src={user.user_metadata?.avatar_url as string | undefined} />
                    <AvatarFallback className="text-[10px] bg-zinc-800 text-zinc-300">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuPrimitive.Trigger>
              <DMContent align="end">
                <div className="px-2.5 py-2">
                  <p className="text-xs font-medium text-zinc-200">
                    {(user.user_metadata?.full_name as string | undefined) ?? 'User'}
                  </p>
                  <p className="text-[11px] text-zinc-500 truncate max-w-[160px] mt-0.5">
                    {user.email}
                  </p>
                </div>
                <DMSeparator />
                <DMItem onClick={handleSignOut} className="text-zinc-400 text-xs">
                  <LogOut className="w-3.5 h-3.5" />
                  {lang === 'es' ? 'Cerrar sesión' : 'Sign out'}
                </DMItem>
              </DMContent>
            </DropdownMenuPrimitive.Root>
          ) : (
            <Button onClick={openLogin} size="sm" className="text-xs h-8 px-3">
              {lang === 'es' ? 'Entrar' : 'Sign in'}
            </Button>
          )}
        </div>
      </div>
      <LoginModal />
    </header>
  )
}
