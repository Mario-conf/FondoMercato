'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { type CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-provider';
import { cn } from '@/lib/utils';
import { appImages } from '@/lib/images';

const onboardingSteps = appImages.onboarding;

export default function OnboardingPage() {
  const { completeOnboarding } = useAuth();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleNext = () => {
    if (current === count) {
      completeOnboarding();
    } else {
      api?.scrollNext();
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col justify-between bg-neutral-50 text-neutral-900">
      <div>
        <div className="flex items-center p-4 pb-2 justify-center">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            Fondo Mercato
          </h2>
        </div>
        <Carousel setApi={setApi} className="w-full" opts={{ loop: false }}>
          <CarouselContent>
            {onboardingSteps.map((step, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-full p-4">
                    <div className="relative mx-auto w-full max-w-sm aspect-video overflow-hidden rounded-xl">
                      <Image
                        src={step.src}
                        alt={step.title}
                        fill
                        className={cn(
                          'object-cover',
                          index > 0 && 'object-top'
                        )}
                        data-ai-hint={step.hint}
                        unoptimized
                      />
                    </div>
                  </div>
                  <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5 font-headline">
                    {step.title}
                  </h1>
                  <p className="text-neutral-600 text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
                    {step.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="px-4 py-3">
        <Button
          onClick={handleNext}
          className="w-full h-12 text-base font-bold"
        >
          {current === count && count > 0 ? 'Finalizar' : 'Siguiente'}
        </Button>
        <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 w-2 rounded-full',
                current === i + 1 ? 'bg-primary' : 'bg-neutral-300'
              )}
            />
          ))}
        </div>
        <div className="h-5"></div>
      </div>
    </div>
  );
}
