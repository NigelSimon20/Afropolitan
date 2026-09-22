import type { Metadata } from 'next';
import MenuExplorer from '@/components/menu/MenuExplorer';
import PageHeader from '@/components/ui/PageHeader';
import ReservationCTA from '@/components/home/ReservationCTA';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Breakfast from 8 AM, wood-fired braai and mains, house-churned gelato and a late cocktail list at Afropolitan Restaurant, Bar & Grill in Harare.',
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Menu"
        title="From the coals,"
        accent="all day long"
        description="Breakfast that runs on until noon, a grill that never really goes out, gelato churned in-house every morning, and a bar list that carries the room through to closing."
      />
      <MenuExplorer />
      <ReservationCTA />
    </>
  );
}
