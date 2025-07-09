'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { appImages } from '@/lib/images';

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
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white space-y-8">
      <Image
        src={appImages.loadingLogo.src}
        alt={appImages.loadingLogo.alt}
        width={150}
        height={150}
      />
      <div className="w-64">
         <Progress value={progress} className="h-2 bg-accent/20" />
      </div>
    </div>
  );
}
