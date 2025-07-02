import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

interface SearchFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filters: {
    riskLevels: string[]
    minScore: number
    maxScore: number
    flaggedOnly: boolean
  }
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

const riskLevels = [
  { value: 'CRITICAL', label: 'Critical', color: 'text-critical' },
  { value: 'HIGH', label: 'High', color: 'text-high' },
  { value: 'MEDIUM', label: 'Medium', color: 'text-medium' },
  { value: 'LOW', label: 'Low', color: 'text-low' },
  { value: 'CLEAR', label: 'Clear', color: 'text-clear' }
]

export function SearchFilters({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  onClearFilters
}: SearchFiltersProps) {
  const handleRiskLevelChange = (riskLevel: string, checked: boolean) => {
    const newRiskLevels = checked
      ? [...filters.riskLevels, riskLevel]
      : filters.riskLevels.filter(level => level !== riskLevel)
    
    onFiltersChange({ ...filters, riskLevels: newRiskLevels })
  }

  const handleScoreRangeChange = (values: number[]) => {
    onFiltersChange({ 
      ...filters, 
      minScore: values[0], 
      maxScore: values[1] 
    })
  }

  const handleFlaggedOnlyChange = (checked: boolean) => {
    onFiltersChange({ ...filters, flaggedOnly: checked })
  }

  const hasActiveFilters = filters.riskLevels.length > 0 || 
                          filters.minScore > 0 || 
                          filters.maxScore < 10 || 
                          filters.flaggedOnly

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search ads by page name, title, or violation types..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-12 text-base"
        />
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="h-8 px-2 gap-1"
              >
                <X className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Levels */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Risk Levels</Label>
            <div className="grid grid-cols-3 gap-3">
              {riskLevels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={level.value}
                    checked={filters.riskLevels.includes(level.value)}
                    onCheckedChange={(checked) => 
                      handleRiskLevelChange(level.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={level.value} 
                    className={`text-sm cursor-pointer ${level.color}`}
                  >
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Score Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Compliance Score: {filters.minScore} - {filters.maxScore}
            </Label>
            <Slider
              value={[filters.minScore, filters.maxScore]}
              onValueChange={handleScoreRangeChange}
              max={10}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0 (Clean)</span>
              <span>10 (High Risk)</span>
            </div>
          </div>

          {/* Flagged Only */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="flagged-only"
              checked={filters.flaggedOnly}
              onCheckedChange={handleFlaggedOnlyChange}
            />
            <Label htmlFor="flagged-only" className="text-sm cursor-pointer">
              Show only flagged ads (score ≥ 3)
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}