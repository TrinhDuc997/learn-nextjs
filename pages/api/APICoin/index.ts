// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any[];

} | { name: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'GET') {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/derivatives/exchanges?page=" +
        1 +
        ""
    );
    const resData = await response.json();
    res.status(200).json({ data: resData })
  }else{
    res.status(404).json({ name: 'Method not allowed...' })
  }
}
