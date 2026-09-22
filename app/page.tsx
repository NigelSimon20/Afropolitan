import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Experience from '@/components/home/Experience';
import MenuPreview from '@/components/home/MenuPreview';
import Signature from '@/components/home/Signature';
import Gallery from '@/components/home/Gallery';
import Occasions from '@/components/home/Occasions';
import Reservations from '@/components/home/Reservations';
import FindUs from '@/components/home/FindUs';
import Connect from '@/components/home/Connect';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <MenuPreview />
      <Signature />
      <Gallery />
      <Occasions />
      <Reservations />
      <FindUs />
      <Connect />
    </>
  );
}
