/* eslint-disable prettier/prettier */
import { NextFunction, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default (err: any , res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500;
  // eslint-disable-next-line no-param-reassign
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'production') {
		// A) Operational, trusted error: send message to client
		if (err.isOperational) {
			return res.status(err.statusCode).json({
				status: err.status,
				message: err.message
			});
		}
		// B) Programming or other unknown error: don't leak error details
		// 1) Log error
		console.error('ERROR 💥', err);
		// 2) Send generic message
		return res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!'
		});
  } 
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  
};


