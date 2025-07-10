"use client";

import { useState, useEffect } from 'react';
import type { Perfume } from '@/lib/perfumes';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PerfumeHeroProps = {
  perfumes: Perfume[];
};

const PerfumeHero = ({ perfumes }: PerfumeHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(perfumes.length / 2));
  const [displayCount, setDisplayCount] = useState(5);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % perfumes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + perfumes.length) % perfumes.length);
  };

  const getVisiblePerfumes = () => {
    const visiblePerfumes = [];
    for (let i = 0; i < displayCount; i++) {
        const index = (currentIndex + i - Math.floor(displayCount / 2) + perfumes.length) % perfumes.length;
        visiblePerfumes.push(perfumes[index]);
    }
    return visiblePerfumes;
  }

  const getPerfumePosition = (index: number) => {
    const isCenter = index === Math.floor(displayCount / 2);
    const offset = index - Math.floor(displayCount / 2);
    
    const scale = isCenter ? 1.2 : 0.8;
    const zIndex = isCenter ? 10 : 1;
    const xOffset = offset * 20;

    return {
        transform: `translateX(${xOffset}%) scale(${scale})`,
        zIndex: zIndex,
        filter: isCenter ? 'brightness(1)' : 'brightness(0.3)',
        transition: 'all 0.5s ease-out'
    };
  };

  const highlightedPerfume = perfumes[currentIndex];

  return (
    <section className="relative w-full bg-background py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-radial-gradient from-yellow-200/40 to-transparent pointer-events-none"></div>
      <div 
        className="relative h-[600px] w-full"
      >
        <div className="absolute inset-0 flex items-center justify-center">
            {getVisiblePerfumes().map((perfume, index) => (
            <div
                key={perfume.id}
                className="absolute"
                style={{
                  width: '20%',
                  ...getPerfumePosition(index),
                }}
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
        <Button onClick={handlePrev} className="absolute left-10 top-1/2 -translate-y-1/2 z-20"><ChevronLeft/></Button>
        <Button onClick={handleNext} className="absolute right-10 top-1/2 -translate-y-1/2 z-20"><ChevronRight/></Button>
      </div>
      <div className="mt-8 text-center h-24 transition-opacity duration-500 ease-in-out">
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
