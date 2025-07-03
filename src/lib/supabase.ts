import { supabase } from '@/integrations/supabase/client'

// Mock data for demonstration
export const mockAds = [
  {
    ad_archive_id: "30447301448250098",
    page_name: "Eric Weschke Financial",
    ad_title: "Custom retirement income plan with immediate benefits",
    ad_body_text: "Get a $100 gift card when you sign up for our zero-cost health plan. Limited time offer! Call now!",
    compliance_score: 3,
    risk_level: "HIGH",
    violation_types_detected: "Gift Card Incentives, Misleading Free Claims, False Urgency Tactics",
    is_flagged: true,
    snapshot_url: "https://www.facebook.com/ads/library/?id=30447301448250098",
    violation_detected_date: "2025-01-20T14:30:00Z",
    primary_image_url: "https://picsum.photos/400/300?random=1",
    linked_broker_npn: "12345678",
    created_at: "2025-01-20T14:30:00Z"
  },
  {
    ad_archive_id: "987654321098765",
    page_name: "HealthCare Solutions Plus",
    ad_title: "CMS Approved Health Insurance - Official Government Coverage",
    ad_body_text: "Official government health coverage with zero cost to you. Cure your diabetes and heart problems today! FDA approved treatment guaranteed.",
    compliance_score: 5,
    risk_level: "CRITICAL",
    violation_types_detected: "Government Impersonation, Misleading Free Claims, Unsubstantiated Medical Claims, FDA Misrepresentation, Guarantee Claims",
    is_flagged: true,
    snapshot_url: "https://www.facebook.com/ads/library/?id=987654321098765",
    violation_detected_date: "2025-01-20T10:15:00Z",
    primary_image_url: "https://picsum.photos/400/300?random=2",
    linked_broker_npn: "87654321",
    created_at: "2025-01-20T10:15:00Z"
  },
  {
    ad_archive_id: "456789012345678",
    page_name: "Trusted Insurance Agency",
    ad_title: "Affordable Health Plans",
    ad_body_text: "Compare health insurance plans that fit your budget and needs. Licensed agents available to help you understand your options.",
    compliance_score: 0,
    risk_level: "CLEAR",
    violation_types_detected: null,
    is_flagged: false,
    snapshot_url: "https://www.facebook.com/ads/library/?id=456789012345678",
    violation_detected_date: null,
    primary_image_url: "https://picsum.photos/400/300?random=3",
    linked_broker_npn: "11111111",
    created_at: "2025-01-20T09:00:00Z"
  },
  {
    ad_archive_id: "111222333444555",
    page_name: "Medicare Advantage Pros",
    ad_title: "FREE Medicare Plan - No Cost To You!",
    ad_body_text: "Get your FREE Medicare Advantage plan today. No monthly premiums, no deductibles. This offer expires soon - don't miss out!",
    compliance_score: 2,
    risk_level: "MEDIUM",
    violation_types_detected: "Misleading Free Claims, False Urgency Tactics",
    is_flagged: false,
    snapshot_url: "https://www.facebook.com/ads/library/?id=111222333444555",
    violation_detected_date: "2025-01-19T16:45:00Z",
    primary_image_url: "https://picsum.photos/400/300?random=4",
    linked_broker_npn: "22222222",
    created_at: "2025-01-19T16:45:00Z"
  },
  {
    ad_archive_id: "777888999000111",
    page_name: "Health Benefits Direct",
    ad_title: "Win $500 Cash + Free Health Insurance",
    ad_body_text: "Enter to win $500 cash prize when you apply for health insurance. Government-backed plans available. Apply today and get instant approval!",
    compliance_score: 4,
    risk_level: "CRITICAL",
    violation_types_detected: "Cash Prize Incentives, Government Impersonation, False Urgency Tactics, Misleading Approval Claims",
    is_flagged: true,
    snapshot_url: "https://www.facebook.com/ads/library/?id=777888999000111",
    violation_detected_date: "2025-01-19T11:20:00Z",
    primary_image_url: "https://picsum.photos/400/300?random=5",
    linked_broker_npn: "33333333",
    created_at: "2025-01-19T11:20:00Z"
  },
  {
    ad_archive_id: "222333444555666",
    page_name: "Family Health Solutions",
    ad_title: "Health Insurance Made Simple",
    ad_body_text: "Find the right health insurance plan for your family. Compare options from top-rated insurers with our licensed agents.",
    compliance_score: 1,
    risk_level: "LOW",
    violation_types_detected: "Missing ACA Disclaimers",
    is_flagged: false,
    snapshot_url: "https://www.facebook.com/ads/library/?id=222333444555666",
    violation_detected_date: "2025-01-18T13:10:00Z",
    primary_image_url: "https://picsum.photos/400/300?random=6",
    linked_broker_npn: "44444444",
    created_at: "2025-01-18T13:10:00Z"
  }
]

export const mockBrokers = [
  { npn: "12345678", broker_name: "Eric Weschke", agency_name: "Eric Weschke Financial", email: "eric@ewfinancial.com", total_violations: 3, compliance_score: 3, registration_status: "Active" },
  { npn: "87654321", broker_name: "Sarah Johnson", agency_name: "HealthCare Solutions Plus", email: "sarah@hcsplus.com", total_violations: 5, compliance_score: 5, registration_status: "Under Review" },
  { npn: "11111111", broker_name: "Mike Chen", agency_name: "Trusted Insurance Agency", email: "mike@trusted.com", total_violations: 0, compliance_score: 0, registration_status: "Active" },
  { npn: "22222222", broker_name: "Lisa Rodriguez", agency_name: "Medicare Advantage Pros", email: "lisa@mapros.com", total_violations: 2, compliance_score: 2, registration_status: "Active" },
  { npn: "33333333", broker_name: "Tom Wilson", agency_name: "Health Benefits Direct", email: "tom@hbdirect.com", total_violations: 4, compliance_score: 4, registration_status: "Suspended" },
  { npn: "44444444", broker_name: "Angela Davis", agency_name: "Family Health Solutions", email: "angela@familyhealth.com", total_violations: 1, compliance_score: 1, registration_status: "Active" }
]

// Real Supabase API functions
export const getDashboardMetrics = async () => {
  try {
    const { data: ads, error } = await supabase
      .from('ads')
      .select('compliance_score, is_flagged, risk_level')
    
    if (error) throw error
    
    const totalAds = ads?.length || 0
    const flaggedCount = ads?.filter(ad => ad.is_flagged).length || 0
    const avgScore = totalAds > 0 
      ? Math.round((ads.reduce((sum, ad) => sum + (ad.compliance_score || 0), 0) / totalAds) * 10) / 10
      : 0
    const criticalCount = ads?.filter(ad => ad.risk_level === 'CRITICAL').length || 0
    
    return {
      totalAds,
      flaggedCount,
      avgScore,
      criticalCount
    }
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return {
      totalAds: 0,
      flaggedCount: 0,
      avgScore: 0,
      criticalCount: 0
    }
  }
}

interface SearchFilters {
  riskLevels?: string[]
  minScore?: number
  maxScore?: number
  flaggedOnly?: boolean
}

export const searchAds = async (searchTerm = '', filters: SearchFilters = {}, page = 0, limit = 1000) => {
  try {
    let query = supabase
      .from('ads')
      .select(`
        ad_archive_id,
        page_name,
        ad_title,
        ad_body_text,
        compliance_score,
        risk_level,
        violation_types_detected,
        violation_detected_date,
        facebook_ads_library_url,
        primary_image_url,
        is_flagged,
        linked_broker_npn,
        data_collection_date,
        last_updated
      `)
    
    // Text search across key fields
    if (searchTerm) {
      query = query.or(`
        page_name.ilike.%${searchTerm}%,
        ad_title.ilike.%${searchTerm}%,
        violation_types_detected.ilike.%${searchTerm}%
      `)
    }
    
    // Risk level filter
    if (filters.riskLevels?.length > 0) {
      query = query.in('risk_level', filters.riskLevels)
    }
    
    // Score range filter
    if (filters.minScore !== undefined) {
      query = query.gte('compliance_score', filters.minScore)
    }
    if (filters.maxScore !== undefined) {
      query = query.lte('compliance_score', filters.maxScore)
    }
    
    // Only flagged ads filter
    if (filters.flaggedOnly) {
      query = query.eq('is_flagged', true)
    }
    
    const { data, error, count } = await query
      .order('compliance_score', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1)
    
    if (error) throw error
    
    return {
      data: data || [],
      totalCount: count || 0
    }
  } catch (error) {
    console.error('Error searching ads:', error)
    return {
      data: [],
      totalCount: 0
    }
  }
}

export const getAdDetails = async (adArchiveId: string) => {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select(`
        *,
        brokers!linked_broker_npn(
          npn,
          broker_name,
          agency_name,
          email,
          registration_status
        )
      `)
      .eq('ad_archive_id', adArchiveId)
      .single()
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching ad details:', error)
    return { data: null, error: 'Ad not found' }
  }
}

export const getScoreDistribution = async () => {
  try {
    const { data: ads, error } = await supabase
      .from('ads')
      .select('compliance_score')
    
    if (error) throw error
    
    const distribution = Array.from({length: 11}, (_, i) => ({
      score: i,
      count: ads?.filter(ad => (ad.compliance_score || 0) === i).length || 0
    }))
    
    return distribution.filter(item => item.count > 0)
  } catch (error) {
    console.error('Error fetching score distribution:', error)
    return []
  }
}

export const getViolationBreakdown = async () => {
  try {
    const { data: ads, error } = await supabase
      .from('ads')
      .select('violation_types_detected')
      .not('violation_types_detected', 'is', null)
    
    if (error) throw error
    
    const violations: Record<string, number> = {}
    
    ads?.forEach(ad => {
      if (ad.violation_types_detected) {
        ad.violation_types_detected.split(', ').forEach(violation => {
          violations[violation] = (violations[violation] || 0) + 1
        })
      }
    })
    
    return Object.entries(violations)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  } catch (error) {
    console.error('Error fetching violation breakdown:', error)
    return []
  }
}

export const getRiskTrends = async (days = 7) => {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const { data: ads, error } = await supabase
      .from('ads')
      .select('violation_detected_date, risk_level')
      .gte('violation_detected_date', startDate.toISOString())
      .order('violation_detected_date')
    
    if (error) throw error
    
    // Group by date and risk level
    const trends: Record<string, Record<string, number>> = {}
    
    // Initialize all dates
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      const dateStr = date.toISOString().split('T')[0]
      trends[dateStr] = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0, CLEAR: 0 }
    }
    
    ads?.forEach(ad => {
      if (ad.violation_detected_date && ad.risk_level) {
        const date = new Date(ad.violation_detected_date).toISOString().split('T')[0]
        if (trends[date]) {
          trends[date][ad.risk_level as keyof typeof trends[string]]++
        }
      }
    })
    
    return Object.entries(trends).map(([date, counts]) => ({
      date,
      ...counts
    }))
  } catch (error) {
    console.error('Error fetching risk trends:', error)
    return []
  }
}