'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './button';

export default function FormButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {children}
    </Button>
  );
}
