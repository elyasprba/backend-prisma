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

export const errorResponse = (
  res: Response,
  status: number,
  message: string
) => {
  return res.status(status).json({
    message,
  });
};
