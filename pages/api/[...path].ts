// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { createProxyServer } from 'http-proxy';
// type Data = {
//   name: string
// }

const proxy = createProxyServer();
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    req.headers.cookie = "";
    proxy.web(req, res,{
        target:process.env.API_URL,
        changeOrigin: true,
         selfHandleResponse: false,
    });
//   res.status(200).json({ name: 'Path - Math all API...' })
}
