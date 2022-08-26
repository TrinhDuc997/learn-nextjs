// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createProxyServer, ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies'
// type Data = {
//   name: string
// }

export const config = {
    api: {
        bodyParser: false,
    }
}

const proxy = createProxyServer();
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if(req.method != 'POST') {
        return res.status(404).json({
            error: {
                code: 'method_required',
                message: 'Method not supported',
            }
        });
    }
    console.log("login file")
    return new Promise((resolve) => {
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
         let body = '';
         proxyRes.on('data', (chunk) => {
            body += chunk;
         });
         proxyRes.on('end', () => {
            try {
                const { accessToken, expiredAt } = JSON.parse(body);
                console.log(accessToken, expiredAt);
                // convert to token to cookies
                const cookies = new Cookies(req, res, {secure: process.env.NODE_ENV != 'development'});
                cookies.set('access_token', accessToken,{
                    httpOnly: true,
                    sameSite: "lax",
                    expires: new Date(expiredAt),
                });
                ;(res as NextApiResponse).status(200).json({ message: "login succcessfully"})
            } catch (error) {
                ;(res as NextApiResponse).status(500).json({ message: "Something went wrong"});
                
            }
            resolve(true);
         })
    }

    proxy.once('proxyRes',handleLoginResponse)
    proxy.web(req, res,{
        target:process.env.API_URL,
        changeOrigin: true,
         selfHandleResponse: true,
    });
  })
    
//   res.status(200).json({ name: 'Path - Math all API...' })
}
