import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiskBadge } from "./RiskBadge"
import { ExternalLink, Eye, Calendar, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

interface AdsTableProps {
  ads: Ad[]
  loading: boolean
  onAdSelect: (adId: string) => void
}

export function AdsTable({ ads, loading, onAdSelect }: AdsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Ad
    direction: 'asc' | 'desc'
  }>({ key: 'compliance_score', direction: 'desc' })

  const handleSort = (key: keyof Ad) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
    setSortConfig({ key, direction })
  }

  const sortedAds = [...ads].sort((a, b) => {
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const openFacebookAd = (adId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // Always use the direct ad ID link for consistent behavior
    const url = `https://www.facebook.com/ads/library/?id=${adId}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return 'Invalid Date'
    }
  }

  const getViolationCount = (violations: string | null) => {
    if (!violations) return 0
    return violations.split(', ').length
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compliance Monitoring Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Compliance Monitoring Results
          <Badge variant="secondary" className="ml-auto">
            {ads.length} ads found
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Page Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Ad Title
                  </th>
                  <th 
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('compliance_score')}
                  >
                    Risk Level
                    {sortConfig.key === 'compliance_score' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Violations
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Detection Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Collection Date
                  </th>
                  <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAds.map((ad) => (
                  <tr 
                    key={ad.ad_archive_id}
                    className={cn(
                      "border-b transition-colors hover:bg-muted/50 cursor-pointer",
                      ad.is_flagged && "bg-destructive/5"
                    )}
                    onClick={() => onAdSelect(ad.ad_archive_id)}
                  >
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        {ad.primary_image_url && (
                          <img 
                            src={ad.primary_image_url} 
                            alt="Ad preview"
                            className="w-8 h-8 rounded object-cover"
                          />
                        )}
                        <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="font-medium cursor-pointer hover:underline">{ad.page_name}</div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2" align="start">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex items-center gap-2 w-full justify-start"
                                onClick={(e) => openFacebookAd(ad.ad_archive_id, e)}
                              >
                                <ExternalLink className="h-4 w-4" />
                                View on Facebook
                              </Button>
                            </PopoverContent>
                          </Popover>
                          <div className="text-xs text-muted-foreground">
                            ID: {ad.ad_archive_id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="max-w-xs">
                        <div className="font-medium truncate">{ad.ad_title}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {ad.ad_body_text}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <RiskBadge 
                        riskLevel={ad.risk_level} 
                        score={ad.compliance_score}
                      />
                    </td>
                    <td className="p-4 align-middle">
                      {ad.violation_types_detected ? (
                        <div>
                          <Badge variant="destructive" className="mb-1">
                            {getViolationCount(ad.violation_types_detected)} violations
                          </Badge>
                          <div className="text-xs text-muted-foreground max-w-xs truncate">
                            {ad.violation_types_detected}
                          </div>
                          {ad.search_term_used && (
                            <div className="mt-1">
                              <Badge variant="outline" className="text-xs">
                                Search: {ad.search_term_used}
                              </Badge>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-low">
                          Clean
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 align-middle text-sm">
                      {formatDate(ad.violation_detected_date)}
                    </td>
                    <td className="p-4 align-middle text-sm">
                      {formatDate(ad.data_collection_date)}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onAdSelect(ad.ad_archive_id)
                          }}
                          className="h-8 px-2"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => openFacebookAd(ad.ad_archive_id, e)}
                          className="h-8 px-2"
                          title="View on Facebook"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {ads.length === 0 && (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No ads found matching your criteria
            </div> 
          )}
        </div>
      </CardContent>
    </Card>
  )
}