import { GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';

export interface IPostProps {
  posts:any
}

export default function Post ({posts}: IPostProps) {
  // console.log("render post", posts);
  return (
    <div>
      <h1>Post Page</h1>
      {
        posts.map((item:any, index:number) => {
          return <div key={index}><a key={index} href={`/posts/${item.id}`}>{item.name}</a></div>
        })
      }
    </div>
  );
}
export const getStaticProps: GetStaticProps<IPostProps> = async (context: GetStaticPropsContext) => {
  // hàm này sẽ chạy phía sever
  // là chỉ chạy lúc build-time có thể xử lý dữ liệu tại đây ( đọc file, lấy dữ liệu từ DB, or gọi API )
  
  const response = await fetch("https://api.coingecko.com/api/v3/derivatives/exchanges");
  const res = await response.json();
  // console.log("static props", res);
    return{
      props:{
        posts:res
      }
    }
}