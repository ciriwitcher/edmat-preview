import type { StaticImageData } from "next/image";
import type { ProjectCategory } from "@/lib/supabase/database.types";

export type PatternVariant = "slats-horizontal" | "slats-vertical" | "pleated" | "mesh" | "roller";

export type ServicePageContent = {
  slug: string;
  parentLabel: string;
  parentHref: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  heroImage?: StaticImageData;
  heroImageAlt?: string;
  heroPattern?: PatternVariant;
  applications: string[];
  variants: { title: string; description: string }[];
  advantages: { title: string; description: string }[];
  process?: { title: string; description: string }[];
  materials?: string[];
  faq: { question: string; answer: string }[];
  relatedServices: { label: string; href: string }[];
  relatedProjectsCategory?: ProjectCategory;
};
