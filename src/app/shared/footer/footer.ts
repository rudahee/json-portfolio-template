import { Component, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly site = inject(ContentService).site;
  protected readonly year = new Date().getFullYear();
}
