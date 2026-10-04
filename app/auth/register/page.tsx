import { BooksHeader } from '@/features/books/presentation/components/BooksHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="storefront">
      <BooksHeader />
      <main className="register-page content-width">
        <p className="section-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h1>Create your account</h1>
        <p className="register-intro">Create a Gyanandam account to keep your books and learning goals together.</p>
        <RegisterForm />
      </main>
      <SiteFooter />
    </div>
  );
}
