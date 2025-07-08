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
              <span className="text-xs text-muted-foreground">this month</span>
            </div>
            <span className="font-semibold">{formatCurrency(0)}</span>
          </div>
          <Progress value={0} className="h-2" />
          <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
            <span>Spent 0%</span>
            <span>{formatCurrency(0)} left this month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
