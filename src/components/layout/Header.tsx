import { Link, useLocation } from 'react-router-dom'
import { BsLightningChargeFill } from 'react-icons/bs'
import { BookOpen, Compass, LogOut } from 'lucide-react'
import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LoginModal from '@/components/auth/LoginModal'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const DMContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1 text-zinc-100 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2',
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
      'relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-zinc-800 focus:text-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
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
    className={cn('-mx-1 my-1 h-px bg-zinc-800', className)}
    {...props}
  />
))
DMSeparator.displayName = 'DMSeparator'

export default function Header() {
  const location = useLocation()
  const { user, openLoginModal } = useAuthStore()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast.success('Sesión cerrada correctamente')
  }

  const initials = user?.user_metadata?.full_name
    ? (user.user_metadata.full_name as string).split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? 'U'

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
            <BsLightningChargeFill className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-zinc-100 hidden sm:block">
            Promptly
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link to="/">
            <Button
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Explorar</span>
            </Button>
          </Link>
          <Link
            to="/library"
            onClick={!user ? (e) => { e.preventDefault(); openLoginModal() } : undefined}
          >
            <Button
              variant={location.pathname === '/library' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Mi Librería</span>
            </Button>
          </Link>
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button className="focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full">
                  <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">
                    <AvatarImage src={user.user_metadata?.avatar_url as string | undefined} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuPrimitive.Trigger>
              <DMContent align="end">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-zinc-100">
                    {(user.user_metadata?.full_name as string | undefined) ?? 'Usuario'}
                  </p>
                  <p className="text-xs text-zinc-500 truncate max-w-[180px]">{user.email}</p>
                </div>
                <DMSeparator />
                <DMItem onClick={handleSignOut} className="text-red-400 focus:text-red-300">
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </DMItem>
              </DMContent>
            </DropdownMenuPrimitive.Root>
          ) : (
            <Button onClick={openLoginModal} size="sm">
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
      <LoginModal />
    </header>
  )
}
