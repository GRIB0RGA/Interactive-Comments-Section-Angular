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
  createdAt: string;
  score: number;
  user: User;
  replies: any[];
}
