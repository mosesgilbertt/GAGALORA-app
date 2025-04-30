import { CustomError } from '@/types';
import { ZodError } from 'zod';

export default function errorHandler(error: unknown) {
  let message = (error as CustomError).message || 'Internal Server Error';
  let status = (error as CustomError).status || 500;

  if (error instanceof ZodError) {
    status = 400;
    message = error.errors.map((err) => `${err.path}: ${err.message}`).join(', ');
  }

  return Response.json(
    {
      message,
    },
    {
      status,
    },
  );
}
