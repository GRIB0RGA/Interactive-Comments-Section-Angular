import { Component, Input, OnInit, Output } from '@angular/core';
import { CommentingTypes, ScoreBtnType } from 'src/app/enums/commentEnums';

import { Comment } from 'src/app/interfaces/comment.model';

import { CommentService } from 'src/app/services/comment.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-comment-shell',
  templateUrl: './comment-shell.component.html',
  styleUrls: ['./comment-shell.component.scss'],
})
export class CommentShellComponent implements OnInit {
  @Input() commentItem!: Comment;
  @Input() commentType!: CommentingTypes;

  @Input() commentsArr!: Comment[];

  btnType = ScoreBtnType;
  commentingTypes = CommentingTypes;
  editing: boolean;

  loggedInAsUsername: string;

  constructor(
    private commentService: CommentService,
    private storageService: StorageService
  ) {
    this.loggedInAsUsername = this.commentService.getCurrentUser().username;
    this.editing = false;
  }

  ngOnInit(): void {}

  updateScore(type: string) {
    if (type === ScoreBtnType.Plus) {
      this.commentItem.score++;
    } else if (this.commentItem.score > 0) {
      this.commentItem.score--;
    }
  }

  editComment() {
    console.log(this.editing);
    this.editing = true;
  }

  cancelEdit(canceled: any) {
    this.editing = canceled;
  }

  UpdateComment(content: string) {
    this.commentItem.content = content;
    this.editing = false;
  }

  deleteComment() {
    // this.commentService.deleteComment(this.commentItem.id);
  }
}
