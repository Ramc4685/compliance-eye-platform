import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskBadge } from "./RiskBadge"
import { ExternalLink, User, Building, Mail, Calendar, Image, AlertTriangle, MessageSquare, Link, Video, Globe } from "lucide-react"
import { getAdDetails } from "@/lib/supabase"

interface AdDetailModalProps {
  adId: string | null
  open: boolean
  onClose: () => void
}

interface AdDetail {
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
  snapshot_url?: string
  facebook_ads_library_url?: string
  page_profile_uri?: string
  video_hd_url?: string
  video_preview_image_url?: string
  primary_image_url?: string
  violation_detected_date: string | null
  data_collection_date?: string
  created_at: string
  broker?: {
    npn: string
    broker_name: string
    agency_name: string
    email: string
    registration_status: string
  }
}

export function AdDetailModal({ adId, open, onClose }: AdDetailModalProps) {
  const [adDetail, setAdDetail] = useState<AdDetail | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (adId && open) {
      loadAdDetail(adId)
    }
  }, [adId, open])

  const loadAdDetail = async (id: string) => {
    setLoading(true)
    try {
      const { data, error } = await getAdDetails(id)
      if (error) {
        console.error('Failed to load ad details:', error)
      } else {
        setAdDetail(data)
      }
    } catch (error) {
      console.error('Failed to load ad details:', error)
    } finally {
      setLoading(false)
    }
  }

  const openFacebookAd = () => {
    if (adDetail) {
      // Always use direct ad link construction for consistency
      const facebookUrl = `https://www.facebook.com/ads/library/?id=${adDetail.ad_archive_id}`;
      
      // Force open in a new tab/window
      const newWindow = window.open(facebookUrl, '_blank');
      if (newWindow) {
        newWindow.opener = null;
      } else {
        // If popup is blocked, alert the user
        alert('Please allow popups for this website to view ads on Facebook');
      }
    }
  }

  const openFacebookPage = () => {
    if (adDetail?.page_profile_uri) {
      window.open(adDetail.page_profile_uri, '_blank', 'noopener,noreferrer');
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getViolations = (violations: string | null) => {
    if (!violations) return []
    return violations.split(', ')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Ad Compliance Details
            {adDetail && (
              <RiskBadge 
                riskLevel={adDetail.risk_level} 
                score={adDetail.compliance_score}
                className="ml-auto"
              />
            )}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : adDetail ? (
          <div className="space-y-6">
            {/* Ad Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Ad Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ad Preview - Video or Image */}
                {(adDetail.video_hd_url || adDetail.video_preview_image_url || adDetail.primary_image_url) && (
                  <div className="mb-4 border rounded-md overflow-hidden">
                    {adDetail.video_hd_url ? (
                      <div className="aspect-video">
                        <video 
                          src={adDetail.video_hd_url} 
                          controls 
                          poster={adDetail.video_preview_image_url}
                          className="w-full h-full object-cover"
                        >
                          Your browser does not support video playback.
                        </video>
                      </div>
                    ) : adDetail.video_preview_image_url ? (
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <img 
                          src={adDetail.video_preview_image_url} 
                          alt="Ad preview" 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : adDetail.primary_image_url ? (
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <img 
                          src={adDetail.primary_image_url} 
                          alt="Ad image" 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Page Name</h4>
                      <p className="font-medium">{adDetail.page_name}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Ad Title</h4>
                      <p className="font-medium">{adDetail.ad_title}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Ad Body</h4>
                      <p className="text-sm leading-relaxed">{adDetail.ad_body_text}</p>
                    </div>
                    
                    {adDetail.ad_caption && (
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Caption</h4>
                        <p className="text-sm">{adDetail.ad_caption}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    {adDetail.primary_image_url && (
                      <img 
                        src={adDetail.primary_image_url} 
                        alt="Ad preview"
                        className="max-w-full h-auto rounded-lg border shadow-sm"
                        style={{ maxHeight: '300px' }}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Compliance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Risk Assessment</h4>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">Ad Title</h4>
                        <p>{adDetail.ad_title}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold">Ad Text</h4>
                        <p className="text-sm whitespace-pre-line">{adDetail.ad_body_text}</p>
                      </div>
                      
                      {adDetail.ad_caption && (
                        <div>
                          <h4 className="font-semibold text-sm">Caption</h4>
                          <p className="text-sm">{adDetail.ad_caption}</p>
                        </div>
                      )}
                      
                      {adDetail.cta_text && (
                        <div>
                          <h4 className="font-semibold text-sm">CTA Button</h4>
                          <Badge variant="secondary">{adDetail.cta_text}</Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">Page Name</h4>
                        <div className="flex items-center gap-2">
                          <p>{adDetail.page_name}</p>
                          {adDetail.page_profile_uri && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={openFacebookPage}
                              className="h-6 px-2"
                            >
                              <Globe className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="text-muted-foreground mr-1">Detection:</span>
                        {formatDate(adDetail.violation_detected_date)}
                      </div>
                      
                      {adDetail.data_collection_date && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span className="text-muted-foreground mr-1">Collection:</span>
                          {formatDate(adDetail.data_collection_date)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {adDetail.violation_types_detected && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                      Detected Violations ({getViolations(adDetail.violation_types_detected).length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getViolations(adDetail.violation_types_detected).map((violation, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {violation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Broker Information */}
            {adDetail.broker && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Broker Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{adDetail.broker.broker_name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{adDetail.broker.agency_name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{adDetail.broker.email}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">NPN: </span>
                        <span className="font-mono text-sm">{adDetail.broker.npn}</span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">Status: </span>
                        <Badge 
                          variant={adDetail.broker.registration_status === 'Active' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {adDetail.broker.registration_status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t">
              <div className="text-xs text-muted-foreground">
                Ad ID: {adDetail.ad_archive_id}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                {adDetail.video_hd_url && (
                  <Button variant="outline" asChild className="gap-2">
                    <a href={adDetail.video_hd_url} target="_blank" rel="noopener noreferrer">
                      <Video className="h-4 w-4" />
                      Watch Video
                    </a>
                  </Button>
                )}
                {adDetail.page_profile_uri && (
                  <Button variant="outline" onClick={openFacebookPage} className="gap-2">
                    <Globe className="h-4 w-4" />
                    View FB Page
                  </Button>
                )}
                <Button onClick={openFacebookAd} className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Original Ad
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Failed to load ad details
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}