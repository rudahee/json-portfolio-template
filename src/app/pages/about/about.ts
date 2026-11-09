import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { MediaPipe } from '../../core/utils/media.pipe';

@Component({
  selector: 'app-about',
  imports: [MediaPipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutPage {
  protected readonly site = inject(ContentService).site;
  protected readonly about = computed(() => this.site()?.about);
}
