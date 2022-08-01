// import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "./Components/Common/header";
import { AdminLayout, MainLayout } from "./Components/Layout";
// const Header = dynamic(() => import('./Components/Common/header'), {ssr:false});
export interface IAboutProps {}

export default function AboutPage(props: IAboutProps) {
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  const page = router.query.page;
  console.log("router:", router.query);

  useEffect(() => {
    if (!page) return;

    (async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/derivatives/exchanges?page=" +
          page +
          ""
      );
      const res = await response.json();
      setPostList(res);
    })();
  }, [page]);

  const handleNextLink = () => {
    router.push(
      {
        pathname: "/about",
        query: {
          page: Number(router.query?.page || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <div>
      <h1>About Page</h1>
      <Header />
      <ul>
        {postList.map((post: any) => {
          return <li key={post.id}>{post.name}</li>;
        })}
      </ul>
      <button onClick={handleNextLink}>NextPage</button>
    </div>
  );
}

// AboutPage.Layout = AdminLayout;
export async function getStaticProps() {
  console.log("Get Static props");
  return {
    props: {},
  };
}
// export async function getServerSideProps(){
//   return{
//     props:{}
//   }
// }
