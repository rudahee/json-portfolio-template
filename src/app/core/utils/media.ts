import { API_CONFIG } from '../config/api.config';
import { VideoMedia } from '../models/content.model';

const ABSOLUTE = /^(?:[a-z]+:)?\/\/|^\/|^data:/i;
const HOSTNAME = /^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;

/** Convierte una ruta del JSON en URL servible. */
export function mediaUrl(src?: string | null): string {
  if (!src) return '';
  return ABSOLUTE.test(src) ? src : `${API_CONFIG.mediaBase}/${src.replace(/^\.?\//, '')}`;
}

/**
 * URL de reproductor embebido. Solo se construye a partir de proveedor + id,
 * nunca con una URL arbitraria del JSON, para que el iframe sea seguro.
 */
export function embedUrl(video: VideoMedia): string | null {
  if (!video.id) return null;
  const id = encodeURIComponent(video.id);
  switch (video.provider) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${id}?dnt=1&autoplay=1`;
    case 'peertube':
      return video.host && HOSTNAME.test(video.host)
        ? `https://${video.host}/videos/embed/${id}?autoplay=1`
        : null;
    default:
      return null;
  }
}

export function toParagraphs(text?: string | string[]): string[] {
  if (!text) return [];
  return Array.isArray(text) ? text : text.split(/\n\s*\n/);
}
