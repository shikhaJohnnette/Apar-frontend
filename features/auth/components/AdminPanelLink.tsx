'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { getStoredUserRole, subscribeToAuthSession } from '@/lib/api';

export function AdminPanelLink() {
  const role = useSyncExternalStore(subscribeToAuthSession, getStoredUserRole, () => '');

  if (role !== 'ROLE_SUPER_ADMIN') return null;

  return <Link className="admin-panel-link" href="/dashboard/admin">Admin panel</Link>;
}