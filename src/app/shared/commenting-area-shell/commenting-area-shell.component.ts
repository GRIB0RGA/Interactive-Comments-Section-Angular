import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentingTypes, BtnTypes } from 'src/app/enums/commentEnums';
import { User } from 'src/app/interfaces/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-commenting-area-shell',
  templateUrl: './commenting-area-shell.component.html',
  styleUrls: ['./commenting-area-shell.component.scss'],
})
export class CommentingAreaShellComponent implements OnInit {
  @Input() commentingType!: string;
  @Input() userText!: any;
  @Input() currentComment!: any;

  @Output() onCancelAction = new EventEmitter<any>();
  @Output() onSubmitAction = new EventEmitter<any>();

  currentUserObj: User;

  btnType!: string;
  imagePath!: string;
  descriptionText!: string;

  commentingTypes = CommentingTypes;
  shaking = false;

  constructor(
    private commentService: CommentService,
    private imageService: ImageService
  ) {
    this.currentUserObj = commentService.getCurrentUser();
  }

  ngOnInit(): void {
    this.btnType = this.getBtnType();
    this.imagePath = this.imageService.getCurrentUserImagePath(
      this.currentUserObj
    );
    //prettier-ignore
    this.descriptionText = this.generateTextForEdit(this.commentingType);
  }

  getBtnType(): string {
    return this.commentingType === CommentingTypes.Comment
      ? BtnTypes.Comment
      : this.commentingType === CommentingTypes.Replay
      ? BtnTypes.Replay
      : BtnTypes.Edit;
  }

  //! BUTTON SUBMIT ACTION \\\

  submitAction(type: string): void {
    //prettier-ignore

    //? COMMENT
    if (type === CommentingTypes.Comment && this.descriptionText.trim().length>0) {
      this.commentService.postComment(
        this.descriptionText,
        this.currentUserObj.username,
        this.currentUserObj.image.webp
      );
      this.descriptionText = '';
      this.onSubmitAction.emit(this.descriptionText);
    } else {
      this.shaking = true;
      setTimeout(() => {
        this.shaking = false;
      }, 1500);
    }
    //? EDIT
    if (type === CommentingTypes.Edit) {
      console.log(123);

      //? Get rid of @username and send \\\
      const removeReplayTo = this.descriptionText
        .split(' ')
        .filter((word) => word !== `@${this.userText.replayingTo}`)
        .join(' ');

      this.onSubmitAction.emit(removeReplayTo);
    }

    //? REPLAY
    if (type === CommentingTypes.Replay) {
      const removeReplayTo = this.descriptionText
        .split(' ')
        .filter((word) => word !== `@${this.userText.replayUsername}`)
        .join(' ');

      this.onSubmitAction.emit(removeReplayTo);
    }
  }

  //! BUTTON CANCEL ACTION \\\

  cancelAction(): void {
    this.onCancelAction.emit(false);
  }

  //! Other Functions \\\
  generateTextForEdit(type: string): string {
    if (type === CommentingTypes.Edit) {
      return this.userText.replayingTo
        ? `@${this.userText.replayingTo} ${this.userText.content} `
        : `${this.userText.content} `;
    } else if (type === CommentingTypes.Replay) {
      return `@${this.userText.replayUsername} `;
    } else {
      return '';
    }
  }
}
