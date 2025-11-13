export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      family_members: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          maiden_name: string | null
          birth_date: string | null
          death_date: string | null
          gender: 'male' | 'female' | 'other' | null
          photo_url: string | null
          bio: string | null
          birth_place: string | null
          death_place: string | null
          occupation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          maiden_name?: string | null
          birth_date?: string | null
          death_date?: string | null
          gender?: 'male' | 'female' | 'other' | null
          photo_url?: string | null
          bio?: string | null
          birth_place?: string | null
          death_place?: string | null
          occupation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          maiden_name?: string | null
          birth_date?: string | null
          death_date?: string | null
          gender?: 'male' | 'female' | 'other' | null
          photo_url?: string | null
          bio?: string | null
          birth_place?: string | null
          death_place?: string | null
          occupation?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      relationships: {
        Row: {
          id: string
          user_id: string
          member_id: string
          related_member_id: string
          relationship_type: 'parent' | 'spouse' | 'sibling' | 'child'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          member_id: string
          related_member_id: string
          relationship_type: 'parent' | 'spouse' | 'sibling' | 'child'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          member_id?: string
          related_member_id?: string
          relationship_type?: 'parent' | 'spouse' | 'sibling' | 'child'
          created_at?: string
        }
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
  }
}

