'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './button';

type FormButtonProps = {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};

export default function FormButton({ children, variant, size }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant={variant} size={size}>
      {children}
    </Button>
  );
}
