'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore, type FormEvent } from 'react';
import { loginUser } from '../api/login';
import { getStoredUserName, saveAuthTokens, saveAuthUser, subscribeToAuthSession } from '@/lib/api';

export function LoginDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const userName = useSyncExternalStore(subscribeToAuthSession, getStoredUserName, () => '');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setPending(true);
    setError('');

    try {
      const result = await loginUser({
        email: String(formData.get('email')).trim(),
        password: String(formData.get('password')),
      });
      saveAuthTokens(result.token, result.refreshToken);
      saveAuthUser(result.user.firstName, result.user.role.name);
      setIsOpen(false);
      form.reset();
      if (result.user.role.name === 'ROLE_SUPER_ADMIN') {
        router.push('/dashboard/admin');
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Sign-in failed. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {userName ? (
        <span className="header-account" aria-label={`Signed in as ${userName}`}>Hi, {userName}</span>
      ) : (
        <button className="header-account" type="button" onClick={() => { setError(''); setIsOpen(true); }}>
          Sign in <span aria-hidden="true">↗</span>
        </button>
      )}

      {isOpen && (
        <div className="login-dialog-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}>
          <section className="login-dialog" role="dialog" aria-modal="true" aria-labelledby="login-dialog-title">
            <button className="login-dialog-close" type="button" aria-label="Close sign-in dialog" onClick={() => setIsOpen(false)}>×</button>
            <p className="section-eyebrow">WELCOME BACK</p>
            <h2 id="login-dialog-title">Sign in to Gyanandam</h2>
            <p className="login-dialog-copy">Pick up where your next chapter begins.</p>
            <form className="register-form" onSubmit={handleSubmit}>
              <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
              {error && <p className="register-feedback register-error" role="alert">{error}</p>}
              <button className="button-primary register-submit" type="submit" disabled={pending}>
                {pending ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            <p className="login-dialog-register">New to Gyanandam? <Link href="/auth/register">Create an account</Link></p>
          </section>
        </div>
      )}
    </>
  );
}