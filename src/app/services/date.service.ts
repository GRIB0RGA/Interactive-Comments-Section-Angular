import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  getCommentDate(commentDate: number) {
    let createdDate = Date.now();
    const date = new Date(createdDate);

    var currentDay = date.getDate();
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();

    const commentCreateDate = new Date(commentDate);
    var commentMinute = commentCreateDate.getMinutes();
    var commentHour = commentCreateDate.getHours();
    var commentDay = commentCreateDate.getDate();
    var commentMonth = commentCreateDate.getMonth();
    var commentYear = commentCreateDate.getFullYear();

    if (currentYear - commentYear > 0) {
      return `${currentYear - commentYear} years ago`;
    }

    if (currentMonth - commentMonth > 0) {
      return `${currentMonth - commentMonth} month ago`;
    }

    if (currentDay > commentDay) {
      if (currentDay - commentDay > 7) {
        const week = Math.floor((currentDay - commentDay) / 7);
        return week > 1 ? `${week} weeks ago` : `${week} week ago`;
      }
      return `${currentDay - commentDay} days ago`;
    }

    if ((currentDay = commentDay)) {
      if (commentMinute.toString().length === 1) {
        return `Today at ${commentHour}:0${commentMinute}`;
      }
      return `Today at ${commentHour}:${commentMinute}`;
    }

    return `error`;
  }
}
