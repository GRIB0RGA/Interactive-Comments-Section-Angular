import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  getCurrentUserImagePath(currentUserObj: any) {
    //prettier-ignore
    return `./assets${currentUserObj.image.webp.slice(1)}`;
  }
}
