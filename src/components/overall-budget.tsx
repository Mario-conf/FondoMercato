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
  // Static data for now. In a real implementation, this would come from props or context.
  const totalBudget = 0;
  const spent = 0;
  const progress = totalBudget > 0 ? (spent / totalBudget) * 100 : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-6 justify-between items-center">
        <p className="text-base font-medium leading-normal">Presupuesto Mensual</p>
        <p className="text-sm font-normal leading-normal text-muted-foreground">{formatCurrency(totalBudget)}</p>
      </div>
      <Progress value={progress} className="h-2 bg-accent" />
    </div>
  );
}
