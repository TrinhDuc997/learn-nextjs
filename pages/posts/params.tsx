import { useRouter } from "next/router";
import React from "react";

export interface IParamsPageProps {}

export default function Params(props: IParamsPageProps) {
  const router = useRouter();
  return (
    <div>
      <h1>Params ID:</h1>
      <p>query: {JSON.stringify(router.query)}</p>
    </div>
  );
}
export const getServerSideProps = async() => {
  await new Promise((resolve, reject) => (setTimeout(resolve ,3000)))
  return {
    props: {},
  };
};
