import { Component, computed, effect, inject, input, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ImageMedia } from '../../core/models/content.model';
import { ContentService } from '../../core/services/content.service';
import { toParagraphs } from '../../core/utils/media';
import { MediaPipe } from '../../core/utils/media.pipe';
import { Lightbox } from '../../shared/lightbox/lightbox';
import { VideoEmbed } from '../../shared/video-embed/video-embed';

@Component({
  selector: 'app-work-detail',
  imports: [RouterLink, MediaPipe, Lightbox, VideoEmbed],
  templateUrl: './work-detail.html',
  styleUrl: './work-detail.scss',
})
export class WorkDetailPage {
  readonly categoryPath = input.required<string>();
  readonly slug = input.required<string>();

  private readonly content = inject(ContentService);
  private readonly router = inject(Router);
  private readonly lightbox = viewChild(Lightbox);

  /** Find category key by path */
  private readonly categoryKey = computed(() => {
    const categories = this.content.categories();
    if (!categories) return null;

    const path = this.categoryPath();
    return Object.keys(categories.categories).find(
      key => categories.categories[key].path === path
    );
  });

  protected readonly section = computed(() => {
    const categories = this.content.categories();
    const key = this.categoryKey();
    return key && categories ? categories.categories[key] : null;
  });

  protected readonly loaded = computed(() => this.content.works() !== undefined);

  private readonly list = computed(() => {
    const key = this.categoryKey();
    return key ? (this.content.works() ?? []).filter((w) => w.category === key) : [];
  });

  private readonly index = computed(() => this.list().findIndex((w) => w.slug === this.slug()));

  protected readonly work = computed(() => this.list()[this.index()]);
  protected readonly prev = computed(() => (this.index() > 0 ? this.list()[this.index() - 1] : undefined));
  protected readonly next = computed(() => {
    const i = this.index();
    return i >= 0 && i < this.list().length - 1 ? this.list()[i + 1] : undefined;
  });

  protected readonly paragraphs = computed(() => toParagraphs(this.work()?.description));
  protected readonly images = computed(() =>
    (this.work()?.media ?? []).filter((m): m is ImageMedia => m.type === 'image'),
  );

  protected zoom(image: ImageMedia): void {
    this.lightbox()?.open(this.images().indexOf(image));
  }

  constructor() {
    // Redirect to 404 if category doesn't exist
    effect(() => {
      if (this.content.categories() && !this.categoryKey()) {
        this.router.navigate(['/404']);
      }
    });
  }
}
