import { supabaseUrl } from "./env";

export const PROJECT_IMAGES_BUCKET = "project-images";
export const SITE_IMAGES_BUCKET = "site-images";

export function getPublicStorageUrl(bucket: string, path: string | null | undefined) {
  if (!path || !supabaseUrl) return null;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
