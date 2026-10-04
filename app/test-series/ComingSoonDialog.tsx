'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function ComingSoonDialog() {
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') router.replace('/books');
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  function dismiss() {
    router.replace('/books');
  }

  return (
    <main className="coming-soon-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) dismiss();
    }}>
      <section className="coming-soon-dialog" role="dialog" aria-modal="true" aria-labelledby="coming-soon-title" aria-describedby="coming-soon-copy">
        <button ref={closeButtonRef} className="coming-soon-close" type="button" aria-label="Close and browse books" onClick={dismiss}>×</button>
        <div className="coming-soon-emblem" aria-hidden="true"><span>✳</span><small>GYANANDAM / NEXT</small></div>
        <p className="section-eyebrow">A NEW WAY TO PRACTISE</p>
        <h1 id="coming-soon-title">Test series are<br /><em>coming soon.</em></h1>
        <p id="coming-soon-copy" className="coming-soon-copy">We’re preparing thoughtful practice, clear explanations, and progress you can feel good about. For now, find your next good read in the bookshop.</p>
        <div className="coming-soon-footer">
          <span><i aria-hidden="true" /> IN THE WORKS</span>
          <button className="button-primary" type="button" onClick={dismiss}>Browse books <span aria-hidden="true">↗</span></button>
        </div>
      </section>
    </main>
  );
}