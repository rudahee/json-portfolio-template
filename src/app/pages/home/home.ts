import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageMedia, Work } from '../../core/models/content.model';
import { ContentService } from '../../core/services/content.service';
import { MediaPipe } from '../../core/utils/media.pipe';
import { WorkGrid } from '../../shared/work-grid/work-grid';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MediaPipe, WorkGrid],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  private readonly content = inject(ContentService);
  protected readonly site = this.content.site;
  private readonly works = computed(() => this.content.works() ?? []);
  private readonly categoriesData = computed(() => this.content.categories());

  /** Each word of the name on its own line */
  protected readonly nameLines = computed(() => (this.site()?.name ?? '').split(/\s+/).filter(Boolean));

  /** Hero work: the one specified in site.json, or the first featured one */
  protected readonly hero = computed<Work | undefined>(() => {
    const works = this.works();
    return works.find((w) => w.slug === this.site()?.heroWork) ?? works.find((w) => w.featured) ?? works[0];
  });

  /** On homepage, show the full image, not the cropped thumbnail */
  protected readonly heroImage = computed(() => {
    const hero = this.hero();
    const first = hero?.media.find((m): m is ImageMedia => m.type === 'image');
    return first ?? (hero ? { type: 'image' as const, src: hero.cover } : undefined);
  });

  protected readonly disciplines = computed(() => {
    const categories = this.categoriesData();
    if (!categories) return [];

    return categories.order.map((categoryKey) => {
      const config = categories.categories[categoryKey];
      const list = this.works().filter((w) => w.category === categoryKey);
      const custom = this.site()?.disciplines?.[categoryKey];

      return {
        categoryKey,
        ...config,
        description: custom?.description,
        cover: custom?.cover ?? (list.find((w) => w.featured) ?? list[0])?.cover,
        count: list.length,
      };
    }).filter((d) => d.count > 0);
  });

  protected readonly selection = computed(() =>
    this.works()
      .filter((w) => w.featured && w.slug !== this.hero()?.slug)
      .slice(0, 6),
  );

  protected pathOf(work: Work): string[] {
    const categories = this.categoriesData();
    if (!categories) return ['/'];

    const config = categories.categories[work.category];
    return config ? ['/', config.path, work.slug] : ['/'];
  }
}
