/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const successResponse = (
  res: Response,
  status: number,
  msg: string,
  data?: any
) => {
  return res.status(status).json({
    message: msg,
    data,
  });
};

export const errorResponse = (res: Response, status: number, message: any) => {
  return res.status(status).json({
    message,
  });
};
