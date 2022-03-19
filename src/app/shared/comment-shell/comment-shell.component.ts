import { Component, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CommentingTypes, ScoreBtnType } from 'src/app/enums/commentEnums';

import { Comment } from 'src/app/interfaces/comment.model';

import { CommentService } from 'src/app/services/comment.service';
import { DateService } from 'src/app/services/date.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-comment-shell',
  templateUrl: './comment-shell.component.html',
  styleUrls: ['./comment-shell.component.scss'],
})
export class CommentShellComponent implements OnInit {
  @Input() commentItem!: Comment;
  @Input() commentType!: CommentingTypes;

  //! ENUMS FOR HTML \\\
  btnType = ScoreBtnType;
  commentingTypes = CommentingTypes;

  //! COMMENTS STATUSES \\\
  editing: boolean;
  replaying: boolean;

  //! VARIABLES FOR SERVICES \\\
  commentDate!: string;
  imagePath!: string;

  //! OTHERS \\\
  modal!: any;
  loggedInAsUsername: string;

  textForUpdate!: object;

  constructor(
    private commentService: CommentService,
    private dateService: DateService,
    private imageService: ImageService,
    private confirmationService: ConfirmationService
  ) {
    this.loggedInAsUsername = this.commentService.getCurrentUser().username;
    this.editing = false;
    this.replaying = false;
  }

  ngOnInit(): void {
    //prettier-ignore
    this.commentDate = this.dateService.getCommentDate(this.commentItem.createdAt);
    //prettier-ignore
    this.imagePath = this.imageService.getCurrentUserImagePath(this.commentItem.user);
    this.textForUpdate = {
      content: this.commentItem.content,
      replayToUsername: this.commentItem.replyingTo,
    };
  }

  //? FUNCTIONS \\\
  //! FUNCTIONS \\\
  //* FUNCTIONS \\\

  //! Update \\\

  updateScore(type: string) {
    if (type === ScoreBtnType.Plus) {
      this.commentItem.score++;
    } else if (this.commentItem.score > 0) {
      this.commentItem.score--;
    }

    this.commentService.updateScore(
      this.commentItem.id,
      this.commentItem.score
    );
  }

  //! Edit \\\

  editComment() {
    this.editing = true;
  }

  cancelEdit(canceled: any) {
    this.editing = canceled;
  }

  UpdateCommentContent(content: string) {
    if (content.trim().length > 0) {
      this.commentItem.content = content;

      this.commentService.updateComment(
        this.commentItem.id,
        this.commentItem.content
      );
    } else {
      this.editing = false;
    }
    this.editing = false;
  }

  //! Replay \\\

  replayToComment() {
    this.replaying = true;
  }

  cancelReplay(canceled: boolean) {
    this.replaying = canceled;
  }

  postReplay(description: string) {
    this.commentService.postReplay(
      this.commentItem.id,
      this.commentItem.user.username,
      description
    );
    this.replaying = false;
  }

  //! Delete \\\

  deleteCurrentComment() {
    this.confirmationService.confirm({
      message:
        "Are you sure you want to delete this comment?  This will remove the  comment and and can't be undone",
      header: 'Delete comment',
      acceptLabel: 'YES, DELETE',
      rejectLabel: 'NO, CANCEL',
      dismissableMask: true,
      accept: () => {
        this.commentService.deleteComment(this.commentItem.id);
      },
    });
  }

  //! Helpers \\\
}
