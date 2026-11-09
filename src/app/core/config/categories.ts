export interface CategoryConfig {
  /** URL segment: /category-1, /photography… */
  path: string;
  /** Display name in menus and titles */
  label: string;
  /** Thumbnail aspect ratio in gallery (CSS aspect-ratio) */
  ratio: string;
}

/**
 * Default fallback values if categories.json cannot be loaded.
 * In production, these values are loaded from the JSON file.
 */
export const DEFAULT_CATEGORIES: Record<string, CategoryConfig> = {
  category1: { path: 'category-1', label: 'Category One', ratio: '4 / 5' },
  category2: { path: 'category-2', label: 'Category Two', ratio: '4 / 3' },
  category3: { path: 'category-3', label: 'Category Three', ratio: '16 / 9' },
};

export const DEFAULT_CATEGORY_ORDER: string[] = ['category1', 'category2', 'category3'];

// Legacy exports (deprecated, use ContentService instead)
export const CATEGORIES = DEFAULT_CATEGORIES;
export const CATEGORY_ORDER = DEFAULT_CATEGORY_ORDER;
