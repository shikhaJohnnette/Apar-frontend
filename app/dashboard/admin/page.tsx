'use client';

import { useEffect, useState, useSyncExternalStore, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredUserName, getStoredUserRole, subscribeToAuthSession } from '@/lib/api';
import {
  createBook,
  createCategory,
  deleteBook,
  deleteCategory,
  getBooks,
  getCategories,
  updateBook,
  updateCategory,
  type BookInput,
  type BookRecord,
  type Category,
  type CategoryInput,
  type CategoryType,
  type CatalogStatus,
} from '@/features/admin/api/catalog';

const ROLE_SUPER_ADMIN = 'SUPER_ADMIN';
const ROLE_LOADING = '__role_loading__';
type AdminSection = 'books' | 'categories';

const emptyBook: BookInput = {
  title: '',
  description: '',
  author: '',
  isbn: '',
  price: 0,
  categoryId: 0,
  coverImageUrl: '',
  pdfUrl: '',
  status: 'ACTIVE',
};

const emptyCategory: CategoryInput = {
  name: '',
  slug: '',
  description: '',
  type: 'EDUCATION',
  status: 'ACTIVE',
  displayOrder: 0,
};

function messageFrom(error: unknown) {
  return error instanceof Error ? error.message : 'The request could not be completed.';
}

function slugFromName(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function AdminPage() {
  const router = useRouter();
  const role = useSyncExternalStore(subscribeToAuthSession, getStoredUserRole, () => ROLE_LOADING);
  const name = useSyncExternalStore(subscribeToAuthSession, getStoredUserName, () => '');
  const [section, setSection] = useState<AdminSection>('categories');
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [bookEditor, setBookEditor] = useState<BookInput | null>(null);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [categoryEditor, setCategoryEditor] = useState<CategoryInput | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (role !== ROLE_LOADING && role !== ROLE_SUPER_ADMIN) {
      router.replace('/books');
    }
  }, [role, router]);

  useEffect(() => {
    if (role !== ROLE_SUPER_ADMIN) return;

    async function loadCatalog() {
      setLoading(true);
      setError('');
      try {
        const [bookResults, categoryResults] = await Promise.all([getBooks(), getCategories()]);
        setBooks(bookResults);
        setCategories(categoryResults);
      } catch (caught) {
        setError(messageFrom(caught));
      } finally {
        setLoading(false);
      }
    }

    void loadCatalog();
  }, [role]);

  function startNewBook() {
    setEditingBookId(null);
    setBookEditor({ ...emptyBook, categoryId: categories[0]?.id ?? 0 });
    setError('');
    setNotice('');
  }

  function startEditBook(book: BookRecord) {
    setEditingBookId(book.id);
    setBookEditor({
      title: book.title,
      description: book.description ?? '',
      author: book.author ?? '',
      isbn: book.isbn ?? '',
      price: Number(book.price),
      categoryId: book.categoryId,
      coverImageUrl: book.coverImageUrl ?? '',
      pdfUrl: '',
      status: book.status,
    });
    setError('');
    setNotice('');
  }

  async function submitBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!bookEditor) return;

    const formData = new FormData(event.currentTarget);
    const coverImage = formData.get('coverImage');
    const pdfFile = formData.get('pdfFile');
    const book: BookInput = {
      ...bookEditor,
      title: String(formData.get('title')).trim(),
      description: String(formData.get('description')).trim(),
      author: String(formData.get('author')).trim(),
      isbn: String(formData.get('isbn')).trim(),
      price: Number(formData.get('price')),
      categoryId: Number(formData.get('categoryId')),
      coverImageUrl: String(formData.get('coverImageUrl') ?? '').trim(),
      pdfUrl: String(formData.get('pdfUrl') ?? '').trim(),
      status: String(formData.get('status')) as CatalogStatus,
    };

    setSaving(true);
    setError('');
    setNotice('');
    try {
      if (editingBookId !== null) {
        await updateBook(
          editingBookId,
          book,
          coverImage instanceof File && coverImage.size > 0 ? coverImage : undefined,
          pdfFile instanceof File && pdfFile.size > 0 ? pdfFile : undefined,
        );
        setNotice('Book updated.');
      } else {
        if (!(coverImage instanceof File) || coverImage.size === 0 || !(pdfFile instanceof File) || pdfFile.size === 0) {
          throw new Error('Choose both a cover image and a PDF file to create a book.');
        }
        await createBook(book, coverImage, pdfFile);
        setNotice('Book created.');
      }
      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
      setBookEditor(null);
      setEditingBookId(null);
    } catch (caught) {
      setError(messageFrom(caught));
    } finally {
      setSaving(false);
    }
  }

  function startNewCategory() {
    setEditingCategoryId(null);
    setCategoryEditor({ ...emptyCategory });
    setError('');
    setNotice('');
  }

  function startEditCategory(category: Category) {
    setEditingCategoryId(category.id);
    setCategoryEditor({
      name: category.name,
      slug: category.slug,
      description: category.description ?? '',
      type: category.type,
      status: category.status,
      displayOrder: category.displayOrder ?? 0,
    });
    setError('');
    setNotice('');
  }

  async function submitCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categoryEditor) return;

    const formData = new FormData(event.currentTarget);
    const nameValue = String(formData.get('name')).trim();
    const category: CategoryInput = {
      name: nameValue,
      slug: String(formData.get('slug')).trim() || slugFromName(nameValue),
      description: String(formData.get('description')).trim(),
      type: String(formData.get('type')) as CategoryType,
      status: String(formData.get('status')) as CatalogStatus,
      displayOrder: Number(formData.get('displayOrder')),
    };

    setSaving(true);
    setError('');
    setNotice('');
    try {
      if (editingCategoryId !== null) {
        await updateCategory(editingCategoryId, category);
        setNotice('Category updated.');
      } else {
        await createCategory(category);
        setNotice('Category created.');
      }
      setCategories(await getCategories());
      setCategoryEditor(null);
      setEditingCategoryId(null);
    } catch (caught) {
      setError(messageFrom(caught));
    } finally {
      setSaving(false);
    }
  }

  async function removeBook(book: BookRecord) {
    if (!window.confirm(`Mark “${book.title}” inactive?`)) return;
    setError('');
    setNotice('');
    try {
      await deleteBook(book.id);
      setBooks(await getBooks());
      setNotice('Book marked inactive.');
    } catch (caught) {
      setError(messageFrom(caught));
    }
  }

  async function removeCategory(category: Category) {
    if (!window.confirm(`Delete the “${category.name}” category?`)) return;
    setError('');
    setNotice('');
    try {
      await deleteCategory(category.id);
      setCategories(await getCategories());
      setNotice('Category deleted.');
    } catch (caught) {
      setError(messageFrom(caught));
    }
  }

  if (role !== ROLE_SUPER_ADMIN) {
    return <section className="admin-shell"><p>Checking administrator access...</p></section>;
  }

  return (
    <main className="admin-shell">
      <header className="admin-heading">
        <div>
          <p className="section-eyebrow">GYANANDAM / CONTROL ROOM</p>
          <h1>Catalog administration</h1>
          <p>Manage books and categories. Signed in as {name || 'Super admin'}.</p>
        </div>
        <a className="admin-exit" href="/books">Return to storefront <span aria-hidden="true">↗</span></a>
      </header>

      <div className="admin-summary" aria-label="Catalog totals">
        <div><span>BOOKS</span><strong>{books.length}</strong></div>
        <div><span>CATEGORIES</span><strong>{categories.length}</strong></div>
        <div><span>ACCESS</span><strong>Super admin</strong></div>
      </div>

      <nav className="admin-tabs" aria-label="Catalog management">
        <button type="button" className={section === 'books' ? 'active' : ''} onClick={() => { setSection('books'); setError(''); setNotice(''); }}>Books</button>
        <button type="button" className={section === 'categories' ? 'active' : ''} onClick={() => { setSection('categories'); setError(''); setNotice(''); }}>Categories</button>
      </nav>

      {error && <p className="admin-feedback admin-error" role="alert">{error}</p>}
      {notice && <p className="admin-feedback admin-success" role="status">{notice}</p>}
      {loading ? <p className="admin-empty">Loading catalog…</p> : (
        <>
          {section === 'books' ? (
            <section className="admin-section" aria-labelledby="admin-books-title">
              <div className="admin-section-heading">
                <div><h2 id="admin-books-title">Books</h2><p>Upload a cover and PDF when adding a book.</p></div>
                <button className="admin-primary" type="button" onClick={startNewBook}>＋ Add book</button>
              </div>

              {bookEditor && (
                <form className="admin-form" onSubmit={submitBook}>
                  <div className="admin-form-heading"><h3>{editingBookId === null ? 'New book' : `Edit book #${editingBookId}`}</h3><button type="button" className="admin-text-button" onClick={() => { setBookEditor(null); setEditingBookId(null); }}>Cancel</button></div>
                  <div className="admin-form-grid">
                    <label>Title<input name="title" defaultValue={bookEditor.title} maxLength={200} required /></label>
                    <label>Author<input name="author" defaultValue={bookEditor.author} maxLength={150} /></label>
                    <label>ISBN<input name="isbn" defaultValue={bookEditor.isbn} maxLength={30} /></label>
                    <label>Price<input name="price" type="number" min="0" step="0.01" defaultValue={bookEditor.price} required /></label>
                    <label>Category<select name="categoryId" defaultValue={bookEditor.categoryId || ''} required><option value="" disabled>Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
                    <label>Status<select name="status" defaultValue={bookEditor.status}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></label>
                    <label className="admin-wide">Description<textarea name="description" defaultValue={bookEditor.description} rows={3} /></label>
                    {editingBookId === null ? (
                      <>
                        <label>Cover image (JPG, PNG, WEBP; max 5 MB)<input name="coverImage" type="file" accept="image/jpeg,image/png,image/webp" required /></label>
                        <label>Book PDF (max 100 MB)<input name="pdfFile" type="file" accept="application/pdf" required /></label>
                      </>
                    ) : (
                      <>
                        <label>Replace cover image (JPG, PNG, WEBP; max 5 MB, optional)<input name="coverImage" type="file" accept="image/jpeg,image/png,image/webp" /></label>
                        <label>Replace book PDF (max 100 MB, optional)<input name="pdfFile" type="file" accept="application/pdf" /></label>
                      </>
                    )}
                  </div>
                  <button className="admin-primary" type="submit" disabled={saving || categories.length === 0}>{saving ? 'Saving…' : editingBookId === null ? 'Create book' : 'Save changes'}</button>
                  {categories.length === 0 && <p className="admin-hint">Create a category before adding a book.</p>}
                </form>
              )}

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Book</th><th>Category</th><th>Price</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
                  <tbody>{books.map((book) => (
                    <tr key={book.id}>
                      <td><strong>{book.title}</strong><small>{book.author || 'No author'} · #{book.id}</small></td>
                      <td>{book.categoryName}</td>
                      <td>{Number(book.price).toFixed(2)}</td>
                      <td><span className={`admin-status ${book.status === 'ACTIVE' ? 'is-active' : 'is-inactive'}`}>{book.status}</span></td>
                      <td className="admin-row-actions"><button type="button" onClick={() => startEditBook(book)}>Edit</button><button type="button" onClick={() => void removeBook(book)}>Deactivate</button></td>
                    </tr>
                  ))}</tbody>
                </table>
                {books.length === 0 && <p className="admin-empty">No books returned by the API.</p>}
              </div>
            </section>
          ) : (
            <section className="admin-section" aria-labelledby="admin-categories-title">
              <div className="admin-section-heading">
                <div><h2 id="admin-categories-title">Categories</h2><p>Create and organize the catalog categories.</p></div>
                <button className="admin-primary" type="button" onClick={startNewCategory}>＋ Add category</button>
              </div>

              {categoryEditor && (
                <form className="admin-form" onSubmit={submitCategory}>
                  <div className="admin-form-heading"><h3>{editingCategoryId === null ? 'New category' : `Edit category #${editingCategoryId}`}</h3><button type="button" className="admin-text-button" onClick={() => { setCategoryEditor(null); setEditingCategoryId(null); }}>Cancel</button></div>
                  <div className="admin-form-grid">
                    <label>Name<input name="name" defaultValue={categoryEditor.name} maxLength={100} required /></label>
                    <label>Slug<input name="slug" defaultValue={categoryEditor.slug} maxLength={120} placeholder="Generated from name when blank" /></label>
                    <label>Type<select name="type" defaultValue={categoryEditor.type}><option value="EDUCATION">Education</option><option value="GENERAL">General</option></select></label>
                    <label>Status<select name="status" defaultValue={categoryEditor.status}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></label>
                    <label>Display order<input name="displayOrder" type="number" step="1" defaultValue={categoryEditor.displayOrder} /></label>
                    <label className="admin-wide">Description<textarea name="description" defaultValue={categoryEditor.description} rows={3} /></label>
                  </div>
                  <button className="admin-primary" type="submit" disabled={saving}>{saving ? 'Saving…' : editingCategoryId === null ? 'Create category' : 'Save changes'}</button>
                </form>
              )}

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Category</th><th>Type</th><th>Order</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
                  <tbody>{categories.map((category) => (
                    <tr key={category.id}>
                      <td><strong>{category.name}</strong><small>/{category.slug} · #{category.id}</small></td>
                      <td>{category.type}</td>
                      <td>{category.displayOrder ?? 0}</td>
                      <td><span className={`admin-status ${category.status === 'ACTIVE' ? 'is-active' : 'is-inactive'}`}>{category.status}</span></td>
                      <td className="admin-row-actions"><button type="button" onClick={() => startEditCategory(category)}>Edit</button><button type="button" onClick={() => void removeCategory(category)}>Delete</button></td>
                    </tr>
                  ))}</tbody>
                </table>
                {categories.length === 0 && <p className="admin-empty">No categories returned by the API.</p>}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
