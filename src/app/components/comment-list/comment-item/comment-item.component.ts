import { Component, Input, OnInit } from '@angular/core';
import { CommentingTypes } from 'src/app/enums/commentEnums';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() currentUser!: any;
  @Input() currentComment!: any;

  commentingTypes = CommentingTypes;
  constructor() {}

  ngOnInit(): void {}
}
