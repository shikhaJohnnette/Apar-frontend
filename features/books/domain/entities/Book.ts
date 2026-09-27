export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  rating: number;
  badge: string;
  icon: 'brain' | 'robot' | 'chart' | 'leaf' | 'target' | 'trend';
  coverClass: string;
};
