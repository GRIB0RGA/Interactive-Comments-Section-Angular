import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { CommentService } from './services/comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Interactive-Comments-Section-Angular';

  constructor(
    private commentService: CommentService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}
}
