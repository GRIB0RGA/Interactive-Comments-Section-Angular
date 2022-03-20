import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get<T>(key: string): T | null {
    const storageObj = localStorage.getItem(key);
    if (storageObj) {
      return JSON.parse(storageObj);
    }
    return null;
  }

  set<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
