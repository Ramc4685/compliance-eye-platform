import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  variant?: 'default' | 'critical' | 'warning' | 'success'
  className?: string
}

const variants = {
  default: 'border-border',
  critical: 'border-critical bg-critical/5',
  warning: 'border-high bg-high/5',
  success: 'border-low bg-low/5'
}

export function MetricsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  variant = 'default',
  className 
}: MetricsCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-md", variants[variant], className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span className={cn(
              "text-xs font-medium",
              trend.value > 0 ? "text-high" : trend.value < 0 ? "text-low" : "text-muted-foreground"
            )}>
              {trend.value > 0 ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}