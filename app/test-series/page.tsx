import Link from 'next/link';
import { BooksHeader } from '@/features/books/presentation/components/BooksHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

const testSeries = [
  { number: '01', category: 'FOUNDATION', title: 'Build your basics', description: 'A steady, subject-by-subject set of practice tests to make the fundamentals feel familiar.', tests: '12 tests', tone: 'test-card-blue' },
  { number: '02', category: 'COMPETITIVE EXAMS', title: 'Think under pressure', description: 'Timed papers and clear solutions to help you prepare with confidence and focus.', tests: '08 tests', tone: 'test-card-lilac' },
  { number: '03', category: 'FULL-LENGTH MOCKS', title: 'Know where you stand', description: 'A realistic exam-day run-through, with progress notes to guide your next revision.', tests: '20 tests', tone: 'test-card-peach' },
];

export default function TestSeriesPage() {
  return (
    <div className="storefront">
      <BooksHeader active="tests" />
      <main className="test-page content-width">
        <section className="test-page-hero">
          <div>
            <p className="hero-kicker"><span /> PRACTICE WITH PURPOSE</p>
            <h1>Make the next<br /><em>step feel familiar.</em></h1>
            <p className="hero-description">Thoughtful practice sets, useful explanations, and a clearer picture of what to do next.</p>
            <a className="button-primary" href="#available-series">Explore test series <span aria-hidden="true">↓</span></a>
          </div>
          <div className="test-page-art" aria-hidden="true"><span className="test-art-small">YOUR PROGRESS,</span><strong>ONE<br />QUESTION<br />AT A TIME.</strong><span className="test-art-number">APAR / 2026</span></div>
        </section>

        <section className="test-benefits" aria-label="Test series features">
          <div><span>01</span><strong>Practice at your pace</strong><small>Pick up where you left off.</small></div>
          <div><span>02</span><strong>Learn from every answer</strong><small>Clear solutions, not just scores.</small></div>
          <div><span>03</span><strong>See your progress</strong><small>Know what to focus on next.</small></div>
        </section>

        <section className="store-section" id="available-series">
          <div className="store-section-heading"><div><p className="section-eyebrow">PICK A GOOD PLACE TO BEGIN</p><h2>Test series for your next goal</h2></div></div>
          <div className="series-catalogue">
            {testSeries.map((series) => (
              <article className={`series-catalogue-card ${series.tone}`} key={series.number}>
                <div className="catalogue-card-meta"><span>{series.category}</span><span>{series.number}</span></div>
                <h3>{series.title}</h3>
                <p>{series.description}</p>
                <div className="catalogue-card-bottom"><span>{series.tests} <span aria-hidden="true">·</span> Detailed solutions</span><Link href="/auth/register" aria-label={`Start ${series.title}`}>Start practising <span aria-hidden="true">↗</span></Link></div>
              </article>
            ))}
          </div>
        </section>
        <section className="test-help-band"><p>Not sure where to start?</p><strong>A small conversation can make the next step clearer.</strong><a href="mailto:hello@apar.example">Talk to our team <span aria-hidden="true">↗</span></a></section>
      </main>
      <SiteFooter />
    </div>
  );
}