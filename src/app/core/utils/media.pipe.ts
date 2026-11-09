import { Pipe, PipeTransform } from '@angular/core';
import { mediaUrl } from './media';

@Pipe({ name: 'media' })
export class MediaPipe implements PipeTransform {
  transform(src?: string | null): string {
    return mediaUrl(src);
  }
}
