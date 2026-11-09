import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoMedia } from '../../core/models/content.model';
import { embedUrl } from '../../core/utils/media';
import { MediaPipe } from '../../core/utils/media.pipe';

const PROVIDER_NAMES: Record<VideoMedia['provider'], string> = {
  youtube: 'YouTube',
  vimeo: 'Vimeo',
  peertube: 'PeerTube',
  file: '',
};

/**
 * External players don't load until the visitor clicks: the page stays
 * fast and YouTube/Vimeo get no data from someone who's just browsing.
 */
@Component({
  selector: 'app-video-embed',
  imports: [MediaPipe],
  templateUrl: './video-embed.html',
  styleUrl: './video-embed.scss',
})
export class VideoEmbed {
  readonly video = input.required<VideoMedia>();
  readonly fallbackPoster = input<string>();
  readonly title = input('');

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly active = signal(false);

  protected readonly src = computed(() => {
    const url = embedUrl(this.video());
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });
  protected readonly poster = computed(() => this.video().poster || this.fallbackPoster() || null);
  protected readonly provider = computed(() => PROVIDER_NAMES[this.video().provider]);
}
