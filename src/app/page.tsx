import PerfumeHero from '@/components/perfume-hero';
import { getPerfumes } from '@/lib/perfumes';

export default function Home() {
  const perfumes = getPerfumes();
  return (
    <div className="flex flex-col items-center justify-center">
      <PerfumeHero perfumes={perfumes} />
    </div>
  );
}
