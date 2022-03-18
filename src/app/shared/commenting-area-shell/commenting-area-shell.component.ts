import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentingTypes, BtnTypes } from 'src/app/enums/commentEnums';
import { User } from 'src/app/interfaces/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-commenting-area-shell',
  templateUrl: './commenting-area-shell.component.html',
  styleUrls: ['./commenting-area-shell.component.scss'],
})
export class CommentingAreaShellComponent implements OnInit {
  @Input() commentingType!: string;
  @Input() userText!: string;
  @Output() onEditCancel = new EventEmitter<any>();
  @Output() onDoneEdit = new EventEmitter<any>();

  commentingTypes = CommentingTypes;

  btnType!: string;
  imagePath!: string;

  descriptionText!: string;

  currentUserObj: User;

  constructor(private commentService: CommentService) {
    this.currentUserObj = commentService.getCurrentUser();
  }

  ngOnInit(): void {
    this.btnType = this.getBtnType();
    this.imagePath = this.getUserImage();

    this.descriptionText =
      this.commentingType === CommentingTypes.Edit ? this.userText : '';
  }

  getBtnType() {
    return this.commentingType === CommentingTypes.Comment
      ? BtnTypes.Comment
      : this.commentingType === CommentingTypes.Replay
      ? BtnTypes.Replay
      : BtnTypes.Edit;
  }

  getUserImage() {
    return ` ./assets${this.currentUserObj.image.webp.slice(1)}`;
  }

  cancelEditing() {
    this.onEditCancel.emit(false);
  }
  UpdateDescription() {
    this.onDoneEdit.emit(this.userText);
  }

  postComment() {
    this.commentService.postComment(
      5,
      this.userText,
      Date.now(),
      this.currentUserObj.username,
      this.currentUserObj.image.webp
    );
  }
}
