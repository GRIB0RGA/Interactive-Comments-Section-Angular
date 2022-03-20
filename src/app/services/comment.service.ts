import { Injectable } from '@angular/core';
import { Comment, Replay, User } from '../interfaces/comment.model';
import { StorageService } from './storage.service';
import { default as data } from '/src/data.json';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private storageService: StorageService) {}

  //! Starting Functions Start \\\

  STORAGE_KEY = `comments`;
  ID_KEY = 'idKey';
  commentsArr =
    this.storageService.get(this.STORAGE_KEY) === null
      ? data.comments
      : this.storageService.get(this.STORAGE_KEY);

  maxID = this.getMaxId(this.commentsArr);

  getCurrentUser(): User {
    return data.currentUser;
  }
  //! Starting Functions END \\\

  //! POST COMMENT \\\
  //prettier-ignore
  postComment(contentText: string,username: string,image: string):void {
    const newComment: Comment = {
      id: this.getMaxIdFromStorage() + 1,
      animationStatus: true,
      scoreStatus: 0,
      content: contentText,
      createdAt: Date.now(),
      score: 0,
      user: {
        image: {
          webp: image,
        },
        username: username,
      },
      replies: [],
    };

    this.commentsArr.push(newComment);
    this.storageService.set(this.STORAGE_KEY,this.commentsArr);
    this.storageService.set(this.ID_KEY, this.getMaxIdFromStorage() + 1);
  }

  //! DELETE \\\
  deleteComment(id: number): void {
    //prettier-ignore
    const filteredComments = this.commentsArr.find(
      (comment: Comment) => comment.id === id
    );

    //? Delete from comments
    if (filteredComments) {
      this.commentsArr.splice(this.commentsArr.indexOf(filteredComments), 1);
    }

    //? Delete from replays
    this.commentsArr.forEach((comment: Comment) => {
      //prettier-ignore
      const filteredReplays = comment.replies.filter((replay: any) => replay.id !== id);
      if (comment.replies.length > filteredReplays.length) {
        comment.replies = filteredReplays;
      }
    });

    this.storageService.set(this.STORAGE_KEY, this.commentsArr);
  }

  //! UPDATE/EDIT \\\

  updateComment(id: number, content: string): void {
    this.findWithId(id, this.commentsArr).content = content;
    this.storageService.set(this.STORAGE_KEY, this.commentsArr);
  }

  //! Replay \\\

  postReplay(id: number, replayToUsername: string, contentText: string): void {
    const replayToPush: Replay = {
      id: this.getMaxIdFromStorage() + 1,
      animationStatus: true,
      scoreStatus: 0,
      content: contentText,
      createdAt: Date.now(),
      score: 0,
      replyingTo: replayToUsername,
      user: {
        image: {
          webp: this.getCurrentUser().image.webp,
        },
        username: this.getCurrentUser().username,
      },
    };

    //? check if replayTo is comment or replay
    if (this.findWithId(id, this.commentsArr).replies) {
      this.findWithId(id, this.commentsArr).replies.push(replayToPush);
    } else {
      //? if replayTo is replay push replay object into it`s parent
      this.commentsArr.forEach((comment: any) => {
        //prettier-ignore
        const parentComment = comment.replies.includes(this.findWithId(id, this.commentsArr));
        if (parentComment) {
          comment.replies.push(replayToPush);
        }
      });
    }

    this.storageService.set(this.STORAGE_KEY, this.commentsArr);
    this.storageService.set(this.ID_KEY, this.getMaxIdFromStorage() + 1);
  }

  //! SCORE \\\

  updateScore(id: number, score: number): void {
    this.findWithId(id, this.commentsArr).score = score;
    this.sortByScore();
    this.storageService.set(this.STORAGE_KEY, this.commentsArr);
  }

  sortByScore(): void {
    this.commentsArr.sort((a: any, b: any) => b.score - a.score);
    this.commentsArr.forEach((comment: any) =>
      comment.replies.sort((a: any, b: any) => b.score - a.score)
    );
  }

  //? HELPERS \\
  //! HELPERS \\
  //* HELPERS \\
  getMaxId(comArr: any): number {
    let maxId = 0;
    comArr.forEach((comment: any): any => {
      if (comment.replies?.length > 0) {
        maxId = this.getMaxId(comment.replies);
      }
      if (comment.id > maxId) {
        maxId = comment.id;
      }
    });

    return maxId;
  }

  getMaxIdFromStorage(): number {
    return this.storageService.get(this.ID_KEY) as number;
  }

  findWithId(id: number, arr: any): Comment {
    const level1 = arr.find((comment: any) => comment.id === id);

    if (!level1) {
      let level2;
      arr.forEach((comment: any) =>
        comment.replies.find((replay: any) => {
          if (replay.id === id) level2 = replay;
        })
      );
      if (level2) {
        return level2;
      }
    }

    return level1;
  }
}
