// src/components/perfume-hero.tsx
"use client";

import { useState, useRef } from 'react';
import type { Perfume } from '@/lib/perfumes';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PerfumeHeroProps = {
  perfumes: Perfume[];
};

const PerfumeHero = ({ perfumes }: PerfumeHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(perfumes.length / 2));
  const [direction, setDirection] = useState(0);

  const dragX = useRef(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const onDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    if (offset > 100) {
      handlePrev();
    } else if (offset < -100) {
      handleNext();
    }
  };

  const getVisiblePerfumes = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
        let index = (currentIndex + i + perfumes.length) % perfumes.length;
        visible.push({perfume: perfumes[index], offset: i});
    }
    return visible;
  }
  
  const highlightedPerfume = perfumes[currentIndex % perfumes.length];

  return (
    <section className="relative w-full bg-white h-[calc(100vh-4rem)] flex flex-col justify-center items-center overflow-hidden">
      
        {/* Subtle decorative elements */}
        <motion.div
            className="absolute top-10 left-10 opacity-50"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
            <Image src="/images/gold-ornament.svg" alt="decoration" width={80} height={80}/>
        </motion.div>
        <motion.div
            className="absolute bottom-10 right-10 opacity-50"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
            <Image src="/images/gold-ornament.svg" alt="decoration" width={60} height={60}/>
        </motion.div>


      <motion.div
        className="relative h-[60vh] w-full cursor-grab"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={onDragEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          {getVisiblePerfumes().map(({perfume, offset}) => (
            <motion.div
                key={perfume.id}
                className="absolute top-0 left-0 right-0 bottom-0"
                style={{
                  width: '20%',
                  margin: '0 auto',
                }}
                custom={direction}
                variants={{
                    enter: (direction: number) => ({
                        x: direction > 0 ? '100%' : '-100%',
                        opacity: 0,
                        scale: 0.5,
                      }),
                      center: {
                        x: `${offset * 40}%`,
                        y: `${offset === 0 ? 0 : 15}%`,
                        scale: offset === 0 ? 1.1 : 0.6,
                        zIndex: offset === 0 ? 10 : 1,
                        opacity: 1,
                        filter: offset === 0 ? 'brightness(1)' : 'brightness(0.5) blur(2px)',
                      },
                      exit: (direction: number) => ({
                        x: direction < 0 ? '100%' : '-100%',
                        opacity: 0,
                        scale: 0.5,
                      }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
            >
                <ConditionalLink perfume={perfume} isCenter={offset === 0}>
                    <motion.div whileHover={offset === 0 ? { scale: 1.05 } : {}}>
                    <Image
                        src={perfume.image}
                        alt={perfume.name}
                        width={300} 
                        height={600} 
                        className="mx-auto"
                        priority={offset === 0}
                    />
                    </motion.div>
                </ConditionalLink>
            </motion.div>
          ))}
        </AnimatePresence>
         {/* Spotlight Effect */}
         <motion.div
            className="absolute top-0 left-1/2 w-96 h-96 bg-radial-gradient pointer-events-none"
            style={{
                x: '-50%',
                y: '-40%',
            }}
          />
      </motion.div>
      <div className="mt-4 text-center h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={highlightedPerfume.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: {delay: 0.3, duration: 0.5} }}
            exit={{ opacity: 0, y: -20, transition: {duration: 0.2} }}
          >
            <h2 className="text-3xl font-headline tracking-widest text-black">{highlightedPerfume.name}</h2>
            <p className="mt-1 text-md text-gray-500">{highlightedPerfume.descriptor}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button onClick={handlePrev} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 bg-black/5 hover:bg-black/10 text-black"><ChevronLeft/></Button>
      <Button onClick={handleNext} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 bg-black/5 hover:bg-black/10 text-black"><ChevronRight/></Button>
    </section>
  );
};

// This component ensures only the center perfume is clickable
const ConditionalLink = ({ children, perfume, isCenter }: { children: React.ReactNode, perfume: Perfume, isCenter: boolean }) => {
  if (isCenter) {
    return <Link href={`/perfumes/${perfume.id}`} className="block group cursor-pointer">{children}</Link>
  }
  return <div className="block group">{children}</div>
}


export default PerfumeHero;