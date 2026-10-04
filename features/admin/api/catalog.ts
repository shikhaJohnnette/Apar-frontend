import { apiRequest } from '@/lib/api';

export type CatalogStatus = 'ACTIVE' | 'INACTIVE';
export type CategoryType = 'EDUCATION' | 'GENERAL';

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  type: CategoryType;
  status: CatalogStatus;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type BookRecord = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  author: string | null;
  isbn: string | null;
  price: number | string;
  categoryId: number;
  categoryName: string;
  coverImageUrl: string | null;
  status: CatalogStatus;
  createdAt: string;
  updatedAt: string;
};

export type CategoryInput = {
  name: string;
  slug: string;
  description: string;
  type: CategoryType;
  status: CatalogStatus;
  displayOrder: number;
};

export type BookInput = {
  title: string;
  description: string;
  author: string;
  isbn: string;
  price: number;
  categoryId: number;
  coverImageUrl: string;
  pdfUrl: string;
  status: CatalogStatus;
};

export function getCategories() {
  return apiRequest<Category[]>('/api/v1/categories');
}

export function createCategory(category: CategoryInput) {
  return apiRequest<Category>('/api/v1/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  });
}

export function updateCategory(id: number, category: CategoryInput) {
  return apiRequest<Category>(`/api/v1/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(category),
  });
}

export function deleteCategory(id: number) {
  return apiRequest<void>(`/api/v1/categories/${id}`, { method: 'DELETE' });
}

export function getBooks() {
  return apiRequest<BookRecord[]>('/api/v1/books');
}

export function createBook(book: BookInput, coverImage: File, pdfFile: File) {
  const form = new FormData();
  form.set('title', book.title);
  form.set('description', book.description);
  form.set('author', book.author);
  form.set('isbn', book.isbn);
  form.set('price', String(book.price));
  form.set('categoryId', String(book.categoryId));
  form.set('status', book.status);
  form.set('coverImage', coverImage);
  form.set('pdfFile', pdfFile);

  return apiRequest<BookRecord>('/api/v1/books', {
    method: 'POST',
    body: form,
  });
}

export function updateBook(id: number, book: BookInput, coverImage?: File, pdfFile?: File) {
  const form = new FormData();
  form.set('book', new Blob([JSON.stringify({
    title: book.title,
    description: book.description,
    author: book.author,
    isbn: book.isbn,
    price: book.price,
    categoryId: book.categoryId,
    status: book.status,
  })], { type: 'application/json' }));
  if (coverImage) form.set('coverImage', coverImage);
  if (pdfFile) form.set('pdfFile', pdfFile);

  return apiRequest<BookRecord>(`/api/v1/books/${id}`, {
    method: 'PUT',
    body: form,
  });
}

export function deleteBook(id: number) {
  return apiRequest<void>(`/api/v1/books/${id}`, { method: 'DELETE' });
}