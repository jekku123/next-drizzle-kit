'use client';

import { createTodo } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import FormButton from './ui/form-button';
import { Input } from './ui/input';

const initialState = {
  message: '',
  status: '',
  errors: undefined,
};

export default function AddTodo() {
  const [state, formAction] = useFormState(createTodo, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.status === 'success') {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Add todo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="todo" name="todo" className="col-span-3" />
              {state?.errors && <span className="text-red-500">{state?.errors.name}</span>}
            </div>
          </div>
          <DialogFooter>
            <FormButton>Create</FormButton>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
