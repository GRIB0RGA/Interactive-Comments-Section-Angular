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
    this.descriptionText =
      this.commentingType === CommentingTypes.Edit ? this.generateTextForEdit() : '';
  }

  getBtnType() {
    return this.commentingType === CommentingTypes.Comment
      ? BtnTypes.Comment
      : this.commentingType === CommentingTypes.Replay
      ? BtnTypes.Replay
      : BtnTypes.Edit;
  }

  //! BUTTON SUBMIT ACTION \\\

  submitAction(type: string) {
    if (type === CommentingTypes.Comment) {
      this.commentService.postComment(
        this.descriptionText,
        this.currentUserObj.username,
        this.currentUserObj.image.webp
      );
      this.descriptionText = '';
    }
    if (type === CommentingTypes.Edit) {
      //? Get rid of @username and send \\\
      const removeReplayTo = this.descriptionText
        .split(' ')
        .filter((word) => word !== `@${this.userText.replayToUsername}`)
        .join(' ');

      this.onSubmitAction.emit(removeReplayTo);
    }
    if (type === CommentingTypes.Replay) {
      this.onSubmitAction.emit(this.descriptionText);
    }
  }

  //! BUTTON CANCEL ACTION \\\

  cancelAction() {
    this.onCancelAction.emit(false);
  }

  generateTextForEdit() {
    return this.userText.replayToUsername
      ? `@${this.userText.replayToUsername} ${this.userText.content}`
      : `${this.userText.content}`;
  }
}
