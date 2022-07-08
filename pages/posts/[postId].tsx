import { GetStaticProps, GetStaticPropsContext,GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export interface IPostIdProps {
  post:any;
}

export default function PostId ({post}: IPostIdProps) {
  if(!post) {return null;}
  return (
    <div>
        <h1>Post Detail:</h1>
        <p>{post.name}</p>
        <p>{post.open_interest_btc}</p>
        <p>{post.trade_volume_24h_btc}</p>
        <p>{post.year_established}</p>
        {/* <img src={post.image}/> */}
    </div>
  );
}
export const getStaticPaths: GetStaticPaths = async (context: GetStaticPropsContext) => {
  const response = await fetch("https://api.coingecko.com/api/v3/derivatives/exchanges");
  const res = await response.json();
  console.log("\nget static paths:",res.length);

  return {
    paths:res.map((item:any) => ({ params:{ postId:item.id }})),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IPostIdProps> = async (context: GetStaticPropsContext) => {
  // hàm này sẽ chạy phía sever
  // là chỉ chạy lúc build-time có thể xử lý dữ liệu tại đây ( đọc file, lấy dữ liệu từ DB, or gọi API )
  console.log("\nget static props",context.params?.postId);
  if(!context.params?.postId) {
    return {notFound: true};
  }
  const response = await fetch(`https://api.coingecko.com/api/v3/derivatives/exchanges/${context.params?.postId}?include_tickers=unexpired`);
  const res = await response.json();
  // console.log("static props", res);
    return{
      props:{
        post:res
      }
    }
}

