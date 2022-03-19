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
  content: string;
  createdAt: number;
  replyingTo?: string;
  score: number;
  user: User;
  replies: any[];
}
export interface Replay {
  id: number;
  content: string;
  createdAt: string;
  replyingTo: string;
  score: number;
  user: User;
}
