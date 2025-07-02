export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          ad_archive_id: string
          ad_body_text: string | null
          ad_caption: string | null
          ad_creative_video_url: string | null
          ad_delivery_start_time: number | null
          ad_delivery_stop_time: number | null
          ad_id: string | null
          ad_status: string | null
          ad_title: string | null
          additional_images: string | null
          additional_videos: string | null
          archive_types: string | null
          brazil_tax_id: string | null
          byline: string | null
          cards_data: string | null
          categories: string | null
          collation_count: number | null
          collation_id: string | null
          compliance_score: number | null
          compliance_status: string | null
          contains_digital_created_media: boolean | null
          contains_sensitive_content: boolean | null
          country_iso_code: string | null
          cta_text: string | null
          cta_type: string | null
          currency: string | null
          data_collection_date: string | null
          disclaimer_label: string | null
          display_format: string | null
          entity_type: string | null
          event_end_timestamp: number | null
          event_location: string | null
          event_start_timestamp: number | null
          event_timezone: string | null
          evidence_file_path: string | null
          extra_links: string | null
          extra_texts: string | null
          facebook_ads_library_url: string | null
          fev_address: string | null
          fev_authorized_entity_text: string | null
          fev_email: string | null
          fev_phone: string | null
          fev_submitted_on: string | null
          fev_website: string | null
          finserv_is_deemed_finserv: boolean | null
          finserv_is_limited_delivery: boolean | null
          gated_type: string | null
          has_user_reported: boolean | null
          hide_data_status: string | null
          impressions: string | null
          impressions_index: number | null
          is_aaa_eligible: boolean | null
          is_active: boolean | null
          is_flagged: boolean | null
          landing_page_url: string | null
          last_updated: string | null
          last_violation_update: string | null
          link_discovery_method: string | null
          linked_broker_npn: string | null
          page_categories: string | null
          page_entity_type: string | null
          page_id: string | null
          page_is_deleted: boolean | null
          page_like_count: number | null
          page_name: string | null
          page_profile_picture_url: string | null
          page_profile_uri: string | null
          political_countries: string | null
          primary_image_resized_url: string | null
          primary_image_url: string | null
          publisher_platform: string | null
          reach_estimate: string | null
          report_count: number | null
          risk_level: string | null
          search_query_raw: string | null
          search_term_used: string | null
          search_terms: string | null
          snapshot_url: string | null
          spend: string | null
          state_media_run_label: string | null
          targeted_countries: string | null
          total_search_results: number | null
          tw_anti_scam_is_limited_delivery: boolean | null
          video_hd_url: string | null
          video_preview_image_url: string | null
          video_sd_url: string | null
          violation_detected_date: string | null
          violation_notes: string | null
          violation_tracking_number: string | null
          violation_types_detected: string | null
        }
        Insert: {
          ad_archive_id: string
          ad_body_text?: string | null
          ad_caption?: string | null
          ad_creative_video_url?: string | null
          ad_delivery_start_time?: number | null
          ad_delivery_stop_time?: number | null
          ad_id?: string | null
          ad_status?: string | null
          ad_title?: string | null
          additional_images?: string | null
          additional_videos?: string | null
          archive_types?: string | null
          brazil_tax_id?: string | null
          byline?: string | null
          cards_data?: string | null
          categories?: string | null
          collation_count?: number | null
          collation_id?: string | null
          compliance_score?: number | null
          compliance_status?: string | null
          contains_digital_created_media?: boolean | null
          contains_sensitive_content?: boolean | null
          country_iso_code?: string | null
          cta_text?: string | null
          cta_type?: string | null
          currency?: string | null
          data_collection_date?: string | null
          disclaimer_label?: string | null
          display_format?: string | null
          entity_type?: string | null
          event_end_timestamp?: number | null
          event_location?: string | null
          event_start_timestamp?: number | null
          event_timezone?: string | null
          evidence_file_path?: string | null
          extra_links?: string | null
          extra_texts?: string | null
          facebook_ads_library_url?: string | null
          fev_address?: string | null
          fev_authorized_entity_text?: string | null
          fev_email?: string | null
          fev_phone?: string | null
          fev_submitted_on?: string | null
          fev_website?: string | null
          finserv_is_deemed_finserv?: boolean | null
          finserv_is_limited_delivery?: boolean | null
          gated_type?: string | null
          has_user_reported?: boolean | null
          hide_data_status?: string | null
          impressions?: string | null
          impressions_index?: number | null
          is_aaa_eligible?: boolean | null
          is_active?: boolean | null
          is_flagged?: boolean | null
          landing_page_url?: string | null
          last_updated?: string | null
          last_violation_update?: string | null
          link_discovery_method?: string | null
          linked_broker_npn?: string | null
          page_categories?: string | null
          page_entity_type?: string | null
          page_id?: string | null
          page_is_deleted?: boolean | null
          page_like_count?: number | null
          page_name?: string | null
          page_profile_picture_url?: string | null
          page_profile_uri?: string | null
          political_countries?: string | null
          primary_image_resized_url?: string | null
          primary_image_url?: string | null
          publisher_platform?: string | null
          reach_estimate?: string | null
          report_count?: number | null
          risk_level?: string | null
          search_query_raw?: string | null
          search_term_used?: string | null
          search_terms?: string | null
          snapshot_url?: string | null
          spend?: string | null
          state_media_run_label?: string | null
          targeted_countries?: string | null
          total_search_results?: number | null
          tw_anti_scam_is_limited_delivery?: boolean | null
          video_hd_url?: string | null
          video_preview_image_url?: string | null
          video_sd_url?: string | null
          violation_detected_date?: string | null
          violation_notes?: string | null
          violation_tracking_number?: string | null
          violation_types_detected?: string | null
        }
        Update: {
          ad_archive_id?: string
          ad_body_text?: string | null
          ad_caption?: string | null
          ad_creative_video_url?: string | null
          ad_delivery_start_time?: number | null
          ad_delivery_stop_time?: number | null
          ad_id?: string | null
          ad_status?: string | null
          ad_title?: string | null
          additional_images?: string | null
          additional_videos?: string | null
          archive_types?: string | null
          brazil_tax_id?: string | null
          byline?: string | null
          cards_data?: string | null
          categories?: string | null
          collation_count?: number | null
          collation_id?: string | null
          compliance_score?: number | null
          compliance_status?: string | null
          contains_digital_created_media?: boolean | null
          contains_sensitive_content?: boolean | null
          country_iso_code?: string | null
          cta_text?: string | null
          cta_type?: string | null
          currency?: string | null
          data_collection_date?: string | null
          disclaimer_label?: string | null
          display_format?: string | null
          entity_type?: string | null
          event_end_timestamp?: number | null
          event_location?: string | null
          event_start_timestamp?: number | null
          event_timezone?: string | null
          evidence_file_path?: string | null
          extra_links?: string | null
          extra_texts?: string | null
          facebook_ads_library_url?: string | null
          fev_address?: string | null
          fev_authorized_entity_text?: string | null
          fev_email?: string | null
          fev_phone?: string | null
          fev_submitted_on?: string | null
          fev_website?: string | null
          finserv_is_deemed_finserv?: boolean | null
          finserv_is_limited_delivery?: boolean | null
          gated_type?: string | null
          has_user_reported?: boolean | null
          hide_data_status?: string | null
          impressions?: string | null
          impressions_index?: number | null
          is_aaa_eligible?: boolean | null
          is_active?: boolean | null
          is_flagged?: boolean | null
          landing_page_url?: string | null
          last_updated?: string | null
          last_violation_update?: string | null
          link_discovery_method?: string | null
          linked_broker_npn?: string | null
          page_categories?: string | null
          page_entity_type?: string | null
          page_id?: string | null
          page_is_deleted?: boolean | null
          page_like_count?: number | null
          page_name?: string | null
          page_profile_picture_url?: string | null
          page_profile_uri?: string | null
          political_countries?: string | null
          primary_image_resized_url?: string | null
          primary_image_url?: string | null
          publisher_platform?: string | null
          reach_estimate?: string | null
          report_count?: number | null
          risk_level?: string | null
          search_query_raw?: string | null
          search_term_used?: string | null
          search_terms?: string | null
          snapshot_url?: string | null
          spend?: string | null
          state_media_run_label?: string | null
          targeted_countries?: string | null
          total_search_results?: number | null
          tw_anti_scam_is_limited_delivery?: boolean | null
          video_hd_url?: string | null
          video_preview_image_url?: string | null
          video_sd_url?: string | null
          violation_detected_date?: string | null
          violation_notes?: string | null
          violation_tracking_number?: string | null
          violation_types_detected?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ads_broker_npn"
            columns: ["linked_broker_npn"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["npn"]
          },
        ]
      }
      brokers: {
        Row: {
          agency_address: string | null
          agency_email: string | null
          agency_name: string | null
          agency_owner_name: string | null
          agency_owner_npn: string | null
          agency_phone: string | null
          agency_website: string | null
          broker_name: string | null
          business_address: string | null
          compliance_score: number | null
          contact_info: string | null
          dcom_referrals: number | null
          email: string | null
          first_detected: string | null
          internal_notes: string | null
          investigation_status: string | null
          last_updated: string | null
          last_violation_date: string | null
          linked_facebook_pages: string | null
          marketplace_registration_status: string | null
          npn: string
          page_id: string | null
          phone: string | null
          registration_status: string | null
          total_ads_count: number | null
          total_violations: number | null
          website_url: string | null
        }
        Insert: {
          agency_address?: string | null
          agency_email?: string | null
          agency_name?: string | null
          agency_owner_name?: string | null
          agency_owner_npn?: string | null
          agency_phone?: string | null
          agency_website?: string | null
          broker_name?: string | null
          business_address?: string | null
          compliance_score?: number | null
          contact_info?: string | null
          dcom_referrals?: number | null
          email?: string | null
          first_detected?: string | null
          internal_notes?: string | null
          investigation_status?: string | null
          last_updated?: string | null
          last_violation_date?: string | null
          linked_facebook_pages?: string | null
          marketplace_registration_status?: string | null
          npn: string
          page_id?: string | null
          phone?: string | null
          registration_status?: string | null
          total_ads_count?: number | null
          total_violations?: number | null
          website_url?: string | null
        }
        Update: {
          agency_address?: string | null
          agency_email?: string | null
          agency_name?: string | null
          agency_owner_name?: string | null
          agency_owner_npn?: string | null
          agency_phone?: string | null
          agency_website?: string | null
          broker_name?: string | null
          business_address?: string | null
          compliance_score?: number | null
          contact_info?: string | null
          dcom_referrals?: number | null
          email?: string | null
          first_detected?: string | null
          internal_notes?: string | null
          investigation_status?: string | null
          last_updated?: string | null
          last_violation_date?: string | null
          linked_facebook_pages?: string | null
          marketplace_registration_status?: string | null
          npn?: string
          page_id?: string | null
          phone?: string | null
          registration_status?: string | null
          total_ads_count?: number | null
          total_violations?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      violations: {
        Row: {
          ad_archive_id: string | null
          ad_duration_days: number | null
          ad_end_date: string | null
          ad_publish_date: string | null
          ad_spend_amount: string | null
          additional_misleading_category: string | null
          additional_notes: string | null
          audience_size: string | null
          box_file_link: string | null
          broker_npn: string | null
          case_closed_date: string | null
          case_number: string | null
          created_at: string | null
          date_referred_to_dcom: string | null
          dcom_score: number | null
          description: string | null
          discovery_method: string | null
          dsseo_preliminary_score: number | null
          evidence_description: string | null
          evidence_screenshots: string | null
          evidence_video_path: string | null
          geographic_targets: string | null
          impressions_count: string | null
          internal_comments: string | null
          investigation_duration_days: number | null
          involves_fake_legislation: boolean | null
          involves_gift_card_schemes: boolean | null
          is_repeat_offender: boolean | null
          lead_investigator: string | null
          link_to_broker_method: string | null
          misleading_category: string | null
          misleading_justification: string | null
          notes_from_dcom: string | null
          outcome: string | null
          outreach_details: string | null
          platform: string | null
          redirect_links: string | null
          severity: string | null
          status: string | null
          tied_to_previous_violations: boolean | null
          tracking_score: number | null
          updated_at: string | null
          violation: string | null
          violation_discovered_date: string | null
          violation_id: number
          violation_type: string | null
        }
        Insert: {
          ad_archive_id?: string | null
          ad_duration_days?: number | null
          ad_end_date?: string | null
          ad_publish_date?: string | null
          ad_spend_amount?: string | null
          additional_misleading_category?: string | null
          additional_notes?: string | null
          audience_size?: string | null
          box_file_link?: string | null
          broker_npn?: string | null
          case_closed_date?: string | null
          case_number?: string | null
          created_at?: string | null
          date_referred_to_dcom?: string | null
          dcom_score?: number | null
          description?: string | null
          discovery_method?: string | null
          dsseo_preliminary_score?: number | null
          evidence_description?: string | null
          evidence_screenshots?: string | null
          evidence_video_path?: string | null
          geographic_targets?: string | null
          impressions_count?: string | null
          internal_comments?: string | null
          investigation_duration_days?: number | null
          involves_fake_legislation?: boolean | null
          involves_gift_card_schemes?: boolean | null
          is_repeat_offender?: boolean | null
          lead_investigator?: string | null
          link_to_broker_method?: string | null
          misleading_category?: string | null
          misleading_justification?: string | null
          notes_from_dcom?: string | null
          outcome?: string | null
          outreach_details?: string | null
          platform?: string | null
          redirect_links?: string | null
          severity?: string | null
          status?: string | null
          tied_to_previous_violations?: boolean | null
          tracking_score?: number | null
          updated_at?: string | null
          violation?: string | null
          violation_discovered_date?: string | null
          violation_id?: number
          violation_type?: string | null
        }
        Update: {
          ad_archive_id?: string | null
          ad_duration_days?: number | null
          ad_end_date?: string | null
          ad_publish_date?: string | null
          ad_spend_amount?: string | null
          additional_misleading_category?: string | null
          additional_notes?: string | null
          audience_size?: string | null
          box_file_link?: string | null
          broker_npn?: string | null
          case_closed_date?: string | null
          case_number?: string | null
          created_at?: string | null
          date_referred_to_dcom?: string | null
          dcom_score?: number | null
          description?: string | null
          discovery_method?: string | null
          dsseo_preliminary_score?: number | null
          evidence_description?: string | null
          evidence_screenshots?: string | null
          evidence_video_path?: string | null
          geographic_targets?: string | null
          impressions_count?: string | null
          internal_comments?: string | null
          investigation_duration_days?: number | null
          involves_fake_legislation?: boolean | null
          involves_gift_card_schemes?: boolean | null
          is_repeat_offender?: boolean | null
          lead_investigator?: string | null
          link_to_broker_method?: string | null
          misleading_category?: string | null
          misleading_justification?: string | null
          notes_from_dcom?: string | null
          outcome?: string | null
          outreach_details?: string | null
          platform?: string | null
          redirect_links?: string | null
          severity?: string | null
          status?: string | null
          tied_to_previous_violations?: boolean | null
          tracking_score?: number | null
          updated_at?: string | null
          violation?: string | null
          violation_discovered_date?: string | null
          violation_id?: number
          violation_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_violations_ad_archive_id"
            columns: ["ad_archive_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["ad_archive_id"]
          },
          {
            foreignKeyName: "fk_violations_broker_npn"
            columns: ["broker_npn"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["npn"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
