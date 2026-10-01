'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { seed } from './data';
import { uid } from './utils';

/*
 * Front-end data store.
 * Today everything lives in the visitor's browser (localStorage), exactly like
 * the HTML version. When the backend is added, replace `load`/`persist` with
 * API calls — every page and the admin panel read and write through `update`.
 */
const LS = 'aangan-cms-next-v2';
const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [db, setDb] = useState(seed);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [prefill, setPrefill] = useState({});
  const [ui, setUiState] = useState({ projFilter: 'All', projQ: '', galTab: 'Image', galRoom: 'All', galProject: 'All', dFilter: 'All', tIdx: 0, svcFocus: null, calcHome: '2 BHK', calcPkg: null });
  const [adm, setAdmState] = useState({ user: null, role: 'Super Admin', view: 'dashboard', q: '', est: 'All' });
  const first = useRef(true);

  const toast = useCallback((msg) => {
    const id = uid();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.v === 4) setDb(d);
      }
    } catch (e) { /* storage blocked: keep seed data */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (first.current) { first.current = false; return; }
    try { localStorage.setItem(LS, JSON.stringify(db)); } catch (e) {
      toast('Saved for this visit only. Browser storage is full or blocked.');
    }
  }, [db, ready, toast]);

  /** Mutate a copy of the data: update(d => { d.projects.push(...) }) */
  const update = useCallback((fn) => {
    setDb((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }, []);
  const reset = useCallback(() => setDb(seed()), []);
  const setUi = useCallback((patch) => setUiState((u) => ({ ...u, ...patch })), []);
  const setAdm = useCallback((patch) => setAdmState((a) => ({ ...a, ...patch })), []);

  const openModal = useCallback((m) => setModal(m), []);
  const closeModal = useCallback(() => setModal(null), []);
  const openLightbox = useCallback((list, idx = 0) => setLightbox({ list, idx }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const value = {
    db, S: db.settings, ready, update, reset,
    toasts, toast,
    modal, openModal, closeModal,
    lightbox, setLightbox, openLightbox, closeLightbox,
    prefill, setPrefill,
    ui, setUi,
    adm, setAdm,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
