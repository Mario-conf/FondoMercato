import { ArrowLeft } from 'lucide-react';

export default function Header() {
  return (
    <header className="px-4 md:px-8 py-4 bg-background/50 border-b border-border">
      <div className="flex items-center gap-2">
        <ArrowLeft className="h-6 w-6 text-foreground" />
      </div>
    </header>
  );
}
