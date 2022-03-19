import { Component, OnInit } from '@angular/core';
import { CommentingTypes } from 'src/app/enums/commentEnums';
import { CommentService } from 'src/app/services/comment.service';
import { StorageService } from 'src/app/services/storage.service';

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

  comments!: any;
  currentUserObject = this.commentService.getCurrentUser();
  currentUsername = this.commentService.getCurrentUser().username;

  ngOnInit(): void {
  

    this.comments = this.commentService.commentsArr;
    
    this.storageService.set(this.comments);
  }
}
