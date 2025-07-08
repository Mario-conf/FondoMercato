'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-provider';

const onboardingSteps = [
  {
    image: 'https://placehold.co/600x400.png',
    hint: 'finance illustration',
    title: 'Bienvenido a Fondo Mercato',
    description: 'La app definitiva para tomar el control de tus finanzas personales.',
  },
  {
    image: 'https://placehold.co/600x400.png',
    hint: 'tracking expenses illustration',
    title: 'Registra tus Transacciones',
    description: 'Añade tus ingresos y gastos fácilmente para ver a dónde va tu dinero.',
  },
  {
    image: 'https://placehold.co/600x400.png',
    hint: 'budget planning illustration',
    title: 'Crea Presupuestos',
    description: 'Establece límites de gasto por categoría y cumple tus metas de ahorro.',
  },
  {
    image: 'https://placehold.co/600x400.png',
    hint: 'charts graphs illustration',
    title: 'Visualiza tu Progreso',
    description: 'Usa nuestros gráficos para entender tus hábitos financieros de un vistazo.',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  const handleFinish = () => {
    completeOnboarding();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {onboardingSteps.map((step, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square flex-col items-center justify-center p-6 text-center">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={300}
                      height={200}
                      className="mb-6 rounded-lg"
                      data-ai-hint={step.hint}
                    />
                    <h2 className="text-2xl font-bold font-headline">{step.title}</h2>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-6 flex w-full max-w-md justify-between">
        <Button variant="ghost" onClick={handleFinish}>
          Saltar
        </Button>
        <Button onClick={handleFinish}>Finalizar</Button>
      </div>
    </div>
  );
}
