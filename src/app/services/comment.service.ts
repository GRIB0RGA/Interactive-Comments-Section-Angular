import { Injectable } from '@angular/core';
import { Comment, User } from '../interfaces/comment.model';
import { StorageService } from './storage.service';
import { default as data } from '/src/data.json';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private storageService: StorageService) {}

  commentsArr =
    this.storageService.get() === null
      ? data.comments
      : this.storageService.get();

  getCurrentUser(): User {
    return data.currentUser;
  }

  // deleteComment(id: number) {
  //   const filteredLevelOne = this.getComments().filter(
  //     (comment) => comment.id !== id
  //   );
  // }

  postComment(
    id: number,
    contentText: string,
    createdAt: any,
    username: string,
    image: string
  ) {
    const newComment = {
      id: id,
      content: contentText,
      createdAt: createdAt,
      score: 0,
      user: {
        image: {
          webp: image,
        },
        username: username,
      },
      replies: [],
    };


    const x = this.commentsArr;
    x.push(newComment)
    console.log(x);
    

    const updatedStorage = this.commentsArr.push(newComment);
    console.log(updatedStorage.push(`123`));
    
    // this.storageService.set(updatedStorage);
  }

  updateComment() {}
}
