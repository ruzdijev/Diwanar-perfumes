import { getPerfumeById } from '@/lib/perfumes';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartForm from '@/components/add-to-cart-form';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/context/app-provider';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const perfume = getPerfumeById(params.id);
  if (!perfume) {
    return {
      title: 'Perfume Not Found',
    };
  }
  return {
    title: `${perfume.name} - diwanar`,
    description: perfume.description,
  };
}

export default function PerfumeDetailPage({ params }: { params: { id: string } }) {
  const perfume = getPerfumeById(params.id);

  if (!perfume) {
    notFound();
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] min-h-[700px]">
      <Image
        src={perfume.artisticImage}
        alt={`Artistic view of ${perfume.name}`}
        fill
        data-ai-hint="perfume aesthetic"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-md text-white">
          <h1 className="text-5xl md:text-7xl font-light tracking-widest leading-tight">
            {perfume.name}
          </h1>
          <p className="mt-4 text-lg text-white/80">
            {perfume.description}
          </p>
          <div className="mt-6 space-y-2 text-white/90">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-white/50 text-xs">TOP</Badge>
              <span>{perfume.notes.top}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-white/50 text-xs">HEART</Badge>
              <span>{perfume.notes.heart}</span>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="border-white/50 text-xs">BASE</Badge>
              <span>{perfume.notes.base}</span>
            </div>
          </div>
          <div className="mt-8">
            <AddToCartForm perfume={perfume} />
          </div>
        </div>
      </div>
    </div>
  );
}
