import { Category } from './category.interface';
import { User } from './user.interface';

export interface Post {
  id?: number;
  title?: string;
  text?: string;
  imageUrl?: string;
  category?: Category;
  user?: User;
}
