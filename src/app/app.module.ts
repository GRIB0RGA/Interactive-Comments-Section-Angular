import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentShellComponent } from './shared/comment-shell/comment-shell.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentItemComponent } from './components/comment-list/comment-item/comment-item.component';
import { CommentingAreaShellComponent } from './shared/commenting-area-shell/commenting-area-shell.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    CommentShellComponent,
    CommentListComponent,
    CommentItemComponent,
    CommentingAreaShellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

// ConfirmDialogModule, ConfirmationService;
