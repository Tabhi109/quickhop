// middleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { QUICKBIT_SECRET } from './constants';

const authenticateMiddleware = (handler:any) => async (req: NextApiRequest, res: NextApiResponse) => {
  const secretHeader = req.headers['api-secret'];

  if (!secretHeader) {
    return res.status(401).json({ error: 'Unauthorized - Missing API secret' });
  }

  const decodedSecret = Buffer.from(secretHeader as string, 'base64').toString('utf-8');

  if (decodedSecret !== QUICKBIT_SECRET) {
    return res.status(401).json({ error: 'Unauthorized - Invalid API secret' });
  }

  return handler(req, res);
};

export default authenticateMiddleware;
