"use client";

import { useState, useEffect } from 'react';
import type { Perfume } from '@/lib/perfumes';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type PerfumeHeroProps = {
  perfumes: Perfume[];
};

const PerfumeHero = ({ perfumes }: PerfumeHeroProps) => {
  const centerIndex = Math.floor(perfumes.length / 2);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Start with the center perfume highlighted after a short delay for effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setHighlightedIndex(centerIndex);
    }, 100);
    return () => clearTimeout(timer);
  }, [centerIndex]);

  const getPerfumePosition = (index: number) => {
    const offset = index - centerIndex;
    const isHighlighted = index === highlightedIndex;
    const scale = isHighlighted ? 1.05 : 0.8;
    const zIndex = isHighlighted ? 10 : 1;
    let xOffset = offset * 12; // in percent
    if (highlightedIndex !== null) {
        if(index > highlightedIndex) {
            xOffset += 15;
        } else if (index < highlightedIndex) {
            xOffset -= 15;
        }
    }

    return {
        transform: `translateX(${xOffset}%) scale(${scale})`,
        zIndex: zIndex,
        opacity: (highlightedIndex === null && !isLoaded) ? 0 : (isHighlighted ? 1 : 0.6)
    };
  };

  const highlightedPerfume = highlightedIndex !== null ? perfumes[highlightedIndex] : null;

  return (
    <section className="w-full bg-background py-20 md:py-32 overflow-hidden">
      <div 
        className="relative h-[600px] w-full"
        onMouseLeave={() => setHighlightedIndex(centerIndex)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
            {perfumes.map((perfume, index) => (
            <div
                key={perfume.id}
                className="absolute transition-all duration-700 ease-in-out"
                style={{
                  width: '20%',
                  ...getPerfumePosition(index),
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
            >
                <Link href={`/perfumes/${perfume.id}`} className="block group">
                <Image
                    src={perfume.image}
                    alt={perfume.name}
                    width={300}
                    height={500}
                    data-ai-hint="perfume bottle"
                    className="mx-auto transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                </Link>
            </div>
            ))}
        </div>
      </div>
      <div className="mt-8 text-center h-24 transition-opacity duration-500 ease-in-out" style={{opacity: highlightedPerfume ? 1: 0}}>
        {highlightedPerfume && (
          <div className="animate-in fade-in duration-700">
            <h2 className="text-3xl font-headline tracking-widest">{highlightedPerfume.name}</h2>
            <p className="mt-2 text-md text-muted-foreground">{highlightedPerfume.descriptor}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PerfumeHero;
