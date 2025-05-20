import { useIsMobile } from '@/hooks/useIsMobile';
import { MobileHeader } from './MobileHeader';

interface MobileWrapperProps {
  children: React.ReactNode;
}

export const MobileWrapper = ({ children }: MobileWrapperProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-white md:hidden">
      <MobileHeader />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}; 