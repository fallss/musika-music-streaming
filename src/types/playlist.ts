export interface Playlist {
  id: string;
  userId: string;
  name: string;
  description: string;
  coverUrl: string;
  songIds: string[];
  createdAt: string;
  updatedAt: string;
}
