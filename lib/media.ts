import { backendOrigin } from "./backend";

/**
 * Resolve a media path returned by the API to an absolute URL.
 * - Absolute URLs (http/https) and data URIs are returned untouched.
 * - Stored upload paths (e.g. "blog/photo.jpg") are prefixed with the
 *   backend origin + /storage so the front (different origin) can load them.
 */
export function mediaUrl(path?: string | null): string {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const clean = path.replace(/^\/?storage\//, "").replace(/^\//, "");
  return `${backendOrigin()}/storage/${clean}`;
}
