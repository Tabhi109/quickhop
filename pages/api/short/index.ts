
import { HOST } from '@/utils/constants';
import authenticateMiddleware from '@/utils/middleware';
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const original_link = req.body.original_link;
  const hash = generateUniqueHash(original_link);
  const short_link = `${HOST}/${hash}`;
  const { rows } = await  sql`INSERT INTO url_shortener (original_link,short_link) values(${original_link},${short_link}) RETURNING *`;
  return res.status(200).json({rows})
};
export default authenticateMiddleware(handler);
