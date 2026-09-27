import { books } from '../../data/books';
import { BookCard } from '../components/BookCard';
import { BooksHeader } from '../components/BooksHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export function BooksPage() {
  return (
    <div className="storefront">
      <BooksHeader active="books" />
      <main className="books-page content-width">
        <section className="books-heading">
          <div>
            <h1>Bestselling books</h1>
            <p>Curated for your learning journey</p>
          </div>
          <button className="filter-button" type="button"><span>☷</span> filter</button>
        </section>
        <section className="book-grid" aria-label="Bestselling books">
          {books.map((book) => <BookCard key={book.id} book={book} />)}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
