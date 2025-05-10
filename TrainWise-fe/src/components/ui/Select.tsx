import type { SelectHTMLAttributes, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export default function Select({ children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={
        'w-full rounded-md border border-gray-300 px-3 py-2 focus:border-trainwise-coral focus:outline-none focus:ring-1 focus:ring-trainwise-coral ' +
        (props.className || '')
      }
    >
      {children}
    </select>
  );
} 