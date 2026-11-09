import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, map, of, shareReplay, timeout } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { SiteData, WorksData } from '../models/content.model';
import { CategoryConfig } from '../config/categories';

/** If everything fails, the site still stands on bare minimum defaults. */
const EMPTY_SITE: SiteData = { name: '', role: '', intro: '', email: '', socials: [] };

export interface CategoriesData {
  categories: Record<string, CategoryConfig>;
  order: string[];
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  readonly site$ = this.load<SiteData>('site.json', EMPTY_SITE).pipe(shareReplay(1));

  readonly works$ = this.load<WorksData>('works.json', { works: [] }).pipe(
    map((data) => data.works ?? []),
    shareReplay(1),
  );

  readonly categories$ = this.load<CategoriesData>('categories.json', {
    categories: {},
    order: [],
  }).pipe(shareReplay(1));

  /** undefined while loading. */
  readonly site = toSignal(this.site$);
  readonly works = toSignal(this.works$);
  readonly categories = toSignal(this.categories$);

  /** Remote → local copy → empty value. */
  private load<T>(file: string, empty: T): Observable<T> {
    const local = this.http
      .get<T>(`${API_CONFIG.localData}/${file}`)
      .pipe(catchError(() => of(empty)));

    if (!API_CONFIG.remoteData) return local;

    return this.http.get<T>(`${API_CONFIG.remoteData}/${file}`).pipe(
      timeout(API_CONFIG.timeoutMs),
      catchError(() => local),
    );
  }
}
