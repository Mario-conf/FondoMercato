'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // A tiny delay ensures the component has rendered before starting the animation.
    // This triggers the CSS transition from 0 to 100 over 3 seconds.
    const timer = setTimeout(() => {
      setProgress(100);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background space-y-8">
      <Image
        src="https://placehold.co/150x150.png"
        alt="Fondo Mercato Logo"
        width={150}
        height={150}
        data-ai-hint="monochrome logo"
        unoptimized
      />
      <div className="w-64">
         <Progress value={progress} className="h-2 bg-accent" indicatorClassName="bg-primary transition-all duration-[3000ms] linear" />
      </div>
    </div>
  );
}
