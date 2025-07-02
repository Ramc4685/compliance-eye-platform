import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { getScoreDistribution, getViolationBreakdown, getRiskTrends } from "@/lib/supabase"
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react"

// Colors for risk levels matching our design system
const RISK_COLORS = {
  CRITICAL: '#dc2626', // critical
  HIGH: '#ea580c',     // high
  MEDIUM: '#ca8a04',   // medium
  LOW: '#16a34a',      // low
  CLEAR: '#2563eb'     // clear
}

export function ComplianceCharts() {
  const [scoreData, setScoreData] = useState<any[]>([])
  const [violationData, setViolationData] = useState<any[]>([])
  const [trendsData, setTrendsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const [scoreDistribution, violationBreakdown, riskTrends] = await Promise.all([
          getScoreDistribution(),
          getViolationBreakdown(),
          getRiskTrends()
        ])
        
        setScoreData(scoreDistribution)
        setViolationData(violationBreakdown)
        setTrendsData(riskTrends)
      } catch (error) {
        console.error('Failed to load chart data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadChartData()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Compliance Score Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Score Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="score" 
                tick={{ fontSize: 12 }}
                label={{ value: 'Compliance Score', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'Number of Ads', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                labelFormatter={(value) => `Score: ${value}`}
                formatter={(value, name) => [value, 'Ads']}
              />
              <Bar 
                dataKey="count" 
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Violation Types Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Top Violations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={violationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                fontSize={10}
              >
                {violationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(RISK_COLORS)[index % Object.values(RISK_COLORS).length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Violations']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Trends Over Time */}
      <Card className="lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            7-Day Risk Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'Violations', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="CRITICAL" stroke={RISK_COLORS.CRITICAL} strokeWidth={2} name="Critical" />
              <Line type="monotone" dataKey="HIGH" stroke={RISK_COLORS.HIGH} strokeWidth={2} name="High" />
              <Line type="monotone" dataKey="MEDIUM" stroke={RISK_COLORS.MEDIUM} strokeWidth={2} name="Medium" />
              <Line type="monotone" dataKey="LOW" stroke={RISK_COLORS.LOW} strokeWidth={2} name="Low" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}