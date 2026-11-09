import { Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { WorkGrid } from '../../shared/work-grid/work-grid';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink, WorkGrid],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class GalleryPage {
  /** Category path from URL (e.g., "category-1", "photography") */
  readonly categoryPath = input.required<string>();
  /** Tag filter from query params (?tag=) */
  readonly tag = input<string>();

  private readonly content = inject(ContentService);
  private readonly router = inject(Router);

  /** Find category key by path */
  private readonly categoryKey = computed(() => {
    const categories = this.content.categories();
    if (!categories) return null;

    const path = this.categoryPath();
    return Object.keys(categories.categories).find(
      key => categories.categories[key].path === path
    );
  });

  protected readonly config = computed(() => {
    const categories = this.content.categories();
    const key = this.categoryKey();
    return key && categories ? categories.categories[key] : null;
  });

  protected readonly description = computed(() => {
    const key = this.categoryKey();
    return key ? this.content.site()?.disciplines?.[key]?.description : undefined;
  });

  protected readonly loaded = computed(() => this.content.works() !== undefined);

  private readonly all = computed(() => {
    const key = this.categoryKey();
    return key ? (this.content.works() ?? []).filter((w) => w.category === key) : [];
  });

  protected readonly tags = computed(() => [...new Set(this.all().flatMap((w) => w.tags ?? []))]);

  protected readonly shown = computed(() => {
    const tag = this.tag();
    return tag ? this.all().filter((w) => w.tags?.includes(tag)) : this.all();
  });

  constructor() {
    // Redirect to 404 if category doesn't exist
    effect(() => {
      if (this.content.categories() && !this.categoryKey()) {
        this.router.navigate(['/404']);
      }
    });
  }
}
