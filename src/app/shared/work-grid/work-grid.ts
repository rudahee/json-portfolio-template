import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Work } from '../../core/models/content.model';
import { ContentService } from '../../core/services/content.service';
import { MediaPipe } from '../../core/utils/media.pipe';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

@Component({
  selector: 'app-work-grid',
  imports: [RouterLink, MediaPipe],
  templateUrl: './work-grid.html',
  styleUrl: './work-grid.scss',
})
export class WorkGrid {
  readonly works = input.required<Work[]>();
  /** Force a specific ratio; if null, use category's default ratio */
  readonly ratio = input<string | null>(null);
  /** How many thumbnails to load eagerly (visible on page load) */
  readonly eager = input(0);

  private readonly content = inject(ContentService);

  protected link(work: Work): string[] {
    const categories = this.content.categories();
    if (!categories) return ['/'];

    const config = categories.categories[work.category];
    return config ? ['/', config.path, work.slug] : ['/'];
  }

  protected ratioOf(work: Work): string {
    const forcedRatio = this.ratio();
    if (forcedRatio) return forcedRatio;

    const categories = this.content.categories();
    if (!categories) return '1 / 1';

    const config = categories.categories[work.category];
    return config?.ratio ?? '1 / 1';
  }

  /** Play preview clip (if available) on hover */
  protected preview(event: Event, play: boolean): void {
    const video = (event.currentTarget as HTMLElement).querySelector('video');
    if (!video || reducedMotion()) return;
    if (play) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }
}
