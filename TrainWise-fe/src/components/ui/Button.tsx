import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const base =
    'rounded-md px-6 py-2 font-semibold transition focus:outline-none';
  const variants = {
    primary: 'bg-trainwise-coral text-white hover:bg-opacity-90',
    secondary: 'bg-gray-200 text-trainwise-darktext hover:bg-gray-300',
  };
  return (
    <button className={`${base} ${variants[variant]} ${props.disabled ? 'opacity-60' : ''}`} {...props}>
      {children}
    </button>
  );
} 