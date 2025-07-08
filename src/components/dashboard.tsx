'use client';

import Budgets from './budgets';
import OverallBudget from './overall-budget';
import { Button } from './ui/button';

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-8">
      <OverallBudget />
      <Budgets />
      <Button variant="outline" className="w-full">
        Create New Budget
      </Button>
    </div>
  );
}
