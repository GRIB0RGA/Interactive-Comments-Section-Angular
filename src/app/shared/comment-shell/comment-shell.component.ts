import { Component, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import {
  CommentingTypes,
  ScoreBtnType,
  VoteStatus,
} from 'src/app/enums/commentEnums';

import {
  Comment,
  UpdateText,
  VoteStyle,
} from 'src/app/interfaces/comment.model';

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

  loggedInAsUsername: string;
  textForUpdate!: UpdateText;

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
    this.textForUpdate = this.updateTextForInputObject();
  }

  //? FUNCTIONS \\\
  //! FUNCTIONS \\\
  //* FUNCTIONS \\\

  //! Update \\\

  updateScore(type: string): void {
    if (type === ScoreBtnType.Plus && this.commentItem.scoreStatus !== 1) {
      this.commentItem.score++;
      this.commentItem.scoreStatus++;
    }
    //prettier-ignore
    if (type === ScoreBtnType.Minus && this.commentItem.score > 0 && this.commentItem.scoreStatus !== -1) {
      this.commentItem.score--;
      this.commentItem.scoreStatus --;
    }

    this.commentService.updateScore(
      this.commentItem.id,
      this.commentItem.score
    );
  }

  getVoteStyle(type: string): VoteStyle {
    if (type === ScoreBtnType.Plus) {
      return {
        'button-Upvoted-Class':
          this.commentItem.scoreStatus === VoteStatus.Upvoted,
      };
    }
    if (type === ScoreBtnType.Minus) {
      return {
        'button-Upvoted-Class':
          this.commentItem.scoreStatus === VoteStatus.DownVoted,
      };
    }

    return {
      'button-Upvoted-Class': false,
    };
  }

  //! Edit \\\

  editComment(): void {
    this.editing = true;
  }

  cancelEdit(canceled: boolean): void {
    this.editing = canceled;
  }

  UpdateCommentContent(content: string): void {
    if (content.trim().length > 0) {
      this.commentItem.content = content;

      this.commentService.updateComment(
        this.commentItem.id,
        this.commentItem.content
      );
      this.textForUpdate.content = content;
    }
    this.editing = false;
  }

  //! Replay \\\

  replayToComment(): void {
    this.replaying = true;
  }

  cancelReplay(canceled: boolean): void {
    this.replaying = canceled;
  }

  postReplay(description: string): void {
    if (description.trim().length > 0) {
      this.commentService.postReplay(
        this.commentItem.id,
        this.commentItem.user.username,
        description
      );
    }
    this.replaying = false;
  }

  //! Delete \\\

  deleteCurrentComment(): void {
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

  //! Other Functions \\\

  updateTextForInputObject(): UpdateText {
    return {
      content: this.commentItem.content,
      replayingTo: this.commentItem.replyingTo,
      replayUsername: this.commentItem.user.username,
    };
  }
}
