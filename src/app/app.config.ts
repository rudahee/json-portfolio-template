import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  TitleStrategy,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { PortfolioTitleStrategy } from './core/services/title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      // Route params, data and query params are passed to pages as input().
      withComponentInputBinding(),
      // Every page starts at the top; coming back restores the scroll position.
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      // Native transition between pages (disabled by "reduced motion").
      withViewTransitions(),
    ),
    { provide: TitleStrategy, useClass: PortfolioTitleStrategy },
  ],
};
