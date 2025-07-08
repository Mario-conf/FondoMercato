'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, BellRing } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useData } from '@/context/data-provider';
import { subMonths, getYear, getMonth } from 'date-fns';

const NOTIFICATIONS_ENABLED_KEY = 'fintrack_notifications_enabled';

export default function NotificationsSettingsPage() {
  const router = useRouter();
  const { transactions } = useData();
  const [isEnabled, setIsEnabled] = useState(false);
  const [lastMonthBalance, setLastMonthBalance] = useState<number | null>(null);

  useEffect(() => {
    const savedPreference =
      localStorage.getItem(NOTIFICATIONS_ENABLED_KEY) === 'true';
    setIsEnabled(savedPreference);
  }, []);

  useEffect(() => {
    // Calculate last month's balance
    const now = new Date();
    const lastMonthDate = subMonths(now, 1);
    const targetYear = getYear(lastMonthDate);
    const targetMonth = getMonth(lastMonthDate);

    const lastMonthTransactions = transactions.filter((t) => {
      const transactionYear = getYear(t.date);
      const transactionMonth = getMonth(t.date);
      return (
        transactionYear === targetYear && transactionMonth === targetMonth
      );
    });

    const balance = lastMonthTransactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);

    // Only set balance if there were transactions last month
    if (lastMonthTransactions.length > 0) {
      setLastMonthBalance(balance);
    } else {
      setLastMonthBalance(null);
    }
  }, [transactions]);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    localStorage.setItem(NOTIFICATIONS_ENABLED_KEY, String(checked));
  };

  const showWarning = isEnabled && lastMonthBalance !== null && lastMonthBalance < 0;

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
      <main className="p-4 space-y-6">
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications-switch" className="font-medium text-base">
              Alertas de saldo negativo
            </Label>
            <Switch
              id="notifications-switch"
              checked={isEnabled}
              onCheckedChange={handleToggle}
            />
          </div>
          <p className="text-muted-foreground text-sm mt-2">
            Recibe un aviso aquí si tu balance del mes anterior fue negativo.
          </p>
        </div>

        {showWarning && (
           <Alert variant="destructive">
             <BellRing className="h-4 w-4" />
             <AlertTitle>¡Atención! Saldo Negativo</AlertTitle>
             <AlertDescription>
                Hemos detectado que tu balance del mes pasado fue negativo. ¡Considera revisar tus gastos y presupuestos!
             </AlertDescription>
           </Alert>
        )}
      </main>
    </div>
  );
}
