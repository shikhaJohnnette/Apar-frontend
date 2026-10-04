'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { getBooks, type BookRecord } from '@/features/admin/api/catalog';
import { apiFileRequest, getStoredUserRole, subscribeToAuthSession } from '@/lib/api';

function CoverImage({ book }: { book: BookRecord }) {
  const [coverUrl, setCoverUrl] = useState('');
  const [coverFailed, setCoverFailed] = useState(false);

  useEffect(() => {
    let objectUrl = '';
    let cancelled = false;

    apiFileRequest(`/api/v1/books/${book.id}/cover`)
      .then((cover) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(cover);
        setCoverUrl(objectUrl);
      })
      .catch(() => setCoverFailed(true));

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [book.id]);

  return coverUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={coverUrl} alt={`${book.title} cover`} />
  ) : (
    <span className="api-book-cover-placeholder" aria-label={`${book.title} cover ${coverFailed ? 'unavailable' : 'loading'}`}>
      {coverFailed ? 'Cover unavailable' : 'Loading cover...'}
    </span>
  );
}

export function BookCatalogue({
  limit,
  showPdfLink = true,
  className = 'book-grid',
}: { limit?: number; showPdfLink?: boolean; className?: string }) {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pdfError, setPdfError] = useState('');
  const [openingPdfFor, setOpeningPdfFor] = useState<number | null>(null);
  const role = useSyncExternalStore(subscribeToAuthSession, getStoredUserRole, () => '');

  useEffect(() => {
    let cancelled = false;

    getBooks()
      .then((results) => {
        const activeBooks = results.filter((book) => book.status === 'ACTIVE');
        if (!cancelled) setBooks(limit === undefined ? activeBooks : activeBooks.slice(0, limit));
      })
      .catch((caught: unknown) => {
        if (!cancelled) setError(caught instanceof Error ? caught.message : 'Books could not be loaded.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (loading) return <p className="book-catalogue-status" role="status">Loading books...</p>;
  if (error) return <p className="book-catalogue-status book-catalogue-error" role="alert">{error}</p>;
  if (books.length === 0) return <p className="book-catalogue-status">No books are available right now.</p>;

  async function openPdf(book: BookRecord) {
    setPdfError('');
    const pdfTab = window.open('about:blank', '_blank');
    if (!pdfTab) {
      setPdfError('Allow pop-ups to open the book PDF.');
      return;
    }
    pdfTab.opener = null;
    setOpeningPdfFor(book.id);

    try {
      const pdf = await apiFileRequest(`/api/v1/books/${book.id}/pdf`);
      const pdfUrl = URL.createObjectURL(pdf);
      pdfTab.location.href = pdfUrl;
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 5 * 60 * 1000);
    } catch (caught) {
      pdfTab.close();
      setPdfError(caught instanceof Error ? caught.message : 'The book PDF could not be opened.');
    } finally {
      setOpeningPdfFor(null);
    }
  }

  return (
    <section className={className} aria-label="Available books">
      {books.map((book) => (
        <article className="book-card api-book-card" key={book.id}>
          <div className="book-cover api-book-cover">
            <CoverImage book={book} />
          </div>
          <h2>{book.title}</h2>
          <p className="book-author">{book.author ? `by ${book.author}` : book.categoryName}</p>
          <div className="book-card-footer">
            <strong className="api-book-price">₹{Number(book.price).toFixed(2)}</strong>
            <span className="api-book-category">{book.categoryName}</span>
          </div>
          {showPdfLink && (role === 'ROLE_SUPER_ADMIN' || Number(book.price) === 0) && (
            <button className="api-book-read" type="button" onClick={() => void openPdf(book)} disabled={openingPdfFor !== null}>
              {openingPdfFor === book.id ? 'Opening PDF...' : 'Open PDF'} <span aria-hidden="true">↗</span>
            </button>
          )}
        </article>
      ))}
      {pdfError && <p className="book-catalogue-status book-catalogue-error" role="alert">{pdfError}</p>}
    </section>
  );
}