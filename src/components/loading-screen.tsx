'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start the progress from a small number to make it visible instantly
    setProgress(13); 
    const timer = setTimeout(() => {
      setProgress(100);
    }, 100); // A short delay to allow the component to render before starting the transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white space-y-8">
      <Image
        src="https://placehold.co/150x150.png"
        alt="Fondo Mercato Logo"
        width={150}
        height={150}
        data-ai-hint="monochrome logo"
        unoptimized
      />
      <div className="w-64">
         <Progress value={progress} className="h-2 bg-gray-200" indicatorClassName="bg-primary transition-all duration-[5000ms] ease-linear" />
      </div>
    </div>
  );
}
