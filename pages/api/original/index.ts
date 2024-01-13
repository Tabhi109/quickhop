import authenticateMiddleware from '@/utils/middleware';
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const hash = req.body.hash
  const { rows } = await  sql`SELECT original_link FROM url_shortener where hash = ${hash}`;
  return res.status(200).json({rows})
};
export default authenticateMiddleware(handler);
