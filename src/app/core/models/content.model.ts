export type Category = string;

export interface ImageMedia {
  type: 'image';
  /** Path relative to media/ (or absolute URL). */
  src: string;
  /** Higher-resolution version for the full-screen viewer (optional). */
  full?: string;
  alt?: string;
  caption?: string;
  /** Actual dimensions: avoid layout shifts while loading. */
  w?: number;
  h?: number;
}

export interface VideoMedia {
  type: 'video';
  provider: 'youtube' | 'vimeo' | 'peertube' | 'file';
  /** youtube / vimeo / peertube: video id. */
  id?: string;
  /** peertube: instance domain, e.g. "tube.example.org". */
  host?: string;
  /** file: path to an .mp4 or .webm served by the site itself. */
  src?: string;
  poster?: string;
  title?: string;
  caption?: string;
}

export type Media = ImageMedia | VideoMedia;

export interface Work {
  slug: string;
  category: string;
  title: string;
  year?: number;
  /** Thumbnail for galleries. */
  cover: string;
  /** Thumbnail focal point (CSS object-position), e.g. "50% 20%". */
  coverPosition?: string;
  /** Short, silent, looping clip played on hover (animation). */
  preview?: string;
  summary?: string;
  /** A single string or a list of paragraphs. */
  description?: string | string[];
  client?: string;
  role?: string;
  tools?: string[];
  tags?: string[];
  featured?: boolean;
  media: Media[];
}

export interface WorksData {
  works: Work[];
}

export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface Experience {
  period: string;
  role: string;
  org?: string;
}

export interface SiteData {
  name: string;
  role: string;
  intro: string;
  email: string;
  location?: string;
  /** slug of the work shown on the homepage hero. */
  heroWork?: string;
  theme?: { accent?: string; accentDark?: string };
  commissions?: { open: boolean; note?: string };
  contactNote?: string;
  disciplines?: Record<string, { description?: string; cover?: string }>;
  about?: {
    portrait?: string;
    bio: string[];
    tools?: string[];
    experience?: Experience[];
    cv?: string;
  };
  socials: SocialLink[];
  sourceUrl?: string;
}
