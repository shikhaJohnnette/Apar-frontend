import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-width footer-main">
        <div className="footer-brand">
          <strong className="footer-company">Gyanandam Publication</strong>
          <p>Gyanandam Publication is India&apos;s fastest growing with top class quality content</p>
          <address className="footer-contact">
            <span><span aria-hidden="true">⌂</span> Address A-5 Vimal Nagar, Kamta, Lucknow 226028</span>
            <a href="tel:+915223544295"><span aria-hidden="true">☎</span> 0522 3544295</a>
          </address>
        </div>
        <div className="footer-links">
          <div><strong>Company</strong><Link href="/">About Us</Link><a href="tel:+915223544295">Contact Us</a><Link href="/auth/register">Careers</Link></div>
          <div><strong>Products</strong><Link href="/books">Ebooks</Link><Link href="/books">Books</Link><Link href="/test-series">Mock / PracticeTests</Link></div>
        </div>
      </div>
      <div className="content-width footer-bottom">
        <span>© 2026 Gyanandam Publication</span>
        <nav className="footer-legal" aria-label="Legal">
          <a href="#cancellation-refunds">Cancellation &amp; Refunds</a>
          <span aria-hidden="true">|</span>
          <a href="#terms-and-conditions">Terms &amp; Conditions</a>
          <span aria-hidden="true">|</span>
          <a href="#privacy-policy">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
}