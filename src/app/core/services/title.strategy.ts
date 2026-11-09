import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResolveFn, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { map, take } from 'rxjs';
import { ContentService } from './content.service';

/** "Page | Name" in the tab title; on the homepage, just the name. */
@Injectable({ providedIn: 'root' })
export class PortfolioTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly content = inject(ContentService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const page = this.buildTitle(snapshot);
    this.content.site$.pipe(take(1)).subscribe(({ name }) => {
      this.title.setTitle([page, name].filter(Boolean).join(' | '));
    });
  }
}

/** Tab title on an individual work page. */
export const workTitle: ResolveFn<string> = (route) =>
  inject(ContentService).works$.pipe(
    take(1),
    map((works) => works.find((w) => w.slug === route.paramMap.get('slug'))?.title ?? 'Work not found'),
  );
