import { supabase } from '@/integrations/supabase/client'



// Real Supabase API functions
export const getDashboardMetrics = async () => {
  try {
    // Get total count separately to handle the 1000 row limit
    const { count: totalCount, error: countError } = await supabase
      .from('ads')
      .select('*', { count: 'exact', head: true })
    
    if (countError) throw countError
    
    // Get sample of ads for metrics calculations
    const { data: ads, error } = await supabase
      .from('ads')
      .select('compliance_score, is_flagged, risk_level')
      .limit(1000) // Explicitly set limit to make it clear
    
    if (error) throw error
    
    const totalAds = totalCount || 0
    const sampleSize = ads?.length || 0
    
    // Calculate metrics based on the sample
    const flaggedCount = sampleSize > 0
      ? Math.round((ads.filter(ad => ad.is_flagged).length / sampleSize) * totalAds)
      : 0
      
    const avgScore = sampleSize > 0 
      ? Math.round((ads.reduce((sum, ad) => sum + (ad.compliance_score || 0), 0) / sampleSize) * 10) / 10
      : 0
      
    const criticalCount = sampleSize > 0
      ? Math.round((ads.filter(ad => ad.risk_level === 'CRITICAL').length / sampleSize) * totalAds)
      : 0
    
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
    // First get the count of all matching records
    let countQuery = supabase
      .from('ads')
      .select('*', { count: 'exact', head: true })
    
    // Text search across key fields
    if (searchTerm) {
      countQuery = countQuery.or(`
        page_name.ilike.%${searchTerm}%,
        ad_title.ilike.%${searchTerm}%,
        violation_types_detected.ilike.%${searchTerm}%
      `)
    }
    
    // Risk level filter
    if (filters.riskLevels?.length > 0) {
      countQuery = countQuery.in('risk_level', filters.riskLevels)
    }
    
    // Score range filter
    if (filters.minScore !== undefined) {
      countQuery = countQuery.gte('compliance_score', filters.minScore)
    }
    if (filters.maxScore !== undefined) {
      countQuery = countQuery.lte('compliance_score', filters.maxScore)
    }
    
    // Only flagged ads filter
    if (filters.flaggedOnly) {
      countQuery = countQuery.eq('is_flagged', true)
    }
    
    const { count: totalCount, error: countError } = await countQuery
    
    if (countError) throw countError
    
    // Now get the actual data for the current page
    let dataQuery = supabase
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
        search_term_used,
        last_updated
      `)
    
    // Apply the same filters to the data query
    if (searchTerm) {
      dataQuery = dataQuery.or(`
        page_name.ilike.%${searchTerm}%,
        ad_title.ilike.%${searchTerm}%,
        violation_types_detected.ilike.%${searchTerm}%
      `)
    }
    
    if (filters.riskLevels?.length > 0) {
      dataQuery = dataQuery.in('risk_level', filters.riskLevels)
    }
    
    if (filters.minScore !== undefined) {
      dataQuery = dataQuery.gte('compliance_score', filters.minScore)
    }
    if (filters.maxScore !== undefined) {
      dataQuery = dataQuery.lte('compliance_score', filters.maxScore)
    }
    
    if (filters.flaggedOnly) {
      dataQuery = dataQuery.eq('is_flagged', true)
    }
    
    const { data, error: dataError } = await dataQuery
      .order('compliance_score', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1)
    
    if (dataError) throw dataError
    
    console.log(`Found ${totalCount} total ads, showing page ${page + 1} with ${data?.length || 0} items`)
    
    return {
      data: data || [],
      totalCount: totalCount || 0
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