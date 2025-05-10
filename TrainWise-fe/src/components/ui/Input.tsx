import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={
        'w-full rounded-md border border-gray-300 px-3 py-2 focus:border-trainwise-coral focus:outline-none focus:ring-1 focus:ring-trainwise-coral ' +
        (props.className || '')
      }
    />
  );
} 