'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotificationsSettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center p-4 pb-2">
        <button
          onClick={() => router.back()}
          className="flex size-12 shrink-0 items-center justify-start -ml-2 p-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
          Notificaciones
        </h1>
      </header>
      <main className="p-4">
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Ajustes de notificaciones próximamente.
          </p>
        </div>
      </main>
    </div>
  );
}
