import { cn } from "@/lib/utils"

interface RiskBadgeProps {
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'CLEAR'
  score: number
  className?: string
}

const riskStyles = {
  CRITICAL: 'bg-critical text-critical-foreground border-critical',
  HIGH: 'bg-high text-high-foreground border-high',
  MEDIUM: 'bg-medium text-medium-foreground border-medium',
  LOW: 'bg-low text-low-foreground border-low',
  CLEAR: 'bg-clear text-clear-foreground border-clear'
}

export function RiskBadge({ riskLevel, score, className }: RiskBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
      riskStyles[riskLevel],
      className
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {riskLevel} ({score})
    </span>
  )
}