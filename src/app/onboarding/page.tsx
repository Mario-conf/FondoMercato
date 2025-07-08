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

const onboardingSteps = [
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDprDLYrcL1BwOSb1HOy3TcWnN2A_RIG4QLyFPuW7ccFAbffyOOWPMwvni97mmFH3ahNSFworYSeR6bMx0IEQ1G7XKbVmhbJcoBR9PuS22moyAsdv299aKexq3AeQrmBFmabMA4E5eHicQjH1LuZYuIflQsgK9KbfAdTGdlzrkN92AOULaCXlu0mDk887YF3pe8o4RwL1ZY0wz5X65dnudlhWD1lfAtpb1GYFYkwLux7-RCsKoMtUDans94vNYzhPnM6z28oQigysFj',
    hint: 'finance illustration',
    title: 'Bienvenido a Fondo Mercato',
    description:
      'Tu viaje financiero comienza aquí. Exploremos cómo Fondo Mercato puede ayudarte a administrar tu dinero sabiamente.',
  },
  {
    image: 'https://kstatic.googleusercontent.com/files/15f4e8b345a33a0c64952467d287042c16f0927c49b06256cae45f7f9050d859a6d1b7d156828fda9b398a89a531e072f4f220f5d720516694e99f011059f139',
    hint: 'tracking expenses illustration',
    title: 'Registra tus Transacciones',
    description:
      'Añade tus ingresos y gastos fácilmente para ver a dónde va tu dinero.',
  },
  {
    image: 'https://kstatic.googleusercontent.com/files/d59a5848e918b417e2c0e865614917f0f63b4f91d845e5f30e01768f02905470d970335e36e76882269a8a77918f0f188319f37c35e807a2d1d5f2f4c9c6de74',
    hint: 'budget planning illustration',
    title: 'Crea Presupuestos',
    description:
      'Establece límites de gasto por categoría y cumple tus metas de ahorro.',
  },
  {
    image: 'https://kstatic.googleusercontent.com/files/f03f39a1a995e791b10620f31a238b693a1c6ea40e4f2ed1c7b39a3e9c5f590558b3400d34604e38e68e4c776097d643d9b05c56d787d558d4a983e4d58852e6',
    hint: 'charts graphs illustration',
    title: 'Visualiza tu Progreso',
    description:
      'Usa nuestros gráficos para entender tus hábitos financieros de un vistazo.',
  },
];

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
    <div className="relative flex size-full min-h-screen flex-col justify-between bg-background text-foreground">
      <div>
        <div className="flex items-center p-4 pb-2 justify-center">
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-foreground">
            Fondo Mercato
          </h2>
        </div>
        <Carousel setApi={setApi} className="w-full" opts={{ loop: false }}>
          <CarouselContent>
            {onboardingSteps.map((step, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center text-center">
                  <div className="@container">
                    <div className="w-full @[480px]:px-4 @[480px]:py-3">
                      <div className="relative w-full h-[218px] @[480px]:rounded-xl overflow-hidden">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover bg-center"
                          data-ai-hint={step.hint}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5 font-headline">
                    {step.title}
                  </h1>
                  <p className="text-muted-foreground text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
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
                current === i + 1 ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>
        <div className="h-5"></div>
      </div>
    </div>
  );
}
