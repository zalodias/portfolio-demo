import { mergeTailwindClassNames as cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <main
      className={cn('mx-auto grid max-w-(--breakpoint-lg) px-8', className)}
    >
      {children}
    </main>
  );
}
