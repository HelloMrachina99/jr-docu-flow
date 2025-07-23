import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bikpiaqgryrwnzheimgf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpa3BpYXFncnlyd256aGVpbWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MTg0OTQsImV4cCI6MjA1MzA5NDQ5NH0.6Oj7vI6KFfHUV32j0vqHGdRw1s_OWQWkJqCL5JDgVBA'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          user_type: 'admin' | 'member'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          user_type?: 'admin' | 'member'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          user_type?: 'admin' | 'member'
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          description: string
          category: 'Treinamento' | 'Projetos' | 'Administrativo'
          drive_link: string
          author_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'Treinamento' | 'Projetos' | 'Administrativo'
          drive_link: string
          author_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'Treinamento' | 'Projetos' | 'Administrativo'
          drive_link?: string
          author_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}