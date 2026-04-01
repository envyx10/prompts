import { useState } from 'react'
import { FaGithub, FaGoogle, FaLinkedinIn } from 'react-icons/fa'
import { BsLightningChargeFill } from 'react-icons/bs'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

type Provider = 'github' | 'google' | 'linkedin_oidc'

const providers: Array<{
  id: Provider
  label: string
  icon: React.ComponentType<{ className?: string }>
  className: string
}> = [
  {
    id: 'github',
    label: 'Continuar con GitHub',
    icon: FaGithub,
    className: 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700',
  },
  {
    id: 'google',
    label: 'Continuar con Google',
    icon: FaGoogle,
    className: 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700',
  },
  {
    id: 'linkedin_oidc',
    label: 'Continuar con LinkedIn',
    icon: FaLinkedinIn,
    className: 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700',
  },
]

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthStore()
  const [loading, setLoading] = useState<Provider | null>(null)

  const handleOAuth = async (provider: Provider) => {
    setLoading(provider)
    // signInWithOAuth redirects the browser on success — the page navigates away.
    // We only need to handle the error case (invalid config, network failure, etc.)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    })
    if (error) {
      toast.error('Error al iniciar sesión', { description: error.message })
      setLoading(null)
    }
    // On success: browser redirects, component unmounts, loading state irrelevant.
  }

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/30 mx-auto mb-2">
            <BsLightningChargeFill className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl">Bienvenido a Promptly</DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            Inicia sesión para guardar prompts y crear tu librería personal. Sin registro, sin contraseñas.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          {providers.map(({ id, label, icon: Icon, className }) => (
            <button
              key={id}
              onClick={() => handleOAuth(id)}
              disabled={loading !== null}
              className={`
                relative flex items-center gap-3 w-full rounded-xl border px-4 py-3 text-sm font-medium text-zinc-100
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                ${className}
              `}
            >
              {loading === id ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
              <span>{label}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-zinc-500 text-center mt-2">
          Al continuar, aceptas nuestros términos de uso y política de privacidad.
        </p>
      </DialogContent>
    </Dialog>
  )
}
