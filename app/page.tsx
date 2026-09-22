import Hero from '@/components/home/Hero';
import VibeSection from '@/components/home/VibeSection';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import ReservationCTA from '@/components/home/ReservationCTA';
import Marquee from '@/components/ui/Marquee';

const STRIP = [
  'Wood-fired braai',
  'All-day breakfast',
  'House-churned gelato',
  'Live Afrobeat',
  'Late bar til 3 AM',
  'Harare, Zimbabwe',
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={STRIP} />
      <VibeSection />
      <FeaturedEvents />
      <ReservationCTA />
    </>
  );
}
