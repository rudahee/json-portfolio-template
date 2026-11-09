import { inject } from '@angular/core';
import { UrlSegment, UrlMatchResult, Route } from '@angular/router';
import { ContentService } from './content.service';

/**
 * Dynamic matcher for category routes.
 * Validates that the path matches a category that exists in categories.json
 */
export function categoryMatcher(segments: UrlSegment[], group: any, route: Route): UrlMatchResult | null {
  if (segments.length === 0) return null;

  const categoryPath = segments[0].path;

  // Static routes that are NOT categories
  if (['sobre-mi', 'about', 'contacto', 'contact'].includes(categoryPath)) {
    return null;
  }

  // Category gallery: /category-1
  if (segments.length === 1) {
    return {
      consumed: segments,
      posParams: {
        categoryPath: segments[0]
      }
    };
  }

  // Work detail: /category-1/project-slug
  if (segments.length === 2) {
    return {
      consumed: segments,
      posParams: {
        categoryPath: segments[0],
        slug: segments[1]
      }
    };
  }

  return null;
}

/**
 * Guard to validate that the category exists in categories.json
 */
export function categoryGuard(): boolean {
  const content = inject(ContentService);
  // TODO: Implement validation once categories are loaded
  return true;
}
