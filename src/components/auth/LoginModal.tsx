import { useState } from 'react'
import { FaGithub, FaGoogle, FaLinkedinIn } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/stores/authStore'
import { useLangStore } from '@/stores/langStore'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

type Provider = 'github' | 'google' | 'linkedin_oidc'

const providers: Array<{
  id: Provider
  labelEs: string
  labelEn: string
  icon: React.ComponentType<{ className?: string }>
}> = [
  { id: 'github',        labelEs: 'Continuar con GitHub',   labelEn: 'Continue with GitHub',   icon: FaGithub     },
  { id: 'google',        labelEs: 'Continuar con Google',   labelEn: 'Continue with Google',   icon: FaGoogle     },
  { id: 'linkedin_oidc', labelEs: 'Continuar con LinkedIn', labelEn: 'Continue with LinkedIn', icon: FaLinkedinIn },
]

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthStore()
  const lang = useLangStore((s) => s.lang)
  const [loading, setLoading] = useState<Provider | null>(null)

  const handleOAuth = async (provider: Provider) => {
    setLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    })
    if (error) {
      toast.error(lang === 'es' ? 'Error al iniciar sesión' : 'Sign in failed', {
        description: error.message,
      })
      setLoading(null)
    }
  }

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
      <DialogContent className="sm:max-w-xs bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-zinc-100">
            {lang === 'es' ? 'Acceder a Promptly' : 'Sign in to Promptly'}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 leading-relaxed">
            {lang === 'es'
              ? 'Sin formularios. Sin contraseñas. Elige tu proveedor y listo.'
              : 'No forms. No passwords. Choose a provider and you\'re in.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-1">
          {providers.map(({ id, labelEs, labelEn, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleOAuth(id)}
              disabled={loading !== null}
              className="flex items-center gap-3 w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading === id
                ? <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                : <Icon className="w-4 h-4 text-zinc-400" />
              }
              {lang === 'es' ? labelEs : labelEn}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-zinc-600 mt-1">
          {lang === 'es'
            ? 'Al continuar aceptas los términos de uso.'
            : 'By continuing you accept the terms of use.'
          }
        </p>
      </DialogContent>
    </Dialog>
  )
}
