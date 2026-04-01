import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-purple-500/15 text-purple-300 border border-purple-500/20',
        secondary: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
        outline: 'border border-zinc-700 text-zinc-400',
        success: 'bg-green-500/15 text-green-300 border border-green-500/20',
        warning: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
