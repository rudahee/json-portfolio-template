import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentService } from './core/services/content.service';
import { Footer } from './shared/footer/footer';
import { Nav } from './shared/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly content = inject(ContentService);

  constructor() {
    // El color de acento se puede cambiar desde site.json sin tocar estilos.
    effect(() => {
      const theme = this.content.site()?.theme;
      const root = document.documentElement.style;
      if (theme?.accent) root.setProperty('--accent-light', theme.accent);
      if (theme?.accentDark) root.setProperty('--accent-dark', theme.accentDark);
    });
  }
}
