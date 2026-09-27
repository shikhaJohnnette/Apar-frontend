import type { Book } from '../domain/entities/Book';

export const books: Book[] = [
  { id: 1, title: 'Cognitive Science', author: 'A. Mitchell', price: 39, originalPrice: 49, rating: 4.9, badge: 'bestseller', icon: 'brain', coverClass: 'cover-blue' },
  { id: 2, title: 'AI & Society', author: 'R. K. Lee', price: 44, originalPrice: 54, rating: 4.7, badge: 'new', icon: 'robot', coverClass: 'cover-purple' },
  { id: 3, title: 'Data Analytics', author: 'S. Chen', price: 34, originalPrice: 44, rating: 4.8, badge: 'top', icon: 'chart', coverClass: 'cover-sand' },
  { id: 4, title: 'Ecology & Evolution', author: 'M. J. Woods', price: 29, originalPrice: 39, rating: 4.6, badge: 'popular', icon: 'leaf', coverClass: 'cover-green' },
  { id: 5, title: 'Modern Psychology', author: 'L. Anderson', price: 42, originalPrice: 52, rating: 4.8, badge: "editor's pick", icon: 'target', coverClass: 'cover-pink' },
  { id: 6, title: 'Business Strategy', author: 'D. Morgan', price: 36, originalPrice: 46, rating: 4.7, badge: 'trending', icon: 'trend', coverClass: 'cover-blue' },
];
