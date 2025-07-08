import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function OverallBudget() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Overall Monthly</span>
              <span className="text-xs text-muted-foreground">23d left</span>
            </div>
            <span className="font-semibold">{formatCurrency(1867)}</span>
          </div>
          <Progress value={65} className="h-2" />
          <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
            <span>Spent 65%</span>
            <span>{formatCurrency(640)} left this month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
