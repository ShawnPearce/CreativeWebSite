import { type ReactNode } from 'react';
import useTilt from '../hooks/useTilt';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 10, perspective: 800, scale: 1.02, speed: 400 });

  return (
    <div ref={tiltRef} className={className} data-magnetic>
      {children}
    </div>
  );
}
