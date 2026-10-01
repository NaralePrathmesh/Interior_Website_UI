import { Legal } from '@/components/pages/Pages';

export const metadata = { title: 'Terms & Conditions', description: 'Quote validity, payment milestones and warranties.', alternates: { canonical: '/terms' } };

export default function Page() {
  return <Legal kind="terms" />;
}
