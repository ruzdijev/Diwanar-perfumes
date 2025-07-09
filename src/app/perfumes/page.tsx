import { getPerfumes } from '@/lib/perfumes';
import Image from 'next/image';
import Link from 'next/link';

export default function PerfumesPage() {
  const perfumes = getPerfumes();

  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extralight tracking-tight sm:text-5xl">
            Our Collection
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our curated selection of exclusive fragrances.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {perfumes.map((perfume) => (
            <Link key={perfume.id} href={`/perfumes/${perfume.id}`} className="group">
              <div className="w-full bg-gray-100 aspect-[2/3] overflow-hidden">
                <Image
                  src={perfume.image}
                  alt={perfume.name}
                  width={400}
                  height={600}
                  data-ai-hint="perfume bottle"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-xl tracking-wider">{perfume.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{perfume.descriptor}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
