import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle } from 'lucide-react';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
};

const budgetData = [
  { name: 'Groceries', timeLeft: '2d left', amount: 94, spentPercent: 65, amountLeft: 24, period: 'week', indicatorClass: 'bg-chart-3' },
  { name: 'Healthcare', timeLeft: '20d left', amount: 186, spentPercent: 65, amountLeft: 64, period: 'month', indicatorClass: 'bg-chart-4' },
  { name: 'Subscriptions', timeLeft: '7h left', amount: 218, spentPercent: 95, amountLeft: 4, period: 'today', indicatorClass: 'bg-chart-1' },
  { name: 'Restaurants', timeLeft: '2d left', amount: 83, spentPercent: 165, amountLeft: 0, period: 'week', indicatorClass: 'bg-chart-3' },
];


export default function Budgets() {
  return (
    <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Budget by category</h3>
            <Tabs defaultValue="all" className="w-auto">
                <TabsList className="h-8">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
                    <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                </TabsList>
            </Tabs>
          </div>

          {budgetData.map((budget, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{budget.name}</span>
                    <span className="text-xs text-muted-foreground">{budget.timeLeft}</span>
                </div>
                <span className="font-semibold">{formatCurrency(budget.amount)}</span>
              </div>
              <Progress value={Math.min(100, budget.spentPercent)} className="h-2" indicatorClassName={budget.indicatorClass} />
              <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>Spent {budget.spentPercent}%</span>
                  {budget.spentPercent > 100 && (
                    <AlertTriangle className="h-4 w-4 text-chart-4" />
                  )}
                </div>
                <span>
                  {formatCurrency(budget.amountLeft)} left this {budget.period}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
    </Card>
  );
}
