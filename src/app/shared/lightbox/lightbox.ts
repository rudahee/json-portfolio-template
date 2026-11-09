import { Component, ElementRef, computed, input, signal, viewChild } from '@angular/core';
import { ImageMedia } from '../../core/models/content.model';
import { MediaPipe } from '../../core/utils/media.pipe';

/** Visor a pantalla completa con <dialog> nativo: Esc cierra, flechas navegan. */
@Component({
  selector: 'app-lightbox',
  imports: [MediaPipe],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
})
export class Lightbox {
  readonly images = input.required<ImageMedia[]>();
  readonly title = input('');

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  protected readonly index = signal(0);
  protected readonly current = computed(() => this.images()[this.index()]);

  open(index: number): void {
    this.index.set(Math.max(0, index));
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected step(delta: number): void {
    const total = this.images().length;
    if (total < 2) return;
    this.index.set((this.index() + delta + total) % total);
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.step(1);
    if (event.key === 'ArrowLeft') this.step(-1);
  }

  /** Un clic fuera de la imagen cierra el visor. */
  protected onClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}
