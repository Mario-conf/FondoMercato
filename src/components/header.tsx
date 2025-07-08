import { PiggyBank } from 'lucide-react';

export default function Header() {
  return (
    <header className="px-4 md:px-8 py-4 bg-background/50 border-b border-border">
      <div className="flex items-center gap-2">
        <PiggyBank className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground font-headline">FinTrack</h1>
      </div>
    </header>
  );
}
