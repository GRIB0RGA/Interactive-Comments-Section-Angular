import { Component, Input, OnInit } from '@angular/core';
import { CommentingTypes } from 'src/app/enums/commentEnums';
import { Comment } from '../../../interfaces/comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() currentComment!: Comment;

  commentingTypes = CommentingTypes;

  constructor() {}

  ngOnInit(): void {}
}
