export const uid = () => Math.random().toString(36).slice(2, 9);
export const inr = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
export const num = (n) => Number(n || 0).toLocaleString('en-IN');
export const todayISO = () => new Date().toISOString().slice(0, 10);
export const daysAgo = (d) => {
  const t = new Date();
  t.setDate(t.getDate() - d);
  return t.toISOString().slice(0, 10);
};
export function rel(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  const t = new Date(todayISO() + 'T00:00:00');
  const diff = Math.round((t - d) / 864e5);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function monthLbl(m) {
  if (!m) return '—';
  const [y, mo] = m.split('-');
  return `${MONTHS[Number(mo) - 1] || ''} ${y}`;
}
export const slug = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const lakh = (n) => (n >= 1e7 ? '₹' + (n / 1e7).toFixed(2) + ' Cr' : '₹' + (n / 1e5).toFixed(1) + ' L');
export const initials = (name) =>
  String(name).split(/\s+/).map((w) => w[0]).slice(0, 2).join('');

/** Split a heading into [plain part, emphasised last words] the same way the site does. */
export function splitEmph(t) {
  const w = String(t || '').trim().split(/\s+/);
  if (w.length < 4) return [String(t || ''), ''];
  const k = Math.min(3, Math.floor(w.length / 2));
  return [w.slice(0, -k).join(' '), w.slice(-k).join(' ')];
}

export const pub = (a) => (a || []).filter((x) => x.published !== false && x.enabled !== false);

/** Unsplash links get a sized, compressed variant; everything else passes through. */
export function photoURL(src, w) {
  return /^https:\/\/images\.unsplash\.com\//.test(src || '')
    ? `${src.split('?')[0]}?auto=format&fit=crop&w=${w}&q=80`
    : src;
}
