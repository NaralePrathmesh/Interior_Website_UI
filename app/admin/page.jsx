import Admin from '@/components/admin/Admin';

export const metadata = { title: 'Admin panel', robots: { index: false, follow: false } };

export default function Page() {
  return <Admin />;
}
