import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";

export interface IParamsPageProps {
  detail:any
}

export default function Params({detail}: IParamsPageProps) {
  if(!detail) {return null;}
  return (
    <div>
        <h1>Post Detail:</h1>
        <p>{detail.name}</p>
        <p>{detail.open_interest_btc}</p>
        <p>{detail.trade_volume_24h_btc}</p>
        <p>{detail.year_established}</p>
    </div>
  );
}
export const getServerSideProps = async(context: GetServerSidePropsContext) => {
  context.res.setHeader('cache-control', 's-max-age=5, stale-while-revalidate');
  await new Promise((resolve, reject) => (setTimeout(resolve ,3000)))
  const response = await fetch(`https://api.coingecko.com/api/v3/derivatives/exchanges/${context.query?.id}?include_tickers=unexpired`);
  const res = await response.json();
  return {
    props: {
      query:context.query,
      detail:res,
    },
  };
};
