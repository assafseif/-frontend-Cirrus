import { GetApi } from "../../lib/Apis";
import Router from "next/router";
import Head from "next/head";
import React from "react";

const verify = (data) => {
  //IF DATA SUCCESS THATS MEAN THE USER IS VERIFIED

  if (data?.data?.success) {
    return (
      <>
        <Head>
          <title>Verification</title>
        </Head>
        <h1>{data.data.message}</h1>
        <h2>You’re almost done!</h2>
        {setTimeout(() => {
          Router.push("/auth/login");
        }, 1000)}
      </>
    );
  } else {
    //ELSE RETURN ERROR MESSAGE

    return <h1>Verification Failed!</h1>;
  }
};
export async function getServerSideProps(context) {
  //USE GET API TO SEND TOKEN TO SERVER SIDE AND CHECK WITH IT

  const data = await GetApi(
    `${process.env.API_URL}/api/auth/verify?token=${context.query.token}`
  );
  return {
    props: {
      data,
    },
  };
}

export default verify;
