export interface Image {
  png?: string;
  webp: string;
}

export interface User {
  image: Image;
  username: string;
}

export interface Comment {
  id: number;
  animationStatus: boolean;
  scoreStatus: number;
  content: string;
  createdAt: number;
  replyingTo?: string;
  score: number;
  user: User;
  replies: any[];
}
export interface Replay {
  id: number;
  animationStatus: boolean;
  scoreStatus: number;
  content: string;
  createdAt: number;
  replyingTo: string;
  score: number;
  user: User;
}

export interface UpdateText {
  content: string;
  replayingTo?: string;
  replayUsername?: string;
}

export interface VoteStyle {
  'button-Upvoted-Class': boolean;
}
