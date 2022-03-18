import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentShellComponent } from './shared/comment-shell/comment-shell.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentItemComponent } from './components/comment-list/comment-item/comment-item.component';
import { CommentingAreaShellComponent } from './shared/commenting-area-shell/commenting-area-shell.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentShellComponent,
    CommentListComponent,
    CommentItemComponent,
    CommentingAreaShellComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
