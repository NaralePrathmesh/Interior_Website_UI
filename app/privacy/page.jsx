import { Legal } from '@/components/pages/Pages';

export const metadata = { title: 'Privacy Policy', description: 'How Aangan Studio uses the details you share with us.', alternates: { canonical: '/privacy' } };

export default function Page() {
  return <Legal kind="privacy" />;
}
