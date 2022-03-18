import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  STORAGE_KEY: string = `comments`;
  get<T>(): T | null {
    const storageObj = localStorage.getItem(this.STORAGE_KEY);
    if (storageObj) {
      return JSON.parse(storageObj);
    }
    return null;
  }

  set<T>(data: T) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
}
