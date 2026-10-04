import { BookCatalogue } from '../components/BookCatalogue';
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
        <BookCatalogue />
      </main>
      <SiteFooter />
    </div>
  );
}
