import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-width footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-wordmark">APAR<span>.</span></Link>
          <p>Good books. Clear goals.<br />A little more room to grow.</p>
        </div>
        <div className="footer-links">
          <div><strong>Explore</strong><Link href="/">Home</Link><Link href="/books">Books</Link><Link href="/test-series">Test Series</Link></div>
          <div><strong>We&apos;re here</strong><Link href="/auth/login">Your account</Link><a href="mailto:hello@apar.example">Contact us</a><a href="mailto:hello@apar.example">Help & support</a></div>
        </div>
        <div className="footer-newsletter"><span className="section-eyebrow">A NOTE FROM APAR</span><strong>Good things to read. No noise.</strong><p>Thoughtful picks and fresh arrivals, now and then.</p><a href="mailto:hello@apar.example">Say hello <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="content-width footer-bottom"><span>© 2026 APAR Publication</span><span>Made for the curious.</span></div>
    </footer>
  );
}