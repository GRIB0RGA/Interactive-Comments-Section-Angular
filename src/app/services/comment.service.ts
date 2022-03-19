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
  commentsArr =
    this.storageService.get() === null
      ? data.comments
      : this.storageService.get();

  getCurrentUser(): User {
    return data.currentUser;
  }
  //! Starting Functions END \\\

  //! POST COMMENT \\\
  //prettier-ignore
  postComment(contentText: string,username: string,image: string):void {
    const newComment: Comment = {
      id: this.getMaxId(this.commentsArr) + 1,
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
    this.storageService.set(this.commentsArr);
  }

  //! DELETE \\\
  deleteComment(id: number): void {
    //prettier-ignore
    const filteredComments = this.commentsArr.find((comment: any) => comment.id === id);

    //? Delete from comments
    if (filteredComments) {
      this.commentsArr.splice(this.commentsArr.indexOf(filteredComments), 1);
    }

    //? Delete from replays
    this.commentsArr.forEach((comment: any) => {
      //prettier-ignore
      const filteredReplays = comment.replies.filter((replay: any) => replay.id !== id);
      if (comment.replies.length > filteredReplays.length) {
        comment.replies = filteredReplays;
      }
    });

    this.storageService.set(this.commentsArr);
  }

  //! UPDATE/EDIT \\\

  updateComment(id: number, content: string): void {
    this.findWithId(id, this.commentsArr).content = content;
    this.storageService.set(this.commentsArr);
  }

  //! Replay \\\

  postReplay(id: number, replayToUsername: string, contentText: string): void {
    const replayToPush: Replay = {
      id: this.getMaxId(this.commentsArr) + 1,
      content: contentText,
      createdAt: `dges`,
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

    this.storageService.set(this.commentsArr);
  }

  //! SCORE \\\

  updateScore(id: number, score: number): void {
    this.findWithId(id, this.commentsArr).score = score;
    this.storageService.set(this.commentsArr);
  }

  //? HELPERS \\
  //! HELPERS \\
  //* HELPERS \\
  getMaxId(comArr: any): number {
    let maxId = 0;
    comArr.forEach((comment: any): any => {
      if (comment.id > maxId) {
        maxId = comment.id;
      }
      if (comment.replies?.length > 0) {
        maxId = this.getMaxId(comment.replies);
      }
    });

    return maxId;
  }

  findWithId(id: number, arr?: any): Comment {
    let currentObject!: Comment;
    //? check if any of the comments has that id
    for (let comment of arr) {
      if (comment.id === id) {
        currentObject = comment;
        break;
      }
      //? check if any of the replays has that id
      if (comment.replies?.length > 0) {
        currentObject = this.findWithId(id, comment.replies);
      }
    }
    return currentObject;
  }
}
