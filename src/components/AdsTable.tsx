import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RiskBadge } from "./RiskBadge"
import { ExternalLink, Eye, Calendar, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"
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
  totalCount: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function AdsTable({ ads, loading, onAdSelect, totalCount, currentPage, pageSize, onPageChange, onPageSizeChange }: AdsTableProps) {
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
            {totalCount.toLocaleString()} ads found
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : ads.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th
                        className="p-4 text-left text-sm font-medium text-muted-foreground cursor-pointer"
                        onClick={() => handleSort('page_name')}
                      >
                        Page Name
                        {sortConfig.key === 'page_name' && (
                          <span className="ml-2 text-xs">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Ad Title
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Risk
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Score
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
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAds.map((ad) => (
                      <tr 
                        key={ad.ad_archive_id} 
                        className="border-b hover:bg-muted/50 cursor-pointer"
                        onClick={() => onAdSelect(ad.ad_archive_id)}
                      >
                        <td className="p-4 align-middle">
                          <div className="font-medium">{ad.page_name}</div>
                        </td>
                        <td className="p-4 align-middle max-w-xs truncate">
                          {ad.ad_title}
                        </td>
                        <td className="p-4 align-middle">
                          <RiskBadge riskLevel={ad.risk_level} score={ad.compliance_score} />
                        </td>
                        <td className="p-4 align-middle text-center">
                          <Badge
                            className={cn(
                              "w-8",
                              ad.compliance_score >= 4 && "bg-destructive hover:bg-destructive",
                              ad.compliance_score >= 2 && ad.compliance_score < 4 && "bg-warning hover:bg-warning text-warning-foreground",
                              ad.compliance_score > 0 && ad.compliance_score < 2 && "bg-yellow-500 hover:bg-yellow-500",
                              ad.compliance_score === 0 && "bg-green-500 hover:bg-green-500"
                            )}
                          >
                            {ad.compliance_score}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          {ad.violation_types_detected ? (
                            <div>
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
              
              {/* Pagination - only shown when there are ads */}
              {totalCount > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-t">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Show</span>
                    <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="250">250</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">per page</span>
                  </div>
                
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Showing {totalCount > 0 ? `${currentPage * pageSize + 1} to ${Math.min((currentPage + 1) * pageSize, totalCount)}` : '0'} of {totalCount.toLocaleString()} results
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="h-8 w-8 p-0"
                        title="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">{currentPage + 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={(currentPage + 1) * pageSize >= totalCount}
                        className="h-8 w-8 p-0"
                        title="Next page"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <div className="text-center mb-2">No ads found matching your criteria</div>
              <div className="text-xs text-muted-foreground">Try adjusting your filters or search terms</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}