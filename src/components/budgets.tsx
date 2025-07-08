import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
};

export default function Budgets() {
  return (
    <div className="space-y-4">
        <h2 className="text-3xl font-bold font-headline text-center">PRESUPUESTOS</h2>
        <Card>
            <CardContent className="pt-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Groceries</span>
                    <span className="text-xs text-muted-foreground">2d left</span>
                </div>
                <span className="font-semibold">{formatCurrency(94)}</span>
              </div>
              <Progress value={65} className="h-2" indicatorClassName="bg-chart-1" />
              <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                <span>Spent 65%</span>
                <span>$24 left this week</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Healthcare</span>
                    <span className="text-xs text-muted-foreground">20d left</span>
                </div>
                <span className="font-semibold">{formatCurrency(186)}</span>
              </div>
              <Progress value={65} className="h-2" indicatorClassName="bg-chart-4" />
              <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                <span>Spent 65%</span>
                <span>$64 left this month</span>
              </div>
            </div>
            </CardContent>
        </Card>
    </div>
  );
}
