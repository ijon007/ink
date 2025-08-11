'use client';

import * as React from 'react';

export type PageNode = {
  id: string;
  title: string;
  parentId?: string | null;
};

type PagesContextValue = {
  pages: PageNode[];
  createPage: (opts?: { title?: string; parentId?: string | null }) => PageNode;
  updatePage: (id: string, update: Partial<Omit<PageNode, 'id'>>) => void;
  getPageById: (id: string) => PageNode | undefined;
  getChildrenOf: (parentId?: string | null) => PageNode[];
  ensureDefaultPage: () => PageNode;
};

const STORAGE_KEY = 'ink_pages';

const PagesContext = React.createContext<PagesContextValue | null>(null);

function readFromStorage(): PageNode[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as PageNode[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeToStorage(pages: PageNode[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function PagesProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = React.useState<PageNode[]>([]);

  React.useEffect(() => {
    const existing = readFromStorage();
    setPages(existing);
  }, []);

  const persist = React.useCallback((next: PageNode[] | ((p: PageNode[]) => PageNode[])) => {
    setPages((prev) => {
      const value = typeof next === 'function' ? (next as any)(prev) : next;
      writeToStorage(value);
      return value;
    });
  }, []);

  const ensureDefaultPage = React.useCallback(() => {
    if (pages.length > 0) return pages[0];
    const created = {
      id: generateId(),
      title: 'Untitled',
      parentId: null,
    } satisfies PageNode;
    persist([created]);
    return created;
  }, [pages, persist]);

  const createPage = React.useCallback<PagesContextValue['createPage']>(({ title, parentId } = {}) => {
    const node: PageNode = {
      id: generateId(),
      title: title?.trim() || 'Untitled',
      parentId: parentId ?? null,
    };
    persist((prev) => [node, ...prev]);
    return node;
  }, [persist]);

  const updatePage = React.useCallback<PagesContextValue['updatePage']>((id, update) => {
    persist((prev) => prev.map((p) => (p.id === id ? { ...p, ...update } : p)));
  }, [persist]);

  const getPageById = React.useCallback<PagesContextValue['getPageById']>((id) => {
    return pages.find((p) => p.id === id);
  }, [pages]);

  const getChildrenOf = React.useCallback<PagesContextValue['getChildrenOf']>((parentId = null) => {
    return pages.filter((p) => (p.parentId ?? null) === (parentId ?? null));
  }, [pages]);

  const value: PagesContextValue = React.useMemo(() => ({
    pages,
    createPage,
    updatePage,
    getPageById,
    getChildrenOf,
    ensureDefaultPage,
  }), [pages, createPage, updatePage, getPageById, getChildrenOf, ensureDefaultPage]);

  return <PagesContext.Provider value={value}>{children}</PagesContext.Provider>;
}

export function usePages() {
  const ctx = React.useContext(PagesContext);
  if (!ctx) throw new Error('usePages must be used within a PagesProvider');
  return ctx;
}


