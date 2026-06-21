import { ReactNode, FormEvent } from 'react';

type FormProps = {
  children: ReactNode;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
  ) => void;
  className?: string;
};

export default function Form({
  children,
  onSubmit,
  className = '',
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={className}
    >
      {children}
    </form>
  );
}