import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private readonly content = inject(ContentService);
  protected readonly site = this.content.site;
  protected readonly open = signal(false);

  protected readonly links = computed(() => {
    const categories = this.content.categories();
    if (!categories) return [
      { path: '/about', label: 'About' },
      { path: '/contact', label: 'Contact' },
    ];

    const categoryLinks = categories.order.map((key) => ({
      path: `/${categories.categories[key].path}`,
      label: categories.categories[key].label
    }));

    return [
      ...categoryLinks,
      { path: '/about', label: 'About' },
      { path: '/contact', label: 'Contact' },
    ];
  });

  constructor() {
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.open.set(false));
  }
}
