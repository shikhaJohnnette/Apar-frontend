import Link from 'next/link';
import Image from 'next/image';
import { AdminPanelLink } from '@/features/auth/components/AdminPanelLink';
import { LoginDialog } from '@/features/auth/components/LoginDialog';

type BooksHeaderProps = {
  active?: 'home' | 'books' | 'tests';
};

export function BooksHeader({ active = 'books' }: BooksHeaderProps) {
  return (
    <header className="site-header">
      <div className="books-header">
        <Link href="/" className="brand-mark" aria-label="Gyanandam home">
          <Image
            className="brand-logo"
            src="/images/logo.jpeg"
            alt="Gyanandam Publication"
            width={1254}
            height={1254}
            priority
          />
        </Link>

        <nav className="books-tabs" aria-label="Main navigation">
          <Link className={active === 'home' ? 'tab-active' : ''} href="/"><span aria-hidden="true">⌂</span> Home</Link>
          <Link className={active === 'books' ? 'tab-active' : ''} href="/books"><span aria-hidden="true">▮</span> Books</Link>
          <Link className={active === 'tests' ? 'tab-active' : ''} href="/test-series"><span aria-hidden="true">✎</span> Test Series</Link>
        </nav>

        <div className="user-actions">
          <AdminPanelLink />
          <LoginDialog />
          <Link className="header-cart" href="/books" aria-label="Browse books">Bag <span aria-hidden="true">＋</span></Link>
        </div>
      </div>
    </header>
  );
}
