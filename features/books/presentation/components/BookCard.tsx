import type { Book } from '../../domain/entities/Book';
import { BookIcon } from './BookIcon';

type Props = { book: Book };

export function BookCard({ book }: Props) {
  return (
    <article className="book-card">
      <div className={`book-cover ${book.coverClass}`}>
        <span className="book-badge">{book.badge}</span>
        <BookIcon icon={book.icon} />
      </div>
      <h2>{book.title}</h2>
      <p className="book-author">by {book.author}</p>
      <div className="book-card-footer">
        <div className="book-price">
          <strong>${book.price}</strong>
          <del>${book.originalPrice}</del>
        </div>
        <span className="book-rating">★ {book.rating}</span>
      </div>
    </article>
  );
}
