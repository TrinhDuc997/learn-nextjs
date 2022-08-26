// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createProxyServer } from 'http-proxy';
import Cookies from 'cookies'
// type Data = {
//   name: string
// }

const proxy = createProxyServer();
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    // convert cookies to headers authorization
    const cookies = new Cookies(req, res);
    if(cookies.get('access_token')){
      req.headers.authorization = 'Bearer ' + cookies.get('access_token');
    }
    req.headers.cookie = "";
    return new Promise((resolve) => {
    proxy.web(req, res,{
        target:process.env.API_URL,
        changeOrigin: true,
         selfHandleResponse: false,
    });
    proxy.once('proxyRes',() => {
      resolve(true)
    })
  })
    
//   res.status(200).json({ name: 'Path - Math all API...' })
}
