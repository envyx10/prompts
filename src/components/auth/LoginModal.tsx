import { useState } from 'react'
import { FaGithub, FaGoogle, FaLinkedinIn } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
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
      <DialogContent className="sm:max-w-sm bg-zinc-950 border-zinc-800/80 p-0 overflow-hidden">

        {/* Top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent" />
        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
        />

        <div className="relative px-6 pt-8 pb-6">

          {/* Header */}
          <div className="text-center mb-6">
            <DialogTitle className="text-base font-semibold text-zinc-100 mb-1.5">
              {lang === 'es' ? 'Acceder a PromptLib' : 'Sign in to PromptLib'}
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500 leading-relaxed">
              {lang === 'es'
                ? 'Sin formularios. Sin contraseñas. Elige tu proveedor y listo.'
                : 'No forms. No passwords. Choose a provider and you\'re in.'
              }
            </DialogDescription>
          </div>

          {/* Providers */}
          <div className="flex flex-col gap-2">
            {providers.map(({ id, labelEs, labelEn, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleOAuth(id)}
                disabled={loading !== null}
                className="flex items-center gap-3 w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 transition-all hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading === id
                  ? <Loader2 className="w-4 h-4 animate-spin text-zinc-400 shrink-0" />
                  : <Icon className="w-4 h-4 text-zinc-400 shrink-0" />
                }
                <span className="flex-1 text-left">{lang === 'es' ? labelEs : labelEn}</span>
              </button>
            ))}
          </div>

          {/* Divider + terms */}
          <div className="mt-5 pt-5 border-t border-zinc-800/60">
            <p className="text-center text-[11px] text-zinc-600">
              {lang === 'es'
                ? 'Al continuar aceptas los términos de uso.'
                : 'By continuing you accept the terms of use.'
              }
            </p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
