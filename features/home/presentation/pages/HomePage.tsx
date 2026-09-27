import Link from 'next/link';
import { books } from '@/features/books/data/books';
import { BookCard } from '@/features/books/presentation/components/BookCard';
import { BooksHeader } from '@/features/books/presentation/components/BooksHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

const categories = [
  { mark: '01', title: 'School & College', detail: 'Build strong foundations', tone: 'category-blue' },
  { mark: 'Aa', title: 'Literature', detail: 'Stories worth keeping', tone: 'category-lilac' },
  { mark: '∑', title: 'Exam Preparation', detail: 'Make every study hour count', tone: 'category-peach' },
  { mark: '✳', title: 'Science & Ideas', detail: 'Follow your curiosity', tone: 'category-green' },
];

const testSeries = [
  { label: 'FOUNDATION', title: 'The complete learning check-in', detail: '12 tests · All subjects', tone: 'test-card-blue' },
  { label: 'COMPETITIVE', title: 'Practice with a clear purpose', detail: '8 tests · Detailed solutions', tone: 'test-card-lilac' },
  { label: 'MOST POPULAR', title: 'Your next exam, made familiar', detail: '20 tests · Progress tracking', tone: 'test-card-peach' },
];

function SectionTitle({ eyebrow, title, href, linkText }: { eyebrow?: string; title: string; href?: string; linkText?: string }) {
  return (
    <div className="store-section-heading">
      <div>
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {href && linkText && <Link className="text-link" href={href}>{linkText}<span aria-hidden="true"> ↗</span></Link>}
    </div>
  );
}

export function HomePage() {
  return (
    <div className="storefront">
      <BooksHeader active="home" />
      <main>
        <section className="home-hero content-width">
          <div className="hero-copy">
            <p className="hero-kicker"><span /> A LITTLE MORE ROOM TO GROW</p>
            <h1>Find your next<br /><em>bright idea.</em></h1>
            <p className="hero-description">Books to get lost in. Practice to move you forward. Good things happen when curiosity has somewhere to go.</p>
            <div className="hero-actions">
              <Link className="button-primary" href="/books">Explore books <span aria-hidden="true">↗</span></Link>
              <Link className="button-secondary" href="/test-series">Explore test series</Link>
            </div>
            <p className="hero-footnote"><span>★★★★★</span> Chosen by curious minds across India</p>
          </div>
          <div className="hero-art" aria-label="A selection of APAR books">
            <div className="hero-art-caption"><span>THE APAR EDIT</span><span>NO. 04 / 2026</span></div>
            <div className="hero-book hero-book-back"><span>KNOW<br />MORE</span><i>Ideas shape everything.</i></div>
            <div className="hero-book hero-book-middle"><span>THE<br />WILD<br />MIND</span><i>Stories for the curious</i></div>
            <div className="hero-book hero-book-front"><span>MAKE<br />IT<br />MATTER</span><i>A field guide to your next chapter</i></div>
            <div className="hero-art-note"><span className="note-star">✳</span><span>Good pages.<br />Better possibilities.</span></div>
            <span className="hero-art-index">01 — 03</span>
          </div>
        </section>

        <section className="benefit-strip content-width" aria-label="Shopping benefits">
          <div><span className="benefit-mark">↗</span><span><strong>Thoughtfully chosen</strong><small>Books worth your time</small></span></div>
          <div><span className="benefit-mark">□</span><span><strong>Easy on the wallet</strong><small>Fair prices, always</small></span></div>
          <div><span className="benefit-mark">⌂</span><span><strong>At your doorstep</strong><small>Carefully packed, quickly sent</small></span></div>
          <div><span className="benefit-mark">✳</span><span><strong>Here to help</strong><small>Real people, real answers</small></span></div>
        </section>

        <section className="store-section content-width">
          <SectionTitle eyebrow="A PLACE TO START" title="Explore by interest" href="/books" linkText="All categories" />
          <div className="category-grid">
            {categories.map((category) => (
              <Link className={`category-tile ${category.tone}`} href="/books" key={category.title}>
                <span className="category-mark">{category.mark}</span>
                <span className="category-copy"><strong>{category.title}</strong><small>{category.detail}</small></span>
                <span className="category-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="store-section content-width">
          <SectionTitle eyebrow="GOOD COMPANY FOR YOUR SHELF" title="Featured books" href="/books" linkText="Browse all books" />
          <div className="book-grid home-book-grid">
            {books.slice(0, 4).map((book) => <BookCard book={book} key={book.id} />)}
          </div>
        </section>

        <section className="series-section">
          <div className="content-width">
            <div className="series-intro">
              <div>
                <p className="section-eyebrow">A STEADIER WAY TO PREPARE</p>
                <h2>Practice that puts<br /><em>you in the picture.</em></h2>
              </div>
              <p>Useful test series for the moments when you want to know what you know, and what to work on next.</p>
              <Link className="button-dark" href="/test-series">Find your test series <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="test-preview-grid">
              {testSeries.map((series, index) => (
                <Link href="/test-series" className={`test-preview-card ${series.tone}`} key={series.title}>
                  <span className="test-preview-top"><span>{series.label}</span><span>0{index + 1}</span></span>
                  <span className="test-preview-icon" aria-hidden="true">{index === 0 ? '✓' : index === 1 ? '∑' : '↗'}</span>
                  <strong>{series.title}</strong>
                  <small>{series.detail}</small>
                  <span className="preview-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="spotlight-section content-width">
          <div className="spotlight-art"><span>THE<br />NEXT<br />CHAPTER</span><small>STARTS WITH ONE PAGE</small></div>
          <div className="spotlight-copy">
            <p className="section-eyebrow">THIS WEEK&apos;S READING LIST</p>
            <h2>A good book<br />has a way of <em>finding you.</em></h2>
            <p>Meet the ideas, people and places you didn&apos;t know you were looking for. Find a new favourite from this week&apos;s editor picks.</p>
            <Link className="button-primary" href="/books">See this week&apos;s picks <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="spotlight-stamp"><strong>15%</strong><span>OFF<br />THIS WEEK</span></div>
        </section>

        <section className="closing-note content-width">
          <span className="closing-mark" aria-hidden="true">“</span>
          <p>Somewhere between the first page and the last, a little thing changes.</p>
          <span className="closing-byline">MAKE SPACE FOR WHAT&apos;S NEXT — APAR</span>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}