/**
 * Ręcznie utrzymywane typy odzwierciedlające schemat z supabase/migrations.
 * Po pierwszym połączeniu z realnym projektem Supabase można je zastąpić
 * wygenerowanymi (`supabase gen types typescript`).
 */

export type ProjectCategory =
  | "kuchnie"
  | "szafy"
  | "sypialnie"
  | "salony"
  | "lazienki"
  | "przedpokoje"
  | "biura"
  | "inne";

export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: ProjectCategory;
  location: string | null;
  cover_image_path: string | null;
  published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type ProjectImageRow = {
  id: string;
  project_id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
};

export type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_path: string | null;
  published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PromotionRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image_path: string | null;
  active: boolean;
  valid_from: string | null;
  valid_until: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminUserRow = {
  user_id: string;
  created_at: string;
};

export type ContactSubmissionRow = {
  id: string;
  name: string;
  contact_method: string;
  interest: string;
  message: string;
  email_delivered: boolean;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: AdminUserRow;
        Insert: AdminUserRow;
        Update: Partial<AdminUserRow>;
        Relationships: [];
      };
      contact_submissions: {
        Row: ContactSubmissionRow;
        Insert: Partial<ContactSubmissionRow> & {
          name: string;
          contact_method: string;
          interest: string;
          message: string;
        };
        Update: Partial<ContactSubmissionRow>;
        Relationships: [];
      };
      projects: {
        Row: ProjectRow;
        Insert: Partial<ProjectRow> & { title: string; slug: string; category: ProjectCategory };
        Update: Partial<ProjectRow>;
        Relationships: [];
      };
      project_images: {
        Row: ProjectImageRow;
        Insert: Partial<ProjectImageRow> & { project_id: string; storage_path: string };
        Update: Partial<ProjectImageRow>;
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: PostRow;
        Insert: Partial<PostRow> & { title: string; slug: string; content: string };
        Update: Partial<PostRow>;
        Relationships: [];
      };
      promotions: {
        Row: PromotionRow;
        Insert: Partial<PromotionRow> & { title: string; slug: string; description: string };
        Update: Partial<PromotionRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
