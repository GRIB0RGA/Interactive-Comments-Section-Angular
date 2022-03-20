import { Component, OnInit } from '@angular/core';
import { CommentingTypes } from 'src/app/enums/commentEnums';
import { CommentService } from 'src/app/services/comment.service';
import { StorageService } from 'src/app/services/storage.service';
import { Comment } from '../../interfaces/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  commentingTypes = CommentingTypes;

  constructor(
    private commentService: CommentService,
    private storageService: StorageService
  ) {}

  comments!: Comment[];

  ngOnInit(): void {
    this.disableAnimation();
    this.comments = this.commentService.commentsArr;

    //? Update storage on start
    this.storageService.set(this.commentService.STORAGE_KEY, this.comments);
    //prettier-ignore
    this.storageService.set(this.commentService.ID_KEY,this.commentService.maxID);
  }

  disableAnimation() {
    this.commentService.commentsArr.forEach((comment: any) => {
      comment.animationStatus = false;
      comment.replies.forEach(
        (replay: any) => (replay.animationStatus = false)
      );
    });
    return this.commentService.commentsArr;
  }
}
