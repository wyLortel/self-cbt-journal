import { ReactNode } from 'react';

//ReactNode는 쉽게 말하면
// React가 화면에 그릴 수 있는 거의 모든 것
interface CardProps {
  children: ReactNode;
  variant?: 'base' | 'info' | 'error';
  className?: string;
}

export default function Card({
  children,
  variant = 'base',
  className = '',
}: CardProps) {
  const variants = {
    base: 'rounded-2xl bg-white border border-gray-100 shadow-2xl shadow-gray-300/50 p-6',
    info: 'rounded-2xl bg-indigo-50 border border-indigo-100 p-5 text-indigo-900',
    error: 'rounded-2xl bg-red-50 border border-red-100 p-5 text-red-700',
  };

  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
}
