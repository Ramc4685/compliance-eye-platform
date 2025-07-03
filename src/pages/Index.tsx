import { useState, useEffect } from "react"
import { MetricsCard } from "@/components/MetricsCard"
import { SearchFilters } from "@/components/SearchFilters"
import { AdsTable } from "@/components/AdsTable"
import { ComplianceCharts } from "@/components/ComplianceCharts"
import { AdDetailModal } from "@/components/AdDetailModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDashboardMetrics, searchAds } from "@/lib/supabase"
import { AlertTriangle, Shield, TrendingUp, Activity, BarChart3, Table, RefreshCw } from "lucide-react"

interface DashboardMetrics {
  totalAds: number
  flaggedCount: number
  avgScore: number
  criticalCount: number
}

interface Ad {
  ad_archive_id: string
  page_name: string
  ad_title: string
  ad_body_text: string
  ad_caption?: string
  cta_text?: string
  compliance_score: number
  risk_level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'CLEAR'
  violation_types_detected: string | null
  is_flagged: boolean
  facebook_ads_library_url?: string
  page_profile_uri?: string
  video_hd_url?: string
  video_preview_image_url?: string
  violation_detected_date: string | null
  data_collection_date?: string
  primary_image_url?: string
  search_term_used?: string
  last_updated: string
}

const Index = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalAds: 0,
    flaggedCount: 0,
    avgScore: 0,
    criticalCount: 0
  })
  const [ads, setAds] = useState<Ad[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    riskLevels: [],
    minScore: 0,
    maxScore: 10,
    flaggedOnly: false
  })
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  // Load initial data
  useEffect(() => {
    loadDashboardData()
  }, [])

  // Search and filter ads
  useEffect(() => {
    searchAdsData()
  }, [searchTerm, filters])

  const loadDashboardData = async () => {
    try {
      const metricsData = await getDashboardMetrics()
      setMetrics(metricsData)
    } catch (error) {
      console.error('Failed to load dashboard metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchAdsData = async () => {
    setSearchLoading(true)
    try {
      const { data } = await searchAds(searchTerm, filters)
      setAds(data as Ad[])
    } catch (error) {
      console.error('Failed to search ads:', error)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleAdSelect = (adId: string) => {
    setSelectedAdId(adId)
    setDetailModalOpen(true)
  }

  const handleClearFilters = () => {
    setFilters({
      riskLevels: [],
      minScore: 0,
      maxScore: 10,
      flaggedOnly: false
    })
    setSearchTerm('')
  }

  const refreshData = async () => {
    setLoading(true)
    await loadDashboardData()
    await searchAdsData()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">ComplianceEye</h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Facebook Ads Monitoring
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                disabled={loading}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Badge variant="outline" className="text-xs">
                Live Monitoring
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Metrics Overview */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Compliance Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Total Ads Monitored"
              value={loading ? "..." : metrics.totalAds.toLocaleString()}
              description="Facebook health insurance ads"
              icon={Activity}
              variant="default"
            />
            
            <MetricsCard
              title="Flagged Violations"
              value={loading ? "..." : metrics.flaggedCount.toLocaleString()}
              description="Score ≥ 3 (High Risk+)"
              icon={AlertTriangle}
              variant={metrics.flaggedCount > 0 ? "warning" : "default"}
            />
            
            <MetricsCard
              title="Average Score"
              value={loading ? "..." : metrics.avgScore.toFixed(1)}
              description="0-10 violation scale"
              icon={TrendingUp}
              variant={metrics.avgScore >= 3 ? "critical" : metrics.avgScore >= 2 ? "warning" : "success"}
            />
            
            <MetricsCard
              title="Critical Alerts"
              value={loading ? "..." : metrics.criticalCount.toLocaleString()}
              description="Immediate attention needed"
              icon={Shield}
              variant={metrics.criticalCount > 0 ? "critical" : "success"}
            />
          </div>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="monitoring" className="gap-2">
              <Table className="h-4 w-4" />
              Ad Monitoring
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Ad Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search & Filters Sidebar */}
              <div className="lg:col-span-1">
                <SearchFilters
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Results Table */}
              <div className="lg:col-span-3">
                <AdsTable
                  ads={ads}
                  loading={searchLoading}
                  onAdSelect={handleAdSelect}
                />
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Compliance Analytics
              </h3>
              <ComplianceCharts />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ad Detail Modal */}
      <AdDetailModal
        adId={selectedAdId}
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedAdId(null)
        }}
      />
    </div>
  )
};

export default Index;
