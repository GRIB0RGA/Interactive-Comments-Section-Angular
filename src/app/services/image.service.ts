import { Injectable } from '@angular/core';
import { User } from '../interfaces/comment.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  getCurrentUserImagePath(currentUserObj: User): string {
    //prettier-ignore
    return `./assets${currentUserObj.image.webp.slice(1)}`;
  }
}
