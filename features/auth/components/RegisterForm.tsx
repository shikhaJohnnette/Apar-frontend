'use client';

import { useState, type FormEvent } from 'react';
import { registerUser } from '../api/register';

export function RegisterForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setError('');
    setRegisteredEmail('');

    const formData = new FormData(form);

    try {
      const user = await registerUser({
        firstName: String(formData.get('firstName')).trim(),
        lastName: String(formData.get('lastName')).trim(),
        email: String(formData.get('email')).trim(),
        mobile: String(formData.get('mobile')).trim(),
        password: String(formData.get('password')),
        photoUrl: String(formData.get('photoUrl')).trim() || undefined,
        provider: 'local',
        roleName: 'ROLE_USER',
      });

      setRegisteredEmail(user.email);
      form.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Registration failed. Please try again.');
    } finally {
      setPending(false);
    }
  }

  if (registeredEmail) {
    return (
      <div className="register-feedback register-success" role="status">
        <strong>Check your email</strong>
        <p>We sent a 6-digit verification code to {registeredEmail}. It expires in 5 minutes.</p>
      </div>
    );
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-name-fields">
        <label>First name<input name="firstName" autoComplete="given-name" required /></label>
        <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
      </div>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Mobile number<input name="mobile" type="tel" autoComplete="tel" required /></label>
      <label>Photo URL <span>(optional)</span><input name="photoUrl" type="url" /></label>
      <label>Password<input name="password" type="password" autoComplete="new-password" minLength={8} required /></label>

      {error && <p className="register-feedback register-error" role="alert">{error}</p>}

      <button className="button-primary register-submit" type="submit" disabled={pending}>
        {pending ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}