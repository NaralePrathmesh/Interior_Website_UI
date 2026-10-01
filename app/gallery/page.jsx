import { Gallery } from '@/components/pages/Pages';

export const metadata = { title: 'Gallery', description: 'Room-by-room interior photographs and walkthrough videos.', alternates: { canonical: '/gallery' } };

export default function Page() {
  return <Gallery />;
}
