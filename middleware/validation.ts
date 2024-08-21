import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phone_number: z.string().min(10).max(13),
});

export const updateUserSchema = z.object({
  first_name: z.string().min(4).optional(),
  last_name: z.string().min(4).optional(),
  email: z.string().email().optional(),
  date_of_birth: z.string().optional(), // Jika menginginkan format tertentu, misalnya ISO string
  gender: z.string().min(4).optional(),
  image: z.string().optional(),
  address: z.string().min(10).optional(),
  role: z.string().optional(),
});

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(400).json({ details: errorMessages });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}
